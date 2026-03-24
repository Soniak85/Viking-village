// Gestione dell'Interfaccia Utente
class UIManager {
    constructor(game) {
        this.game = game;
        this.buildMode = false;
        this.selectedBuildingType = null;
    }

    updateResources() {
        const resources = this.game.resources.getAll();
        document.getElementById('grainCount').textContent = Math.floor(resources.grain);
        document.getElementById('woodCount').textContent = Math.floor(resources.wood);
        document.getElementById('stoneCount').textContent = Math.floor(resources.stone);
        document.getElementById('goldCount').textContent = Math.floor(resources.gold);
        document.getElementById('populationCount').textContent = Math.floor(resources.population);
    }

    updateStats() {
        const resources = this.game.resources.getAll();
        const stats = this.game.village.getVillageStats();
        
        document.getElementById('dayCount').textContent = Math.floor(this.game.village.dayCounter);
        document.getElementById('happinessCount').textContent = Math.floor(resources.happiness);
        document.getElementById('defenseCount').textContent = Math.floor(stats.totalDefense);
    }

    populateBuildingsList() {
        const container = document.getElementById('buildingsList');
        container.innerHTML = '';

        for (let [type, config] of Object.entries(buildingTypes)) {
            const resources = this.game.resources.getAll();
            const canBuild = this.game.resources.hasResources(config.cost);

            const btn = document.createElement('button');
            btn.className = 'building-btn';
            btn.disabled = !canBuild;
            btn.innerHTML = `${config.icon} ${config.name}<br><small>`;
            
            for (let [res, amount] of Object.entries(config.cost)) {
                btn.innerHTML += `${res}: ${amount} `;
            }
            btn.innerHTML += `</small>`;

            btn.addEventListener('click', () => this.selectBuilding(type));
            container.appendChild(btn);
        }
    }

    selectBuilding(type) {
        this.selectedBuildingType = type;
        this.buildMode = true;
        this.game.setBuildMode(true, type);
    }

    populateMythologyPanel() {
        const container = document.getElementById('godsList');
        container.innerHTML = '';

        mythology.gods.forEach(god => {
            const card = document.createElement('div');
            card.className = 'god-card';
            card.innerHTML = `
                <div class="god-name">${god.symbol} ${god.name}</div>
                <div class="god-power">${god.power}</div>
            `;
            container.appendChild(card);
        });
    }

    showInfo(title, content) {
        document.getElementById('infoTitle').textContent = title;
        document.getElementById('infoContent').textContent = content;
        document.getElementById('infoPanel').classList.remove('hidden');
    }

    hideInfo() {
        document.getElementById('infoPanel').classList.add('hidden');
    }

    toggleBuildingPanel() {
        const panel = document.getElementById('buildingPanel');
        panel.classList.toggle('hidden');
        if (!panel.classList.contains('hidden')) {
            this.populateBuildingsList();
        }
    }

    init() {
        document.getElementById('buildBtn').addEventListener('click', () => this.toggleBuildingPanel());
        document.getElementById('harvestBtn').addEventListener('click', () => this.harvest());
        document.getElementById('settingsBtn').addEventListener('click', () => this.showSettings());
        document.getElementById('closeInfo').addEventListener('click', () => this.hideInfo());

        document.addEventListener('keydown', (e) => {
            if (e.key === 'b' || e.key === 'B') this.toggleBuildingPanel();
            if (e.key === 'h' || e.key === 'H') this.harvest();
            if (e.key === 's' || e.key === 'S') this.showSettings();
        });

        this.populateMythologyPanel();
    }

    harvest() {
        // Raccogli bonus da tutti gli edifici
        const bonus = {
            grain: 50,
            wood: 30,
            stone: 20,
            gold: 10
        };

        for (let [type, amount] of Object.entries(bonus)) {
            this.game.resources.addResource(type, amount);
        }

        this.game.ui.showInfo('Raccolto!', 'Hai raccolto risorse bonus!');
    }

    showSettings() {
        this.game.ui.showInfo(
            'Impostazioni',
            'Volume: ToggleON\nQualità: Alta\nVersione: 1.0'
        );
    }
}
