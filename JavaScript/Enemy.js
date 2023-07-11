class Enemy extends Sprites {
  constructor({ position = { x: 0, y: 0 } }) {
    super({
      position,
      image_src: "Assets/Monster.png",
      frames: {
        max: 4,
      },
    });
    this.width = 100;
    this.height = 100;
    this.waypoint_index = 0;
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    };
    this.radius = 50;
    this.health = 100;
    this.velocity = {
      x: 0,
      y: 0,
    };
  }

  draw() {
    super.draw();
    // health bar
    context.fillStyle = "black";
    context.fillRect(this.position.x, this.position.y - 15, this.width, 10);

    context.fillStyle = "green";
    context.fillRect(
      this.position.x,
      this.position.y - 15,
      (this.width * this.health) / 100,
      10
    );
  }

  update() {
    this.draw();

    const waypoint = waypoints[this.waypoint_index];
    const y_distance = waypoint.y - this.center.y;
    const x_distance = waypoint.x - this.center.x;
    const angle = Math.atan2(y_distance, x_distance);

    const speed = 3; //몬스터 속도

    this.velocity.x = Math.cos(angle) * speed;
    this.velocity.y = Math.sin(angle) * speed;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    };

    if (
      Math.abs(Math.round(this.center.x) - Math.round(waypoint.x)) <
        Math.abs(this.velocity.x) &&
      Math.abs(Math.round(this.center.y) - Math.round(waypoint.y)) <
        Math.abs(this.velocity.y) &&
      this.waypoint_index < waypoints.length - 1
    ) {
      this.waypoint_index++;
    }
  }
}
