
import axios from 'axios';

function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
}

function deleteCookie(name) {
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
}

async function sendCredentials() {
    const user_id = document.getElementById('username').value;
    const user_pw = document.getElementById('password').value;

    const formData = new FormData();
    formData.append('user_id', user_id);
    formData.append('user_pw', user_pw);

    try {
        const response = await axios({
            method: 'post',
            url: 'http://192.168.0.18:28888/with/login',
            data: formData,
            withCredentials: true // 서버가 설정한 쿠키를 자동으로 포함합니다.
        });

        // 전체 응답을 콘솔에 출력
        console.log('Login response:', response);
        console.log('로그인데이터:', response.data);

        // 토큰 추출
        const accessToken = response.data.data.accessToken;
        const refreshToken = response.data.data.refreshToken;

        if (accessToken && refreshToken) {
            // 쿠키에 토큰 저장
            setCookie('accessToken', accessToken, 1); // 1일 후 만료
            setCookie('refreshToken', refreshToken, 3); // 3일 후 만료
            console.log('Tokens are stored in cookies.');

            // 로그인 성공 시 UI 업데이트
            document.getElementById('loginButtons').style.display = 'none';
            document.getElementById('logoutButton').style.display = 'block';
            document.getElementById('userInfo').style.display = 'block';

            // 로그인 성공 시 index.html로 리디렉션
            window.location.href = 'company.html';
        } else {
            throw new Error('Token not provided by server');
        }
    } catch (error) {
        console.error('Login error:', error);

        if (error.response && error.response.status === 401) {
            // 401 에러 시 로그아웃 처리
            logout();
        } else {
            console.error('An unexpected error occurred:', error);
        }
    }
}


// 로그아웃 함수를 전역에서 접근할 수 있도록 설정

// 페이지 로드 시 데이터 로드
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('login-button').addEventListener('click', sendCredentials);
});



 // 동적으로 생성된 사용자관리 이동 버튼에 이벤트 리스너 추가
 document.querySelectorAll('.userBtn').forEach(button => {
    button.addEventListener('click', function () {
        const com_id = this.getAttribute('data-c-id');
        const comIdx = this.getAttribute('data-com-idx');
        console.log('comIdx:', comIdx); // 추가된 로그
        console.log('com_id:', com_id); // 추가된 로그

        // 로컬 스토리지에 저장
        localStorage.setItem('com_idx', comIdx);
        const token = getCookieValue('refreshToken');

        //서버에 POST 요청
        axios.post(`http://192.168.0.18:28888/with/com-change/${com_id}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true, // 크레덴셜 포함
        })
            .then(response => {
                console.log('서버에서 받은 성공 데이터:', response.data);
                localStorage.setItem('accessToken', response.data.data.accessToken);
                localStorage.setItem('refreshToken', response.data.data.refreshToken);

                // 로컬 스토리지에서 accessToken 가져와서 콘솔에 출력
                const accessToken = localStorage.getItem('accessToken');
                console.log('Stored accessToken:', accessToken);

                //해당 회사의 카테고리 관리 페이지로 이동
                window.location.href = `user.html?=${comIdx}`;
            })
            .catch(error => {
                console.error('Error during post request:', error);

                if (error.response && error.response.status === 401) {
                    // 401 에러 발생 시 로그아웃 함수 호출
                    window.logout();
                } else {
                    // 기타 에러 처리
                    alert('요청 중 오류가 발생했습니다.');
                }
            });
    });
});
