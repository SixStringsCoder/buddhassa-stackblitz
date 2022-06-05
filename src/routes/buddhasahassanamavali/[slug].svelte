<!-- Use this async load with fetch if you want to fetch JSON locally -->
<!-- otherwise uncomment out GraphCMS code in [slug].js and fetch from GraphCMS -->
<!-- <script context="module">
  export async function load({ params, fetch }) {
    const response = await fetch(`../verses.json`); // stored in static folder
    const verses = await response.json();
    const verse = verses.find(verse => verse.slug === params.slug)
    console.log(verse)
    return {
      props: verse 
    }
  }
</script>  -->


<script>
  import versesJSON from './data/verses.json'
  import wordsJSON from './data/words.json'
  import ModalVocab from './ModalVocab.svelte'
  import SearchVerses from './SearchVerses.svelte'
  import VerseInput from './VerseInput.svelte'
  
  export let verse
  export let params

  let versesQty = versesJSON.length
  let verseNo = 1
  // let rootURL = "http://localhost:3000"
  let rootURL = "https://github-bapgem--3000.local.webcontainer.io"
  $: URL = `${rootURL}/buddhasahassanamavali/verse-${verseNo}`
  

  const prevVerse = () => verseNo === 1 ? verseNo = versesQty : verseNo -= 1
  const nextVerse = () => verseNo === versesQty ? verseNo = 1 : verseNo += 1

  // SEARCH A VERSE FOR WORD OR PHRASE
  let searchVersesTerm
	let script = "English"
  let verseMatches = [];
  $: console.log(verse)

  $: if (!searchVersesTerm) {
		verseMatches = [];
		searchVersesTerm = null
	}
	
	const handleVerseSearch = () => {
    verseMatches = versesJSON.filter(verse => {
			if (script === "Roman Pali") {
				return verse.romanpali.includes(searchVersesTerm) 
			} else if (script === "Devanagari Pali") {
				return verse.devanagari.includes(searchVersesTerm) 
			}
			return verse.english.includes(searchVersesTerm) 
		})
	}
	
	const handleVerseLinkFromSearch = (e) => {
		verseNo = e.target.id
    console.log(verseNo)
		verseMatches = [];
	}


  // SEARCH FOR A VERSE BY NUMBER
  let showVerseSearch = false

  const handleGoToVerse = () => {
    if (verseNo > versesQty) {
      verseNo = 1;
      alert("That verse doesn't exist")
      return;
    }
    return;
  }

  const handleSearchVerse = () => {
    showVerseSearch = !showVerseSearch;
    verseNo = null
  }

  // GET ALL VOCABULARY WORDS from verses.json
  const vocabFromVerses = versesJSON.reduce((accumArr, currObj) => {
    return [...accumArr, currObj.vocabulary].flat()
    }, [])

  // SORT VOCABULARY WORDS
  let words = wordsJSON.sort((currWord, nextWord) => {
    if (currWord.wordId > nextWord.wordId) {
      return 1;
    }
    if (currWord.wordId < nextWord.wordId) {
      return -1;
    }
    return 0;
  });

  // WORD SEARCH
  let searchTerm;

  let filterWords = [];
  $: console.log(searchTerm)
  const handleWordSearch = () => {
    filterWords = words.filter(word => word.wordId.startsWith(searchTerm.toLowerCase()) ||
      word.word.startsWith(searchTerm.toLowerCase()) ||
      word.meaning.includes(searchTerm.toLowerCase()) ||
      word.formation.includes(searchTerm.toLowerCase())
    )
  }

  const resetSearch = () => {
    searchTerm = ""
    filterWords = []
  }

  $: if (!searchTerm) filterWords = []

  let modalShowing = false;
  const handleModal = () => modalShowing = !modalShowing;

</script>

<svelte:head>
  <title>Buddhasahassanāmāvali - Verse {verse.id}</title>
</svelte:head>

