class App
{
    constructor() {
        this.stages = [];
        this.taskList = null;

        this.$addNewTaskBtn = $('#addNewTaskHandle');
        this.$persistBtn = $('#persistListHandle');
        this.$deleteAllBtn = $('#deleteAllHandle');

        this.$modal = $('#modal');
        this.$backdrop = $('#backdrop', this.$modal);

        this.$titleField = $('#title', this.$modal);
        this.$descriptionField = $('#description', this.$modal);
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

        this.$backdrop.on('click', this._onModalClose);

        this.$addNewTaskBtn.on('click');
        this.$persistBtn.on('click', this._onPersistHandler);
        this.$deleteAllBtn.on('click', this._onDeleteAllHandler);

        this.$startBtn.on('click', this._onStartHandler);
        this.$editBtn.on('click', this._onEditHandler);
        this.$deleteBtn.on('click', this._onDeleteHandler);
        this.$completeBtn.on('click', this._onCompleteHandler);
        this.$pauseBtn.on('click', this._onPauseHandler);
    }

    unregisterHandlers() {
        this.$backdrop.off();

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
    };

    _onPauseHandler = (e) => {
        e.preventDefault();

        const id = $(e.currentTarget).attr('data-id');

        this.taskList.moveTaskTo(TaskStage.ON_HOLD, id);
        this.display();
    };

    _onEditHandler = (e) => {
        e.preventDefault();

        const id = $(e.currentTarget).attr('data-id');
        const task = this.taskList.get(id);

        this._onModalOpen();

        this.$titleField.val(task.getTitle());
        this.$descriptionField.val(task.getDescription());

        /**
         * TODO:
         *  - Change the modal's "Add task" button to "Save changes" On Edit
         *  - Add event when the modal's button is clicked. It should close the modal + re-render the tasks (both On Edit and On Create)
         */
    };

    _onModalOpen = () => {
        this.$modal.addClass('show');
        this.$backdrop.on('click', this._onModalClose);
    };

    _onModalClose = () => {
        this.$modal.removeClass('show');
        this.$backdrop.off();
    }
}
