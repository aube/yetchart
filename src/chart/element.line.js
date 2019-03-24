
import { abstractElement } from './element.js';

export class Line extends abstractElement {
    constructor(canvas, options) {
        super(canvas, options);
    }


    draw() {
        if (!this.dataset || this.dataset.hidden) return;
        this.init();

        let _posY = (value) => {
            let y = this.height + this.top - (+value - this.min) * rate / scaleYRate;

            return Math.min(y, this.height);
        };

        let _posX = (point) => {
            if (this.drawReverse) {
                point = length - point;
                return this.width - point * pointWidth  + pointWidth/2 + this.left;
            }
            return (point) * pointWidth  + pointWidth/2 + this.left;
        };

        let _drawLine = i => {
            y = _posY(data[i]);
            x = _posX(i);
            ctx.lineTo(x, y);
        }

        let options = this.options;
        let y, x;
        let data = this.dataset.data;
        let length = data.length || 3;

        let pointWidthRate = this.pointWidthRate || 1;
        let pointWidth = (this.width / length) * pointWidthRate;

        let scaleYRate = this.scaleYRate || 1;
        let rate = (this.height) / Math.abs(this.max - this.min) || 1;

        let ctx = this.canvas.getContext("2d");

        pointWidth = Math.round(pointWidth * 1000) / 1000;
        pointWidthRate = Math.round(pointWidthRate * 1000) / 1000;

        ctx.translate(0.5, 0.5);
        ctx.beginPath();
        ctx.lineWidth = options.width;
        ctx.lineJoin = options.join;
        ctx.strokeStyle = options.color;

        ctx.shadowColor = options.shadowColor || '';
        ctx.shadowBlur = options.shadowBlur || 0;

        let i = this.drawReverse ? length - 1 : 0;
        y = _posY(data[i]);
        x = _posX(i);
        ctx.moveTo(x, y);
        if (this.drawReverse) {
            for (--i; i >= 0; _drawLine(i--)) {}
        } else {
            for (++i; i < length; _drawLine(i++)) {}
        }

        ctx.stroke();

        // Active point
        if (this.activeX) {
            let activePoint = Math.round(length * this.activeX);
            let radius = 10;
            y = _posY(data[activePoint]);
            x = _posX(activePoint);

            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = options.fillColor;
            ctx.fill();
            ctx.stroke();
        }
        ctx.translate(-0.5, -0.5);

        // if (this.dataset.options.name === 'y0') {
        //     let x = 50;
        //     let y = 1;
        //     ctx.textAlign = 'left';
        //     ctx.font = '32px arial';
        //     ctx.fillText('drawReverse: ' + this.drawReverse, x, y++ * 30 + 100);
        //     ctx.fillText('fpsY: ' + this.fpsY, x, y++ * 30 + 100);
        //     ctx.fillText('fpsX: ' + this.fpsX, x, y++ * 30 + 100);
        //     ctx.fillText('pointWidth: ' + pointWidth, x, y++ * 30 + 100);
        //     ctx.fillText('pointWidthRate: ' + pointWidthRate, x, y++ * 30 + 100);
        //     ctx.fillText('scaleYRate: ' + scaleYRate, x, y++ * 30 + 100);
        //     ctx.fillText('length: ' + length, x, y++ * 30 + 100);

        //     for (let i = 0; i < length; i++) {
        //         ctx.fillText(i+': ' + data[i], x, y++ * 30 + 100);
        //     }
        // }

    }
}
