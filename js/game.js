class Dino extends CanvasActor {
  preload() {
    this.image = new Image();
    this.image.src = "res/dino.png";
  }

  render() {
    this.stage.ctx.drawImage(this.image, 100, 100);
  }
}

let stage = new CanvasStage(document.querySelector('#stage'));
stage.background = function(ctx) {
  ctx.fillRect(0, 0, stage.width, stage.height);
  ctx.fill();
}
stage.start(60, 60);

stage.addActor(new Dino());
