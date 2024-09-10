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

const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcyNTg4NTg2MSwianRpIjoiZjgxOTE1YmMtZDkyZi00ZWQ2LWJkOTYtODVkMWFjMzNkOTNiIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJ1c2VyX2lkIjoiYWRtaW4yIiwidXNlcl9pZHgiOjIsInVzZXJfbmFtZSI6Ilx1Y2Q1Y1x1YWNlMCBcdWFkMDBcdWI5YWNcdWM3OTAiLCJ1c2VyX2ltZyI6IjAxMDEyMzQ1Njc4IiwiaWRlbnRpZmllciI6IjU0ODU2IiwiY29tX2lkeCI6MSwiY29tcGFueV9uYW1lIjoiXHVjNjI0XHViMjk4XHVjNzQwXHVjMjE4XHVjNjk0XHVjNzdjIn0sIm5iZiI6MTcyNTg4NTg2MSwiZXhwIjoxNzI4NTY0MjYxfQ.Q3U7foMlmiapNhxF85VhKDdcq-kjaymCRMmzKGMN1Ps';

  // accessToken을 로컬 스토리지에 저장
  localStorage.setItem('accessToken', accessToken);

let isReply = false; // 기본적으로 일반 댓글
let parentComment = null; // 대댓글인 경우, 부모 댓글을 저장
let selectedCommentId = null; // 선택된 댓글의 ID
let selectedGroupId = null;  // 선택된 댓글의 그룹 ID
let selectedDepth = null;  // 선택된 댓글의 깊이
let selectedUserId = null;

let fileDeleted = false; // 파일이 삭제되었는지 여부를 관리


    // URL에서 post_idx 파라미터 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const postIdx = urlParams.get('post_idx'); // post_idx 값

    localStorage.setItem('postIdx', postIdx); // postIdx 값을 로컬 스토리지에 저장

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
        commentElement.setAttribute('data-comment-id', comment.cm_idx); // 댓글 ID를 data-comment-id 속성으로 설정
        if(comment.del_yn === 'N') {
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
        } else {
                // 삭제된 댓글의 경우
            commentElement.innerHTML = `
                <div class="deleted_comment">
                    <p>삭제된 댓글입니다.</p>
                </div>

            `;
        }

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
                    fileBox.style.display = 'flex'; // 파일 박스를 보이게 함

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

          // 파일 정보가 있는지 확인 (가정: comment.첨부파일에 파일 정보가 있음)
          const existingFile = comment.첨부파일 && comment.첨부파일.length > 0 ? comment.첨부파일[0] : undefined;

    


// 더보기 메뉴 추가 로직은 여기서 삭제되지 않은 댓글에만 동작
if(comment.del_yn === 'N') {
    const moreBtn = commentElement.querySelector('.more_btn');
    moreBtn.addEventListener('click', () => {
        selectedCommentId = comment.cm_idx;  // 댓글 ID
        selectedGroupId = comment.rp_g_idx || comment.cm_idx;  // 그룹 ID (최상위 댓글 ID)
        selectedDepth = comment.depth || 0;  // 댓글의 depth
        selectedUserId = comment.user_idx; // 댓글 작성자의 user_idx

        // 더보기 메뉴 표시
        showCommentMenu(userName, comment.cm_content, existingFile);

        console.log('선택된 댓글 정보:', { selectedCommentId, selectedGroupId, selectedDepth, selectedUserId  });
    });
}


    });

    // 더보기 버튼에 이미지 추가
    addMoreButtonIcons();
}

// function renderReplyComments(replyComments) {
//     const commentsWrap = document.querySelector('.cmt_wrap');

//     replyComments.forEach(reply => {
//         // 하위 댓글의 내용이 없으면 건너뛰기
//         if (!reply.rp_content) return;

//         const replyElement = document.createElement('div');
//         replyElement.classList.add('cmt_item');

