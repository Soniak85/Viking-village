// Gestione del Villaggio
class Village {
    constructor() {
        this.buildings = [];
        this.selectedBuilding = null;
        this.dayCounter = 0;
        this.gridSize = 50;
    }

    addBuilding(type, position) {
        const building = new Building(type, position);
        this.buildings.push(building);
        return building;
    }

    removeBuilding(building) {
        const index = this.buildings.indexOf(building);
        if (index > -1) {
            this.buildings.splice(index, 1);
        }
    }

    getBuildingAt(position, radius = 2) {
        return this.buildings.find(building => {
            const distance = position.distanceTo(building.position);
            return distance < radius;
        });
    }

    getTotalProduction() {
        const production = {
            grain: 0,
            wood: 0,
            stone: 0,
            gold: 0,
            population: 0,
            happiness: 0,
            defense: 0
        };

        this.buildings.forEach(building => {
            // Produzione
            for (let [type, rate] of Object.entries(building.config.production)) {
                production[type] = (production[type] || 0) + rate * building.level;
            }

            // Popolazione
            production.population += building.config.population;

            // Felicità
            production.happiness += building.config.happiness;

            // Difesa
            if (building.config.defense) {
                production.defense += building.config.defense * building.level;
            }
        });

        return production;
    }

    getVillageStats() {
        return {
            totalBuildings: this.buildings.length,
            totalPopulation: this.getTotalProduction().population,
            totalHappiness: this.getTotalProduction().happiness,
            totalDefense: this.getTotalProduction().defense
        };
    }

    update(deltaTime) {
        this.dayCounter += deltaTime;
    }

    getVisibleBuildings(camera, distance = 100) {
        return this.buildings.filter(building => {
            const distToCamera = building.position.distanceTo(camera.position);
            return distToCamera < distance;
        });
    }
}
