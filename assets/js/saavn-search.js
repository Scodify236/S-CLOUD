var results_container = document.querySelector("#saavn-results")
var results_objects = {};
const searchUrl = "https://jiosaavn-api-privatecvc2.vercel.app/search/songs?query=";
function SaavnSearch() {
event.preventDefault(); // stop page changing to #, which will reload the page
var query = document.querySelector("#saavn-search-box").value.trim()
query = encodeURIComponent(query);

if(query==lastSearch) {doSaavnSearch(query)}
    window.location.hash = lastSearch; 
if(query.length > 0) { 
    window.location.hash = query 
}

}
var page_index = 1;
function nextPage() {
    var query = document.querySelector("#saavn-search-box").value.trim();
    if (!query) {query = lastSearch;}
    query = encodeURIComponent(query);
    doSaavnSearch(query,0,true)
}
async function doSaavnSearch(query,NotScroll,page) {
    window.location.hash = query;
    document.querySelector("#saavn-search-box").value = decodeURIComponent(query);
    if(!query) {return 0;}
results_container.innerHTML = `<span class="loader">Searching</span>`;
    query=query+"&limit=40";
    if(page) {
        ;page_index=page_index+1;query=query+"&page="+page_index;
    } else {query=query+"&page=1";page_index=1;}
    
// try catch
try {
var response = await fetch(searchUrl + query);
} catch(error) {
results_container.innerHTML = `<span class="error">Error: ${error} <br> Check if API is down </span>`;
}
var json = await response.json();
/* If response code isn't 200, display error*/
if (response.status !== 200) {
    results_container.innerHTML = `<span class="error">Error: ${json.message}</span>`;
    console.log(response)
    return 0;
}
var json = json.data.results;
var results = [];
if(!json) {results_container.innerHTML = "<p> No result found. Try other Library </p>";return;}
lastSearch = decodeURI(window.location.hash.substring(1));
for(let track of json) {


song_name = TextAbstract(track.name,25);
album_name = TextAbstract(track.album.name,20);
if (track.album.name == track.name) {
    album_name = ""
}
var measuredTime = new Date(null);
measuredTime.setSeconds(track.duration); // specify value of SECONDS
var play_time = measuredTime.toISOString().substr(11, 8);
if (play_time.startsWith("00:0")) {
    play_time = play_time.slice(4);
}
if (play_time.startsWith("00:")) {
    play_time = play_time.slice(3);
}
var song_id = track.id;
var year = track.year;
var song_image = track.image[1].link;
var song_artist = TextAbstract(track.primaryArtists,30);
var bitrate = document.getElementById('saavn-bitrate');
var bitrate_i = bitrate.options[bitrate.selectedIndex].value;
if(track.downloadUrl) {
var download_url = track.downloadUrl[bitrate_i]['link'];
var quality = "";
if (bitrate_i == 4) {quality = 320} else {quality = 160;}
    // push object to results array
    results_objects[song_id] = {
        track: track
    };
      results.push(`
      <div class="song-container" style="margin-bottom: 8px; padding: 16px; background-color: #181818; border-radius: 4px; display: flex; align-items: center; transition: background-color 0.3s;">
    <div class="song-image" style="margin-right: 16px; flex-shrink: 0;">
        <img id="${song_id}-i" src="${song_image}" alt="Album cover" style="width: 64px; height: 64px; border-radius: 4px; object-fit: cover;">
    </div>
    <div class="song-info" style="flex-grow: 1; min-width: 0;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
            <p id="${song_id}-n" class="song-name" style="margin: 0; color: #fff; font-size: 16px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${song_name}</p>
            <p class="song-year" style="margin: 0; color: #a7a7a7; font-size: 14px;">${year}</p>
        </div>
        <p id="${song_id}-ar" class="song-artist" style="margin: 0 0 2px; color: #b3b3b3; font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${song_artist}</p>
        <p id="${song_id}-a" class="album-name" style="margin: 0; color: #a7a7a7; font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${album_name}</p>
    </div>
    <div class="song-controls" style="margin-left: 16px;">
        <button class="play-button" onclick='PlayAudio("${download_url}","${song_id}")' style="background-color: #1db954; border: none; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background-color 0.3s;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#000000">
                <path d="M8 5v14l11-7z"/>
            </svg>
        </button>
    </div>
</div>
<style>
.song-container:hover {
    background-color: #282828;
}
.play-button:hover {
    background-color: #1ed760;
}
</style>
`
); }
    }
    
    results_container.innerHTML = results.join(' ');
    if(!NotScroll){
    document.getElementById("saavn-results").scrollIntoView();
    }


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
if(window.location.hash) {
   doSaavnSearch(window.location.hash.substring(1));
} else {doSaavnSearch('english',1);}

addEventListener('hashchange', event => { });
onhashchange = event => {doSaavnSearch(window.location.hash.substring(1))};

// If Bitrate changes, search again
$('#saavn-bitrate').on('change', function () {
    doSaavnSearch(lastSearch);
        /*
    var isDirty = !this.options[this.selectedIndex].defaultSelected;

    if (isDirty) {
        // Value Changed
        doSaavnSearch(lastSearch)
    } else {
        // Do Nothing
    } */
});
document.getElementById("loadmore").addEventListener('click',nextPage)
