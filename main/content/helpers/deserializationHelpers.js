import { getProductCategories } from "../constants/productCategory";
import { getUnitsOfMeasure } from "../constants/unitsOfMeasure";
import { StateError } from "../errors/stateError";

export const getUnitOfMeasureFromJson = (json) => getObjectFromJson(getUnitsOfMeasure(), json);

export const getProductCategoryFromJson = (json) => getObjectFromJson(getProductCategories(), json);


const getObjectFromJson = (objects, json) => {
    const result = Object.entries(objects)
        .filter(object => object[1].json == json);
    if (result?.length == 1) return result[0][1];
    else if(result?. length > 1) throw new StateError("Multiple Objects by that key!");
    else throw new ReferenceError(`No Object available for: ${json}`);
}

export const exportForTesting = {
    getObjectFromJson
};