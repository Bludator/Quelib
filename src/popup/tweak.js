export default function tweak(instance){
    let un = typeof instance === "function" ?instance.prototype:instance.constructor.prototype
    let p = new Proxy(un,{
  get: function(target, property) {
      console.log(target,property)
      if (target[property]!==undefined) return target[property];
      if (!target.length) return target[0][property];
      let properties = [];
      for (const element of target) {
          properties.push(element[property]);
      }
      return properties;
  },
  set: function(target, property, value) {
      console.log(target)
      Array.prototype.forEach.call(target, e=>e[property]=value)
  }/*,
  apply:function (target, thisArg, argumentsList) {
      target.
  }*/
})
typeof instance === "function" ?instance.prototype = p:instance.constructor.prototype=p
//un.set("prototype", p).set("fn", p).set("prototype", p);
}

function set(property, value){
    if(this[property]) this[property]=value
    return this
}
function morph(object, into) {
    
}