//         replyElement.innerHTML = `
//           <div class="reply_img_wrap"></div>
//             <div class="cmt_user_img">
//                 <img src="${reply.user_img || userImg}" alt="${reply.user_name || 'Unknown User'}" />
//             </div>
//             <div>
//                 <div class="cmt_tit_info">
//                     <h5>${reply.user_name || 'Unknown User'}</h5>
//                     <span>${reply.created_date || ''}</span>
//                 </div>
//                 <div class="cmt_tit_content">
//                     <p>${reply.rp_content || ''}</p>
//                 </div>
//                 <div class="cmt_imgbox" style="display: none;">
//                     <a class="cmt_img_link"><img class="image"></a>
//                 </div>
//                 <div class="cmt_filebox" style="display: none;">
//                     <div class="file_namebox">
//                         <i class="file_name"></i>
//                         <span class="file_size"></span>
//                     </div>
//                     <button id="file_down">다운</button>
//                 </div>
//             </div>
//             <div class="more_btn_wrap">
//                 <button class="more_btn" data-user-name="${reply.user_name || 'Unknown User'}"></button>
//             </div>
//         `;
//         commentsWrap.appendChild(replyElement);

//             // 첨부파일이 있는 경우 처리
//         if (reply.첨부파일 && reply.첨부파일.length > 0) {
//             reply.첨부파일.forEach(file => {
//                 const isImage = ['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(file.f_ext.toLowerCase());

//                 if (isImage) {
//                     // 이미지인 경우 이미지 박스에 표시
//                     const imgBox = replyElement.querySelector('.cmt_imgbox');
//                     const imgLink = imgBox.querySelector('.cmt_img_link');
//                     const imgTag = imgBox.querySelector('.image');

//                     imgTag.src = `${file.domain}/${file.s_f_name}.${file.f_ext}`;
//                     imgBox.style.display = 'block';
//                     imgLink.href = `${file.domain}/${file.s_f_name}.${file.f_ext}`;
//                 } else {
//                     // 그 외 파일(첨부파일) 처리
//                     const fileBox = replyElement.querySelector('.cmt_filebox');
//                     const fileNameElement = fileBox.querySelector('.file_name');
//                     const fileSizeElement = fileBox.querySelector('.file_size');
//                     const fileDownloadButton = fileBox.querySelector('#file_down');

//                     fileNameElement.textContent = file.o_f_name;
//                     fileSizeElement.textContent = `(${file.f_size})`;
//                     fileBox.style.display = 'block';

//                     fileDownloadButton.addEventListener('click', () => {
//                         window.open(`${file.domain}/${file.s_f_name}.${file.f_ext}`, '_blank');
//                     });
//                 }
//             });
//         }

//         const moreBtn = replyElement.querySelector('.more_btn');
//         moreBtn.addEventListener('click', () => showCommentMenu(reply.user_name || 'Unknown User', reply.rp_content || ''));

//         // 답글 이미지 추가 (import된 이미지를 사용)
//         const replyImgWrap = replyElement.querySelector('.reply_img_wrap');
//         const replyImg = document.createElement('img');
//         replyImg.src = replyIcon;  // import한 답댓글 아이콘 이미지 사용
//         replyImg.alt = 'Reply Icon';
//         replyImgWrap.appendChild(replyImg);
//     });
// }

