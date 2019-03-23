
import { abstractElement } from './element.js';


export class ScaleX extends abstractElement {
    constructor(canvas, options) {
        super(canvas, options);
    }

    draw() {
        if (!this.data) return;

        this.labels = this.data.labels;
        this.init();

        let _posX = point => {
            return point * cellWidth  + this.left;
        };

        let _txt = n => {
            let label = this.labels[n];
            return this.options.labelsFormat ? this.options.labelsFormat(label) : label;
        };

        let ctx = this.canvas.getContext("2d");
        let posY = this.top + this.height + this.options.margin.top;
        let length = this.labels.length;
        let cellWidth = ctx.measureText('33 qwe.').width * 1.5;
        let amount = Math.min(length, Math.floor(this.width / cellWidth));
        let step = Math.floor(length / amount);

        ctx.beginPath();
        ctx.font = this.options.fontsize * this.pixelRatio + 'px ' + this.options.fontname;
        cellWidth = this.width / amount;

        ctx.textBaseline = this.options.baseline;
        ctx.fillStyle = this.options.color;

        ctx.shadowColor = this.options.shadowColor || '';
        ctx.shadowBlur = this.options.shadowBlur || 0;

        // first label
        ctx.textAlign = 'left';
        ctx.fillText(_txt(0), _posX(0), posY);

        // last label
        ctx.textAlign = 'right';
        ctx.fillText(_txt(length - 1), this.width, posY);

        ctx.textAlign = this.options.align;

        for (let i = 1; i < amount; i++) {
            
            let x = _posX(i);
            let txt = _txt(i * step);
            ctx.fillText(txt, x, posY);
        }
        ctx.stroke();

        // let x = this.width - 10;
        // let y = 1;
        // ctx.textAlign = 'right';
        // ctx.font = '32px arial';
        // ctx.fillText('length: ' + length, x, y++ * 30 + 100);
        // ctx.fillText('amount: ' + amount, x, y++ * 30 + 100);
        // ctx.fillText('step: ' + step, x, y++ * 30 + 100);
        // ctx.fillText('cellWidth: ' + cellWidth, x, y++ * 30 + 100);
    }
}
