<script>
  import { base } from '$app/paths';
  import { page } from '$app/stores';
  import ComentForm from '$lib/components/ComentForm.svelte';
  import Comment from '$lib/components/Comment.svelte';
  import Product from '$lib/components/Product.svelte';

  import { onSnapshot, query, where } from "firebase/firestore";
  import { commentsRef } from '$lib/firebase/firebase';
    import { onMount } from 'svelte';
    import ReviewedProducts from '$lib/components/ReviewedProducts.svelte';

  export let data;

  const product = data.product;
  let url = '';
  let productComments = [];
  url = $page.url.pathname;

  console.log(product);

  const q = query(commentsRef, where('product.id', '==', product.id));

  onSnapshot(q, (snapshot) => {
    let comments = [];
    snapshot.docs.forEach((doc) => {
      comments.push({...doc.data(), commentId: doc.id})
    })

    productComments = comments;
    productComments.sort((date1, date2) => date1.date.localeCompare(date2.date))
  })

  let reviewedProducts = [];

onMount(() => {
  let reviewedStorage = localStorage.getItem('reviewed_products');

  if (!reviewedStorage) {
    localStorage.setItem('reviewed_products', JSON.stringify([{...product, url}]));
    return
  }

  const findProduct = JSON.parse(reviewedStorage).find(el => el.id === product.id);

  if (findProduct) {
    const filterStorage = JSON.parse(reviewedStorage).filter(el => el.id !== product.id)
    localStorage.setItem('reviewed_products', JSON.stringify([{...product, url}, ...filterStorage]));
  } else {
    localStorage.setItem('reviewed_products', JSON.stringify([{...product, url}, ...JSON.parse(reviewedStorage)]));
  }

  reviewedProducts = JSON.parse(localStorage.getItem('reviewed_products'));
  console.log(reviewedProducts);
})
 
</script>

<section>
  <div class="container">
    <div class="bread-crumbs page-padding">
      <div class="bread-crumbs__body">
        <a href={base} class="bread-crumbs__link bread-crumbs__link--active">Home</a>
        <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 96 960 960" width="16" fill="#db5e95">
          <path d="m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z"/>
        </svg>
        <a href="{base}/categories" class="bread-crumbs__link bread-crumbs__link--active">Categories</a>
        <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 96 960 960" width="16" fill="#db5e95">
          <path d="m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z"/>
        </svg>
        <a href={`${base}/categories/${$page.params.slug}`} class="bread-crumbs__link bread-crumbs__link--active">{$page.params.slug}</a>
        <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 96 960 960" width="16" fill="#db5e95">
          <path d="m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z"/>
        </svg>
        <div class="bread-crumb__div">
          {product.name}
        </div>
      </div>
    </div>

    <Product {product}/>

    <div class="comment page-padding">
      <div class="container">
        <div class="comment__body">
          <h2 class="comment__title">
            Your comments
          </h2>

          {#each productComments as comment}
            <Comment {comment}/>
          {/each}

        </div>
      </div>
    </div>

    <ComentForm {product}/>

    <ReviewedProducts {reviewedProducts} />
  </div>

  
</section>

<style>
  .comment__body {
    padding: 40px 0;
  }

  .comment__title {
    font-size: 30px;
    font-weight: 700;
    color: rgb(180, 73, 180);
    margin-bottom: 30px;
  }

</style>