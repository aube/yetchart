
import { abstractElement } from './element.js';

export class Area extends abstractElement {
    constructor(params) {
        super(params);
    }

    draw() {
        if (!this.dataset || this.dataset.hidden) return;
        this.calculatePosY(this.$data.stacked, this.$data.percentage);

        this.offsets = this.getOffsets();
        this.calcSizes();
        
        let options = this.options;
        let $componentState = this.$componentState;
        let ctx = this.ctx;
        let y, x, t;
        let pointsY0 = this.pointsY0;
        let pointsY1 = this.pointsY1;

        ctx.lineWidth = options.width;
        ctx.lineJoin = options.join;
        ctx.strokeStyle = options.color;
        ctx.fillStyle = options.color;
        ctx.globalAlpha = $componentState.opacity;

        let firstY = pointsY0[0].v;
        let firstX = this.posX(pointsY0[0].n);
        ctx.beginPath();
        ctx.moveTo(firstX, firstY);

        for (let i = 0; i < pointsY0.length; i++) {
            let point0 = pointsY0[i];
            x = this.posX(point0.n);
            y = point0.v;
            ctx.lineTo(x, y);
        }

        for (let i = pointsY1.length - 1; i >= 0; i--) {
            let point1 = pointsY1[i];
            x = this.posX(point1.n);
            y = point1.v;
            ctx.lineTo(x, y);
        }

        ctx.closePath();
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

        // ctx.translate(-0.5, -0.5);
    }
}
