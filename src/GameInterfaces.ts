import Phaser from "phaser";
export interface BoxCollection{
    index:number;boxes:Phaser.GameObjects.Sprite[]
}

export interface Box{
    index:number;box:Phaser.GameObjects.Sprite;
}