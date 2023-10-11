<script>

  const logos = [
    'chanel',
    'lancome',
    'mac',
    'kiko',
    'maybelline',
    'colorpop',
    'dior',
    'pupa',
    'loreal',
    'maxfactor',
  ]

</script>

<section id="brands">
  <div class="line line__padding">
    <div class="line__wrap">
      {#each logos as logo}
        <div class="line__logo-wrap">
          <img src={`${logo}.png`} alt={logo} class="line__logo">
        </div>
      {/each}
    </div>
  
    <div class="line__wrap">
      {#each logos as logo}
        <div class="line__logo-wrap">
          <img src={`${logo}.png`} alt={logo} class="line__logo">
        </div>
      {/each}
    </div>
  </div>

</section>

<style>
  @keyframes line {
    from {
      transform: translateX(0%);
    }

    to {
      transform: translateX(-100%);
    }
  }

  .line {
    display: flex;
    overflow: hidden;
  }

  .line__wrap {
    display: flex;
    justify-content: baseline;
    align-items: flex-start;
    padding: 0 20px;
    height: 50px;
    animation: line 20s linear infinite;
  }

  .line__logo-wrap {
    height: 100%;
    margin-right: 70px;
    padding: 10px;
    border: 1px solid transparent;
    transition: all 0.3s;
  }

  .line__logo {
    height: 100%;
  }

  .line__padding {
    padding: 40px 0;
  }
</style>