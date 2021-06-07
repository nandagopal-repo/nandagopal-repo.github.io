const input = document.querySelector('#input');
const searchBtn = document.querySelector('#btn');
const loading = document.querySelector('#loading');
const errorText = document.querySelector('#error');
const showContainer = document.querySelector('#wholeContainer');


searchBtn.addEventListener('click',()=>{
    if(input.value === '' || input.value === null) return;
    const inputValue = input.value;
    const url = `http://api.tvmaze.com/singlesearch/shows?q=${inputValue}`;
    showSong(url,inputValue);
    input.value = '';
})


async function showSong(url,inputValue){
    // loading screen:
    loading.style.display = "block";
    loading.style.animation = "1s rotation linear infinite";

    // fetch request:
    await fetch(url)
    .then(response => response.json())
    .then(response => {
        console.log(response);
        addSearchedComponent(response);
    })
    .catch(error => {
        showContainer.innerHTML = "";
        showContainer.style.visibility = 'hidden';
        errorText.style.display = "block";
        errorText.innerText = `${inputValue} not found!`;
        console.log(error);
    });

    // close loading screen:
    loading.style.display = "none";
    loading.style.animation = "1s rotation linear";
}

function addSearchedComponent(show){
    // to show the container:
    showContainer.style.visibility = 'visible';
    showContainer.innerHTML = "";

    // to hide previous error message:
    errorText.style.display = "none";

    // heading:
    const showHeading = document.createElement('h2');
    showHeading.classList.add('show-heading');
    showHeading.innerText = show.name;

    // image:
    const showImg = document.createElement('img');
    showImg.classList.add('show-img');
    showImg.src = show.image.medium;

    // summary:
    const showSummary = document.createElement('p');
    showSummary.classList.add('show-summary');
    showSummary.innerHTML = show.summary;

    // another small container:
    const showInfoContainer = document.createElement('div');
    showInfoContainer.classList.add('show-info-container');

    const showInfoHeading = document.createElement('h2');
    showInfoHeading.classList.add('show-info-heading');
    showInfoHeading.innerText = `show information`;

    const premiered = document.createElement('h4');
    premiered.classList.add('show-info-values');
    premiered.innerHTML = `<span class="show-info-tags">premiered:</span> ${show.premiered}`;

    const status = document.createElement('h4');
    status.classList.add('show-info-values');
    status.innerHTML = `<span class="show-info-tags">status:</span> ${show.status}`;

    const language = document.createElement('h4');
    language.classList.add('show-info-values');
    language.innerHTML = `<span class="show-info-tags">language:</span> ${show.language}`;

    const showType = document.createElement('h4');
    showType.classList.add('show-info-values');
    showType.innerHTML = `<span class="show-info-tags">showType:</span> ${show.type}`;

    const showGenres = document.createElement('h4');
    showGenres.classList.add('show-info-values');
    showGenres.innerHTML = `<span class="show-info-tags">genres:</span> ${show.genres}`;

    const rating = document.createElement('h4');
    rating.classList.add('show-info-values');
    rating.innerHTML = `<span class="show-info-tags">average rating:</span> ${show.rating.average}`;

    const site = document.createElement('h4');
    site.classList.add('show-info-values');
    site.innerHTML = `<span class="show-info-tags">site:</span> <a class="site-link" href="${show.officialSite}">${show.officialSite}</a>`;

    // append to html container:
    showContainer.appendChild(showHeading);
    showContainer.appendChild(showImg);
    showContainer.appendChild(showSummary);
    
    // append new container to its child: 
    showInfoContainer.appendChild(showInfoHeading);
    showInfoContainer.appendChild(premiered);
    showInfoContainer.appendChild(status);
    showInfoContainer.appendChild(language);
    showInfoContainer.appendChild(showType);
    showInfoContainer.appendChild(showGenres);
    showInfoContainer.appendChild(rating);
    showInfoContainer.appendChild(site);
    
    // append new container to html container:
    showContainer.appendChild(showInfoContainer);


    // edge cases:
    if(show === null || show === ''){
        showContainer.style.display = 'none';
    }
    if(show.summmary === null || show.summary === ''){
        showSummary.innerText = "summary not found";
    }
    if(show.rating.average === null || show.rating.average === ''){
        showInfoContainer.removeChild(rating);
    }
    if(show.genres === undefined || show.genres.length === 0){
        showInfoContainer.removeChild(showGenres);
    }
    if(show.image === null || show.image === ''){
        showContainer.removeChild(showImg);
    }
    if(show.officialSite === null || show.officialSite === 'null'){
        showInfoContainer.removeChild(site);
    }
}

