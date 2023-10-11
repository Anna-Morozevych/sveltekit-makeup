<script>

  // import function to register Swiper custom elements
  import { register } from "swiper/element/bundle";
  import Categories from "../components/Categories.svelte";
  import Logos from "../components/Logos.svelte";
  import { categories } from "../data/categories";
  import { onMount } from "svelte";

  onMount(() => {
    // register Swiper custom elements
    register();
  })

</script>

<swiper-container
  pagination="true"
  space-between="30"
  loop="true"
  autoplay-delay="2500"
  autoplay-disable-on-interaction="false"
>
  <swiper-slide>
    <div class="slide-wrap">
      <img src="broves.jpg" alt="broves" class="slide-img" />
    </div>
  </swiper-slide>
  <swiper-slide>
    <div class="slide-wrap">
      <img src="eyeshadow.jpg" alt="eyeshadow" class="slide-img" />
    </div>
  </swiper-slide>
  <swiper-slide>
    <div class="slide-wrap">
      <img src="lipstickslde.png" alt="lipstick" class="slide-img" />
    </div>
  </swiper-slide>
  <swiper-slide>
    <div class="slide-wrap">
      <img src="mascaraslide.png" alt="mascara" class="slide-img" />
    </div>
  </swiper-slide>
  <swiper-slide>
    <div class="slide-wrap">
      <img src="nails.jpg" alt="nails" class="slide-img" />
    </div>
  </swiper-slide>
  <swiper-slide>
    <div class="slide-wrap">
      <img src="banner.jpg" alt="makeup" class="slide-img" />
    </div>
  </swiper-slide>
  <swiper-slide>
    <div class="slide-wrap">
      <img src="makeup1.jpeg" alt="makeup" class="slide-img" />
    </div>
  </swiper-slide>
  <swiper-slide>
    <div class="slide-wrap">
      <img src="rock-a-nude-lip.webp" alt="lips" class="slide-img" />
    </div>
  </swiper-slide>
</swiper-container>

<section class="section" id="history">
  <div class="container">
    <div class="history page-padding">
      <div class="history__body">
        <h2 class="subtitle">The history of cosmetics</h2>

        <p class="text">
          Cosmetics are constituted mixtures of chemical compounds derived from
          either natural sources, or synthetically created ones. Cosmetics
          have various purposes. Those designed for personal care and skin care
          can be used to cleanse or protect the body or skin. Cosmetics designed
          to enhance or alter one's appearance (makeup) can be used to conceal
          blemishes, enhance one's natural features (such as the eyebrows and
          eyelashes), add color to a person's face, or change the appearance of
          the face entirely to resemble a different person, creature or object.
          Cosmetics can also be designed to add fragrance to the body.
        </p>
      </div>
    </div>
  </div>
</section>

<Logos />
<Categories categories={categories}/>

<style>
  swiper-container {
    width: 100%;
    height: 400px;
  }

  .slide-wrap {
    width: 100%;
    height: 100%;
  }

  .slide-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .history__body {
    padding: 60px 0;
  }
</style>
