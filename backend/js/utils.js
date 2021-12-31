//This is a mess does not work.
const fromXmlString = (xmlString) => {
    const isExitTag = false;
    let isInTag = false;
    let currentTag;
    const obj = {};
    const keys = [];
  
  
    for (let i = 0; i < xmlString.length; i++) {
      const char = xmlString[i];
      if (keys.length > 0) currentTag = keys[keys.length - 1];
      
      console.log(char);
  
      //Grab the tag name
      if (char === '<') {
        let t = i;
        let isExitTag = (xmlString[t++] === '/');
        let tagName = "";
  
        if (currentTag !== tagName) {
          while (t++) {
            if (xmlString[t] === " ") break;
            tagName += xmlString[t];
          }
          i = t;
        }
        isInTag = true;
        if (!isExitTag) keys.push(tagName);
        continue;
      }
  
      if (char === '>') {
        if (xmlString[i - 1] === '/') isExitTag = true;
        if (isExitTag) {
          if (keys[keys.length - 1] !== tagName) throw new Error("Syntax Error");
          keys.pop();
        }
        isInTag = false;
        continue;
      }
  
      if (isInTag) {
        //Grab key value pairs for attributes
        if (char !== " ") {
          let attrName = "";
          let attrValue = "";
          let t = i;
          let parsingAttribute = true;
          let parsingValue = false;
          while (t++) {
            if (parsingAttribute) {
              attrName += xmlString[t];
              if (xmlString[t] === " ") parsingAttribute = false;
            } else if (!parsingValue) {
              if (xmlString[t] === "=") {
                parsingValue = true;
              }
            }
  
            if (parsingValue) {
              attrValue += xmlString[t];
              if (xmlString[t] === " ") {
                parsingValue = false;
                break;
              }
            }
          }
  
          if (attrValue[0] === '"' && attrValue[attrValue.length - 1] === '"')
            attrValue = attrValue.substring(1, attrValue.length - 1);
  
          i = t;
          keys.reduce((o, i) => o[i], obj)[attrName] = attrValue;
        }
      }
    }
    return obj;
  }
  
  fromXmlString(
    `<a boot="ab">cono</a>`
  )
  