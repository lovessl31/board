// CSS 및 Bootstrap 관련 파일 임포트
import './styles/main.scss'; 
import './styles/reset.css'; 
import userImg from './img/userImg.svg';
import more from './img/more.svg';
import replyIcon from './img/cmt.svg';  // 답댓글 아이콘 이미지 임포트
import axios from 'axios';

// 댓글 관련 함수
export function renderComments(comments) {
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

export function renderReplyComments(replyComments) {
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
    console.log(commentTextArea); // commentTextArea가 제대로 선택되는지 확인
    const replyMention = document.querySelector('.reply_mention');
    const isComment = replyMention.style.display === 'none' ? 'top' : 'sub'; // 댓글과 답댓글 구분

    const accessToken = localStorage.getItem('accessToken');
    
    // URL에서 post_idx 파라미터 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const postIdx = urlParams.get('post_idx'); // post_idx 값을 추출

    console.log('나와',submitCommentButton);

    submitCommentButton.addEventListener('click', async () => {
        const formData = new FormData();
        const cm_content = commentTextArea.value.trim();
        const file = fileInputComment.files[0]; // 파일 선택된 것 (옵션)
    
        console.log("cm_content클릭클릭클릭:", cm_content); // 이 값을 다시 확인

        // 파일이 있을 경우에만 formData에 파일을 추가
        if (file) {
            formData.append('file', file); // 파일이 있을 경우에만 추가
        }
    
        // 상위 댓글 여부 판단
        const isComment = replyMention.style.display === 'none' ? 'top' : 'sub';
    
        if (isComment === 'top') {
            // 상위 댓글 등록
            formData.append('cm_content', cm_content);
            formData.append('isComment', 'top');
            formData.append('postIdx', postIdx);
    
            // 폼데이터 콘솔 출력
            console.log('상위 댓글 폼데이터:');
            formData.forEach((value, key) => {
                console.log(`${key}:`, value);
            });
    
            try {
                const response = await axios.post(`/with/post/top/${postIdx}/commentAdd`, formData, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });
    
                if (response.status === 200) {
                    alert('댓글이 성공적으로 등록되었습니다.');
                    window.location.reload(); // 페이지 새로고침
                }
            } catch (error) {
                console.error('댓글 등록 실패:', error);
                alert('댓글 등록 중 오류가 발생했습니다.');
            }
        } else if (isComment === 'sub') {
            // 답댓글일 경우
            const parentCommentElement = replyMention.closest('.cmt_item');
            const rp_p_idx = parentCommentElement.getAttribute('data-comment-idx'); // 부모 댓글 ID
            const rp_g_idx = parentCommentElement.getAttribute('data-group-idx') || rp_p_idx; // 그룹 ID, 없으면 부모 댓글 ID 사용
            const rp_depth = parseInt(parentCommentElement.getAttribute('data-depth')) + 1; // 부모 댓글의 depth에 1 추가
    
            formData.append('rp_content', cm_content); 
            formData.append('rp_depth', rp_depth); 
            formData.append('rp_p_idx', rp_p_idx); 
            formData.append('rp_g_idx', rp_g_idx); 
            formData.append('isComment', 'sub');
            formData.append('postIdx', postIdx); 
    
            // 폼데이터 콘솔 출력
            console.log('답댓글 폼데이터:');
            formData.forEach((value, key) => {
                console.log(`${key}:`, value);
            });
    
            try {
                const response = await axios.post(`/with/post/sub/${postIdx}/commentAdd`, formData, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });
    
                if (response.status === 200) {
                    alert('답댓글이 성공적으로 등록되었습니다.');
                    window.location.reload(); // 페이지 새로고침
                }
            } catch (error) {
                console.error('답댓글 등록 실패:', error);
                alert('답댓글 등록 중 오류가 발생했습니다.');
            }
        }
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