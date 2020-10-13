'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Скотт Пилигрим против...",
            "Одержимость"

        ]
    };



    const posterBg = document.querySelector('.promo__bg'),
        genre = posterBg.querySelector('.promo__genre'),
        movieList = document.querySelector('.promo__interactive-list'),
        comercialBlocks = document.querySelectorAll('.promo__adv img');

    const makeChanges = () => {
        genre.innerHTML = 'ДРАМА';
        posterBg.style.backgroundImage = 'url(img/bg.jpg)';
    }

    const sortArr = (arr) => {
        arr.sort();
    }



    const removeComercialBlocks = (blocks) => {
        blocks.forEach(item => {
            item.remove();
        });
    }

    const drawVeiwedFilms = (arr, parent) => {
        parent.innerHTML = '';
        sortArr(arr);
        arr.forEach((item, i) => {
            parent.innerHTML += `<li class="promo__interactive-item">${i+1}.${item}
                                     <div class="delete"></div>
                               </li>`;

            const deleteBtns = document.querySelectorAll('.delete');
            deleteBtns.forEach((btn, i) => {
                btn.addEventListener('click', () => {
                    btn.parentElement.remove();
                    movieDB.movies.splice(i, 1);
                    drawVeiwedFilms(arr, parent);
                });
            });


        });

    }
    const form = document.querySelector('.add'),
        inp = form.querySelector('.adding__input'),
        checkBox = form.querySelector('input[type="checkbox"]');


    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (inp.value != '') {
            movieDB.movies.push(addThreeDotes(inp.value));
            sortArr(movieDB.movies);
            if (checkBox.checked) {
                console.log("Добавляем любимый фильм");
            }
            event.target.reset();
        }
        drawVeiwedFilms(movieDB.movies, movieList);
    });

    function addThreeDotes(str) {
        if (str.length > 21) {
            return str.substr(0, 21) + '...';
        } else {
            return str;
        }
    }
    removeComercialBlocks(comercialBlocks);
    drawVeiwedFilms(movieDB.movies, movieList);
    makeChanges();
});