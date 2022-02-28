const passSign = document.querySelector('#password'),
      accSign = document.querySelector('#accountSignUp'),
      rePass = document.querySelector('#re-password'),
      accLog = document.querySelector('#accLog'),
      passLog = document.querySelector('#passwordLog'),
      indicator = document.querySelector('.indicator'),
      iconText = document.querySelectorAll('.icon-text'),
      text = document.querySelectorAll('.text');
      showHide = document.querySelectorAll('.show_hide');


showHide[0].addEventListener('click', () => {
    if(passSign.type === "password") {
        passSign.type = "text";
        showHide[0].classList.replace("fa-eye-slash", "fa-eye");
    } else {
        passSign.type = "password";
        showHide[0].classList.replace("fa-eye", "fa-eye-slash");
    }
})

showHide[1].addEventListener('click', () => {
    if(rePass.type === "password") {
        rePass.type = "text";
        showHide[1].classList.replace("fa-eye-slash", "fa-eye");
    } else {
        rePass.type = "password";
        showHide[1].classList.replace("fa-eye", "fa-eye-slash");
    }
})

showHide[2].addEventListener('click', () => {
    if(passLog.type === "password") {
        passLog.type = "text";
        showHide[2].classList.replace("fa-eye-slash", "fa-eye");
    } else {
        passLog.type = "password";
        showHide[2].classList.replace("fa-eye", "fa-eye-slash");
    }
})

// 
let alphabet = /[a-zA-Z]/, //letter a to z and A to Z
    numbers = /[0-9]/,
    scharacters = /[!,@,#,$,%,^,&,*,?,_,(,),-,+,=,~]/;

passSign.addEventListener('keyup', () => {
    indicator.classList.add('active-form');

    let val = passSign.value;
    if(val.match(alphabet) || val.match(numbers) || val.match(scharacters)) {
        text[0].textContent = "Password is weak";
        passSign.style.borderColor = "#FF6333";
        showHide[0].style.color = "#FF6333";
        iconText[0].style.color = "#FF6333";
    }

    if(val.match(alphabet) && val.match(numbers) && val.length >= 6) {
        text[0].textContent = "Password is medium";
        passSign.style.borderColor = "#ffd24e";
        showHide[0].style.color = "#ffd24e";
        iconText[0].style.color = "#ffd24e";
    }

    if(val.match(alphabet) && val.match(numbers) && val.length >= 8 && val.match(scharacters)) {
        text[0].textContent = "Password is strong";
        passSign.style.borderColor = "#22c32a";
        showHide[0].style.color = "#22c32a";
        iconText[0].style.color = "#22c32a";
    }

    if(val == "") {
        indicator.classList.remove('active-form');
        passSign.style.borderColor = "#a6a6a6";
        showHide[0].style.color = "#a6a6a6";
        iconText[0].style.color = "#a6a6a6";
    }

  
})

rePass.addEventListener('keyup', () => {
    let val = rePass.value;

    if(val.length === passSign.value.length && val.length > 6) {
        rePass.style.borderColor = "#22c32a";
        showHide[1].style.color = "#22c32a";
    } else if (val.length < 6) {
        rePass.style.borderColor = "#FF6333";
        showHide[1].style.color = "#FF6333";
    }else {
        rePass.style.borderColor = "#FF6333";
        showHide[1].style.color = "#FF6333";
    }

    if(val == "") {
        passSign.style.borderColor = "#a6a6a6";
        showHide[1].style.color = "#a6a6a6";
    }
})

accSign.addEventListener('keyup', () => {
    let val = accSign.value;
    
    if(val.length > 8) {
        accSign.style.borderColor = "#22c32a";
    } else {
        accSign.style.borderColor = "#FF6333";
    }

    if(val == "") {
        indicator.classList.remove('active-form');
        passSign.style.borderColor = "#a6a6a6";
    }
})

// log
accLog.addEventListener('keyup', () => {
    let val = accLog.value;
    
    if(val.length > 6) {
        accLog.style.borderColor = "#22c32a";
    } else {
        accLog.style.borderColor = "#FF6333";
    }

    if(val == "") {
        indicator.classList.remove('active-form');
        accLog.style.borderColor = "#a6a6a6";
    }
})

passLog.addEventListener('keyup', () => {
    let val = passLog.value;
    
    if(val.length > 6) {
        passLog.style.borderColor = "#22c32a";
        showHide[2].style.color = "#22c32a";
    } else {
        passLog.style.borderColor = "#FF6333";
        showHide[2].style.color = "#FF6333";
    }

    if(val == "") {
        indicator.classList.remove('active-form');
        passLog.style.borderColor = "#a6a6a6";
    }
})

// Name and Password from the register-form
var name = document.getElementById('accountSignUp');
var pw = document.getElementById('password');

// storing input from register-form
function store() {
    localStorage.setItem('accountSignUp', name.value);
    localStorage.setItem('password', pw.value);
}

// check if stored data from register-form is equal to entered data in the login-form
function check() {

    // stored data from the register-form
    var storedName = localStorage.getItem('accountSignUp');
    var storedPw = localStorage.getItem('password');

    // entered data from the login-form
    var userName = document.getElementById('passwordLog');
    var userPw = document.getElementById('accLog');

    // check if stored data from register-form is equal to data from login form
    if(userName.value == storedName || userPw.value == storedPw) {
        alert('You are loged in.');
    }else {
        alert('ERROR');
    }
}