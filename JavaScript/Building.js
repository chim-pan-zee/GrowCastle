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
    this.radius = 500;
    this.target;
    this.frames = 0;
    this.image = new Image();
    this.image.src = "Assets/Soldier.png";
  }

  draw() {
    context.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );

    context.beginPath();
    context.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2); //사정거리
    context.fillStyle = "rgba(0, 0, 255, 0)";
    context.fill();
  }

  update() {
    this.draw();
    if (this.frames % 100 === 0 && this.target) {
      //적 추적 및 발사
      this.project_tiles.push(
        new ProjectTile({
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
