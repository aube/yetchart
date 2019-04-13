
import { abstractElement } from './element.js';

export class Grid extends abstractElement {
    constructor(params) {
        super(params);
    }


    draw() {
        // this.init();
        let _posY = point => {
            return height - point * cellHeidht * scaleYRate  + offsetTop;
        };
        let _posX = point => {
            return point * cellWidth  + offsetLeft;
        };
// console.log('height', height);
        let ctx = this.ctx;
        let options = this.options;
        let offsetTop = this.top;
        let offsetLeft = this.left;
        let height = this.height - offsetTop - this.bottom;
        let width = this.width - offsetLeft - this.right;
        let cellHeidht = height / (options.horizontal);
        let cellWidth = width / (options.vertical - 1);
        let scaleYRate = this.scaleYRate || 1;

        ctx.beginPath();
        ctx.lineWidth = options.width;
        ctx.strokeStyle = options.color;

        ctx.shadowColor = options.shadowColor || '';
        ctx.shadowBlur = options.shadowBlur || 0;

        for (let i = 0, ii = options.horizontal; i < ii; i++) {
            ctx.moveTo(offsetLeft, _posY(i));
            ctx.lineTo(offsetLeft + width, _posY(i));
        }

        for (let i = 0, ii = options.vertical; i < ii; i++) {
            ctx.moveTo(_posX(i), offsetTop);
            ctx.lineTo(_posX(i), offsetTop + height);
        }

        if (this.activeX) {
            let length = this.data.labels.length;
            let activePoint = Math.round(length * this.activeX);
            let pointWidth = width / length;
            let x = pointWidth * activePoint + pointWidth/2;
            ctx.strokeStyle = options.activeColor;
            ctx.moveTo(x, offsetTop);
            ctx.lineTo(x, offsetTop + height);
        }

        // TODO: Fix horizontal active line move up from cursor/
        // if (this.activeY) {
        //     let y = height * this.activeY  + offsetTop;
        //     ctx.strokeStyle = options.activeColor;
        //     ctx.moveTo(offsetLeft, y);
        //     ctx.lineTo(offsetLeft + width, y);
        // }
        ctx.stroke();
    }
}
