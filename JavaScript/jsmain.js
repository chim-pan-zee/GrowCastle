const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = 1280;
canvas.height = 768;

context.fill = "blue";
context.fillRect(0, 0, canvas.width, canvas.height);

const background_image = new Image();
background_image.onload = () => {
  context.drawImage(background_image, 0, 0);
};
background_image.src = "Assets/background.png";
