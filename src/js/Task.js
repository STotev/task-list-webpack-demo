class Task
{
    constructor(id = null, title, description, stage = TaskStage.TODO) {
        this.setId(id);
        this.setTitle(title);
        this.setDescription(description);
        this.setStage(stage);
    }

    setId(id) {
        this.id = id;
    }

    getId() {
        return this.id;
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
        const stages = Object.values(TaskStage);
        if (!stages.includes(value)) {
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
                <span class="title">${this.title}</span>
                <div class="tools">
                    <ul>
                        <li>
                            <a href="#${this.id}" class="edit">
                                <i class="fa fa-edit"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#${this.id}" class="delete">
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
