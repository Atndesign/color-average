const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.height = innerHeight;
canvas.width = innerWidth;
ctx.fillStyle = "black";
ctx.rect(80, 80, 80, 80);
ctx.fill();

const image = new Image();

image.src = "./img/test.png";
image.onload = function () {
  ctx.drawImage(image, 0, 0);
};
