class Village {
    constructor() {
        this.buildings = [];
        this.stats = {
            population: 0,
            food: 0,
            gold: 0,
        };
    }

    addBuilding(building) {
        this.buildings.push(building);
    }

    removeBuilding(buildingName) {
        this.buildings = this.buildings.filter(building => building.name !== buildingName);
    }

    updateStats(populationChange, foodChange, goldChange) {
        this.stats.population += populationChange;
        this.stats.food += foodChange;
        this.stats.gold += goldChange;
    }

    getStats() {
        return this.stats;
    }
}

module.exports = Village;