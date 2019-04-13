
import { abstractElement } from './element.js';

export class Area extends abstractElement {
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

    draw() {
        if (!this.dataset || this.dataset.hidden) return;
        this.calculateStakedAndPercentage();

        let _posX = point => {
            point -= ignoreFirst
            return offsetLeft + point * pointWidth;
        };

        let options = this.options;
        let ctx = this.ctx;
        let y, x, t;
        let pointsY0 = this.dataset[this.$componentName].pointsY0;
        let pointsY1 = this.dataset[this.$componentName].pointsY1;
        let length = pointsY0.length;

        let ignoreFirst = +isNaN(pointsY0[0]);
        let ignoreLast = +isNaN(pointsY0[length - 1]);
        let offsetLeft = this.left * ignoreFirst;
        let offsetRight = this.right * ignoreLast;

        let pointWidth = (this.width - offsetLeft - offsetRight) / (length - ignoreLast - ignoreFirst);

        pointWidth += pointWidth / (length - !ignoreLast - !ignoreFirst);

        ctx.lineWidth = options.width;
        ctx.lineJoin = options.join;
        ctx.strokeStyle = options.color;
        ctx.fillStyle = options.color;

        let i = 0 + ignoreFirst;
        let firstY = pointsY0[i];
        let firstX = _posX(i);
        ctx.beginPath();
        ctx.moveTo(firstX, firstY);

        for (i; i < length - ignoreLast; i++) {
            y = pointsY0[i];
            x = _posX(i);
            ctx.lineTo(x, y);
        }

        for (i = length - 1 - ignoreLast; i >= 0 + ignoreFirst; i--) {
            y = pointsY1[i];
            x = _posX(i);
            ctx.lineTo(x, y);
        }
        ctx.closePath();
        // ctx.lineTo(firstX, firstY);
        ctx.fill();
        ctx.stroke();


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
        // ctx.translate(-0.5, -0.5);
    }
}
