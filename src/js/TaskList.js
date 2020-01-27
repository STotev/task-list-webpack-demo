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

    remove(taskId) {
        _.unset(this.list, [taskId]);
    }

    update(taskId) {

    }

    persist() {
        const savedList = this.getList();
        const newList = {
            ...savedList,
            ...this.list
        };

        this.storage.add(TaskList.storageKey, JSON.stringify(newList));
        this.list = newList;
    }

    getList() {
        const list = this.storage.get(TaskList.storageKey);
        if (list) {
            const parsedList = JSON.parse(list);

            return _.mapValues(parsedList, (o) => {
                return new Task(o.id, o.title, o.description, o.stage);
            });
        }

        return [];
    }

    clearList() {
        this.storage.flush();
    }
}
