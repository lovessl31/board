// // CSS 및 Bootstrap 관련 파일 임포트
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap';
// import 'jquery';
// import '@popperjs/core';
// import './styles/main.scss'; 
// import './styles/reset.css'; 

// // 이미지 파일 임포트
// import hamImage from './img/ham.svg';
// import boardIcon from './img/boardIcon.svg'; 
// import viewList from './img/view_list.svg';
// import feedView from './img/view_feed.svg';
// import albumView from './img/view_album.svg';
// import write_img from './img/Pencil.svg';
// import exImg2 from './img/eximg2.jpg';
// import heart from './img/heart.svg';
// import noheart from './img/no_heart.svg';
// import cmt from './img/comment.svg';


// // 게시글 목록 데이터
// // const posts = [
// //   {
// //     title: "개발팀 회의록",
// //     author: "이재훈",
// //     date: "2024-08-27",
// //     views: 120,
// //     comments: 4,
// //     likes: 15,
// //     likedByUser: true,
// //     image: exImg2,
// //     content: "개발팀 회의에서 결정된 주요 사항입니다. 각자 담당 업무를 다시 확인해 주세요. 확인 후 제 메일로 업무 보고서 보내주시면 됩니다. 이번주 내로 보내주시기 바랍니다."
// //   },
// //   // 더미 데이터 추가
// //   {
// //     title: "마케팅 전략 발표",
// //     author: "김수진",
// //     date: "2024-08-26",
// //     views: 98,
// //     comments: 2,
// //     likes: 10,
// //     likedByUser: false,
// //     image: null,
// //     content: "다음 주 마케팅 전략 발표를 준비해 주세요. 발표 자료는 공유 드린 폴더에 있습니다."
// //   },
// //   {
// //     title: "경영 지원팀 공지사항",
// //     author: "박민지",
// //     date: "2024-08-25",
// //     views: 75,
// //     comments: 3,
// //     likes: 8,
// //     likedByUser: true,
// //     image: null,
// //     content: "경영 지원팀에서 새로운 공지사항이 있습니다. 자세한 내용은 게시글을 확인해 주세요."
// //   },
// //   {
// //     title: "신제품 출시 준비",
// //     author: "최영수",
// //     date: "2024-08-24",
// //     views: 150,
// //     comments: 6,
// //     likes: 20,
// //     likedByUser: true,
// //     image: exImg2,
// //     content: "신제품 출시 준비가 한창입니다. 모든 팀은 각자의 역할에 집중해 주세요."
// //   },
// //   {
// //     title: "디자인팀 피드백",
// //     author: "장예은",
// //     date: "2024-08-23",
// //     views: 65,
// //     comments: 1,
// //     likes: 7,
// //     image: exImg2,
// //     content: "디자인팀에서 제공한 시안을 검토해 주세요. 피드백을 주시면 감사하겠습니다."
// //   },
// //   {
// //     title: "사업 계획서 초안",
// //     author: "김민호",
// //     date: "2024-08-22",
// //     views: 85,
// //     comments: 5,
// //     likes: 12,
// //     likedByUser: true,
// //     image: null,
// //     content: "사업 계획서 초안을 작성했습니다. 팀원들께서는 검토 후 의견 부탁드립니다."
// //   },
// //   {
// //     title: "프로젝트 일정 공유",
// //     author: "홍지수",
// //     date: "2024-08-21",
// //     views: 112,
// //     comments: 4,
// //     likes: 18,
// //     image: null,
// //     content: "프로젝트 일정이 확정되었습니다. 모든 팀원들께서는 일정에 맞춰 준비해 주세요."
// //   },
// //   {
// //     title: "회계팀 보고서",
// //     author: "윤서준",
// //     date: "2024-08-20",
// //     views: 90,
// //     comments: 3,
// //     likes: 9,
// //     image: null,
// //     content: "회계팀에서 작성한 보고서입니다. 확인 후 필요한 사항이 있으면 말씀해 주세요."
// //   },
// //   {
// //     title: "인사팀 공지",
// //     author: "김나희",
// //     date: "2024-08-19",
// //     views: 130,
// //     comments: 7,
// //     likes: 14,
// //     image: exImg2,
// //     content: "인사팀에서 새로운 공지가 있습니다. 꼭 확인해 주시기 바랍니다."
// //   },
// //   {
// //     title: "고객 피드백 공유",
// //     author: "서지훈",
// //     date: "2024-08-18",
// //     views: 105,
// //     comments: 5,
// //     likes: 11,
// //     image: null,
// //     content: "최근 고객 피드백을 공유합니다. 팀별로 피드백을 참고하여 대응해 주세요."
// //   },
// //   {
// //     title: "팀 빌딩 워크숍",
// //     author: "이하은",
// //     date: "2024-08-17",
// //     views: 70,
// //     comments: 2,
// //     likes: 6,
// //     image: null,
// //     content: "다음 주 팀 빌딩 워크숍 일정입니다. 참석이 필요한 분들은 일정 확인 바랍니다."
// //   },
// //   {
// //     title: "기술 블로그 업데이트",
// //     author: "최유정",
// //     date: "2024-08-16",
// //     views: 95,
// //     comments: 3,
// //     likes: 13,
// //     likedByUser: true,
// //     image: exImg2,
// //     content: "기술 블로그에 새로운 글이 게시되었습니다. 기술에 관심 있는 분들은 확인해 주세요."
// //   }
// // ];

