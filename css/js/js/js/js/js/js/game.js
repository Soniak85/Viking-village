// Logica principale del gioco
class Game {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        this.setupRenderer();
        this.setupScene();
        
        this.resources = new ResourceManager();
        this.village = new Village();
        this.ui = new UIManager(this);
        
        this.buildMode = false;
        this.selectedBuildingType = null;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        
        this.clock = new THREE.Clock();
        
        this.init();
    }

    setupRenderer() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFShadowShadowMap;
        document.getElementById('gameContainer').appendChild(this.renderer.domElement);
    }

    setupScene() {
        // Sfondo
        this.scene.background = new THREE.Color(0x1a3a52);
        this.scene.fog = new THREE.Fog(0x1a3a52, 300, 500);

        // Luci
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        const sunLight = new THREE.DirectionalLight(0xffffff, 0.8);
        sunLight.position.set(100, 100, 100);
        sunLight.castShadow = true;
        sunLight.shadow.mapSize.width = 2048;
        sunLight.shadow.mapSize.height = 2048;
        sunLight.shadow.camera.left = -200;
        sunLight.shadow.camera.right = 200;
        sunLight.shadow.camera.top = 200;
        sunLight.shadow.camera.bottom = -200;
        this.scene.add(sunLight);

        // Terreno
        this.createTerrain();

        // Camera posizionamento
        this.camera.position.set(0, 50, 80);
        this.camera.lookAt(0, 0, 0);

        // Controlli
        this.setupControls();
    }

    createTerrain() {
        const geometry = new THREE.PlaneGeometry(500, 500, 50, 50);
        geometry.rotateX(-Math.PI / 2);

        // Altura del terreno
        const positionAttribute = geometry.getAttribute('position');
        for (let i = 0; i < positionAttribute.count; i++) {
            const y = Math.sin(i / 10) * 2 + Math.cos(i / 15) * 1;
            positionAttribute.setY(i, y);
        }

        const material = new THREE.MeshPhongMaterial({
            color: 0x2d5016,
            shininess: 0
        });

        const terrain = new THREE.Mesh(geometry, material);
        terrain.receiveShadow = true;
        this.scene.add(terrain);

        // Aggiunta di erba decorativa
        this.addGrassDetails();
    }

    addGrassDetails() {
        // Aggiungi alcuni alberi e pietre decorative
        for (let i = 0; i < 20; i++) {
            const x = (Math.random() - 0.5) * 400;
            const z = (Math.random() - 0.5) * 400;
            const height = 5;

            const geometry = new THREE.ConeGeometry(2, height, 8);
            const material = new THREE.MeshPhongMaterial({ color: 0x228B22 });
            const tree = new THREE.Mesh(geometry, material);
            tree.position.set(x, height / 2, z);
            tree.castShadow = true;
            tree.receiveShadow = true;
            this.scene.add(tree);
        }
    }

    setupControls() {
        this.controls = {
            forward: false,
            backward: false,
            left: false,
            right: false,
            up: false,
            down: false
        };

        document.addEventListener('keydown', (e) => {
            if (e.key === 'w' || e.key === 'W') this.controls.forward = true;
            if (e.key === 's' || e.key === 'S') this.controls.backward = true;
            if (e.key === 'a' || e.key === 'A') this.controls.left = true;
            if (e.key === 'd' || e.key === 'D') this.controls.right = true;
            if (e.key === ' ') this.controls.up = true;
            if (e.key === 'Control') this.controls.down = true;
        });

        document.addEventListener('keyup', (e) => {
            if (e.key === 'w' || e.key === 'W') this.controls.forward = false;
            if (e.key === 's' || e.key === 'S') this.controls.backward = false;
            if (e.key === 'a' || e.key === 'A') this.controls.left = false;
            if (e.key === 'd' || e.key === 'D') this.controls.right = false;
            if (e.key === ' ') this.controls.up = false;
            if (e.key === 'Control') this.controls.down = false;
        });

        document.addEventListener('click', (e) => this.onMouseClick(e));
        document.addEventListener('mousemove', (e) => this.onMouseMove(e));

        window.addEventListener('resize', () => this.onWindowResize());
    }

    onMouseClick(event) {
        if (this.buildMode && this.selectedBuildingType) {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            this.raycaster.setFromCamera(this.mouse, this.camera);

            // Cercare intersezione con il terreno
            const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
            const intersection = new THREE.Vector3();
            this.raycaster.ray.intersectPlane(groundPlane, intersection);

            if (this.resources.spendResources(buildingTypes[this.selectedBuildingType].cost)) {
                const building = this.village.addBuilding(this.selectedBuildingType, intersection);
                const mesh = building.createMesh();
                this.scene.add(mesh);

                // Aggiorna risorse e produzione
                const production = this.village.getTotalProduction();
                this.resources.production = production;

                this.buildMode = false;
                this.ui.showInfo('Costruito!', `${buildingTypes[this.selectedBuildingType].name} costruita!`);
            } else {
                this.ui.showInfo('Errore', 'Risorse insufficienti!');
            }
        }
    }

    onMouseMove(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    setBuildMode(active, buildingType) {
        this.buildMode = active;
        this.selectedBuildingType = buildingType;
    }

    updateCamera() {
        const speed = 0.5;
        if (this.controls.forward) this.camera.position.z -= speed;
        if (this.controls.backward) this.camera.position.z += speed;
        if (this.controls.left) this.camera.position.x -= speed;
        if (this.controls.right) this.camera.position.x += speed;
        if (this.controls.up) this.camera.position.y += speed;
        if (this.controls.down) this.camera.position.y -= speed;
    }

    update() {
        const deltaTime = this.clock.getDelta();

        // Aggiorna risorse
        this.resources.update(deltaTime);

        // Aggiorna villaggio
        this.village.update(deltaTime);

        // Aggiorna interfaccia
        this.ui.updateResources();
        this.ui.updateStats();

        // Aggiorna camera
        this.updateCamera();
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.update();
        this.render();
    }

    init() {
        this.ui.init();

        // Aggiungi alcuni edifici iniziali
        const startBuildings = ['farm', 'house', 'tavern'];
        startBuildings.forEach((type, index) => {
            const x = (index - 1) * 10;
            const position = new THREE.Vector3(x, 0.5, 0);
            const building = this.village.addBuilding(type, position);
            const mesh = building.createMesh();
            this.scene.add(mesh);
        });

        // Aggiorna produzione iniziale
        const production = this.village.getTotalProduction();
        this.resources.production = production;

        // Aggiungi popolazione iniziale
        this.resources.addResource('population', production.population);

        this.animate();
    }
}
