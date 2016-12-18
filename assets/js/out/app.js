$traceurRuntime.registerModule("../src/app.es6", [], function() {
  "use strict";
  var __moduleName = "../src/app.es6";
  (function() {
    'use strict';
    var Cat = function() {
      function Cat(catObj) {
        this._name = catObj.name;
        this._src = catObj.src;
        this._id = catObj.id;
        this._container = document.getElementById(catObj.container);
        this.init();
      }
      return ($traceurRuntime.createClass)(Cat, {init: function() {
          var nameEl = document.createElement('div');
          nameEl.setAttribute('class', 'cat-name');
          nameEl.innerHTML = ("<p>" + this._name + "</p>");
          var imgEl = document.createElement('img');
          imgEl.setAttribute('src', this._src);
          var catEl = document.createElement('div');
          catEl.setAttribute('id', this._id);
          catEl.setAttribute('class', 'cat');
          catEl.appendChild(imgEl);
          catEl.appendChild(nameEl);
          this._container.appendChild(catEl);
          new ClickCounter(this._id);
        }}, {});
    }();
    var ClickCounter = function() {
      function ClickCounter(clickedEl) {
        this._clickedEl = document.getElementById(clickedEl);
        this._counterEl = document.createElement('span');
        this._counter = 0;
        this.init();
      }
      return ($traceurRuntime.createClass)(ClickCounter, {
        init: function() {
          this._counterEl.innerText = this._counter;
          this._clickedEl.appendChild(this._counterEl);
          this.addEvents();
        },
        addEvents: function() {
          this._clickedEl.addEventListener('click', this.countClicks.bind(this), false);
        },
        countClicks: function() {
          this._counterEl.innerText = ++this._counter;
        }
      }, {});
    }();
    function initCats(cats) {
      for (var i = 0,
          num = cats.length; i < num; i++) {
        new Cat(cats[i]);
      }
    }
    var catsArr = [{
      name: "Fido",
      src: "assets/img/fido.jpg",
      id: "fido",
      container: 'container'
    }, {
      name: "Fudgepacker",
      src: "assets/img/fudgepacker.jpg",
      id: "fudgepacker",
      container: 'container'
    }];
    initCats(catsArr);
  })();
  return {};
});
$traceurRuntime.getModule("../src/app.es6" + '');
//# sourceMappingURL=app.js.map
