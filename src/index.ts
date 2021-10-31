import {Types,Game} from 'phaser';
import Scene from './Scenes/MainScene';
export const config:Types.Core.GameConfig = {                                
    type: Phaser.AUTO,
    width: 1280,
    height: 1024,
    physics:{default:'arcade',arcade:{gravity:{y:10},debug:true}
}
};
const MainGame = new Game(config);
MainGame.scene.add('game-scene',Scene);
MainGame.scene.start('game-scene');
