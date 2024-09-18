var results_container = document.querySelector("#saavn-results");
var results_objects = {};
const searchUrl = "https://jiosaavn-api-privatecvc2.vercel.app/search/songs?query=";
var currentlyPlayingAudio = null;

function SaavnSearch() {
    event.preventDefault();
    var query = document.querySelector("#saavn-search-box").value.trim();
    query = encodeURIComponent(query);

    if (query.length > 0) {
        window.location.hash = query;
        doSaavnSearch(query);
    }
}

var page_index = 1;
function nextPage() {
    var query = document.querySelector("#saavn-search-box").value.trim();
    if (!query) {
        query = lastSearch;
    }
    query = encodeURIComponent(query);
    doSaavnSearch(query, 0, true);
}

async function doSaavnSearch(query, NotScroll, page) {
    window.location.hash = query;
    document.querySelector("#saavn-search-box").value = decodeURIComponent(query);
    if (!query) {
        return 0;
    }
    results_container.innerHTML = `<div class="loader">Searching...</div>`;
    query = query + "&limit=40";
    if (page) {
        page_index = page_index + 1;
        query = query + "&page=" + page_index;
    } else {
        query = query + "&page=1";
        page_index = 1;
    }

    try {
        var response = await fetch(searchUrl + query);
    } catch (error) {
        results_container.innerHTML = `<div class="error">Error: ${error} <br> Check if you are connected to the internet </div>`;
    }
    var json = await response.json();
    if (response.status !== 200) {
        results_container.innerHTML = `<div class="error">Error: ${json.message}</div>`;
        console.log(response);
        return 0;
    }
    var json = json.data.results;
    var results = [];
    if (!json) {
        results_container.innerHTML = "<p> No results found. Try another search term. </p>";
        return;
    }
    lastSearch = decodeURI(window.location.hash.substring(1));
    for (let track of json) {
        song_name = TextAbstract(track.name, 60);
        album_name = TextAbstract(track.album.name, 40);
        if (track.album.name == track.name) {
            album_name = "";
        }
        var measuredTime = new Date(null);
        measuredTime.setSeconds(track.duration);
        var play_time = measuredTime.toISOString().substr(11, 8);
        if (play_time.startsWith("00:0")) {
            play_time = play_time.slice(4);
        }
        if (play_time.startsWith("00:")) {
            play_time = play_time.slice(3);
        }
        var song_id = track.id;
        var year = track.year;
        var song_image = track.image[2].link; // Using a larger image
        var song_artist = TextAbstract(track.primaryArtists, 40);
        var bitrate = document.getElementById('saavn-bitrate');
        var bitrate_i = bitrate.options[bitrate.selectedIndex].value;
        if (track.downloadUrl) {
            var download_url = track.downloadUrl[bitrate_i]['link'];
            var quality = bitrate_i == 4 ? 320 : 160;
            results_objects[song_id] = {
                track: track
            };
            results.push(`
            <div class="video-container" data-song-id="${song_id}" data-download-url="${download_url}">
                <div class="thumbnail">
                    <img src="${song_image}" alt="Album cover">
                    <span class="duration">${play_time}</span>
                </div>
                <div class="video-info">
                    <h3 class="video-title">${song_name}</h3>
                    <p class="channel-name">${song_artist}</p>
                    <p class="video-metadata">${album_name} • ${year}</p>
                </div>
            </div>
            `);
        }
    }

    results_container.innerHTML = `
    <div class="youtube-grid">
        ${results.join('')}
    </div>
    `;
    if (!NotScroll) {
        document.getElementById("saavn-results").scrollIntoView();
    }

    // Add click event listener to video containers
    document.querySelectorAll('.video-container').forEach(container => {
        container.addEventListener('click', function(e) {
            const songId = this.dataset.songId;
            const downloadUrl = this.dataset.downloadUrl;
            PlayAudio(downloadUrl, songId);
        });
    });
}

function TextAbstract(text, length) {
    if (text == null) {
        return "";
    }
    if (text.length <= length) {
        return text;
    }
    text = text.substring(0, length);
    last = text.lastIndexOf(" ");
    text = text.substring(0, last);
    return text + "...";
}

function PlayAudio(url, songId) {
    if (currentlyPlayingAudio) {
        currentlyPlayingAudio.pause();
        document.querySelectorAll('.video-container').forEach(container => {
            container.classList.remove('playing');
        });
    }

    const audioElement = new Audio(url);
    audioElement.play();
    currentlyPlayingAudio = audioElement;

    const videoContainer = document.querySelector(`[data-song-id="${songId}"]`);
    videoContainer.classList.add('playing');

    audioElement.onended = function() {
        videoContainer.classList.remove('playing');
        currentlyPlayingAudio = null;
    };
}

if (window.location.hash) {
    doSaavnSearch(window.location.hash.substring(1));
} else {
    doSaavnSearch('hindi', 1);
}

addEventListener('hashchange', event => { });
onhashchange = event => {
    doSaavnSearch(window.location.hash.substring(1));
};

document.getElementById('saavn-bitrate').addEventListener('change', function () {
    doSaavnSearch(lastSearch);
});

document.getElementById("loadmore").addEventListener('click', nextPage);

// Add this CSS to your stylesheet
const style = document.createElement('style');
style.textContent = `
    .youtube-grid {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 20px;
        padding: 20px;
    }
    @media (min-width: 768px) {
        .youtube-grid {
            grid-template-columns: repeat(3, 1fr);
        }
    }
    .video-container {
        cursor: pointer;
        transition: transform 0.2s;
    }
    .video-container:hover {
        transform: scale(.90);
    }
    .thumbnail {
        position: relative;
        width: 100%;
        padding-top: 56.25%; /* 16:9 Aspect Ratio */
        overflow: hidden;
    }
    .thumbnail img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .duration {
        position: absolute;
        bottom: 5px;
        right: 5px;
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 2px 4px;
        font-size: 12px;
        border-radius: 2px;
    }
    .video-info {
        padding: 10px 0;
    }
    .video-title {
        font-size: 16px;
        font-weight: 500;
        margin: 0 0 5px 0;
        line-height: 1.2;
    }
    .channel-name, .video-metadata {
        font-size: 14px;
        color: #606060;
        margin: 0;
    }
    .playing {
        position: relative;
    }
    .playing::after {
        content: '▶';
        position: absolute;
        top: 10px;
        left: 10px;
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 5px;
        border-radius: 50%;
    }
    .loader {
        text-align: center;
        padding: 20px;
        font-size: 18px;
    }
    .error {
        color: red;
        text-align: center;
        padding: 20px;
        font-size: 16px;
    }
`;
document.head.appendChild(style);
