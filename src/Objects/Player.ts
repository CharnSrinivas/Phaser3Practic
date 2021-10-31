import Phaser from "phaser";
export default class Player {
    player: Phaser.GameObjects.Sprite | undefined;

    createPlayer(player: Phaser.GameObjects.Sprite) {
        this.player = player;
        this.player.anims.create({
            key: 'left',
            frames: this.player.anims.generateFrameNumbers('tiles', { start: 81, end: 83 }),
            frameRate: 10,
            repeat: -1
        })
        this.player.anims.create({
            key: 'right',
            frames: this.player.anims.generateFrameNumbers('tiles', { start: 78, end: 810 }),
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
            frames: [{ frame: 81,key:'tiles' }],
            frameRate: 0,
            repeat: -1
        })
        this.player.anims.create({
            key: 'idle-right',
            frames: [{ frame: 78 ,key:'tiles'}],
            frameRate: 0,
            repeat: -1
        })
        this.player.anims.create({
            key: 'idle-up',
            frames: [{ frame: 55,key:'tiles' }],
            frameRate: 0,
            repeat: -1
        })
        this.player.anims.create({
            key: 'idle-down',
            frames: [{ frame: 52,key:'tiles' }],
            frameRate: 0,
            repeat: -1
        })

    };
    moveLeft() :void{
        this.player?.anims.play('left',true);
    }
    moveRight() :void{
        this.player?.anims.play('right',true);
    }
    moveUp() :void{
        this.player?.anims.play('up',true);
    }
    moveDown() :void{
        this.player?.anims.play('down',true);
    }
    makeIdle() :void{
        if (this.player?.anims.currentAnim) {
            const key = this.player?.anims.currentAnim?.key;
            if (!key?.startsWith('idle-')) {
                this.player?.anims.play(`idle-${key}`)
            }
        }
    }
}