// // 이벤트 및 초기화 설정
// document.addEventListener('DOMContentLoaded', () => {
//   initializePage();  // 페이지 초기화
//   setupEventListeners();  // 이벤트 리스너 설정
// });

// // 페이지 초기화 함수
// function initializePage() {
//   // 로컬 스토리지에서 저장된 뷰 타입 불러오기
//   const savedViewType = localStorage.getItem('selectedViewType') || 'list'; // 기본값은 'list'

//   // 라디오 버튼 선택 및 리스트 초기화
//   document.querySelector(`input[name="viewType"][value="${savedViewType}"]`).checked = true;
//   updateViewImage(savedViewType);
//   populateList(savedViewType);

//   // 사이드 메뉴 및 글쓰기 버튼 초기화
//   addMenuIcon();
//   addWriteButtonImage();

//   // 뷰 선택 메뉴 아이콘 초기화
//   updateViewIcons();
// }

// // 이벤트 리스너 설정 함수
// function setupEventListeners() {
//   // 뷰 타입 변경 이벤트
//   const viewTypeRadios = document.querySelectorAll('input[name="viewType"]');
//   viewTypeRadios.forEach(radio => {
//       radio.addEventListener('change', handleViewChange);
//   });

//   // 사이드 메뉴 열기 이벤트
//   document.getElementById('board_side_menu').addEventListener('click', openSideMenu);
//   document.getElementById('side_menu_overlay').addEventListener('click', closeSideMenu);

//   // 하단 보기 팝업 메뉴 열기 이벤트
//   document.getElementById('view_setting').addEventListener('click', openSettingMenu);
//   document.getElementById('side_menu_overlay').addEventListener('click', closeSettingMenu);

//   // 글쓰기 버튼 클릭 이벤트
//   document.querySelector('.write_pop').addEventListener('click', () => {
//       window.location.href = 'write.html';
//   });
// }

// // 뷰 타입 변경 처리 함수
// function handleViewChange() {
//   const selectedViewType = document.querySelector('input[name="viewType"]:checked').value;
//   localStorage.setItem('selectedViewType', selectedViewType);
//   updateViewImage(selectedViewType);
//   populateList(selectedViewType);
//   closeSettingMenu();
// }

// // 뷰 타입에 따라 이미지 업데이트 함수
// function updateViewImage(viewType) {
//   const viewImageElement = document.querySelector('.board_view img');
//   if (viewImageElement) {
//       viewImageElement.remove();
//   }
//   const newImageElement = document.createElement('img');
//   newImageElement.src = viewType === 'list' ? viewList : viewType === 'feed' ? feedView : albumView;
//   document.querySelector('.board_view').appendChild(newImageElement);
// }

// // 메뉴 아이콘 추가 함수
// function addMenuIcon() {
//   const imgElement = document.createElement('img');
//   imgElement.src = hamImage;
//   document.querySelector('.top_title div').appendChild(imgElement);
// }

// // 글쓰기 버튼에 이미지 추가 함수
// function addWriteButtonImage() {
//   const writePopImg = document.createElement('img');
//   writePopImg.src = write_img;
//   document.querySelector('.write_pop button').appendChild(writePopImg);
// }

// import axios from 'axios';

// axios.get('/boards.json')
//   .then(response => {
//     const allSubCategories = response.data.data.flatMap(category => category.sub_category);
//     console.log('All Sub Categories:', allSubCategories);
//     populateBoardList(allSubCategories); // 모든 서브 카테고리 데이터를 사용해 리스트를 초기화합니다.
//   })
//   .catch(error => {
//     console.error('Error fetching the JSON', error);
//   });

// // 게시판 동적으로 생성 함수
// function populateBoardList(allSubCategories) {
//   const boardListWrap = document.querySelector('.board_list_wrap');

//   allSubCategories.forEach((category) => {
//     // 카테고리 제목 생성
//     const boardItem = document.createElement('div');
//     boardItem.className = 'board_item';

//     const cateTit = document.createElement('div');
//     cateTit.className = 'cate_tit';
//     cateTit.innerHTML = `<h2>${category.s_cate_name}</h2>`;
//     boardItem.appendChild(cateTit);

//     // 게시판 리스트 생성
//     const boardList = document.createElement('ul');
//     boardList.className = 'board_list';

//     category.board.forEach(board => {
//       const listItem = document.createElement('li');
//       const span = document.createElement('span');
//       const listIcon = document.createElement('img');
//       listIcon.src = boardIcon; // 게시판 아이콘 경로 설정
//       span.appendChild(listIcon);

//       const link = document.createElement('a');
//       link.href = '#'; // 기본 링크는 빈 값으로 설정
//       link.textContent = board.board_name;

