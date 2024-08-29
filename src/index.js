// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// Bootstrap JS
import 'bootstrap';
import 'jquery';
import '@popperjs/core';

import './styles/main.scss'; 
import './styles/reset.css'; 

// ham 추가
import hamImage from './img/ham.svg';

const imgElement = document.createElement('img');
imgElement.src = hamImage;
document.querySelector('.top_title div').appendChild(imgElement);

// view_list 추가
import view_list from './img/view_list.svg';
import view_feed from './img/view_feed.svg';
import view_album from './img/view_album.svg';


// 라디오 버튼 클릭 시 이미지 변경 함수
function updateViewImage(viewType) {
  const viewImageElement = document.querySelector('.board_view img');

  // 이미지가 이미 존재하면 제거하고 새 이미지 추가
  if (viewImageElement) {
      viewImageElement.remove();
  }

  const newImageElement = document.createElement('img');

  // viewType에 따라 이미지를 변경
  if (viewType === 'list') {
      newImageElement.src = view_list;
  } else if (viewType === 'feed') {
      newImageElement.src = view_feed;
  } else if (viewType === 'album') {
      newImageElement.src = view_album;
  }

  document.querySelector('.board_view').appendChild(newImageElement);
}

// 페이지 로드 시 로컬 스토리지에서 뷰 타입을 불러와 설정
document.addEventListener('DOMContentLoaded', () => {
  const savedViewType = localStorage.getItem('selectedViewType') || 'list'; // 기본값은 'list'
  
  // 라디오 버튼 선택 상태를 설정
  document.querySelector(`input[name="viewType"][value="${savedViewType}"]`).checked = true;

  // 이미지 업데이트
  updateViewImage(savedViewType);

  // 라디오 버튼들에 이벤트 리스너 추가
  const viewTypeRadios = document.querySelectorAll('input[name="viewType"]');
  viewTypeRadios.forEach(radio => {
      radio.addEventListener('change', handleViewChange);
  });
});

// 사이드 메뉴

// 메뉴 열기
document.getElementById('board_side_menu').addEventListener('click', function() {
    document.getElementById('side_menu').classList.add('open');
    document.getElementById('side_menu_overlay').classList.add('show');
});

// 사이드 메뉴 닫기 (오버레이 클릭 시)
document.getElementById('side_menu_overlay').addEventListener('click', function() {
    document.getElementById('side_menu').classList.remove('open');
    document.getElementById('side_menu_overlay').classList.remove('show');
});



// 사이드 메뉴 탭에서 게시판 불러오기

import boardIcon from './img/boardIcon.svg'; 

// 서버에서 가져오는 데이터로 변경
const boards = [
  {
    category: "TO_DO",
    items: [
      { name: "개발", url: "/todo/dev" },
      { name: "마케팅", url: "/todo/marketing" },
      { name: "경영지원", url: "/todo/support" }
    ]
  },
  {
    category: "위드퍼스트",
    items: [
      { name: "공지사항", url: "/withfirst/notice" },
      { name: "활동보고서", url: "/withfirst/report" },
      { name: "디자인", url: "/withfirst/design" },
      { name: "사업계획서", url: "/withfirst/plan" }
    ]
  },
];

// board_list_wrap 요소를 가져옵니다.
const boardListWrap = document.querySelector('.board_list_wrap');