function renderReplyComments(replyComments) {
    const commentsWrap = document.querySelector('.cmt_wrap');

    replyComments.forEach(reply => {
        // 하위 댓글의 내용이 없으면 건너뛰기
        if (!reply.rp_content) return;

        const replyElement = document.createElement('div');
        replyElement.classList.add('cmt_item');
        replyElement.setAttribute('data-comment-id', reply.rp_idx); // 대댓글 ID를 data-comment-id 속성으로 설정

        // 하위 댓글에 depth에 따라 들여쓰기 적용
        const depthIndent = reply.depth * 20; // depth에 따라 20px씩 들여쓰기
        replyElement.style.paddingLeft = `${depthIndent}px`;

        if(reply.del_yn === 'Y') {
            replyElement.innerHTML = `
            <div class="deleted_reply">
                <p>삭제된 댓글입니다.</p>
            </div>
        `;
        } else {
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
        }
       

        // 독립적으로 댓글을 .cmt_wrap에 추가
        commentsWrap.appendChild(replyElement);

        // ㄴ 모양의 아이콘 추가 (import한 아이콘 이미지 사용)
   // ㄴ 모양의 아이콘 추가 (import한 아이콘 이미지 사용)
        const replyImgWrap = replyElement.querySelector('.reply_img_wrap');
        if (replyImgWrap) {  // reply_img_wrap가 존재하는지 확인
            const replyImg = document.createElement('img');
            replyImg.src = replyIcon;  // import된 ㄴ 아이콘 이미지
            replyImg.alt = 'Reply Icon';
            replyImgWrap.appendChild(replyImg);
        } else {
            console.error('reply_img_wrap 요소를 찾을 수 없습니다.');
        }

        // 첨부파일 처리
        if (reply.첨부파일 && reply.첨부파일.length > 0) {
            reply.첨부파일.forEach(file => {
                const isImage = ['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(file.f_ext.toLowerCase());

                if (isImage) {
                    const imgBox = replyElement.querySelector('.cmt_imgbox');
                    const imgLink = imgBox.querySelector('.cmt_img_link');
                    const imgTag = imgBox.querySelector('.image');

                    imgTag.src = `${file.domain}/${file.s_f_name}.${file.f_ext}`;
                    imgBox.style.display = 'block';
                    imgLink.href = `${file.domain}/${file.s_f_name}.${file.f_ext}`;
                } else {
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


        if(reply.del_yn === 'N') {
            const moreBtn = replyElement.querySelector('.more_btn');
            moreBtn.addEventListener('click', () => {
                // 대댓글 요소에서 필요한 데이터 추출
                selectedCommentId = reply.rp_idx;  // 대댓글 ID
                selectedGroupId = reply.rp_g_idx || reply.rp_idx;  // 그룹 ID (최상위 댓글 ID)
                selectedDepth = reply.depth || 0;  // 대댓글의 depth
                selectedUserId = reply.user_idx; // 댓글 작성자의 user_idx
        
              // 더보기 메뉴 표시
              showCommentMenu(reply.user_name || 'Unknown User', reply.rp_content || '');
        
              console.log('선택된 대댓글 정보:', { selectedCommentId, selectedGroupId, selectedDepth });
            });
        }

       // 재귀적으로 하위 댓글 렌더링
       if (reply.하위댓글 && reply.하위댓글.length > 0) {
        renderReplyComments(reply.하위댓글); // 하위 댓글 재귀적으로 처리
        }
    });
}

// 더보기 메뉴 표시 함수
function showCommentMenu(userName, commentContent, existingFile) {
    const overlay = document.querySelector('.overlay');
    const cmtMenu = document.querySelector('.cmt_menu');
    
    cmtMenu.innerHTML = `
        <div class="cmt_menu_wrap">
            <ul>
                <li class="reply_menu" data-user-name="${userName}">답댓글</li>
                <li class="edit_menu">수정</li>
                <li class="copy_menu">복사</li>
                <li class="delete_menu">삭제</li>
                <li class="cancel_menu">취소</li>
            </ul>
        </div>
    `;

    overlay.style.display = 'block';
    cmtMenu.style.display = 'block';

    document.querySelector('.edit_menu').addEventListener('click', () => {
        hideOverlayAndMenu();
        showEditForm(commentContent, selectedCommentId, selectedUserId, existingFile); // 댓글 ID와 유저 ID를 전달
    });


    document.querySelector('.copy_menu').addEventListener('click', () => {
        navigator.clipboard.writeText(commentContent).then(() => alert('복사되었습니다.'));
        hideOverlayAndMenu();
    });

    document.querySelector('.cancel_menu').addEventListener('click', hideOverlayAndMenu);

    document.querySelector('.reply_menu').addEventListener('click', () => {
        isReply = true;
        parentComment = { cm_idx: selectedCommentId, rp_g_idx: selectedGroupId, depth: selectedDepth }; // 대댓글의 부모 댓글 정보 저장
        hideOverlayAndMenu();
        showReplyWrite(userName);

        console.log('리플머냐',isReply);
    });

       // 삭제 기능
       document.querySelector('.delete_menu').addEventListener('click', () => {
        removeComment(selectedCommentId, selectedUserId); // 선택된 댓글 ID를 넘겨서 삭제 처리
        console.log('dd', selectedCommentId, selectedUserId);
        hideOverlayAndMenu(); // 메뉴 닫기
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
    replyMention.style.display = 'none'; // 답댓글 창 숨기기
    document.getElementById('commentTextArea').value = ''; // 텍스트 초기화
    isReply = false; // 일반 댓글 상태로 변경
    parentComment = null; // 부모 댓글 정보 초기화
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

// 수정 폼 표시 함수
function showEditForm(commentContent, commentIdx, userId, existingFile) {
    const targetComment = document.querySelector(`.cmt_item[data-comment-id="${commentIdx}"]`);

    if (!targetComment) {
        console.error(`댓글 ID ${commentIdx}에 해당하는 댓글을 찾을 수 없습니다.`);
        return;
    }

    // 기존 파일 정보를 제대로 가져왔는지 확인
    const file = Array.isArray(existingFile) ? existingFile[0] : existingFile;

    console.log('기존파일 파일파일', file);

    // 기존 파일이 있으면 파일 UI를 표시
    let fileUI = '';
    if (file) {
        const isImage = ['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(file.f_ext.toLowerCase());
        if (isImage) {
            fileUI = `
                <div class="thumb_box">
                    <div class="img_cover">
                        <span class="thumbnail"><img src="${file.domain}/${file.s_f_name}.${file.f_ext}" alt="첨부 이미지" class="thumbnail-img"/></span>
                        <button id="removeFileBtn" class="remove_img" data-file-idx="${file.f_idx}">삭제</button>
                    </div>
                </div>
            `;
        } else {
            fileUI = `
                <div class="file_cover">
                    <div class="file_box">
                        <span class="fine_name">
                            <i class="file_name_img"></i>
                            <button type="button" class="file_name_text">${file.o_f_name}</button>
                        </span>
                        <span class="file_size">(${file.f_size})</span>
                        <button id="removeFileBtn" class="remove_img" data-file-idx="${file.f_idx}">삭제</button>
                    </div>
                </div>
            `;
        }
    }

    // 수정 UI의 HTML 구조를 업데이트
    const editFormHTML = `
        <div class="modify_write">
            <div class="modify_textarea">
                <textarea id="modifyCmtTextArea">${commentContent}</textarea>
            </div>
            ${fileUI}
            <div class="attach_area"></div> <!-- 파일 미리보기 영역 -->
            <div class="modify_cmt_bottom">
                <input type="file" id="modify_cmt_input" multiple style="display:none">
                <button class="mcmt_pic_wrap" id="m_fileButton">파일</button>
                <div class="cmt_reg">
                    <span>0/600</span>
                    <button id="submitModify">수정</button>
                    <button id="submitCancel">취소</button>
                </div>
            </div>
        </div>
    `;

    targetComment.innerHTML = editFormHTML;

    // 파일 선택창 열기
    document.getElementById('m_fileButton').addEventListener('click', () => {
        document.getElementById('modify_cmt_input').click();
    });

    // 파일 선택 시 처리
    document.getElementById('modify_cmt_input').addEventListener('change', (event) => {
        console.log('파일 선택됨', event);
        handleModifyFileChange(event, file);
    });

    // 수정 버튼 클릭 시 수정된 댓글을 서버에 전송
    document.getElementById('submitModify').addEventListener('click', () => {
        const editedContent = document.getElementById('modifyCmtTextArea').value;
        const newFile = document.getElementById('modify_cmt_input').files[0];
        // 파일 삭제 상태와 함께 서버로 전송
        saveEditedComment(commentIdx, userId, editedContent, newFile, fileDeleted);
    });

    // 취소 버튼 클릭 시 수정 취소
    document.getElementById('submitCancel').addEventListener('click', () => cancelEdit(postIdx));

    // 파일 삭제 버튼 클릭 시 처리
    const removeFileBtn = document.querySelector('#removeFileBtn');
    if (removeFileBtn) {
        removeFileBtn.addEventListener('click', () => {
            const fileIdx = removeFileBtn.getAttribute('data-file-idx'); // 파일 ID 가져오기
            deleteFile(fileIdx).then(success => {
                if (success) {
                    removeFileBtn.closest('.thumb_box, .file_cover').remove(); // 파일 UI 삭제
                }
            });
        });
    }
}

// 수정 창 전용 파일 선택 시 처리 함수
function handleModifyFileChange(event, existingFile) {
    const file = event.target.files[0];
    if (!file) return;

    console.log('파일존재해?',existingFile);

    const fileType = file.type;
    const fileSize = (file.size / 1024).toFixed(2) + 'KB';
    const attachArea = document.querySelector('.modify_write .attach_area'); // 수정 창의 attach_area

    // 기존 파일 UI 삭제
    const existingFileUI = document.querySelector('.thumb_box, .file_cover'); // 기존 파일 UI를 선택
    if (existingFileUI) {
        existingFileUI.remove(); // 기존 파일 UI 삭제
    }
    

      
    // 기존 파일이 있으면 서버에 삭제 요청 보내기
    if (existingFile && existingFile.f_idx) {
        deleteFile(existingFile.f_idx).then(success => {
            if (success) {
                console.log('서버에서 기존 파일 삭제 완료');
                fileDeleted = true; // 기존 파일이 삭제되었음을 표시
            } else {
                console.error('기존 파일 삭제 실패');
            }
        });
    }


    // 파일이 이미지인지 확인
    if (fileType.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const imgElement = document.createElement('div');
            imgElement.classList.add('thumb_box');
            imgElement.innerHTML = `
                <div class="img_cover">
                    <span class="thumbnail"><img src="${e.target.result}" alt="첨부 이미지" class="thumbnail-img"/></span>
                    <button id="removeFileBtn" class="remove_img">삭제</button>
                </div>
            `;
            attachArea.innerHTML = ''; // 기존의 미리보기 영역 초기화
            attachArea.appendChild(imgElement);


               // 기존 서버 파일 삭제 (서버에 기존 파일이 있으면 삭제 처리)
               if (existingFile && existingFile.file_idx) {
                deleteFile(existingFile.file_idx).then(success => {
                    if (success) {
                        console.log('서버에서 기존 파일 삭제 완료');
                        fileDeleted = true; // 기존 파일이 삭제되었음을 표시
                    }
                });
            }

            // 삭제 버튼 이벤트 리스너 추가 (UI에서만 삭제)
            const removeFileBtn = imgElement.querySelector('#removeFileBtn');
            removeFileBtn.addEventListener('click', () => {
                imgElement.remove(); // UI에서 파일 삭제
            });
        };
        reader.readAsDataURL(file);
    } else {
        // 이미지가 아닐 경우 file_cover에 파일 이름 및 사이즈 표시
        const fileBox = document.createElement('div');
        fileBox.classList.add('file_cover');
        fileBox.innerHTML = `
            <div class="file_box">
                <span class="fine_name">
                    <i class="file_name_img"></i>
                    <button type="button" class="file_name_text">${file.name}</button>
                </span>
                <span class="file_size">(${fileSize})</span>
                <button id="removeFileBtn" class="remove_img">삭제</button>
            </div>
        `;
        attachArea.innerHTML = ''; // 기존의 미리보기 영역 초기화
        attachArea.appendChild(fileBox);

        // 삭제 버튼 이벤트 리스너 추가 (UI에서만 삭제)
        const removeFileBtn = fileBox.querySelector('#removeFileBtn');
        removeFileBtn.addEventListener('click', () => {
            fileBox.remove(); // UI에서 파일 삭제
            fileDeleted = true; // 새 파일 삭제
        });
    }
}




// 수정된 댓글을 서버로 전송하는 함수
function saveEditedComment(commentIdx, userId, newContent, postIdx) {

    const postidx = localStorage.getItem('postIdx');
    const token = localStorage.getItem('accessToken'); // 토큰 가져오기

    console.log('게시글아이디', postidx);

    const file = document.querySelector('#modify_cmt_input').files[0];
    const isComment = selectedDepth === 1 ? 'top' : 'sub'; 
    
    // 폼데이터 생성
    const formData = new FormData();
    
    formData.append('content', newContent);
    formData.append('idx', commentIdx);
    formData.append('userIdx', userId);

    // 파일이 있는 경우에만 formData에 파일을 추가
    if (file) {
        formData.append('file', file);
    }

    // 폼데이터 내용을 확인하는 방법
    console.log('폼데이터 내용:');
    formData.forEach((value, key) => {
    console.log(key + ':', value);
    });

    axios.put(`http://192.168.0.18:28888/with/edit_comment/${isComment}`, formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
    }
    })
    .then(response => {
        if (response.status === 200) {
            console.log('댓글 수정 성공:', response.data);
            loadComments(postidx); // 댓글 다시 불러오기
        }
    })
    .catch(error => {
    console.error('댓글 생성 오류:', error);
    });
}

// 수정 취소 함수
function cancelEdit(postIdx) {
    // 기존 댓글 뷰로 복원
    loadComments(postIdx);
}

// 수정 폼에서 파일 샂게 함수 
function deleteFile(fileIdx) {
    const token = localStorage.getItem('accessToken');
    
    console.log('파일 삭제 요청 보냄:', fileIdx); // 삭제 요청 전 로그 추가


    return axios.delete(`http://192.168.0.18:28888/file/delete/${fileIdx}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        if (response.status === 200) {
            console.log('파일 삭제 성공:', response.data);
            return true; // 파일 삭제 성공
        }
    })
    .catch(error => {
        console.error('파일 삭제 오류:', error);
        return false; // 파일 삭제 실패
    });
}

// 댓글 삭ㅈ ㅔ함수 
function removeComment(comment_idx, commentUserIdx) {
    const token = localStorage.getItem('accessToken');

    console.log('삭제 요청됨:', comment_idx, commentUserIdx);

    // 댓글인지 대댓글인지 구분하는 로직
    const isComment = selectedDepth === 1 ? 'top' : 'sub'; 

    // JSON 형태의 데이터 준비
    const data = [{
        comment_idx: comment_idx,
        userIdx: Number(commentUserIdx)  // userIdx를 숫자로 변환
    }];

    // 전송할 데이터를 콘솔에 출력
    console.log('전송할 데이터:', JSON.stringify(data));

    // axios.request로 DELETE 요청과 함께 데이터 전송
    axios.request({
        url: `http://192.168.0.18:28888/with/del_comment/${isComment}`,
        method: 'delete',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        data: data  // delete 메서드로 본문에 데이터를 보내려면 request를 사용
    })
    .then(response => {
        if (response.status === 200) {
            console.log('삭제성공!');
            loadComments(postIdx); // 댓글 다시 불러오기
        }
    })
    .catch(error => {
        console.error('댓글 삭제 오류:', error);
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

    const replyMention = document.querySelector('.reply_mention');


   // 댓글 등록
    const submitCommentButton= document.getElementById('submitComment');
    const cmtTextarea = document.querySelector('#commentTextArea');


    submitCommentButton.addEventListener('click', ()=> {
        if (isReply) {
            addSubComment(parentComment); // 대댓글 작성
        } else {
            addComment(); // 일반 댓글 작성
        }
        resetReplyState(); // 상태 초기화

        console.log('isreply멀까나 맞춰봐 뭐게',isReply);
    });

      // 댓글/대댓글 상태 초기화
      function resetReplyState() {
        isReply = false;
        parentComment = null;
        cmtTextarea.value = ''; // 텍스트 입력 초기화
        fileInputComment.value = ''; // 파일 입력 초기화
        document.querySelector('.attach_area').style.display = 'none'; // 파일 첨부 창 숨기기
        hideReplyWrite();  // 답댓글 창 숨기기
    }
    
    // 상위 댓글 등록 함수
    function addComment() {
        const isComment = 'top';
        const token = localStorage.getItem('accessToken');
        const cm_content = cmtTextarea.value.trim();
        const file = document.querySelector('#fileInputComment').files[0];
        
        // 폼데이터 생성
        const formData = new FormData();
        
        formData.append('cm_content', cm_content);

           // 파일이 있는 경우에만 formData에 파일을 추가
           if(file) {
            formData.append('file', file);
        }
        
   // 폼데이터 내용을 확인하는 방법
   console.log('폼데이터 내용:');
   formData.forEach((value, key) => {
       console.log(key + ':', value);
   });

   axios.post(`http://192.168.0.18:28888/with/post/${isComment}/${postIdx}/add_comment`, formData, {
       headers: {
           'Content-Type': 'multipart/form-data',
           'Authorization': `Bearer ${token}`
       }
   })
   .then(response => {
        if (response.status === 200) {
            loadComments(postIdx); // 댓글 다시 불러오기
        }
   })
   .catch(error => {
       console.error('댓글 생성 오류:', error);
   });
}

function addSubComment(parentComment) {

    const isComment = 'sub';
    const token = localStorage.getItem('accessToken');
    const rp_content = cmtTextarea.value.trim();
    const file = document.querySelector('#fileInputComment').files[0];

    const rp_p_idx = parentComment.cm_idx;  // 부모 댓글 ID
    const rp_g_idx = parentComment.rp_g_idx || parentComment.cm_idx;  // 그룹 ID (최상위 댓글 ID)
    const rp_depth = parentComment.depth + 1;  // 부모 댓글의 depth + 1

   // 폼데이터 생성
   const formData = new FormData();

   // 파일이 있는 경우에만 formData에 파일을 추가
   if(file) {
       formData.append('file', file);
   }
   
   formData.append('rp_content', rp_content);
   formData.append('rp_depth', rp_depth);
   formData.append('rp_p_idx', rp_p_idx);
   formData.append('rp_g_idx', rp_g_idx);

      // 폼데이터 내용을 확인하는 방법
      console.log('대댓글 폼데이터 내용:');
      formData.forEach((value, key) => {
          console.log(key + ':', value);
      });


      axios.post(`http://192.168.0.18:28888/with/post/${isComment}/${postIdx}/add_comment`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (response.status === 200) {
            console.log(response);
            console.log('생성됫어');
            loadComments(postIdx); // 댓글 다시 불러오기
            resetReplyState(); // 상태 초기화 후 답댓글 창 숨기기
        }
    })
    .catch(error => {
        console.error('대댓글 등록 오류:', error);
    });

}

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
        //    textarea.addEventListener('blur', () => {
        //      textarea.value = ''; // 텍스트 초기화
        //      span.textContent = `0/${maxChars}`; // 글자 수 초기화
        //  });
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

 // 파일 삭제 버튼 클릭 시 파일 UI에서 삭제하고 fileDeleted를 true로 설정
document.getElementById('removeFileBtn').addEventListener('click', () => {
    document.querySelector('.thumb_box').remove(); // 파일 UI 삭제
    fileDeleted = true; // 파일이 삭제되었음을 표시
});


 // 댓글 목록 불러오기
 function loadComments(postIdx) {

    
    console.log('왜안나오는데', postIdx);
    const token = localStorage.getItem('accessToken');
    
    return axios.get(`http://192.168.0.18:28888/with/post/${postIdx}/commentList`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then(response => {
        const commentsData = response.data.data;
        renderComments(commentsData);  // 상위 댓글 렌더
  
    })
    .catch(error => {
        console.error('댓글 목록 불러오기 오류:', error);
    });
}
