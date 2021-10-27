import {Types,Game} from 'phaser';
import Scene from './Scenes/MainScene';
const config:Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics:{default:'arcade',arcade:{gravity:{y:200}}}
};
console.log(require('./assets/sky.png'))
const MainGame = new Game(config);
MainGame.scene.add('scene-1',Scene);
MainGame.scene.start('scene-1');
