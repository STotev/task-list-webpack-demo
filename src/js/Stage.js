class Stage
{
    constructor(selector, stageType) {
        this.$el = $(selector);
        this.$content = $(".content", this.$el);
        this.stage = stageType;
    }

    display(taskList) {
        this.$content.html('');

        for (const task of taskList.filterBy(this.stage)) {
            this.$content.append(task.render());
        }
    }
}
