// CSS 및 Bootstrap 관련 파일 임포트
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'jquery';
import '@popperjs/core';
import './styles/main.scss'; 
import './styles/reset.css'; 

// 이미지 파일 임포트
import back from './img/back.svg';
import userImg from './img/userImg.svg';
import arrow_down from './img/arrow_down.svg';
import arrow_up from './img/arrow_up.svg';
import folder from './img/folder.svg';
import downImg from './img/down.svg';
import left_arrow from './img/left_arrow.svg';
import more from './img/more.svg';
import pic from './img/pic.svg';
import reply from './img/cmt.svg';
import close from './img/close.svg';
import exImg2 from './img/eximg2.jpg';
import axios from 'axios';
import { error, post } from 'jquery';


document.addEventListener('DOMContentLoaded', () => {
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
});


// DOMContentLoaded 이벤트 리스너
document.addEventListener('DOMContentLoaded', () => {


     // 더보기 버튼 설정
     const overlay = document.querySelector('.overlay');
     const cmtMenu = document.querySelector('.cmt_menu');

      // 더보기 버튼 클릭 시 메뉴를 동적으로 생성하여 표시하는 함수
    function showCommentMenu(userName, commentContent) {
        console.log('userNamessssssssssss:', userName); // userName 확인을 위한 로그

        // cmt_menu의 innerHTML을 동적으로 설정
        cmtMenu.innerHTML = `
            <div class="cmt_menu_wrap">
                <ul>
                    <li class="reply_menu" data-user-name="${userName}">답댓글</li>
                    <li class="copy_menu">복사</li>
                    <li>수정</li>
                    <li>삭제</li>
                    <li class="cancel_menu">취소</li>
                </ul>
            </div>
        `;

        // 오버레이와 메뉴를 보이게 함
        overlay.style.display = 'block';
        cmtMenu.style.display = 'block';

        // 답댓글 클릭 시, 답글 작성창을 열기
        const replyMenu = cmtMenu.querySelector('.reply_menu');
        replyMenu.addEventListener('click', () => {
            hideOverlayAndMenu();
            showReplyWrite(replyMenu.getAttribute('data-user-name'));

                  // textarea에 포커스 맞추기
                  const replyWrite = document.getElementById('reply_write');
                  const replyTextarea = replyWrite.querySelector('textarea');
                  replyTextarea.focus();
          
                  // textarea가 화면에 보이도록 스크롤
                  replyTextarea.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });

        // 취소 버튼 클릭 시 메뉴 닫기
        const cancelMenu = cmtMenu.querySelector('.cancel_menu');
        cancelMenu.addEventListener('click', hideOverlayAndMenu);

        const copyMenu = cmtMenu.querySelector('.copy_menu');
        copyMenu.addEventListener('click', ()=> {
              // 댓글 내용을 클립보드에 복사
              navigator.clipboard.writeText(commentContent)
              .then(() => {
                  alert('댓글 내용이 복사되었습니다.');
              })
              .catch(err => {
                  console.error('복사 실패:', err);
              });
          
          hideOverlayAndMenu(); // 복사 후 메뉴 닫기
        });
    
    }


     // URL에서 postId 파라미터 추출
     const urlParams = new URLSearchParams(window.location.search);
     const postId = urlParams.get('post_idx');

     console.log('postId가 무엇이니', postId);

     if(postId) {
        axios.get(`/post_detail.json?postId=${postId}`)
            .then(response => {
                const postsData = response.data.data;
                console.log('받은 데이터', postsData);
                
                // postId에 해당하는 게시글 필터링
                const selectedPost = postsData.find(post => post.post_idx === parseInt(postId));
                console.log('선택된 게시글:', selectedPost);

                if (selectedPost) {
                    createDetail(selectedPost);
                } else {
                    console.error('해당 postId에 해당하는 게시글을 찾을 수 없습니다.');
                }

            }).catch(error => {
                console.error('에러데쓰', error);
            });

               // 댓글 데이터 가져오기
        axios.get(`/comment.json?postId=${postId}`)
        .then(response => {
            const commentsData = response.data.data;
            console.log('댓글 데이터:', commentsData);

             // post_idx에 해당하는 댓글만 필터링
        const filteredComments = commentsData.filter(comment => comment.post_idx === parseInt(postId));


            renderComments(filteredComments);
        })
        .catch(error => {
            console.error('댓글 데이터 가져오기 에러', error);
        });

     }



    // 댓글 데이터 화면에 렌더링하는 함수
    // function renderComments(comments) {
    //     const commentsWrap = document.querySelector('.cmt_wrap');
    //     commentsWrap.innerHTML = ''; // 기존 댓글 초기화
    
    //     comments.forEach(comment => {
    //         const commentElement = document.createElement('div');
    //         commentElement.classList.add('cmt_item');
    
    //         // 사용자 이미지, 이름, 댓글 내용 등을 설정
    //         commentElement.innerHTML = `
    //             <div class="cmt_user_img">
    //                 <img src="${comment.user_img || userImg}" alt="${comment.user_name}" />
    //             </div>
    //             <div>
    //                 <div class="cmt_tit_info">
    //                     <h5>${comment.user_name}</h5>
    //                     <span>${comment.created_date}</span>
    //                 </div>
    //                 <div class="cmt_tit_content">
    //                     <p>${comment.cm_content}</p>
    //                 </div>
    //                 ${renderCommentAttachments(comment.attachments)}
    //             </div>
    //         `;
    
    //         // 댓글을 cmt_wrap에 추가
    //         commentsWrap.appendChild(commentElement);
    
    //         // 하위 댓글이 있으면 재귀적으로 하위 댓글도 추가
    //         if (comment.reply_comment && comment.reply_comment.length > 0) {
    //             renderReplyComments(comment.reply_comment, commentElement);
    //         }
    //     });
    // }
    
    // // 첨부 파일 렌더링 함수
    // function renderCommentAttachments(attachments) {
    //     if (!attachments || attachments.length === 0) {
    //         return '';
    //     }
    
    //     return `
    //         <div class="comment_attachments">
    //             ${attachments.map(file => `
    //                 <div class="attachment">
    //                     <a href="${file.domain}" download>${file.o_f_name} (${file.f_size})</a>
    //                 </div>
    //             `).join('')}
    //         </div>
    //     `;
    // }
    
    // // 하위 댓글 렌더링 함수 (재귀적)
    // function renderReplyComments(replyComments, parentElement) {
    //     const replyWrap = document.createElement('div');
    //     replyWrap.classList.add('reply_wrap');
    
    //     replyComments.forEach(reply => {
    //         const replyElement = document.createElement('div');
    //         replyElement.classList.add('reply_item');
    
    //         replyElement.innerHTML = `
    //             <div class="reply_user_img">
    //                 <img src="${reply.user_img || userImg}" alt="${reply.user_name}" />
    //             </div>
    //             <div>
    //                 <div class="reply_tit_info">
    //                     <h5>${reply.user_name}</h5>
    //                     <span>${reply.created_date}</span>
    //                 </div>
    //                 <div class="reply_tit_content">
    //                     <p>${reply.rp_content}</p>
    //                 </div>
    //                 ${renderCommentAttachments(reply.attachments)}
    //             </div>
    //         `;
    
    //         replyWrap.appendChild(replyElement);
    //     });
    
    //     parentElement.appendChild(replyWrap);
    // }

    function renderComments(comments) {
        const commentsWrap = document.querySelector('.cmt_wrap');
        commentsWrap.innerHTML = ''; // 기존 댓글 초기화
    
        
        comments.forEach(comment => {
            // 댓글 렌더링
            const userName = comment.user_name; // user_name이 없을 경우 기본값 설정
            const userImage = comment.user_img || userImg; // 사용자가 등록한 이미지가 없으면 기본 이미지 사용

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
            </div>
            <div class="more_btn_wrap">
                <button class="more_btn" data-user-name="${userName}"></button>
            </div>
        `;

     
            // 댓글을 cmt_wrap에 추가
            commentsWrap.appendChild(commentElement);
    
            // 하위 댓글이 있으면 해당 댓글 아래에 추가
            if (comment.reply_comment && comment.reply_comment.length > 0) {
                renderReplyComments(comment.reply_comment, comment.cm_idx);
            }

            // 더보기 버튼에 이벤트 추가
            const moreBtn = commentElement.querySelector('.more_btn');
            console.log('버튼',moreBtn);  // 더보기 버튼이 선택되었는지 확인

            moreBtn.addEventListener('click', () => {
                showCommentMenu(userName, comment.cm_content);  // 메뉴를 띄우기만 하고, 답글 작성창을 띄우지 않음
            });

               // 답글 버튼 이벤트 설정
                setupReplyButtonEvents();

        });

         // 모든 more_btn 요소에 more 이미지를 추가
        const moreBtns = document.querySelectorAll('.more_btn_wrap button');
        moreBtns.forEach(button => {
            const moreImg = document.createElement('img');
            moreImg.src = more; // 'more'는 import된 이미지 경로
            button.appendChild(moreImg);

            button.addEventListener('click', () => {
                overlay.style.display = 'block';  // 오버레이 표시
                cmtMenu.style.display = 'block';  // 댓글 메뉴 표시
            });
        });
    }

    // 답글 작성창을 보여주는 함수
    function showReplyWrite(userName) {
        console.log('웨얼?유저네임?',userName);
        const replyWrite = document.getElementById('reply_write');
        const cmtWrite = document.getElementById('cmt_write');

        // 댓글 작성창 숨기고, 답글 작성창 보여주기
        cmtWrite.style.display = 'none';
        replyWrite.style.display = 'block';

        // 답글 작성자의 이름 설정
        const replyMention = document.querySelector('.reply_mention p');
        replyMention.textContent = userName ? `@${userName}` : '@알 수 없음';  // userName이 null일 경우 '알 수 없음'으로 표시

        // X 버튼에 이벤트 추가 (답글 작성창 숨기기)
        const closeBtn = document.querySelector('.re_btn_wrap');
        closeBtn.addEventListener('click', hideReplyWrite);

    }

    // 답글 작성창을 숨기고, 원래 댓글 작성창을 보여주는 함수
    function hideReplyWrite() {
        const replyWrite = document.getElementById('reply_write');
        const cmtWrite = document.getElementById('cmt_write');
        const replyTextarea = replyWrite.querySelector('.cmt_textarea textarea');

        // 답글 작성창 숨기고, 댓글 작성창 다시 보여주기
        replyWrite.style.display = 'none';
        cmtWrite.style.display = 'block';

           // textarea 내용을 초기화
    replyTextarea.value = '';
    }

    // 답글 작성 시 더보기 버튼과 답글 작성창 연결
function setupReplyButtonEvents() {
    const replyButtons = document.querySelectorAll('.reply_menu');
    replyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const userName = button.getAttribute('data-user-name');
            console.log('userName:', userName);  // userName 값을 콘솔에 출력
            showReplyWrite(userName);
        });
    });
}

    // 하위 댓글 렌더링 함수
    function renderReplyComments(replyComments, parentCommentId) {
        const commentsWrap = document.querySelector('.cmt_wrap'); // 댓글 리스트 영역
    
        replyComments.forEach((reply, index) => {
            const replyElement = document.createElement('div');
            replyElement.classList.add('cmt_item');
            const uniqueClass = `reply_img_wrap_${parentCommentId}_${index}`; // 고유한 클래스 생성
    
            // 대댓글 HTML 구조
            replyElement.innerHTML = `
                <div class="reply_img_wrap ${uniqueClass}"></div>
                <div class="cmt_user_img">
                    <img src="${reply.user_img || userImg}" alt="${reply.user_name}" />
                </div>
                <div>
                    <div class="cmt_tit_info">
                        <h5>${reply.user_name}</h5>
                        <span>${reply.created_date}</span>
                    </div>
                    <div class="cmt_tit_content">
                        <p>${reply.rp_content}</p>
                    </div>
                </div>
                <div class="more_btn_wrap">
                <button class="more_btn" data-user-name="${reply.user_name}"></button>
            </div>
            `;
    
            // 대댓글을 댓글 아래에 추가 (댓글 밑에 삽입)
            commentsWrap.appendChild(replyElement);
    
            // reply_img_wrap에 대댓글 아이콘 추가 (고유한 클래스를 사용)
            replyAppendImage(`.${uniqueClass}`, reply);

             // reply_menu 버튼에 이벤트 추가
        const moreBtn = replyElement.querySelector('.more_btn');
        console.log('하위 댓글 버튼', moreBtn);  // 더보기 버튼이 선택되었는지 확인

        moreBtn.addEventListener('click', () => showCommentMenu(reply.user_name, reply.rp_content)); // 메뉴를 표시하면서 userName을 전달
        
         // reply_menu 버튼에 이벤트 추가
         setupReplyButtonEvents();

        });
    }

    // 이미지 추가 함수
const replyAppendImage = (selector, src) => {
    const imgElement = document.createElement('img');
    imgElement.src = reply;  // 고정된 reply 이미지
    const targetElement = document.querySelector(selector);
    if (targetElement) {
        targetElement.appendChild(imgElement);
    }
};
    
     // 가져온 데이터로 화면 랜더링
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
            postTitleElement.textContent = data.post_title;
        }

        // 사용자 정보 설정
        const userInfoElement = document.querySelector('.user_info p');
        if (userInfoElement) {
            userInfoElement.textContent = data.user_name;
        }

        // 생성일, 조회수 설정
        const createdAtElement = document.querySelector('.user_info ul li:first-child');
        if (createdAtElement) {
            createdAtElement.textContent = data.created_at;
        }

        const viewsElement = document.querySelector('.user_info ul li:last-child');
        if (viewsElement) {
            viewsElement.textContent = `조회 ${data.views}`;
        }

        // 옵션 리스트를 동적으로 생성하여 화면에 표시
        const postTopElement = document.querySelector('.post_top ul');
        postTopElement.innerHTML = ''; // 기존 내용을 초기화

        data.options.forEach(option => {
            const liElement = document.createElement('li');
            liElement.classList.add('row');
            liElement.innerHTML = `
                <span class="col-5 font-weight">${option.df_name}:</span>
                <span class="col-7">${option.data_value}</span>
            `;
            postTopElement.appendChild(liElement);
        });
       

       // 첨부 파일 리스트 설정
       const fileAttachElement = document.querySelector('.file_attach'); // file_attach 섹션
       const fileListWrap = document.querySelector('.file_list_wrap ul.file_list');
       fileListWrap.innerHTML = ''; // 기존 파일 리스트를 초기화

       if (data.attachments && data.attachments.length > 0) {
        let totalFiles = 0;
        let totalFileSize = 0;
        
        data.attachments.forEach(file => {
            totalFiles += 1;
            totalFileSize += parseFloat(file.file_size) || 0;
            
            const fileItem = document.createElement('li');
            fileItem.innerHTML = `
                   <div>
                       <p>${file.file_name}</p>
                       <span>(${file.file_size || '0'}MB)</span>
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

        // **파일 목록 아이템에 폴더 아이콘 추가 (파일 리스트 생성 후)**
        const fileItems = document.querySelectorAll('.file_list li div');
        fileItems.forEach(item => {
            const folderImg = document.createElement('img');
            folderImg.src = folder;
            folderImg.alt = 'Folder Icon';
            folderImg.style.marginRight = '8px';
            item.prepend(folderImg);
        });
    } else {
        // attachments가 빈 배열일 경우 file_attach 섹션 숨기기
        fileAttachElement.style.display = 'none';
    }

        // 게시글 내용 설정
        const postContentElement = document.querySelector('.post_content p');
        if (postContentElement) {
            postContentElement.textContent = data.post_content;
        }
    }

    // 이미지 추가 함수
    // 이미지 추가 함수
    const appendImage = (selector, src) => {
        // 여러 개의 요소를 선택
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

    // 모든 댓글 보기 버튼 설정
    // document.getElementById('all_cmt_btn').addEventListener('click', () => {
    //     window.location.href = 'cmt.html';
    // });

    // 텍스트 영역 높이 자동 조정
    const textarea = document.querySelector('.cmt_textarea textarea');
    if (textarea) {
        textarea.addEventListener('input', () => {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        });
    }

    document.querySelectorAll('.reply_menu').forEach(button => {

        
        button.addEventListener('click', () => {
            hideOverlayAndMenu();
    
            // userName 가져오기
            const userName = button.getAttribute('data-user-name');
    
            // 답글 작성창을 보여주기
            showReplyWrite(userName);
    
      
        });
    });


     // 오버레이와 메뉴 닫기 함수
     function hideOverlayAndMenu() {
        const overlay = document.querySelector('.overlay');
        const cmtMenu = document.querySelector('.cmt_menu');

        // 오버레이와 메뉴를 숨김
        overlay.style.display = 'none';
        cmtMenu.style.display = 'none';
    }
    


    overlay.addEventListener('click', hideOverlayAndMenu);


    // 뒤로가기 버튼 실행
    const backButton = document.getElementById('backButton');
    if (backButton) {
        backButton.addEventListener('click', () => {
            history.back(); // 또는 history.go(-1);
        });
    }

});
