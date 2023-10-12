<script>
  import { base } from '$app/paths';
  import { addDoc } from "firebase/firestore";
  import { messagesRef } from "$lib/firebase/firebase";

  let name = '';
  let email = '';
  let message = '';
  let isMessageSent = false;

  function sendMessage() {
    addDoc(messagesRef, {
      name,
      email,
      message,
      date: new Date().toLocaleString(),
      userId: localStorage.getItem('uid')
    })
      .then(() => {
        clear();
        isMessageSent = true;
      })
    
  }

  function clear() {
    name = '';
    email = '';
    message = '';
  }

</script>

<section class="contact page-padding">
  <div class="container">
    <div class="contact__body">
      <h1 class="subtitle contact__title">Contact us</h1>

      {#if !isMessageSent}
        <form class="form" on:submit|preventDefault={sendMessage}>
          <label class="form__item">
            <span class="form__label">
              Your name *
            </span>
            <input
              type="text"
              class="form__field"
              name="fullName"
              bind:value={name}
              placeholder="Abc"
              required
            >
          </label>

          <label class="form__item">
            <span class="form__label">
              Email address *
            </span>
            <input
              type="email"
              class="form__field"
              name="email"
              bind:value={email}
              placeholder="abc@example.com"
              required
            >
          </label>

          <label class="form__item">
            <span class="form__label">
              Message *
            </span>
            <textarea
              type="email"
              class="form__field"
              name="email"
              bind:value={message}
              placeholder="Hi! i'd like to ask about..."
              required
            />
          </label>

          <button class="btn">
            Send message
          </button>
        </form>

        {:else}
        <div class="thanks">
          <h2 class="thanks__message">
            Thank you for your message!
            <br>
            Our managers will contact you soon.
          </h2>
          <img class="thanks__img" src="/thank-you.jpg" alt="Thank you">

          <a href="{base}" class="bread-crumbs__link back-to-home">
            back to Home page
          </a>
        </div>
      {/if}
    </div>
  </div>
</section>

<style>

  .contact__body {
    padding: 60px 0;
  }

  .contact__title {
    margin-bottom: 40px;
  }

  .form {
    width: 100%;
    max-width: 500px;
  }

  .form__item {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  .form__label {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 10px;
  }

  .form__field {
    width: 100%;
    font-size: 16px;
    padding: 10px;
    color: #000000;
    border: 1px solid #b4b3b3;
    border-radius: 4px;
    outline: none;
  }

  .form__field:focus {
    border-color: #db5e95;
  }

  textarea {
    height: 200px;
    overflow: auto;
    resize: none;
  }

  .thanks {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
  }

  .thanks__message {
    font-size: 24px;
    line-height: 130%;
    font-weight: 500;
    text-align: center;
    margin-bottom: 50px;
  }

  .thanks__img {
    display: block;
    width: 100%;
    margin-bottom: 50px;
  }

  .back-to-home {
    margin: 0;
  }
</style>