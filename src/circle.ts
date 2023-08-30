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
    constructor(x : number, y : number, r : number, col : number, percent : number = 0, canEdit : boolean = true){
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


        // Create HTML Elements
        const container = <HTMLDivElement>document.getElementById("size_inputs");

        // Icons to change between color & percent select
        const percSelect : HTMLButtonElement = document.createElement("button")

        // Div for percentage select
        const percDiv : HTMLDivElement = document.createElement("div");
        percDiv.id = "flexDiv"
        container.appendChild(percDiv);

        const percentInput : HTMLInputElement = document.createElement("input");
        percentInput.type = "number";
        percentInput.placeholder = percent.toString();
        percentInput.style.display = "flex";
        percentInput.maxLength = 2;
        percDiv.appendChild(percentInput);

        const percentSymbol : HTMLParagraphElement = document.createElement("p");
        percentSymbol.innerHTML = "%"
        percDiv.appendChild(percentSymbol);

        // const colorInput : HTMLInputElement = document.createElement("input");
        // colorInput.type = "color";
        // colorInput.style.display = "none";
        // parentDiv.appendChild(colorInput);
    }


    public getGraphics() : Graphics{
        return this.graphics;
    }
}