class SpriteSheet {
  constructor(src, sWidth, sHeight, numSprites, scale) {
    this.src = src;
    this.sWidth = sWidth;
    this.sHeight = sHeight;
    this.numSprites = numSprites
    this.scale = scale || 1;

    //set image to null for now
    this.image = null;

    //Array where we keep sprite data
    this.sprites = [];
  }

  preload() {
    this.image = new Image();
    this.image.src = this.src;
  }

  generate() {
    //Sprites have to be linear for now ;)
    for (let i = 0; i < this.numSprites; i++) {
      this.sprites.push({
        sx: i * this.sWidth,
        sy: 0,
        sWidth: this.sWidth,
        sHeight: this.sHeight,
        width: this.sWidth * this.scale,
        height: this.sHeight * this.scale
      });
    }
  }
}


class Dino extends CanvasActor {
  preload() {
    //build sprite sheets
    let spriteSheet = new SpriteSheet("res/dino.png", 24, 24, 24);
    spriteSheet.preload();
    spriteSheet.generate();

    this.sprites = spriteSheet.sprites;
    //console.log(this.sprites);

    this.image = spriteSheet.image;

    this.loop = 4;

    //inputHandler
    this.input = new InputHandler();
    this.input.targetEvents(document, {
      keydown: true,
      keyup: true
    });

    this.setBounds({
      width: 24,
      height: 24,
      x: 50,
      y: 50
    });

    //jumping code
    this.vx = 0;
    this.vy = 0;
    this.ax = 2.5;
    this.ay = -2.5;
    this.grounded = false;
    this.jump = false;
  }

  render() {
    if (this.loop >= 9) this.loop = 4;
    else this.loop++;
  }

  update() {
    //clear canvas
    //this.stage.ctx.clearRect(this.x, this.y, this.width, this.height);
    //(img, sx, sy, sWidth, sHeight, x, y, width, height)
    this.stage.ctx.drawImage(this.image, this.sprites[this.loop].sx, this.sprites[this.loop].sy, this.sprites[this.loop].sWidth, this.sprites[this.loop].sHeight, this.x, this.y, this.sprites[this.loop].width, this.sprites[this.loop].height);

    if (this.y >= 50) {
      this.grounded = true;
    } else this.grounded = false;
    if (!this.grounded) this.vy += this.ay;
    if (this.grounded) this.vy = 0;
    //Jump
    if (this.grounded)
      if (this.input.keys[87])
        this.vy += 10;

    //movement
    if (this.input.keys[65]) this.x -= this.ax;
    if (this.input.keys[68]) this.x += this.ax;

    this.setBounds({
      x: this.x + this.vx,
      y: this.y - this.vy
    });
  }
}

let stage = new CanvasStage(document.querySelector('#stage'));
stage.background = function(ctx) {
  let time = (new Date()).getTime();
  let bg = Math.sin(time);
  ctx.fillStyle = (bg < 0) ? "red" : "orange";
  ctx.fillRect(0, 0, stage.width, stage.height);
  ctx.fill();
}
stage.start(10, 60);

stage.addActor(new Dino());
