// Define UI Element
let form = document.querySelector('#task_from');
let taskInput = document.querySelector('#new_task');
let filter = document.querySelector('#task_filter');
let allTask = document.querySelector('#tasks');
let clearBtn = document.querySelector('#clear_task_btn');

// Define Event Listener
form.addEventListener('submit', addTask); 
allTask.addEventListener('click', removeList); 
clearBtn.addEventListener('click', clearAll);
filter.addEventListener('keyup', filterTask);
document.addEventListener('DOMContentLoaded', getTask);

// Add Task Function
function addTask(e) {
    if(taskInput.value === ''){ // check if input value is empty
        alert("Enter Task name");
    }else { // exicute when task is not empty and store data in local storage
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value + '   '));
        allTask.appendChild(li);
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerText = 'X';
        li.appendChild(link);
        // Calling to add data to local storage
        storeTaskInLoaclStorage(taskInput.value);
        // will empty the value of add task input field after submit
        taskInput.value = '';
    }
    // prevent form to reload
    e.preventDefault();
}

// Remove List One by One
function removeList(e){
    if(e.target.hasAttribute('href')){
        if(confirm("Are you sure to delete data?")){
            let ele = e.target.parentElement;
            ele.remove();
            // calling function to remove local storage data
            removeFromLocalStorage(ele);
        }
    }
}

// Clear all task
function clearAll(e){
    while(allTask.firstChild){
        allTask.removeChild(allTask.firstChild);
    }
    // Remove all task from local storage
    localStorage.removeItem('tasks');
}

// Filter Tasks
function filterTask(e){
    let text = e.target.value.toLowerCase();
    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent;

        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display =  'block';
        }else{
            task.style.display =  'none';
        }
    });
}

// store data in local storage 
function storeTaskInLoaclStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get data from local storage
function getTask(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(task => {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task + '   '));
        allTask.appendChild(li);
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerText = 'X';
        li.appendChild(link);
    })
}

// Delete data from local Storage
function removeFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    let li = taskItem;
    li.removeChild(li.lastChild);
    tasks.forEach((task, i)=>{
        if(li.textContent.trim() === task){
            tasks.splice(i, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}