//       // 클릭 이벤트 리스너 추가
//       link.addEventListener('click', function(event) {
//         event.preventDefault(); // 기본 동작 방지
//         goToDetail(board.board_idx); // goToDetail 함수 호출
//       });

//       listItem.appendChild(span);
//       listItem.appendChild(link);
//       boardList.appendChild(listItem);
//     });

//     boardItem.appendChild(boardList);
//     boardListWrap.appendChild(boardItem);
//   });
// }

// function goToDetail(boardIdx) {
//   // detail.html로 이동하면서 boardIdx를 URL 파라미터로 전달
//   window.location.href = `index.html?boardIdx=${encodeURIComponent(boardIdx)}`;
// }


// // 하단 보기 메뉴 아이콘 추가 함수
// function updateViewIcons() {
//   const spanElements = document.querySelectorAll('#setting_menu .setting_item span');

//   spanElements.forEach((span, index) => {
//     const imgElement = document.createElement('img');

//     if (index === 0) {
//         imgElement.src = viewList;
//     } else if (index === 1) {
//         imgElement.src = feedView;
//     } else if (index === 2) {
//         imgElement.src = albumView;
//     }

//     span.appendChild(imgElement);
//   });
// }

// // 사이드 메뉴 열기
// function openSideMenu() {
//   document.getElementById('side_menu').classList.add('open');
//   document.getElementById('side_menu_overlay').classList.add('show');
// }

// // 사이드 메뉴 닫기
// function closeSideMenu() {
//   document.getElementById('side_menu').classList.remove('open');
//   document.getElementById('side_menu_overlay').classList.remove('show');
// }

// // 하단 보기 팝업 메뉴 열기
// function openSettingMenu() {
//   const settingMenu = document.getElementById('setting_menu');
//   document.getElementById('side_menu_overlay').classList.add('show');
//   settingMenu.classList.add('show');
// }

// // 하단 보기 팝업 메뉴 닫기
// function closeSettingMenu() {
//   document.getElementById('setting_menu').classList.remove('show');
//   document.getElementById('side_menu_overlay').classList.remove('show');
// }

// // 리스트 아이템 생성 함수
// function createListItem(post) {
//   const listItem = document.createElement('div');
//   listItem.className = 'list_item';

//   const imagePreview = post.image ? `
//       <div class="image_preview">
//           <img src="${post.image}" alt="Preview Image">
//       </div>` : '';

//   listItem.innerHTML = `
//       <div>
//           <div class="left_list">
//               ${imagePreview}
//               <div class="content_preview">
//                   <h3><a href="#">${post.title}</a></h3>
//                   <ul>
//                       <li>${post.author}</li>
//                       <li>${post.date}</li>
//                       <li>조회 ${post.views}</li>
//                   </ul>
//               </div>
//           </div>
//       </div>
//       <div class="right_list">
//           <button>
//               <p>${post.comments}</p>
//               <span>댓글</span>
//           </button>
//       </div>
//   `;

//   return listItem;
// }

// // 피드형 아이템 생성 함수
// function createFeedItem(post) {
//   const feedItem = document.createElement('div');
//   feedItem.className = 'feed_item';

//   const feedImage = post.image ? `
//       <div class="feed_img_wrap">
//           <img src="${post.image}" alt="Feed Image">
//       </div>` : '';

//   feedItem.innerHTML = `
//       <div class="feed_tit">
//           <p>${post.author}</p>
//           <span>${post.date}</span>
//       </div>
//       <div class="feed_content">
//           <h3>${post.title}</h3>
//           <div class="content_wrap">
//               <p>${post.content}</p>
//           </div>
//       </div>
//       ${feedImage}
//       <div class="feed_bottom">
//           <div class="d-flex align-items-center">
//               <div class="mright d-flex align-items-center">
//                   <button class="heart d-flex align-items-center"></button>
//                   <button>${post.likes}</button>
//               </div>
//               <div class="d-flex align-items-center">
//                   <button class="cmt d-flex align-items-center"></button>
//                   <button>${post.comments}</button>
//               </div>
//           </div>
//           <span>조회 ${post.views}</span>
//       </div>
//   `;

//   const heartButton = feedItem.querySelector('.heart');
//   const heartImg = document.createElement('img');
//   heartImg.src = post.likedByUser ? heart : noheart;
//   heartButton.appendChild(heartImg);

//   const cmtButton = feedItem.querySelector('.cmt');
//   const cmtImg = document.createElement('img');
//   cmtImg.src = cmt;
//   cmtButton.appendChild(cmtImg);

//   heartButton.addEventListener('click', () => {
//       post.likedByUser = !post.likedByUser;
//       heartImg.src = post.likedByUser ? heart : noheart;
//       post.likes += post.likedByUser ? 1 : -1;
//       heartButton.nextElementSibling.textContent = post.likes;
//   });

//   return feedItem;
// }

// // 앨범형 아이템 생성 함수
// function createAlbumItem(post) {
//   if (!post.image) return null;

