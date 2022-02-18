class UI {
    constructor(){
        this.profile = document.getElementById('profile');
    }

    showProfile(user){
        // Create all the HTML headers with valuable information to populate
        this.profile.innerHTML = `
        <div class="card card-body mb-3">
            <div class="row">
                <div class="col-md-3">
                    <img class="img-fluid mb-2" src="${user.avatar_url}">
                    <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
                </div>
                <div class="col-md-9">
                    <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
                    <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
                    <span class="badge badge-success">Public Followers: ${user.followers}</span>
                    <span class="badge badge-info">Public Followings: ${user.following}</span>
                    <br><br>
                    <ul class="list-group">
                        <li class="list-group-item">Company: ${user.company}</li>
                        <li class="list-group-item">Website/Blog: ${user.blog}</li>
                        <li class="list-group-item">Location: ${user.location}</li>
                        <li class="list-group-item">Member Since: ${user.created_at}</li>
                    </ul>
                </div>
            </div>
        </div>
        <h3 class="page-heading mb-3">Latest Repos</h3>
        <div id="repos"></div>
        `;
    }

    // Show an alert in case there is no user with the appointed name
    showAlert(message, className){
        // Clear any remaining alerts before creating one
        this.clearAlertMessage();
        // Create a div
        const div = document.createElement('div');
        // Add the class name to the div
        div.className = className;
        // Add text to the div
        div.appendChild(document.createTextNode(message));
        // Get parent Element
        const container = document.querySelector('.searchContainer');
        // Get Searchbox
        const search = document.querySelector('.search');
        // Insert the Alert
        container.insertBefore(div, search);

        // Timeout after 3 seconds
        setTimeout(() => { this.clearAlertMessage()}, 2000);
    }

    clearAlertMessage(){
        const currentAlert = document.querySelector('.alert');
        if(currentAlert){
            currentAlert.remove();
        }
    }

    clearProfile(){
        this.profile.innerHTML = '';
    }
}