<script>

  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import Products from '../../../components/Products.svelte';

  export let data;

  console.log($page.url.pathname);

  let currentPage = '';
  $: currentPage = $page.params.slug.replace('-', ' ');

  let searchTerm ='';
  let brands = [];
  let selectedBrands = [];
  let filteredList = data.item;
  let price = 0;

  let sortBy = ''

  function getBrands() {
    let list = [];

    for (let item of data.item) {
      if (item.brand && !list.includes(item.brand)) {
        list.push(item.brand);
      }

      if (!item.brand && !list.includes('others')) {
        list.push('others');
      }
    }

    return list.sort();
  }

  function filterProducts(input, brandsList) {
    const list = data.item;
    let result = [...list];

    if (selectedBrands.length > 0) {
      let newArr = [];

      for (let brand of brandsList) {
        let products = [];

        if (brand === 'others') {
          products = list.filter(el => el.brand === null);
        } else {
          products = list.filter(el => el.brand === brand);
        }

        newArr = [...newArr, ...products];
      }

      result = [...newArr];
    }

    if (input.length > 0) {
      result = result.filter(el => {
        let brand = el.brand;
        let name = el.name.toLowerCase();

        return (
          (brand && brand.toLowerCase().includes(searchTerm.toLowerCase()))
          || name.includes(searchTerm.toLowerCase())
        );
      })
    }

    return filteredList = result;
  }

  function filterByPrice(price) {
    if (price === 0) {
      return filteredList = data.item;
    }

    return filteredList = filteredList.filter(el => +el.price <= price);
  }

  function sortProductsList(value) {

    switch (value) {
      case 'cheap':
        filteredList = data.item.sort((el1, el2) => +el1.price - +el2.price);
        break;

      case 'expensive':
        filteredList = data.item.sort((el1, el2) => +el2.price - +el1.price);
        break;

      case 'a-z':
        filteredList = data.item.sort((el1, el2) => el1.name.toLowerCase().localeCompare(el2.name.toLowerCase()));
        break;

      case 'z-a':
        filteredList = data.item.sort((el1, el2) => el2.name.toLowerCase().localeCompare(el1.name.toLowerCase()));
        break;

      default:
        break;
    }
  }

  function resetAll() {
    searchTerm = '';
    selectedBrands = [];
    price = 0;
    filteredList = data.item;
    sortBy = '';
  }

  onMount(() => {
    brands = getBrands();
  })

  let amount;
  $: amount = filteredList.length;
  
  $:console.log(filteredList);
 
</script>


<section>
  <div class="container">
    <div class="bread-crumbs page-padding">
      <div class="bread-crumbs__body">
        <a href="/" class="bread-crumbs__link bread-crumbs__link--active">Home</a>
        <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 96 960 960" width="16" fill="#db5e95">
          <path d="m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z"/>
        </svg>
        <a href="/categories" class="bread-crumbs__link bread-crumbs__link--active">Categories</a>
        <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 96 960 960" width="16" fill="#db5e95">
          <path d="m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z"/>
        </svg>
        <div class="bread-crumb__div">
          {currentPage}
        </div>
      </div>
    </div>

    <div class="product-list page-padding">
      <div class="product-list__body">
        <div class="filter">
          <div class="filter__body">
            <div class="filter__amount">
              {#if amount === 1}
                {amount} product on the page
              {:else}
                {amount} products on the page
              {/if}
            </div>

            <div class="filter__item">
              <select
                class="sort"
                bind:value={sortBy}
                on:change={() => sortProductsList(sortBy)}
              >
                <option value="" class="sort__option">
                  Sort the list
                </option>
                <option value="cheap">
                  from cheap to expensive
                </option>
                <option value="expensive">
                  from expensive to cheap
                </option>
                <option value="a-z">
                  A-Z
                </option>
                <option value="z-a">
                  Z-A
                </option>
              </select>
            </div>

            <button class="filter__reset" on:click={resetAll}>
              Reset all filters
            </button>

            <div class="filter__item">
              <input
                bind:value={searchTerm}
                class="filter__input"
                type="text"
                placeholder="Search..."
                on:input={() => filterProducts(searchTerm, selectedBrands)}
            >
            </div>

            <div class="filter__item">
              <p class="filter__title">
                Brands:
              </p>

              <div class="filter__item-box">
                {#each brands as brand}
                  <div class="filter__checkbox-wrap">
                    <label class="filter__brand">
                      <input
                        type="checkbox"
                        class="filter__brand-checkbox"
                        name={brand}
                        value={brand}
                        bind:group={selectedBrands}
                        on:change={() => filterProducts(searchTerm, selectedBrands)}
                      >
                    {brand}
                    </label>
                </div>
                {/each}
              </div>
            </div>

            <div class="filter__item">
              <p class="filter__title">
                Price:
              </p>

              <div class="filter__current-price">
                {`< $${price}`}
              </div>

              <input
                class="filter__price"
                type="range"
                min=0
                max=100
                step=0.1
                bind:value={price}
                on:change={filterByPrice(price)}
              >
              </div>
          </div>
        </div>
        <Products
          title={currentPage}
          products={filteredList}
          url={$page.url.pathname}

        />
      </div>
    </div>

  </div>
</section>

<style>
  .product-list__body {
    display: grid;
    grid-template-columns: 0.4fr 1fr;
    gap: 20px;
    padding:  0 0 60px 0;
  }

  .filter {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }

  .filter__body {
    padding: 20px;
  }

  .filter__amount {
    margin-bottom: 20px;
    color: #db5e95;
    font-weight: bold;
  }

  .filter__reset {
    color: #040404;
    background-color: #fff;
    border: none;
    padding: 0 0 5px;
    border-bottom: 1px solid #040404;
    cursor: pointer;
    margin-bottom: 20px;
    font-size: 16px;
    transition: all 0.2s;
  }

  .filter__reset:hover{
    color: #db5e95;
    border-color: #db5e95;
  }

  .filter__item {
    margin-bottom: 20px;
  }

  .filter__input {
    display: block;
    width: 100%;
    padding: 7px 7px 7px 30px;
    border: 2px solid #e1e1e1;
    border-radius: 5px;
    background-image: url('/search.svg');
    background-repeat: no-repeat;
    background-size: 20px;
    background-position: 5px;
    font-size: 16px;
    line-height: 110%;
    color: #040404;
  }

  .filter__input::placeholder {
    color: #dad0d0;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .filter__input:focus {
    outline: none;
    border-color: #db5e95;
  }

  .filter__title {
    font-size: 16px;
    line-height: 110%;
    font-weight: 500;
    margin: 0 0 10px;
    color: #db5e95;
  }

  .filter__item-box {
    padding: 10px 0;
    max-height: 300px;
    overflow: auto;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }

  .filter__brand {
    cursor: pointer;
    margin-left: 5px;
    font-size: 14px;
    text-transform: uppercase;
  }

  .filter__checkbox-wrap {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }

  .filter__checkbox-wrap:last-child {
    margin-bottom: 0;
  }

  .filter__item-box::-webkit-scrollbar {
    width: 8px;
    background-color: #f1dee6;
    border-radius: 10px;
  }

  .filter__item-box::-webkit-scrollbar-thumb {
    background-color: #db5e95;
    border-radius: 10px;
  }

  .filter__brand-checkbox {
    accent-color: #db5e95;
  }

  .filter__price {
    width: 100%;
  }

  .filter__current-price {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 20px;
  }

  .sort {
    text-transform: uppercase;
    outline: none;
    border: 1px solid #db5e95;
    border-radius: 5px;
    height: 30px;
    width: 100%;
    padding: 3px 5px;
  }

</style>