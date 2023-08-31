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
    public col: number;

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
    constructor(x : number, y : number, r : number, col : number, bgArea : number, canEdit : boolean = true){
        this.graphics = new Graphics();
        this.x = x;
        this.y = y;
        this.r = r;
        this.col = col;

        // Draw circle in background
        this.drawCircle();

        if(!canEdit) return;

        // Create HTML Elements for editing
        const container = <HTMLDivElement>document.getElementById("size_inputs");

        // Container to hold color & perc select icons
        const iconCont : HTMLDivElement = document.createElement("div");
        iconCont.id = "optSelect"
        container.appendChild(iconCont);

        // Icons to change between color & percent select
        const percSelect : HTMLImageElement = document.createElement("img");
        percSelect.id = "icon";
        percSelect.src = "./images/percent.png";
        iconCont.appendChild(percSelect);

        // Div for percentage select
        const percDiv : HTMLDivElement = document.createElement("div");
        percDiv.id = "flexDiv"
        container.appendChild(percDiv);

        // Calc percentage of area new circle takes up
        let area : number = this.getArea();
        let percent : number = Math.ceil((area / bgArea) * 100); 

        const percentInput : HTMLInputElement = document.createElement("input");
        percentInput.type = "number";
        percentInput.min = "1";
        percentInput.max = "100";
        percentInput.placeholder = percent.toString();
        percentInput.style.display = "flex";
        percentInput.maxLength = 2;
        percDiv.appendChild(percentInput);

        // Resize on input
        percentInput.addEventListener('input', () : void => this.resize(bgArea, percentInput))

        const percentSymbol : HTMLParagraphElement = document.createElement("p");
        percentSymbol.innerHTML = "%"
        percDiv.appendChild(percentSymbol);

        // const colorInput : HTMLInputElement = document.createElement("input");
        // colorInput.type = "color";
        // colorInput.style.display = "none";
        // parentDiv.appendChild(colorInput);
    }

    private drawCircle() {
        // Clear current graphics
        this.graphics.clear();

        // Draw new circle
        this.graphics.beginFill(this.col);
        this.graphics.drawCircle(this.x, this.y, this.r);
        this.graphics.endFill();
    }

    private resize(bgArea : number, percIpt : HTMLInputElement) {
        // Ensure input is between max and min value
        let percent : number = isNaN(parseFloat(percIpt.value)) ? 0 : parseFloat(percIpt.value);

        if (percent > 100){
            percent = 100;
            percIpt.value = "100";
        } else if (percent < 0.1){
            percent = 0.1;
            percIpt.value = "0.1";
        }
        let area : number = (bgArea / 100) * percent;
        this.r = Math.sqrt(area / Math.PI);
        this.drawCircle();
    }

    public getArea() : number {
        return Math.PI * Math.pow(this.r, 2);
    }

    public getGraphics() : Graphics{
        return this.graphics;
    }
}