import Phaser from "phaser";
import { TileHeight, TileWidth } from "../Utils/constants";
export default class Player {
    player?: Phaser.GameObjects.Sprite;
    boxes?: Phaser.GameObjects.Sprite[];
    scene: Phaser.Scene;
    can_move: boolean = true;
    constructor(scene: Phaser.Scene) { this.scene = scene; }

    createPlayer(player: Phaser.GameObjects.Sprite, boxes: Phaser.GameObjects.Sprite[]) {
        this.boxes = boxes;
        this.player = player;
        this.player.setOrigin(0);
        this.createAnimations();
    };
    private move(box?: Phaser.GameObjects.Sprite, onStart?: Function, x?: string, y?: string) {
        if (!this.can_move) return
        if (box) {
            this.scene.add.tween(
                {
                    targets: box,
                    duration: 500,
                    x: x ? x : '+=0',
                    y: y ? y : '+=0',
                }
            )
        }
        this.scene.add.tween(
            {
                targets: this.player,
                duration: 500,
                x: x ? x : '+=0',
                y: y ? y : '+=0',
                onComplete: this.makeIdle,
                onStart: () => { this.can_move = false; if (onStart) onStart(); }
            }
        )
    }
    moveLeft(): void {
        let box = this.getBoxAt(this.player!.x - TileWidth / 2, this.player!.y + TileHeight / 2, this.boxes);
        this.move(box, () => { this.player?.anims.play('left') }, `-=${TileWidth}`);
    };
    moveRight = (): void => {
        let box = this.getBoxAt(this.player!.x + TileWidth + (TileWidth / 2), this.player!.y + TileHeight / 2, this.boxes);
        this.move(box, () => { this.player?.anims.play('right') }, `+=${TileWidth}`);
    };
    moveUp = (): void => {
        let box = this.getBoxAt(this.player!.x + TileWidth / 2, this.player!.y - TileHeight / 2, this.boxes);
        this.move(box, () => { this.player?.anims.play('up') }, undefined, `-=${TileHeight}`);
    };
    moveDown = (): void => {
        let box = this.getBoxAt(this.player!.x + TileWidth / 2, this.player!.y + TileHeight + (TileHeight / 2), this.boxes);
        this.move(box, () => { this.player?.anims.play('up') }, undefined, `+=${TileHeight}`);
    };
    makeIdle = (): void => {
        this.can_move = true;
        if (this.player?.anims.currentAnim) {

            const key = this.player?.anims.currentAnim?.key;
            if (!key.startsWith('idle-')) {
                console.log(key);
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

    checkWallAt(x:number,y:number){
        
    }
    getBoxAt = (x: number, y: number, boxes?: Phaser.GameObjects.Sprite[]) => {
        return boxes?.
            find((box) => {
                return box.getBounds().contains(x, y);
            })
    }
}