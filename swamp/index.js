var popupNode, faceNode, packShotNode, ageMarkNode, headerNode;

var actions= [
    new Popup(["РАБОТА", "НАПОМИНАЕТ", "БОЛОТО?"]),
    new Popup(["НЕВЫНОСИМО", "ХОЧЕТСЯ", "ОТДОХНУТЬ?"]),
    new Face(),
    new Popup(["ПОРАДУЙТЕ&nbsp;СЕБЯ", "МОРЕМ&nbsp;НА&nbsp;3&nbsp;ДНЯ", "И&nbsp;БОЛЬШЕ!"]),
    new PackShot()
];
var actionStep = 0;
var nextIn = 3700;

function showElement(el, isFinal) {
    el.classList.add("shown");
    if (!isFinal) {
        window.setTimeout(function () {
            el.classList.remove("shown");
        }, 2500);
    }
}

function Popup(text) {
    this.text = text;
    this.show = function() {
        for (let n in [0,1,2]) {
            popupNode.children[n].innerHTML = this.text[n];
            window.setTimeout(function() {
                showElement(popupNode.children[n]);
            }, n*200);
        }
        nextIn = 3700;
    }
}

function Face() {
    this.show = function() {
        showElement(faceNode, true);
        nextIn = 1000;
    }
}

function PackShot() {
    this.show = function() {
        headerNode.style.marginTop = "40px";
        showElement(packShotNode, true);

        for (let n in [0,1,2]) {
            window.setTimeout(function() {
                showElement(packShotNode.children[n], true);
            }, n*200);
        }

        ageMarkNode.style["margin-bottom"] = "24px";
    }
}

function showAction() {
    if (actionStep >= actions.length) { return; }
    actions[actionStep].show();
    window.setTimeout(function() {
        actionStep++;
        showAction();
    }, nextIn);
}

document.addEventListener("DOMContentLoaded", function() {
    popupNode = document.querySelector(".popup");
    faceNode = document.querySelector(".face");
    packShotNode = document.querySelector(".packshot");
    ageMarkNode = document.querySelector(".age-mark");
    headerNode = document.querySelector(".header");

    window.setTimeout(function() {
        showAction();
    }, 200);
});


