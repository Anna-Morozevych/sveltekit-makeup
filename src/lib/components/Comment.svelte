<script>
  import { doc, getDoc } from "firebase/firestore";
  import { db } from "$lib/firebase/firebase";
  import { onMount } from "svelte";
  import { page } from '$app/stores';
  import { base } from '$app/paths';
  export let comment;

  let raiting = 0;
  let userName = '';
  let authorId = '';
  let date = '';
  let url = '';
  url = $page.url.pathname;
  let isMyCommentPage;

  onMount(() => {
    raiting = comment.raiting;
    authorId = comment.userId;
    date = comment.date;
    isMyCommentPage = (url.includes('my-comments'))
      ? true
      : false;

    if (authorId) {
      const docRef = doc(db, 'users', authorId);

      getDoc(docRef)
        .then((doc) => {
          const data = doc.data();
          userName = `${data.firstName} ${data.lastName}`;

        })
    } else {
      userName = 'Guest'
    }
  })
</script>

<div class="comment-info">
  {#if !isMyCommentPage}
    <h3 class="comment-info__name">{userName}</h3>
  {/if}
  
  {#if isMyCommentPage}
    <a href="{base}/{comment.url}" class="comment__link">{comment.product.name}</a>
  {/if}
  <span class="comment-info__date">{date}</span>

  <div class="stars" id="product-rate">
    {#if raiting >= 1}
      <i class="fa-solid fa-star" style="color: #ff9c1a;"/>
      {:else}
      <i class="fa-solid fa-star" />
    {/if}
    {#if raiting >= 2}
      <i class="fa-solid fa-star" style="color: #ff9c1a;"/>
      {:else}
      <i class="fa-solid fa-star" />
    {/if}
    {#if raiting >= 3}
      <i class="fa-solid fa-star" style="color: #ff9c1a;"/>
      {:else}
      <i class="fa-solid fa-star" />
    {/if}
    {#if raiting >= 4}
      <i class="fa-solid fa-star" style="color: #ff9c1a;"/>
      {:else}
      <i class="fa-solid fa-star" />
    {/if}
    {#if raiting >= 5}
      <i class="fa-solid fa-star" style="color: #ff9c1a;"/>
      {:else}
      <i class="fa-solid fa-star" />
    {/if}

  </div>

  <p class="comment-info__text">
    {comment.commentText}
  </p>
</div>

<style>
  .comment-info {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #e6e6e6;
  }

  .comment-info__name {
    font-size: 22px;
    font-weight: 700;
  }

  .comment__link {
    font-size: 20px;
    font-weight: 700;
    color: #db5e95;
    text-decoration: underline;
  }

  .comment-info__date {
    font-size: 18px;
  }

  .comment-info__text {
    font-size: 16px;
  }

  .stars {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .stars i {
    color: #e6e6e6;
    font-size: 16px;
    cursor: pointer;
  }
</style>
