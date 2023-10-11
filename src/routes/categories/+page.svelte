<script>
  import Categories from "../../components/Categories.svelte";
  import Logos from '../../components/Logos.svelte';

  export let data;

  const categoriesList = data.data;
  console.log(data);
</script>



<Categories categories={categoriesList} />
<Logos />