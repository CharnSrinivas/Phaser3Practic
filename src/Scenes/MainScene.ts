import Phaser, { Physics } from "phaser";

export default class Scene_1 extends Phaser.Scene {

    player: Player;
    platforms: Phaser.Physics.Arcade.StaticGroup;
    cursors:Phaser.Types.Input.Keyboard.CursorKeys ;
    preload() {
        this.load.image('sky', require('../assets/sky.png'));
        this.load.image('ground', require('../assets/platform.png'));
        this.load.image('star', require('../assets/star.png'));
        this.load.image('bomb', require('../assets/bomb.png'));
        this.load.spritesheet('dude',
            require('../assets/dude.png'),
            { frameWidth: 32, frameHeight: 48 }
        );
    }
    create() {
        this.add.image(400, 300, 'sky');
        this.add.image(400, 300, 'star');
        const platforms = this.physics.add.staticGroup();
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');
        this.player = new Player(this, 100, 450);
        this.physics.add.collider(platforms, this.player)
        this.cursors =this.input.keyboard.createCursorKeys();
    }
    update(){
        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-160);
        
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(160);
        
            this.player.anims.play('right', true);
        }
        else
        {
            this.player.setVelocityX(0);
        
            this.player.anims.play('turn');
        }
        
        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-330);
        }
    }
}

class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'dude');
        this.setActive(true)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.setCollideWorldBounds(true)
        this.setBounce(0.2);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        this.setGravityY(300);
    }
    
}