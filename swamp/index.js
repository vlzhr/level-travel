var popupNode, faceNode, packShotNode;

var actions= [
    new Popup("Работа напоминает болото?"),
    new Popup("Невыносимо хочется отдохнуть?"),
    new Face(),
    new Popup("Порадуйте себя морем на 3 дня и больше!"),
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
        popupNode.innerText = this.text;
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

    window.setTimeout(function() {
        showAction();
    }, 200);
});


