var image = new Image()
var canvas = $('#canvas')[0]
var context = canvas.getContext("2d");

image.onload = () => {
  canvas.width = image.width
  canvas.height = image.height
  context.drawImage(image, 0, 0);
  var imageData = context.getImageData(0, 0, image.width, image.height)
  var gray = new jsfeat.matrix_t(image.width, image.height, jsfeat.U8C1_t)

  // gray.imgproc.grayscale(imageData, gray.data)

  // gray.copyToImageDataU8C1(targetData)
  // context.putImageData(targetData, 0, 0)

}

image.src = "/octocat.jpg";

jsfeat.matrix_t.prototype.copyToImageDataU8C1 =
function (dstImageData) {
  var width = dstImageData.width;
  var height = dstImageData.height;
  var dst = dstImageData.data;
  var src = this.data;
  var r, c, v, dstOffset;
  for (r = 0; r < height; r++) {
    for (c = 0; c < width; c++) {
      v = src[(r * width) + c];
      dstOffset = (r * width * 4) + (c * 4);
      dst[dstOffset + 0] = v; // R
      dst[dstOffset + 1] = v; // G
      dst[dstOffset + 2] = v; // B
      dst[dstOffset + 3] = 255; // A
    }
  }
};
