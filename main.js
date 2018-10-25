document.addEventListener("DOMContentLoaded", function () {

    // JSON(JavaScript Object Notation) -  текстовый формат обмена данными основанный на JavaScript
    // AJAX(Asynchronous JavaScript And XML) - асинхронный JS и XML для динамического обновления контента без перезагрузки страницы
    // XML - расширяемый язык разметки

    let ourRequest = new XMLHttpRequest();    // Создаем новый экземпляр объекта запроса
    let btn = document.getElementById("btn");
    let animalContainer = document.getElementById("animal-info");
    let pageCounter = 1;


    btn.addEventListener("click", function () {
        ourRequest.open('GET', `https://learnwebcode.github.io/json-example/animals-${pageCounter}.json`);         // GET - при получении данных с сервера, POST - при отправке данных на сервер
        ourRequest.onload = function () {       // событие - когда наши данные загрузились
            if (ourRequest.status >= 200 && ourRequest.status < 400) {
                let ourData = JSON.parse(ourRequest.responseText); // сохраняем полученные данные в переменную data  // JSON.parse() - говорим js о том что мы считываем JSON файл
                renderHTML(ourData);
            } else {
                throw("We connected to the server, but it returned an error.");
            }
        };

        ourRequest.onerror = function() {
            throw("Connection error!");
        };

        ourRequest.send(); // отправляем запрос

        pageCounter++;
        if (pageCounter > 3) {
            btn.classList.add("btn__hide");
        }
    });

    function renderHTML(data) {
        let htmlString = "";

        for (let i = 0; i < data.length; i++) {
            htmlString += "<p>" + data[i].name + " is a " + data[i].species + " that likes to eat ";

            for (let ii = 0; ii < data[i].foods.likes.length; ii++) {
                if (ii === 0) {
                    htmlString += data[i].foods.likes[ii];
                } else {
                    htmlString += " and " + data[i].foods.likes[ii];
                }
            }

            htmlString += ' and dislikes ';

            for (let ii = 0; ii < data[i].foods.dislikes.length; ii++) {
                if (ii === 0) {
                    htmlString += data[i].foods.dislikes[ii];
                } else {
                    htmlString += " and " + data[i].foods.dislikes[ii];
                }
            }

            htmlString += '.</p>';

        }

        animalContainer.insertAdjacentHTML('beforeend', htmlString);
    }



}, false);