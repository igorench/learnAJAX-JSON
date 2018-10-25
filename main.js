document.addEventListener("DOMContentLoaded", function () {

    // JSON(JavaScript Object Notation) -  текстовый формат обмена данными основанный на JavaScript
    // AJAX(Asynchronous JavaScript And XML) - асинхронный JS и XML для динамического обновления контента без перезагрузки страницы
    // XML - расширяемый язык разметки

    let ourRequest = new XMLHttpRequest();    // Создаем новый экземпляр объекта запроса
    let btn = document.getElementById("btn");
    let animalContainer = document.getElementById("animal-info");
    let counterUrl = 1;

    btn.addEventListener("click", function () {
            ourRequest.open('GET', `https://learnwebcode.github.io/json-example/animals-${counter}.json`);         // GET - при получении данных с сервера, POST - при отправке данных на сервер
            ourRequest.onload = function () {                // событие - когда наши данные загрузились
                let ourData = JSON.parse(ourRequest.responseText); // сохраняем полученные данные в переменную data  // JSON.parse() - говорим js о том что мы считываем JSON файл
                renderHTML(ourData);
            };
            ourRequest.send(); // отправляем запрос

        if (counterUrl >= 3) {
            counterUrl = 1;
        } else {
            counterUrl++;
        }
    });

    function renderHTML(data) {
        let htmlString = "";

        for (let i = 0; i < data.length; i++) {
            htmlString += `<p> ${data[i].name} is a ${data[i].species}.</p>`
        }

        animalContainer.insertAdjacentHTML('beforeend', htmlString); // разбирает текст как HTML или XML и вставляет полученные узлы(nodes) в DOM дерево в указанную позицию
    }


}, false);