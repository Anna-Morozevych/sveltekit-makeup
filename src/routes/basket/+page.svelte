<script>
  import { goto } from '$app/navigation'
  import { onMount } from "svelte";
  import { cartItems, removeFromCart } from "../../store/store";
  import { get } from "svelte/store";
  import { addDoc } from 'firebase/firestore';
  import { ordersRef } from "../../lib/firebase/firebase";

  let carts = get(cartItems);
  let total = 0;
  cartItems.subscribe((newCartValue) => {
    carts = newCartValue;
  })

  onMount(() => {
    const storage = localStorage.getItem('busket_products');

    if (carts.length === 0 && storage) {
      carts = JSON.parse(storage)
    } else {
      carts = get(cartItems);
    }
    console.log(carts);

    calculateSum(carts)
  })

  function removeCartHandler(cartId) {
    removeFromCart(cartId);
    calculateSum(carts);
  }

  function calculateSum(items) {
    const prices = items.map(item => +item.price);
    total = +prices.reduce((sum, n) => n + sum, 0).toFixed(2);
  }

  function confirmOrderHandler() {
    // addDoc(ordersRef, {
    //   userId: localStorage.getItem('uid'),
    //   orderInfo: carts
    // })
    //   .then(result => console.log(result))
    // checkout()
    goto('/payment-element')
  }

  async function checkout() {
    const data = await fetch('/checkout', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: carts,
      }),
    }).then((data) => data.json());
    // window.location.replace(data.url)
    console.log(data);
  }


</script>

<section>
  <div class="container">
    <div class="basket page-padding">
      <div class="basket__body">
        <h1 class="subtitle buscet__title">
          Cart
        </h1>

        {#if carts.length > 0}
          <div class="basket__info">
            <div class="cards">
              {#each carts as cart}
                <div class="card">
                  <button
                    class="card__close"
                    on:click={removeCartHandler(cart.id)}
                  >
                    <img src="/close.svg" alt="remove">
                  </button>

                  <div class="card__img-wrap">
                    <img src={cart.api_featured_image} alt={cart.name} class="card__img">
                  </div>

                  <div class="card__info">
                    <a href={cart.url}>
                      <h2 class="card__name">{cart.name}</h2>
                    </a>
                    
                    <h3 class="card__brand">{cart.brand}</h3>
                    {#if cart.selectedColor !== null}
                    <div class="card__color-wrap">
                      <button
                        class="card__color"
                        value={cart.selectedColor.colour_name}
                        title={cart.selectedColor.colour_name}
                        style="background-color: {cart.selectedColor.hex_value};"
                      >
                      </button>
                      <div class="card__color-name">
                        {cart.selectedColor.color_name}
                      </div>
                    </div>
                    {/if}
                    <div class="card__price">
                      ${cart.price}
                    </div>
                  </div>
                </div>
              {/each}
            </div>
            <div class="order-info">
              <div class="total">
                <h2 class="total__title">TOTAL:</h2>
                <div class="total__sum">${total}</div>
              </div>

              <button class="btn" on:click={confirmOrderHandler}>
                confirm order
              </button>
            </div>
          </div>
          {:else}
          <div class="emty-cart">
            <h2 class="emty-cart__title">
              Your cart is empty
            </h2>
            <img src="Emty cart.png" alt="emty cart" class="emty-cart__img">

          </div>
        {/if}

        
      </div>
    </div>
  </div>
</section>


<style>
  .basket__body {
    padding: 60px 0;
  }

  .buscet__title {
    border-bottom: 3px solid rgb(180, 73, 180);
    padding: 0 0 10px;
  }

  .basket__info {
    display: flex;
    align-items: start;
  }

  .cards {
    margin-bottom: 100px;
    margin-right: 60px;
    width: 100%;
  }

  .card {
    width: 100%;
    position: relative;
    display: flex;
    padding: 20px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 20px;
    margin-bottom: 40px;
  }

  .card__img-wrap {
    width: 200px;
    height: 200px;
    border-radius: 10px;
    margin-right: 40px;
  }

  .card__img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 10px;
  }

  .card__close {
    background-color: #ffffff;
    padding: 0;
    border: none;
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
  }

  .card__close:hover {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }

  .card__info {
    padding: 15px 0;
  }

  .card__name {
    font-size: 24px;
    margin-bottom: 20px;
    color: rgb(180, 73, 180);
  }

  .card__name:hover {
    text-decoration: underline;
  }

  .card__brand {
    font-size: 20px;
    margin-bottom: 20px;
    text-transform: uppercase;
  }

  .card__color-wrap {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  .card__color {
    display: block;
    width: 30px;
    height: 30px;
    cursor: pointer;
    border: 1px solid transparent;
    border-radius: 50%;
    transition: all 0.3s;
    margin-right: 30px;
  }

  .card__color-name {
    position: relative;
    font-size: 16px;
  }

  .card__color-name::before {
    content: '';
    position: absolute;
    top: 7px;
    left: -20px;
    width: 10px;
    height: 2px;
    background-color: #000000;
  }

  .card__price {
    font-size: 30px;
    font-weight: 500;
    color: #db5e95;
    margin-bottom: 20px;
  }

  .order-info {
    position: sticky;
    top: 60px;
    width: 50%;
  }

  .total {
    display: flex;
    justify-content: space-between;
    margin-bottom: 60px;
  }

  .total__title {
    font-size: 30px;
  }

  .total__sum {
    font-size: 45px;
    color: rgb(180, 73, 180)
  }

  .emty-cart {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .emty-cart__title {
    font-size: 35px;
    color: #db5e95;
    text-align: center;
    margin-bottom: 40px;
  }

  .emty-cart__img {
    display: block;
    width: 300px;
    max-width: 100%;
  }
</style>