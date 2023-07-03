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

const buildings = [];
let active_tile = undefined;

function animate() {
  //동작 담당 함수
  requestAnimationFrame(animate);

  context.drawImage(background_image, 0, 0);
  enemies.forEach((enemy) => {
    enemy.update();
  });

  placement_tiles.forEach((tile) => {
    tile.update(mouse);
  });

  buildings.forEach((building) => {
    building.draw();

    building.project_tiles.forEach((project_tile) => {
      project_tile.update();

      const xDifference =
        project_tile.enemy.position.x - project_tile.position.x;
      console.log(xDifference);
      //const distance = Math.hypot();
    });
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
    active_tile.isOccupied = true; //이미 타일 내에 빌딩이 되었다면 더 이상 빌딩이 불가능함.
  }
  console.log(buildings);
});

window.addEventListener("mousemove", (event) => {
  //마우스 동작 감지
  mouse.x = event.clientX; //마우스의 x값은 마우스 동작 감지에서의 x값
  mouse.y = event.clientY; //마우스의 y값은 마우스 동작 감지에서의 y값

  active_tile = null;
  for (let i = 0; i < placement_tiles.length; i++) {
    const tile = placement_tiles[i];
    if (
      mouse.x > tile.position.x &&
      mouse.x < tile.position.x + tile.size &&
      mouse.y > tile.position.y &&
      mouse.y < tile.position.y + tile.size
    ) {
      active_tile = tile;
      break;
    }
  }

  console.log(active_tile);
});
