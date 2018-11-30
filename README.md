|||
---|---
Download package| ~~[npm]~~
environment |ES6+|
size (gzipped)|~ 3.2 KB (~ 1.4 KB)

# Quelib
As all libs of this kind even this one can do:
```javascript
$(()=>{/* Do on load */});

// query HTML nodes
let array = $(".query");

//access queried nodes
let node = $(".query")[0];

// and do something with its properties or methods.
$(".query").on("click", ()=>{});
```
However, why have a limited set of properties and methods to work with? Maybe you want others or all of them. 
With this lib you can get, set or call all properties or functions defined on queried nodes.

```javascript
// Disable all .homeButtons
$(".homeButton").disabled = true;

// Get array of ids of buttons with .homeButton class
let array = $(".homeButton").id; 

// Assigns click event handler to all .homeButtons 
$(".homeButton").addEventListener(()=>{/*Go to homepage*/});
```
## Reference
* `hide()`
* `show()`
* `toggle()`
### Aliases
`addAlias(alias, property)`
#### Predefined aliases
name|is alias of
---|---
`on()`|`addEventListener()`
`off()`|`removeEventListener()`
---
## Remarks
### Property lookup
By default it looks in nodes' properties first; then, if not found, it looks in prototype chain. To alter this you can: 

* Use prefixes to force one or the other behavior. 
    * `$` to force lookup on nodes.
    * `_` to force lookup in prototype chain (= standart behavior without this lib).

    To change these call `setPrefixes(noMagic, magic)`.

* Call `setPrefixes(noMagic, magic)` with `noMagic` set to empty string.

Usage of proxies restrict this lib to **ES6+** environments.

[npm]: #
[//]: # (←↓→ act as a comment)
[//]: # (### Performance concerns)