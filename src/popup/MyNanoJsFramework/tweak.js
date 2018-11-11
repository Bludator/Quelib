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
        console.log("get", receiver, property);
        if (target[property] !== undefined) return target[property];
        console.log("get1", receiver, property);
        //if (property === Symbol.iterator) return;//??
        if (isArrayLike(receiver) && receiver[0][property]) {
            console.log("get2", receiver, property);
            let properties = [];
            if (typeof receiver[0][property]==="function") {
                console.log("get3", receiver, property);
                return function name(a,b,c,d,e,f,g) {
                    console.log("get4", receiver, property);
                    for (let i = 0; i < receiver.length; i++) {
                        receiver[i][property](a,b,c,d,e,f,g)
                    }
                }
            }
            else{
                for (let i = 0; i < receiver.length; i++) {
                    properties.push(receiver[i][property]);
                }
            }
            Object.setPrototypeOf(properties, wrap(Array.prototype));
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
