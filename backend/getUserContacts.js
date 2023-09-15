//appwrite functions createDeployment --functionId=get-user-contacts --entrypoint="getUserContacts.js" --code="." --activate=true
//Core
const sdk = require('node-appwrite')

//Util
const { createClient } = require('./util')

//Constants
const constants = require('./const')

module.exports = async (req, res) => {

    const client = createClient(req, sdk)
    const users = new sdk.Users(client)
    const db = new sdk.Databases(client)

    const data = JSON.parse(req.payload)

    if (!data.id) {
        res.json({
            success: false,
            message: 'ID not specified'
        }, 400)
    }

    console.log(data.id)
    console.log(typeof data.id)

    const user_docs = await db.listDocuments(
        constants.db.id,
        constants.db.users_id,
        [
            sdk.Query.equal('user_id', [data.id])
        ]
        
    )

    if (user_docs.length < 1) {
        res.json({
            success: false,
            message: 'Could not find user by id ' + data.id + ' in the database'
        }, 400)
    }

    const contact_ids = user_docs.documents[0].contacts

    users.list(
        [
            sdk.Query.equal('$id', contact_ids)
        ]
    )
    .then(contacts => {
        res.json({
            success: true,
            data: contacts.users
        }, 200)
    })
    .catch(err => {
        res.json({
            success: false,
            message: err
        }, 400)
    })

}