document.getElementById('button1').addEventListener('click', getText);
document.getElementById('button2').addEventListener('click', getJSON);
document.getElementById('button3').addEventListener('click', getAPI);

function getText(){
    fetch('/promises/test.txt').then(function(response){
        return response.text();
    }).then(function(data){
        document.getElementById('output').innerHTML = data;
    }).catch(function(err){
        console.log(err);
    })
}

function getJSON(){
    fetch('/promises/posts.json').then(function(post){
        return post.json();
    }).then(function(data){
        
        let output = [];
        data.forEach(function(currentData){
            output = output + `<li>${currentData.title} : ${currentData.body}</li>`;
        });
        document.getElementById('output').innerHTML = output;
    }).catch(function(err){
        console.log(err);
    })
}

function getAPI(){
    fetch('https://api.github.com/users').then(function(info){
        return info.json();
    }).then(function(data){
        let output = [];

        data.forEach(function(currentData){
            output = output + `<li>${currentData.login}</li>`;
        });
        document.getElementById('output').innerHTML = output;
    }).catch(function(err){
        console.log(err);
    })
}