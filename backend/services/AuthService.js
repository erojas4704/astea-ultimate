require("dotenv").config();
const VALIDATE_ROUTE = `/DataViewMgr.svc/dotnet`
const LOGIN_ROUTE = `/SecurityManager.svc/dotnet`;
const client = require("../api/AsteaClient");
const { parseXMLToJSON } = require("../helpers/xml");
const { AsteaError } = require("../js/AsteaError");

const headers = {
  SOAPAction:
    "http://astea.services.wcf/ISecurityManagerContract/LoginExtendedlExt",
};

class AuthService {
  static sessions = {};

  static async login(username, password, forceKick = false) {
    //Check to see if there's a session active
    const session = this.sessions[username];
    if (session) {
      const isValid = await this.validateSessionId(session.sessionId);
      if (isValid.success) {
        console.log(
          "We're reusing a session for " + username + " sesions",
          this.sessions
        );
        return isValid;
      } else {
        delete this.sessions[username];
      }
    }
    //If it is, we'll return the session ID.
    //If not, we'll create a new session.
    const resp = await client.post(
      LOGIN_ROUTE,
      formatLoginBody(username, password, forceKick),
      {
        headers,
      }
    );

    const json = await parseLoginResponseXML(resp.data);
    this.sessions[username] = {
      sessionId: json.sessionID,
      encryptedSessionId: json.encryptedSessionID,
    };
    return json;
  }

  static async validateSessionId(sessionId) {
    const resp = await client.post(
      VALIDATE_ROUTE,
      formatValidateSessionBody(sessionId),
      {
        headers: {
          SOAPAction:
            "http://astea.services.wcf/IDataViewMgrContract/RetrieveScalarValueExt",
        },
      }
    );
    const json = await parseXMLToJSON(resp.data);
    if (json["s:Envelope"]["s:Body"][0]["RetrieveScalarValueExtResponse"]) {
      return { success: true, sessionID: sessionId };
    }

    return { success: false };
  }

  static async isUserSessionValid(username) {}
}

function formatLoginBody(username, password, forceKick = false) {
  return `<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/"><s:Header><currentprofile xmlns="http://www.astea.com">Prod</currentprofile></s:Header><s:Body><LoginExtendedlExt xmlns="http://astea.services.wcf/"><user>${username}</user><password>${password}</password><applicationProfile>Prod</applicationProfile><initialVarsXML>&lt;SessionVars xmlns:dt='urn:schemas-microsoft-com:datatypes'&gt;&lt;Variable Name='ClientCulture'&gt;en-US&lt;/Variable&gt;&lt;Variable Name='UseClientCulture'&gt;N&lt;/Variable&gt;&lt;Variable Name='UI_Language'&gt;AST&lt;/Variable&gt;&lt;Variable Name='CurrentCulture'&gt;en-US&lt;/Variable&gt;&lt;Variable Name='UserTimezone'&gt;Eastern Standard Time&lt;/Variable&gt;&lt;Variable Name='ClientDateTime' dt:dt='dateTime'&gt;2021-08-16T09:33:50.000&lt;/Variable&gt;${
    forceKick
      ? "&lt;Variable Name='LogoutOpenedSessions'&gt;Y&lt;/Variable&gt;"
      : ""
  }&lt;Variable Name='IsNewUI'&gt;true&lt;/Variable&gt;&lt;Variable Name='MACHINE_NAME'&gt;QN-PC-01&lt;/Variable&gt;&lt;Variable Name='DOMAIN_USER'&gt;AD\erojas1&lt;/Variable&gt;&lt;Variable Name='AB_VERSION'&gt;11.5.0.24&lt;/Variable&gt;&lt;Variable Name='AB_CUSTOM_VERSION'&gt;11.5.0.2401&lt;/Variable&gt;&lt;Variable Name='AB_IS_UPDATED'&gt;N&lt;/Variable&gt;&lt;Variable Name='AB_BROWSER_FW_VERSION'&gt;11.5.0.24&lt;/Variable&gt;&lt;Variable Name='AB_PUBLISHER_NAME'&gt;Astea Employee Portal 11.0&lt;/Variable&gt;&lt;Variable Name='LoginScreen'&gt;login.aspx&lt;/Variable&gt;&lt;Variable Name='ComputerID'&gt;64fcbbac-4b6c-463d-bf01-bc9c92c5a1e5Prod&lt;/Variable&gt;&lt;Variable Name='SupressCustomizer'&gt;False&lt;/Variable&gt;&lt;Variable Name='USER_TYPE'&gt;Alliance&lt;/Variable&gt;&lt;/SessionVars&gt;</initialVarsXML></LoginExtendedlExt></s:Body></s:Envelope>`;
}

async function parseLoginResponseXML(xml) {
  const resp = await parseXMLToJSON(xml);
  if (getErrorFromLoginResponse(resp)) {
    //TODO, invert the logic. It should fail by default.
    const xmlMessage =
      resp["s:Envelope"]["s:Body"][0]["s:Fault"][0]["faultstring"][0]._;
    const jsonMessage = await parseXMLToJSON(xmlMessage);
    const error = {
      message: parseError(jsonMessage.root.Message),
      code: jsonMessage.root.Code,
    };
    console.log(jsonMessage);
    throw new AsteaError(error, 401, error.message);
  } else {
    const jsonMessage = await getClientVarsFromLoginResponse(resp);
    const variables = jsonMessage["ClientVars"]["Variable"];
    const sessionID = getVariableValue(variables, "SessionID");
    const encryptedSessionID = getVariableValue(
      variables,
      "EncryptedSessionID"
    );
    const user = getVariableValue(variables, "PortalUserLogin");

    return {
      sessionID,
      encryptedSessionID,
      user,
    };
  }
}

function getVariableValue(variables, name) {
  return variables.find((v) => v["$"]["Name"] === name)._;
}

async function getClientVarsFromLoginResponse(resp) {
  const clientVarsXML =
    resp["s:Envelope"]["s:Body"][0]["LoginExtendedlExtResponse"][0][
      "LoginExtendedlExtResult"
    ][0]["a:ClientVars"][0];
  const json = await parseXMLToJSON(clientVarsXML);
  return json;
}

function getErrorFromLoginResponse(resp) {
  return resp["s:Envelope"]["s:Body"][0]["s:Fault"];
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

/*Convert Astea errors into english*/
function parseError(error) {
  const errorHash = {
    LOGGED_IN_MORE_THAN_ONCE: "Your username is already logged in to Astea.",
    LOGIN_FAILED: "Your username or password is incorrect.",
  };

  return errorHash[error] || error;
}

module.exports = AuthService;
