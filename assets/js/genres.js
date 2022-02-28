const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const notifyUpdate = $$('.notifyUpdate')
const notifyLogin = $$('.notifyLogin')

function start(){
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