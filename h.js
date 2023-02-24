const { XMLParser, XMLBuilder, XMLValidator} = require("fast-xml-parser");

const parser = new XMLParser();
let jObj = {hello:"my name",hello2:"myname2"}

const builder = new XMLBuilder();
const xmlContent = builder.build(jObj);
console.log(xmlContent)