//   const albumItem = document.createElement('div');
//   albumItem.className = 'album_item';

//   const albumImg = document.createElement('div');
//   albumImg.className = 'album_img';
//   const imgElement = document.createElement('img');
//   imgElement.src = post.image;
//   imgElement.alt = 'Album Image';
//   albumImg.appendChild(imgElement);

//   const albumContent = document.createElement('div');
//   albumContent.className = 'album_content';
//   albumContent.innerHTML = `
//       <h3><a href="detail.html">${post.title}</a></h3>
//       <p>${post.author}</p>
//   `;

//   const albumBottom = document.createElement('div');
//   albumBottom.className = 'album_bottom';

//   const dateSpan = document.createElement('span');
//   dateSpan.textContent = post.date;

//   const commentButton = document.createElement('button');
//   const commentImg = document.createElement('img');
//   commentImg.src = cmt;
//   commentImg.alt = 'Comment Icon';
//   commentButton.appendChild(commentImg);
//   commentButton.appendChild(document.createTextNode(post.comments));

//   albumBottom.appendChild(dateSpan);
//   albumBottom.appendChild(commentButton);

//   albumContent.appendChild(albumBottom);
//   albumItem.appendChild(albumImg);
//   albumItem.appendChild(albumContent);

//   return albumItem;
// }

// // 앨범 리스트 추가 함수
// function populateAlbum() {
//   const listContainer = document.getElementById('content_view');
//   listContainer.innerHTML = '';

//   const albumContainer = document.createElement('div');
//   albumContainer.className = 'album_container';

//   posts.forEach(post => {
//       const albumItem = createAlbumItem(post);
//       if (albumItem) {
//           albumContainer.appendChild(albumItem);
//       }
//   });

//   listContainer.appendChild(albumContainer);
// }

// // 리스트 추가 함수
// function populateList(viewType = 'list') {
//   const listContainer = document.getElementById('content_view');
//   listContainer.innerHTML = '';

//   if (viewType === 'album') {
//       populateAlbum();
//   } else {
//       posts.forEach(post => {
//           let listItem;
//           if (viewType === 'list') {
//               listItem = createListItem(post);
//           } else if (viewType === 'feed') {
//               listItem = createFeedItem(post);
//           }
//           if (listItem) {
//               listContainer.appendChild(listItem);
//           }
//       });
//   }
// }


// CSS 및 Bootstrap 관련 파일 임포트
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'jquery';
import '@popperjs/core';
import './styles/main.scss'; 
import './styles/reset.css'; 

// 이미지 파일 임포트
import hamImage from './img/ham.svg';
import boardIcon from './img/boardIcon.svg'; 
import viewList from './img/view_list.svg';
import feedView from './img/view_feed.svg';
import albumView from './img/view_album.svg';
import write_img from './img/Pencil.svg';
import exImg2 from './img/eximg2.jpg';
import heart from './img/heart.svg';
import noheart from './img/no_heart.svg';
import cmt from './img/comment.svg';


import axios from 'axios';

