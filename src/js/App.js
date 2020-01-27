class App
{
    constructor() {
        this.stages = [];
        this.taskList = null;

        this.$addNewTaskBtn = $('#addNewTaskHandle');
        this.$persistBtn = $('#persistListHandle');
        this.$deleteAllBtn = $('#deleteAllHandle');
    }


    registerTaskList(taskList) {
        if (!(taskList instanceof TaskList)) {
            throw new Error(`The argument must be an instance of TaskList: ${typeof taskList} given`);
        }

        this.taskList = taskList;
    }

    registerStage(stage) {
        if (!(stage instanceof Stage)) {
            throw new Error(`The argument must be an instance of Stage: ${typeof stage} given`);
        }

        this.stages.push(stage);
    }

    display() {
        this.runStageProcess(stage => stage.display(this.taskList));

        this.registerHandlers();
    }

    registerHandlers() {
        if (!(this.taskList instanceof TaskList)) {
            throw new Error("Missing task list");
        }

        this.setToolButtons();
        this.unregisterHandlers();

        this.$addNewTaskBtn.on('click');
        this.$persistBtn.on('click', this._onPersistHandler);
        this.$deleteAllBtn.on('click', this._onDeleteAllHandler);

        this.$startBtn.on('click', this._onStartHandler);
        this.$editBtn.on('click');
        this.$deleteBtn.on('click', this._onDeleteHandler);
        this.$completeBtn.on('click', this._onCompleteHandler);
        this.$pauseBtn.on('click', this._onPauseHandler);
    }

    unregisterHandlers() {
        this.$addNewTaskBtn.off();
        this.$persistBtn.off();
        this.$deleteAllBtn.off();

        this.$startBtn.off();
        this.$editBtn.off();
        this.$deleteBtn.off();
        this.$completeBtn.off();
        this.$pauseBtn.off();
    }

    setToolButtons() {
        this.$startBtn = $('.startHandle');
        this.$editBtn = $('.editHandle');
        this.$deleteBtn = $('.deleteHandle');
        this.$completeBtn = $('.completeHandle');
        this.$pauseBtn = $('.pauseHandle');
    }

    runStageProcess(callback) {
        if (this.stages.length > 0) {
            this.stages.forEach(callback);
        }
    }

    _onDeleteAllHandler = (e) => {
        e.preventDefault();

        this.taskList.clearList();
        this.display();
    };

    _onDeleteHandler = (e) => {
        e.preventDefault();

        const id = $(e.currentTarget).attr('data-id');

        this.taskList.removeTask(id);
        this.display();
    };

    _onPersistHandler = (e) => {
        e.preventDefault();

        this.taskList.persist();

        const $currentTarget = $(e.currentTarget);
        const currentText = $currentTarget.text();

        $currentTarget.text('Saved!');

        window.setTimeout(() => $currentTarget.text(currentText), 2000);
    };

    _onStartHandler = (e) => {
        e.preventDefault();

        const id = $(e.currentTarget).attr('data-id');

        this.taskList.moveTaskTo(TaskStage.IN_PROGRESS, id);
        this.display();
    };

    _onCompleteHandler = (e) => {
        e.preventDefault();

        const id = $(e.currentTarget).attr('data-id');

        this.taskList.moveTaskTo(TaskStage.DONE, id);
        this.display();
    }

    _onPauseHandler = (e) => {
        e.preventDefault();

        const id = $(e.currentTarget).attr('data-id');

        this.taskList.moveTaskTo(TaskStage.ON_HOLD, id);
        this.display();
    }
}
