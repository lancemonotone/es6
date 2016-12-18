(function () {
    'use strict';

    class Cat {
        constructor(catObj) {
            this._name = catObj.name;
            this._src = catObj.src;
            this._id = catObj.id;
            this._container = document.getElementById(catObj.container);

            this.init();
        }

        init() {
            // create element to display cat name
            let nameEl = document.createElement('div');
            nameEl.setAttribute('class', 'cat-name');
            nameEl.innerHTML = `<p>${this._name}</p>`;

            // create image element
            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', this._src);

            // create and attach the image and name to the cat element
            let catEl = document.createElement('div');
            catEl.setAttribute('id', this._id);
            catEl.setAttribute('class', 'cat');
            catEl.appendChild(imgEl);
            catEl.appendChild(nameEl);

            this._container.appendChild(catEl);

            new ClickCounter(this._id);
        }
    }

    class ClickCounter {
        constructor(clickedEl) {
            this._clickedEl = document.getElementById(clickedEl);
            this._counterEl = document.createElement('span');
            this._counter = 0;

            this.init();
        }

        init() {
            this._counterEl.innerText = this._counter;
            this._clickedEl.appendChild(this._counterEl);

            this.addEvents();
        }

        addEvents() {
            this._clickedEl.addEventListener('click', this.countClicks.bind(this), false);
        }

        countClicks() {
            this._counterEl.innerText = ++this._counter;
        };
    }

    function initCats(cats) {
        for (let i = 0, num = cats.length; i < num; i++) {
            new Cat(cats[i]);
        }
    }

    let catsArr = [
        {
            name: "Fido",
            src: "assets/img/fido.jpg",
            id: "fido",
            container: 'container'
        },
        {
            name: "Fudgepacker",
            src: "assets/img/fudgepacker.jpg",
            id: "fudgepacker",
            container: 'container'
        }
    ];

    initCats(catsArr);

})();