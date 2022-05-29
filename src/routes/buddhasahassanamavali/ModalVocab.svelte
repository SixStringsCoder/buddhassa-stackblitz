<script>
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition'
  export let words;
  export let filterWords;
  export let searchTerm;

  const dispatch = createEventDispatcher();
</script>

<!-- The Modal -->
<div id="myModal" class="modal" transition:fade>
  <div class="modal-content">
    <header id="search-input-cont">    
      <!-- Search Input -->
			<div class="input-cont">
        <button id="reset-search" on:click={() => dispatch('clear')}>🔄</button>
        <form on:submit|preventDefault>
          <input type="text" 
                id="search-field" 
                placeholder="Search..." 
                autocomplete="off"
                bind:value={searchTerm}
                />
          <button type="submit" id="submit-btn">🔎</button>      
        </form>  
			</div>
			<div class="closer-cont">
      	<span class="close" on:click>&times;</span>
			</div>
  </header>
    <!-- List of Vocabulary -->
    <ul>
      {#if filterWords.length > 0}
        {#each filterWords as wordObj}
          <li><b>{wordObj.word}</b> - {wordObj.meaning} <br>{!wordObj.formation ? "" : `${wordObj.formation}`}</li>    
        {/each}
      {:else}
        {#each words as {word, meaning, formation}}
          <li><strong>{word}</strong> - {meaning} <br><span>{formation ? `${formation}` : ""}</span></li>
        {/each}
      {/if}
    </ul>
  </div>
</div>


<style>
  .modal {
    position: fixed; 
    z-index: 1; 
    left: 0;
    top: 0;
    width: 100%; 
    height: 100%; 
    overflow: auto; 
    background-color: rgb(0,0,0); 
    background-color: rgba(0,0,0,0.4); 
  }

  /* Modal Content/Box */
  .modal-content {
    position: relative;
    background-color: #fefefe;
    margin: auto;
    padding: 0 20px 20px;
    border: 1px solid #888;
    width: 80%; /* Adjust depending on screen size */
    height: 550px;
    overflow: scroll;
  }

  header {
    position: sticky;
    top: 0;
    left: 58px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 5px 0;
  }
	
	div.input-cont {
		width: 100%;
		display: flex;
    justify-content: center;
    align-items: center;
	}

  button {
    position: relative;
    outline: none;
    border: none;
    background: transparent;
    text-align: center;
    cursor: pointer;
  }

  button#reset-search {
    width: 40px;
    padding: 0;
    font-size: 40px;
  }

  button#reset-search:active {
    width: 40px;
    padding: 0;
    font-size: 37px;
  }

  form {
		width: 85%;
		display: flex;
		align-items: center;
	}

	#search-field {
		width: 90%;
		font-size: 1.3rem;
		border: 1px solid gray;
    margin: 0 5px 0 10px;
		/* border-radius: 5px 0 0 5px; */
		padding: 8px;
	}

  button#submit-btn {
		top: -1px;
		left: 0px;
    width: 40px;
    outline: none;
    background: transparent;
    text-align: center;
    font-size: 35px;
  }

  button#submit-btn:active {
    font-size: 32px;
  }

  ul {
    margin-top: 10px;
    padding: 5px;
    overflow: scroll;
  }
	
	li {
		margin: 5px 0;
	}
	
	li span {
		color: green
	}

  /* The Close Button */
  .close {
    position: relative;
    top: 0px;
    right: -5px;
    color: #aaa;
    font-size: 35px;
    font-weight: bold;
    margin-left: 15px;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }

  .close:active {
    color: red;
  }
</style>