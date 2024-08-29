// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// Bootstrap JS
import 'bootstrap';
import 'jquery';
import '@popperjs/core';

import './styles/main.scss'; 
import './styles/reset.css'; 

import back from './img/back.svg';


document.addEventListener('DOMContentLoaded', () => {
    const back_img = document.createElement('img');
    back_img.src = back;
  
    document.querySelector('.back_img').appendChild(back_img);
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

