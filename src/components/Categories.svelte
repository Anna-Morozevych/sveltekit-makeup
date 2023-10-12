<script>
  // import { categories } from '../data/categories';
  import { base } from '$app/paths';

  export let categories;

  // const { name, slug } = categories;

</script>

<section>
  <div class="container">
    <div class="categories" id="categories">
      <div class="categories__body">
        <h1 class="subtitle categories__title">Categories</h1>
        <div class="categories__items">
          {#each categories as link}
            <a href={`${base}/categories/${link.slug}`} class="categories__item">
              <img
                src={`${link.name.toLowerCase().replace(' ', '')}.png`}
                alt={link}
                class="categories__item-img"
              >
            </a>
          {/each}
        </div>

      </div>
    </div>
  </div>
</section>

<style>
  .categories__body {
    padding: 60px 0;
  }

  .categories__title {
    text-align: center;
  }

  .categories__items {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;

  }

  .categories__item {
    width: 100%;
    height: 100%;
  }

  .categories__item-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media screen and (max-width: 991px) {
    .categories__items {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media screen and (max-width: 464px) {
    .categories__items {
      grid-template-columns: repeat(2, 1fr);
    }
  }

</style>