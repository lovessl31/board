// CSS 및 Bootstrap 관련 파일 임포트
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'jquery';
import '@popperjs/core';
import './styles/main.scss'; 
import './styles/reset.css'; 
// import { renderComments, renderReplyComments } from './cmt.js';

// 이미지 파일 임포트
import back from './img/back.svg';
import arrow_down from './img/arrow_down.svg';
import arrow_up from './img/arrow_up.svg';
import folder from './img/folder.svg';
import downImg from './img/down.svg';
import left_arrow from './img/left_arrow.svg';
import pic from './img/pic.svg';
import close from './img/close.svg';
import exImg2 from './img/eximg2.jpg';

document.addEventListener('DOMContentLoaded', () => {
    const accessToken = localStorage.getItem('accessToken'); // 로컬 스토리지에서 accessToken 가져오기

    // URL에서 postId 파라미터 추출
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('post_idx');

    console.log('postId가 무엇이니', postId);

    if(postId) {
        // 요청 설정 (헤더에 토큰 추가)
        const axiosConfig = {
            headers: {
                Authorization: `Bearer ${accessToken}` // Authorization 헤더에 Bearer 토큰 추가
            }
        };

        // 게시글 데이터 가져오기
        axios.get(`http://192.168.0.18:28888/with/postDetail/${postId}`, axiosConfig)
            .then(response => {
                const postsData = response.data.data;
                console.log('받은 데이터', postsData);
        
                
                if (postsData && postsData.post_idx === parseInt(postId)) {
                    createDetail(postsData); // postsData가 단일 객체일 경우 바로 사용
                } else {
                    console.error('해당 postId에 해당하는 게시글을 찾을 수 없습니다.');
                }
            })
            .catch(error => {
                console.error('게시글 가져오기 에러:', error);
            });

        // 댓글 데이터 가져오기 (renderComments는 cmt.js에서 처리)
        axios.get(`http://192.168.0.18:28888/with/post/${postId}/commentList`, axiosConfig)
        .then(response => {
            const commentsData = response.data.data;
            console.log('댓글 데이터:', commentsData);

            // post_idx에 해당하는 댓글만 필터링
            const filteredComments = commentsData.filter(comment => comment.post_idx === parseInt(postId));
            renderComments(filteredComments);  // 댓글 렌더링 함수 호출
            renderReplyComments(filteredComments);
        })
        .catch(error => {
            console.error('댓글 데이터 가져오기 에러:', error);
        });
    }

    // 게시글 상세 페이지 생성 함수
    function createDetail(data) {
        // 제목과 게시판 이름 설정
        const boardNameElement = document.querySelector('.write_top h3');
        if (boardNameElement) {
            boardNameElement.textContent = data.board_name;
        }

        const postTitleSpan = document.querySelector('.post_title button span');
        if (postTitleSpan) {
            postTitleSpan.textContent = data.board_name;
        }

        const postTitleElement = document.querySelector('.post_title h3');
        if (postTitleElement) {
            postTitleElement.textContent = data.p_title;
        }

        // 사용자 정보 설정
        const userInfoElement = document.querySelector('.user_info p');
        if (userInfoElement) {
            userInfoElement.textContent = data.user_name;
        }

        // 생성일, 조회수 설정
        const createdAtElement = document.querySelector('.user_info ul li:first-child');
        if (createdAtElement) {
            createdAtElement.textContent = data.created_date;
        }

        const viewsElement = document.querySelector('.user_info ul li:last-child');
        if (viewsElement) {
            viewsElement.textContent = `조회 ${data.p_view}`;
        }

        // 옵션 리스트를 동적으로 생성하여 화면에 표시
        const postTopElement = document.querySelector('.post_top ul');
        const postTopSection = document.querySelector('.post_top');
        
        postTopElement.innerHTML = ''; // 기존 내용을 초기화

        if (data.options && data.options.length > 0) {
            data.options.forEach(option => {
                const liElement = document.createElement('li');
                liElement.classList.add('row');
                liElement.innerHTML = `
                    <span class="col-5 font-weight">${option.df_name}:</span>
                    <span class="col-7">${option.option_value}</span>
                `;
                postTopElement.appendChild(liElement);
            });
        
            // options가 있으면 .post_top 섹션을 보여줌
            postTopSection.style.display = 'block';
        } else {
            // options가 비어 있으면 .post_top 섹션을 숨김
            postTopSection.style.display = 'none';
        }

        // 첨부 파일 리스트 설정
        const fileAttachElement = document.querySelector('.file_attach');
        const fileListWrap = document.querySelector('.file_list_wrap ul.file_list');
        fileListWrap.innerHTML = ''; // 기존 파일 리스트를 초기화

        if (data.files && data.files.length > 0) {
            let totalFiles = 0;
            let totalFileSize = 0;
        
            data.files.forEach(file => {
                totalFiles += 1;
                totalFileSize += parseFloat(file.f_size) || 0;
        
                const fileItem = document.createElement('li');
                fileItem.innerHTML = `
                    <div>
                        <p>${file.o_f_name}</p>
                        <span>(${file.f_size || '0'}MB)</span>
                    </div>
                    <button><img src="${downImg}" alt="Downloads Icon"></button>
                `;
                fileListWrap.appendChild(fileItem);
            });

            // 파일 개수와 총 용량을 표시
            const fileCountElement = document.querySelector('.attach_title div p');
            const fileSizeElement = document.querySelector('.attach_title div span');

            if (fileCountElement) {
                fileCountElement.textContent = `${totalFiles}개`;
            }

            if (fileSizeElement) {
                fileSizeElement.textContent = `(${totalFileSize.toFixed(1)}MB)`;
            }

            // 파일 목록 아이템에 폴더 아이콘 추가
            const fileItems = document.querySelectorAll('.file_list li div');
            fileItems.forEach(item => {
                const folderImg = document.createElement('img');
                folderImg.src = folder;
                folderImg.alt = 'Folder Icon';
                folderImg.style.marginRight = '8px';
                item.prepend(folderImg);
            });
        } else {
            // attachments가 없으면 file_attach 섹션 숨김
            fileAttachElement.style.display = 'none';
        }

        // 게시글 내용 설정
        const postContentElement = document.querySelector('.post_content p');
        if (postContentElement) {
            postContentElement.textContent = data.p_content;
        }

        // 이미지면 이미지 랜더링 하는 부분도 추가

    }

    // 이미지 추가 함수
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

    // 이미지 추가 작업
    appendImage('.cmt_pic_wrap', pic);
    appendImage('.all_cmt button span', left_arrow);
    appendImage('.user_img_wrap', userImg);
    appendImage('.back_img', back);
    appendImage('.re_btn_wrap', close);
    appendImage('.btn_fine_del', close);
    appendImage('.file_name_img', folder);
    appendImage('.remove_img', close);
    appendImage('.thumbnail', exImg2);

    // 다운로드 버튼에 다운로드 아이콘 추가
    const downloadBtns = document.querySelectorAll('.file_list button');
    downloadBtns.forEach(button => {
        const downloadImg = document.createElement('img');
        downloadImg.src = downImg;
        downloadImg.alt = 'Downloads Icon';
        button.appendChild(downloadImg);
    });

    // 첨부 파일 토글 버튼 설정
    const attachToggleButton = document.getElementById('attach_toggle');
    const fileListWrap = document.querySelector('.file_list_wrap');

    const toggleImg = document.createElement('img');
    toggleImg.src = arrow_down; // 기본적으로 down 이미지를 설정
    toggleImg.alt = 'Toggle Attachments';
    attachToggleButton.appendChild(toggleImg);

    fileListWrap.style.display = 'none'; // 기본적으로 파일 목록 숨김

    attachToggleButton.addEventListener('click', () => {
        if (fileListWrap.style.display === 'none' || fileListWrap.style.display === '') {
            fileListWrap.style.display = 'block';
            toggleImg.src = arrow_up; // 리스트가 보일 때 위로 화살표 이미지
        } else {
            fileListWrap.style.display = 'none';
            toggleImg.src = arrow_down; // 리스트가 숨겨질 때 아래로 화살표 이미지
        }
    });

    // 뒤로가기 버튼 설정
    const backBtn = document.getElementById('back_Btn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            history.back(); // 또는 history.go(-1);
        });
    }
});

