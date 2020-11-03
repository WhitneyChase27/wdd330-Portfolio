function saveTodo(todo){
    const toDoList = getTodoList(); 

    toDoList.push(todo); 
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
    
}

function crossedOut(completed, content){
    
    // const completed = true;

    if (completed == true){
        var result = content.strike();
    }
    return result;
}

function deleteTodo(id){
    const toDoList = getTodoList(); 
    const updatedTodos = toDoList.filter( todo => todo.id != id)
    localStorage.setItem('toDoList', JSON.stringify(updatedTodos));
}

function getTodoList(){
    const todoListString = localStorage.getItem('toDolist'); 
    let todoList = []; 

    if (todoListString){
        todoList = JSON.parse(todoListString);
        console.log("FOR GET LIST: " + todoList);
    }

    return todoList;
}

export default{
    saveTodo, 
    getTodoList, 
    deleteTodo, 
    crossedOut
}