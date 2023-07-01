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
    this.waypointIndex = 0;
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    };
  }

  draw() {
    context.fillStyle = "red";
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();

    const waypoint = waypoints[this.waypointIndex];
    const y_distance = waypoint.y - this.center.y;
    const x_distance = waypoint.x - this.center.x;
    const angle = Math.atan2(y_distance, x_distance);
    this.position.x += Math.cos(angle);
    this.position.y += Math.sin(angle);
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    };

    if (
      Math.round(this.center.x) === Math.round(waypoint.x) &&
      Math.round(this.center.y) === Math.round(waypoint.y) &&
      this.waypointIndex < waypoints.length - 1
    ) {
      this.waypointIndex++;
    }
  }
}

const enemies = [];
for (let i = 0; i < 10; i++) {
  const x_offset = i * 150;
  enemies.push(
    new Enemy({
      position: { x: waypoints[0].x - x_offset, y: waypoints[0].y }, //enemies 배열 내의 값들을 Enemy 클래스로 푸쉬
    })
  );
}

function animate() {
  requestAnimationFrame(animate);

  context.drawImage(background_image, 0, 0);
  enemies.forEach((enemy) => {
    enemy.update();
  });
}
