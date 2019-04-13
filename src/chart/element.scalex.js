
import { abstractElement } from './element.js';


export class ScaleX extends abstractElement {
    constructor(params) {
        super(params);
    }


    draw() {
        // if (!this.data) return;

        // this.init();

        let _posX = point => {
            return point * cellWidth  + offsetLeft;
        };

        let _txt = n => {
            let label = labels[n];
            return options.labelsFormat ? options.labelsFormat(label, this.$state.zoom) : label;
        };

        let ctx = this.ctx;
        let options = this.options;
        ctx.font = options.fontsize * this.pixelRatio + 'px ' + options.fontname;

// console.log('options', options);
        // let offsetTop = this.top;
        let offsetLeft = this.left;
        let posY = this.height - this.bottom;
        let width = this.width - offsetLeft - this.right;

        let cellWidth = ctx.measureText('33 qwe.').width * 1.5;
        let labels = this.$data.labels;
        // console.log('labels', labels);
        // let posY = offsetTop + height;
        let length = labels.length;
        let amount = Math.min(length, Math.floor(width / cellWidth));
        let step = Math.floor(length / amount);

        cellWidth = width / amount;
        ctx.textBaseline = options.baseline;
        ctx.fillStyle = options.color;

        // first label
        ctx.textAlign = 'left';
        ctx.fillText(_txt(0), _posX(0), posY);

        // last label
        ctx.textAlign = 'right';
        ctx.fillText(_txt(length - 1), width, posY);

        ctx.textAlign = options.align;

        for (let i = 1; i < amount; i++) {
            
            let x = _posX(i);
            let txt = _txt(i * step);
            ctx.fillText(txt, x, posY);
        }

        // ctx.stroke();
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
