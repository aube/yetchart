
import { abstractElement } from './element.js';



export class ScaleY extends abstractElement {
    constructor(params) {
        super(params);
    }


    draw() {
        // if (!this.data) return;

        // this.init();
        let _posY = point => {
            return height - point * cellHeidht  + this.top;
        };

        let ctx = this.ctx;
        let options = this.options;
        let max = this.$componentState.max;
        let min = this.$componentState.min;
        let labelsAmount = options.labelsAmount;
        let scaleYRate = this.scaleYRate || 1;
        let offsetTop = this.top;
        let height = this.height - offsetTop - this.bottom;
        let cellHeidht = height / labelsAmount * scaleYRate;
        let step = (max - min) / labelsAmount;
        let x = this.left;

        ctx.textAlign = 'left';
        ctx.textBaseline = options.baseline;
        ctx.font = options.fontsize * this.pixelRatio + 'px ' + options.fontname;
        ctx.fillStyle = options.color;

        for (let i = 1, ii = labelsAmount; i <= ii; i++) {
            let txt = Math.round(max - (step * i));
            // console.log('x, _posY(labelsAmount - i)',max,  txt,  x, _posY(labelsAmount - i));
            if (!isNaN(txt))
                ctx.fillText(txt, x, _posY(labelsAmount - i));
        }
    }
}

