<script>
  import { page } from '$app/stores';
  import '../global.css';
  import Navbar from "$lib/components/Navbar.svelte";
  import { goto } from '$app/navigation';

  import {onMount} from 'svelte';
  import { onAuthStateChanged } from 'firebase/auth';
  import { auth, db } from '$lib/firebase/firebase';
  import { doc, onSnapshot } from 'firebase/firestore';
  import { authUser } from '../store/store'
    import Footer from '$lib/components/Footer.svelte';
    import { categories } from '../data/categories';

  const nonAuthRoutes = ['/', 'categories'];

  onMount(() => {
    onAuthStateChanged(auth, (user) => {
      let dataToSetToStore;

      if (user) {
        window.localStorage.setItem('uid', user.uid);
        const docRef = doc(db, 'users', user.uid);
          onSnapshot(docRef, (doc) => {
            const userData = doc.data();
            dataToSetToStore = userData;
            authUser.set({...dataToSetToStore})
          })
      }

      authUser.update(curr => {
        return {
          ...curr,
          ...dataToSetToStore
        }
      })
    })
  })

</script>

<Navbar />

<slot/>

<Footer categories={categories}/>