// CSS 및 Bootstrap 관련 파일 임포트
import './styles/main.scss'; 
import './styles/reset.css'; 
import userImg from './img/userImg.svg';
import more from './img/more.svg';
import replyIcon from './img/cmt.svg';  // 답댓글 아이콘 이미지 임포트
import axios from 'axios';

// 댓글 관련 함수
function renderComments(comments) {
    const commentsWrap = document.querySelector('.cmt_wrap');
    commentsWrap.innerHTML = ''; // 기존 댓글 초기화

    comments.forEach(comment => {
        const userName = comment.user_name || 'Unknown'; // 기본값 설정
        const userImage = comment.user_img || userImg;

        const commentElement = document.createElement('div');
        commentElement.classList.add('cmt_item');

        commentElement.innerHTML = `
           <div class="cmt_user_img">
                <img src="${userImage}" alt="${userName}" />
            </div>
            <div>
                <div class="cmt_tit_info">
                    <h5>${userName}</h5>
                    <span>${comment.created_date}</span>
                </div>
                <div class="cmt_tit_content">
                    <p>${comment.cm_content}</p>
                </div>
                <div class="cmt_imgbox" style="display: none;">
                    <a class="cmt_img_link"><img class="image"></a>
                </div>
                <div class="cmt_filebox" style="display: none;">
                    <div class="file_namebox">
                        <i class="file_name"></i>
                        <span class="file_size"></span>
                    </div>
                    <button id="file_down">다운</button>
                </div>
            </div>
            <div class="more_btn_wrap">
                <button class="more_btn" data-user-name="${userName}"></button>
            </div>
        `;
        commentsWrap.appendChild(commentElement);

         // 첨부파일이 있는 경우 처리
         if (comment.첨부파일 && comment.첨부파일.length > 0) {
            comment.첨부파일.forEach(file => {

                // 이미지 확장자 체크
                const isImage = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg'].includes(file.f_ext.toLowerCase());

                if (isImage) {
                    // 이미지인 경우 이미지 박스에 표시
                    const imgBox = commentElement.querySelector('.cmt_imgbox');
                    const imgLink = imgBox.querySelector('.cmt_img_link');
                    const imgTag = imgBox.querySelector('.image');

                    imgTag.src = `${file.domain}/${file.s_f_name}.${file.f_ext}`; // 이미지 경로 설정
                    imgBox.style.display = 'block'; // 이미지 박스를 보이게 함
                    imgLink.href = `${file.domain}/${file.s_f_name}.${file.f_ext}`; // 이미지 클릭 시 원본 이미지로 이동
                } else {
                    // 그 외 파일(첨부파일) 처리
                    const fileBox = commentElement.querySelector('.cmt_filebox');
                    const fileNameElement = fileBox.querySelector('.file_name');
                    const fileSizeElement = fileBox.querySelector('.file_size');
                    const fileDownloadButton = fileBox.querySelector('#file_down');

                    fileNameElement.textContent = file.o_f_name; // 파일명
                    fileSizeElement.textContent = `(${file.f_size})`; // 파일 사이즈
                    fileBox.style.display = 'block'; // 파일 박스를 보이게 함

                    // 다운로드 버튼 클릭 시 파일 다운로드 처리
                    fileDownloadButton.addEventListener('click', () => {
                        window.open(`${file.domain}/${file.s_f_name}.${file.f_ext}`, '_blank'); // 파일 URL로 이동
                    });
                }
            });
        }

         // 하위 댓글이 있을 경우 하위 댓글을 렌더링
        if (comment.하위댓글 && comment.하위댓글.length > 0) {
            renderReplyComments(comment.하위댓글, commentElement); // 하위 댓글을 부모 댓글 밑에 렌더링
        }

        // 더보기 메뉴
        const moreBtn = commentElement.querySelector('.more_btn');
        moreBtn.addEventListener('click', () => showCommentMenu(userName, comment.cm_content));
    });

    // 더보기 버튼에 이미지 추가
    addMoreButtonIcons();
}

