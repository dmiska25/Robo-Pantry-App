export function ProductCategory(long, json) {
    this.long = long;
    this.json = json;
}

const productCategories = {
    BEVERAGE: new ProductCategory("Beverage", "beverage"),
    BAKERY: new ProductCategory("Bakery", "bakery"),
    CANNED_GOOD: new ProductCategory("Canned Good", "canned_good"),
    DAIRY: new ProductCategory("Dairy", "dairy"),
    DRY_GOOD: new ProductCategory("Dry Good", "dry good"),
    FROZEN: new ProductCategory("Frozen", "frozen"),
    MEAT: new ProductCategory("Meat", "meat"),
    PRODUCE: new ProductCategory("Produce", "produce"),
    CLEANER: new ProductCategory("Cleaner", "cleaner"),
    PAPER_GOOD: new ProductCategory("Paper Good", "paper_good"),
    PERSONAL_CARE: new ProductCategory("Personal Care", "personal_care"),
    OTHER: new ProductCategory("Other", "other")
};

export const getProductCategories = () => productCategories;