
/*class commentModel {
    constructor (type) {
        this.type = type;
        this.comments = localStorage.getItem(this.type) || [];
    }
}*/
//Event handlers
document.querySelector('#addCommentBtn').onclick = newComment;
window.addEventListener('load', showCommentList);

function getAllComments(){
    const hikeListString = localStorage.getItem('comments');
    let hikeList = [];

    if (hikeListString){
        hikeList = JSON.parse(hikeListString);
    }
    return hikeList;
}

function newComment(){
    const hike = addComment();

    const hikeDiv = createHikeElement(hike);
    addToList(hikeDiv);
    saveComment(hike);
    showCommentList();
    
}

function saveComment(hike){
    const hikeList = getAllComments();

    hikeList.push(hike);
    localStorage.setItem('comments',JSON.stringify(hikeList));
}

function addToList(hikeDiv){
    document.querySelector('#theList').appendChild(hikeDiv);
}

function renderCommentList(){
    const hikeList = getAllComments();

    let count = 0;
    hikeList.forEach(hike =>{
        const el = createHikeElement(hike);
        addToList(el);
        count++;
    });
}

function createHikeElement(hike){
    const hikeDiv = document.createElement('div');
    hikeDiv.classList.add('hike');
    hikeDiv.setAttribute('id', hike.id);
    

    const typeDiv = document.createElement('div');
    typeDiv.classList.add('type');
    typeDiv.setAttribute('data-id', hike.id);
    typeDiv.innerTExt = hike.type;

    const nameh2 = document.createElement('h2');
    nameh2.innerText = hike.name;
    nameh2.classList.add('hike-content');
    
    const dateTime = document.createElement('h3');
    dateTime.setAttribute('data-id', hike.id);
    dateTime.innerText = hike.date;
    dateTime.classList.add('dateTime');

    const contentDiv = document.createElement('div');
    contentDiv.setAttribute('data-id', hike.id);
    contentDiv.innerText = hike.content;
    contentDiv.classList.add('commentData');

    hikeDiv.appendChild(nameh2);
    hikeDiv.appendChild(typeDiv);
    hikeDiv.appendChild(dateTime);
    hikeDiv.appendChild(contentDiv);
    


    return hikeDiv;
}

function filterCommentsByName(comment){
    if (hikeComments === null){
        return this.comment;
    }
    else{
        
        return this.comment.hikeList(el => el.name === hikeComments); 
    }
}



function addComment(){
    let hikeInput = document.querySelector('#hikeName').value;
    let commonContent = document.querySelector('#commentContent').value;
    const hikeComments = getAllComments();

    const newComment = {
        type : 'hike',
        name : hikeInput,
        date : new Date(),
        content : commonContent
    }

    hikeInput = '';
    commonContent = '';
    return newComment;
}

function showCommentList () {
    const hikeList = getAllComments();

    let count = 0;

    hikeList.forEach(hike =>{
        const el = createHikeElement(hike);
        addToList(el);
        count++;
    })
}


export default{
    getAllComments,
    renderCommentList, 
    filterCommentsByName, 
    addComment  
}