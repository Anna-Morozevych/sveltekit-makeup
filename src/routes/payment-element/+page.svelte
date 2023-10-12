<script>
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'
  import { loadStripe } from '@stripe/stripe-js'
  import { PUBLIC_STRIPE_KEY } from '$env/static/public'
  import { Elements, PaymentElement, LinkAuthenticationElement, Address } from 'svelte-stripe'
  import { get } from 'svelte/store';
  import { cartItems } from '../../store/store';
  import { addDoc } from 'firebase/firestore';
  import { ordersRef } from '../../lib/firebase/firebase';


  let stripe = null;
  let clientSecret = null;
  let error = null;
  let elements;
  let processing = false;
  let carts = [];
  let amount;

  onMount(async () => {
    const storage = localStorage.getItem('busket_products');

    if (carts.length === 0 && storage) {
      carts = JSON.parse(storage)
    } else {
      carts = get(cartItems);
    }

    stripe = await loadStripe(PUBLIC_STRIPE_KEY)

    // create payment intent server side
    const intentResponce = await createPaymentIntent()
    clientSecret = intentResponce.clientSecret;
    amount = intentResponce.amount;

    console.log(carts);
  })

  async function createPaymentIntent() {
    console.log(carts);
    const response = await fetch('/payment-element/payment-intent', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(carts)
    })
    // const { clientSecret, amount } = await response.json()

    return await response.json()
  }

  async function submit() {
    // avoid processing duplicates
    if (processing) return

    processing = true

    // confirm payment with stripe
    // const result = await stripe.confirmPayment({
    //   elements,
    //   redirect: 'if_required'
    // })

    // log results, for debugging
    // console.log({ result })

    // if (result.error) {
    //   // payment failed, notify user
    //   error = result.error
    //   processing = false
    // } else {
    //   // payment succeeded, redirect to "thank you" page
    //   goto('/payment-element/thanks')
    // }

    addToOrders();
    setOrderDetails();
    cartItems.set([]);
    localStorage.removeItem('busket_products');
    goto('/payment-element/thanks')
  }

  function addToOrders() {
    addDoc(ordersRef, {
      userId: localStorage.getItem('uid'),
      orderInfo: carts
    })
      .then(result => console.log(result))
  }

  function setOrderDetails() {
    if (!localStorage.getItem('uid')) {
      return;
    }

      addDoc(ordersRef, {
      userId: localStorage.getItem('uid'),
      orderInfo: carts
    })
      .then(result => console.log(result))
  }
</script>

<section>
  <div class="containner">
    <div class="payment page-padding">
      <div class="payment__body">
        <h1 class="subtitle">Payment form</h1>
        <div class="payment__info">
          {#if error}
            <p class="error">{error.message} Please try again.</p>
          {/if}

          {#if stripe && clientSecret}
            <Elements
              {stripe}
              {clientSecret}
              theme="stripe"
              labels="floating"
              variables={{ colorPrimary: '#7c4dff' }}
              rules={{ '.Input': { border: 'solid 1px #0002' } }}
              bind:elements
            >
            <div class="cart">
              <h2 class="cart__total">
                To be paid: <span class="cart__total-sum">${amount / 100}</span>
              </h2>
              {#each carts as cart}
                <div class="cart__product">
                  <img class="cart__img" src={cart.api_featured_image} alt={cart.name}>
                  <p class="cart__product-name">{cart.name} - ${cart.price}</p>
                </div>
              {/each}

            </div>
              <form on:submit|preventDefault={submit}>
                <LinkAuthenticationElement />
                <PaymentElement />
                <Address mode="billing" />

                <button disabled={processing} class="btn">
                  {#if processing}
                    Processing...
                  {:else}
                    Pay ${amount / 100}
                  {/if}
                </button>
              </form>
            </Elements>
          {:else}
          <p class="payment__loading">Loading...</p>
          {/if}
        </div>
      </div>
    </div>
  </div>
</section>




<style>
  .error {
    color: tomato;
    margin: 2rem 0 0;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 2rem 0;
  }

  button {
    min-height: 50px;
  }

  .payment {
    position: relative;
  }

  .payment__body {
    padding: 60px 0;
  }

  .payment__info {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .payment__loading {
    font-size: 20px;
    color: #000000;
    font-weight: 500;
  }

  .cart__total {
    font-size: 24px;
    font-weight: 500;
    padding-bottom: 20px;
    border-bottom: 1px solid #e1e1e1;
    margin-bottom: 30px;
  }

  .cart__total-sum {
    font-size: 32px;
    font-weight: 700;
    color: rgb(180, 73, 180);
  }

  .cart__product {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  .cart__img {
    display: block;
    width: 60px;
    height: 60px;
  }

  .cart__product-name {
    font-size: 18px;
    font-weight: 500;
    margin-left: 20px;
  }
</style>