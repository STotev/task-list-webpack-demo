class TaskList
{
    static storageKey = 'todoList';

    constructor() {
        this.storage = new Storage();
        this.list = {};
    }

    add(item) {
        const id = `task-${Object.keys(this.list).length + 1}`;
        item.setId(id);

        this.list[id] = item;
    }

    get(taskId) {
        return this.list[taskId];
    }

    removeTask(taskId) {
        _.unset(this.list, taskId);
    }

    moveTaskTo(stage, taskId) {
        if (!checkStageIsValid(stage)) {
            throw new Error("Invalid stage type.");
        }

        this.list[taskId].moveTo(stage);
    }

    persist() {
        this.storage.add(TaskList.storageKey, JSON.stringify(this.list));
    }

    getList() {
        if (_.isEmpty(this.list)) {
            this.list = this.parseList(this.storage.get(TaskList.storageKey));
        }

        return this.list;
    }

    clearList() {
        this.list = {};
        this.storage.flush();
    }

    filterBy(stage) {
        const list = this.getList();

        return _.filter(list, (o) => o.getStage() === stage);
    }

    parseList(list) {
        const parsedList = JSON.parse(list);

        return _.mapValues(parsedList, (o) => {
            const task = new Task();
            task.setId(o.id);
            task.setTitle(o.title);
            task.setDescription(o.description);
            task.setStage(o.stage);

            return task;
        });
    }
}