// 게시글 목록 데이터
// const posts = [
//   {
//     title: "개발팀 회의록",
//     author: "이재훈",
//     date: "2024-08-27",
//     views: 120,
//     comments: 4,
//     likes: 15,
//     likedByUser: true,
//     image: exImg2,
//     content: "개발팀 회의에서 결정된 주요 사항입니다. 각자 담당 업무를 다시 확인해 주세요. 확인 후 제 메일로 업무 보고서 보내주시면 됩니다. 이번주 내로 보내주시기 바랍니다."
//   },
//   // 더미 데이터 추가
//   {
//     title: "마케팅 전략 발표",
//     author: "김수진",
//     date: "2024-08-26",
//     views: 98,
//     comments: 2,
//     likes: 10,
//     likedByUser: false,
//     image: null,
//     content: "다음 주 마케팅 전략 발표를 준비해 주세요. 발표 자료는 공유 드린 폴더에 있습니다."
//   },
//   {
//     title: "경영 지원팀 공지사항",
//     author: "박민지",
//     date: "2024-08-25",
//     views: 75,
//     comments: 3,
//     likes: 8,
//     likedByUser: true,
//     image: null,
//     content: "경영 지원팀에서 새로운 공지사항이 있습니다. 자세한 내용은 게시글을 확인해 주세요."
//   },
//   {
//     title: "신제품 출시 준비",
//     author: "최영수",
//     date: "2024-08-24",
//     views: 150,
//     comments: 6,
//     likes: 20,
//     likedByUser: true,
//     image: exImg2,
//     content: "신제품 출시 준비가 한창입니다. 모든 팀은 각자의 역할에 집중해 주세요."
//   },
//   {
//     title: "디자인팀 피드백",
//     author: "장예은",
//     date: "2024-08-23",
//     views: 65,
//     comments: 1,
//     likes: 7,
//     image: exImg2,
//     content: "디자인팀에서 제공한 시안을 검토해 주세요. 피드백을 주시면 감사하겠습니다."
//   },
//   {
//     title: "사업 계획서 초안",
//     author: "김민호",
//     date: "2024-08-22",
//     views: 85,
//     comments: 5,
//     likes: 12,
//     likedByUser: true,
//     image: null,
//     content: "사업 계획서 초안을 작성했습니다. 팀원들께서는 검토 후 의견 부탁드립니다."
//   },
//   {
//     title: "프로젝트 일정 공유",
//     author: "홍지수",
//     date: "2024-08-21",
//     views: 112,
//     comments: 4,
//     likes: 18,
//     image: null,
//     content: "프로젝트 일정이 확정되었습니다. 모든 팀원들께서는 일정에 맞춰 준비해 주세요."
//   },
//   {
//     title: "회계팀 보고서",
//     author: "윤서준",
//     date: "2024-08-20",
//     views: 90,
//     comments: 3,
//     likes: 9,
//     image: null,
//     content: "회계팀에서 작성한 보고서입니다. 확인 후 필요한 사항이 있으면 말씀해 주세요."
//   },
//   {
//     title: "인사팀 공지",
//     author: "김나희",
//     date: "2024-08-19",
//     views: 130,
//     comments: 7,
//     likes: 14,
//     image: exImg2,
//     content: "인사팀에서 새로운 공지가 있습니다. 꼭 확인해 주시기 바랍니다."
//   },
//   {
//     title: "고객 피드백 공유",
//     author: "서지훈",
//     date: "2024-08-18",
//     views: 105,
//     comments: 5,
//     likes: 11,
//     image: null,
//     content: "최근 고객 피드백을 공유합니다. 팀별로 피드백을 참고하여 대응해 주세요."
//   },
//   {
//     title: "팀 빌딩 워크숍",
//     author: "이하은",
//     date: "2024-08-17",
//     views: 70,
//     comments: 2,
//     likes: 6,
//     image: null,
//     content: "다음 주 팀 빌딩 워크숍 일정입니다. 참석이 필요한 분들은 일정 확인 바랍니다."
//   },
//   {
//     title: "기술 블로그 업데이트",
//     author: "최유정",
//     date: "2024-08-16",
//     views: 95,
//     comments: 3,
//     likes: 13,
//     likedByUser: true,
//     image: exImg2,
//     content: "기술 블로그에 새로운 글이 게시되었습니다. 기술에 관심 있는 분들은 확인해 주세요."
//   }
// ];

let postsData = []; // 전역 변수로 posts 데이터를 저장할 배열
let allSubCategories = []; // 전역 변수로 allSubCategories를 저장

// 이벤트 및 초기화 설정
document.addEventListener('DOMContentLoaded', () => {
  const postsRequest = axios.get('/all_posts.json')
    .then(response => {
      postsData = response.data.data;
      if (postsData.length > 0) {
        console.log('Posts data loaded:', postsData);
      } else {
        console.log("No posts data available.");
      }
    })
    .catch(error => {
      console.error('Error fetching the JSON', error);
    });

  const boardsRequest = axios.get('/boards.json')
    .then(response => {
      allSubCategories = response.data.data.flatMap(category => category.sub_category);
      console.log('All Sub Categories:', allSubCategories);
      populateBoardList(allSubCategories);
    })
    .catch(error => {
      console.error('Error fetching the JSON', error);
    });

  // 두 요청이 모두 완료된 후 initializePage 호출
  Promise.all([postsRequest, boardsRequest]).then(() => {
    console.log('Both requests completed. Initializing page.');
    initializePage();
  }).catch(error => {
    console.error('Error in one of the requests:', error);
  });



});

function initializePage() {
  // 로컬 스토리지에서 저장된 뷰 타입 불러오기
  const savedViewType = localStorage.getItem('selectedViewType') || 'list'; // 기본값은 'list'

  // 라디오 버튼 선택 및 리스트 초기화
  document.querySelector(`input[name="viewType"][value="${savedViewType}"]`).checked = true;
  updateViewImage(savedViewType);

  // URL에서 boardIdx 파라미터 가져오기
  const urlParams = new URLSearchParams(window.location.search);
  const boardIdx = urlParams.get('boardIdx');

  console.log("boardIdx:", boardIdx); // 디버깅 로그 추가

  if (boardIdx) {
    configureTabsForBoard();
    // 특정 게시판의 게시글만 필터링
    const filteredPosts = postsData.filter(post => post.board_idx === parseInt(boardIdx));
    populateList(savedViewType, filteredPosts);

    // 해당 게시판의 이름을 찾아서 설정
    const boardName = findBoardNameById(boardIdx);
    console.log("Board Name:", boardName); // 디버깅 로그 추가

    if (boardName) {
      const h3Element = document.querySelector('.top_title h3');
      const spanElement = document.querySelector('.top_title span');

      if (h3Element) {
        // h3 태그의 텍스트를 board_name으로 변경
        h3Element.textContent = boardName;
        console.log("h3 text changed to:", boardName); // 디버깅 로그 추가
      } else {
        console.error("h3 element not found!");
      }

      if (spanElement) {
        // span 태그를 숨김
        spanElement.style.display = 'none';
        console.log("span element hidden"); // 디버깅 로그 추가
      } else {
        console.error("span element not found!");
      }
    } else {
      console.error("Board name not found for boardIdx:", boardIdx);
    }
  } else {
    // 전체 게시글 표시
    populateList(savedViewType, postsData);
  }

  // 사이드 메뉴 및 글쓰기 버튼 초기화
  addMenuIcon();
  addWriteButtonImage();

  // 뷰 선택 메뉴 아이콘 초기화
  updateViewIcons();

  // 이벤트 리스너 설정 
  setupEventListeners();
}

