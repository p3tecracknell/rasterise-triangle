```javascript
var rasteriseTriangle = require("rasterise-triangle")
var triangle = {
points: [{x: 0, y: 0}, {x: 50, y: 50}, {x:10, y: 20}],
color: [120,120,120,1]
}
var w = 5
var h = 5
var data = new Array(w * h * 4)
return rasteriseTriangle.fillTriangle(triangle, data, w, h)
```
