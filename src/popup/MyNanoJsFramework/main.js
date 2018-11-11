import {wrap} from "./tweak.js";
export {wrap, tweak} from "./tweak.js";

export default function $(param){
    if (typeof param === "function") {
        if (document.readyState === "completed") {
            param()
        }else{
            document.addEventListener("DOMContentLoaded", param)
        }
    }else{
        CreateObject.prototype = queryObject;
        return new CreateObject(param)
    }
}

function CreateObject(query) {
    let nodeList = document.querySelectorAll(query);

    this.length = nodeList.length;
    for (var i = 0; i < this.length; i++) {
        this[i] = nodeList[i];
    }
    
}

function QueryObject(){
    this.on = function(a, b){this.addEventListener(a,b)};
    this.off = function(a, b){this.removeEventListener(a,b)};
}
QueryObject.prototype = wrap(Array.prototype);
var queryObject = new QueryObject();