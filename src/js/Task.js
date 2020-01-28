class Task
{
    constructor(title = null, description = null, stage = TaskStage.TODO) {
        this.setId(null);
        this.setTitle(title);
        this.setDescription(description);
        this.setStage(stage);
    }

    setId(id) {
        this.id = id;
    }

    getTitle() {
        return this.title;
    }

    setTitle(value) {
        if (_.isEmpty(value)) {
            value = "[No title]";
        }

        this.title = value;
    }

    getDescription() {
        return this.description;
    }

    setDescription(value) {
        this.description = value;
    }

    getStage() {
        return this.stage;
    }

    setStage(value) {
        if (!checkStageIsValid(value)) {
            throw new Error("Invalid stage type.");
        }

        this.stage = value;
    }

    moveTo(stage) {
        this.setStage(stage);
    }

    render() {
        return `
        <div class="task">
            <div class="header">
                <span class="title ${this.stage === TaskStage.DONE ? 'strike' : ''}">${this.title}</span>
                <div class="tools">
                    <ul>
                        <li class="${this.stage !== TaskStage.TODO ? 'hide' : ''}">
                            <a href="#" data-id="${this.id}" class="startHandle text-green" title="Start task">
                                <i class="fa fa-play"></i>
                            </a>
                        </li>
                        <li class="${this.stage === TaskStage.DONE ? 'hide' : ''}">
                            <a href="#" data-id="${this.id}" class="editHandle text-default" title="Edit task">
                                <i class="fa fa-edit"></i>
                            </a>
                        </li>
                        <li class="${[TaskStage.TODO, TaskStage.DONE].includes(this.stage) ? 'hide' : ''}">
                            <a href="#" data-id="${this.id}" class="completeHandle text-green" title="Complete task">
                                <i class="fa fa-check"></i>
                            </a>
                        </li>
                        <li class="${[TaskStage.TODO, TaskStage.ON_HOLD, TaskStage.DONE].includes(this.stage) ? 'hide' : ''}">
                            <a href="#" data-id="${this.id}" class="pauseHandle text-orange" title="Put on-hold">
                                <i class="fa fa-pause-circle"></i>
                            </a>
                        </li>
                        <li class="${this.stage !== TaskStage.ON_HOLD ? 'hide' : ''}">
                            <a href="#" data-id="${this.id}" class="startHandle text-orange" title="Put in-progress">
                                <i class="fa fa-undo"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#" data-id="${this.id}" class="deleteHandle text-danger" title="Delete task">
                                <i class="fa fa-trash"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="description">${this.description}</div>
        </div>
        `;
    }
}
