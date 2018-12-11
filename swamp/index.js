var popupNode, faceNode, packShotNode, ageMarkNode;

var actions= [
    new Popup(["РАБОТА", "НАПОМИНАЕТ", "БОЛОТО?"]),
    new Popup(["НЕВЫНОСИМО", "ХОЧЕТСЯ", "ОТДОХНУТЬ?"]),
    new Face(),
    new Popup(["ПОРАДУЙТЕ СЕБЯ", "МОРЕМ НА 3 ДНЯ", "И БОЛЬШЕ!"]),
    new PackShot()
];
var actionStep = 0;
var nextIn = 3700;

function showElement(el, nextIn, isFinal) {
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
        for (var n in [0,1,2]) {
            popupNode.children[n].innerText = this.text[n];
        }
        // popupNode.innerText = this.text;
        showElement(popupNode);
        nextIn = 3700;
    }
}

function Face() {
    this.show = function() {
        showElement(faceNode);
        nextIn = 1000;
    }
}

function PackShot() {
    this.show = function() {
        showElement(packShotNode, 0, true);
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

    window.setTimeout(function() {
        showAction();
    }, 200);
});


