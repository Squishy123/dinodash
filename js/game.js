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
  }

  render() {
    //(img, sx, sy, sWidth, sHeight, x, y, width, height)
    this.stage.ctx.drawImage(this.image, this.sprites[this.loop].sx, this.sprites[this.loop].sy, this.sprites[this.loop].sWidth, this.sprites[this.loop].sHeight, 50, 50, this.sprites[this.loop].width, this.sprites[this.loop].height);

    if (this.loop >= 9) this.loop = 4;
    else this.loop++;
  }
}

let stage = new CanvasStage(document.querySelector('#stage'));
stage.background = function(ctx) {
  ctx.fillRect(0, 0, stage.width, stage.height);
  ctx.fill();
}
stage.start(10, 60);

stage.addActor(new Dino());
