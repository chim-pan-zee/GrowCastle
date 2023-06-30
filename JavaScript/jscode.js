//변수명은 스네이크 표기법, 함수명은 카멜 표기법
const canvas = document.getElementById("canvas"); //getElementById는 일치하는 id명을 찾아냄.
const context = canvas.getContext("2d"); //getElementById 메서드로 캔버스 객체를 먼저 찾고 캔버스의 getContext 메서드로 그리기 컨텍스트를 구한다

canvas.width = 1280;
canvas.height = 768;

context.fillStyle = "green";
context.fillRect(0, 0, canvas.width, canvas.height);

const background_image = new Image();
background_image.onload = () => {
  //애니메이션 로드
  animate();
};
background_image.src = "Assets/sand_template.jpg";

class Enemy {
  constructor({ position = { x: 0, y: 0 } }) {
    this.position = position;
    this.width = 100; //적의 가로, 세로
    this.height = 100;
  }

  draw() {
    context.fillStyle = "red";
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();
    this.position.x += 1;
  }
}

const enemy = new Enemy({ position: { x: 200, y: 380 } });
const enem2 = new Enemy({ position: { x: 0, y: 380 } });

function animate() {
  requestAnimationFrame(animate);

  context.drawImage(background_image, 0, 0);
  enemy.update();
  enem2.update();

  // context.fillStyle = "red";
  // context.fillRect(x, 400, 100, 100);
  // x++;
}
