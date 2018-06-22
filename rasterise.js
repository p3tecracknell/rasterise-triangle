

function float(x) {
  return x
}

const calcSlope = (va, vb) => (vb.x - va.x) / (vb.y - va.y)


module.exports = {
  fillTriangle: function(triangle, data, imageWidth, imageHeight) {
    let vertices = Array.from(triangle.points)
    vertices.sort((a, b) => a.y > b.y)
    if (vertices[1].y === vertices[2].y) {
      fillBottomFlatTriangle(vertices, triangle.color)
    } else if (vertices[0].y === vertices[1].y) {
      fillTopFlatTriangle(vertices, triangle.color)
    } else {
      let v4 = {
        x: vertices[0].x + Math.floor((vertices[1].y - vertices[0].y) / (vertices[2].y - vertices[0].y) * (vertices[2].x - vertices[0].x)),
        y: vertices[1].y
      }
      fillBottomFlatTriangle([vertices[0], vertices[1], v4], triangle.color)
      fillTopFlatTriangle([vertices[1], v4, vertices[2]], triangle.color)
    }

    function fillBottomFlatTriangle([v1, v2, v3], color) {
      const invslope1 = calcSlope(v1, v2)
      const invslope2 = calcSlope(v3, v1)

      let curx1 = v1.x
      let curx2 = v1.x

      for (let y = v1.y; y <= v2.y; y++) {
        horizontalLine(curx1, curx2, y, color);
        curx1 += invslope1;
        curx2 += invslope2;
      }
    }


    function fillTopFlatTriangle([v1, v2, v3], color) {
      const invslope1 = calcSlope(v3, v1)
      const invslope2 = calcSlope(v2, v3)

      let curx1 = v3.x
      let curx2 = v3.x

      for (let y = v3.y; y > v1.y; y--) {
        horizontalLine(curx1, curx2, y, color)
        curx1 -= invslope1
        curx2 -= invslope2
      }
    }

    function horizontalLine(x0, x1, y, color) {
      x0 = Math.round(x0)
      x1 = Math.round(x1)
      y = Math.round(y)

      let xMin, xMax
      if (x0 < x1) {
        xMin = x0
        xMax = x1
      } else {
        xMin = x1
        xMax = x0
      }

      for (let x = xMin; x <= xMax; x++) {
        plot(x, y, color)
      }
    }

    function plot(x, y, color) {
      const baseI = (x + (y * imageWidth)) * 4
      const oldAlpha = color[3]
      let newAlpha = 1 - (1 - oldAlpha) * (1 - data[baseI + 3]);
      data[baseI]   = blendChannel(color[0], oldAlpha, data[baseI]);
      data[baseI+1] = blendChannel(color[1], oldAlpha, data[baseI+1]);
      data[baseI+2] = blendChannel(color[2], oldAlpha, data[baseI+2]);
      data[baseI+3] = Math.round(oldAlpha * 255);
    }

    function blendChannel(foreground, foregroundAlpha, background) {
      return (foreground * foregroundAlpha) + (background * (1.0 - foregroundAlpha))
    }
  }
}
