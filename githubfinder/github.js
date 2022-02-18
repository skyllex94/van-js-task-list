class Github{
    constructor(){
        this.client_id = 'd9da386f7483d8fa2eda';
        this.client_secret = '044896f91c32b305c2f98a6abbefb841d9f113db';
    }

    async getUser(user){
        const profileResponse = await fetch(`https://api.github.com/users/${user}
        ?client_id=${this.client_id}?client_secret=${this.client_secret}`);

        // Await until the response is fetched and continue to fetching the data in a json standart
        const profile = await profileResponse.json();
        
        // Return an object 
        return {
            profile: profile
        }
    }

}