<script>
  import { page } from '$app/stores';
  import { get } from 'svelte/store';
  import {cartItems, addToCart} from '../store/store';
  import { onMount } from 'svelte';
  export let product;
  import { base } from '$app/paths';
  
  let carts = get(cartItems);
  let cartItemIndex = carts.findIndex(item => item.id === product.id);
  let cartProduct = carts[cartItemIndex];
  cartItems.subscribe((newCartValue) => {
    carts = newCartValue;
    cartItemIndex = carts.findIndex(item => item.id === product.id);
    cartProduct = carts[cartItemIndex];
  })

  let url = '';
  url = `${base}/${$page.url.pathname}`;

  const {
    id,
    name,
    api_featured_image,
    brand,
    category,
    description,
    price,
    product_colors,
  } = product;

  let selectedColor = null;
  let isColorSelected = false;

  function addToCartHandler() {
    if (product_colors.length > 0 && !isColorSelected) {
      pushNotification('warning');
      return;
    }

    pushNotification('success');
    addToCart(product, selectedColor, url)
  }

  function selectProductColor(event) {
    isColorSelected = true;
    console.log(event.target.name, event.target.value);
    const target = event.target;
    selectedColor = {
      hex_value: target.value,
      color_name: target.name
    };

    const colors = document.querySelectorAll('.product__color')

    colors.forEach(color => {
      color.style.border = '2px solid #db5e95';
      color.style.borderRadius = '50%'
    });

    target.style.border = '4px solid #0052FF';
    target.style.borderRadius = '20%';
  }

  function pushNotification(status) {
    const body = document.querySelector('body');
    const notification = document.createElement('div');
    notification.className = 'notification';

    switch (status) {
      case 'success':
        notification.classList.add('success');
        notification.textContent = 'Product was added to cart';
        break;

      case 'warning':
        notification.classList.add('warning')
        notification.textContent = 'Please select a color';
        break;
    
      default:
        break;
    }

    body.append(notification);

    setTimeout(() => {
      notification.remove()
    }, 3000);
  }
</script>


<div class="product page-padding">
  <img src="{base}/wave1.png" alt="background" class="product__bg">

  <div class="product__body">
    <h1 class="subtitle product__name">
      {name}
    </h1>

    <div class="product__deteils">
      <div class="product__img-wrap">
        <img class="product__img" src={api_featured_image} alt={name}>
      </div>

      <div class="product__info">
        <div class="product__colors">
          {#each product_colors as color}
            <div class="color__wrap">
              <button
                class="product__color"
                style="background-color: {color.hex_value};"
                name={color.colour_name}
                value={color.hex_value}
                title={color.colour_name}
                on:click={selectProductColor}
              >
              </button>

              <div class="product__color-name">
                {color.colour_name}
              </div>
            </div>
          {/each}
        </div>

        <div class="product__brand">
          {brand}
        </div>

        <p class="product__description">
          {description}
        </p>

        {#if Math.round(+price) !== 0}
          <div class="product__price">
            ${price}
          </div>
          <button
            class="btn"
            on:click={addToCartHandler}
          >
            add to cart
          </button>
          {:else}
            <div class="product__not-available">
              Not available
            </div>
        {/if}

      </div>
    </div>
  </div>
</div>


<style>
  .product__bg {
    position: absolute;
    width: 100%;
    left: 0;
    top: 100px;
    opacity: 30%;
    z-index: -5;
  }

  .product__body {
    padding: 60px 0;
    
  }

  .product__name {
    margin-bottom: 50px;
  }

  .product__deteils {
    display: flex;
  }

  .product__img-wrap {
    top: 0;
    width: 100%;
    max-width: 300px;
    min-height: 500px;
    border-radius: 10px;
    margin-right: 40px;
  }

  .product__img {
    display: block;
    width: 100%;
    border-radius: 10px;
    box-shadow: #db5e95 0px 7px 29px 0px;
  }

  .product__info {
    width: 100%;
  }

  .color__wrap {
    width: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 10px;
    margin-bottom: 10px;
  }

  .product__colors {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
  }

  .product__color {
    display: block;
    width: 30px;
    height: 30px;
    cursor: pointer;
    margin-bottom: 10px;
    border: 2px solid #db5e95;
    border-radius: 50%;
    transition: all 0.3s;
  }

  .product__color:hover {
    transform: scale(1.1);
  }

  .product__color-name {
    font-size: 16px;
    font-weight: 500;
    text-align: center;
  }

  .product__brand {
    font-size: 20px;
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  .product__description {
    font-size: 18px;
    line-height: 130%;
    margin: 0 0 20px;
  }

  .product__price {
    font-size: 45px;
    font-weight: 500;
    color: #db5e95;
    margin-bottom: 20px;
  }

  .product__not-available {
    font-size: 20px;
    color: gray;
  }
</style>