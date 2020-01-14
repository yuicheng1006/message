//--------get 頭貼跟人名--------
function showaccount() {

    let accountxhr = new XMLHttpRequest();
    accountxhr.withCredentials = true;

    accountxhr.open("GET", "http://localhost:3000/account");

    accountxhr.send(null);
    accountxhr.onload = function () {
        let headPng = document.querySelector('.headPng');
        let peopleName = document.querySelector('.info h3');
        let chatName = document.querySelector('.chatName');

        let accountData = JSON.parse(accountxhr.responseText);

        headPng.id = accountData.animalId;
        peopleName.innerHTML = accountData.author;
        chatName.innerHTML = accountData.author;


        let finalId = document.querySelector('.headPng').id;
        let amimalImg = finalId;
        changeImg(amimalImg);

        // console.log(finalId);
    }
}
showaccount();

function changeImg(amimalImg) {
    let headPng = document.querySelector('.headPng');

    if (amimalImg == "puppy_1") {
        headPng.src = "img/puppyHead1.png";
    }
    if (amimalImg == "puppy_2") {
        headPng.src = "img/puppyHead2.png";
    }
    if (amimalImg == "puppy_3") {
        headPng.src = "img/puppyHead3.png";
    }
    if (amimalImg == "puppy_4") {
        headPng.src = "img/puppyHead4.png";
    }
    if (amimalImg == "kitten_1") {
        headPng.src = "img/kittenHead1.png";
    }
    if (amimalImg == "kitten_2") {
        headPng.src = "img/kittenHead2.png";

    }
    if (amimalImg == "kitten_3") {
        headPng.src = "img/kittenHead3.png";

    }
    if (amimalImg == "kitten_4") {
        headPng.src = "img/kittenHead4.png";

    }

}

//--------建立 putMessage 格式--------

let editBtn = document.querySelector('.editBtn');
let checkBtn = document.querySelector('.checkBtn');
let oneMessage = document.querySelector('.oneMessage');
let oldMessage = document.querySelector('.newMessage').textContent;
let newMessage = document.querySelector('.newMessage');

editBtn.addEventListener('click', editMessage);
checkBtn.addEventListener('click', checkMessage);



//--------編輯訊息--------

function editMessage() {
    editBtn.style.display = "none";
    checkBtn.style.display = "block";
    oneMessage.style.display = "block";
    oneMessage.placeholder = oldMessage;

}
//--------確認訊息並存到 dbjson--------
function checkMessage() {
    checkBtn.style.display = "none";
    editBtn.style.display = "block";
    oneMessage.style.display = "none";

    let realMessage = document.querySelector('.oneMessage').value;
    let name = document.querySelector('.info h3').textContent;
    let animalId = document.querySelector('.headPng').id;


    let account = {};
    account.author = name;
    account.animalId = animalId;
    account.message = realMessage;


    let xhr = new XMLHttpRequest();
    xhr.open('put', 'http://localhost:3000/account', true);
    xhr.setRequestHeader('Content-type', 'application/json');
    let data = JSON.stringify(account);
    xhr.send(data);

    xhr.onload = function () {
        //console.log(xhr);
        showMessage();

    }
}
// //按enter即可送出任務
function addEnter(e) {
    //先找出enter鍵的數字（使用keycode）
    if (e.keyCode == '13') {

        checkMessage();
    }
}
oneMessage.addEventListener('keydown', addEnter);
//--------顯示訊息--------
function showMessage() {

    let messagexhr = new XMLHttpRequest();
    messagexhr.withCredentials = true;

    messagexhr.open("GET", "http://localhost:3000/account");

    messagexhr.send(null);
    messagexhr.onload = function () {
        let messageData = JSON.parse(messagexhr.responseText);

        newMessage.innerHTML = messageData.message;
    }
}
showMessage();

//--------get 聊天室--------
showChat();

function showChat() {

    let chatxhr = new XMLHttpRequest();
    chatxhr.withCredentials = true;

    chatxhr.open("GET", "http://localhost:3000/comments");

    chatxhr.send(null);
    chatxhr.onload = function () {
        let chatMessage = document.querySelector('.chatMessage');

        let chatData = JSON.parse(chatxhr.responseText);
        let str = "";
        // console.log(chatData);

        for (let i = 0; i < chatData.length; i++) {

            str += `
            <li class="message">
                <div class="chatRole">
                    <img src="${chatData[i].imgUrl}" class="peopleHead" alt="">
                    <span>${chatData[i].author}</span>
                </div>
                <div class="chatBox" id="${chatData[i].id}" >
                    <div class="chatContent">
                        <p id="${chatData[i].id}">${chatData[i].comment}</p>
                    </div>
                    <div class="delText" id="${chatData[i].id}" >刪除</div>
                </div>
            </li>`
        }
        chatMessage.innerHTML = str;
        delChat();
    }

}

//--------- post 聊天內容 ---------
let chatText = document.querySelector('.chatText');

chatText.addEventListener('keydown', chatchat);

function chatchat(e) {
    let headPng = document.querySelector('.headPng').src;
    let peopleName = document.querySelector('.info h3').textContent;


    let headPngUrl = headPng.split("json/").pop();
    // console.log(headPng.split("json/").pop());

    if (e.keyCode == "13") {

        let comments = {};
        comments.author = peopleName;
        comments.imgUrl = headPngUrl;
        comments.comment = chatText.value;
        console.log(peopleName)
        let commentsxhr = new XMLHttpRequest();
        commentsxhr.open('post', 'http://localhost:3000/comments', true);
        commentsxhr.setRequestHeader('Content-type', 'application/json');
        let data = JSON.stringify(comments);
        commentsxhr.send(data);

        commentsxhr.onload = function () {
            //console.log(xhr);
            chatText.value = "";
        }
        setTimeout(showChat, 1000);

    }
}

delChat();

function delChat() {

    let delxhr = new XMLHttpRequest();

    delxhr.open('get', 'http://localhost:3000/comments', true);
    delxhr.send(null);


    delxhr.onload = function () {

        let delData = JSON.parse(delxhr.responseText);
        let chatBox = document.querySelectorAll('.chatBox');

        for (let i = 0; i < chatBox.length; i++) {
            chatBox[i].addEventListener('click', showBtn, true);
        }

        function showBtn(e) {

            // console.log(delText);
            let id = e.target.id;
            // console.log(id);

            for (let i = 0; i < delData.length; i++) {
                let delBtn = document.querySelectorAll('.delText');
                if (id == delBtn[i].id) {
                    delBtn.forEach(function (item) {
                        item.style.display = 'none';
                    });
                    delBtn[i].style.display = 'block';
                };
            };


        }

        //-------------刪除聊天留言-------------

        let delChatBtn = document.querySelectorAll('.delText');
        for (let i = 0; i < delChatBtn.length; i++) {
            delChatBtn[i].addEventListener('click', delComment);
        }


        function delComment(e) {
            let delID = e.target.id;
            console.log(e.target.id);


            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    console.log(this.responseText);
                }
            });

            xhr.open("DELETE", "http://localhost:3000/comments/" + delID);

            xhr.send(null);
            showChat();
        }

    }



}


let ul = document.querySelector('.chatMessage');
console.log(ul);
ul.addEventListener('click', function (e) {
    let delTextBtn = document.querySelectorAll('.delText');
    if (e.target.nodeName == 'UL' || e.target.nodeName == 'LI') {

        for (let i = 0; i < delTextBtn.length; i++) {
            delTextBtn[i].style.display = "none";
            // console.log('aaaaa');
        }
    }
    // console.log(e.target.nodeName);
}, false);