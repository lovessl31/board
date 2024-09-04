// CSS 및 Bootstrap 관련 파일 임포트
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'jquery';
import '@popperjs/core';
import './styles/main.scss'; 
import './styles/reset.css'; 

// 이미지 파일 임포트
import back from './img/back.svg';
import more from './img/more.svg';
import pic from './img/pic.svg';
import close from './img/close.svg';
import exImg2 from './img/eximg2.jpg';
import reply from './img/cmt.svg';


document.addEventListener('DOMContentLoaded', () => {
    // 페이지 초기화
    appendImage('.cmt_img_wrap', exImg2);
    appendImage('.re_btn_wrap', close);
    appendImage('.cmt_pic_wrap', pic);
    appendImage('.back_img', back);
    appendImage('.reply_img_wrap', reply);

    // 더보기 버튼 이미지 추가
    const moreItems = document.querySelectorAll('.more_btn_wrap button');
    moreItems.forEach(button => {
        appendImage(button, more);
    });

    // 텍스트 높이 자동 조절
    autoAdjustTextareaHeight('.cmt_textarea textarea');

    // 더보기 메뉴 처리
    setupMoreButtonMenu();
});

// 이미지 추가 함수
function appendImage(selector, imgSrc) {
    const imgElement = document.createElement('img');
    imgElement.src = imgSrc;
    const targetElement = typeof selector === 'string' ? document.querySelector(selector) : selector;
    targetElement.appendChild(imgElement);
}

// 텍스트 높이 자동 조절 함수
function autoAdjustTextareaHeight(textareaSelector) {
    const textarea = document.querySelector(textareaSelector);
    textarea.addEventListener('input', function () {
        this.style.height = 'auto'; // 높이를 자동으로 설정하여 초기화
        this.style.height = `${this.scrollHeight}px`; // scrollHeight를 기준으로 높이 설정
    });
}

// 더보기 버튼 메뉴 처리 함수
function setupMoreButtonMenu() {
    const moreBtns = document.querySelectorAll('#more_btn');
    const overlay = document.querySelector('.overlay');
    const cmtMenu = document.querySelector('.cmt_menu');

    moreBtns.forEach(button => {
        button.addEventListener('click', () => {
            showOverlayAndMenu(overlay, cmtMenu);
        });
    });

    overlay.addEventListener('click', () => {
        hideOverlayAndMenu(overlay, cmtMenu);
    });
}

// 오버레이 및 메뉴 표시 함수
function showOverlayAndMenu(overlay, menu) {
    overlay.style.display = 'block';  // 오버레이 표시
    menu.style.display = 'block';     // 메뉴 표시
}

// 오버레이 및 메뉴 숨김 함수
function hideOverlayAndMenu(overlay, menu) {
    overlay.style.display = 'none';   // 오버레이 숨김
    menu.style.display = 'none';      // 메뉴 숨김
}