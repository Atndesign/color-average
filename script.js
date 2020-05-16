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
  let darkPixelArr = { r: 0, g: 0, b: 0 };
  let pixels = ctx.getImageData(0, 0, image.width, image.height);
  console.log(pixels);
  let count = 0;
  let darkCount = 0;
  for (let pixel = 0; pixel < pixels.data.length; pixel += 20) {
    let red = pixels.data[pixel];
    let green = pixels.data[pixel + 1];
    let blue = pixels.data[pixel + 2];

    if (checkLight(red, green, blue) > 150) {
      pixelArr.r += red;
      pixelArr.g += green;
      pixelArr.b += blue;
      count++;
    } else if (
      checkLight(red, green, blue) > 10 &&
      checkLight(red, green, blue) < 150
    ) {
      darkPixelArr.r += red;
      darkPixelArr.g += green;
      darkPixelArr.b += blue;
      darkCount++;
    }
  }
  pixelArr.r = Math.floor(pixelArr.r / count);
  pixelArr.g = Math.floor(pixelArr.g / count);
  pixelArr.b = Math.floor(pixelArr.b / count);

  darkPixelArr.r = Math.floor(darkPixelArr.r / darkCount);
  darkPixelArr.g = Math.floor(darkPixelArr.g / darkCount);
  darkPixelArr.b = Math.floor(darkPixelArr.b / darkCount);

  let hex = fullColorHex(pixelArr.r, pixelArr.g, pixelArr.b);
  let darkHex = fullColorHex(darkPixelArr.r, darkPixelArr.g, darkPixelArr.b);

  updateHex(hex, darkHex);
}
function checkLight(r, g, b) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
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

function updateHex(hex, darkHex) {
  console.log({ hex, darkHex });
  document.body.style.backgroundImage = `linear-gradient(45deg, #${hex}, #${darkHex})`;
  document.getElementById("hex").innerText = "#" + hex;
}

document.getElementById("load").addEventListener("change", function (e) {
  LoadNewImage(e);
});
