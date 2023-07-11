class Castle {
  constructor({ position = { x: 0, y: 0 } }) {
    //constructor는 생성자라는 뜻. 기본 정보들을 할당
    this.position = position;
    this.width = 428; //타일 사이즈는 64
    this.height = 600; //타일 사이즈는 64
    this.color = "rgba(128, 128, 128, 1)"; //타일 색깔은 옅은 검정
    this.health = 10000; //성 체력
  }

  draw() {
    //타일 그래픽
    // context.fillStyle = this.color;
    // context.fillRect(this.position.x, this.position.y, this.width, this.height);

    context.fillStyle = "black";
    context.fillRect(
      this.position.x - 50,
      this.position.y - 90,
      this.width,
      30
    );

    context.fillStyle = "green";
    context.fillRect(
      this.position.x - 50,
      this.position.y - 90,
      this.health,
      30
    );
  }

  update() {
    //마우스 정보 업데이트
    this.draw();
  }
}
