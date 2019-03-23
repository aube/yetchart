
import { abstractElement } from './element.js';


export class Grid extends abstractElement {
    constructor(canvas, options) {
        super(canvas, options);
    }

    _drawVertical() {

        let _posX = (point) => {
            return point * cellWidth  + this.left;
        };

        let ctx = this.canvas.getContext("2d");
        let cellWidth = this.width / (this.options.vertical - 1);

        ctx.beginPath();
        ctx.lineWidth = this.options.width;
        ctx.strokeStyle = this.options.color;

        ctx.shadowColor = this.options.shadowColor || '';
        ctx.shadowBlur = this.options.shadowBlur || 0;

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
        ctx.stroke();
        ctx.stroke();
    }

    _drawHorizontal() {

        let _posY = (point) => {
            return this.height - point * cellHeidht * scaleYRate  + this.top;
        };

        let ctx = this.canvas.getContext("2d");
        let cellHeidht = this.height / (this.options.horizontal);
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

        if (this.activeY) {
            let y = this.height * this.activeY  + this.top;
            ctx.strokeStyle = this.options.activeColor;
            ctx.moveTo(this.left, y);
            ctx.lineTo(this.left + this.width, y);
        }

    }

    draw() {
        this.init();
        this._drawVertical();
        this._drawHorizontal();
    }
}
