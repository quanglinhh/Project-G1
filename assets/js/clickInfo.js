const singer = document.querySelector('.singer')
console.log(singer.href)

singer.onclick = function(){
    console.log(singer.textContent)
}