class PlacementTile {
  //타일 속성 클래스, 포탑 설치 타일
  constructor({ position = { x: 0, y: 0 } }) {
    //constructor는 생성자라는 뜻. 기본 정보들을 할당
    this.position = position;
    this.size = 64; //타일 사이즈는 64
    this.color = "rgba(0, 0, 0, 0.1)"; //타일 색깔은 옅은 검정
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
      //마우스 정보가 플레이스 타일과 일치할 시 코드실행
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
    this.waypointIndex = 0; //적 경로 정보
    this.center = {
      x: this.position.x + this.width / 2, //center는 너비와 높이의 중앙
      y: this.position.y + this.height / 2,
    };
    this.radius = 50; //반지름
    this.health = 100; //체력
  }

  draw() {
    //Enemy
    context.fillStyle = "red"; //캔버스 내 오브젝트들의 속성을 담당

    context.beginPath();
    context.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
    context.fill();

    //체력바
    context.fillStyle = "black";
    context.fillRect(this.position.x, this.position.y - 15, this.width, 10); //y값을 낮출수록 체력바 위치가 상승

    context.fillStyle = "green";
    context.fillRect(
      this.position.x,
      this.position.y - 15,
      (this.width * this.health) / 100,
      10
    );
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
    this.radius = 10;
  }

  draw() {
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = "orange";
    context.fill();
  }

  update() {
    this.draw();

    const angle = Math.atan2(
      this.enemy.center.y - this.position.y,
      this.enemy.center.x - this.position.x
    );

    const power = 5;
    this.velocity.x = Math.cos(angle) * power;
    this.velocity.y = Math.sin(angle) * power;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}

class Building {
  //일반 포탑
  constructor({ position = { x: 0, y: 0 } }) {
    this.position = position;
    this.width = 64; //64 * 64px
    this.height = 64;
    this.center = {
      //중앙값
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    };
    this.project_tiles = [];
    this.radius = 150;
    this.target;
    this.frames = 0;
  }

  draw() {
    context.fillStyle = "blue"; //포탑 색은 파란색
    context.fillRect(this.position.x, this.position.y, 64, 64);

    context.beginPath();
    context.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2); //사정거리
    context.fillStyle = "rgba(0, 0, 255, 0.1)";
    context.fill();
  }

  update() {
    this.draw();
    if (this.frames % 100 === 0 && this.target) {
      //적 추적 및 발사
      this.project_tiles.push(
        new Projecttile({
          position: {
            x: this.center.x,
            y: this.center.y,
          },
          enemy: this.target,
        })
      );
    }
    this.frames++;
  }
}

class LongBowArcher {
  //장궁수
  constructor({ position = { x: 0, y: 0 } }) {
    this.position = position;
    this.width = 64; //64 * 64px
    this.height = 64;
    this.center = {
      //중앙값
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    };
    this.project_tiles = [];
    this.radius = 600;
    this.target;
    this.frames = 0;
  }

  draw() {
    context.fillStyle = "green"; //포탑 색은 파란색
    context.fillRect(this.position.x, this.position.y, 64, 64);

    context.beginPath();
    context.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2); //사정거리
    context.fillStyle = "rgba(0, 0, 255, 0.5)";
    context.fill();
  }

  update() {
    this.draw();
    if (this.frames % 100 === 0 && this.target) {
      //적 추적 및 발사
      this.project_tiles.push(
        new Projecttile({
          position: {
            x: this.center.x,
            y: this.center.y,
          },
          enemy: this.target,
        })
      );
    }
    this.frames++;
  }
}
