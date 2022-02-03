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
}

function addTask(event){
    if(taskInput.value === ''){
        alert('Please add a task!');
    }
    // Create Li Element
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));
    
    // Create new link Element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);

    //Append written Task to the Task List
    taskList.appendChild(li);
    taskInput.value = '';

    event.preventDefault();
}