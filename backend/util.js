module.exports = {
    hasKeys: (obj, keys) => {
        const obj_keys = Object.keys(obj)
        return keys.every(key => {
            return obj_keys.includes(key)
        })
    }
    createClient: (req, sdk) => {
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
}