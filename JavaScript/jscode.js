const canvas = document.querySelector("canvas"); //getElementById는 일치하는 id명을 찾아냄.
const context = canvas.getContext("2d"); //getElementById 메서드로 캔버스 객체를 먼저 찾고 캔버스의 getContext 메서드로 그리기 컨텍스트를 구한다
//변수명은 스네이크 표기법, 함수명은 카멜 표기법
canvas.width = 1280;
canvas.height = 768;

context.fillStyle = "green"; //캔버스 색상은 초록색
context.fillRect(0, 0, canvas.width, canvas.height); //context의 위치(0,0), 크기(canvas 크키)

const placement_tiles_data_2d = [];

for (let i = 0; i < placement_tiles_data.length; i += 20) {
  placement_tiles_data_2d.push(placement_tiles_data.slice(i, i + 20));
}

class PlacementTile {
  //타일 속성 클래스
  constructor({ position = { x: 0, y: 0 } }) {
    this.position = position;
    this.size = 64; //타일 사이즈는 64
    this.color = "green"; //타일 색깔은 초록색
  }

  draw() {
    //타일 그래픽
    context.fillStyle = this.color;
    context.fillRect(this.position.x, this.position.y, this.size, this.size);
  }
}

const placement_tiles = []; //타일 배열

placement_tiles_data_2d.forEach((row, y) => {
  //forEach란 반복문 함수로, row 값만큼 반복한다는 것
  row.forEach((symbol, x) => {
    //row만큼 반복하며 일치하는 값을 찾음
    if (symbol === 14) {
      //14는, placement_tiles_data배열에서 포탑을 설치할 수 있는 값
      placement_tiles.push(
        new PlacementTile({
          position: {
            x: x * 64,
            y: y * 64, //타일 사이즈
          },
        })
      );
    }
  });
});

console.log(placement_tiles);

const background_image = new Image();
background_image.onload = () => {
  //애니메이션 로드
  animate();
};
background_image.src = "Assets/sand_template.jpg";

class Enemy {
  //적 속성
  constructor({ position = { x: 0, y: 0 } }) {
    this.position = position; //위치(0, 0)
    this.width = 100; //적의 가로, 세로
    this.height = 100;
    this.waypointIndex = 0;
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    };
  }

  draw() {
    context.fillStyle = "red"; //캔버스 내 오브젝트들의 속성을 담당
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    //실행을 담당
    this.draw(); //업데이트에서 오브젝트 속성 실행

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

const enemies = []; //적 배열 생성
for (let i = 1; i < 10; i++) {
  //적이 반복문을 통해 연속해서 생성됨
  const x_offset = i * 150;
  enemies.push(
    new Enemy({
      position: { x: waypoints[0].x - x_offset, y: waypoints[0].y }, //enemies 배열 내의 값들을 Enemy 클래스로 푸쉬
    })
  );
}

function animate() {
  //동작 담당 함수
  requestAnimationFrame(animate);

  context.drawImage(background_image, 0, 0);
  enemies.forEach((enemy) => {
    enemy.update();
  });

  placement_tiles.forEach((tile) => {
    tile.draw();
  });
}
