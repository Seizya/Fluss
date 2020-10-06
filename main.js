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