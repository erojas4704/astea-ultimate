
require("dotenv").config();
const ASTEA_BASE_URL = process.env.ASTEA_BASE_URL;
const LOGIN_URL = `${ASTEA_BASE_URL}/Web_Framework/SecurityManager.svc/dotnet`;
const VALIDATE_URL = `${ASTEA_BASE_URL}/Web_Framework/DataViewMgr.svc/dotnet`;
const axios = require('axios');
const xml2js = require('xml2js');
const { parseError } = require('../helpers/errorParser');
const { parseXMLToJSON } = require('../helpers/xml');
const { AsteaError } = require('../js/AsteaError');

const headers = {
    'Content-Type': `text/xml; charset=utf-8`,
    'currentprofile': 'Prod',
    'SOAPAction': "http://astea.services.wcf/ISecurityManagerContract/LoginExtendedlExt",
    'Host': 'alliance.microcenter.com',
    'Expect': '100-continue',
    'Accept-Encoding': 'gzip, deflate'
}
/**Attempts to log in to Astea using the provided credentials.
 * If forceKick is true, we will end all current sessions and start a new one.
 * @param {string} username - The username to log in with.
 * @param {string} password - The password to log in with.
 * @param {boolean} forceKick - Whether or not to force a kick of all current sessions.
 * @returns {Promise<Object>} A promise that resolves to the sessionID and encryptedSessionID of the login, as well as the username.
*/
async function loginToAstea(username, password, forceKick = false) {
    const resp = await axios.post(
        LOGIN_URL,
        formatLoginBody2(username, password, forceKick),
        {
            headers
        }
    );
    const json = await parseLoginResponseXML(resp.data);
    return json;
}


async function validateSessionID(sessionID) {
    const resp = await axios.post(
        VALIDATE_URL,
        formatValidateSessionBody(sessionID),
        {
            headers: {
                "Content-Type": "text/xml; charset=utf-8",
                "SOAPAction": "http://astea.services.wcf/IDataViewMgrContract/RetrieveScalarValueExt",
            }
        }
    );
    const json = await parseXMLToJSON(resp.data);
    if (json['s:Envelope']['s:Body'][0]['RetrieveScalarValueExtResponse']) {
        return { success: true };
    }

    return { success: false };
}

function formatValidateSessionBody(sessionID) {
    return `
        <s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
            <s:Header>
                <currentprofile xmlns="http://www.astea.com">Prod</currentprofile>
            </s:Header>
            <s:Body>
                <RetrieveScalarValueExt xmlns="http://astea.services.wcf/">
                    <sessionID>${sessionID}</sessionID>
                    <entityName>call_center</entityName>
                    <queryName>my_incident_managment_count</queryName>
                </RetrieveScalarValueExt>
            </s:Body>
        </s:Envelope>
    `;
}

function formatLoginBody2(username, password, forceKick = false) {
    return `<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Header><currentprofile xmlns="http://www.astea.com">Prod</currentprofile></s:Header><s:Body><LoginExtendedlExt xmlns="http://astea.services.wcf/"><user>${username}</user><password>${password}</password><applicationProfile>Prod</applicationProfile><initialVarsXML>&lt;SessionVars xmlns:dt='urn:schemas-microsoft-com:datatypes'&gt;&lt;Variable Name='ClientCulture'&gt;en-US&lt;/Variable&gt;&lt;Variable Name='UseClientCulture'&gt;N&lt;/Variable&gt;&lt;Variable Name='UI_Language'&gt;AST&lt;/Variable&gt;&lt;Variable Name='CurrentCulture'&gt;en-US&lt;/Variable&gt;&lt;Variable Name='UserTimezone'&gt;Eastern Standard Time&lt;/Variable&gt;&lt;Variable Name='ClientDateTime' dt:dt='dateTime'&gt;2021-08-16T09:33:50.000&lt;/Variable&gt;${forceKick ? "&lt;Variable Name='LogoutOpenedSessions'&gt;Y&lt;/Variable&gt;" : ""}&lt;Variable Name='IsNewUI'&gt;true&lt;/Variable&gt;&lt;Variable Name='MACHINE_NAME'&gt;QN-PC-01&lt;/Variable&gt;&lt;Variable Name='DOMAIN_USER'&gt;AD\erojas1&lt;/Variable&gt;&lt;Variable Name='AB_VERSION'&gt;11.5.0.24&lt;/Variable&gt;&lt;Variable Name='AB_CUSTOM_VERSION'&gt;11.5.0.2401&lt;/Variable&gt;&lt;Variable Name='AB_IS_UPDATED'&gt;N&lt;/Variable&gt;&lt;Variable Name='AB_BROWSER_FW_VERSION'&gt;11.5.0.24&lt;/Variable&gt;&lt;Variable Name='AB_PUBLISHER_NAME'&gt;Astea Employee Portal 11.0&lt;/Variable&gt;&lt;Variable Name='LoginScreen'&gt;login.aspx&lt;/Variable&gt;&lt;Variable Name='ComputerID'&gt;64fcbbac-4b6c-463d-bf01-bc9c92c5a1e5Prod&lt;/Variable&gt;&lt;Variable Name='SupressCustomizer'&gt;False&lt;/Variable&gt;&lt;Variable Name='USER_TYPE'&gt;Alliance&lt;/Variable&gt;&lt;/SessionVars&gt;</initialVarsXML></LoginExtendedlExt></s:Body></s:Envelope>`
}

async function parseLoginResponseXML(xml) {
    const resp = await parseXMLToJSON(xml);
    if (getErrorFromLoginResponse(resp)) {
        const xmlMessage = resp['s:Envelope']['s:Body'][0]['s:Fault'][0]['faultstring'][0]._;
        const jsonMessage = await parseXMLToJSON(xmlMessage);
        const error = {
            message: parseError(jsonMessage.root.Message),
            code: jsonMessage.root.Code
        }
        console.log(jsonMessage);
        throw new AsteaError(error, 401, error.message);
    } else {
        const jsonMessage = await getClientVarsFromLoginResponse(resp);
        const variables = jsonMessage['ClientVars']['Variable'];
        const sessionID = getVariableValue(variables, 'SessionID');
        const encryptedSessionID = getVariableValue(variables, 'EncryptedSessionID');
        const user = getVariableValue(variables, 'PortalUserLogin');

        return {
            sessionID,
            encryptedSessionID,
            user
        };
    }
}

function getVariableValue(variables, name) {
    return variables.find(v => v['$']['Name'] === name)._;
}


async function getClientVarsFromLoginResponse(resp) {
    const clientVarsXML = resp['s:Envelope']['s:Body'][0]['LoginExtendedlExtResponse'][0]['LoginExtendedlExtResult'][0]['a:ClientVars'][0];
    const json = await parseXMLToJSON(clientVarsXML);
    return json;
}

function getErrorFromLoginResponse(resp) {
    return resp['s:Envelope']['s:Body'][0]['s:Fault'];
}

module.exports = { loginToAstea, validateSessionID };