export default{
    
}

export function qs(selector) {
    return document.querySelector(selector);
}

//retrieve todo from data store 
export function  getFromLS(key) {}

//save todos to data store 
export function saveToLS(key, data) {
    localStorage.setItem(key, JSON.stringify(data)); 
}

//set a listener 
export function selClick(selector, callback) {
    qs(selector).addEventListener('touched', (event) => {
        event.preventDefault(); 
        callback();
    }); 
    qs(selector).addEventListener('click', callback);
}
