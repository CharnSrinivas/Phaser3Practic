import Phaser from "phaser";
import { TileHeight, TileWidth, box_diamond_pair } from "../Utils/constants";
import { BoxCollection, Box } from "../GameInterfaces";
export default class Player {
    player?: Phaser.GameObjects.Sprite;
    pushable_boxes?: BoxCollection[];
    static_walls?: Phaser.GameObjects.Sprite[];
    scene: Phaser.Scene;
    can_move: boolean = true;
    player_layer?: Phaser.Tilemaps.TilemapLayer;
    constructor(scene: Phaser.Scene) { this.scene = scene; }

    createPlayer(player: Phaser.GameObjects.Sprite, pushable_boxes: BoxCollection[], static_walls: Phaser.GameObjects.Sprite[], layer: Phaser.Tilemaps.TilemapLayer) {
        this.pushable_boxes = pushable_boxes;
        this.static_walls = static_walls;
        this.player = player;
        this.player.setOrigin(0);
        this.createAnimations();
        this.player_layer = layer;
    };
    private move(x: number, y: number, box?: Box, onStart?: Function) {
        if (!this.can_move || !this.player) return;
        let player_mid_x = this.player.x + TileWidth / 2;
        let player_mid_y = this.player.y + TileHeight / 2;

        if (this.checkWallAt(player_mid_x + x, player_mid_y + y)) return;
        let _x = '+=0';
        let _y = '+=0';
        (x < 0) ? _x = `-=${-x}` : null;
        (x > 0) ? _x = `+=${x}` : null;
        (y < 0) ? _y = `-=${-y}` : null;
        (y > 0) ? _y = `+=${y}` : null;
        if (box) {
            let box_mid = [box.box.x + TileWidth / 2, box.box.y + TileHeight / 2];
            if(this.getBoxAt(box_mid[0] + x, box_mid[1]+y))return;// ? check if pushing two boxes
            console.log(this.checkDiamondAt(box_mid[0] + x, box_mid[1] + y, box.index));
            if (this.checkWallAt(player_mid_x + 2 * x, player_mid_y + 2 * y)) return;
            this.scene.add.tween(
                {
                    targets: box.box,
                    duration: 500,
                    x: _x,
                    y: _y,
                }
            )
        }
        this.scene.add.tween(
            {
                targets: this.player,
                duration: 500,
                x: _x,
                y: _y,
                onComplete: this.makeIdle,
                onStart: () => { this.can_move = false; if (onStart) onStart(); }
            }
        )
    }
    moveLeft(): void {
        let box = this.getBoxAt(this.player!.x - TileWidth / 2, this.player!.y + TileHeight / 2);
        this.move(-TileWidth, 0, box, () => { this.player?.anims.play('left') });
    };
    moveRight = (): void => {
        let box = this.getBoxAt(this.player!.x + TileWidth + (TileWidth / 2), this.player!.y + TileHeight / 2);
        this.move(TileWidth, 0, box, () => { this.player?.anims.play('right') },);
    };
    moveUp = (): void => {
        let box = this.getBoxAt(this.player!.x + TileWidth / 2, this.player!.y - TileHeight / 2);
        this.move(0, -TileHeight, box, () => { this.player?.anims.play('up') });
    };
    moveDown = (): void => {
        let box = this.getBoxAt(this.player!.x + TileWidth / 2, this.player!.y + TileHeight + (TileHeight / 2));
        this.move(0, TileHeight, box, () => { this.player?.anims.play('up') });
    };
    makeIdle = (): void => {
        this.can_move = true;
        if (this.player?.anims.currentAnim) {

            const key = this.player?.anims.currentAnim?.key;
            if (!key.startsWith('idle-')) {
                this.player?.anims.play(`idle-${key}`)
            }
        }
    };


    createAnimations = (): void => {
        if (!this.player) return;
        this.player.anims.create({
            key: 'left',
            frames: this.player.anims.generateFrameNumbers('tiles', { start: 81, end: 83 }),
            frameRate: 10,
            repeat: -1
        })
        this.player.anims.create({
            key: 'right',
            frames: this.player.anims.generateFrameNumbers('tiles', { start: 78, end: 80 }),
            frameRate: 10,
            repeat: -1
        })
        this.player.anims.create({
            key: 'up',
            frames: this.player.anims.generateFrameNumbers('tiles', { start: 55, end: 57 }),
            frameRate: 10,
            repeat: -1
        })
        this.player.anims.create({
            key: 'down',
            frames: this.player.anims.generateFrameNumbers('tiles', { start: 52, end: 54 }),
            frameRate: 10,
            repeat: -1
        })
        // ? Idle Animations
        this.player.anims.create({
            key: 'idle-left',
            frames: [{ frame: 81, key: 'tiles' }],
            frameRate: 0,
            repeat: -1
        })
        this.player.anims.create({
            key: 'idle-right',
            frames: [{ frame: 78, key: 'tiles' }],
            frameRate: 0,
            repeat: -1
        })
        this.player.anims.create({
            key: 'idle-up',
            frames: [{ frame: 55, key: 'tiles' }],
            frameRate: 0,
            repeat: -1
        })
        this.player.anims.create({
            key: 'idle-down',
            frames: [{ frame: 52, key: 'tiles' }],
            frameRate: 0,
            repeat: -1
        })

    };

    checkWallAt = (x: number, y: number) => {
        return this.static_walls!.find((static_wall) => {
            return static_wall.getBounds().contains(x, y);
        })

    }

    getTileIndexAt = (x: number, y: number) => {
        let diamond = this.player_layer?.getTileAtWorldXY(x, y);
        return diamond ? diamond.index : undefined;
    }
    getBoxAt(x: number, y: number) {
        if (!this.pushable_boxes) return;
        for (let i = 0; i < this.pushable_boxes.length; i++) {
            let box_coll = this.pushable_boxes[i];
            for (let a = 0; a < box_coll.boxes.length; a++) {
                const box = box_coll.boxes[a];
                if (box.getBounds().contains(x, y)) {
                    let _box: Box = { box: box, index: box_coll.index };
                    return _box
                };
            }
        }
    }
    checkDiamondAt(x: number, y: number, box_index: number) {
        let diamond_tile_index = this.getTileIndexAt(x, y);
        if (diamond_tile_index === box_diamond_pair[box_index]) {
            return true;
        } return false;
    }
}