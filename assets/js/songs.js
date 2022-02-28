const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const songsApi = "https://music-world-g1.herokuapp.com/songs"
const singerAPI = "https://music-world-g1.herokuapp.com/singers"

const songName = $('.songName')
const singerName = $$('.singerName')
const singerImg = $('.container__comment-details-image')
const songImg = $('.image__song__image')
const notifyUpdate = $$('.notifyUpdate')
const notifyLogin = $$('.notifyLogin')
function start(){
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

//lay id cua link href
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


//lay ra thong tin bai hat
function getSongs(callback){
    fetch (songsApi)
    .then (function(response){
        return response.json();
    })
    .then(callback)
}
function renderSongs(songs){
    songs.forEach(function(song){
        if(Number(song.id)===Number(idUrl)){
             songName.textContent = song.name
             songImg.src = song.image
             songName.id = song.singerId
        }
    })
    getSinger(renderSinger)
}
//lay ra thong tin ca sy
function getSinger(callback) {
    fetch(singerAPI)
        .then(function (response) {
            return response.json();
        })
        .then(callback)
}
   
function renderSinger(singers){
    console.log(songName.id)
    singerName.forEach(function(sName,index){
    singers.map((singer)=>{
        if(Number(songName.id)===Number(singer.id)){
            sName.textContent = singer.singerName
            singerImg.src = singer.singerImg
        }

    })
})
   





}
