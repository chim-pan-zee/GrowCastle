class ProjectTile extends Sprites {
  //화살
  constructor({ position = { x: 0, y: 0 }, enemy }) {
    super({ position, image_src: "Assets/Bullet.png" });
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.enemy = enemy;
    this.radius = 10;

    this.image = new Image();
    this.image.src = "Assets/Bullet.png";
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
