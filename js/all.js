let kitten = document.querySelector('.kitten');
let puppy = document.querySelector('.puppy');

let puppyPngChange = document.querySelectorAll('.puppyPng');
let kittenPngChange = document.querySelectorAll('.kittenPng');

let puppyAccount = document.querySelector('.puppyAccount');


//---------點擊貓按鈕，右邊圖形更換成貓咪--------
function kittenChange() {
    puppyAccount.src = "img/kitten1.png";
    console.log(kittenPngChange);
    for (let i = 0; i < puppyPngChange.length; i++) {
        puppyPngChange[i].style.display = "none";
        kittenPngChange[i].style.display = "block";
    }


}
kitten.addEventListener('click', kittenChange);
//---------點擊狗按鈕，右邊圖形更換成小狗--------
function puppyChange() {
    puppyAccount.src = "img/puppy1.png";
    console.log(puppyPngChange);
    for (let i = 0; i < puppyPngChange.length; i++) {
        kittenPngChange[i].style.display = "none";
        puppyPngChange[i].style.display = "block";
    }

}
puppy.addEventListener('click', puppyChange);

//---------點擊右邊按鈕，換中間的身份--------
let imgRole = document.querySelectorAll('.imgRole');

function accountImgChange(e) {
    let animal = e.target.src;
    let animalId = e.target.id;
    puppyAccount.src = animal;
    puppyAccount.id = animalId;

}
for (i = 0; i < imgRole.length; i++) {
    imgRole[i].addEventListener('click', accountImgChange);

}

//--------建立 post 格式--------

function signUp(e) {
    let name = document.querySelector('.name').value;
    let animalId = puppyAccount.id;

    let account = {};
    account.author = name;
    account.animalId = animalId;
    console.log(account);

    let xhr = new XMLHttpRequest();
    xhr.open('post', 'http://localhost:3000/posts/', true);
    xhr.setRequestHeader('Content-type', 'application/json');
    let data = JSON.stringify(account);
    xhr.send(data);

    xhr.onload = function () {
        console.log(xhr);
    }
}
let logInBtn = document.querySelector('.logInBtn');
logInBtn.addEventListener('click', signUp);