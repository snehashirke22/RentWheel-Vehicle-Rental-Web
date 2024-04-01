import stripe from 'stripe';
import dotenv from "dotenv";

dotenv.config({ path: './config.env' });
const stripe_secret_key = process.env.STRIPE_SECRET_KEY;

const stripeInstance = stripe(stripe_secret_key);
const YOUR_DOMAIN = 'http://localhost:3000';

export const createPaymentIntent = async (req, res) => {
  try {
    const {vehicleDetails, totalCharges} = req.body; 
    const totalChargesNumber = parseFloat(totalCharges.replace(',', ''));
    const productName = `${vehicleDetails.company} ${vehicleDetails.model}`;
      const session = await stripeInstance.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [
              {
                  price_data: {
                      currency: 'inr',
                      product_data: {
                          name: productName ,
                          images: [vehicleDetails.images]
                      },
                      unit_amount: totalChargesNumber * 100,
                  },
                  quantity: 1,
              },
          ],
          mode: 'payment',
          success_url: `${YOUR_DOMAIN}/success`,
          cancel_url: `${YOUR_DOMAIN}/cancel`,
      });

      res.json({ id: session.id });
  } catch (error) {
      console.error('Error creating checkout session:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};


export const sessionstatus = async (req, res, next) => {
  try {
    const sessionId = req.query.session_id;
    const session = await stripeInstance.checkout.sessions.retrieve(sessionId);

    res.json({
      status: session.payment_intent.status,
      customer_email: session.customer_email,
    });
  } catch (error) {
    console.error('Error retrieving session status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

