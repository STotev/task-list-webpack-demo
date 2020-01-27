const app = new App();
const taskList = new TaskList();

taskList.add(new Task(null,'Some title', 'Some description', TaskStage.TODO));
taskList.add(new Task(null,'Some title 2', 'Some description 2', TaskStage.IN_PROGRESS));
taskList.add(new Task(null,'Some title 3', 'Some description 3', TaskStage.IN_PROGRESS));
taskList.add(new Task(null,'Some title 4', 'Some description 4', TaskStage.TODO));
taskList.add(new Task(null,'Some title 5', 'Some description 5', TaskStage.DONE));
taskList.add(new Task(null,'Some title 6', 'Some description 6', TaskStage.ON_HOLD));
taskList.add(new Task(null,'Some title 7', 'Some description 7', TaskStage.DONE));
taskList.add(new Task(null,'Some title 8', 'Some description 8', TaskStage.IN_PROGRESS));
taskList.add(new Task(null,'Some title 9', 'Some description 9', TaskStage.IN_PROGRESS));

app.registerTaskList(taskList);

app.registerStage(new Stage("#todo",        TaskStage.TODO));
app.registerStage(new Stage("#in-progress", TaskStage.IN_PROGRESS));
app.registerStage(new Stage("#on-hold",     TaskStage.ON_HOLD));
app.registerStage(new Stage("#done",        TaskStage.DONE));

app.display();
