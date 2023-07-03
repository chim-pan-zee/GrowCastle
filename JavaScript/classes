class PlacementTile {
  //타일 속성 클래스, 포탑 설치 타일
  constructor({ position = { x: 0, y: 0 } }) {
    //constructor는 생성자라는 뜻. 기본 정보들을 할당
    this.position = position;
    this.size = 64; //타일 사이즈는 64
    this.color = "rgba(0, 0, 0, 0.1)"; //타일 색깔은 초록색
    this.occupied = false;
  }

  draw() {
    //타일 그래픽
    context.fillStyle = this.color;
    context.fillRect(this.position.x, this.position.y, this.size, this.size);
  }

  update(mouse) {
    //마우스 정보 업데이트
    this.draw();

    if (
      mouse.x > this.position.x &&
      mouse.x < this.position.x + this.size &&
      mouse.y > this.position.y &&
      mouse.y < this.position.y + this.size
    ) {
      console.log("colliding"); //마우스 정보가 플레이스 타일과 일치할 시 코드실행
      this.color = "rgba(0, 0, 0, 0.5)";
    } else this.color = "rgba(0, 0, 0, 0.1)";
  }
}

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
    this.radius = 50;
  }

  draw() {
    context.fillStyle = "red"; //캔버스 내 오브젝트들의 속성을 담당
    context.beginPath();
    context.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
    context.fill();
  }

  update() {
    //실행을 담당
    this.draw(); //draw는 구현

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

class Projecttile {
  constructor({ position = { x: 0, y: 0 }, enemy }) {
    this.position = position;
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.enemy = enemy;
  }

  draw() {
    context.beginPath();
    context.arc(this.position.x, this.position.y, 10, 0, Math.PI * 2);
    context.fillStyle = "orange";
    context.fill();
  }

  update() {
    this.draw();

    const angle = Math.atan2(
      enemies[0].center.y - this.position.y,
      enemies[0].center.x - this.position.x
    );

    this.velocity.x = Math.cos(angle);
    this.velocity.y = Math.sin(angle);

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

class Building {
  constructor({ position = { x: 0, y: 0 } }) {
    this.position = position;
    this.width = 64;
    this.height = 64;
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    };
    this.project_tiles = [
      new Projecttile({
        position: {
          x: this.center.x,
          y: this.center.y,
        },
        enemy: enemies[0],
      }),
    ];
  }

  draw() {
    context.fillStyle = "blue";
    context.fillRect(this.position.x, this.position.y, 64, 64);
  }
}
