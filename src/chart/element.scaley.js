
import { abstractElement } from './element.js';



export class ScaleY extends abstractElement {
    constructor(canvas, options) {
        super(canvas, options);
    }

    draw() {
        if (!this.data) return;

        this.init();
        let _posY = (point) => {
            return this.height - point * cellHeidht  + this.top;
        };

        let options = this.options;
        let ctx = this.ctx;
        let labelsAmount = options.labelsAmount;
        let scaleYRate = this.scaleYRate || 1;
        let cellHeidht = this.height / labelsAmount * scaleYRate;
        let step = (this.max - this.min) / labelsAmount;
        let x = this.left
        
        ctx.textAlign = 'left';
        ctx.textBaseline = options.baseline;
        ctx.font = options.fontsize * this.pixelRatio + 'px ' + options.fontname;
        ctx.fillStyle = options.color;

        for (let i = 1, ii = labelsAmount; i <= ii; i++) {
            let txt = Math.round(this.max - (step * i));
            if (!isNaN(txt))
                ctx.fillText(txt, x, _posY(labelsAmount - i));
        }
    }
}

