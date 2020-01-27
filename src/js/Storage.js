class Storage {
    constructor() {
        if (!storageAvailable('localStorage')) {
            throw new Error("localStorage not supported.");
        }

        this.storage = window.localStorage;
    }

    get(key) {
        return this.storage.getItem(key);
    }

    add(key, value) {
        if (value === null) {
            value = "";
        }

        this.storage.setItem(key, value);
    }

    flush() {
        this.storage.clear();
    }
}

