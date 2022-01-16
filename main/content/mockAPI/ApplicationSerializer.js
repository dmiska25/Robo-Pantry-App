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
  
export default ApplicationSerializer = RestSerializer.extend({
    serialize() {
        let json = Serializer.prototype.serialize.apply(this, arguments);
        convertIdsToNumbers(json);
        return json;
    },
})