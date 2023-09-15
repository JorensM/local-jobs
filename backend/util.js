const private = require('./private.js')

module.exports = {
    hasKeys: (obj, keys) => {
        const obj_keys = Object.keys(obj)
        return keys.every(key => {
            return obj_keys.includes(key)
        })
    },
    createClient: (req, sdk) => {
        const client = new sdk.Client()

        if (
            !private?.appwrite?.project_id ||
            !private?.appwrite?.endpoint ||
            !private?.appwrite?.api_key
        ) {
            throw new Error("private variables are not set. Function cannot use Appwrite SDK.");
        } else {
            client
                .setEndpoint(private.appwrite.endpoint)
                .setProject(private.appwrite.project_id)
                .setKey(private.appwrite.api_key)
            return client;
        }
    }
}