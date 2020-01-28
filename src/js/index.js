const app = new App();
const taskList = new TaskList();

app.registerTaskList(taskList);

app.registerStage(new Stage("#todo",        TaskStage.TODO));
app.registerStage(new Stage("#in-progress", TaskStage.IN_PROGRESS));
app.registerStage(new Stage("#on-hold",     TaskStage.ON_HOLD));
app.registerStage(new Stage("#done",        TaskStage.DONE));

app.display();
