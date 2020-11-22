
const getJSON = async url => {
    try {
        const response = await fetch(url);
        const parsedJson = await response.json();
        return parsedJson;
    }
    catch (error) {
        console.log(error);
    }
}

const getLocation = function(options) {
    return new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
};



export { getJSON }
export { getLocation }