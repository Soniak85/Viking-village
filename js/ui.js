class UIManager {
    constructor() {
        this.keyBindings = {};
        this.initControls();
    }

    initControls() {
        document.addEventListener('keydown', (event) => {
            this.handleKeyPress(event);
        });
    }

    handleKeyPress(event) {
        const action = this.keyBindings[event.code];
        if (action) {
            action();
        }
    }

    setKeyBinding(key, action) {
        this.keyBindings[key] = action;
    }

    removeKeyBinding(key) {
        delete this.keyBindings[key];
    }
}

export default UIManager;