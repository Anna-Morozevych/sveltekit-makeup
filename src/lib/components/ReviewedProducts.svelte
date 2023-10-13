<script>
  import { onMount } from "svelte";
  import { register } from "swiper/element";
  import { base } from '$app/paths';

  export let reviewedProducts;

  onMount(() => {
    register();
    console.log(reviewedProducts);
  })
</script>

<div class="reviewed page-padding">
  <div class="container">
    <div class="reviewed__body">
      <h2 class="reviewed__title">
        Recently viewed products
      </h2>
      <swiper-container
        class="mySwiper"
        navigation="true"
        slides-per-view="3.55"
        space-between="20"
        
      >
        {#each reviewedProducts as product}
          <swiper-slide>
            <a href="{product.url}">
              <img src={product.api_featured_image} alt={product.name} class="reviewed__img">

              <div class="reviewed__info">
                <h3 class="reviewed__name">
                  {product.name}
                </h3>
                <div class="reviewed__bottom-info">
                  <span class="reviewed__brand">{product.brand}</span>
    
                  {#if +product.price === 0}
                    <span class="reviewed__not-available">not available</span>
    
                  {:else}
                    <span class="reviewed__price">${product.price}</span>
                  {/if}
                </div>
              </div>
            </a>
          </swiper-slide>
        {/each}
      </swiper-container>
    </div>
  </div>
</div>

<style>
  swiper-container {
    padding: 10px;
  }

  swiper-slide {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    transition: all 0.3s;
    min-height: 400px;
  }

  swiper-slide:hover {
    box-shadow: #db5e95 0px 4px 10px 0px;
  }

  .reviewed {
    margin-bottom: 100px;
  }

  .reviewed__body {
    padding: 60px 0;
  }

  .reviewed__title {
    font-size: 30px;
    font-weight: 700;
    color: rgb(180, 73, 180);
    margin-bottom: 30px;
  }

  .reviewed__img {
    width: 100%;
    height: 300px;
    object-fit: contain;
  }

  .reviewed__name {
    display: block;
    font-size: 18px;
    line-height: 110%;
    font-weight: 700;
    color: rgb(180, 73, 180);
    margin-bottom: 5px;
    text-transform: capitalize;
  }

  .reviewed__info {
    margin: 20px 0;
    padding: 0 15px;
  }

  .reviewed__bottom-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    
  }

  .reviewed__brand {
    display: block;
    font-size: 16px;
    line-height: 110%;
    font-weight: 600;
    text-transform: uppercase;
  }

  .reviewed__not-available {
    font-size: 16px;
    line-height: 110%;
    font-weight: 600;
    color: #c1c1c1;
  }

  .reviewed__price {
    display: block;
    font-size: 16px;
    line-height: 110%;
    font-weight: 600;
  }
</style>

