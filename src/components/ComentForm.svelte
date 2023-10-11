<script>
  import { addDoc } from "firebase/firestore";
  import { commentsRef } from "../lib/firebase/firebase";
  import { page } from '$app/stores';

  export let product;

  let raiting = 0;
  let commentText = '';
  let url = '';
  url = $page.url.pathname;

  function setRaiting(event) {
    const targetId = +event.target.id;
    const stars = document.querySelectorAll('#stars i');

    stars.forEach((star, index) => {
      targetId >= (index + 1) ? star.style.color = '#ff9c1a' : star.style.color = '#e6e6e6';
    })

    raiting = targetId;

  }

  function postComment() {
    if (!raiting) {
      pushNotification();
      return
    }

    addDoc(commentsRef, {
      product,
      raiting,
      commentText,
      date: new Date().toLocaleString(),
      userId: localStorage.getItem('uid'),
      url: url,
    })
      .then(() => {
        console.log('Submit');
        clear();
      })
  }

  function clear() {
    raiting = 0;
    commentText = '';

    const stars = document.querySelectorAll('#stars i');

    stars.forEach((star) => {
      star.style.color = '#e6e6e6';
    })
  }

  function pushNotification() {
    const stars = document.querySelector('#stars');
    const notification = document.createElement('div');
    notification.className = 'raiting-error';
    notification.textContent = 'Rate this product';
    stars.append(notification);

    setTimeout(() => {
      notification.remove()
    }, 3000);
  }

</script>

<div class="comment-block page-padding">
  <div class="container">
    <div class="comment-block__body">
      <h2 class="comment-block__title">
        Leave a comment
      </h2>

      <form class="comment-form" on:submit|preventDefault={postComment}>
        <div class="raiting-box">
          <div class="stars" id="stars">
            <a href="/" on:click|preventDefault={setRaiting}>
              <i class="fa-solid fa-star" id="1"></i>
            </a>
            <a href="/" on:click|preventDefault={setRaiting}>
              <i class="fa-solid fa-star" id="2"></i>
            </a>
            <a href="/" on:click|preventDefault={setRaiting}>
              <i class="fa-solid fa-star" id="3"></i>
            </a>
            <a href="/" on:click|preventDefault={setRaiting}>
              <i class="fa-solid fa-star" id="4"></i>
            </a>
            <a href="/" on:click|preventDefault={setRaiting}>
              <i class="fa-solid fa-star" id="5"></i>
            </a>
          </div>
        </div>
        <textarea
          class="comment-form__input"
          name="comment"
          rows="10"
          bind:value={commentText}
          required
        />

        <button class="btn comment-form__btn">POST</button>
      </form>
    </div>
  </div>
</div>

<style>
  .comment-block__body {
    padding: 40px 0;
  }

  .comment-block__title {
    font-size: 30px;
    font-weight: 700;
    color: rgb(180, 73, 180);
    margin-bottom: 30px;
  }

   .comment-form {
    display: flex;
    flex-direction: column;
    align-items: baseline;
    gap: 20px;
   }

  .raiting-box {
    position: relative;
  }

  .raiting-box .stars {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .stars i {
    color: #e6e6e6;
    font-size: 28px;
    cursor: pointer;
    transition: color 0.2s ease;
  }

  .comment-form__input {
    resize: none;
    width: 100%;
    border: 1px solid #e6e6e6;
    outline-color: rgba(180, 73, 180, 30%);
    border-radius: 8px;
    padding: 20px;
    font-size: 18px;
  }

  .comment-form__btn {
    width: 100%;
    max-width: 200px;
  }



</style>
