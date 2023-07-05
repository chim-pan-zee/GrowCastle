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

const placement_tiles = []; //타일 배열

placement_tiles_data_2d.forEach((row, y) => {
  //forEach란 반복문 함수로, row 값만큼 반복한다는 것
  row.forEach((symbol, x) => {
    //row만큼 반복하며 일치하는 값을 찾음
    if (symbol === 14) {
      //1은, placement_tiles_data배열에서 포탑을 설치할 수 있는 값
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

const background_image = new Image();
background_image.onload = () => {
  //애니메이션 로드
  animate();
};
background_image.src = "Assets/sand_template.jpg"; //배경사진

const enemies = []; //적 배열 생성

function spawnEnemies(spawn_count) {
  //웨이브 당 적 마릿수 증가
  for (let i = 1; i < spawn_count + 1; i++) {
    //적이 반복문을 통해 연속해서 생성됨
    const x_offset = i * 150;
    enemies.push(
      new Enemy({
        position: { x: waypoints[0].x - x_offset, y: waypoints[0].y }, //enemies 배열 내의 값들을 Enemy 클래스로 푸쉬
      })
    );
  }
}

//각종 변수 정의
const buildings = [];
let active_tile = undefined;
let enemy_count = 3;
let castle_hp = 300;
spawnEnemies(enemy_count);

function animate() {
  //동작 담당 함수
  const animation_id = requestAnimationFrame(animate);

  context.drawImage(background_image, 0, 0);

  for (let i = enemies.length - 1; i >= 0; i--) {
    const enemy = enemies[i];
    enemy.update();

    if (enemy.position.x > 681) {
      //성문 위치에 몬스터들이 도달할 시 피해
      castle_hp -= 5;
      console.log("auch");

      if (castle_hp === 0) {
        console.log("defeat");
      }
    }
  }

  if (enemies.length === 0) {
    enemy_count += 2;
    spawnEnemies(enemy_count);
  }

  placement_tiles.forEach((tile) => {
    tile.update(mouse);
  });

  buildings.forEach((building) => {
    building.update();
    building.target = null; //타겟이 확인되지 않았을 시에는 null
    const valid_enemies = enemies.filter((enemy) => {
      //적이 범위 내로 들어왔는지 확인함.
      const x_difference = enemy.center.x - building.center.x;
      const y_difference = enemy.center.y - building.center.y;
      const distance = Math.hypot(x_difference, y_difference);
      return distance < enemy.radius + building.radius;
    });
    building.target = valid_enemies[0];

    for (let i = building.project_tiles.length - 1; i >= 0; i--) {
      const project_tile = building.project_tiles[i];

      project_tile.update();

      const x_difference =
        project_tile.enemy.center.x - project_tile.position.x;
      const y_difference =
        project_tile.enemy.center.y - project_tile.position.y;
      const distance = Math.hypot(x_difference, y_difference); //distance: 거리라는 뜻. 즉, 이러이러한 공식을 통해 거리 측정

      //적 공격
      if (distance < project_tile.enemy.radius + project_tile.radius) {
        project_tile.enemy.health -= 20; //공격력
        //적의 반경과의 거리가 가까워지면, 총알이 사라짐
        if (project_tile.enemy.health <= 0) {
          const enemy_index = enemies.findIndex((enemy) => {
            return project_tile.enemy === enemy;
          });

          if (enemy_index > -1) {
            enemies.splice(enemy_index, 1);
          }
        }
        building.project_tiles.splice(i, 1);
      }
    }
  });
}

const mouse = {
  //마우스의 x값과 y값
  x: undefined, //초기값은 없음
  y: undefined,
};

canvas.addEventListener("click", (event) => {
  //클릭 시 Building 클래스로 푸쉬
  if (active_tile && !active_tile.isOccupied) {
    buildings.push(
      new Building({
        position: {
          x: active_tile.position.x,
          y: active_tile.position.y,
        },
      })
    );
    active_tile.isOccupied = true;
    buildings.sort((a, b) => {
      return a.position.y - b.position.y;
    }); //이미 타일 내에 빌딩이 되었다면 더 이상 빌딩이 불가능함.
  }
});

// 마우스 움직임을 감지하는 이벤트 리스너 등록
window.addEventListener("mousemove", (event) => {
  // 마우스의 x, y 좌표값을 저장할 변수 초기화
  mouse.x = event.clientX; // 마우스의 x 좌표는 마우스 이벤트에서의 x 좌표값
  mouse.y = event.clientY; // 마우스의 y 좌표는 마우스 이벤트에서의 y 좌표값

  // 활성화된 타일 초기화
  active_tile = null;

  // 모든 타일을 순회하며 마우스가 위치한 타일을 찾음
  for (let i = 0; i < placement_tiles.length; i++) {
    const tile = placement_tiles[i]; // 타워 설치 타일

    // 마우스의 위치가 타일 내에 있는지 확인
    if (
      mouse.x > tile.position.x &&
      mouse.x < tile.position.x + tile.size &&
      mouse.y > tile.position.y &&
      mouse.y < tile.position.y + tile.size
    ) {
      // 마우스가 위치한 타일을 활성화된 타일로 설정하고 반복문 종료
      active_tile = tile;
      break;
    }
  }
});
