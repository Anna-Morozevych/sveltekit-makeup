<script>
    import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
    import { auth, db } from "../lib/firebase/firebase";
    import { goto } from '$app/navigation';
    import { doc, setDoc } from "firebase/firestore";

  let email = '';
  let password = '';
  let confirmPassword = '';
  let firstName = '';
  let lastName = '';
  let error = false;
  let register = false;
  let authenticating = false;

  function authHandler() {
    if (!email || !password || (register && !confirmPassword)) {
      error = true;
      return;
    }

    authenticating = true;

    try {
      if (register) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((cred) => {
            console.log('User created:', cred.user);
            goto('/profile');
            
          })
          .catch((err) => {
            console.log(err.message);
          })

          .then(() => {
            const colRef = doc(db, 'users', auth.currentUser.uid);
            setDoc(colRef, {
              firstName: firstName,
              lastName: lastName,
              email: email,
              orders: [],
              comments: []
            })
            .then(() => {
              console.log('I added user to the collection')
            })
          })

        
      } else {
        signInWithEmailAndPassword(auth, email, password)
          .then((cred) => {
            console.log('User login:', cred.user);
            goto('/profile');
          })
      }
    } catch (err) {
      error = true
      console.log(err);
    }
  }
  

  // async function handleAuthenticate() {
  //   if (authenticating) {
  //     return;
  //   }

  //   if (!email || !password || (register && !confirmPassword)) {
  //     error = true;
  //     return;
  //   }

  //   authenticating = true;

  //   try {
  //     if (!register) {
  //      await authHandlers.login(email, password);
  //      goto('/profile');
  //     } else {
  //       await authHandlers.signup(email, password, firstName, lastName);
  //       goto('/auth');

  //       authStore.update(() => ({
  //         data: {
  //           firstName,
  //           lastName
  //         }
  //       }))
  //     }
  //   } catch (err) {
  //     console.log('There was an auth error', err);
  //     error = true;
  //   }
  // }

  function handleRegister() {
    register = !register;
  }

</script>

<div class="login-section">
  <form>
    <h1 class="login__title">{register? 'Register' : 'Login'}</h1>
    {#if error}
      <p class="error">The information you have entered is not correct</p>
    {/if}
    

    <label>
      <p class={email ? 'above' : 'center'}>Email</p>
      <input
        bind:value={email}
        type="email"
        placeholder="Email"
      />
    </label>

    <label>
      <p class={password ? 'above' : 'center'}>Password</p>
      <input
        bind:value={password}
        type="password"
        placeholder="Password"
      />
    </label>

    {#if register}
      <label>
        <p class={confirmPassword ? 'above' : 'center'}>Confirm Password</p>
        <input
          bind:value={confirmPassword}
          type="password"
          placeholder="Confirm Password"
        />
      </label>
      <label>
        <p class={firstName ? 'above' : 'center'}>First Name</p>
        <input
          bind:value={firstName}
          type="text"
          placeholder="First Name"
        />
      </label>
      <label>
        <p class={lastName ? 'above' : 'center'}>Last Name</p>
        <input
          bind:value={lastName}
          type="text"
          placeholder="Last Name"
        />
      </label>
    {/if}

    <button on:click={authHandler} type="button" class="submitBtn">
      {#if authenticating}
        <i class="fa-solid fa-spinner white spin"></i>
      {:else}
        Submit
      {/if}
      
    </button>
  </form>

  <div class="options">
    <p>Or</p>
    {#if register}
      <div>
        <p>Already have an profile?</p>
        <p on:click={handleRegister} on:keydown={() => {}}>Login</p>
      </div>
    {:else}
    <div>
      <p>Don't have an profile?</p>
      <p on:click={handleRegister} on:keydown={() => {}}>Register</p>
    </div>
    {/if}
  </div>
</div>

<style>
  .login-section {
    min-height: calc(100vh - 100px);
    background: linear-gradient(to right, #db5e95, #eb98ba);
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;

  }

  .login__title {
    color: #fff;
    font-size: 50px;
    margin-bottom: 30px;
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 400px;
    max-width: 100%;
    margin: 0 auto;
    padding: 20px;
  }

  form label {
    position: relative;
    border: 1px solid #d2347a;
    border-radius: 5px;
  }

  form input {
    width: 100%;
    border: none;
    background: transparent;
    color: #fff;
    padding: 14px;
    font-size: 20px;
    font-weight: 700;
  }

  form input:focus {
    border: none;
    outline: none;
  }

  form label:focus-within {
    border-color: #fff;
  }

  form input::placeholder {
    color: #fff;
    opacity: 60%;
    font-size: 18px;
  }

  form button {
    background: #d2347a;
    color: #fff;
    font-size: 20px;
    font-weight: 700;
    text-transform: uppercase;
    border: none;
    padding: 10px 0;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
    display: grid;
    place-items: center;
  }

  form button:hover {
    background: #fff;
    color: #d2347a;

  }

  .above, .center {
    position: absolute;
    transform: translateY(-50%);
    pointer-events: none;
    border-radius: 4px;
    padding: 3px 6px;
    font-weight: 500;
  }

  .above {
    top: 0;
    left: 24px;
    background: #fff;
    color: #d2347a;
    border: 1x solid #d2347a;
    font-size: 14px;
  }

  .center {
    top: 50%;
    left: 6px;
    border: 1px solid transparent;
    opacity: 0;
  }

  .error {
    color: red;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
  }

  .options {
    width: 100%;
    max-width: 400px;
    padding: 14px 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .options > p {
    display: block;
    position: relative;
    width: fit-content;
    margin: 0 auto;
    padding: 0 8px;
    text-align: center;
  }

  .options p {
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    
  }

  .options > p::after,
  .options > p::before {
    position: absolute;
    content: '';
    top: 50%;
    /* left: 0; */
    transform: translateY(-50%);
    width: 100vw;
    height: 1.5px;
    background: #fff;
  }

  .options > p::after {
    right: 100%;
  }

  .options > p::before {
    left: 100%;
  }

  .options div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .options div p:last-of-type {
    color: cyan;
    cursor: pointer;
  }

  .white {
    color: inherit;
  }

  .spin {
    animation: spin 2s infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }

</style>