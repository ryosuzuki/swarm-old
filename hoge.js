
const Jimp = require('jimp')
const path = './circle.png'

Jimp.read(path, (err, img) => {
  if (err) throw err
  img.resize(10, 10)
  .greyscale()

  var hoge = img.clone()

  const width = img.bitmap.width
  const height = img.bitmap.height

  let array = []
  hoge.scan(0, 0, width, height, function(x, y, idx) {
    let r = this.bitmap.data[idx + 0]
    let g = this.bitmap.data[idx + 1]
    let b = this.bitmap.data[idx + 2]
    let a = this.bitmap.data[idx + 3]

    let value = (r + g + b) / 3
    if (value > 250) {
      array.push({ x: x, y: y, value: value })
    }

  })
  console.log(array.length)

})

/*
[ { x: 4, y: 1, value: 254 },
  { x: 5, y: 1, value: 254 },
  { x: 3, y: 2, value: 254 },
  { x: 4, y: 2, value: 254 },
  { x: 5, y: 2, value: 254 },
  { x: 6, y: 2, value: 254 },
  { x: 2, y: 3, value: 254 },
  { x: 3, y: 3, value: 254 },
  { x: 4, y: 3, value: 254 },
  { x: 5, y: 3, value: 254 },
  { x: 6, y: 3, value: 254 },
  { x: 7, y: 3, value: 254 },
  { x: 1, y: 4, value: 254 },
  { x: 2, y: 4, value: 254 },
  { x: 3, y: 4, value: 254 },
  { x: 4, y: 4, value: 254 },
  { x: 5, y: 4, value: 254 },
  { x: 6, y: 4, value: 254 },
  { x: 7, y: 4, value: 254 },
  { x: 8, y: 4, value: 254 },
  { x: 1, y: 5, value: 254 },
  { x: 2, y: 5, value: 254 },
  { x: 3, y: 5, value: 254 },
  { x: 4, y: 5, value: 254 },
  { x: 5, y: 5, value: 254 },
  { x: 6, y: 5, value: 254 },
  { x: 7, y: 5, value: 254 },
  { x: 8, y: 5, value: 254 },
  { x: 2, y: 6, value: 254 },
  { x: 3, y: 6, value: 254 },
  { x: 4, y: 6, value: 254 },
  { x: 5, y: 6, value: 254 },
  { x: 6, y: 6, value: 254 },
  { x: 7, y: 6, value: 254 },
  { x: 3, y: 7, value: 254 },
  { x: 4, y: 7, value: 254 },
  { x: 5, y: 7, value: 254 },
  { x: 6, y: 7, value: 254 },
  { x: 4, y: 8, value: 254 },
  { x: 5, y: 8, value: 254 } ]
 */