//appwrite functions createDeployment --functionId=get-public-profile --entrypoint="getPublicProfile.js" --code="." --activate=true

const sdk = require('node-appwrite')
const { createClient } = require('./util')

module.exports = (req, res) => {

    const client = createClient(req, sdk)
    const users = new sdk.Users(client)

    const data = JSON.parse(req.payload)

    if (!data.id) {
        res.json({
            success: false,
            message: 'ID not specified'
        }, 400)
    }

    users.get(data.id)
        .then(user => {
            res.json({
                success: true,
                data: user
            })
        })
        .catch(err => {
            res.json({
                success: false,
                message: 'Error: ' + err
            })
        })

}