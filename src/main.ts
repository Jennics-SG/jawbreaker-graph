/** Name:   Jawbreaker main.ts
 *  Desc:   Main file for the graph visualliser, will handle HTML inputs
 *          and creation of tthe PIXI application for visualliser
 *  Auth:   Jimy Houlbrook
 *  Date:   29/08/2023
 */

import { Application } from 'pixi.js';

export default class Main{

    // Application to hold graph
    private app : Application;

    constructor(){
        this.app = new Application<HTMLCanvasElement>({
            height: 500,
            width: 500,
            hello: true,
            view: <HTMLCanvasElement>document.getElementById('chart')
        });
    }
}

document.addEventListener('DOMContentLoaded', () => new Main);