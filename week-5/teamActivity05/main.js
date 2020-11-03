

for (let i = 0; i <= hikeList.length; i++)
{
    console.log("PICTURE: " + hikeList[i].imgSrc);
    document.getElementById("hikes").innerHTML += '<li><h2>'
    + hikeList[i].name
    +'</h2><br><div id="info'
    +[i]
    +'"><img src="'
    + hikeList[i].imgSrc
    +'" alt="'
    +hikeList[i].imgAlt
    +'"><br>'
    +'<h3>Distance:</h3>'
    + hikeList[i].distance
    +'<br>'
    + '<h3>Difficulty:</h3>'
    + hikeList[i].difficulty
    + '<br>'
    +'</li></div>'

}