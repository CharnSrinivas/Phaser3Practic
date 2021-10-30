import * as Phaser from "phaser";
// import {} from '../../assets/Levels/level_1.json'

export default class extends Phaser.Scene {
    // constructor() {
    //     super("main-screen")        
    // }

    preload() {
        
        console.log('preload');
        
        this.load.tilemapTiledJSON('tiled_map', 'assets/Levels/level_1.json')
        this.load.spritesheet('tiles', ('assets/tilesheet.png'), 
            {
                frameWidth: 128,
                startFrame: 0
            }
        )
    }
    create() {
        console.log('creat');
        // this.add.sprite(400,300,'tiles',1)
        const map = this.make.tilemap({ key: 'tiled_map' });
        const tiles = map.addTilesetImage('tiles');
        console.log(
            tiles
        );
        
        const layer = map.createLayer('my_layer', tiles, 0, 0);
        

    }
}