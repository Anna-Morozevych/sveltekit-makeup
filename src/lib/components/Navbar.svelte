<script>
  import { onMount } from "svelte";
  import { cartItems } from "../../store/store";
  import { get } from "svelte/store";
  import { base } from '$app/paths';
  import Logo from '$lib/images/cosmetic.png';
  import Menu from '$lib/images/menu.png';
  import Profile from '$lib/images/icon-profile.svg';
  import Cart from '$lib/images/icon-bag.svg';


  let carts = get(cartItems);
  let productsAmount = carts.length;
  cartItems.subscribe((newCartValue) => {
    productsAmount = newCartValue.length
  })

  onMount(() => {
    const storage = localStorage.getItem('busket_products');

    if (carts.length === 0 && storage) {
      carts = JSON.parse(storage)
    } else {
      carts = get(cartItems);
    }

    productsAmount = carts.length;
  })

</script>

<nav class="navbar page-padding">
  <div class="container">
    <div class="navbar__body">
      <a href="{base}/" class="navbar__logo">
        <img src={Logo} class="navbar__logo-img" alt="logo">
      </a>
      <div class="navbar__menu">

        <label for="menu-bar" class="navbar__menu-icon">
          <img src={Menu} alt="menu">
        </label>
        <input type="checkbox" id="menu-bar">

        <div class="navbar__links">
          <a href="{base}/#history" class="navbar__link">
            history
          </a>
          <a href="{base}/#brands" class="navbar__link">
            brands
          </a>

          <div class="dropdown">
            <a href="{base}/categories"
              class="navbar__link"
            >
              categories
            </a>
          </div>

          <a href="{base}/contact-us" class="navbar__link">
            contact us
          </a>
        </div>

        <div class="profile">
          <a href="{base}/profile" class="profile__icon-link">
            <img src={Profile} alt="profile" class="profile__icon">
          </a>
          <a href="{base}/basket" class="profile__icon-link">
            <img src={Cart} alt="bag" class="profile__icon last">
            <div class="profile__bag-num">
              {productsAmount}
            </div>
          </a>
        </div>
      </div>


    </div>
  </div>
</nav>

<style>
  @keyframes navlink {
    from {
      width: 0%;
    }

    to {
      width: 100%;
    }
  }

  .navbar {
    position: relative;
    z-index: 100;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }

  .navbar__body {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;
    padding: 10px 0;
  }

  .navbar__logo {
    height: 100%;
    transition: all 0.3s ease;
  }

  .navbar__logo:hover {
    transform: scale(1.1);
  }

  .navbar__logo-img {
    height: 100%;
  }

  .navbar__menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .navbar__links {
    display: flex;
    margin-right: 70px;
  }

  .navbar__link {
    position: relative;
    display: inline-block;
    font-size: 16px;
    text-align: center;
    padding: 10px 5px;
    text-transform: uppercase;
    font-weight: 500;
    margin: 0 30px 0 0;
  }

  .navbar__link::after {
    position: absolute;
    left: 0;
    display: block;
    content: '';
    height: 2px;
    width: 100%;
    background-color: transparent;
    margin-top: 10px;
  }

  .navbar__link:hover::after {
    animation: navlink 0.3s ease;
    position: absolute;
    left: 0;
    display: block;
    content: '';
    height: 2px;
    background-color: #db5e95;
    margin-top: 10px;
  }

  .profile {
    display: flex;
  }

  .profile__icon-link {
    position: relative;
    transition: all 0.2s ease;
  }

  .profile__icon-link:hover {
    transform: scale(1.2);
  }

  .profile__icon {
    width: 30px;
    margin-right: 20px;
  }

  .profile__bag-num {
    position: absolute;
    top: -5px;
    right: -7px;
    width: 20px;
    height: 20px;
    font-size: 16px;
    font-weight: 700;
    background-color: #db5e95;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
  }

  .last {
    margin-right: 0;
  }

  .dropdown {
    position: relative;
  }

  /* .dropdown__list {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 105%;
    left: -25%;
    padding: 10px 20px;
    background-color: #ffffff;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }

  .dropdown__list {
    display: none;
  }

  .dropdown:hover>.dropdown__list {
    display: flex;
  } */

  .navbar__menu-icon {
    cursor: pointer;
    display: none;
    margin-right: 20px;
  }

  #menu-bar {
    display: none;
  }


  @media screen and (max-width: 992px) {
    .navbar__menu-icon {
      display: initial;
    }

    .navbar__links {
      display: none;
      position: absolute;
      width: 100%;
      max-width: 300px;
      top: 100%;
      right: 0;
      background-color: #ffffff;
      padding: 20px 0;
      overflow: hidden;
      border-top: 2px solid #db5e95;
      margin-right: 0;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }

    .navbar__link {
      display: block;
      transition: all 0.2s;
      margin-right: 0;
      font-weight: 700;
    }

    .navbar__link:hover {
      background-color: #db5e95;
      color: #ffffff;
    }

    .navbar__link:hover:after {
      display: none;
    }

    /* .dropdown>.dropdown__list {
      position: relative;
      display: block;
      left: 0;
      right: 0;
      box-shadow: none;
      padding: 0;
    }

    .dropdown>.dropdown__list>.navbar__link {
      margin: 0 auto;
      display: block;
      width: 100%;
      font-weight: 500;
      background-color: #eee;
    }

    .dropdown>.dropdown__list>.navbar__link:hover {
      background-color: #db5e95;
      color: #ffffff;
    } */

    #menu-bar:checked ~ .navbar__links {
      display: block;
    }
  }

</style>

