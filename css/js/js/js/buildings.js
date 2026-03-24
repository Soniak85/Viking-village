// Sistema di Edifici
const buildingTypes = {
    farm: {
        name: 'Fattoria',
        icon: '🌾',
        cost: { wood: 20, stone: 10, grain: 5 },
        production: { grain: 3 },
        population: 2,
        happiness: 5,
        scale: 1
    },
    lumberMill: {
        name: 'Segheria',
        icon: '🪵',
        cost: { stone: 15, gold: 10 },
        production: { wood: 2.5 },
        population: 1,
        happiness: 0,
        scale: 1.2
    },
    mine: {
        name: 'Miniera',
        icon: '⛏️',
        cost: { wood: 30, grain: 20 },
        production: { stone: 2, gold: 0.5 },
        population: 3,
        happiness: -5,
        scale: 1.3
    },
    tavern: {
        name: 'Taverna',
        icon: '🍺',
        cost: { wood: 25, gold: 50, grain: 15 },
        production: {},
        population: 5,
        happiness: 20,
        scale: 0.8
    },
    barracks: {
        name: 'Caserma',
        icon: '⚔️',
        cost: { stone: 40, wood: 30, gold: 100 },
        production: {},
        population: 4,
        defense: 30,
        happiness: -10,
        scale: 1.1
    },
    temple: {
        name: 'Tempio Divino',
        icon: '⛩️',
        cost: { stone: 50, gold: 150, wood: 40 },
        production: { gold: 1 },
        population: 3,
        happiness: 15,
        scale: 1.5
    },
    storehouse: {
        name: 'Magazzino',
        icon: '📦',
        cost: { wood: 35, stone: 25 },
        production: {},
        population: 1,
        happiness: 0,
        scale: 0.9
    },
    house: {
        name: 'Casa',
        icon: '🏠',
        cost: { wood: 10, stone: 5 },
        production: {},
        population: 4,
        happiness: 10,
        scale: 0.7
    }
};

class Building {
    constructor(type, position) {
        this.type = type;
        this.config = buildingTypes[type];
        this.position = position;
        this.health = 100;
        this.level = 1;
        this.mesh = null;
    }

    upgrade() {
        this.level++;
        this.health = 100;
        return {
            production: Object.fromEntries(
                Object.entries(this.config.production).map(([k, v]) => [k, v * this.level])
            ),
            happiness: this.config.happiness * this.level
        };
    }

    damage(amount) {
        this.health -= amount;
        return this.health > 0;
    }

    createMesh() {
        const scale = this.config.scale;
        const geometry = new THREE.BoxGeometry(scale, scale, scale);
        
        const colorMap = {
            farm: 0x90EE90,
            lumberMill: 0x8B4513,
            mine: 0x808080,
            tavern: 0xFF6347,
            barracks: 0x000000,
            temple: 0xFFD700,
            storehouse: 0xA0522D,
            house: 0x8B4513
        };

        const material = new THREE.MeshPhongMaterial({
            color: colorMap[this.type] || 0xFFFFFF
        });

        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.copy(this.position);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        
        return this.mesh;
    }
}
