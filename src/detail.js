// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// Bootstrap JS
import 'bootstrap';
import 'jquery';
import '@popperjs/core';

import './styles/main.scss'; 
import './styles/reset.css'; 

// 상세페이지 뒤로가기 이미지 추가 

import back from './img/back.svg';
import userImg from './img/userImg.svg';
import arrow_down from './img/arrow_down.svg';
import arrow_up from './img/arrow_up.svg';
import folder from './img/folder.svg';
import downImg from './img/down.svg';
import left_arrow from './img/left_arrow.svg';
import more from './img/more.svg';
import pic from './img/pic.svg';



document.addEventListener('DOMContentLoaded', () => {
    const cmt_pic = document.createElement('img');
    cmt_pic.src = pic;
  
    document.querySelector('.cmt_pic_wrap').appendChild(cmt_pic);
});


const moreItems = document.querySelectorAll('.more_btn_wrap button');

moreItems.forEach(button => {
    const moreBtnImg = document.createElement('img');
    moreBtnImg.src = more;
    button.appendChild(moreBtnImg);
})

document.addEventListener('DOMContentLoaded', () => {
    const left_arrow_img = document.createElement('img');
    left_arrow_img.src = left_arrow;
  
    document.querySelector('.all_cmt button span').appendChild(left_arrow_img);
});


const fileItems = document.querySelectorAll('.file_list li div');

fileItems.forEach(item => {
    const folderImg = document.createElement('img');
    folderImg.src = folder;
    folderImg.alt = 'Folder Icon';
    folderImg.style.marginRight = '8px';
    item.prepend(folderImg);
});

const downloadBtns = document.querySelectorAll('.file_list button');

downloadBtns.forEach(button => {
    const downloadImg = document.createElement('img');
    downloadImg.src = downImg;
    downloadImg.alt = 'Downloads Icon';
    button.appendChild(downloadImg);
});


document.addEventListener('DOMContentLoaded', () => {
    const attachToggleButton = document.getElementById('attach_toggle');
    const fileListWrap = document.querySelector('.file_list_wrap');

    // 기본적으로 down 아이콘을 추가
    const imgElement = document.createElement('img');
    imgElement.src = arrow_down; // 기본적으로 down 이미지를 설정
    imgElement.alt = 'Toggle Attachments';
    attachToggleButton.appendChild(imgElement);

    // 리스트 숨기기
    fileListWrap.style.display = 'none';

    // 클릭 시 리스트 보여주기/숨기기와 아이콘 전환
    attachToggleButton.addEventListener('click', function() {
        if (fileListWrap.style.display === 'none' || fileListWrap.style.display === '') {
            fileListWrap.style.display = 'block';
            imgElement.src = arrow_up; // 리스트가 보일 때 위로 화살표 이미지
        } else {
            fileListWrap.style.display = 'none';
            imgElement.src = arrow_down; // 리스트가 숨겨질 때 아래로 화살표 이미지
        }
    });

});

const user_img = document.createElement('img');
user_img.src=userImg;

document.querySelector('.user_img_wrap').appendChild(user_img);

document.addEventListener('DOMContentLoaded', () => {
    const back_img = document.createElement('img');
    back_img.src = back;
  
    document.querySelector('.back_img').appendChild(back_img);
});


document.addEventListener('DOMContentLoaded', () => {
    const backBtn = document.getElementById('back_Btn');

    backBtn.addEventListener('click', () => {
        window.location.href = 'index.html'; // index.html로 이동
    });
});


import reply from './img/cmt.svg';

document.addEventListener('DOMContentLoaded', () => {
    const reply_img = document.createElement('img');
    reply_img.src = reply;
  
    document.querySelector('.reply_img_wrap').appendChild(reply_img);
});



// 텍스트 높이 동적으로

document.addEventListener('DOMContentLoaded', function () {
    const textarea = document.querySelector('.cmt_textarea textarea');

    textarea.addEventListener('input', function () {
        this.style.height = 'auto'; // 높이를 자동으로 설정하여 초기화
        this.style.height = (this.scrollHeight) + 'px'; // scrollHeight를 기준으로 높이 설정
    });
});


document.getElementById('all_cmt_btn').addEventListener('click', function() {
    window.location.href = 'cmt.html';
})


 // 뒤로가기 버튼 클릭 시 이전 페이지로 이동
 document.getElementById('backButton').addEventListener('click', function() {
    history.back(); // 또는 history.go(-1);
});