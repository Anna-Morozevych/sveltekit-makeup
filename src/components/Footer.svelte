<script>
  import { base } from '$app/paths';
  export let categories;
  import Logo from '$lib/images/cosmetic.png';
  import Mail from '$lib/images/mail.svg';
  import Github from '$lib/images/github.svg';
  import Linkedin from '$lib/images/linkedin.svg';
</script>

<footer class="footer page-padding">
  <div class="container">
    <div class="footer__body">
      <a class="logo-link" href={base}>
        <img class="footer__logo" src={Logo} alt="logo">
      </a>

      <div class="footer__colomns">
        <div class="footer__colomn">
          <a class="footer__link footer__link--big" href="{base}/categories">
            Categories
          </a>

          {#each categories as link}
            <a class="footer__link footer__link-item" href={`${base}/categories/${link.slug}`}>
              {link.name}
            </a>
          {/each}

        </div>

        <div class="footer__colomn">
          <a href="{base}/#history" class="footer__link footer__link--big">
            history
          </a>
          <a href="{base}/#brands" class="footer__link footer__link--big">
            brands
          </a>

          <a href="{base}/contact-us" class="footer__link footer__link--big">
            contact us
          </a>
        </div>

        <div class="footer__colomn footer__social">
          <a class="social-link" href="mailto: anna.morozevych@gmail.com">
            <img src={Mail} alt="mail">
          </a>
          <a class="social-link" href="https://github.com/Anna-Morozevych">
            <img src={Github} alt="github">
          </a>
          <a class="social-link" href="https://www.linkedin.com/in/anna-morozevych-39a25823a/">
            <img src={Linkedin} alt="linhedin">
          </a>
        </div>
      </div>
    </div>
  </div>
  
</footer>

<style>
  .footer {
    background-color: #db5e95;
  }

  .footer__body {
    padding: 60px 0;
    display: flex;
  }

  .logo-link {
    height: 80px;
    display: block;
    margin-right: 40px;
  }

  .footer__logo {
    height: 100%;
    border-radius: 4px;
  }

  .footer__colomns {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  .footer__colomn {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .footer__link--big {
    font-size: 18px;
    color: #ffffff;
    text-transform: uppercase;
    font-weight: 700;
    margin-bottom: 10px;
  }

  .footer__link {
    position: relative;
    display: block;
    color: #ffffff;
    font-size: 18px;
    font-weight: 500;
    align-self: flex-start;
  }

  .footer__link::after {
    position: absolute;
    left: 0;
    display: block;
    content: '';
    height: 2px;
    width: 100%;
    background-color: transparent;
    margin-top: 5px;
  }

  .footer__link:hover::after {
    animation: navlink 0.3s ease;
    position: absolute;
    left: 0;
    display: block;
    content: '';
    height: 2px;
    background-color: #ffffff;
    /* margin-top: 5px; */
  }

  .footer__link-item {
    margin-left: 10px;
  }

  .footer__social {
    flex-direction: row;
  }

  .social-link {
    width: 30px;
    height: 30px;
  }

  .social-link:hover {
    opacity: 70%;
  }

  .social-link img {
    width: 100%;
    height: 100%;
  }

  @media screen and (max-width: 490px) {
    .footer__body {
      display: block;
      padding: 40px 0 ;
    }

    .logo-link {
      margin: 0 0 40px;
    }

    .footer__colomn {
      gap: 24px;
    }
  }
</style>