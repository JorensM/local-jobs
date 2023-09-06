const sdk = require("node-appwrite");

module.exports = async (req, res) => {

    const api_key = req.variables.APPWRITE_FUNCTION_API_KEY
    const endpoint = req.variables.APPWRITE_FUNCTION_ENDPOINT
    const project_id = req.variables.APPWRITE_FUNCTION_PROJECT_ID

    

    if (!api_key || !endpoint) {
        console.warn("Environment variables are not set. Function cannot use Appwrite SDK.");
    } else {
        const client = new sdk.Client();
        const teams = new sdk.Teams(client);

        client
            .setEndpoint(req.variables['APPWRITE_FUNCTION_ENDPOINT'])
            .setProject(req.variables['APPWRITE_FUNCTION_PROJECT_ID'])
            .setKey(req.variables['APPWRITE_FUNCTION_API_KEY'])
            .setSelfSigned(true);
        
        res.send('', 200)
    }


  
    
  };