//appwrite functions createDeployment --functionId=stripe-contact-payment-intent --entrypoint="stripeContactPaymentIntent.js" --code="." --activate=true

const { hasKeys } = require('./util.js')

module.exports = async (req, res) => {

    console.log('req: ')
    console.log(req)

    const stripe = require('stripe')(req.variables['STRIPE_TEST_SECRET'])

    if(!req.variables['STRIPE_TEST_SECRET']) {
      throw new Error('Must specify STRIPE_TEXT_SECRET env variable!')
    }

    const data = JSON.parse(req.payload)

    let validated = true

    if (!hasKeys(data, ['contact_id', 'user_id'])) {
      validated = false
      res.json({
        success: false,
        msg: 'contact_id and user_id are required: ' + req.payload
      }, 400)
    }

    if (validated) {
      try {
        const customer = await stripe.customers.create()
  
        const ephemeralKey = await stripe.ephemeralKeys.create(
            {customer: customer.id},
            {apiVersion: '2020-08-27'}
        );
  
        const paymentIntent = await stripe.paymentIntents.create({
          amount: 50,
          currency: 'eur',
          customer: customer.id,
          // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
          automatic_payment_methods: {
            enabled: true,
          },
          metadata: {
            contact_id: data.contact_id,
            user_id: data.user_id
          }
        });
  
        res.json({
          paymentIntent: paymentIntent.client_secret,
          ephemeralKey: ephemeralKey.secret,
          customer: customer.id,
          publishableKey: req.variables['STRIPE_TEST_SECRET'],
          contact_id: data.contact_id
        });
      } catch (err) {
        res.json({
          success: false,
          msg: 'error while creating payment intent: ' + err.message
        }, 400)
      }
    }
    

    
      

    
};