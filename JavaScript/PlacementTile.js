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
