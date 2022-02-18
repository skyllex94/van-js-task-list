// Initialize classes needed
const github = new Github;

// Search Input
const searchUser = document.getElementById('searchUser');

// Search Input Event Listener
searchUser.addEventListener('keyup', (e) => {
    // Get Input Text
    const userText = e.target.value;

    if(userText !== ''){
        // Make HTTP Call
        github.getUser(userText)
        .then(data => {
            if(data.profile.message === 'Not Found'){
                // Show an alert that there was no user found

            } else {
                // Realize the fetched data in the UI
            }
        })
    } else {
        // Clear Profile 
    }
});