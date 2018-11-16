var RealPrefix = "_";
var NodesPrefix = "$";
/**
 * Inserts MagicProxy to prototype chain
 * @param {Object} instance instance whose prototype's prototype will be wrapped into MagicProxy
 */
export default function tweak(instance) {
    let prototype = Object.getPrototypeOf(instance);
    let p = new Proxy(Object.getPrototypeOf(prototype), handler);
    Object.setPrototypeOf(prototype, p);
}

/**
 * Wraps object into proxy
 * @param {Object} object 
 */
export function wrap(object) {
    return new Proxy(object, handler);
}

/**
 * Sets prefixes
 * @param {string} noMagic Prefix to enforce casual behavior
 *                          - set to "" to use this for all (un-prefixed) properties (aka Compatibility mode)
 * @param {string} queryMagic Prefix to do magic on array-like object (with nodes)
 */
export function setPrefixes(noMagic, queryMagic) {
    RealPrefix = noMagic;
    NodesPrefix = queryMagic;
}

let handler = {
    get: function(target, property, receiver) {
        console.log("get", receiver, property);

        return prefixResolution(
            property,
            receiver,
            () => {
                return target[property];
            },
            () => {
                if (typeof receiver[0][property] === "function") {
                    return function(...params) {
                        for (let i = 0; i < receiver.length; i++) {
                            receiver[i][property](...params);
                        }
                    };
                } else {
                    let properties = [];
                    for (let i = 0; i < receiver.length; i++) {
                        properties.push(receiver[i][property]);
                    }
                    //Enables nested calls
                    Object.setPrototypeOf(properties, wrap(Array.prototype));
                    return properties;
                }
            }
        );
    },
    set: function(target, property, value, receiver) {
        console.log("set", receiver, property, value);

        prefixResolution(
            property,
            receiver,
            () => {
                Object.defineProperty(receiver, property, { value });
            },
            () => {
                for (let i = 0; i < receiver.length; i++) {
                    receiver[i][property] = value;
                }
            }
        );
        return true;
    }
};

/**
 * What to do?
 * @param {string} propertyName 
 * @param {Object} receiver object on which is property needed
 * @param {function} doNormal Callback to do usual
 * @param {function} iterateNodes Callback to do magic
 */
function prefixResolution(propertyName, receiver, doNormal, iterateNodes) {
    //NodesPrefix have to be 1. to make RealPrefix="" overridable by NodesPrefix
    if (propertyName.startsWith(NodesPrefix)) {
        return iterateNodes();
    } else if (propertyName.startsWith(RealPrefix)) {
        return doNormal();
    } else {
        //Default:
        if (isArrayLike(receiver) && propertyName in receiver[0]) {
            return iterateNodes();
        } else {
            return doNormal();
        }
    }
}
function isArrayLike(object) {
    if (object instanceof Array) return true;
    if (
        Object.prototype.hasOwnProperty.apply(object, ["0"]) &&
        Object.prototype.hasOwnProperty.apply(object, ["length"])
    )
        return true;
    return false;
}
