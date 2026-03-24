// Sistema di Risorse
class ResourceManager {
    constructor() {
        this.resources = {
            grain: 100,
            wood: 50,
            stone: 30,
            gold: 20,
            population: 10,
            happiness: 50,
            defense: 10
        };

        this.production = {
            grain: 2,
            wood: 1,
            stone: 0.5,
            gold: 0.2
        };

        this.consumption = {
            population: 0.5 // consumo di grano per habitante
        };
    }

    addResource(type, amount) {
        if (this.resources.hasOwnProperty(type)) {
            this.resources[type] += amount;
            return true;
        }
        return false;
    }

    removeResource(type, amount) {
        if (this.resources[type] >= amount) {
            this.resources[type] -= amount;
            return true;
        }
        return false;
    }

    hasResources(costs) {
        for (let [type, amount] of Object.entries(costs)) {
            if (!this.resources[type] || this.resources[type] < amount) {
                return false;
            }
        }
        return true;
    }

    spendResources(costs) {
        if (this.hasResources(costs)) {
            for (let [type, amount] of Object.entries(costs)) {
                this.removeResource(type, amount);
            }
            return true;
        }
        return false;
    }

    update(deltaTime) {
        // Produzione risorse
        for (let [type, rate] of Object.entries(this.production)) {
            this.addResource(type, rate * deltaTime);
        }

        // Consumo grano per popolazione
        const grainNeeded = this.resources.population * this.consumption.population * deltaTime;
        if (this.resources.grain >= grainNeeded) {
            this.removeResource('grain', grainNeeded);
        } else {
            // Infelicità se non c'è abbastanza cibo
            this.resources.happiness -= 5 * deltaTime;
        }

        // Felicità massima 100
        this.resources.happiness = Math.min(100, Math.max(0, this.resources.happiness));
    }

    getAll() {
        return { ...this.resources };
    }
}
