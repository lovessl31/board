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

let postsData = []; // 전역 변수로 posts 데이터를 저장할 배열
let allSubCategories = []; // 전역 변수로 allSubCategories를 저장


// 이벤트 및 초기화 설정
document.addEventListener('DOMContentLoaded', () => {

  const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcyNTg4NTg2MSwianRpIjoiZjgxOTE1YmMtZDkyZi00ZWQ2LWJkOTYtODVkMWFjMzNkOTNiIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJ1c2VyX2lkIjoiYWRtaW4yIiwidXNlcl9pZHgiOjIsInVzZXJfbmFtZSI6Ilx1Y2Q1Y1x1YWNlMCBcdWFkMDBcdWI5YWNcdWM3OTAiLCJ1c2VyX2ltZyI6IjAxMDEyMzQ1Njc4IiwiaWRlbnRpZmllciI6IjU0ODU2IiwiY29tX2lkeCI6MSwiY29tcGFueV9uYW1lIjoiXHVjNjI0XHViMjk4XHVjNzQwXHVjMjE4XHVjNjk0XHVjNzdjIn0sIm5iZiI6MTcyNTg4NTg2MSwiZXhwIjoxNzI4NTY0MjYxfQ.Q3U7foMlmiapNhxF85VhKDdcq-kjaymCRMmzKGMN1Ps';

  // accessToken을 로컬 스토리지에 저장
localStorage.setItem('accessToken', accessToken);


  // 현재 페이지 URL을 확인
  const currentUrl = window.location.pathname;
  const searchParams = new URLSearchParams(window.location.search);

  // write_pop 요소를 선택
  const writePopElement = document.querySelector('.write_pop');

  // index.html일 경우, 그리고 boardIdx가 없을 경우 숨김 처리
  if (currentUrl.includes('index.html') && !searchParams.has('boardIdx')) {
    if (writePopElement) {
      writePopElement.style.display = 'none';
    }
  }
  
  // const comBtn = document.getElementById('companyBtn');

  // comBtn.addEventListener('click', ()=> {
  //   window.location.href="/company.html";
  // });


  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${accessToken}` // Authorization 헤더에 Bearer 토큰 추가
    }
  };

  const postsRequest = axios.get('http://192.168.0.18:28888/with/postList', axiosConfig)
    .then(response => {
      postsData = response.data.data;
      if (postsData.length > 0) {
        console.log('Posts data loaded:', postsData);
        console.log('게시판이름', postsData.board_name);
      } else {
        console.log("No posts data available.");
      }
    })
    .catch(error => {
      console.error('Error fetching the JSON', error);
    });

  const boardsRequest = axios.get('http://192.168.0.18:28888/with/categoryBoardList', axiosConfig)
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

  if (boardIdx) {
    // 게시판 이름 가져오기
    const boardName = findBoardNameById(boardIdx);
    
    if (boardName) {
      // '전체' 탭의 이름을 해당 게시판 이름으로 변경
      const allTab = document.getElementById('all_tab');
      allTab.textContent = boardName;
      
      // 게시판 이름 설정
      const h3Element = document.querySelector('.top_title h3');
      if (h3Element) {
        h3Element.textContent = boardName;
      }

      // 게시판의 전체 게시글 필터링
      const filteredPosts = postsData.filter(post => post.board_idx === parseInt(boardIdx));
      populateList(savedViewType, filteredPosts);

      // 탭 설정 (해당 게시판에서 '전체', '인기' 탭을 관리)
      configureTabsForBoard(boardIdx);
    } else {
      console.error('Board name not found for boardIdx:', boardIdx);
    }
  } else {
    // 게시판 ID가 없는 경우 전체 게시글 표시
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

  function searchSubCategories(subCategories) {
    for (let category of subCategories) {
      // 현재 카테고리에 board가 있으면 찾기
      if (category.board) {
        for (let board of category.board) {
          console.log('Checking board_idx:', board.board_idx, 'against boardIdx:', boardIdx); // 디버깅 로그 추가

               // board_name을 로컬 스토리지에 저장
               localStorage.setItem('board_name', board.board_name);

          if (board.board_idx === parseInt(boardIdx)) {
            console.log('Match found:', board.board_name); // 매칭되는 board_name을 로그로 출력
            return board.board_name; // 일치하는 board_name을 반환
          }
        }
      }
      
      // 하위 카테고리가 있으면 재귀적으로 검색
      if (category.sub_category && category.sub_category.length > 0) {
        const found = searchSubCategories(category.sub_category);
        if (found) return found; // 찾으면 즉시 반환
      }
    }
    return null; // 일치하는 항목이 없으면 null 반환
  }

  const result = searchSubCategories(allSubCategories);
  if (!result) {
    console.log('No match found for boardIdx:', boardIdx); // 매칭되는 항목을 찾지 못했을 때의 로그
  }
  return result;
}


// 이벤트 리스너 설정 함수
function setupEventListeners() {
  const urlParams = new URLSearchParams(window.location.search);
  const boardIdx = urlParams.get('boardIdx');

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
      // 현재 페이지의 board_idx 값을 가져옴
      const urlParams = new URLSearchParams(window.location.search);
      const boardIdx = urlParams.get('boardIdx');

      // 글쓰기 페이지로 board_idx를 전달하며 이동
      window.location.href = `write.html?boardIdx=${encodeURIComponent(boardIdx)}`;
  });

  // 전체 탭 클릭 이벤트
  document.getElementById('all_tab').addEventListener('click', () => {
    handleTabClick('all', boardIdx);
  });

  // 인기 탭 클릭 이벤트
  document.getElementById('pop_tab').addEventListener('click', () => {
    handleTabClick('pop', boardIdx);
  });

  // 공지 탭 클릭 이벤트
  document.getElementById('notice_tab').addEventListener('click', () => {
    handleTabClick('notice', boardIdx);
  });
}

function handleTabClick(tabType, boardIdx = null) {
  const allTab = document.getElementById('all_tab');
  const popTab = document.getElementById('pop_tab');
  const noticeTab = document.getElementById('notice_tab');

  if (tabType === 'all') {
    allTab.classList.add('tap_selected');
    popTab.classList.remove('tap_selected');
    noticeTab.classList.remove('tap_selected');
    
    // 게시판 ID가 있을 경우 해당 게시판의 전체 게시글만 필터링
    if (boardIdx) {
      const filteredPosts = postsData.filter(post => post.board_idx === parseInt(boardIdx));
      populateList(localStorage.getItem('selectedViewType') || 'list', filteredPosts);
    } else {
      // 전체 게시글 표시
      populateList(localStorage.getItem('selectedViewType') || 'list', postsData);
    }
  } else if (tabType === 'pop') {
    allTab.classList.remove('tap_selected');
    popTab.classList.add('tap_selected');
    noticeTab.classList.remove('tap_selected');
    
    // 좋아요 순으로 게시글 정렬
    const sortedPosts = [...postsData].sort((a, b) => b.like_count - a.like_count);
    
    // 게시판 ID가 있을 경우 해당 게시판의 인기 게시글만 필터링
    if (boardIdx) {
      const filteredPosts = sortedPosts.filter(post => post.board_idx === parseInt(boardIdx));
      populateList(localStorage.getItem('selectedViewType') || 'list', filteredPosts);
    } else {
      populateList(localStorage.getItem('selectedViewType') || 'list', sortedPosts);
    }
  } else if (tabType === 'notice') {
    allTab.classList.remove('tap_selected');
    popTab.classList.remove('tap_selected');
    noticeTab.classList.add('tap_selected');

    // 공지사항 필터링
    const noticePosts = postsData.filter(post => post.p_notice === "Y");

    // 게시판 ID가 있을 경우 해당 게시판의 공지사항만 필터링
    if (boardIdx) {
      const filteredPosts = noticePosts.filter(post => post.board_idx === parseInt(boardIdx));
      populateList(localStorage.getItem('selectedViewType') || 'list', filteredPosts);
    } else {
      populateList(localStorage.getItem('selectedViewType') || 'list', noticePosts);
    }
  }
}


// 페이지 이동 후 탭 설정
function configureTabsForBoard(boardIdx) {
  const allTab = document.getElementById('all_tab');
  const popTab = document.getElementById('pop_tab');
  const noticeTab = document.getElementById('notice_tab');

  // 전체, 인기, 공지 탭을 모두 표시
  allTab.style.display = 'inline-block';
  popTab.style.display = 'none';
  noticeTab.style.display = 'inline-block';

  // 기본적으로 전체 탭이 선택된 상태로 유지
  handleTabClick('all', boardIdx);
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
// 게시판 동적으로 생성 함수
function populateBoardList(allSubCategories) {
  const boardListWrap = document.querySelector('.board_list_wrap');
  boardListWrap.innerHTML = ''; // 기존 내용을 초기화

  allSubCategories.forEach((category) => {
    // 게시판이 있는지 확인
    const hasBoards = category.board && category.board.length > 0;

    // 서브 카테고리에 있는 게시판도 확인
    const hasSubCategoryBoards = category.sub_category && category.sub_category.some(subCat => subCat.board && subCat.board.length > 0);

    // 카테고리에 게시판이 없고, 서브 카테고리에도 게시판이 없으면 해당 카테고리는 렌더링하지 않음
    if (!hasBoards && !hasSubCategoryBoards) {
      return;
    }

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

    // 현재 카테고리의 게시판 렌더링
    if (hasBoards) {
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
    }

    // 서브 카테고리에 있는 게시판 렌더링
    if (category.sub_category) {
      category.sub_category.forEach(subCat => {
        if (subCat.board && subCat.board.length > 0) {
          subCat.board.forEach(board => {
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
        }
      });
    }

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

  const imagePreview = post.thumbnail.length > 0 ? `
      <div class="image_preview">
      <img src="http://${post.thumbnail[0].domain}/${post.thumbnail[0].o_f_name}" alt="Preview Image">
  </div>` : '';

  listItem.innerHTML = `
      <div>
          <div class="left_list">
              ${imagePreview}
              <div class="content_preview">
                  <h3><a href="detail.html?post_idx=${post.post_idx}">${post.p_title}</a></h3>
                  <ul>
                      <li>${post.user_name}</li>
                      <li>${post.update_date}</li>
                      <li>조회 ${post.p_view}</li>
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

  // 이미지 미리보기 생성 (thumbnail이 있는 경우)
  const feedImage = (post.thumbnail && post.thumbnail.length > 0) ? `
      <div class="feed_img_wrap">
          <img src="http://${post.thumbnail[0].domain}/${post.thumbnail[0].s_f_name}" alt="${post.thumbnail[0].o_f_name}">
      </div>` : '';

  feedItem.innerHTML = `
      <div class="feed_tit">
          <p>${post.user_name}</p>
          <span>${post.update_date}</span>
      </div>
      <div class="feed_content">
          <h3>${post.p_title}</h3>
          <div class="content_wrap">
              <p>${post.p_content}</p>
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
          <span>조회 ${post.p_view}</span>
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

// 앨범형 아이템 생성 함수
function createAlbumItem(post) {
  // thumbnail이 없는 경우 null 반환
  if (!post.thumbnail || post.thumbnail.length === 0) return null;

  const albumItem = document.createElement('div');
  albumItem.className = 'album_item';

  // 앨범 이미지 설정
  const albumImg = document.createElement('div');
  albumImg.className = 'album_img';
  const imgElement = document.createElement('img');
  imgElement.src = `http://${post.thumbnail[0].domain}/${post.thumbnail[0].s_f_name}`;
  imgElement.alt = post.thumbnail[0].o_f_name;
  albumImg.appendChild(imgElement);

  // 앨범 내용 설정
  const albumContent = document.createElement('div');
  albumContent.className = 'album_content';
  albumContent.innerHTML = `
      <h3><a href="detail.html?post_idx=${post.post_idx}">${post.p_title}</a></h3>
      <p>${post.user_name}</p>
  `;

  // 앨범 하단 설정
  const albumBottom = document.createElement('div');
  albumBottom.className = 'album_bottom';

  const dateSpan = document.createElement('span');
  dateSpan.textContent = post.update_date;

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