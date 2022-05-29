<script lang="ts">
  export let verseNo;
  export let verseURL;

</script>



<div class="search-input-cont">
    <input type="number" 
          id="verse-num-field" 
          placeholder="Go to Verse (number)"
          autocomplete="off"
          min="1"
          max="150"
          maxlength="3"
          bind:value={verseNo}
          />
    <a href={verseURL}>
      <button on:click>GO</button>
    </a>
</div> 


<style>
	div.search-input-cont {
		width: 100%;
		display: flex;
		justify-content: center;
		margin: 0 0 0 10px;
	}

  input {
    width: 165px;
		font-size: .8rem;
		border: 1px solid gray;
		border-radius: 5px;
		padding: 8px;
		margin: 0 10px 20px;
  }

  button {
    height: 32px;
  }
</style>