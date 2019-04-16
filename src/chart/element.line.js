
import { abstractElement } from './element.js';

export class Line extends abstractElement {
    constructor(params) {
        super(params);
    }

    checkSelection(x, y) {
        this.offsets = this.getOffsets();
        this.calcSizes();
        let activePoint = Math.round((this.offsetX + x) / this.pointWidth) - 1;
        let title = this.$data.labels[activePoint];
        let content = [];

        this.$data.datasets.forEach(ds => {
            content.push({
                index: ds.index,
                hidden: ds.hidden,
                name: ds.name,
                color: ds.options.color,
                value: ds.values[activePoint]
            })
        });

        return {
            title,
            content,
            activePoint,
        }
    }
    draw() {
        if (!this.dataset || this.dataset.hidden) return;
        this.calculatePosY();

        this.offsets = this.getOffsets();
        this.calcSizes();
        
        let $state = this.$state;
        let $componentState = this.$componentState;
        let ctx = this.ctx;
        let options = this.options;
        let y, x;
        let pointsY0 = this.pointsY0;
        let labels = this.$data.labels;

        ctx.globalAlpha = $componentState.opacity;

        ctx.beginPath();
        ctx.lineWidth = options.width;
        ctx.strokeStyle = options.color;
        ctx.lineJoin = 'bevel';
        ctx.lineCap = 'butt';

        y = pointsY0[0].v;
        x = this.posX(pointsY0[0].n);
        ctx.moveTo(x, y);

        for (let i = 1; i < pointsY0.length; i++) {
            let point0 = pointsY0[i];
            x = this.posX(point0.n);
            y = point0.v;
            ctx.lineTo(x, y);
        }

        ctx.stroke();

        // Active point
        let activeData = this.$state.activeData;
        if (activeData) {
            let from = $state.from;
            let activePoint = activeData.activePoint + 4;
            let radius = 10;
            let point0 = this.pointsY0[activePoint - from];

            y = point0.v;
            x = this.posX(point0.n);

            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = options.fillColor;
            ctx.fill();
            ctx.stroke();
        }

        // debug
        // if (this.dataset.index === 0) {
        //     let x = 50;
        //     let y = 1;
        //     let margin = 1;
        //     ctx.textAlign = 'left';
        //     ctx.font = '32px arial';
        //     ctx.fillStyle = '#333';


            
        //     function drawObj(oName, obj) {
        //         obj = obj || this[oName];
        //         oName = oName || '-----';
        //         ctx.fillText('>>> ' + oName, x, y++ * 30 + margin);
        //         Object.keys(obj).forEach(key => {
        //             ctx.fillText(key + ': ' + obj[key], x, y++ * 30 + margin);
        //         });
        //     }
        //     drawObj('$state', $state);
        // }

        // ctx.stroke();
        // ctx.translate(-0.5, -0.5);
    }
}