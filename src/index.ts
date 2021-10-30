import {Types,Game} from 'phaser';
import Scene from './Scenes/MainScene';
export const config:Types.Core.GameConfig = {                                
    type: Phaser.AUTO,
    width: 20*64,// ? Width of tile sheet X tile width
    height: 20*64,// ? Height of tile sheet X tile height
    physics:{default:'arcade',arcade:{gravity:{y:10},debug:true}
}
};
const MainGame = new Game(config);
MainGame.scene.add('game-scene',Scene);
MainGame.scene.start('game-scene');
