import * as Phaser from "phaser";
import Player from '../../Objects/Player';
// import {} from '../../assets/Levels/level_1.json'

export default class extends Phaser.Scene {
<<<<<<< HEAD
    level:[[]]= [[]];
    // constructor() {
    //     super("main-screen")        
    // }

=======
    level:number[][]|undefined;
    player:Player | undefined = new Player();
    private cursor?:Phaser.Types.Input.Keyboard.CursorKeys;
>>>>>>> 24761c84b68a6c08ef09781cfb5e42687ea51636
    preload() {
        
        console.log('preload');
        
        
        this.load.spritesheet('tiles', ('assets/tilesheet.png'), 
            {
                frameWidth: 128,
                startFrame: 0
            }
        )
<<<<<<< HEAD
        this.level =[[

        ]]

    }
    create() {
        // const map = this.make.tilemap({ key: 'map' });
        // const tiles = map.addTilesetImage('sokobon','tiles');        
        const map = this.make.tilemap({data:this.level,tileWidth:})
        const layer = map.createLayer('my_layer', tiles, 0, 0);

=======
    }
    create() {
        this.level=[
            [100 ,100,  100,  100 , 100, 100 ,100 , 100 , 100 ,100] ,
            [100 , 0   , 0 ,  0 ,   0,    0,   0,   0,    0,   100],
            [100 , 0 ,   0 ,  0 ,  0,    0,   0,   0,    0,   100],
            [100 , 0 ,   0 ,  0 ,   0,    0,   0,   0,    0,   100],
            [100 , 0 ,   0 ,  0 ,   0,    0,   0,   0,    0,   100],
            [100 , 0 ,   0 ,  0 ,   0,    0,   0,   0,    0,   100],
            [100 , 0 ,   0 ,  0 ,   0,    0,   0,   0,    52,   100],
            [100 ,100 , 100 , 100 , 100, 100, 100, 100,   100,   100],
        ]
        const map = this.make.tilemap({data:this.level,tileHeight:128,tileWidth:128});
        const tiles = map.addTilesetImage('tiles');
        const layer = map.createLayer(0,tiles);
        const player  = layer.createFromTiles(52,0,{ frame:52,key:'tiles'}).pop();
        this.cursor = this.input.keyboard.createCursorKeys();
        if (player)
            this.player?.createPlayer(player);        
        
    }
    update(){
        if(this.cursor?.left.isDown){
            this.player?.moveLeft();
        }
        else if(this.cursor?.right.isDown){
            this.player?.moveRight();
        }
        else if(this.cursor?.up.isDown){
            this.player?.moveUp();
        }
        else if(this.cursor?.down.isDown){
            this.player?.moveDown();
        }
        else{this.player?.makeIdle()}
>>>>>>> 24761c84b68a6c08ef09781cfb5e42687ea51636
    }
}