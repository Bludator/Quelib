var prototype;
var RealPrefix;
var ProxyPrefix;
export default function tweak(instance, prefix = "$", p2="_") {
    prototype = Object.getPrototypeOf(instance);
    let p = new Proxy(Object.getPrototypeOf(prototype), handler);
    Object.setPrototypeOf(prototype, p);
}

export function wrap(object) {
    return new Proxy(object, handler);
}

let handler = {
    get: function(target, property, receiver) {
        if (target[property] !== undefined) return target[property];
        //if (property === Symbol.iterator) return;//??
        if (isArrayLike(receiver) && receiver[0][property]) {
            console.log("get", receiver, property);
            let properties = [];
            for (let i = 0; i < receiver.length; i++) {
                properties.push(receiver[i][property]);
            }
            return properties;
        } else {
            return undefined;
        }
        //if function return
    },
    set: function(target, property, value, receiver) {
        if (isArrayLike(receiver) && receiver[0][property]) {
            console.log("set", receiver, property, value);
            for (let i = 0; i < receiver.length; i++) {
                receiver[i][property] = value;
            }
        } else {
            Object.defineProperty(receiver, property, { value });
        }
        return true;
    } /*,
    apply:function (target, thisArg, argumentsList) {
    }*/
};
function isArrayLike(object) {
    if (object instanceof Array) return true;
    //if (object.hasOwnProperty(Symbol.iterator)) return true;//good?
    if (object.hasOwnProperty("0") && object.hasOwnProperty("length")) return true;
    return false;
}
