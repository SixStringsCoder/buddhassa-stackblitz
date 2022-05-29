<script>
	export let searchVersesTerm
	export let script
	export let verseMatches = []
	export let URL;
</script>


<section>
	<input type="text" 
				 id="search-field" 
				 placeholder="Search {script} Verses..." 
				 autocomplete="off"
				 bind:value={searchVersesTerm}
				 on:input
				 /> 
	
	<div id="options-cont">	
		<div>
			<input type=radio id="pali" bind:group={script} value="Roman Pali">
			<label for="pali">Pali</label>
		</div>
		<div>
			<input type=radio id="english" bind:group={script} value="English">	
			<label for="english">English</label>
		</div>
		<div>
			<input type=radio id="devanagari" bind:group={script} value="Devanagari Pali">
			<label for="devanagari">देवनागरी</label>
		</div>
	</div>
	
	{#if verseMatches.length > 0}
		<div id="search-results-cont">
			<h4>Search Results</h4>
			<ul id="search-results">
				{#each verseMatches as verse}
					<li id={String(verse.id.match(/\d+/) - 1)} on:click>
						<a href={URL}>{verse.id}</a>			
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</section>	


<style>
	section {
		position: relative;
    margin: 20px auto;
	}
	
	h4 {
		margin: 5px 0 0 0;
	}
	
	input[type=text] {
		width: 100%;
    padding: 5px;
		margin: 0;
    font-size: 1rem;
	}
	
	div#search-results-cont {
		position: absolute;
		z-index: 1;
		background-color: white;
		padding: 0 10px;
		width: 100%;
		border: 1px solid black;
	}
	
	ul {
		margin: 0;
		padding: 0;
	}
	
	li {
		margin: 15px 0;
		list-style: none;
		cursor: pointer;
	}
	
	div#options-cont {
		display: flex;
    justify-content: space-between;
    margin: 5px 0;
	}	
	
	div#options-cont div {
		display: flex;
		align-items: center;
	}
	
	input[type=radio] {
		width: 30px;
    height: 15px;
    cursor: pointer;
	}

  label {
    font-size: 1.1rem;
  }
</style>