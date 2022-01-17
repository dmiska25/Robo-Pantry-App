import { getUnitOfMeasureFromJson } from "../../content/helpers/deserializationHelpers";
import * as UOM from "../../content/constants/unitsOfMeasure";
import { StateError } from "../../content/errors/stateError";

describe('getUnitOfMeasureFromJson', () => {
    describe('with any valid json unitOfMeasure', () => {
        it('should return deserialized version', () => {
            const unitsOfMeasure = Object.entries(UOM.getUnitsOfMeasure()).map((it) => it[1]);
            const jsonUnitOfMeasures = unitsOfMeasure.map((it) => it.json);

            for(let i = 0; i<unitsOfMeasure.length; i++) {
                const result = getUnitOfMeasureFromJson(jsonUnitOfMeasures[i]);
                expect(result).toBe(unitsOfMeasure[i]);
            }
        })
    })

    describe('when unitOfMeasure has duplicates', () => {
        it('should throw InternalError', () => {
            const spy = jest.spyOn(UOM, 'getUnitsOfMeasure');
            const mockUOM = {
                TEST: new UOM.UnitOfMeasure("tst", "Test", "Tests"),
                TEST2: new UOM.UnitOfMeasure("tst", "Test", "Tests")
            };
            spy.mockReturnValue(mockUOM);
            
            expect(() => {
                getUnitOfMeasureFromJson('tst');
            }).toThrow(StateError);
        })
    })

    describe('with invalid json unitOfMeasure', () => {
        it('should throw ReferenceError', () => {
            expect(() => {
                getUnitOfMeasureFromJson('invalidJsonUOM');
            }).toThrow(ReferenceError);
        })
    })
})