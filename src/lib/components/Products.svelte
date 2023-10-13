<script>
  export let title;
  export let products;
  export let url;
  import { base } from '$app/paths';

  // let productsAmount = 20;
  // let productsToRender = [...products].slice(0, productsAmount);
  // $:console.log(productsToRender);

  // function loadMore() {
  //   console.log('Load more');
  //   productsAmount += 20;

  //   productsToRender = [...products].slice(0, productsAmount);
  // }

</script>

<div class="products">
  <div class="products__body">

    <div class="products__top">
      <h1 class="subtitle product__title">
        {title}
      </h1>
    </div>


    <div class="products__list">
      {#each products as product}
        <div class="products__item">
          <a href={`${url}/${product.id}`}>
            <img
            class="products__img"
            src={product.api_featured_image}
            alt={product.name.trim()}
          >
          </a>

          <div class="product__info">
            <p class="product__name">
              {product.name.trim()}
            </p>
            <div class="product__bottom-info">
              <span class="product__brand">{product.brand}</span>

              {#if +product.price === 0}
                <span class="product__not-available">not available</span>

              {:else}
                <span class="product__price">${product.price}</span>
              {/if}
            </div>
          </div>

        </div>
      {/each}
    </div>
  </div>

  <!-- {#if products.length !== productsToRender.length}
    <button class="btn load-more" on:click={loadMore}>
      Load more
    </button>
  {/if} -->



</div>


<style>
  .products__body {
    padding: 0;
  }

  .products__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
  }

  .products__list {
    display: grid;
    gap: 20px;
  }

  .products__item {
    display: flex;
    flex-direction: column;
    padding: 10px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    transition: all 0.3s;
  }

  .products__item:hover {
    box-shadow: #db5e95 0px 7px 29px 0px;
    border-radius: 10px;
    transform: scale(1.03);
  }

  .products__img {
    width: 100%;
    height: 350px;
    object-fit: contain;
  }

  .product__info {
    margin: 20px 0;
  }

  .product__name {
    display: block;
    font-size: 18px;
    line-height: 110%;
    font-weight: 700;
    color: rgb(180, 73, 180);
    margin-bottom: 5px;
    text-transform: capitalize;
  }

  .product__bottom-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .product__brand {
    display: block;
    font-size: 16px;
    line-height: 110%;
    font-weight: 600;
    text-transform: uppercase;
  }
  
  .product__not-available {
    font-size: 16px;
    line-height: 110%;
    font-weight: 600;
    color: #c1c1c1;
  }

  .product__price {
    display: block;
    font-size: 16px;
    line-height: 110%;
    font-weight: 600;
  }
  

  /* .load-more {
    margin: 40px auto 0;
  } */



  @media screen and (max-width: 766px) {
    .products__list {
      grid-template-columns: repeat(1, 1fr);
    }
  }
  
  @media screen and (min-width: 767px) {
    .products__list {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media screen and (min-width: 1024px) {
    .products__list {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>