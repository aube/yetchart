
import { abstractElement } from './element.js';

export class Pie extends abstractElement {
    constructor(params) {
        super(params);
    }

    calculateRads(stacked, percentage) {
        let $state = this.$state;
        let $componentState = this.$componentState;
        let min = $componentState.min;
        let max = $componentState.max;


        let $data = this.$data;
        let sumValues = $data.sumValues;
        let values = this.dataset.values;
        let values0 = this.dataset.values0;
        let values1 = this.dataset.values1;
        let from = $state.from;
        let to = $state.to;

        let pointsY0 = [];
        let pointsY1 = [];

        let sum = 0;
        let vals0 = 0;
        let vals1 = 0;

        for (let i = from; i <= to; i++) {
            sum += sumValues[i];
            vals0 += values0[i];
            vals1 += values1[i];
        }

        let angle = 5 * Math.PI / 180;
        this.val = vals1 - vals0;
        this.rad0 = vals0 / sum * 2 * Math.PI + angle;
        this.rad1 = vals1 / sum * 2 * Math.PI + angle;
    }

    checkSelection(x, y) {
        x = this.centerX - x;
        y = this.centerY - y;

        let inside = Math.sqrt(Math.pow(Math.abs(x), 2) + Math.pow(Math.abs(y), 2)) < this.radius;
        this.active = false;
        if (inside) {
            let t = Math.atan2(y, x) + Math.PI;
            this.active = t >= this.rad0 && t <= this.rad1;
        }
    }

    draw() {
        if (!this.dataset || this.dataset.hidden) return;
        this.calculateRads(this.$data.stacked, this.$data.percentage);

        let percent = (this.rad1 - this.rad0) / 2 / Math.PI * 100;
        let offsets = this.getOffsets();
        let centerX = (this.width - offsets.left - offsets.right) / 2;
        let centerY = (this.height - offsets.top - offsets.bottom) / 2;
        let radius = Math.round(Math.min(centerY, centerX) * 0.8);
        let margin = Math.abs(10 - Math.round(this.rad1 - this.rad0) * 2) * .02;
        let activeRadius = radius * margin;
        let txtRadius = radius * .7;
        let avrgAngle = (this.rad1 + this.rad0) / 2;

        this.radius = radius;
        this.centerY = centerY;
        this.centerX = centerX;

        let activeX = centerX + activeRadius * Math.cos(avrgAngle);
        let activeY = centerY + activeRadius * Math.sin(avrgAngle);

        let ctx = this.ctx;
        let options = this.options;
        ctx.fillStyle = options.color;
        ctx.strokeStyle = '#fff';

        ctx.beginPath();
        if (this.active && percent < 100) {
            ctx.moveTo( activeX, activeY);
            ctx.arc(
                activeX,
                activeY,
                radius , this.rad0, this.rad1);
            
            ctx.lineWidth = 10;
            ctx.stroke();
        } else {
            ctx.moveTo( centerX, centerY);
            ctx.arc(
                centerX,
                centerY,
                radius, this.rad0, this.rad1);
        }
        ctx.fill();
        ctx.closePath();


        if (percent > 4) {
            let txtX = centerX;
            let txtY = centerY;
            
            if (percent < 100) {
                txtRadius += this.active ? activeRadius : 0;
                txtRadius -= txtRadius * percent / 250;
                txtX += txtRadius * Math.cos(avrgAngle);
                txtY += txtRadius * Math.sin(avrgAngle);
            }

            let fontSize = Math.round(14 * this.pixelRatio + 30 * percent / 100);

            ctx.font = 'bold ' + fontSize + 'px arial';
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';
            ctx.fillStyle = '#fff';
            percent = Math.round(percent) + '%';
            ctx.fillText(percent, txtX, txtY);
        }

        // debug
        // if (this.dataset.index === 0) {
        //     let x = 50;
        //     let y = 1;
        //     let margin = 1;
        //     ctx.textAlign = 'left';
        //     ctx.font = '32px arial';
        //     ctx.fillStyle = '#333';

        //     ctx.fillText('rad0: ' + this.rad0, x, y++ * 30 + margin);
        //     ctx.fillText('rad1: ' + this.rad1, x, y++ * 30 + margin);
        //     ctx.fillText('sin: ' + Math.sin(this.rad1 - this.rad0), x, y++ * 30 + margin);
        //     ctx.fillText('cos: ' + Math.cos(this.rad1 - this.rad0), x, y++ * 30 + margin);
            
        //     function drawObj(oName, obj) {
        //         obj = obj || this[oName];
        //         oName = oName || '-----';
        //         ctx.fillText('>>> ' + oName, x, y++ * 30 + margin);
        //         Object.keys(obj).forEach(key => {
        //             ctx.fillText(key + ': ' + obj[key], x, y++ * 30 + margin);
        //         });
        //     }
        //     // drawObj('offsets', offsets);
        //     // drawObj('$componentState', $componentState);
        //     // drawObj('$state', $state);
        // }
    }
}
