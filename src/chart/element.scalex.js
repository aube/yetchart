
import { abstractElement } from './element.js';


export class ScaleX extends abstractElement {
    constructor(params) {
        super(params);

        // let cellWidth = ctx.measureText('33 qwe.').width * 1.5;
    }


    draw() {
        // if (!this.data) return;

        // this.init();
        this.calcSizes();
        let _posX = point => {
            return point * this.pointWidth  + offsetLeft - this.offsetX;
        };

        let _txt = n => {
            let label = labels[n];
            if (!label) return '';
            return options.labelsFormat ? options.labelsFormat(label, $state.zoom) : label;
        };

        let labels = this.$data.labels;
        let offsets = this.getOffsets();
        let offsetLeft = offsets.left;
        let posY = this.height - offsets.bottom;
        let ctx = this.ctx;
        let options = this.options;
        let $state = this.$state;
        let $componentState = this.$componentState;


        let from = $state.from;
        let to = $state.to;
        let amount = 5;
        let step = Math.ceil((to - from) / amount + 1);
        step = Math.max(1, step);

        ctx.font = options.fontsize * this.pixelRatio + 'px ' + options.fontname;
        ctx.textBaseline = options.baseline;
        ctx.fillStyle = options.color;
        ctx.globalAlpha = $componentState.opacity;

        let points = [];
        for (var i = 0; i <= amount; i++) {
            points.push(from + i * step);
        }

        // ctx.textAlign = 'right';
        // i = points.pop();
        // let x = _posX(i);
        // let txt = _txt(i);
        // ctx.fillText(txt, x, posY);
        ctx.textAlign = 'center';
        
        points.forEach(i => {
            let x = _posX(i);
            let txt = _txt(i);
            ctx.fillText(txt, x, posY);
        });

    }
}
