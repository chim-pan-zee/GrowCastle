class Sprites {
  constructor({ position = { x: 0, y: 0 }, image_src, frames = { max: 1 } }) {
    this.position = position;
    this.image = new Image();
    this.image.src = image_src;
    this.frames = {
      max: frames.max,
      current: 0,
      elapsed: 0,
      hold: 5,
    };
  }

  draw() {
    const crop_width = this.image.width / this.frames.max;
    const crop = {
      position: {
        x: crop_width * this.frames.current,
        y: 0,
      },
      width: crop_width,
      height: this.image.height,
    };
    context.drawImage(
      this.image,
      crop.position.x,
      crop.position.y,
      crop.width,
      crop.height,
      this.position.x,
      this.position.y,
      crop.width,
      crop.height
    );

    this.frames.elapsed++;
    if (this.frames.elapsed % this.frames.hold === 0) {
      this.frames.current++;
      if (this.frames.current >= this.frames.max - 1) {
        this.frames.current = 0;
      }
    }
  }
}
