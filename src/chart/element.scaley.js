
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

        let ctx = this.canvas.getContext("2d");
        let labelsAmount = this.options.labelsAmount;
        let scaleYRate = this.scaleYRate || 1;
        let cellHeidht = this.height / labelsAmount * scaleYRate;
        let step = (this.max - this.min) / labelsAmount;
        
        ctx.beginPath();
        ctx.textAlign = 'left';
        ctx.textBaseline = this.options.baseline;
        ctx.font = this.options.fontsize * this.pixelRatio + 'px ' + this.options.fontname;
        ctx.fillStyle = this.options.color;

        ctx.shadowColor = this.options.shadowColor || '';
        ctx.shadowBlur = this.options.shadowBlur || 0;

        for (let i = 1, ii = labelsAmount; i <= ii; i++) {
            let txt = Math.round(this.max - (step * i));
            ctx.fillText(isNaN(txt) ? '' : txt, this.left, _posY(labelsAmount - i));
        }


        ctx.stroke();


        // let x = this.width - 10;
        // let y = 1;
        // ctx.textAlign = 'right';
        // ctx.font = '32px arial';
        // ctx.fillText('cellHeidht: ' + cellHeidht, x, y++ * 30 + 100);
        // ctx.fillText('step: ' + step, x, y++ * 30 + 100);
        // ctx.fillText('this.min: ' + this.min, x, y++ * 30 + 100);
        // ctx.fillText('this.max: ' + this.max, x, y++ * 30 + 100);


    }
}

