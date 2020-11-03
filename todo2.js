// import utils from './utils.js';
// import ls from './ls.js';

// document.querySelector('#addBtn').onclick = newTodo; 
// const todoList = ls.getTodoList();

// let i = (todoList.length -1);

// function loadTodos(){
//     const todoList = ls.getTodoList(); 
//      todoList.forEach(todo => {
//          const el = createTodoElement(todo); 
//          todoList.push(el);
//         //  addToList(el);
//      })
// }

// //displays the todos stored in the todo list stored in the ls array, local storage
// loadTodos();


// function newTodo (){
//     const todo = createTodo(); 
//     const todoDiv = createTodoElement(todo); 
//     addToList(todoDiv); 
//     todoList.push(todo);
//     ls.saveTodo(todo);
// }


// function createTodo(){
//     const input = document.querySelector('#todoInput'); 
//     const newTodo = {id: Date.now(), content: input.value, completed: false}
//     input.value = ''; 
//     return newTodo;
// }


// function createTodoElement(todo){
//     ///todo div 
//     const todoDiv = document.createElement('div'); 
//     todoDiv.classList.add('todo'); 


//     //complete btn
//     const completeBtn = document.createElement('INPUT'); 
//     completeBtn.setAttribute('type', "checkbox");
//     completeBtn.setAttribute('data-completed', todo.completed, 'data-content', todo.content);  
//     completeBtn.classList.add('complete-btn'); 
//     completeBtn.setAttribute('data-id', todo.id); 
//     completeBtn.innerText = "Complete"; 
//     completeBtn.onclick = crossedOut;


//     //todo content 
//     const todoContent = document.createElement('div'); 
//     todoContent.innerText = todo.content; 
//     todoContent.classList.add('todo-content'); 


//     //delete btn 
//      const deleteBtn = document.createElement('button');
//     // const deleteBtn = document.querySelector('#delete');  
//     deleteBtn.setAttribute('data-id', todo.id); 
//     deleteBtn.classList.add('todo-delete-btn'); 
//     deleteBtn.innerText = "X"; 
//     deleteBtn.onclick = deleteTodo;
    

//     todoDiv.appendChild(completeBtn); 
//     todoDiv.appendChild(todoContent); 
//     todoDiv.appendChild(deleteBtn); 

//     return todoDiv;
// }


// function addToList(todoDiv){
//     // add to the document 
//     document.querySelector('#todos').appendChild(todoDiv);
// }


// // Event Handlers 
// function deleteTodo(e){
//     const btn = e.currentTarget; 
//     ls.deleteTodo(btn.getAttribute('data-id'));
//     // document.querySelector('#todos').innerHTML = ''; 
//     // loadTodos();
// }


// function crossedOut(e){
//     const btn = e.currentTarget; 
//     btn.completed = true; 
//     for(let i = 0; i < todoList.length; i++){
//         if (btn.id === todoList[i]){
//             btn.content = todoList[i].content;

//             if (btn.completed === true){
//                 btn.content.line = "line-through"; 
//                 document.getElementById("todo-content").style.textDecoration = todoList[i].line;
//             }
//         }


        
// }
    
//     console.log("completed: " + btn.completed); 
//     ls.crossedOut(btn.getAttribute('data-completed', 'data-content'));
//     // document.querySelector('#todos').innerHTML = ''; 
//     // loadTodos();
// }



















const clear = document.querySelector(".clear"); 
const dateElement = document.getElementById("date"); 
const list = document.getElementById("list"); 
const input = document.getElementById("input"); 


const check = "fa-check-circle"; 
const unchecked = "fa-circle"; 
const lineThrough = "lineThrough"; 


let LIST, id;

let data = localStorage.getItem("TODO");
if(data){
    LIST = JSON.parse(data); 
    id = LIST.length;
    loadList(LIST);
}else{
    LIST = []; 
    id = 0;
}

function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}


function addToDo (todo, id, done, trash) {

    if(trash){ return; }

    
    const DONE = done ? check : unchecked;
    const line = done ? lineThrough : "";

    const item = ` <li class="item">
                        <i class="${DONE}" job="complete" id=${id}"></i>
                        <p class="text ${line}">${todo}</p>
                        <i class="fas fa-trash-alt" job="delete" id=${id}"></i>
                    </li>`;

    const position = "beforeend" 
    list.insertAdjacentHTML(position, item);               
}

document.addEventListener("keyup", function(even){

    if(event.keyCode == 13){
        const toDo = input.value; 
        
        if(toDo){
            addToDo(toDo, id, false, false); 

            LIST.push({
                name: toDo, 
                id: id, 
                done: false, 
                trash: false
            });

            //local storage 
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
        }
            input.value = "";
    }
    
}); 

function completeToDo(element){
    element.classList.toggle(check); 
    element.classList.toggle(unchecked); 
    element.parentNode.querySelector(".text").classList.toggle(lineThrough);

    console.log("LIST emelemtneje.id: " + element.id);
    LIST[element.id].done = LIST[element.id].done ? false : true;
    // for(var i = 0; i < LIST.length; i++){
    //     if(element.id == i.id){
    //         element.trash = true;
    //     }
    // }
}

function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    for(var i = 0; i < LIST.length; i++){
        if(element.id == i.id){
            element.trash = true;
        }
    }
    LIST[element.id].trash = true; 
}

list.addEventListener("click", function(event){
    const element = event.target; 
    const elementJob = element.attributes.job.value;
    console.log("LOCAL STORAGE CHECKED: " + element);

    //see if the element is checked or unchecked 
    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }

    //local storage 
    localStorage.setItem("TODO", JSON.stringify(LIST));
});

