<script>
  import { page } from '$app/stores';
  import { signOut } from "firebase/auth";
  import { auth } from "../../lib/firebase/firebase";
  import { goto } from '$app/navigation';
  import { authUser } from "../../store/store";
  import { onMount } from 'svelte';

  let user = {};
  let userId = '';

  authUser.subscribe(data => {
    user = {...data}
  })


  function setActiveLink(event) {
    const target = event.target;
    currentPage = target.href.split('/');
    currentPage = currentPage[currentPage.length - 1].replace('-', ' ');
  }

  function logOutHandler() {
    signOut(auth)
      .then(() => {
        goto('/auth');
        console.log('Logout')
      })
      .catch(err => {
        console.log(err)
      })

    window.localStorage.removeItem('uid');
  }

  let currentPage = '';

  onMount(() => {
    userId = window.localStorage.getItem('uid');

    if (!userId) {
      goto('/auth');
      return;
    }

    currentPage = $page.route.id.split('/');
    currentPage = currentPage[currentPage.length - 1].replace('-', ' ');
  })

</script>

<section>
  <div class="contaier">
    <div class="profile page-padding">
      <div class="profile__body">
        <div class="profile__top">
          <div class="profile__title">
            My profile
          </div>
          <h1 class="profile__title">
            Hello, 
            <span class="profile__title-name">{user.firstName}</span>
            <span class="profile__title-name">{user.lastName}</span>
            !
          </h1>
        </div>
        <div class="bread-crumbs">
          <div class="bread-crumbs__body">
            <a href="/" class="bread-crumbs__link bread-crumbs__link--active">My profile</a>
            <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 96 960 960" width="16" fill="#db5e95">
              <path d="m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z"/>
            </svg>
            <div class="bread-crumb__div">
            {currentPage}
            </div>
          </div>
        </div>

        <div class="profile__content">
          <div class="profile__nav">
            <a href="/profile" class="profile__nav-link" on:click={setActiveLink}>
              My data
            </a>
            <a href="/profile/my-orders" class="profile__nav-link" on:click={setActiveLink}>
              My orders
            </a>
            <a href="/profile/my-comments" class="profile__nav-link" on:click={setActiveLink}>
              My comments
            </a>
            <button class="btn" on:click={logOutHandler}>
              Sign out
            </button>
          </div>

          <div class="profile__info">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
  
</section>

<style>
  .profile__body {
    padding: 60px 0;
  }

  .profile__top {
    display: flex;
    justify-content: space-between;
    border-bottom: 3px solid #d2347a;
    padding: 0 5px 5px;
  }

  .profile__title {
    font-size: 26px;
    font-weight: 700;
  }

  .profile__title-name {
    font-size: 30px;
    font-weight: 700;
    color: #d2347a;
  }

  .profile__content {
    display: flex;
  }

  .profile__nav {
    width: 200px;
    border-right: 1px solid #e9e9e9;
    padding-right: 10px;
  }

  .profile__nav-link {
    display: block;
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 20px;
    padding: 5px;
  }

  /* .profile__nav-link--active {
    position: relative;
  }

  .profile__nav-link--active::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    display: block;
    width: 100%;
    height: 2px;
    background-color: #d2347a;
  } */

  .profile__info {
    width: 100%;
    padding-left: 40px;
  }
</style>