function findBoardNameById(boardIdx) {
  console.log('Looking for boardIdx:', boardIdx); // 디버깅 로그 추가
  console.log('allSubCategories:', allSubCategories); // allSubCategories가 제대로 로드되었는지 확인

  for (let category of allSubCategories) { // allSubCategories 배열을 순회
    if (category.board) { // 각 카테고리의 board 배열이 존재하는지 확인
      for (let board of category.board) { // board 배열을 순회
        console.log('Checking board_idx:', board.board_idx, 'against boardIdx:', boardIdx); // 디버깅 로그 추가
        if (board.board_idx === parseInt(boardIdx)) { // board_idx가 주어진 boardIdx와 일치하는지 확인
          console.log('Match found:', board.board_name); // 매칭되는 board_name을 로그로 출력
          return board.board_name; // 일치하는 board_name을 반환
        }
      }
    }
  }
  console.log('No match found for boardIdx:', boardIdx); // 매칭되는 항목을 찾지 못했을 때의 로그
  return null; // 일치하는 항목이 없으면 null을 반환
}


// 이벤트 리스너 설정 함수
function setupEventListeners() {
  // 뷰 타입 변경 이벤트
  const viewTypeRadios = document.querySelectorAll('input[name="viewType"]');
  viewTypeRadios.forEach(radio => {
      radio.addEventListener('change', handleViewChange);
  });

  // 사이드 메뉴 열기 이벤트
  document.getElementById('board_side_menu').addEventListener('click', openSideMenu);
  document.getElementById('side_menu_overlay').addEventListener('click', closeSideMenu);

  // 하단 보기 팝업 메뉴 열기 이벤트
  document.getElementById('view_setting').addEventListener('click', openSettingMenu);
  document.getElementById('side_menu_overlay').addEventListener('click', closeSettingMenu);

  // 글쓰기 버튼 클릭 이벤트
  document.querySelector('.write_pop').addEventListener('click', () => {
      window.location.href = 'write.html';
  });

  // 전체 탭 클릭 이벤트
  document.getElementById('all_tab').addEventListener('click', ()=> {
    handleTabClick('all');
  });

  // 인기 탭 클릭 이벤트
  document.getElementById('pop_tab').addEventListener('click', () => {
    handleTabClick('pop');
  });

  // 공지 탭 클릭 이벤트
  document.getElementById('notice_tab').addEventListener('click', () => {
     handleTabClick('notice');
  });
}



function handleTabClick(tabType) {
  const allTab = document.getElementById('all_tab');
  const popTab = document.getElementById('pop_tab');
  const noticeTab = document.getElementById('notice_tab');

  if (tabType === 'all') {
    allTab.classList.add('tap_selected');
    popTab.classList.remove('tap_selected');
    noticeTab.classList.remove('tap_selected');
    // 기본 정렬로 게시글 표시
    populateList(localStorage.getItem('selectedViewType') || 'list', postsData);
  } else if (tabType === 'pop') {
    allTab.classList.remove('tap_selected');
    popTab.classList.add('tap_selected');
    noticeTab.classList.remove('tap_selected');
    // 좋아요 순으로 정렬하여 게시글 표시
    const sortedPosts = [...postsData].sort((a, b) => b.like_count - a.like_count);
    populateList(localStorage.getItem('selectedViewType') || 'list', sortedPosts);
  } else if (tabType === 'notice') {
    allTab.classList.remove('tap_selected');
    popTab.classList.remove('tap_selected');
    noticeTab.classList.add('tap_selected');

    // 공지 속성 있는 게시글만 표시
    const noticePosts = postsData.filter(post => post.is_notice);
    populateList(localStorage.getItem('selectedViewType') || 'list', noticePosts);
  }
}

// 페이지 이동 후 탭 설정
function configureTabsForBoard() {
  const noticeTab = document.getElementById('notice_tab');
  const popTab = document.getElementById('pop_tab');

  // notice_tab 표시, pop_tab 숨김
  noticeTab.style.display = 'inline-block';
  popTab.style.display = 'none';

  // 기본적으로 전체 탭이 선택된 상태로 유지
  handleTabClick('all');
}


