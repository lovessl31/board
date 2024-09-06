// CSS 및 Bootstrap 관련 파일 임포트
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // UMD 파일 사용
import 'jquery';
import '@popperjs/core';
import './styles/main.scss'; 
import './styles/reset.css'; 
import 'summernote/dist/summernote-bs4.css';
import 'summernote/dist/summernote-bs4.js';

import folderImg from './img/folder.svg';


import axios from 'axios';


// 이미지 파일 임포트
import back from './img/back.svg';
import down_arrow from './img/down_arrow.svg';
import boardIcon from './img/boardIcon.svg'; 
import close from './img/close.svg';

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


// DOMContentLoaded 이벤트 리스너
document.addEventListener('DOMContentLoaded', () => {


  // URL에서 board_idx 파라미터 가져오기
  const urlParams = new URLSearchParams(window.location.search);
  const boardIdx = urlParams.get('boardIdx');

  if (boardIdx) {
    // boardIdx를 사용해 게시판에 맞는 데이터를 불러오거나 설정
    console.log('글쓰기 페이지에서의 boardIdx:', boardIdx);

    axios.get(`/write.json`)
    .then(response => {
        const optionData = response.data.data;

        createOptions(optionData);
        createTitle();

        console.log('게시글 옵션 조회', optionData);
    })
    .catch(error => {
        console.error('댓글 데이터 가져오기 에러:', error);
    });
  }

  function createOptions(data) {
    const moduleWrap = document.querySelector('.module-wrap'); // 요소를 삽입할 부모 요소
    moduleWrap.innerHTML = ''; // 기존 내용을 지워줌

    data.forEach(field => {
      const row = document.createElement('div');
      row.classList.add('row', 'module');

      // 라벨 부분
      const labelCol = document.createElement('div');
      labelCol.classList.add('col-4', 'font-weight');
      labelCol.textContent = field.df_name;
      row.appendChild(labelCol);

      // 입력 필드 부분
      const inputCol = document.createElement('div');
      inputCol.classList.add('col-8');

      if (field.df_type === 'dataInput') {
        const input = document.createElement('input');
        input.type = 'text';
        inputCol.appendChild(input);
      } else if (field.df_type === 'dateInput') {
        const input = document.createElement('input');
        input.type = 'date';
        inputCol.appendChild(input);
      } else if (field.df_type === 'dropdown') {
        const select = document.createElement('select');

        // 옵션 추가
        field.extra_data.options.forEach(option => {
          const optionElement = document.createElement('option');
          optionElement.textContent = option;
          select.appendChild(optionElement);
        });

        inputCol.appendChild(select);
      }

      // row에 inputCol 추가
      row.appendChild(inputCol);

      // 완성된 row를 부모 컨테이너에 추가
      moduleWrap.appendChild(row);
    });
  }

  function createTitle() {
    const writeTitle = document.querySelector('#boardTitle');
    const boardName = localStorage.getItem('board_name');

    if(boardName) {
      writeTitle.textContent = boardName;
    }
    
  }

  // 파일첨부
  const fileInput = document.getElementById('fileInput');
  const fileBtn = document.getElementById('fileBtn');
  const deleteAllBtn = document.getElementById('deleteAllBtn');
  const fileList = document.getElementById('fileList');
  const totalVolumeElement = document.querySelector('.total_volume em');
  const totalVolumeText = document.querySelector('.total_volume');

  let filesArray = []; // 첨부된 파일 정보를 저장하는 배열

  // 파일첨부 버튼 클릭 시 파일 선택창 열기
  fileBtn.addEventListener('click', () => {
    fileInput.click();
  });

  // 파일이 선택되면 처리
  fileInput.addEventListener('change', (event) => {
    const newFiles = Array.from(event.target.files); // 새로운 파일 배열
    filesArray = [...filesArray, ...newFiles]; // 기존 파일과 합침

    renderFileList(); // 파일 목록 갱신
    updateTotalVolume(); // 총 용량 및 파일 수 갱신
  });

  // 파일 목록 렌더링
  function renderFileList() {
    fileList.innerHTML = ''; // 기존 목록 초기화

    filesArray.forEach((file, index) => {
      const fileRow = document.createElement('tr');

      fileRow.innerHTML = `
      <td class="col-1"></td>
      <td class="file-cell"><span class="file-icon-wrap"><img src="${folderImg}" alt="folder icon" class="file-icon"></span>${file.name}</td>
      <td class="text-right">${(file.size / 1024).toFixed(2)}KB</td>
      <td></td>
    `;

         // 삭제 버튼 (이미지) 추가
         const deleteBtn = document.createElement('button');
         const deleteImg = document.createElement('img');
         deleteImg.src = close; // close.svg 이미지 경로
         deleteImg.alt = 'delete icon';
         deleteBtn.appendChild(deleteImg);
         deleteBtn.classList.add('remove-btn'); // 버튼 클래스 추가
         deleteBtn.setAttribute('data-index', index);
   
         fileRow.children[0].appendChild(deleteBtn); // 첫 번째 <td>에 버튼 추가

      fileList.appendChild(fileRow);
    });

    // 각 파일의 삭제 버튼 이벤트 추가
    document.querySelectorAll('.remove-btn').forEach(button => {
      button.addEventListener('click', (event) => {
        const index = event.target.getAttribute('data-index');
        removeFile(index);
      });
    });
  }

  // 파일 삭제
  function removeFile(index) {
    filesArray.splice(index, 1); // 배열에서 파일 제거
    renderFileList(); // 목록 갱신
    updateTotalVolume(); // 총 용량 및 파일 수 갱신
  }

  // 전체 삭제 버튼
  deleteAllBtn.addEventListener('click', () => {
    filesArray = []; // 배열 비우기
    renderFileList(); // 목록 갱신
    updateTotalVolume(); // 총 용량 및 파일 수 갱신
  });

  // 총 파일 개수 및 용량 갱신
  function updateTotalVolume() {
    const totalSize = filesArray.reduce((sum, file) => sum + file.size, 0);
    const totalCount = filesArray.length;

    totalVolumeElement.textContent = totalCount; // 파일 개수 표시
    totalVolumeText.innerHTML = `첨부파일 <em>${totalCount}</em>개 (${(totalSize / 1024).toFixed(2)}KB)`; // 파일 개수와 용량 표시

    // 전체 삭제 버튼 보이기/숨기기 처리
    deleteAllBtn.style.display = totalCount > 0 ? 'inline-block' : 'none';
  }

  // 총 파일 개수 및 용량 갱신
  function updateTotalVolume() {
    const totalSize = filesArray.reduce((sum, file) => sum + file.size, 0);
    const totalCount = filesArray.length;

    totalVolumeElement.textContent = totalCount; // 파일 개수 표시
    totalVolumeText.innerHTML = `첨부파일 <em>${totalCount}</em>개 (${(totalSize / 1024).toFixed(2)}KB)`; // 파일 개수와 용량 표시

    // 전체 삭제 버튼 보이기/숨기기 처리
    deleteAllBtn.style.display = totalCount > 0 ? 'inline-block' : 'none';
  }


   
    const appendImage = (selector, src) => {
      const targetElements = document.querySelectorAll(selector);
      targetElements.forEach(targetElement => {
          if (targetElement) {
              const imgElement = document.createElement('img');
              imgElement.src = src;
              targetElement.appendChild(imgElement);
          } else {
              console.error(`Element not found for selector: ${selector}`);
          }
      });
  };

   // 뒤로가기 이미지 추가
   appendImage('.back_img', back);


   // 뒤로가기 버튼 설정
    const backBtn = document.getElementById('back_Btn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            history.back(); // 또는 history.go(-1);
        });
    }

    // 각 게시판 리스트 아이템에 아이콘 추가
    const spans = document.querySelectorAll('.b_select_item span');
    spans.forEach(span => {
        appendImage(span, boardIcon, 'board list icon');
    });




});