function renderReplyComments(replyComments) {
    const commentsWrap = document.querySelector('.cmt_wrap');

    replyComments.forEach(reply => {
        // 하위 댓글의 내용이 없으면 건너뛰기
        if (!reply.rp_content) return;

        const replyElement = document.createElement('div');
        replyElement.classList.add('cmt_item');

        replyElement.innerHTML = `
          <div class="reply_img_wrap"></div>
            <div class="cmt_user_img">
                <img src="${reply.user_img || userImg}" alt="${reply.user_name || 'Unknown User'}" />
            </div>
            <div>
                <div class="cmt_tit_info">
                    <h5>${reply.user_name || 'Unknown User'}</h5>
                    <span>${reply.created_date || ''}</span>
                </div>
                <div class="cmt_tit_content">
                    <p>${reply.rp_content || ''}</p>
                </div>
                <div class="cmt_imgbox" style="display: none;">
                    <a class="cmt_img_link"><img class="image"></a>
                </div>
                <div class="cmt_filebox" style="display: none;">
                    <div class="file_namebox">
                        <i class="file_name"></i>
                        <span class="file_size"></span>
                    </div>
                    <button id="file_down">다운</button>
                </div>
            </div>
            <div class="more_btn_wrap">
                <button class="more_btn" data-user-name="${reply.user_name || 'Unknown User'}"></button>
            </div>
        `;
        commentsWrap.appendChild(replyElement);

            // 첨부파일이 있는 경우 처리
        if (reply.첨부파일 && reply.첨부파일.length > 0) {
            reply.첨부파일.forEach(file => {
                const isImage = ['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(file.f_ext.toLowerCase());

                if (isImage) {
                    // 이미지인 경우 이미지 박스에 표시
                    const imgBox = replyElement.querySelector('.cmt_imgbox');
                    const imgLink = imgBox.querySelector('.cmt_img_link');
                    const imgTag = imgBox.querySelector('.image');

                    imgTag.src = `${file.domain}/${file.s_f_name}.${file.f_ext}`;
                    imgBox.style.display = 'block';
                    imgLink.href = `${file.domain}/${file.s_f_name}.${file.f_ext}`;
                } else {
                    // 그 외 파일(첨부파일) 처리
                    const fileBox = replyElement.querySelector('.cmt_filebox');
                    const fileNameElement = fileBox.querySelector('.file_name');
                    const fileSizeElement = fileBox.querySelector('.file_size');
                    const fileDownloadButton = fileBox.querySelector('#file_down');

                    fileNameElement.textContent = file.o_f_name;
                    fileSizeElement.textContent = `(${file.f_size})`;
                    fileBox.style.display = 'block';

                    fileDownloadButton.addEventListener('click', () => {
                        window.open(`${file.domain}/${file.s_f_name}.${file.f_ext}`, '_blank');
                    });
                }
            });
        }

        const moreBtn = replyElement.querySelector('.more_btn');
        moreBtn.addEventListener('click', () => showCommentMenu(reply.user_name || 'Unknown User', reply.rp_content || ''));

        // 답글 이미지 추가 (import된 이미지를 사용)
        const replyImgWrap = replyElement.querySelector('.reply_img_wrap');
        const replyImg = document.createElement('img');
        replyImg.src = replyIcon;  // import한 답댓글 아이콘 이미지 사용
        replyImg.alt = 'Reply Icon';
        replyImgWrap.appendChild(replyImg);
    });
}


// 더보기 메뉴 표시 함수
function showCommentMenu(userName, commentContent) {
    const overlay = document.querySelector('.overlay');
    const cmtMenu = document.querySelector('.cmt_menu');
    
    cmtMenu.innerHTML = `
        <div class="cmt_menu_wrap">
            <ul>
                <li class="reply_menu" data-user-name="${userName}">답댓글</li>
                <li class="copy_menu">복사</li>
                <li>삭제</li>
                <li class="cancel_menu">취소</li>
            </ul>
        </div>
    `;

    overlay.style.display = 'block';
    cmtMenu.style.display = 'block';

    document.querySelector('.copy_menu').addEventListener('click', () => {
        navigator.clipboard.writeText(commentContent).then(() => alert('복사되었습니다.'));
        hideOverlayAndMenu();
    });

    document.querySelector('.cancel_menu').addEventListener('click', hideOverlayAndMenu);

    document.querySelector('.reply_menu').addEventListener('click', () => {
        hideOverlayAndMenu();
        showReplyWrite(userName);
    });
}

// 답글 작성창 표시 함수
function showReplyWrite(userName) {
    const commentWrite = document.getElementById('comment_write');
    const replyMention = document.querySelector('.reply_mention');
    const mentionText = document.getElementById('mentionText');

    replyMention.style.display = 'flex';
    mentionText.textContent = `@${userName}`;

    // 댓글 입력창에 포커스
    const commentTextArea = document.getElementById('commentTextArea'); // 댓글 입력창
    commentTextArea.focus();

    // 댓글 입력창으로 화면 스크롤
    commentTextArea.scrollIntoView({ behavior: 'smooth', block: 'center' });


    const closeBtn = document.querySelector('.re_btn_wrap');
    closeBtn.addEventListener('click', hideReplyWrite);
}

// 답글 작성창 숨기기 함수
function hideReplyWrite() {
    const replyMention = document.querySelector('.reply_mention');
    replyMention.style.display = 'none';
    document.getElementById('commentTextArea').value = '';
}

// 메뉴 및 오버레이 숨기기
function hideOverlayAndMenu() {
    document.querySelector('.overlay').style.display = 'none';
    document.querySelector('.cmt_menu').style.display = 'none';
}

// 더보기 버튼에 이미지 추가 함수
function addMoreButtonIcons() {
    const moreBtns = document.querySelectorAll('.more_btn_wrap button');
    moreBtns.forEach(button => {
        const moreImg = document.createElement('img');
        moreImg.src = more;
        button.appendChild(moreImg);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // 파일 첨부 버튼과 파일 인풋
    const fileButton = document.querySelector('#fileButton');
    const fileInputComment = document.querySelector('#fileInputComment');
    const attachArea = document.querySelector('.attach_area');
    const thumbBox = document.querySelector('.thumb_box');
    const fileCover = document.querySelector('.file_cover');
    const fileNameText = document.querySelector('.file_name_text');
    const fileSizeText = document.querySelector('.file_size');
    const thumbnailImg = document.querySelector('.thumbnail-img');
    const removeImgButton = document.querySelector('.remove_img');
    const btnFineDel = document.querySelector('.btn_fine_del');

   // 댓글 등록
    const submitCommentButton = document.getElementById('submitComment');
    const commentTextArea = document.getElementById('commentTextArea');

    const replyMention = document.querySelector('.reply_mention');


    // URL에서 post_idx 파라미터 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const postIdx = urlParams.get('post_idx'); // post_idx 값

    submitCommentButton.addEventListener('click', ()=> {

        console.log('아까나왔잖아 너 : ', commentTextArea.value.trim());

        // 상위 댓글 등록
        const isComment = 'top';
        const token = localStorage.getItem('accessToken');
        const cm_content = commentTextArea.value.trim();
        const file = document.querySelector('#fileInputComment').files[0]; // 파일이 선택된 것

        // 폼데이터 생성
        const formData = new FormData();
   
        // 파일이 있을 경우에만 formData에 파일을 추가
        if (file) {
            formData.append('file', file);
        }

        formData.append('cm_content', cm_content);
        formData.append('isComment', isComment);
        formData.append('postIdx', postIdx);

    });

   // 파일 선택 창 열기 함수
    function openFileDialog() {
        fileInputComment.click();  // 파일 첨부 창 열기
    }
    
        // 파일 선택 시 처리 함수
        function handleFileChange(event) {
            const file = event.target.files[0];
            if (!file) return;
    
            const fileType = file.type;
            const fileSize = (file.size / 1024).toFixed(2) + 'KB';
    
            // 파일이 이미지인지 확인
            if (fileType.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    thumbnailImg.src = e.target.result;  // img 태그에 이미지 설정
                    attachArea.style.display = 'block';
                    thumbBox.style.display = 'block';
                    fileCover.style.display = 'none';
                };
                reader.readAsDataURL(file);
            } else {
                // 이미지가 아닐 경우 file_cover에 파일 이름 및 사이즈 표시
                fileNameText.textContent = file.name;
                fileSizeText.textContent = `(${fileSize})`;
                attachArea.style.display = 'block';
                thumbBox.style.display = 'none';
                fileCover.style.display = 'block';
            }
        }
    
        // 파일 첨부 버튼 클릭 시 파일 선택 창 열기
        fileButton.addEventListener('click', openFileDialog);
    
        // 파일 선택 시 파일 처리
        fileInputComment.addEventListener('change', handleFileChange);
    
        // 첨부된 이미지나 파일 삭제 버튼 처리
        removeImgButton.addEventListener('click', () => {
            thumbnailImg.src = ''; // img 태그의 이미지 제거
            attachArea.style.display = 'none';
            fileInputComment.value = ''; // 파일 선택 초기화
        });
    
        btnFineDel.addEventListener('click', () => {
            fileNameText.textContent = '';
            fileSizeText.textContent = '';
            attachArea.style.display = 'none';
            fileInputComment.value = ''; // 파일 선택 초기화
        });

    // 댓글 textarea와 답글 textarea 가져오기
    const replyTextareaList = document.querySelectorAll('.cmt_textarea textarea');
    const charCountSpanList = document.querySelectorAll('.cmt_reg span');

     // 글자 수 제한
     const maxChars = 600;

     // 글자 수 업데이트 함수
     function updateCharCount(textarea, span) {
         let currentLength = textarea.value.length;
 
         // 글자 수가 최대를 초과하면 경고 및 글자 수 제한
         if (currentLength > maxChars) {
             textarea.value = textarea.value.substring(0, maxChars);
             currentLength = maxChars; // 최대 글자 수로 업데이트
         }
 
         // 현재 글자 수 업데이트
         span.textContent = `${currentLength}/${maxChars}`;
     }
 
     // 각 textarea에 이벤트 리스너 추가
     replyTextareaList.forEach((textarea, index) => {
         const span = charCountSpanList[index];
         const charCountSpan = charCountSpanList[index];
 
         // 입력 이벤트 처리
         textarea.addEventListener('input', () => {
             updateCharCount(textarea, charCountSpan);
         });
 
         // 붙여넣기 이벤트 처리
         textarea.addEventListener('paste', () => {
             setTimeout(() => {
                 updateCharCount(textarea, charCountSpan);
             }, 0); // 붙여넣기가 완료된 후 글자 수 업데이트
         });
 
           // 포커스가 해제될 때 textarea 초기화
           textarea.addEventListener('blur', () => {
             textarea.value = ''; // 텍스트 초기화
             span.textContent = `0/${maxChars}`; // 글자 수 초기화
         });
     });

     // 텍스트 높이 자동 조절
     autoAdjustTextareaHeight('.cmt_textarea textarea');

});

function autoAdjustTextareaHeight(textareaSelector) {
    const textarea = document.querySelector(textareaSelector);
    textarea.addEventListener('input', function () {
        this.style.height = 'auto'; // 높이를 자동으로 설정하여 초기화
        this.style.height = `${this.scrollHeight}px`; // scrollHeight를 기준으로 높이 설정
    });
}

 // 뒤로가기 버튼 실행
 const backButton = document.getElementById('backButton');
 if (backButton) {
     backButton.addEventListener('click', () => {
         history.back(); // 또는 history.go(-1);
     });
 }
