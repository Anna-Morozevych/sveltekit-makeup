<script>
    import { getDocs, query, where } from "firebase/firestore";
    import { onMount } from "svelte";
    import { commentsRef } from "$lib/firebase/firebase";
    import Comment from "$lib/components/Comment.svelte";

  let authorId = '';
  let allUserComents = []

  onMount(() => {
    let storageId = localStorage.getItem('uid');
    authorId = storageId;

    const q = query(commentsRef, where('userId', '==', authorId));

    getDocs(q)
      .then(res => {
        const comments = [];

        res.docs.forEach(doc => {
          comments.push({...doc.data()})
        })

        allUserComents = comments.sort((prod1, prod2) => prod1.date.localeCompare(prod2.date));
      })
  })

  $:console.log(allUserComents);
</script>

{#if allUserComents.length}
  {#each allUserComents as comment}
    <Comment {comment} />
  {/each}

  {:else}
    <h2 class="leave-comment">
      You have not left any comments yet
    </h2>
{/if}

<style>
  .leave-comment {
    font-size: 24px;
    color: rgb(180, 73, 180);
    text-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    margin-bottom: 40px;
  }
</style>