// 각 카테고리 및 리스트 항목을 동적으로 생성하고, 아이콘과 링크도 추가합니다.
boards.forEach((board, index) => {
  // board_item 컨테이너 생성
  const boardItem = document.createElement('div');
  boardItem.className = 'board_item';

  // cate_tit 요소 생성
  const cateTit = document.createElement('div');
  cateTit.className = 'cate_tit';
  const cateTitle = document.createElement('h2');
  cateTitle.innerText = board.category;  // 카테고리 속성을 h2에 추가
  cateTit.appendChild(cateTitle);
  boardItem.appendChild(cateTit);

  // board_list 요소 생성
  const boardList = document.createElement('ul');
  boardList.className = 'board_list';

  // 리스트 항목 생성, 아이콘과 링크 추가
  board.items.forEach(item => {
    const listItem = document.createElement('li');
    const span = document.createElement('span');

    // 아이콘 이미지 추가
    const listIcon = document.createElement('img');
    listIcon.src = boardIcon; // 아이콘 경로 설정
    span.appendChild(listIcon);

    // 링크 생성 및 설정
    const link = document.createElement('a');
    link.href = item.url; // 각 항목에 대한 URL 설정
    link.textContent = item.name;

    listItem.appendChild(span);
    listItem.appendChild(link);
    boardList.appendChild(listItem);
  });

  boardItem.appendChild(boardList);

  // 생성된 board_item을 board_list_wrap에 추가
  boardListWrap.appendChild(boardItem);

  // 마지막 항목이 아닌 경우에만 구분선을 추가
  if (index < boards.length - 1) {
    const hr = document.createElement('hr');
    hr.className = 'board_section';
    boardListWrap.appendChild(hr);
  }
});


// 하단 보기 설정 메뉴 

import viewList from './img/view_list.svg';
import feedView from './img/view_feed.svg';
import albumView from './img/view_album.svg';

// span 요소를 선택
const spanElements = document.querySelectorAll('#setting_menu .setting_item span');

// 각 span 요소마다 다른 이미지를 추가합니다.
spanElements.forEach((span, index) => {
    const imgElement = document.createElement('img');

    // index에 따라 다른 이미지를 설정합니다.
    if (index === 0) {
        imgElement.src = viewList; // 목록형 이미지
    } else if (index === 1) {
        imgElement.src = feedView; // 피드형 이미지
    } else if (index === 2) {
        imgElement.src = albumView; // 앨범형 이미지
    }

    span.appendChild(imgElement);
});

// 하단 보기 팝업 메뉴 열기

document.getElementById('view_setting').addEventListener('click', function() {
    const settingMenu = document.getElementById('setting_menu');
    document.getElementById('side_menu_overlay').classList.add('show');
    settingMenu.classList.add('show');
});

// 메뉴 닫기 (오버레이 클릭 시)
document.getElementById('side_menu_overlay').addEventListener('click', function() {
    document.getElementById('setting_menu').classList.remove('show');
    document.getElementById('side_menu_overlay').classList.remove('show');
});


// 목록 리스트 예시 이미지

import myImage from './img/exImg.jpg';

// // 이미지를 동적으로 추가하는 함수
// function addImageToPreview() {
//     const imagePreviews = document.querySelectorAll('.image_preview');
  
//     imagePreviews.forEach(preivew => {
//         const imgPreview = document.createElement('img');
//         imgPreview.src = myImage;
//         imgPreview.alt = 'preview img';

//         preivew.appendChild(imgPreview);
//     });
//   }
  
//   document.addEventListener('DOMContentLoaded', () => {
//     addImageToPreview();
//   });


// 글쓰기 버튼 이미지 추가

import write_img from './img/Pencil.svg';
  
const write_pop_img = document.createElement('img');
write_pop_img.src = write_img;
document.querySelector('.write_pop button').appendChild(write_pop_img);


import exImg2 from './img/eximg2.jpg';

