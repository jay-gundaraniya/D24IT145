function toggleMenu() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('active'); // Toggles the 'active' class
}

const url = "https://newsdata.io/api/1/news?apikey=pub_5982341dac7c7b83c368435175d5694293fad&q=";

window.addEventListener('load',() => fetchNews("online"));

function reload(){
    window.location.reload();
}

async function fetchNews (quary){
    const res = await fetch(`${url}${quary}`);
    const data = await res.json();
    bindData(data.results);
}

function bindData(articles){
    const cardsContainer = document.getElementById('cards-container');
    const nwesCardTemplate = document.getElementById('template-news-card');
    cardsContainer.innerHTML = '';

    if (!articles || !Array.isArray(articles)) return; 

    articles.forEach(articles => {
        if(!articles.image_url) return;
        const cardClone = nwesCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, articles);
        cardsContainer.appendChild(cardClone);
    });
}
function fillDataInCard(cardClone, articles){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');
    
    newsImg.src = articles.image_url;
    newsTitle.innerHTML = articles.title;   

    const descriptionWords = articles.description.split(' ');
    const slicedDescription = descriptionWords.slice(0, 50).join(' ') + (descriptionWords.length > 50 ? '...' : '');
    newsDesc.innerHTML = slicedDescription;

    const date = new Date(articles.pubDate).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${articles.source_id} : ${date}`;

    cardClone.firstElementChild.addEventListener("click",() => {
        window.open(articles.link, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click', () => {
    const quary = searchText.value;
    if(!quary) return;
    fetchNews(quary);
    curSelectedNav?.classList.remove('active')
    curSelectedNav = null;
})