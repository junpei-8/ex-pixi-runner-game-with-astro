import { Application } from 'pixi.js';
import { loadBackground, renderBackground } from './background';
import { createMainScreen } from './screen';

export async function init(element: Element) {
  // Preload する関数を呼び出す
  const loadingBackground = loadBackground();

  // Application を初期化
  const app = new Application();

  const initializing = app.init({ resizeTo: window });

  const mainScreen = createMainScreen();

  await initializing;

  await Promise.all([renderBackground(app, mainScreen, loadingBackground)]);

  // メインスクリーンをアプリケーションに追加
  app.stage.addChild(mainScreen);

  // Application へレンダリング
  app.canvas.classList.add('pixi');
  element.appendChild(app.canvas);
}
