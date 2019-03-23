
import { abstractElement } from './element.js';

export class Line extends abstractElement {
    constructor(canvas, options) {
        super(canvas, options);
    }

    draw() {
        if (!this.dataset || this.dataset.hidden) return;
        this.init();

        let _posY = (value) => {
            let y;
            if (scaleYRate >= 1) {
                y = this.height + this.top - (+value - this.min) * rate / scaleYRate;
            } else {
                y = (this.height + this.top - (+value - this.min) * rate) / scaleYRate;
            }
            return Math.min(y, this.height);
        };

        let _posX = (point) => {
            if (this.drawReverse) {
                point = length - point;
                return this.width - point * pointWidth  + pointWidth/2 + this.left;
            }
            return (point) * pointWidth  + pointWidth/2 + this.left;
        };

        let data = this.dataset.data;
        let length = data.length || 3;

        let pointWidthRate = this.pointWidthRate || 1;
        let pointWidth = (this.width / length) * pointWidthRate;
        
        pointWidth = Math.round(pointWidth * 1000) / 1000;
        pointWidthRate = Math.round(pointWidthRate * 1000) / 1000;

        let scaleYRate = this.scaleYRate || 1;
        let rate = (this.height) / Math.abs(this.max - this.min) || 1;
        
        let ctx = this.canvas.getContext("2d");
        let y, x;

        ctx.translate(0.5, 0.5);
        ctx.beginPath();
        ctx.lineWidth = this.options.width;
        ctx.lineJoin = this.options.join;
        ctx.strokeStyle = this.options.color;

        ctx.shadowColor = this.options.shadowColor || '';
        ctx.shadowBlur = this.options.shadowBlur || 0;

        let _line = (i) => {
            y = _posY(data[i]);
            x = _posX(i);
            ctx.lineTo(x, y);
        }

        let i = this.drawReverse ? length - 1 : 0;
        y = _posY(data[i]);
        x = _posX(i);
        ctx.moveTo(x, y);
        if (this.drawReverse) {
            for (--i; i >= 0; _line(i--)) {}
        } else {
            for (++i; i < length; _line(i++)) {}
        }

        ctx.stroke();

        if (this.activeX) {
            let activePoint = Math.round(length * this.activeX);
            let radius = 10;
            ctx.beginPath();
            y = _posY(data[activePoint]);
            x = _posX(activePoint);
            ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = this.options.fillColor;
            ctx.fill();
            ctx.lineWidth = this.options.width;
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