// 뷰 타입 변경 처리 함수
function handleViewChange() {
  const selectedViewType = document.querySelector('input[name="viewType"]:checked').value;
  localStorage.setItem('selectedViewType', selectedViewType);

  // URL에서 boardIdx 파라미터 가져오기
  const urlParams = new URLSearchParams(window.location.search);
  const boardIdx = urlParams.get('boardIdx');

  // postsData가 비동기적으로 로드된 후에만 초기화
  if (boardIdx) {
    // 특정 게시판의 게시글만 필터링
    const filteredPosts = postsData.filter(post => post.board_idx === parseInt(boardIdx));
    populateList(selectedViewType, filteredPosts);
  } else {
    // 전체 게시글 표시
    populateList(selectedViewType, postsData);
  }
  updateViewImage(selectedViewType);
  closeSettingMenu();
}

// 뷰 타입에 따라 이미지 업데이트 함수
function updateViewImage(viewType) {
  const viewImageElement = document.querySelector('.board_view img');
  if (viewImageElement) {
      viewImageElement.remove();
  }
  const newImageElement = document.createElement('img');
  newImageElement.src = viewType === 'list' ? viewList : viewType === 'feed' ? feedView : albumView;
  document.querySelector('.board_view').appendChild(newImageElement);
}

// 메뉴 아이콘 추가 함수
function addMenuIcon() {
  const topTitleDiv = document.querySelector('.top_title div');

  // 기존 아이콘 제거
  while (topTitleDiv.firstChild) {
    topTitleDiv.removeChild(topTitleDiv.firstChild);
  }

  const imgElement = document.createElement('img');
  imgElement.src = hamImage;
  topTitleDiv.appendChild(imgElement);
}

// 글쓰기 버튼에 이미지 추가 함수
function addWriteButtonImage() {
  const writePopBtn = document.querySelector('.write_pop button');

  // 기존 아이콘 제거
  while (writePopBtn.firstChild) {
    writePopBtn.removeChild(writePopBtn.firstChild);
  }

  const writePopImg = document.createElement('img');
  writePopImg.src = write_img;
  writePopBtn.appendChild(writePopImg);
}

// 게시판 동적으로 생성 함수
function populateBoardList(allSubCategories) {
  const boardListWrap = document.querySelector('.board_list_wrap');
  boardListWrap.innerHTML = ''; // 기존 내용을 초기화

  allSubCategories.forEach((category) => {
    // 카테고리 제목 생성
    const boardItem = document.createElement('div');
    boardItem.className = 'board_item';

    const cateTit = document.createElement('div');
    cateTit.className = 'cate_tit';
    cateTit.innerHTML = `<h2>${category.s_cate_name}</h2>`;
    boardItem.appendChild(cateTit);

    // 게시판 리스트 생성
    const boardList = document.createElement('ul');
    boardList.className = 'board_list';

    category.board.forEach(board => {
      const listItem = document.createElement('li');
      const span = document.createElement('span');
      const listIcon = document.createElement('img');
      listIcon.src = boardIcon; // 게시판 아이콘 경로 설정
      span.appendChild(listIcon);

      const link = document.createElement('a');
      link.href = '#'; // 기본 링크는 빈 값으로 설정
      link.textContent = board.board_name;

      // 클릭 이벤트 리스너 추가
      link.addEventListener('click', function(event) {
        event.preventDefault(); // 기본 동작 방지
        goToDetail(board.board_idx); // goToDetail 함수 호출
      });

      listItem.appendChild(span);
      listItem.appendChild(link);
      boardList.appendChild(listItem);
    });

    boardItem.appendChild(boardList);
    boardListWrap.appendChild(boardItem);
  });
}

function goToDetail(boardIdx) {
  // detail.html로 이동하면서 boardIdx를 URL 파라미터로 전달
  window.location.href = `index.html?boardIdx=${encodeURIComponent(boardIdx)}`;
}

// 하단 보기 메뉴 아이콘 추가 함수
function updateViewIcons() {
  const spanElements = document.querySelectorAll('#setting_menu .setting_item span');

  spanElements.forEach((span, index) => {
    const imgElement = document.createElement('img');

    if (index === 0) {
        imgElement.src = viewList;
    } else if (index === 1) {
        imgElement.src = feedView;
    } else if (index === 2) {
        imgElement.src = albumView;
    }

    span.appendChild(imgElement);
  });
}

// 사이드 메뉴 열기
function openSideMenu() {
  document.getElementById('side_menu').classList.add('open');
  document.getElementById('side_menu_overlay').classList.add('show');
}

// 사이드 메뉴 닫기
function closeSideMenu() {
  document.getElementById('side_menu').classList.remove('open');
  document.getElementById('side_menu_overlay').classList.remove('show');
}

// 하단 보기 팝업 메뉴 열기
function openSettingMenu() {
  const settingMenu = document.getElementById('setting_menu');
  document.getElementById('side_menu_overlay').classList.add('show');
  settingMenu.classList.add('show');
}

// 하단 보기 팝업 메뉴 닫기
function closeSettingMenu() {
  document.getElementById('setting_menu').classList.remove('show');
  document.getElementById('side_menu_overlay').classList.remove('show');
}

