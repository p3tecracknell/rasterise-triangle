```javascript
const Canvas = require('canvas')
const rasterise = require('rasterise-triangle')

const width = 100
const height = 100

const canvas = Canvas.createCanvas(width, height)
const ctx = canvas.getContext('2d')

const imgData = ctx.getImageData(0, 0, width, height)
const data = imgData.data

var triangle = {
  points: [
    {x: 0, y: 0 },
    {x: 50, y: 50 },
    {x: 5, y: 50 }
  ],
  color: [255, 0, 0, 1]
}

rasterise.fillTriangle(triangle, data, width, height)
ctx.putImageData(imgData, 0, 0)
console.log('<img src="' + canvas.toDataURL() + '" />')
```
