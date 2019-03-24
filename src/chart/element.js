
import Utils from './utils.js';

export class abstractElement {

    constructor(canvas, options) {
        this.options = options;
        this.canvas = canvas;
    }

    updateOptions(options) {
        this.options = Utils.objMerge(this.options, options, true);
    }

    init() {
        let padding = this.options.padding || {};

        this.top = padding.top || 0;
        this.bottom = padding.bottom || 0;
        this.left = padding.left || 0;
        this.right = padding.right || 0;

        this.width = parseInt(+this.canvas.getAttribute('width'));
        this.height = parseInt(+this.canvas.getAttribute('height'));
        this.pixelRatio = parseInt(+this.canvas.getAttribute('ratio'));

        this.width -= this.left + this.right;
        this.height -=  this.top + this.bottom;
    }
}
