
import { abstractElement } from './element.js';

export class Grid extends abstractElement {
    constructor(canvas, options) {
        super(canvas, options);
    }

    draw() {
        this.init();
        let _posY = point => {
            return this.height - point * cellHeidht * scaleYRate  + this.top;
        };
        let _posX = point => {
            return point * cellWidth  + this.left;
        };

        let ctx = this.canvas.getContext("2d");
        let cellHeidht = this.height / (this.options.horizontal);
        let cellWidth = this.width / (this.options.vertical - 1);
        let scaleYRate = this.scaleYRate || 1;

        ctx.beginPath();
        ctx.lineWidth = this.options.width;
        ctx.strokeStyle = this.options.color;

        ctx.shadowColor = this.options.shadowColor || '';
        ctx.shadowBlur = this.options.shadowBlur || 0;

        for (let i = 0, ii = this.options.horizontal; i < ii; i++) {
            ctx.moveTo(this.left, _posY(i));
            ctx.lineTo(this.left + this.width, _posY(i));
        }

        for (let i = 0, ii = this.options.vertical; i < ii; i++) {
            ctx.moveTo(_posX(i), this.top);
            ctx.lineTo(_posX(i), this.top + this.height);
        }

        if (this.activeX) {
            let length = this.data.labels.length;
            let activePoint = Math.round(length * this.activeX);
            let pointWidth = this.width / length;
            let x = pointWidth * activePoint + pointWidth/2;
            ctx.strokeStyle = this.options.activeColor;
            ctx.moveTo(x, this.top);
            ctx.lineTo(x, this.top + this.height);
        }

        // TODO: Fix horizontal active line move up from cursor/
        // if (this.activeY) {
        //     let y = this.height * this.activeY  + this.top;
        //     ctx.strokeStyle = this.options.activeColor;
        //     ctx.moveTo(this.left, y);
        //     ctx.lineTo(this.left + this.width, y);
        // }
        ctx.stroke();
    }
}
