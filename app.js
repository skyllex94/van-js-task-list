// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load All EventListeners
loadEventListeners();
// All Event to be pushed

function loadEventListeners(){
    // Add Task Event
    form.addEventListener('submit', addTask);
    // Remove Task Event
    taskList.addEventListener('click', removeTask);
    // Clear Tasks Event
    clearBtn.addEventListener('click', clearTasks);
    // Filter Tasks Event
    filter.addEventListener('keyup', filterTasks);
}

function addTask(event){
    if(taskInput.value === ''){
        alert('Please add a task!');
    }
    const li = document.createElement('li');
    // Create Li Element
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));
    
    // Create new link Element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove">X</i>';
    li.appendChild(link);

    //Append written Task to the Task List
    taskList.appendChild(li);
    taskInput.value = '';

    event.preventDefault();
}

function removeTask(event){
    if(event.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure you want to remove this task?')){
            event.target.parentElement.parentElement.remove();
        }
    }
}

function clearTasks(event){
    if(confirm("Clear all tasks?")){
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        }
    }
}

function filterTasks(event){
    const text = event.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(currentTask){
        const item = currentTask.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) == -1){
            currentTask.style.display = 'none';
        } else {
            currentTask.style.display = 'block';
        }
    })
}