//게시글 목록 데이터
const posts = [
  {
    title: "개발팀 회의록",
    author: "이재훈",
    date: "2024-08-27",
    views: 120,
    comments: 4,
    likes: 15,
    likedByUser: true, // 사용자가 좋아요를 눌렀는지 여부
    image: exImg2, // 이미지 경로
    content: "개발팀 회의에서 결정된 주요 사항입니다. 각자 담당 업무를 다시 확인해 주세요. 확인 후 제 메일로 업무 보고서 보내주시면 됩니다. 이번주 내로 보내주시기 바랍니다."
  },
  {
    title: "마케팅 전략 발표",
    author: "김수진",
    date: "2024-08-26",
    views: 98,
    comments: 2,
    likes: 10,
    likedByUser: false, // 사용자가 좋아요를 누르지 않은 경우
    image: null,
    content: "다음 주 마케팅 전략 발표를 준비해 주세요. 발표 자료는 공유 드린 폴더에 있습니다."
  },
  {
    title: "경영 지원팀 공지사항",
    author: "박민지",
    date: "2024-08-25",
    views: 75,
    comments: 3,
    likes: 8,
    likedByUser: true,
    image: null,
    content: "경영 지원팀에서 새로운 공지사항이 있습니다. 자세한 내용은 게시글을 확인해 주세요."
  },
  {
    title: "신제품 출시 준비",
    author: "최영수",
    date: "2024-08-24",
    views: 150,
    comments: 6,
    likes: 20,
    likedByUser: true,
    image: exImg2,
    content: "신제품 출시 준비가 한창입니다. 모든 팀은 각자의 역할에 집중해 주세요."
  },
  {
    title: "디자인팀 피드백",
    author: "장예은",
    date: "2024-08-23",
    views: 65,
    comments: 1,
    likes: 7,
    image: exImg2,
    content: "디자인팀에서 제공한 시안을 검토해 주세요. 피드백을 주시면 감사하겠습니다."
  },
  {
    title: "사업 계획서 초안",
    author: "김민호",
    date: "2024-08-22",
    views: 85,
    comments: 5,
    likes: 12,
    likedByUser: true,
    image: null,
    content: "사업 계획서 초안을 작성했습니다. 팀원들께서는 검토 후 의견 부탁드립니다."
  },
  {
    title: "프로젝트 일정 공유",
    author: "홍지수",
    date: "2024-08-21",
    views: 112,
    comments: 4,
    likes: 18,
    image: null,
    content: "프로젝트 일정이 확정되었습니다. 모든 팀원들께서는 일정에 맞춰 준비해 주세요."
  },
  {
    title: "회계팀 보고서",
    author: "윤서준",
    date: "2024-08-20",
    views: 90,
    comments: 3,
    likes: 9,
    image: null,
    content: "회계팀에서 작성한 보고서입니다. 확인 후 필요한 사항이 있으면 말씀해 주세요."
  },
  {
    title: "인사팀 공지",
    author: "김나희",
    date: "2024-08-19",
    views: 130,
    comments: 7,
    likes: 14,
    image: exImg2,
    content: "인사팀에서 새로운 공지가 있습니다. 꼭 확인해 주시기 바랍니다."
  },
  {
    title: "고객 피드백 공유",
    author: "서지훈",
    date: "2024-08-18",
    views: 105,
    comments: 5,
    likes: 11,
    image: null,
    content: "최근 고객 피드백을 공유합니다. 팀별로 피드백을 참고하여 대응해 주세요."
  },
  {
    title: "팀 빌딩 워크숍",
    author: "이하은",
    date: "2024-08-17",
    views: 70,
    comments: 2,
    likes: 6,
    image: null,
    content: "다음 주 팀 빌딩 워크숍 일정입니다. 참석이 필요한 분들은 일정 확인 바랍니다."
  },
  {
    title: "기술 블로그 업데이트",
    author: "최유정",
    date: "2024-08-16",
    views: 95,
    comments: 3,
    likes: 13,
    likedByUser: true,
    image: exImg2,
    content: "기술 블로그에 새로운 글이 게시되었습니다. 기술에 관심 있는 분들은 확인해 주세요."
  }
];


  function createListItem(post) {
    // list_item 요소를 innerHTML로 생성
    const listItem = document.createElement('div');
    listItem.className = 'list_item';

    // 이미지가 있는 경우만 image_preview를 추가
    const imagePreview = post.image ? `
        <div class="image_preview">
            <img src="${post.image}" alt="Preview Image">
        </div>` : '';

    listItem.innerHTML = `
        <div>
            <div class="left_list">
                ${imagePreview}
                <div class="content_preview">
                    <h3><a href="#">${post.title}</a></h3>
                    <ul>
                        <li>${post.author}</li>
                        <li>${post.date}</li>
                        <li>조회 ${post.views}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="right_list">
            <button>
                <p>${post.comments}</p>
                <span>댓글</span>
            </button>
        </div>
    `;

    return listItem;
}


