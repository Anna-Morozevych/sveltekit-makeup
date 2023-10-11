import Stripe from "stripe";

 const stripe = new Stripe('sk_test_51Nrh6kGrd0iKibjNHsn2E6DYzb2TqbSA2ZWF4O39vcYPHwy45GFlUEa2DCRknDQ0QAZ2u32rWyKcFM30SuDCCPNN00bxwQIRQr', {
  apiVersion: "2023-08-16"
});

// Create payment with external link
export const POST = async ({request}) => {
  const data = await request.json();
  const cartItems = data.items;
  const lineItems = cartItems.map((item) => {
    return {
      price_data: {
        currency: "USD",
        product_data: {
          name: item.name,
        },
        unit_amount: +item.price * 100,
      },
      quantity: 1,
    }
  })

    // Create session whis Stripe
   const custumers = await stripe.customers.list();
   console.log(custumers);
    console.log('begin create session')
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: 'payment',
    success_url: `http://127.0.0.1:5173/success`,
    cancel_url: `http://127.0.0.1:5173/cancel`,
  })

  console.log('end create session -> success!!!!')


  return new Response(JSON.stringify({ url: session.url}), {
    status: 200,
    headers: {
    "Content-Type": "application/json",
    // "Authorization": "Bearer sk_test_51Nrh6kGrd0iKibjNHsn2E6DYzb2TqbSA2ZWF4O39vcYPHwy45GFlUEa2DCRknDQ0QAZ2u32rWyKcFM30SuDCCPNN00bxwQIRQr"
    },
  })
}


// export async function POST({request}) {
//   const data = await request.json();
//   const cartItems = data.items;
  
//   const cartAmount = cartItems.reduce((sum, item) => sum + (+item.price), 0);
//   // console.log(cartAmount);

//   // create the payment intent
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: cartAmount * 100,
//     currency: "USD",
//     automatic_payment_methods: {
//       enabled: true
//     }
//   })
//     console.log('paymentIntent.client_secret --->', paymentIntent.client_secret)
//     console.log(cartAmount)

//     return json({
//       clientSecret: paymentIntent.client_secret
//     })
// }
