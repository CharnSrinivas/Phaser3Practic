import * as Phaser from "phaser";
// import {} from '../../assets/Levels/level_1.json'

export default class extends Phaser.Scene {
    // constructor() {
    //     super("main-screen")        
    // }

    preload() {
        
        console.log('preload');
        
        this.load.tilemapTiledJSON('map', 'assets/Levels/level_1.json')
        this.load.spritesheet('tiles', ('assets/tilesheet.png'), 
            {
                frameWidth: 128,
                startFrame: 0
            }
        )
        // this.load.image('tiles','assets/tilesheet.png');
    }
    create() {
        const map = this.make.tilemap({ key: 'map' });
        const tiles = map.addTilesetImage('sokobon','tiles');
        console.log(tiles);
        
        const layer = map.createLayer('my_layer', tiles, 0, 0);

    }
}