# Quelib
All libs of this kind can eg:
```javascript
$(()=>{/* Do on load */});

// query HTML nodes
let array = $(".query");

// and do something with its properties.
$(".query").on("click", ()=>{});
```
Why not have it for all properties and methods?

```javascript
// Disable all .homeButtons
$(".homeButton").disabled = true;

// Get array of id of buttons with .homeButton class
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

[//]: # (←↓→ act as a comment)
[//]: # (### Performance concerns)