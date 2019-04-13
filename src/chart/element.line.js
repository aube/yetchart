
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

        let $componentState = this.$componentState;
        let start = $componentState.start || this.$state.start;
        let end = $componentState.end || this.$state.end;
        let min = $componentState.min;
        let max = $componentState.max;
        let fixedSize = $componentState.fixedSize;

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
        let offsetTop = this.top;
        let height = this.height - offsetTop - this.bottom;
        let verticalRate = height / (max - min) || 1;

        if (!fixedSize) {
            from--;
            to++;
        }

        let _posY = (value) => {
            // console.log('height - value * verticalRate + offsetTo',height,value,verticalRate, height - value * verticalRate + offsetTop);
            return height - (value - min) * verticalRate + offsetTop;
        };

        this.pointsY = [];
        for (let i = from; i < to; i++) {
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
            point -= ignoreFirst
            return offsetLeft + point * pointWidth;
        };

        let $componentState = this.$componentState;
        let ctx = this.ctx;
        let options = this.options;
        let y, x;
        let pointsY = this.pointsY;
        let length = pointsY.length;

        let ignoreFirst = +isNaN(pointsY[0]);
        let ignoreLast = +isNaN(pointsY[length - 1]);
        let offsetLeft = this.left * ignoreFirst;
        let offsetRight = this.right * ignoreLast;

        let pointWidth = (this.width - offsetLeft - offsetRight) / (length - ignoreLast - ignoreFirst);

        pointWidth += pointWidth / (length - !ignoreLast - !ignoreFirst);

        ctx.globalAlpha = $componentState.opacity;
        
        ctx.beginPath();

        ctx.lineWidth = options.width;
        ctx.strokeStyle = options.color;
        ctx.lineJoin = 'bevel';
        ctx.lineCap = 'butt';
        // ctx.lineJoin = options.join;


        let i = 0 + ignoreFirst;
        y = pointsY[i];
        x = _posX(i);
        ctx.moveTo(x, y);

        for (i; i < length - ignoreLast; i++) {
            y = this.pointsY[i];
            x = _posX(i);
            ctx.lineTo(x, y);
        }

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
// console.log('v', this.dataset);
        // debug
        // if (this.dataset.index === 0) {
        //     let x = 50;
        //     let y = 1;
        //     ctx.textAlign = 'left';
        //     ctx.font = '32px arial';
        //     ctx.fillStyle = '#333';
        //     ctx.fillText('length: ' + length, x, y++ * 30 + 100);

        //     Object.keys(this.$componentState).forEach(key => {
        //         ctx.fillText(key + ': ' + this.$componentState[key], x, y++ * 30 + 100);
        //     });
        // }

        // ctx.stroke();
        // ctx.translate(-0.5, -0.5);
    }
}