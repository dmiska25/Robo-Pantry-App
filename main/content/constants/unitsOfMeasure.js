export function UnitOfMeasure(short, long, plural, json) {
    this.short = short;
    this.long = long;
    this.plural = plural;
    this.json = json ? json : short;
}

const unitsOfMeasure = {
    TEASPOON: new UnitOfMeasure("tsp", "Teaspoon", "Teaspoons"),
    TABLESPOON: new UnitOfMeasure("tbsp", "Tablespoon", "Tablespoons"),
    OUNCE: new UnitOfMeasure("oz", "Ounce", "Ounces"),
    CUP: new UnitOfMeasure("cup", "Cup", "Cups"),
    PINT: new UnitOfMeasure("pt", "Pint", "Pints"),
    QUART: new UnitOfMeasure("qt", "Quart", "Quarts"),
    GALLON: new UnitOfMeasure("gal", "Gallon", "Gallons"),
    POUND: new UnitOfMeasure("lb", "Pound", "Pounds"),
    GRAM: new UnitOfMeasure("g", "Gram", "Grams"),
    KILOGRAM: new UnitOfMeasure("kg", "Kilogram", "Kilograms"),
    LITER: new UnitOfMeasure("l", "Liter", "Liters"),
    MILLILITER: new UnitOfMeasure("ml", "Milliliter", "Milliliters"),
    UNIT: new UnitOfMeasure("unit", "Unit", "Units")
};

export const getUnitsOfMeasure = () => unitsOfMeasure;