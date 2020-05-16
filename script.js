const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.height = innerHeight;
canvas.width = innerWidth;
ctx.fillStyle = "black";
ctx.rect(80, 80, 80, 80);
ctx.fill();

let image = new Image();

function analyseImg(image) {
  let pixelArr = { r: 0, g: 0, b: 0 };
  let pixels = ctx.getImageData(0, 0, image.width, image.height);
  console.log(pixels);
  let count = 0;
  for (let pixel = 0; pixel < pixels.data.length; pixel += 20) {
    pixelArr.r += pixels.data[pixel];
    pixelArr.g += pixels.data[pixel + 1];
    pixelArr.b += pixels.data[pixel + 2];
    count++;
  }
  pixelArr.r = Math.floor(pixelArr.r / count);
  pixelArr.g = Math.floor(pixelArr.g / count);
  pixelArr.b = Math.floor(pixelArr.b / count);
  console.log(pixelArr);
  let hex = fullColorHex(pixelArr.r, pixelArr.g, pixelArr.b);
  updateHex(hex);
}

var rgbToHex = function (rgb) {
  let hex = Number(rgb).toString(16);
  if (hex.length < 2) {
    hex = "0" + hex;
  }
  return hex;
};
var fullColorHex = function (r, g, b) {
  let red = rgbToHex(r);
  let green = rgbToHex(g);
  let blue = rgbToHex(b);
  return red + green + blue;
};

function displayFile(e) {
  image.src = e.target.result;
  image.onload = function () {
    document.getElementById("input").src = image.src;
    ctx.drawImage(image, 0, 0);
    analyseImg(image);
  };
}

function LoadNewImage(e) {
  let uploaded = e.target.files[0];
  let read = new FileReader();
  read.addEventListener("load", displayFile);
  read.readAsDataURL(uploaded);
}

function updateHex(hex) {
  console.log(hex);
  document.body.style.backgroundColor = "#" + hex;
  document.getElementById("hex").innerText = "#" + hex;
}

document.getElementById("load").addEventListener("change", function (e) {
  LoadNewImage(e);
});
