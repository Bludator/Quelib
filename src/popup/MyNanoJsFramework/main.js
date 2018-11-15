import { wrap } from "./tweak.js";
export { wrap, tweak } from "./tweak.js";

/**
 * Create query object
 * @param {Function|string} param -
 * - Function to be called on DOMLoaded
 * - string CSS query
 */
export default function $(param) {
    if (typeof param === "function") {
        if (document.readyState === "completed") {
            param();
        } else {
            document.addEventListener("DOMContentLoaded", param);
        }
    } else {
        
        return new CreateObject(param);
    }
}
//Create prototype chain
QueryObject.prototype = wrap(Array.prototype);
var queryObject = new QueryObject();
CreateObject.prototype = queryObject;

//#region Aliases
queryObject.addAlias("on", "addEventListener");
queryObject.addAlias("off", "removeEventListener");
//#endregion

/**
 * Creates and populates array in Magic proxy
 * @param {*} query 
 */
function CreateObject(query) {
    let nodeList = document.querySelectorAll(query);

    //Object.defineProperty skips Proxy
    Object.defineProperty(this, "length", { value: nodeList.length});
    for (var i = 0; i < this.length; i++) {
        Object.defineProperty(this, i, { value: nodeList[i]});
    }
}

/**
 * Constructor for query object (prototype for all $(...))
 */
function QueryObject() {
    this.addAlias = function(alias, property) {
        Object.defineProperty(this, alias, {
            get: function() {
                return this[property];
            },
            set: function(value) {
                this[property] = value;
            }
        });
    };
}