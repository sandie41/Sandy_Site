document.addEventListener('DOMContentLoaded', function() {
    console.log('Document is ready. Initializing...');

    // DOM Elements
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    const regionFilter = document.querySelector('.filter-options select:nth-child(1)'); // First select for region
    const genreFilter = document.querySelector('.filter-options select:nth-child(2)'); // Second select for genre
    const languageFilter = document.querySelector('.filter-options select:nth-child(3)'); // Third select for language
    const songGrid = document.querySelector('.song-grid');

    // Check if elements exist
    if (!searchInput) console.error('Search input not found!');
    if (!searchButton) console.error('Search button not found!');
    if (!songGrid) console.error('Song grid not found!');

    // Sample data - replace with your actual data
    const songs = [
        {
            title: "Adowa Rhythm",
            artist: "Ashanti Royal Drummers",
            region: "ashanti",
            genre: "adowa",
            language: "akan",
            image: "./images/adowa.jpg"
        },
        {
            title: "Kpanlogo Dance",
            artist: "Ga Mashie Ensemble",
            region: "greater-accra",
            genre: "kpanlogo",
            language: "ga",
            image: "./images/kpanlogo.jpg"
        },
        {
            title: "Agbadza Festival",
            artist: "Ewe Cultural Group",
            region: "volta",
            genre: "agbadza",
            language: "ewe",
            image: "./images/agbadza.jpg"
        },
        {
            title: "Takai Dance",
            artist: "Dagomba Cultural Troupe",
            region: "northern",
            genre: "bamaya",
            language: "dagbani",
            image: "./images/takai.jpg"
        }
    ];

    // Display initial songs
    displaySongs(songs);

    // Function to display songs
    function displaySongs(songArray) {
        // Clear the current grid
        songGrid.innerHTML = '';

        if (songArray.length === 0) {
            songGrid.innerHTML = '<p class="no-results">No songs found. Try different search terms or filters.</p>';
            return;
        }

        // Add each song to the grid
        songArray.forEach(song => {
            const songCard = document.createElement('div');
            songCard.className = 'song-card';

            // Format region for display: capitalize and replace hyphens
            const regionDisplay = song.region.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

            songCard.innerHTML = `
                <div class="song-image">
                    <img src="${song.image}" alt="${song.title}">
                </div>
                <div class="song-info">
                    <h3 class="song-title">${song.title}</h3>
                    <p class="song-artist">${song.artist}</p>
                    <span class="song-region">${regionDisplay}</span>
                </div>
            `;

            songGrid.appendChild(songCard);
        });
    }

    // Function to perform search
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const regionValue = regionFilter.value;
        const genreValue = genreFilter.value;
        const languageValue = languageFilter.value;

        console.log('Searching with:', { searchTerm, regionValue, genreValue, languageValue });

        const filteredSongs = songs.filter(song => {
            // Check if the song matches the search term in title, artist, or region
            const matchesSearch = searchTerm === '' || 
                song.title.toLowerCase().includes(searchTerm) ||
                song.artist.toLowerCase().includes(searchTerm) ||
                song.region.toLowerCase().includes(searchTerm);

            // Check if the song matches the selected region
            const matchesRegion = regionValue === '' || song.region === regionValue;
            const matchesGenre = genreValue === '' || song.genre === genreValue;
            const matchesLanguage = languageValue === '' || song.language === languageValue;

            return matchesSearch && matchesRegion && matchesGenre && matchesLanguage;
        });

       console.log(`Found ${filteredSongs.length} songs`);
displaySongs(filteredSongs);
    }

    // Event Listeners
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });

    // Also perform search when filters change
    regionFilter.addEventListener('change', performSearch);
    genreFilter.addEventListener('change', performSearch);
    languageFilter.addEventListener('change', performSearch);

    console.log('Setup complete. Ready for searches!');
});

function searchSong() {
  const query = document.getElementById('searchInput').value.trim();
  if (query !== '') {
    const url = `https://www.google.com/search?q=${encodeURIComponent(query)}+song`;
    window.open(url, '_blank');
  }
}


