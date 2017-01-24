var Pixel = window.Pixel;

var target = document.getElementById('output');
new Pixel({
  src: '/octocat.jpg',
  pixel: 20,
  row: 20,
  // hue: 50,
  // invert: true,
  hueRotate: 30,
  saturate: -.5
},function(set,get){
  set({
    pixel: 5,
    row: 64,
    shape: 'circle'
  });
  window.output = get('canvas');
  target.appendChild(output);
});