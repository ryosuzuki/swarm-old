var image = new Image()
var canvas = $('#canvas')[0]
var context = canvas.getContext("2d");

image.onload = () => {
  const row = 10
  let width = row
  let height = image.height / image.width * row

  canvas.width = image.width
  canvas.height = image.height
  context.drawImage(image, 0, 0, width, height);

  var imageData = context.getImageData(0, 0, width, height)

  let data = imageData.data
  let array = []
  for (let i = 0; i < data.length; i += 4) {
    let r = data[i]
    let g = data[i + 1]
    let b = data[i + 2]
    let a = data[i + 3] / 255
    array.push({ r: r, g: g, b: b, a: a })
  }

  let y = -1
  let positions = array.map((color, index) => {
    let val = (color.r + color.g + color.b) / 3
    let x = index % width
    if (x === 0) y++
    if (val === 255) {
      return { x: x, y: y, val: val }
    }
  })
  console.log(positions)
  // array.forEach((color, index) => {
  //   let x = index % width
  //   if (x === 0) {
  //     ++y
  //   }

  //   let val = (color.r + color.g + color.b) / 3

  //   if (val === 255) {
  //     console.log(`x: ${x}, y: ${y}, val: ${val}`)
  //   }
  // })
}

image.src = "/circle.png";
