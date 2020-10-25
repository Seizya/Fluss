console.log("http://localhost:2435/index.html");

import {
    Chain,
    Note
}
from "./Seifuncs/main.js";

class Memo extends Map {
    constructor(arg) {
        super();
        this.parent = arg.parent;
        this.children = arg.children;
        this.title = arg.title;
        this.detail = arg.detail;
        this.element = undefined;
    }

    bear() {}

    die() {}
};

//-Events----------------------------------------
//Memo-------------
document.querySelectorAll(".button").forEach(_E0 => _E0.addEventListener("touchstart", () => {
    _E0.addEventListener("touchmove", _T0, new Array(["passive", false], ["once", true]).to("Object"));
    _E0.addEventListener("touchend", _T1, new Array(["once", true]).to("Object"));

    function _T0() {
        _E0.removeEventListener("touchend", _T1, new Array(["once", true]).to("Object"));
    }

    function _T1() {
        if (_E0.classList.contains("active")) {
            _E0.classList.remove("active");
            _E0.nextElementSibling.descendantFlat().forEach(_E1 => {
                if (_E1.tagName == "LI") {
                    _E1.classList.remove("active")
                } else {
                    _E1.classList.remove("open")
                }
            });
            _E0.style.marginTop = "";
            _E0.nextElementSibling.style.marginBottom = "";
        } else {
            _E0.classList.add("active");
            _E0.nextElementSibling.classList.add("open");

            if (_E0 == Array.from(_E0.parentNode.childNodes).filter(_E0 => _E0.tagName == "LI" && !_E0.classList.contains("sleep"))[0]) _E0.style.marginTop = "0";
            if (_E0 == Array.from(_E0.parentNode.childNodes).filter(_E0 => _E0.tagName == "LI" && !_E0.classList.contains("sleep")).reverse()[0]) _E0.nextElementSibling.style.marginBottom = "0";
        }
        _E0.removeEventListener("touchmove", _T0, new Array(["passive", false], ["once", true]).to("Object"));
    }
}, new Array(["passive", false]).to("Object")));

//Menu Button------
document.querySelectorAll(".menu_button:not(#menu_button_add)").forEach(_E0 => _E0.addEventListener("touchstart", () => _E0.classList.toggle("active"), new Array(["passive", true]).to("Object")));

document.querySelectorAll("#menu_button_add")[0].addEventListener("touchstart", () => {
    document.querySelectorAll("#menu_button_add")[0].addEventListener("touchend", _T0, new Array(["once", true], ["passive", true]).to("Object"));
    let _Tm0 = setTimeout(_T1, 300);

    function _T0() {
        document.querySelectorAll("#menu_button_add")[0].classList.toggle("active");
        clearTimeout(_Tm0)
    }

    function _T1() {
        document.querySelectorAll(".menu_button").forEach(_E0 => _E0.classList.toggle("open"))
        document.querySelectorAll("#menu_button_add")[0].removeEventListener("touchend", _T0, {
            once: true
        })
    }
}, new Array(["passive", true]).to("Object"));

//Menu Setting-----
document.querySelectorAll("#menu_button_setting")[0].addEventListener("touchend", () => {
    document.querySelectorAll("#menu_setting")[0].classList.toggle("sleep");
    document.querySelectorAll("#menu_setting")[0].classList.remove("active");
    document.querySelectorAll("#menu_setting+*")[0].classList.remove("open");

    document.querySelectorAll("#menu_setting+* li").forEach(_E1 => _E1.classList.remove("active"));
    document.querySelectorAll("#menu_setting+* ul").forEach(_E1 => _E1.classList.remove("open"));
});

// document.querySelectorAll("#menu_setting, #menu_setting+*").forEach(_E0 => _E0.style.backgroundColor = "rgba(230, 230, 230,1)");
document.querySelectorAll("#menu_setting, #menu_setting+*").forEach(_E0 => _E0.style.backgroundColor = "rgba(80, 80, 80,1)");
document.querySelectorAll("#menu_setting+*>*").forEach(_E0 => setting_node_color(_E0));

function setting_node_color(elem) {
    let end = [230, 230, 230, 1];
    let start = [80, 80, 80, 1];
    let percent = 0;
    // let percent = 0.15;
    let parent_per = (Number(window.getComputedStyle(elem.parentNode).getPropertyValue("background-color").split(" ")[0].slice(0, -1).split("(")[1]) - start[0]) / (end[0] - start[0]);
    elem.style.backgroundColor = "rgba(" + ((end[0] - start[0]) * (parent_per + percent) + start[0]) + "," + ((end[1] - start[1]) * (parent_per + percent) + start[1]) + "," + ((end[2] - start[2]) * (parent_per + percent) + start[2]) + "," + ((end[3] - start[3]) * (parent_per + percent) + start[3]) + ")";
    if (elem.tagName == "UL") Array.from(elem.children).filter(_E0 => ["UL", "LI"].includes(_E0.tagName)).forEach(_E0 => setting_node_color(_E0));
}