/** Name:   Jawbreaker.circle.ts
 *  Desc:   All logic for tthe circles, both main background and foreground.
 *  Author: Jimy Houlbrook
 *  Date:   30/08/2023
 */

import { Graphics } from "pixi.js";

export class Circle{

    // Graphics to draw circles
    private graphics : Graphics;

    public x : number;
    public y : number;
    public r : number;

    /** Constructor for circle
     * 
     *  Creates the circle in pixi and creates the html input
     *  elements to modify them 
     * 
     * @param x         Number      X pos
     * @param y         Number      Y pos
     * @param r         Number      radius
     * @param canEdit   Boolean     can circle be edited
     */
    constructor(x : number, y : number, r : number, col : number, canEdit : boolean = true){
        this.graphics = new Graphics();
        
        this.x = x;
        this.y = y;
        this.r = r;

        // Draw circle in background
        this.graphics.beginFill(col);
        this.graphics.drawCircle(this.x, this.y, this.r);
        this.graphics.endFill();


        // I am hoping that i will be acble
        // to just change the size of the circle
        // However, if that doesnt work, I am going
        // to place the drawing of the circle on a container,
        // and then clear the container when resizing.

        if(!canEdit) return;

        const container = <HTMLDivElement>document.getElementById("size_inputs");

        const div : HTMLDivElement = document.createElement("div");

        const percentInput : HTMLInputElement = document.createElement("input");
        percentInput.maxLength = 2;
        percentInput.step = "number";

        div.appendChild(percentInput);
        container.appendChild(div);
    }

    public getGraphics() : Graphics{
        return this.graphics;
    }
}