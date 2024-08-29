// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// Bootstrap JS
import 'bootstrap';
import 'jquery';
import '@popperjs/core';

import './styles/main.scss'; 
import './styles/reset.css'; 


import back from './img/back.svg';

document.addEventListener('DOMContentLoaded', () => {
    const back_img = document.createElement('img');
    back_img.src = back;
  
    document.querySelector('.back_img').appendChild(back_img);
});


import boardIcon from './img/boardIcon.svg'; 

document.addEventListener('DOMContentLoaded', function() {
    const spans = document.querySelectorAll('.b_select_item span');

    spans.forEach(span => {
        const board_list_img = document.createElement('img');
        board_list_img.src = boardIcon;
        board_list_img.alt = 'board list icon';
        span.appendChild(board_list_img);
    });
});