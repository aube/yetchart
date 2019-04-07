
import { abstractElement } from './element.js';

export class Line extends abstractElement {
    constructor(params) {
        super(params);
    }

    getMinMax(data){
        if (!data) {
            return false;
        }

        let min = Infinity,
            max = -Infinity;

        for (let i = data.length - 1; i >= 0; i--) {
            min = Math.min(min, +data[i]);
            max = Math.max(max, +data[i]);
        }

        return {
            min,
            max
        };
    }

    calculate() {
        let start = this.$componentState.start || this.$state.start;
        let end = this.$componentState.end || this.$state.end;
        let min = this.$componentState.min;
        let max = this.$componentState.max;

        if (
            this.start === start && this.end === end &&
            this.max === max && this.min === min
        ) {
            return;
        }

        let dataset = this.dataset;
        let values = dataset.values;
        let length = values.length;
        let from = Math.floor(length * start);
        let to = Math.ceil(length * end);
        let verticalRate = this.height / (max - min) || 1;

        let _posY = (value) => {
            return this.height - value * verticalRate + this.top;
        };

        this.pointsY = [];
        this.pointsX = [];
        for (var i = from; i < to; i++) {
            this.pointsY.push(_posY(values[i]));
        }

        this.start = start;
        this.end = end;
        this.min = min;
        this.max = max;
    }

    draw() {
        if (!this.dataset || this.dataset.hidden) return;
        this.calculate();

        let _posX = point => {
            return point * pointWidth + pointWidth/2 * 0 + this.left ;
        };

        let _drawLine = i => {
            y = this.pointsY[i];
            x = _posX(i);
            ctx.lineTo(x, y);
            // debug
            // ctx.fillText(i, x, y + 30);
            // ctx.fillText(this.dataset.values[i], x, y + 60);
        }

        let options = this.options;
        let y, x;
        let length = this.pointsY.length;

        let pointWidth = this.width / (length - 1);
        let ctx = this.ctx;


        ctx.translate(0.5, 0.5);
        ctx.beginPath();
        ctx.lineWidth = options.width;
        ctx.lineJoin = options.join;
        ctx.strokeStyle = options.color;

        let i = 0;
        y = this.pointsY[i];
        x = this.pointsX[i];
        ctx.moveTo(x, y);

        for (i; i < length; _drawLine(i++)) {}

        ctx.stroke();

        // Active point
        if (this.$state.activeX) {
            let activePoint = this.$state.activeData.activePoint;
            let radius = 10;
            y = this.pointsY[activePoint];
            x = _posX(activePoint);

            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = options.fillColor;
            ctx.fill();
            ctx.stroke();
        }

        // debug
        // if (this.dataset.name === 'y0') {
        //     let x = 50;
        //     let y = 1;
        //     ctx.textAlign = 'left';
        //     ctx.font = '32px arial';
        //     ctx.fillStyle = '#333';
        //     ctx.fillText('length: ' + length, x, y++ * 30 + 100);

        //     Object.keys(this.$state).forEach(key => {
        //         ctx.fillText(key + ': ' + this.$state[key], x, y++ * 30 + 100);
        //     });
        // }

        ctx.stroke();
        ctx.translate(-0.5, -0.5);
    }
}