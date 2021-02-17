const output = document.getElementById('output-tasks');
const input = document.getElementById("to-do-input");
const button = document.getElementById("to-do-button");
const clearButton = document.getElementById('clear-button');

const CHECK = "fa-check-double";
const UNCHECK = "fa-check";
const LINE_THROUGH = "lineThrough";
const COMPLETED = "completed-output";




// Variables
let LIST, id;

// get item from localstorage
let data = localStorage.getItem("TODO");

// check if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last one in the list
    loadList(LIST); // load the list to the user interface
}else{
    // if data isn't empty
    LIST = [];
    id = 0;
}

// load items to the user's interface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// add to do function

function addToDo(toDo, id, done, trash){
    
    if(trash){ return; }
    
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    const FINISHED = done ? COMPLETED : "";
        
    const item = `<div class="col-md-12 output ${FINISHED}">
	                   <p class="to-do-output ${LINE}" id="to-do-output">${toDo}</p>
                       <i class="fas ${DONE} check-button" job="complete" id="${id}"></i>
                       <i class="fas fa-trash remove-button" job="delete" id="${id}"></i>
                       
	               </div>
                `;
    
    const position = "beforeend";
    
    output.insertAdjacentHTML(position, item);
    
}

// add an item to the list user the enter key
button.addEventListener("click",function(event){
    
        const toDo = input.value;
                
        // if the input isn't empty
        if(toDo){
            addToDo(toDo, id, false, false);
            
            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });
            
            // add item to localstorage ( this code must be added where the LIST array is updated)
            localStorage.setItem("TODO", JSON.stringify(LIST));
            
            id++;
            
            let bottom = document.getElementById('bottom-container')
            bottom.innerText = "Task added!"
            bottom.style.padding = "10px"
            bottom.style.display = "block"
            setTimeout(() => {
                bottom.style.display = "none"
            }, 2000)
            
        }
        input.value = "";
    
});


// complete to do
function completeToDo(element){
    if(element.classList.contains(CHECK)){
        alert('Task is already completed!')
    }else{

        element.classList.toggle(CHECK);
        
        element.parentElement.classList.toggle(COMPLETED);
        console.log(element.parentElement)
        
        element.parentNode.querySelector(".to-do-output").classList.toggle(LINE_THROUGH);
        
        LIST[element.id].done = true;
        
        
        let bottom = document.getElementById('bottom-container')
        bottom.innerText = "Task completed!"
        bottom.style.padding = "10px"
        bottom.style.display = "block"
        setTimeout(() => {
            bottom.style.display = "none"
        }, 2000)
    }
}

// remove to do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
        
    LIST[element.id].trash = true;
    
    let bottom = document.getElementById('bottom-container')
    bottom.innerText = "Task removed!"
    bottom.style.padding = "10px"
    bottom.style.display = "block"
    setTimeout(() => {
            bottom.style.display = "none"
    }, 2000)
}


// target the items created dynamically

output.addEventListener("click", function(event){
    const element = event.target; // return the clicked element inside list
    const elementJob = element.attributes.job.value; // complete or delete
    
    if(elementJob == "complete"){
        completeToDo(element);
        
    }else if(elementJob == "delete"){
        removeToDo(element);        
    }
    
    
    // add item to localstorage ( this code must be added where the LIST array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));
});

clearButton.addEventListener('click', () => {
   if(localStorage.length == 0){
       alert('Local storage is empty!')
   }else{
       localStorage.clear(); 
   }
});
















