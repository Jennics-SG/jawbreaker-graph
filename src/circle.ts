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
    public color: string;

    // Divs that hold perc and color inputs
    private percDiv : HTMLDivElement;
    private colorDiv : HTMLDivElement;

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
    constructor(x : number, y : number, r : number, color : string, bgArea : number, canEdit : boolean = true){
        this.graphics = new Graphics();
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;

        // Draw circle in background
        this.drawCircle();

        // Div for percentage select
        this.percDiv = document.createElement("div");

        // Div for color select
        this.colorDiv = document.createElement("div");

        if(!canEdit) return;

        // CREATE HTML ELEMENTS -----------------------------------------------
        const container = 
            <HTMLDivElement>document.getElementById("size_inputs");

        // Icons to change between color & percent select
        const iconCont : HTMLDivElement = document.createElement("div");
        iconCont.id = "optSelect"
        container.appendChild(iconCont);

        const percSelect : HTMLImageElement = document.createElement("img");
        percSelect.id = "icon";
        percSelect.src = "./images/percent.png";
        iconCont.appendChild(percSelect);
        percSelect.addEventListener('click', () => this.showPercInput());

        const colorSelect : HTMLImageElement = document.createElement("img");
        colorSelect.id = "icon";
        colorSelect.src = "./images/color.png";
        iconCont.appendChild(colorSelect);
        colorSelect.addEventListener('click', () => this.showColorInput());

        // Percent Input ------------------------------------------------------

        this.percDiv.id = "percDiv"
        this.percDiv.style.display = 'none';
        container.appendChild(this.percDiv);

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
        this.percDiv.appendChild(percentInput);

        // Resize on input
        percentInput.addEventListener('input', () : void => 
            this.resize(bgArea, percentInput)
        );

        const percentSymbol : HTMLParagraphElement = document.createElement("p");
        percentSymbol.innerHTML = "%"
        this.percDiv.appendChild(percentSymbol);

        // Color Input --------------------------------------------------------
        this.colorDiv.id = "colorDiv";
        this.colorDiv.style.display = "none";
        container.appendChild(this.colorDiv);

        const colorInput : HTMLInputElement = document.createElement("input");
        colorInput.type = "color";
        colorInput.value = this.color.replace('0x', "#");
        this.colorDiv.appendChild(colorInput);

        colorInput.addEventListener('input', () : void =>
            this.recolor(colorInput)
        );

        this.showPercInput();
    }

    // METHODS ----------------------------------------------------------------

    // Draw a circle at the current size
    private drawCircle() : void {
        // Clear current graphics
        this.graphics.clear();

        // Draw new circle
        this.graphics.beginFill(this.color);
        this.graphics.drawCircle(this.x, this.y, this.r);
        this.graphics.endFill();
    }

    // Resize the circle to inputted size
    private resize(bgArea : number, percIpt : HTMLInputElement) : void {
        // Ensure input is between max and min value
        let percent : number = isNaN(parseFloat(percIpt.value)) ? 
            0 : parseFloat(percIpt.value);

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

    private recolor(colorInput : HTMLInputElement) : void {
        let color = colorInput.value.replace("#", "0x");
        this.color = color;
        this.drawCircle();
    }

    private showPercInput() : void {
        this.percDiv.style.display = "flex";
        this.colorDiv.style.display = "none";
    }

    private showColorInput() : void {
        this.colorDiv.style.display = "flex";
        this.percDiv.style.display = "none";
    }

    // GETTERS ----------------------------------------------------------------

    // Get area
    public getArea() : number {
        return Math.PI * Math.pow(this.r, 2);
    }

    // Get graphics
    public getGraphics() : Graphics{
        return this.graphics;
    }
}