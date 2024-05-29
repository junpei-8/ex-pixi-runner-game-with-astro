import { Application, Assets, Container, Sprite, Texture } from 'pixi.js';
import BackgroundPngImgPath from '../images/bg.png?url';

export function loadBackground() {
  return Assets.load([BackgroundPngImgPath]).then(
    (assets) => assets[BackgroundPngImgPath] as Texture
  );
}

export async function renderBackground(
  app: Application,
  screen: Container,
  backgroundPngImg: Promise<Texture>
) {
  const background = new Background(app, await backgroundPngImg);
  return screen.addChild(background);
}

export class Background extends Sprite {
  constructor(app: Application, texture: Texture) {
    super(texture);

    this.width = app.screen.width;
    this.height = app.screen.height;

    window.addEventListener(
      'resize',
      () => (
        (this.width = app.screen.width), (this.height = app.screen.height)
      ),
      { passive: true }
    );
  }
}
