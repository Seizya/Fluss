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

        this.children = this.children ? this.children.map(_E0 => _E0.parent = this).map(_E0 => new Memo(_E0)) : [];
        this.make();
    }

    tap() {
        let that = this;
        this.addEventListener("touchmove", _T0, new Array(["passive", true], ["once", true]).to("Object"));
        this.addEventListener("touchend", _T1, new Array(["once", true]).to("Object"));

        function _T0() {
            that.element.removeEventListener("touchend", _T1, new Array(["once", true]).to("Object"));
        }

        function _T1() {
            if (that.element.classList.contains("active")) {
                that.element.classList.remove("active");
                that.element.nextElementSibling.descendantFlat().forEach(_E1 => {
                    if (_E1.tagName == "LI") {
                        _E1.classList.remove("active")
                    } else {
                        _E1.classList.remove("open")
                    }
                });
                that.element.style.marginTop = "";
                that.element.nextElementSibling.style.marginBottom = "";
            } else {
                that.element.classList.add("active");
                that.element.nextElementSibling.classList.add("open");

                if (that.element == Array.from(that.element.parentNode.childNodes).filter(_E0 => _E0.tagName == "LI" && !_E0.classList.contains("sleep"))[0]) that.element.style.marginTop = "0";
                if (that.element == Array.from(that.element.parentNode.childNodes).filter(_E0 => _E0.tagName == "LI" && !_E0.classList.contains("sleep")).reverse()[0]) that.element.nextElementSibling.style.marginBottom = "0";
            }
            that.element.removeEventListener("touchmove", _T0, new Array(["passive", false], ["once", true]).to("Object"));
        }
    }

    bear() {}

    make() {
        let Li = document.createElement("li");
        let Ul = document.createElement("ul");

        if (this.children.length >= 1) Li.classList.add("button");
        Li.addEventListener("touchstart", this.tap(), new Array(["passive", true]).to("Object"));
        
        
    }
    
    color(){
	}

    change() {}

    leave() {}

    save() {}
};

class WindowMemo extends Map {
    constructor() {
        this.children = undefined;
        this.children_setting = undefined;
        this.element = undefined;
    }

    tap() {}

    make() {}

    save() {}
}

class SettingMemo extends Map {
    constructor(arg) {
        this.title = arg.title;
        this.detail = arg.detail;
        this.parent = arg.parent;
        this.children = arg.children;
        this.element = arg.element;

        this.func = arg.func;
    }

    tap() {}

    make() {}
}

const note = new Note("fluss");
// if(note.saveHas("memo")){}
// if(note.saveHas("memo_setting")){}

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
            // if (_E0.css("border-color").split(",").length >= 4) _E0.style.borderColor = _E0.css("border-color").slice(0, -6) + ")";
            // _E0.nextElementSibling.descendantFlat().forEach(_E1 => _E1.style.borderColor = _E1.css("border-color").slice(0, -6) + ")");
            // TODO 非Active要素のSneak化
        } else {
            _E0.classList.add("active");
            _E0.nextElementSibling.classList.add("open");

            if (_E0 == Array.from(_E0.parentNode.childNodes).filter(_E0 => _E0.tagName == "LI" && !_E0.classList.contains("sleep"))[0]) _E0.style.marginTop = "0";
            if (_E0 == Array.from(_E0.parentNode.childNodes).filter(_E0 => _E0.tagName == "LI" && !_E0.classList.contains("sleep")).reverse()[0]) _E0.nextElementSibling.style.marginBottom = "0";
            // _E0.nextElementSibling.style.borderColor = _E0.style.borderColor = _E0.css("border-color").split(",").length >= 4 ? _E0.css("border-color").slice(0, -4) + " 0.5)" : _E0.css("border-color").slice(0, -1) + ", 0.5)";
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
// document.querySelectorAll("#menu_setting, #menu_setting+*").forEach(_E0 => _E0.style.backgroundColor = "rgba(80, 80, 80,1)");
// document.querySelectorAll("#menu_setting+*>*").forEach(_E0 => setting_node_color(_E0));
document.querySelectorAll("#List>*").forEach(_E0 => setting_node_color_3(_E0));

function setting_node_color(elem) {
    let end = [230, 230, 230, 1];
    let start = [80, 80, 80, 1];
    // let percent = 0;
    let percent = 0.15;
    let parent_per = (Number(window.getComputedStyle(elem.parentNode).getPropertyValue("background-color").split(" ")[0].slice(0, -1).split("(")[1]) - start[0]) / (end[0] - start[0]);
    elem.style.backgroundColor = "rgba(" + ((end[0] - start[0]) * (parent_per + percent) + start[0]) + "," + ((end[1] - start[1]) * (parent_per + percent) + start[1]) + "," + ((end[2] - start[2]) * (parent_per + percent) + start[2]) + "," + ((end[3] - start[3]) * (parent_per + percent) + start[3]) + ")";
    if (elem.tagName == "UL") Array.from(elem.childNodes).filter(_E0 => ["UL", "LI"].includes(_E0.tagName)).forEach(_E0 => setting_node_color(_E0));
}

function setting_node_color_1(elem) {
    elem.style.backgroundColor = window.getComputedStyle(elem.parentNode).getPropertyValue("background-color").split(" ")[0].slice(0, -1).split("(")[1] == "230" ? "rgba(80,80,80,1)" : "rgba(230,230,230,1)";
    if (elem.tagName == "UL") Array.from(elem.childNodes).filter(_E0 => ["UL", "LI"].includes(_E0.tagName)).forEach(_E0 => setting_node_color_1(_E0));
}

function setting_node_color_2(elem) {
    let colors = ["pink", "skyblue", "yellowgreen", "rgba(230, 200, 40, 1)"];
    colors = colors.map(_E0 => {
        elem.style.borderColor = _E0;
        let _T0 = window.getComputedStyle(elem).getPropertyValue("border-color");
        elem.style.borderColor = "";
        return _T0;
    })
    elem.style.borderColor = colors[(colors.indexOf(window.getComputedStyle(elem.parentNode).getPropertyValue("border-color")) + 1) % colors.length];
    if (elem.parentNode == document.querySelectorAll("#List")[0]) elem.style.borderColor = colors[0];
    if (elem.tagName == "UL") Array.from(elem.childNodes).filter(_E0 => ["UL", "LI"].includes(_E0.tagName)).forEach(_E0 => setting_node_color_2(_E0));
}

function setting_node_color_3(elem, index) {
    let length = 3;
    index = index % length || 0;
    elem.classList.add("color_cycle_" + index);
    if (elem.tagName == "UL") Array.from(elem.childNodes).filter(_E0 => ["UL", "LI"].includes(_E0.tagName)).forEach(_E0 => setting_node_color_3(_E0, index + 1));
}