class Building {
    constructor(name, height, type) {
        this.name = name;
        this.height = height;
        this.type = type;
    }
}

const buildingTypes = {
    RESIDENTIAL: 'Residential',
    COMMERCIAL: 'Commercial',
    INDUSTRIAL: 'Industrial',
};

// Example of using the Building class
const house = new Building('House', 10, buildingTypes.RESIDENTIAL);
const factory = new Building('Factory', 50, buildingTypes.INDUSTRIAL);

// Exporting Building and buildingTypes for usage in other modules
module.exports = { Building, buildingTypes };