<script>
  import { getDocs } from "firebase/firestore";
  import { ordersRef } from "$lib/firebase/firebase";
  import { onMount } from "svelte";
  import { base } from '$app/paths';
 
  let orders = [];

  onMount(() => {
    const currentUserid = localStorage.getItem('uid')

    getDocs((ordersRef))
     .then(res => {
      let ordersFromServer = [];

      res.docs.forEach((doc) => {
        if (doc.data().userId === currentUserid) {
          const total = +doc.data().orderInfo.reduce((sum, el) => sum + (+el.price), 0).toFixed(2)
          ordersFromServer.push({ ...doc.data(), orderId: doc.id, total })
        }
      })
      orders = ordersFromServer;
     })
  })

  $:console.log(orders);
</script>



{#if orders.length}
  <div class="orders">
    {#each orders as order}
    <div class="orders__order">
      <div class="orders__info">
        <p class="orders__num">
          Order №{order.orderId.slice(-8)}
        </p>

        <p class="orders__status">
          Completed
        </p>
      </div>
      {#each order.orderInfo as product}
        <div class="product">
          <img class="product__img" src={product.api_featured_image} alt={product.name}>
          <div class="product__details">
            <a class="product__link" href="{base}/{product.url}">{product.name}</a>
            <p class="product__price">${product.price}</p>
          </div>
        </div>
      {/each}

      <div class="total">
        <p class="total__sum">Total: ${order.total}</p>
      </div>
    </div>
  {/each}
  </div>

  {:else}
  <h2 class="orders__title">
    You haven't ordered anything yet
  </h2>

  <a href="{base}/categories" class="btn start-shopping">
    Start shopping
  </a>
{/if}


<style>
  .orders {
    display: grid;
    grid-template-rows: 1fr;
    gap: 40px;
  }

  .orders__order {
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding: 20px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 20px;
    max-width: 650px;
  }

  .orders__title {
    font-size: 24px;
    color: rgb(180, 73, 180);
    text-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    margin-bottom: 40px;
  }

  .orders__info {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 20px;
  }

  .orders__num {
    font-size: 18px;
    font-weight: 700;
    color: #db5e95;
  }

  .orders__status {
    color: #1ab605 ;
    font-size: 18px;
    font-weight: 700;
  }

  .product {
    display: flex;
    gap: 10px;
  }

  .product__img {
    display: block;
    width: 60px;
    height: 60px;
    object-fit: contain;
  }

  .product__details {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .product__link {
    font-size: 20px;
    font-weight: 500;
  }

  .product__link:hover {
    color: #db5e95;
    text-decoration: underline;
  }

  .product__price {
    font-size: 18px;
    font-weight: 400;
  }

  .total {
    display: flex;
    justify-content: right;
  }

  .total__sum {
    font-size: 22px;
    font-weight: 700;
  }

  .start-shopping {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 200px;
  }


</style>
