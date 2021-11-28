import { getUnitsOfMeasure } from "../constants/unitsOfMeasure";
import { StateError } from "../errors/stateError";

export const getUnitOfMeasureFromJson = (json) => {
    const result = Object.entries(getUnitsOfMeasure())
        .filter(uom => uom[1].json == json);
    if (result?.length == 1) return result[0][1];
    else if(result?. length > 1) throw new StateError("Multiple Units of Measure by that key!");
    else throw new ReferenceError(`No Unit of Measure available for: ${json}`);
}