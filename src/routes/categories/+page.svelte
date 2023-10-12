<script>
  import Categories from "$lib/components/Categories.svelte";
  import Logos from '$lib/components/Logos.svelte';

  export let data;

  const categoriesList = data.data;
  console.log(data);
</script>



<Categories categories={categoriesList} />
<Logos />