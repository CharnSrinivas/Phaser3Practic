import * as Phaser from "phaser";
import Player from '../../Objects/Player';
// import {} from '../../assets/Levels/level_1.json'

export default class extends Phaser.Scene {
    level?: number[][];
    player: Player | undefined = new Player(this);
    boxes: Phaser.GameObjects.Sprite[] = [];
    private cursor?: Phaser.Types.Input.Keyboard.CursorKeys;
    preload() {
        console.log('preload');
        this.load.tilemapTiledJSON('map', 'assets/level.json');
        this.load.spritesheet('tiles', ('assets/tilesheet.png'),
            {
                frameWidth: 128,
                startFrame: 0
            }
        )
    }
    create() {

        // this.level = [
        //     [100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
        //     [100, 0, 0, 0, 0, 0, 0, 0, 0, 100],
        //     [100, 0, 0, 0, 0, 0, 0, 0, 0, 100],
        //     [100, 0, 0, 0, 8, 52, 0, 0, 0, 100],
        //     [100, 0, 0, 0, 0, 0, 0, 0, 0, 100],
        //     [100, 0, 0, 0, 12, 0, 0, 0, 0, 100],
        //     [100, 0, 0, 0, 0, 0, 0, 0, 0, 100],
        //     [100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
        // ]

        /* const map = this.make.tilemap({ data: this.level, tileHeight: 128, tileWidth: 128 });
        const tiles = map.addTilesetImage('tiles');
        const layer = map.createLayer(0, tiles); 
        const player = layer.createFromTiles(52, 0, { frame: 52, key: 'tiles' }).pop();
        this.cursor = this.input.keyboard.createCursorKeys();
        this.boxes = layer.createFromTiles(8, 0, { frame: 8, key: 'tiles' });
        if (player)
            this.player?.createPlayer(player, this.boxes);
         this.boxes.forEach((box) => { box.setOrigin(0, 0) })*/
        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('sokoban-tileset', 'tiles');
        const layer = map.createLayer('player_layer', tileset, 0,);
        const player = layer.createFromTiles(53 , 0, { frame: 53, key: 'tiles' }).pop();
        this.cursor = this.input.keyboard.createCursorKeys();
        this.boxes = layer.createFromTiles(9, 0, { frame: 9, key: 'tiles' });
        if (player)
            this.player?.createPlayer(player, this.boxes);
        this.boxes.forEach((box) => { box.setOrigin(0, 0) })
    }
    update() {
        if (!this.cursor) return;

        if (Phaser.Input.Keyboard.JustDown(this.cursor.left)) {
            this.player?.moveLeft();
        }
        else if (Phaser.Input.Keyboard.JustDown(this.cursor.right)) {
            this.player?.moveRight();
        }
        else if (Phaser.Input.Keyboard.JustDown(this.cursor.up)) {
            this.player?.moveUp();
        }
        else if (Phaser.Input.Keyboard.JustDown(this.cursor.down)) {
            this.player?.moveDown();
        }

    }
}