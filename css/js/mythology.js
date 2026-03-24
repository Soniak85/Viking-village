// Mitologia Norrena - Dei e Poteri
const mythology = {
    gods: [
        {
            name: 'Odino',
            symbol: '🧙',
            power: 'Saggezza e Guerra',
            bonus: { production: 1.1, defense: 1.2 },
            cost: { gold: 100 }
        },
        {
            name: 'Thor',
            symbol: '⚡',
            power: 'Temporale e Forza',
            bonus: { defense: 1.3, production: 0.9 },
            cost: { gold: 150 }
        },
        {
            name: 'Freyja',
            symbol: '💕',
            power: 'Fertilità e Amore',
            bonus: { happiness: 1.3, population: 1.2 },
            cost: { gold: 80 }
        },
        {
            name: 'Loki',
            symbol: '🔥',
            power: 'Inganno e Cambiamento',
            bonus: { gold: 1.4, happiness: 0.7 },
            cost: { gold: 120 }
        },
        {
            name: 'Tyr',
            symbol: '⚔️',
            power: 'Guerra e Giustizia',
            bonus: { defense: 1.4, population: 0.9 },
            cost: { gold: 110 }
        }
    ],

    creatures: [
        { name: 'Drago Norreno', health: 100, damage: 20, rarity: 'leggendario' },
        { name: 'Gigante del Gelo', health: 80, damage: 15, rarity: 'raro' },
        { name: 'Lupo Fenrir', health: 60, damage: 12, rarity: 'raro' }
    ],

    events: [
        {
            name: 'Invasione Vichinga',
            description: 'Un villaggio rivale ti sfida!',
            type: 'battle',
            reward: { gold: 200 }
        },
        {
            name: 'Raccolto Benedetto',
            description: 'Gli dei benedicono il tuo raccolto!',
            type: 'blessing',
            reward: { grain: 300 }
        },
        {
            name: 'Tempesta di Thor',
            description: 'Una terribile tempesta colpisce il villaggio',
            type: 'disaster',
            penalty: { buildings: 0.8 }
        }
    ],

    getRandomEvent() {
        return this.events[Math.floor(Math.random() * this.events.length)];
    },

    getGodByName(name) {
        return this.gods.find(g => g.name === name);
    }
};
