//appwrite functions createDeployment --functionId=stripe-contact-payment-intent --entrypoint="stripeContactPaymentIntent.js" --code="." --activate=true
// const stripe = require('stripe')('pk_test_51IsVKBGzVxrDUiCoswQCpPVrP81REBPngmYwbhWVyx89fBFDupveqPXGLWQiyZZbzqeBXphcps4VhPzwxCBk5mtc00zJo3d9kh')
module.exports = async (req, res) => {

    const stripe = require('stripe')(req.variables['STRIPE_TEST_SECRET'])

    // if(!req.variables['STRIPE_API_KEY'])

    const data = JSON.parse(req.payload)

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
      });

      res.json({
        paymentIntent: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        customer: customer.id,
        publishableKey: req.variables['STRIPE_TEST_SECRET']
      });
    } catch (err) {
      res.json({
        success: false,
        msg: 'error while creating payment intent: ' + err.message
      }, 400)
    }

    
      

    
};