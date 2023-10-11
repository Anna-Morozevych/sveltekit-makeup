export async function load({ fetch, params }) {
  const res = await fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?product_type=${params.slug.replace('-', '_')}`);
  const products = await res.json();
 
  return { 
    product: products.find(el => el.id === +params.id),
   };
}