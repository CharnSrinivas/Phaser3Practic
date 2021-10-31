import { GameObjects } from "phaser";
export function getBoxAt(x: number, y: number, boxes: GameObjects.Sprite[]) {
    return boxes.
        find((box) => {
            return box.getBounds().contains(x, y);
        })
}