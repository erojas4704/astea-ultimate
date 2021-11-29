const xml2js = require("xml2js");

async function parseXMLToJSON(xml) {
    //TODO simple promisify
    const resp = await new Promise((resolve, reject) => {
        xml2js.parseString(xml, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result);
            }
        });
    });

    return resp;
}

module.exports = { parseXMLToJSON };
