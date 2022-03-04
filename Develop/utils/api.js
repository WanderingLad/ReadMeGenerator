const axios = require('axios');

const api = 
{
    getUser(readMe)
    {
        try
        {
            //let response = axios.get(`https://api.github.com/users/${readMe.githubName}`)
            return 'https://api.github.com/users/WanderingLad';
        }
        catch (err)
        {
            console.log(err);
        }
    }
}
module.exports = api;