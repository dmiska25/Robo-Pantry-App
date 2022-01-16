import { Serializer, RestSerializer } from "miragejs"

function convertIdsToNumbers(o) {
    Object.keys(o).forEach((k) => {
      const v = o[k]
      if (Array.isArray(v) || v instanceof Object) convertIdsToNumbers(v)
      if (k === 'id' || /.*Id$/.test(k)) {
        o[k] = Number(v)
      }
    })
}

const underscore = str => {

  const regex1 = (/([a-z\d])([A-Z]+)/g)
  const regex2 = (/\-|\s+/g)

  return str.replace(regex1, '$1_$2')
    .replace(regex2, '_')
    .toLowerCase()
}
  
export default ApplicationSerializer = RestSerializer.extend({
    keyForAttribute(attr) {
      return underscore(attr);
    },
    keyForEmbeddedRelationship(attr) {
      return underscore(attr);
    },
    serialize() {
        let json = Serializer.prototype.serialize.apply(this, arguments);
        convertIdsToNumbers(json);
        return json;
    },
})