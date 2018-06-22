var fs = require('fs')
var path = require('path')
var Canvas = require('canvas')
const rasterise = require('../rasterise')

const IMAGE_WIDTH = 500
const IMAGE_HEIGHT = 500

function random(max) {
  return Math.floor(Math.random() * max)
}

const canvas = Canvas.createCanvas(IMAGE_WIDTH, IMAGE_HEIGHT)
const ctx = canvas.getContext('2d')

const imgData = ctx.getImageData(0,0,IMAGE_WIDTH,IMAGE_HEIGHT);
const data = imgData.data;

for (var i = 0; i < 50; i++) {
  var triangle = {
    points: [
      {x: random(IMAGE_WIDTH), y: random(IMAGE_HEIGHT)},
      {x: random(IMAGE_WIDTH), y: random(IMAGE_HEIGHT)},
      {x: random(IMAGE_WIDTH), y: random(IMAGE_HEIGHT)}
    ],
    color: [random(255), random(255), random(255), Math.random()]
  }
  rasterise.fillTriangle(triangle, data, IMAGE_WIDTH, IMAGE_HEIGHT)
}

ctx.putImageData(imgData, 0, 0)

canvas.createPNGStream().pipe(fs.createWriteStream(path.join(__dirname, 'ray.png')))
