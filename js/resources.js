class ResourceManager {
    constructor() {
        this.resources = {};
    }

    loadResource(name, url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.onload = () => {
                this.resources[name] = img;
                resolve(img);
            };
            img.onerror = () => reject(new Error(`Failed to load resource: ${url}`));
        });
    }

    getResource(name) {
        return this.resources[name];
    }
}

// Usage example:
// const resourceManager = new ResourceManager();
// resourceManager.loadResource('background', 'path/to/background.png');
