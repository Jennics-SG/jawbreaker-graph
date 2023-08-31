/** Name:   jawbreaker.main.ts
 *  Desc:   Main file for the graph visualliser, will handle HTML inputs
 *          and creation of tthe PIXI application for visualliser
 *  Auth:   Jimy Houlbrook
 *  Date:   29/08/2023
 */

import { Application, Container } from 'pixi.js';
import { Circle } from './circle';

export default class Main{

    // Application to hold graph
    private app : Application;

    // Array of circles within background
    private sections: Circle[];

    // Background circle
    private bgCircle : Circle;

    /** Constructor for main.ts
     *  initialise global variables and initialise the webpage
     */
    constructor(){
        // Initialise globals
        this.app = new Application<HTMLCanvasElement>({
            height: 500,
            width: 500,
            hello: true,
            view: <HTMLCanvasElement>document.getElementById('chart'),
            background: "#89CFF0",
            antialias: true
        });

        this.sections = new Array<Circle>;

        // Create background circle
        this.bgCircle = new Circle(
            this.app.view.width / 2, this.app.view.height / 2, (this.app.view.width / 8) * 3, 0xFF0000, 0, false
        );

        // Container to hold chart
        const container : Container = new Container();
        this.app.stage.addChild(container);

        // Add bgCircle to container
        container.addChild(this.bgCircle.getGraphics());

        // Button for adding section to the chart
        const addSectionButton = <HTMLButtonElement>document.getElementById("addSection");
        addSectionButton.addEventListener('click', () => {
            let circle : Circle = this.createSection();
            container.addChild(circle.getGraphics());
        });
    }

    /** createSection
     *  
     *  Creates a new section that is half the size of the last added section,
     *  or half the size of the background
     * 
     * @returns Circle  The new circle that has been created.
     */
    private createSection() : Circle{


        let lastCircle : Circle = this.sections.length === 0 ?
            this.bgCircle : this.sections[this.sections.length - 1];

        // Getting % of the radius does not create an accurate representation of
        // The percentage when shown in graph, therefore we are going to use
        // the area of the circle to create new sections
        let lastArea : number = lastCircle.getArea();
        let newArea : number = lastArea / 2;
        let radius : number = Math.sqrt(newArea / Math.PI);

        let areaOfBg = this.bgCircle.getArea();

        let newCircle : Circle = new Circle(
            this.app.view.width / 2, this.app.view.height / 2, radius, 0x008000, areaOfBg
        );

        this.sections.push(newCircle);
        return newCircle
    }
}
document.addEventListener('DOMContentLoaded', () => new Main);