//appwrite functions createDeployment --functionId=get-function-data --entrypoint="getFunctionData.js" --code="." --activate=true

const sdk = require('node-appwrite')

const createClient = (req) => {
    const client = new sdk.Client()

    if (
        !req.variables['APPWRITE_FUNCTION_ENDPOINT'] ||
        !req.variables['APPWRITE_FUNCTION_API_KEY']
    ) {
        throw new Error("Environment variables are not set. Function cannot use Appwrite SDK.");
    } else {
        client
            .setEndpoint(req.variables['APPWRITE_FUNCTION_ENDPOINT'])
            .setProject(req.variables['APPWRITE_FUNCTION_PROJECT_ID'])
            .setKey(req.variables['APPWRITE_FUNCTION_API_KEY'])
        return client;
    }
}

module.exports = async (req, res) => {

    const client = createClient(req)

    const functions = new sdk.Functions(client)

    const func = await functions.list([], req.payload)

    res.json(func)

}