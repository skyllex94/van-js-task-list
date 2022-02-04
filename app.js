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
    // DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks);
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

    // Store in Local Storage
    storeTaskInLocalStorage(taskInput.value);


    taskInput.value = '';
    event.preventDefault();
}

function storeTaskInLocalStorage(inputText){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(inputText)
    localStorage.setItem('tasks',JSON.stringify(tasks))
}

function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.forEach(function(current){
            let li = document.createElement('li');
            li.className = 'collection-item';
            li.textContent = current;
            let link = document.createElement('a');
            link.className = 'delete-item secondary-content';
            link.innerHTML = '<i class="fa fa-remove">X</i>';
            li.appendChild(link);
        
            taskList.appendChild(li);
        })
    }
}

/*
for(let i=0; i<arrayOfValues.length; i++){
    let arrayOfValues = new Array(Object.values(localStorage));

    console.log(arrayOfValues);
    let li = document.createElement('li');
    li.className = 'collection-items';
    li.textContent = arrayOfValues[i];
    let link = document.createElement('a');
    link.innerHTML = '<i class="fa fa-remove">X</i>';
    li.appendChild(link);

    taskList.appendChild(li);
} 
*/


function removeTask(event){
    if(event.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure you want to remove this task?')){
            event.target.parentElement.parentElement.remove();
            // Remove from LocalStorage
            removeTaskFromLocalStorage(event.target.parentElement.parentElement);

            // let curIteration = event.target.parentElement.textContent;
            // localStorage.getItem.forEach(function(current){
            //     if(curIteration == current){
            //         localStorage.removeItem(current);
            //     }
            // })
        }
    }
}

function removeTaskFromLocalStorage(taskForRemoving){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    for( var i = 0; i < tasks.length; i++){ 
        if ( JSON.stringify(tasks[i]) == taskForRemoving.textContent) { 
            tasks.splice(i, 1); 
        }
    
    }
    // console.log(index, i);
    // tasks.forEach(function(current, index){
        
    //     if(current === taskForRemoving.textContent){
    //         tasks.splice(index,1);
    //     }
    //     console.log(current);
    // })
    localStorage.setItem('tasks', JSON.stringify(tasks)); 
}

function clearTasks(event){
    if(confirm("Clear all tasks?")){
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        }
    }
    localStorage.clear();
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