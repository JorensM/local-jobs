//appwrite functions createDeployment --functionId=stripe-contact-payment-success --entrypoint="stripeContactPaymentSuccess.js" --code="." --activate=true

const sdk = require('node-appwrite')
const { createClient } = require('./util.js')

module.exports = (req, res) => {

    const client = createClient(req, sdk)

    const data = JSON.parse(req.payload)

    const user_id = data.

    const db = sdk.Databases(client)

    req.json(data)
}