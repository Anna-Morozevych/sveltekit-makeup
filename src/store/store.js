import { writable, get } from "svelte/store";


export const authUser = writable({
  firstName: '',
  lastName: '',
  email: '',
  birthday: '',
  phone: '',
  comments: [],
  orders: []
})

export const cartItems = writable([]);

//add to cart
export const addToCart = (product, selectedColor, url) => {
  let items = get(cartItems);
  const storage = localStorage.getItem('busket_products');

  if (storage) {
    items = JSON.parse(storage)
  }

  cartItems.update(() => {
    return [ ...items, {...product, selectedColor, url}];
  })

  localStorage.setItem('busket_products', JSON.stringify(get(cartItems)));
}

//remove from cart
export const removeFromCart = (id) => {
  let items = get(cartItems);
  const storage = localStorage.getItem('busket_products');

  if (storage) {
    items = JSON.parse(storage)
  }

  cartItems.update(() => {
    let updatedItems = items.filter(item => {

      return item.id !== id;
    });

    return updatedItems;
  })

  localStorage.setItem('busket_products', JSON.stringify(get(cartItems)));
}
