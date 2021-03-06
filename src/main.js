import { wrap } from "./tweak.js";

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
//Create prototype chain:
//CreateObject-->QueryObject-->(Proxy)-->Array
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
    Object.defineProperty(this, "length", { value: nodeList.length });
    for (var i = 0; i < this.length; i++) {
        Object.defineProperty(this, i, { value: nodeList[i] });
    }
}

const collapsedClass = `.QuelibCollapsed`;
$(() => {
    //Add CSS class for hide/show/toggle
    let node = document.createElement("style");
    document.head.appendChild(node);
    node.sheet.insertRule(collapsedClass + " { display: none !important}");
});

/**
 * Constructor for query object (prototype for all $(...))
 */
function QueryObject() {
    this.hide = function() {
        this.classList.add(collapsedClass);
    };
    this.show = function() {
        this.classList.remove(collapsedClass);
    };
    this.toggle = function() {
        for (const element of this) {
            if (element.classList.contains(collapsedClass)) {
                element.classList.remove(collapsedClass);
            } else {
                element.classList.add(collapsedClass);
            }
        }
    };

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
