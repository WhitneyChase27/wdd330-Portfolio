

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