// 피드형 리스트 이미지 추가
import heart from './img/heart.svg';
import noheart from './img/no_heart.svg';
import cmt from './img/comment.svg';


function createFeedItem(post) {
  // feed_item 요소를 생성
  const feedItem = document.createElement('div');
  feedItem.className = 'feed_item';

  // 이미지가 있는 경우만 feed_img_wrap를 추가
  const feedImage = post.image ? `
      <div class="feed_img_wrap">
          <img src="${post.image}" alt="Feed Image">
      </div>` : '';

  // feedItem의 innerHTML을 설정
  feedItem.innerHTML = `
      <div class="feed_tit">
          <p>${post.author}</p>
          <span>${post.date}</span>
      </div>
      <div class="feed_content">
          <h3>${post.title}</h3>
          <div class="content_wrap">
            <p>${post.content}</p>
          </div>
      </div>
      ${feedImage}
      <div class="feed_bottom">
          <div class="d-flex align-items-center">
              <div class="mright d-flex align-items-center">
                  <button class="heart d-flex align-items-center"></button>
                  <button>${post.likes}</button>
              </div>
              <div class="d-flex align-items-center">
                  <button class="cmt d-flex align-items-center"></button>
                  <button>${post.comments}</button>
              </div>
          </div>
          <span>조회 ${post.views}</span>
      </div>
  `;

 // 좋아요 상태에 따라 이미지를 설정
 const heartButton = feedItem.querySelector('.heart');
 const heartImg = document.createElement('img');
 heartImg.src = post.likedByUser ? heart : noheart; // 서버에서 받은 likedByUser 값에 따라 이미지 설정
 heartButton.appendChild(heartImg);

 // 댓글 버튼에 이미지 추가
 const cmtButton = feedItem.querySelector('.cmt');
 const cmtImg = document.createElement('img');
 cmtImg.src = cmt;
 cmtButton.appendChild(cmtImg);

 // 좋아요 버튼 클릭 이벤트 추가
 heartButton.addEventListener('click', () => {
     post.likedByUser = !post.likedByUser; // 상태 토글
     heartImg.src = post.likedByUser ? heart : noheart; // 이미지 업데이트
     post.likes += post.likedByUser ? 1 : -1; // 좋아요 수 업데이트
     heartButton.nextElementSibling.textContent = post.likes; // 좋아요 수 표시 업데이트
 });

 return feedItem;
}
function createAlbumItem(post) {
  // 사진이 없는 경우에는 앨범 항목을 생성하지 않음
  if (!post.image) {
      return null;
  }

  // album_item 요소를 생성
  const albumItem = document.createElement('div');
  albumItem.className = 'album_item';

  // album_img 요소 생성 및 이미지 추가
  const albumImg = document.createElement('div');
  albumImg.className = 'album_img';
  const imgElement = document.createElement('img');
  imgElement.src = post.image; // 이미지 경로 설정
  imgElement.alt = 'Album Image';
  albumImg.appendChild(imgElement);

  // album_content 요소 생성
  const albumContent = document.createElement('div');
  albumContent.className = 'album_content';
  albumContent.innerHTML = `
      <h3><a href="detail.html">${post.title}</a></h3>
      <p>${post.author}</p>
  `;

  // album_bottom 요소 생성
  const albumBottom = document.createElement('div');
  albumBottom.className = 'album_bottom';

  // 날짜 추가
  const dateSpan = document.createElement('span');
  dateSpan.textContent = post.date;

  // 댓글 수 버튼 생성 및 이미지 추가
  const commentButton = document.createElement('button');
  const commentImg = document.createElement('img');
  commentImg.src = cmt; // 댓글 아이콘 이미지 경로 설정
  commentImg.alt = 'Comment Icon';
  commentButton.appendChild(commentImg);
  commentButton.appendChild(document.createTextNode(post.comments));

  // album_bottom에 날짜와 댓글 버튼 추가
  albumBottom.appendChild(dateSpan);
  albumBottom.appendChild(commentButton);

  // album_content에 album_bottom 추가
  albumContent.appendChild(albumBottom);

  // album_item에 이미지와 내용을 추가
  albumItem.appendChild(albumImg);
  albumItem.appendChild(albumContent);

  return albumItem;
}

