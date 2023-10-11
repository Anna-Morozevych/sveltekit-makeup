export async function load({ fetch, params }) {
  const res = await fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?product_type=${params.slug.replace('-', '_')}`);
  const item = await res.json();
  console.log(params)
 
  return { 
    item,
   };
}
