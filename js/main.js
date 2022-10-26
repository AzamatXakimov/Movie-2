const elMovieList = document.querySelector(".list");
const elMovieTemp = document.querySelector(".js-movie-template").content;
const elMovieFragment = new DocumentFragment();

const arr = movies.slice(0, 10);
// MODAL
const elModal = document.querySelector(".modal");
const modalTitle = elModal.querySelector(".modal-title");
const modalIframe = elModal.querySelector(".modal-iframe");
const modalRating = elModal.querySelector(".modal-rating");
const modalYear = elModal.querySelector(".modal-year");
const modalRuntime = elModal.querySelector(".modal-runtime");
const modalCategories = elModal.querySelector(".modal-categories");
const modalSummary = elModal.querySelector(".modal-summary");
const modalLink = elModal.querySelector(".modal-imdb-link");

// Form
const elForm = document.querySelector(".js-hero-form");
const elSearch = document.querySelector(".js-hero-search")


function getDuration (time){

  const hours = Math.floor(time / 60 );
  const minuts = Math.floor(time % 60 );
  return `${hours} hrs ${minuts} min  `

}

function renderMovies(kino){
  elMovieList.innerHTML = null;
  kino.forEach(item => {
    const elCloneMovie = elMovieTemp.cloneNode(true);

    elCloneMovie.querySelector(".movie-img").src = `https://i3.ytimg.com/vi/${item.ytid}/mqdefault.jpg `;
    elCloneMovie.querySelector(".movie-title").textContent = item.Title;
    elCloneMovie.querySelector(".movie-rating").textContent = item.imdb_rating;
    elCloneMovie.querySelector(".movie-year").textContent = item.movie_year;
    elCloneMovie.querySelector(".movie-runtime").textContent =  getDuration(item.runtime);
    elCloneMovie.querySelector(".movie-categories").textContent = item.Categories.split("|").join(", ");
    elCloneMovie.querySelector(".movie-btn").dataset.id = item.imdb_id;
    elMovieFragment.appendChild(elCloneMovie);

  });

  elMovieList.appendChild(elMovieFragment)

}

function renderModalInfo(topilganKino){
  modalTitle.textContent = topilganKino.Title;
  modalIframe.src = `https://www.youtube-nocookie.com/embed/${topilganKino.ytid}`;
  modalRating.textContent = topilganKino.imdb_rating;
  modalYear.textContent = topilganKino.movie_year;
  modalRuntime.textContent = getDuration(topilganKino.runtime);
  modalCategories.textContent = topilganKino.Categories.split("|").join(", ");
  modalSummary.textContent = topilganKino.summary;
  modalLink.href = `https://www.imdb.com/title/${topilganKino.imdb_id}`;
}


elMovieList.addEventListener("click",(evt)=>{
  const targetElement = evt.target
  if(targetElement.matches(".movie-btn")){
    const btnId = targetElement.dataset.id
    const foundMovie = movies.find(movie => movie.imdb_id === btnId);
    renderModalInfo(foundMovie);
  }
});

elModal.addEventListener("hide.bs.modal", function(){
  modalIframe.src = "";
})


elForm.addEventListener("submit", function(evt){
  evt.preventDefault();
  const elSearchValue = elSearch.value.trim().toUpperCase();
  if(elSearchValue != ""){
    elMovieList.innerHTML = null;
    // search = null
    for (let i = 0; i < arr.length; i++) {
      const text = ""+arr[i].Title;
      if(text.toUpperCase().indexOf(elSearchValue) > -1){
        const elCloneMovie = elMovieTemp.cloneNode(true);
  
        elCloneMovie.querySelector(".movie-img").src = `https://i3.ytimg.com/vi/${arr[i].ytid}/mqdefault.jpg `;
        elCloneMovie.querySelector(".movie-title").textContent = arr[i].Title;
        elCloneMovie.querySelector(".movie-rating").textContent = arr[i].imdb_rating;
        elCloneMovie.querySelector(".movie-year").textContent = arr[i].movie_year;
        elCloneMovie.querySelector(".movie-runtime").textContent =  getDuration(arr[i].runtime);
        elCloneMovie.querySelector(".movie-categories").textContent = arr[i].Categories.split("|").join(", ");
        elCloneMovie.querySelector(".movie-btn").dataset.id = arr[i].imdb_id;
        elMovieFragment.appendChild(elCloneMovie);
      }
    }
    
    elMovieList.appendChild(elMovieFragment)
  }
  else{
    renderMovies(arr)
  }
})

renderMovies(arr)