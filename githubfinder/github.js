class Github{
    constructor(){
        this.client_id = 'd9da386f7483d8fa2eda';
        this.client_secret = '044896f91c32b305c2f98a6abbefb841d9f113db';
        this.repos_count = 5;
        this.repos_sort = 'created: asc';
    }

    async getUser(user){
        const profileResponse = await fetch(`https://api.github.com/users/${user}
        ?client_id=${this.client_id}?client_secret=${this.client_secret}`);

        const repoResponse = await fetch(`https://api.github.com/users/${user}/repos
        ?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}
        ?client_secret=${this.client_secret}`);

        // Await until the response is fetched and continue to fetching the data in a json standart
        const profile = await profileResponse.json();

        // Await until it fetches the profile Info and take in the repos of the user
        const repos = await repoResponse.json();
        
        // Return an object 
        return {
            profile: profile,
            repos: repos
        }
    }
}