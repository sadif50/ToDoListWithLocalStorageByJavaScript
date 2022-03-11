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
    if(taskInput.value === ''){
        alert("Add Task");
    }else {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value + '   '));
        allTask.appendChild(li);

        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerText = 'X';
        li.appendChild(link);

        storeTaskInLoaclStorage(taskInput.value);

        taskInput.value = '';
    }
    
    e.preventDefault();
}

// Remove List One by One
function removeList(e){
    if(e.target.hasAttribute('href')){
        if(confirm("Are you sure to delete data?")){
            let ele = e.target.parentElement;
            ele.remove();

            removeFromLocalStorage(ele);
        }
    }
}

// Clear all task

function clearAll(e){
    // allTask.innerHTML = '';
    while(allTask.firstChild){
        allTask.removeChild(allTask.firstChild);
    }

    // Remove from local storage
    localStorage.removeItem('tasks');
}

// Filter Task 

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