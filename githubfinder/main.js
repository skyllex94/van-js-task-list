// Initialize classes needed
const github = new Github;
const ui = new UI;

// Search Input
const searchUser = document.getElementById('searchUser');

// Search Input Event Listener
searchUser.addEventListener('keyup', (e) => {
    // Get Input Text in the container 'searchUser'
    const userText = e.target.value;

    if(userText !== ''){
        // Make HTTP Call
        github.getUser(userText)
        .then(data => {
            if(data.profile.message === 'Not Found'){
                // Show an alert that there was no user found
                ui.showAlert('User Not Found', 'alert alert-danger');

            } else {
                // Realize the fetched data in the UI
                ui.showProfile(data.profile);

            }
        })
    } else {
        // Clear Profile in the UI
        ui.clearProfile();
    }
});