class Stage
{
    static stages = {};

    constructor(selector) {
        this.el = document.querySelector(selector);
    }

    static register(name, selector) {
        if (Stage.stages.hasOwnProperty(name)) {
            return;
        }

        Stage.stages[name] = new Stage(selector);
    }

    static use(name) {
        if (!Stage.stages.hasOwnProperty(name)) {
            throw new Error(`Stage ${name} is not registered!`);
        }

        return Stage.stages[name];
    }
}
