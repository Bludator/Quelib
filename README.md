
[![npm](https://img.shields.io/npm/v/quelib.svg)](https://www.npmjs.com/package/quelib)
[![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/quelib.svg)](https://www.npmjs.com/package/quelib)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/quelib.svg)](https://www.npmjs.com/package/quelib)
[![MIT](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/Bludator/Quelib/blob/master/LICENSE)
[![ES2015+](https://img.shields.io/badge/Browsers-ES2015%2B-green.svg)](#whyES2015)
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
$(".homeButton").addEventListener("click", ()=>{/*e.g. Go to homepage*/});
```
## Geting started
Install:
```
> npm i quelib
```
Import: 
``` javascript
// with a bundler:
import $ from "quelib";

//or in Vanilla JS something like this:
import $ from "./node_modules/quelib/release/quelib.js";
//+ don't forget add type="module" to script tag in html
```
Or you can use source files in `./src/` to bundle & minify it yourself.
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

<a name="whyES2015"></a> 
Usage of proxies restrict this lib to **ES2015+** environments.

[npm]: #
[//]: # (←↓→ act as a comment)
[//]: # (### Performance concerns)