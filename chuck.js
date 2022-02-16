document.querySelector('.get-jokes').addEventListener('click', getJokes);


function getJokes(e){
    const number = document.querySelector('input[type="number"]').value;

    const xhr = new XMLHttpRequest();

    // Fetch the data from the API
    xhr.open("GET", `http://api.icndb.com/jokes/random/${number}`, true);

    xhr.onload = function(){
        if(this.status === 200){
            // Parse an as Object
            const response = JSON.parse(this.responseText);
            
            let UIoutput = '';

            if(response.type === 'success'){
                // Loop through all the jokes and the number that was chosen  before
                response.value.forEach(function(currentJoke){
                    UIoutput += `
                    <li>${currentJoke.joke}</li>`;
                });
            } else {
                UIoutput += `<li>There has been an error with fetching the data.</li>`
            }

            // Obtain the html element and populate it with the UIoutput we have gathered from above
            document.querySelector('.jokes').innerHTML = UIoutput;
        }
    }

    // Return the request and populate in Asynchronously
    xhr.send();
    e.preventDefault();
}