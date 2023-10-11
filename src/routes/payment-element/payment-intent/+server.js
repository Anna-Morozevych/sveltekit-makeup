import { json } from '@sveltejs/kit'
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51Nrh6kGrd0iKibjNHsn2E6DYzb2TqbSA2ZWF4O39vcYPHwy45GFlUEa2DCRknDQ0QAZ2u32rWyKcFM30SuDCCPNN00bxwQIRQr')

export async function POST({request}) {
  const data = await request.json();

  let cartAmount = data.reduce((sum, item) => sum + (+item.price), 0);
  console.log(Math.trunc(cartAmount * 100));
  

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.trunc(cartAmount * 100),
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true
    }
  })

  console.log(paymentIntent);

  return json({
    clientSecret: paymentIntent.client_secret,
    amount: paymentIntent.amount
  })
}