// 앨범 리스트를 DOM에 추가하는 함수
function populateAlbum() {
  const listContainer = document.getElementById('content_view'); // 앨범 리스트가 들어갈 컨테이너
  listContainer.innerHTML = ''; // 이전 목록을 초기화

  // album_container 요소를 생성
  const albumContainer = document.createElement('div');
  albumContainer.className = 'album_container';

  posts.forEach(post => {
      const albumItem = createAlbumItem(post);
      if (albumItem) {
          albumContainer.appendChild(albumItem); // album_item을 album_container에 추가
      }
  });

  // 생성된 album_container를 리스트 컨테이너에 추가
  listContainer.appendChild(albumContainer);
}

// 리스트를 DOM에 추가하는 함수
function populateList(viewType = 'list') { // viewType을 매개변수로 받아오고 기본값을 'list'로 설정
  const listContainer = document.getElementById('content_view'); // 리스트가 들어갈 컨테이너
  listContainer.innerHTML = ''; // 이전 목록을 초기화

  if (viewType === 'album') {
      populateAlbum(); // 앨범 뷰일 경우 앨범 리스트 생성
  } else {
      posts.forEach(post => {
          let listItem;
          if (viewType === 'list') {
              listItem = createListItem(post);
          } else if (viewType === 'feed') {
              listItem = createFeedItem(post);
          }

          // listItem이 null이 아닌 경우에만 추가
          if (listItem) {
              listContainer.appendChild(listItem);
          }
      });
  }
}


// 라디오 버튼 클릭 시 이벤트 핸들러
function handleViewChange() {
  const selectedViewType = document.querySelector('input[name="viewType"]:checked').value;

  localStorage.setItem('selectedViewType', selectedViewType);
  updateViewImage(selectedViewType);
  populateList(selectedViewType); // 선택된 뷰 타입을 populateList에 전달

   // 메뉴를 닫고 새로고침
   document.getElementById('setting_menu').classList.remove('show');
   document.getElementById('side_menu_overlay').classList.remove('show');
}

// 페이지 로드 시 로컬 스토리지에서 뷰 타입을 불러와 초기화
document.addEventListener('DOMContentLoaded', () => {
  // 로컬 스토리지에서 저장된 뷰 타입을 불러옴
  const savedViewType = localStorage.getItem('selectedViewType') || 'list'; // 기본값은 'list'

  // 해당 뷰 타입의 라디오 버튼을 선택
  document.querySelector(`input[name="viewType"][value="${savedViewType}"]`).checked = true;

  populateList(savedViewType); // 불러온 뷰 타입으로 초기화

  // 라디오 버튼들에 이벤트 리스너 추가
  const viewTypeRadios = document.querySelectorAll('input[name="viewType"]');
  viewTypeRadios.forEach(radio => {
      radio.addEventListener('change', handleViewChange);
  });
});




// import exImg3 from './img/eximg2.jpg';

// const fff = document.createElement('img');
// fff.src = exImg3;
// document.querySelector('.album_img').appendChild(fff);


// 글쓰기 팝업 클릭 시 글쓰기 페이지로 이동

document.querySelector('.write_pop').addEventListener('click', function() {
  window.location.href = 'write.html'; // index.html로 이동 
})