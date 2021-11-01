import * as Phaser from "phaser";
import { TileHeight, TileWidth } from "../../Utils/constants";
import Player from '../../Objects/Player';
import { pushable_Box_indexes, static_walls_indexes } from "../../Utils/constants";
import { BoxCollection } from "../../GameInterfaces"
export default class extends Phaser.Scene {
     level?: number[][];
    private player: Player | undefined = new Player(this);
    private boxes: BoxCollection[] = [];
    private cursor?: Phaser.Types.Input.Keyboard.CursorKeys;
    private static_walls: Phaser.GameObjects.Sprite[] = [];
    preload() {
        // this.load.tilemapTiledJSON('map', 'assets/level.json');
        this.load.spritesheet('tiles', ('assets/tilesheet.png'),
            {
                frameWidth: 128,
                startFrame: 0
            }
        )
    }
    create() {
        let time = new Date().getTime();
        this.level = [
            [100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
            [100, 0, 0, 0,52, 0, 0, 0, 0, 100],
            [100, 0, 0, 0, 9, 8, 0, 0, 0, 100],
            [100, 0, 51, 0,64, 0, 0, 0, 0, 100],
            [100, 0, 0, 0, 0, 0, 0, 0, 0, 100],
            [100, 0, 0, 0, 12, 0, 0, 0, 0, 100],
            [100, 0, 0, 0, 0, 0, 0, 0, 0, 100],
            [100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
        ]

        const map = this.make.tilemap({ data: this.level, tileWidth: TileWidth, tileHeight: TileHeight });
        const tileset = map.addTilesetImage('tiles');
        const layer = map.createLayer(0, tileset, 0, 0);
        const player = layer.createFromTiles(52, 0, { frame: 52, key: 'tiles' }).pop();

        this.cursor = this.input.keyboard.createCursorKeys();

        pushable_Box_indexes.forEach(i => {
            this.boxes.push({ index: i, boxes: layer.createFromTiles(i, 0, { frame: i, key: 'tiles' }) })
        });
        static_walls_indexes.forEach(i => {
            this.static_walls.push(...layer.createFromTiles(i, 0, { frame: i, key: 'tiles' }))
        })
        
        this.boxes.forEach(
            (box_coll) => {
                box_coll.boxes.forEach(box => box.setOrigin(0, 0))
            }
        );
        this.static_walls.forEach(wall => { wall.setOrigin(0, 0) });
        if (player)
            this.player?.createPlayer(player, this.boxes, this.static_walls,layer);



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