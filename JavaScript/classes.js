// class PlacementTile {
//   //타일 속성 클래스, 포탑 설치 타일
//   constructor({ position = { x: 0, y: 0 } }) {
//     //constructor는 생성자라는 뜻. 기본 정보들을 할당
//     this.position = position;
//     this.size = 64; //타일 사이즈는 64
//     this.color = "rgba(0, 0, 0, 0.1)"; //타일 색깔은 옅은 검정
//     this.occupied = false;
//   }

//   draw() {
//     //타일 그래픽
//     context.fillStyle = this.color;
//     context.fillRect(this.position.x, this.position.y, this.size, this.size);
//   }

//   update(mouse) {
//     //마우스 정보 업데이트
//     this.draw();

//     if (
//       mouse.x > this.position.x &&
//       mouse.x < this.position.x + this.size &&
//       mouse.y > this.position.y &&
//       mouse.y < this.position.y + this.size
//     ) {
//       //마우스 정보가 플레이스 타일과 일치할 시 코드실행
//       this.color = "rgba(0, 0, 0, 0.5)";
//     } else this.color = "rgba(0, 0, 0, 0.1)";
//   }
// }

// class Castle {
//   constructor({ position = { x: 0, y: 0 } }) {
//     //constructor는 생성자라는 뜻. 기본 정보들을 할당
//     this.position = position;
//     this.width = 428; //타일 사이즈는 64
//     this.height = 600; //타일 사이즈는 64
//     this.color = "rgba(128, 128, 128, 1)"; //타일 색깔은 옅은 검정
//     this.health = 100; //성 체력
//   }

//   draw() {
//     //타일 그래픽
//     // context.fillStyle = this.color;
//     // context.fillRect(this.position.x, this.position.y, this.width, this.height);

//     context.fillStyle = "black";
//     context.fillRect(
//       this.position.x - 50,
//       this.position.y - 90,
//       this.width,
//       30
//     );

//     context.fillStyle = "green";
//     context.fillRect(
//       this.position.x - 50,
//       this.position.y - 90,
//       this.health,
//       30
//     );
//   }

//   update() {
//     //마우스 정보 업데이트
//     this.draw();
//   }
// }

// class Enemy {
//   constructor({ position = { x: 0, y: 0 } }) {
//     this.position = position;
//     this.width = 100;
//     this.height = 100;
//     this.waypoint_index = 0;
//     this.center = {
//       x: this.position.x + this.width / 2,
//       y: this.position.y + this.height / 2,
//     };
//     this.radius = 50;
//     this.health = 100;
//     this.velocity = {
//       x: 0,
//       y: 0,
//     };
//   }

//   draw() {
//     context.fillStyle = "red"; //캔버스 내 오브젝트들의 속성을 담당

//     context.beginPath();
//     context.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
//     context.fill();
//     // health bar
//     context.fillStyle = "black";
//     context.fillRect(this.position.x, this.position.y - 15, this.width, 10);

//     context.fillStyle = "green";
//     context.fillRect(
//       this.position.x,
//       this.position.y - 15,
//       (this.width * this.health) / 100,
//       10
//     );
//   }

//   update() {
//     this.draw();

//     const waypoint = waypoints[this.waypoint_index];
//     const y_distance = waypoint.y - this.center.y;
//     const x_distance = waypoint.x - this.center.x;
//     const angle = Math.atan2(y_distance, x_distance);

//     const speed = 10; //몬스터 속도

//     this.velocity.x = Math.cos(angle) * speed;
//     this.velocity.y = Math.sin(angle) * speed;

//     this.position.x += this.velocity.x;
//     this.position.y += this.velocity.y;

//     this.center = {
//       x: this.position.x + this.width / 2,
//       y: this.position.y + this.height / 2,
//     };

//     if (
//       Math.abs(Math.round(this.center.x) - Math.round(waypoint.x)) <
//         Math.abs(this.velocity.x) &&
//       Math.abs(Math.round(this.center.y) - Math.round(waypoint.y)) <
//         Math.abs(this.velocity.y) &&
//       this.waypoint_index < waypoints.length - 1
//     ) {
//       this.waypoint_index++;
//     }
//   }
// }

// class ProjectTile {
//   constructor({ position = { x: 0, y: 0 }, enemy }) {
//     this.position = position;
//     this.velocity = {
//       x: 0,
//       y: 0,
//     };
//     this.enemy = enemy;
//     this.radius = 10;
//   }

//   draw() {
//     context.beginPath();
//     context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
//     context.fillStyle = "orange";
//     context.fill();
//   }

//   update() {
//     this.draw();

//     const angle = Math.atan2(
//       this.enemy.center.y - this.position.y,
//       this.enemy.center.x - this.position.x
//     );

//     const power = 5;
//     this.velocity.x = Math.cos(angle) * power;
//     this.velocity.y = Math.sin(angle) * power;

//     this.position.x += this.velocity.x;
//     this.position.y += this.velocity.y;
//   }
// }

// class Building {
//   //일반 포탑
//   constructor({ position = { x: 0, y: 0 } }) {
//     this.position = position;
//     this.width = 64; //64 * 64px
//     this.height = 64;
//     this.center = {
//       //중앙값
//       x: this.position.x + this.width / 2,
//       y: this.position.y + this.height / 2,
//     };
//     this.project_tiles = [];
//     this.radius = 200;
//     this.target;
//     this.frames = 0;
//   }

//   draw() {
//     context.fillStyle = "blue"; //포탑 색은 파란색
//     context.fillRect(this.position.x, this.position.y, 64, 64);

//     context.beginPath();
//     context.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2); //사정거리
//     context.fillStyle = "rgba(0, 0, 255, 0.1)";
//     context.fill();
//   }

//   update() {
//     this.draw();
//     if (this.frames % 100 === 0 && this.target) {
//       //적 추적 및 발사
//       this.project_tiles.push(
//         new ProjectTile({
//           position: {
//             x: this.center.x,
//             y: this.center.y,
//           },
//           enemy: this.target,
//         })
//       );
//     }
//     this.frames++;
//   }
// }
