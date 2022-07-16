const API_KEY = 'api_key=6353bd08cefbcc8f19eac32ac72777e2';
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_URL = BASE_URL + 'discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + 'search/movie?'+API_KEY;
const main = document.getElementById('main');
const form =  document.getElementById('form');
const search = document.getElementById('search');

getMovies(API_URL);



function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
       console.log(data.results);
        showMovies(data.results);
    })
}



function showMovies(data) {
    main.innerHTML = '';
    data.forEach(movie =>{
        const {title, poster_path , vote_average , overview} = movie;
        const movieEL = document.createElement('div');
        movieEL.classList.add('movie');
        movieEL.innerHTML = `
        <img src="${IMG_URL + poster_path}" alt="${title}"/>
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
              ${overview}
            </div>

            `
            main.appendChild(movieEL);
    })
}
function getColor(average){
    if(average>8){
        return "green"
    }
    else if(average <8 && average> 5) {
        return "yellow"
    }
    else{
        return "red"
    }
}


form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;
    
    if(searchTerm) {
        getMovies(searchURL+'&query='+searchTerm)
    }
    else{
        getMovies(API_URL)
    }

})