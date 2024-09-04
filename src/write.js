// CSS 및 Bootstrap 관련 파일 임포트
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // UMD 파일 사용
import 'jquery';
import '@popperjs/core';
import './styles/main.scss'; 
import './styles/reset.css'; 
import 'summernote/dist/summernote-bs4.css';
import 'summernote/dist/summernote-bs4.js';

// 이미지 파일 임포트
import back from './img/back.svg';
import down_arrow from './img/down_arrow.svg';
import boardIcon from './img/boardIcon.svg'; 


$(document).ready(function() {
    $('.editor_wrap').summernote({
        height: 300, // 에디터 높이 설정
        minHeight: null, // 최소 높이 설정
        maxHeight: null, // 최대 높이 설정
        focus: true, // 페이지 로드 시 에디터에 포커스를 줌
        toolbar: [
            // [groupName, [list of button]]
            ['style', ['style']],
            ['font', ['bold', 'italic', 'underline', 'clear']],
            ['fontname', ['fontname']],
            ['fontsize', ['fontsize']],  // 폰트 크기 옵션 추가
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']],
            ['table', ['table']],
            ['insert', ['link', 'picture', 'video']],
            ['view', ['fullscreen', 'codeview', 'help']]
        ],
        fontsize: ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '28', '30', '36', '40', '48'], // 선택 가능한 폰트 크기
    });
});

// 이미지 추가 함수
function appendImage(selector, imgSrc, altText = '') {
    const imgElement = document.createElement('img');
    imgElement.src = imgSrc;
    if (altText) {
        imgElement.alt = altText;
    }
    document.querySelector(selector).appendChild(imgElement);
}

// DOMContentLoaded 이벤트 리스너
document.addEventListener('DOMContentLoaded', () => {
    // 버튼에 다운 화살표 이미지 추가
    appendImage('.bs_btn_wrap', down_arrow);

    // 뒤로가기 이미지 추가
    appendImage('.back_img', back);

    // 각 게시판 리스트 아이템에 아이콘 추가
    const spans = document.querySelectorAll('.b_select_item span');
    spans.forEach(span => {
        appendImage(span, boardIcon, 'board list icon');
    });
});