const taskList = new TaskList();

taskList.add(new Task(null,'Some title', 'Some description'));
taskList.add(new Task(null,'Some title 2', 'Some description 2'));
taskList.add(new Task(null,'Some title 3', 'Some description 3'));
taskList.add(new Task(null,'Some title 4', 'Some description 4'));
taskList.add(new Task(null,'Some title 5', 'Some description 5'));
taskList.add(new Task(null,'Some title 6', 'Some description 6'));
taskList.add(new Task(null,'Some title 7', 'Some description 7'));
taskList.add(new Task(null,'Some title 8', 'Some description 8'));
taskList.add(new Task(null,'Some title 9', 'Some description 9'));
taskList.persist();


const inProgressElement = document.querySelector('#in-progress > .content');

const tasks = taskList.getList();
for (const task in tasks) {
    inProgressElement.innerHTML += tasks[task].render();
}



console.log(taskList.getList());



// taskList.clearList();
