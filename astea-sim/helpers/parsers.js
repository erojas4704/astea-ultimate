function extractMacroFromJSON(json){
    return json.root['GetCurrentState'][0]['$'].pageName;
}

module.exports = { extractMacroFromJSON }