// 리스트 아이템 생성 함수
function createListItem(post) {
  const listItem = document.createElement('div');
  listItem.className = 'list_item';

  const imagePreview = post.attachments.length > 0 ? `
      <div class="image_preview">
          <img src="${post.attachments[0].domain}" alt="Preview Image">
      </div>` : '';

  listItem.innerHTML = `
      <div>
          <div class="left_list">
              ${imagePreview}
              <div class="content_preview">
                  <h3><a href="detail.html?post_idx=${post.post_idx}">${post.post_title}</a></h3>
                  <ul>
                      <li>${post.user_name}</li>
                      <li>${post.created_at}</li>
                      <li>조회 ${post.views}</li>
                  </ul>
              </div>
          </div>
      </div>
      <div class="right_list">
          <button>
              <p>${post.comment_count}</p>
              <span>댓글</span>
          </button>
      </div>
  `;

  return listItem;
}

// 피드형 아이템 생성 함수
function createFeedItem(post) {
  const feedItem = document.createElement('div');
  feedItem.className = 'feed_item';

  const feedImage = post.attachments.length > 0 ? `
      <div class="feed_img_wrap">
          <img src="${post.attachments[0].domain}" alt="Feed Image">
      </div>` : '';

  feedItem.innerHTML = `
      <div class="feed_tit">
          <p>${post.user_name}</p>
          <span>${post.created_at}</span>
      </div>
      <div class="feed_content">
          <h3>${post.post_title}</h3>
          <div class="content_wrap">
              <p>${post.post_content}</p>
          </div>
      </div>
      ${feedImage}
      <div class="feed_bottom">
          <div class="d-flex align-items-center">
              <div class="mright d-flex align-items-center">
                  <button class="heart d-flex align-items-center"></button>
                  <button>${post.like_count}</button>
              </div>
              <div class="d-flex align-items-center">
                  <button class="cmt d-flex align-items-center"></button>
                  <button>${post.comment_count}</button>
              </div>
          </div>
          <span>조회 ${post.views}</span>
      </div>
  `;

  const heartButton = feedItem.querySelector('.heart');
  const heartImg = document.createElement('img');
  heartImg.src = post.liked_by_user === 'y' ? heart : noheart;
  heartButton.appendChild(heartImg);

  const cmtButton = feedItem.querySelector('.cmt');
  const cmtImg = document.createElement('img');
  cmtImg.src = cmt;
  cmtButton.appendChild(cmtImg);

  heartButton.addEventListener('click', () => {
      post.liked_by_user = post.liked_by_user === 'y' ? 'n' : 'y';
      heartImg.src = post.liked_by_user === 'y' ? heart : noheart;
      post.like_count += post.liked_by_user === 'y' ? 1 : -1;
      heartButton.nextElementSibling.textContent = post.like_count;
  });

  return feedItem;
}

function createAlbumItem(post) {
  if (post.attachments.length === 0) return null;

  const albumItem = document.createElement('div');
  albumItem.className = 'album_item';

  const albumImg = document.createElement('div');
  albumImg.className = 'album_img';
  const imgElement = document.createElement('img');
  imgElement.src = post.attachments[0].domain;
  imgElement.alt = post.attachments[0].file_name;
  albumImg.appendChild(imgElement);

  const albumContent = document.createElement('div');
  albumContent.className = 'album_content';
  albumContent.innerHTML = `
      <h3><a href="detail.html">${post.post_title}</a></h3>
      <p>${post.user_name}</p>
  `;

  const albumBottom = document.createElement('div');
  albumBottom.className = 'album_bottom';

  const dateSpan = document.createElement('span');
  dateSpan.textContent = post.created_at;

  const commentButton = document.createElement('button');
  const commentImg = document.createElement('img');
  commentImg.src = cmt;
  commentImg.alt = 'Comment Icon';
  commentButton.appendChild(commentImg);
  commentButton.appendChild(document.createTextNode(post.comment_count));

  albumBottom.appendChild(dateSpan);
  albumBottom.appendChild(commentButton);

  albumContent.appendChild(albumBottom);
  albumItem.appendChild(albumImg);
  albumItem.appendChild(albumContent);

  return albumItem;
}

// 앨범 리스트 추가 함수
function populateAlbum(posts = []) {
  const listContainer = document.getElementById('content_view');
  listContainer.innerHTML = '';  // 기존 내용을 초기화

  const albumContainer = document.createElement('div');
  albumContainer.className = 'album_container';

  posts.forEach(post => {
    const albumItem = createAlbumItem(post);
    if (albumItem) {
      albumContainer.appendChild(albumItem);
    }
  });

  listContainer.appendChild(albumContainer);
}

// 리스트 추가 함수
function populateList(viewType = 'list', posts = []) {
  const listContainer = document.getElementById('content_view');
  listContainer.innerHTML = '';  // 기존 내용을 초기화

  if (viewType === 'album') {
    populateAlbum(posts);
  } else {
    posts.forEach(post => {
      let listItem;
      if (viewType === 'list') {
        listItem = createListItem(post);
      } else if (viewType === 'feed') {
        listItem = createFeedItem(post);
      }
      if (listItem) {
        listContainer.appendChild(listItem);
      }
    });
  }
}