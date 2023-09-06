//appwrite functions createDeployment --functionId=create-user --entrypoint="createUser.js" --code="." --activate=true
/*  
{
    "email": "",
    "name": "",
    "password": "helloworld123",
    "role": "recruiter"
} 
*/
const sdk = require('node-appwrite')
function hasKeys(obj, keys) {
    const obj_keys = Object.keys(obj)
    return keys.every(key => {
        return obj_keys.includes(key)
    })
}

module.exports = async (req, res) => {

    const client = new sdk.Client()

    const users = new sdk.Users(client)

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
    }

    let success = true
    let msg = '' 

    let data = null

    data = JSON.parse(req.payload)

    if(!hasKeys(data, ['email', 'password', 'name', 'role'])) {
        success = false
        msg = 'Payload must include: email, password, name, role'
    }

    if (!success) {
        res.json({
            success: false,
            msg: msg
        }, 400)
    } else {
        users.create(
            sdk.ID.unique(),
            data.email,
            null,
            data.password,
            data.name,
        )
            .then(usr_res => {
                res.json({
                    success: true,
                    msg: 'created user ' + data.email
                })
            })
            .catch(err => {
                res.json({
                    success: false,
                    msg: 'failed creating user: ' + err.message
                }, 400)
            })
    }
}