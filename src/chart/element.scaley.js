
import { abstractElement } from './element.js';



export class ScaleY extends abstractElement {
    constructor(params) {
        super(params);
    }


    draw() {
        let formatNumber = n => {
            let an = Math.abs(n);
            if (an > 1e9) return (n / 1e9).toFixed(2) + 'B'; 
            if (an > 1e6) return (n / 1e6).toFixed(2) + 'M'; 
            if (an > 1e3) return (n / 1e3).toFixed(1) + 'K';
            return n;
        }

        let _posY = point => {
            return height - point * cellHeidht  + offsets.top;
        };

        let offsets = this.getOffsets();
        let ctx = this.ctx;
        let options = this.options;
        let $componentState = this.$componentState;
        let max = this.$componentState.max;
        let min = this.$componentState.min;
        let labelsAmount = 5;
        let scaleYRate = this.scaleYRate || 1;
        let offsetTop = offsets.top;
        let height = this.height - offsetTop - offsets.bottom;
        let cellHeidht = height / labelsAmount;
        let step = (max - min) / labelsAmount;
        let x = offsets.left;
        
        ctx.globalAlpha = $componentState.opacity;
        ctx.textAlign = 'left';
        ctx.font = options.fontsize * this.pixelRatio + 'px ' + options.fontname;
        ctx.fillStyle = options.color;

        ctx.textBaseline = 'top';
        let txt = Math.round(max);
        ctx.fillText(formatNumber(txt), x, _posY(labelsAmount));

        ctx.textBaseline = options.baseline;
        for (let i = 1; i <= 5; i++) {
            let txt = Math.round(max - (step * i));

            // console.log('x, _posY(labelsAmount - i)',this.name,  txt,  x, _posY(labelsAmount - i));
            if (!isNaN(txt)) {

                ctx.fillText(formatNumber(txt), x, _posY(labelsAmount - i));
            }
        }
    }
}

