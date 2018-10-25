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
        ourRequest.onload = function () {                // событие - когда наши данные загрузились
            let ourData = JSON.parse(ourRequest.responseText); // сохраняем полученные данные в переменную data  // JSON.parse() - говорим js о том что мы считываем JSON файл
            console.log(ourData[0]);
            renderHTML(ourData);
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
            htmlString += "<p>" + data[i].name + " is a " + data[i].species + " that likes to eat";

            for (let j = 0; j < data[i].foods.likes.length; i++) {
                htmlString += data[i].foods.likes[j];
            }
            htmlString += ".</p>";
        }

        animalContainer.insertAdjacentHTML('beforeend', htmlString); // разбирает текст как HTML или XML и вставляет полученные узлы(nodes) в DOM дерево в указанную позицию
    }



}, false);