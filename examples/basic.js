const rasterise = require('../rasterise')

const width = 5
const height = 5

const data = new Uint8ClampedArray(width * height * 4)

var triangle = {
  points: [
    {x: 0, y: 0 },
    {x: 5, y: 5 },
    {x: 0, y: 5 }
  ],
  color: [255, 0, 0, 1]
}

rasterise.fillTriangle(triangle, data, width, height)
console.log(data)
