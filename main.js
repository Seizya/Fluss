export {
    Chain
}
from "./Seifuncs/main.js";
//-Events----------------------------------------
class Memo extends Map {
    constructor(arg) {
        super();
        this.parent = arg.parent;
        this.children = arg.children;
        this.title = arg.title;
        this.detail = arg.detail;
    }

    bear() {}

    die() {}
};

document.querySelectorAll(".button").forEach(_E0 => _E0.addEventListener("click", () => {
            	if(_E0.classList.contains("active")){
	            	_E0.classList.remove("active");
					_E0.nextElementSibling.descendantFlat().forEach(_E1 => {
						if (_E1.tagName == "LI" ){
							 _E1.classList.remove("active")
						 }else{ 
							_E1.classList.remove("open")
						}
					});
				}else{
					_E0.classList.add("active");
	                _E0.nextElementSibling.classList.add("open")
				}
            }))