<main>
  <section class="verse">
    <!--TITLE HEADING-->
    <h1>Buddhasahassanāmāvali</h1>

    <SearchVerses bind:script 
                  bind:searchVersesTerm
                  {verseMatches}
                  {URL}
									on:input={handleVerseSearch}
									on:click={handleVerseLinkFromSearch} />

    <div class="title-heading-cont">
      <h2>{verse.id}</h2>
      <span on:click={handleSearchVerse}>🔎</span>
    </div>

    {#if showVerseSearch}
      <VerseInput bind:verseNo 
                  verseURL={URL}
                  on:click={handleGoToVerse} />
    {/if}

    <!--AUDIO-->
    <div class="audio-cont">
      <audio controls src={verse.audio} type="audio/mp3">      
            Your browser does not support HTML 5 audio.
      </audio>
    </div>

    <!--DEVANAGIRI PALI SCRIPT-->
    <pre class="pali-italics" title="DEVANAGIRI PALI SCRIPT">
      {verse.devanagari}
    </pre>

    <!--ROMAN PALI SCRIPT-->
    <pre class="pali-italics" title="ROMAN PALI SCRIPT">
      {verse.romanpali}
    </pre>

    <!--ENGLISH  TRANSLATION-->
    <pre id="english" title="ENGLISH TRANSLATION">
      {verse.english}
    </pre>

    <!-- Next/prev buttons -->
    <a href={URL}><span class="prev" title="Get previous verse" on:click={prevVerse}>&#10094;</span></a>
    <a href={URL}><span class="next" title="Get next verse" on:click={nextVerse}>&#10095;</span></a>
  </section>

  <hr />

  <section class="pali-vocab">
    <!--PALI VOCABULARY-->
    <div class="title-heading-cont">
      <h3>Vocabulary</h3>
      <span on:click={handleModal}>🔎</span>
    </div>
    <ol>
        {#each verse.vocabulary as wordObj}
          <li><b>{wordObj.word}</b> - {wordObj.meaning} <br>{!wordObj.formation ? "" : `(${wordObj.formation})`}</li>    
        {/each}
    </ol>
    

    {#if modalShowing}
      <ModalVocab {words}
                  {filterWords}
                  bind:searchTerm
                  on:submit={handleWordSearch}
                  on:click={() => modalShowing = !modalShowing}
                  on:clear={resetSearch} />
    {/if}
  </section>
  

  <section class="quizlet-pdf-cont">
    <!--QUIZLET-->
    <div>
      <iframe src={verse.quizlet} height="410" width="100%" style="border:0" title="flashcards"></iframe>
    </div>
      
    <!--PDF DOWNLOAD LINK and BUTTON-->
    <div>
      <a href={verse.pdfFlashcards}>
        <button>Download the Flashcards</button>
      </a>
    </div> 
  </section>
</main>


<style>
  main {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: 	hsl(39, 37%, 85%);
  } 

  section {
    padding: 20px;
  }

  section.quizlet-pdf-cont {
    width: 90%;
  }

  h1, h2, h3 {
    text-align: center;
    font-weight: bold;
  }

  div.title-heading-cont {
    position: relative;
    display: flex;
    justify-content: center;
  }

  div.title-heading-cont span {
    position: absolute;
    top: 0;
    right: 70px;
    font-size: 1rem;
    cursor: pointer;
  }

  .audio-cont {
    margin-left: auto;
    margin-right: auto;
  }

  pre {
    width: 335px;
    text-align: center;
    line-height: 125%;
    margin: 0;
  }

  pre#english {
    white-space:pre-line;
  }

  .pali-italics {
    font-style: italic;
  }

  .pali-vocab ol {
    max-width: 400px;
  }

  ol {
    margin: 0 0 10px 10px;
  }
  li {
    font-size: 1.1rem;
    line-height: 140%;
  } 

  div {
    width: 100%;
    text-align: center;
  }

  button {
    width: 190px;
    margin-top: 15px;
  }

  /* Next & previous buttons */
  .prev, .next {
    cursor: pointer;
    position: absolute;
    top: 350px; 
    margin: 0 10px;
    padding: 16px;
    color: #888;
    font-weight: bold;
    font-size: 1.5rem;
    user-select: none;
  }

  .prev {
    left: 0;
    border-radius: 0 3px 3px 0;
  }

  /* Position the "next button" to the right */
  .next {
    right: 0;
    border-radius: 3px 0 0 3px;
  }

  /* On hover, add a black background color with a little bit see-through */
  .prev:hover, .next:hover {
    background-color: rgba(0,0,0,0.8);
    color: white;
  }
</style>