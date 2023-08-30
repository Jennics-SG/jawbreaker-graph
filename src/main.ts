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
    private sections: Circle[];
    private bgCircle : Circle;

    constructor(){
        this.app = new Application<HTMLCanvasElement>({
            height: 500,
            width: 500,
            hello: true,
            view: <HTMLCanvasElement>document.getElementById('chart'),
            background: "#89CFF0",
            antialias: true
        });

        this.sections = new Array<Circle>;

        // Container to hold chart
        const container : Container = new Container();
        this.app.stage.addChild(container);

        // Create background circle
        this.bgCircle = new Circle(
            this.app.view.width / 2, this.app.view.height / 2, (this.app.view.width / 8) * 3, 0xFF0000, false);
        container.addChild(this.bgCircle.getGraphics());

        const addSectionButton = <HTMLButtonElement>document.getElementById("addSection");
        addSectionButton.addEventListener('click', () => {
            let circle : Circle = this.createSection();
            container.addChild(circle.getGraphics());
        });
    }

    private createSection() : Circle{
        console.log(this.sections)
        let sectionsLength : number = this.sections.length;

        let radius : number = this.sections.length === 0 ? 
            this.bgCircle.r / 2 : this.sections[this.sections.length - 1].r / 2

        let newCircle : Circle = new Circle(
            this.app.view.width / 2, this.app.view.height / 2, radius, 0x008000);

        this.sections.push(newCircle);
        return newCircle
    }
}

document.addEventListener('DOMContentLoaded', () => new Main);