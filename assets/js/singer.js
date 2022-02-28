const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const songsApi = "https://music-world-g1.herokuapp.com/songs"
const singerApi ="https://music-world-g1.herokuapp.com/singers"
const notifyUpdate = $$('.notifyUpdate')
const notifyLogin = $$('.notifyLogin')

function start(){
    getInfoSinger(renderSinger)
    getSongs(renderSongs)
    handleEvent()
}
start()
function handleEvent(){
    //tinh năng chua update
    notifyUpdate.forEach(function(notifyUpdate){
        notifyUpdate.onclick = function(){
            alert('Tính năng chưa được hoàn thành')
        }
    }) 
     //Thong bao dang nhap
     notifyLogin.forEach(function(notify){
        notify.onclick = function(){
            alert('Bạn phải  đăng nhập để sử dụng tính năng này')
        }
    }) 
}
function getInfoSinger(callback){
    fetch (singerApi)
        .then (function(response){
            return response.json();
        })
        .then(callback)
}
function getSongs(callback){
    fetch (songsApi)
    .then (function(response){
        return response.json();
    })
    .then(callback)
}
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
const url = location.href
var idUrl = getParameterByName('id', url);

console.log(idUrl)
function renderSinger(singers){
    var singerInfo = $('.singer-info')
    var htmls = singers.map(function(singer){
        if(Number(singer.id) === Number( idUrl)){
            return `
            <div class="container profile-background" style="background-image: url(${singer.backgroundImg}); background-size:cover; background-repeat: no-repeat">
            <div class="profile">
                <div class="profile-img">
                    <img src= "${singer.singerImg}" alt="${singer.singerName}">
                </div>
                <div class="profile-info">
                    <h2 class="profile-tick">
                        ${singer.singerName}
                        <i class="fa-solid fa-circle-check"></i>
                    </h2>
                    <p class="profile-text">${singer.singerName}</p>
                    <p class="profile-text">${singer.country}</p>
                    <p class="profile-pro">
                        <i class="fa-solid fa-star color-icon-profile"></i>
                        <span class="pro-text">PRO UNLIMITED</span>
                    </p>
                </div>
            </div>
        </div>
            `
        }
      
    })
    singerInfo.innerHTML = htmls.join(' ');
}


function renderSongs(songs){
    var musics = $('.song-container')
    var htmls = songs.map((song,index)=>{
         if(Number (song.singerId) === Number( idUrl)){
            return`
            <div class="list mt-40">
            <div class="list-info">
                <img src="${song.image}">
            </div>
            <div class="list-sound">
                <div class="title-sound">
                    <div class="title-sound-btn">
                        <button class="btn-play">
                            <i class="fa-solid fa-play"></i>
                        </button>
                    </div>
                    <div class="title-sound-text">
                        <p class="text-visible">${song.singer}</p>
                        <span>${song.name}</span>
                    </div>
                    <div class="title-sound-rank">
                        <p class="text-month text-visible">1 month ago</p>
                        <a class="text-rank"># ${song.Genres}</a>
                    </div>
                </div>

                <div class="layer-waveform">
                    <img src="./assets/img/sound-den-removebg-preview.png" alt="sound">
                </div>

                <div class="comment">
                    <div class="comment-form">
                        <div class="comment-form-avt">
                            <img src="./assets/img/den2.jpg" alt="">
                        </div>
                        <div class="comment-form-input">
                            <input type="text" placeholder="Write a comment">
                        </div>
                    </div>
                </div>
                <div class="react-sound">
                    <div class="sound-actions">
                        <ul class="actions">
                            <li class="action-icon icon-hover">
                                <i class="fa-solid fa-heart"></i>
                                20.4k
                            </li>
                            <li class="action-icon icon-hover">
                                <i class="fa-solid fa-retweet"></i>
                                762
                            </li>
                            <li class="action-icon icon-hover">
                                <i class="fa-solid fa-share-from-square"></i>
                                Share
                            </li>
                            <li class="action-icon icon-hover">
                                <i class="fa-solid fa-link"></i>
                                Copy link
                            </li>
                            <li class="action-icon icon-hover">
                                <i class="fa-solid fa-ellipsis"></i>
                                More
                            </li>
                            <li class="action-icon action-icon-link">
                                <a href="#">Dowload/Stream</a>
                            </li>
                        </ul>
                        <ul class="actions">
                            <li class="action-icon action-icon-info">
                                <i class="fa-solid fa-play"></i>
                                1.45M
                            </li>
                            <li class="action-icon action-icon-info">
                                <i class="fa-solid fa-message"></i>
                                475
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
            `
        }
    })
    musics.innerHTML = htmls.join(' ')

}


