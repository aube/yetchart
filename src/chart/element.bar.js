
import { abstractElement } from './element.js';

export class Bar extends abstractElement {
    constructor(params) {
        super(params);
    }


    checkSelection(x, y) {
        let activePoint = Math.round((this.offsetX + x) / this.pointWidth) - 1;
        // console.log('x', x, activePoint);
        let title = this.$data.labels[activePoint];
        let content;
        if (title) {
            content = [];

            this.$data.datasets.forEach(ds => {
                content.push({
                    index: ds.index,
                    hidden: ds.hidden,
                    name: ds.name,
                    color: ds.options.color,
                    value: ds.values[activePoint]
                })
            });
        }
        return {
            title,
            content,
            activePoint,
        }
    }



    draw() {
        if (!this.dataset || this.dataset.hidden) return;
        this.calculatePosY(true, this.$data.percentage);

        this.offsets = this.getOffsets();
        this.calcSizes();
        
        // if ('Map: Bar' === this.name) {
        //     console.log('offsetX', this.offsetX);
        //     console.log('this.pointWidth', this.pointWidth);
        // }

        let $state = this.$state;
        let from = $state.from;
        let to = $state.to;

        let $componentState = this.$componentState;
        let ctx = this.ctx;
        let y, x;
        let pointsY0 = this.pointsY0;
        let pointsY1 = this.pointsY1;
        let length = $state.length;

        let activePoint = $state.activeData ? $state.activeData.activePoint: false;
        let color = this.options.color;
        
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.globalAlpha = $componentState.opacity;

        for (let i = 0; i < pointsY0.length; i++) {
            let point0 = pointsY0[i];
            let point1 = pointsY1[i];
            x = this.posX(point0.n);

            let h = point1 && point1.v ? point1.v - point0.v : point0.v;

            if (activePoint !== false && point0.n !== activePoint) {
                ctx.globalAlpha = 0.5;
            }

            ctx.fillRect(x, point0.v, this.pointWidth, h);
            ctx.strokeRect(x, point0.v, this.pointWidth, h);

            if (activePoint !== false && point0.n !== activePoint) {
                ctx.globalAlpha = 1;
            }
        }


        // Active point
        // if (.$state.activeData) {
        //     let from = $state.from;
        //     let activePoint = activeData.activePoint + 4;
        //     let point0 = this.pointsY0[activePoint - from];
        //     x = this.posX(point0.n);
        //     ctx.lineWidth = 1;
        //     ctx.strokeStyle = '#ffffff3c';
        //     ctx.beginPath();
        //     ctx.moveTo(x, this.offsets.top);
        //     ctx.lineTo(x, this.height - this.offsets.bottom);
        //     ctx.stroke();
        // }
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

        //     // drawObj('offsets', offsets);
        //     drawObj('$state', $state);
        // }

        ctx.stroke();
        // ctx.translate(-0.5, -0.5);
    }
}
