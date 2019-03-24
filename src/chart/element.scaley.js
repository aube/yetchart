
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
        let ctx = this.canvas.getContext("2d");
        let labelsAmount = options.labelsAmount;
        let scaleYRate = this.scaleYRate || 1;
        let cellHeidht = this.height / labelsAmount * scaleYRate;
        let step = (this.max - this.min) / labelsAmount;
        let x = this.left
        
        ctx.beginPath();
        ctx.textAlign = 'left';
        ctx.textBaseline = options.baseline;
        ctx.font = options.fontsize * this.pixelRatio + 'px ' + options.fontname;
        ctx.fillStyle = options.color;

        ctx.shadowColor = options.shadowColor || '';
        ctx.shadowBlur = options.shadowBlur || 0;

        for (let i = 1, ii = labelsAmount; i <= ii; i++) {
            let txt = Math.round(this.max - (step * i));
            ctx.fillText(isNaN(txt) ? '' : txt, x, _posY(labelsAmount - i));
        }

        ctx.stroke();
    }
}

