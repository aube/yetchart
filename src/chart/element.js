
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
        this.width = parseInt(+this.canvas.getAttribute('width'));
        this.height = parseInt(+this.canvas.getAttribute('height'));
        this.pixelRatio = parseInt(+this.canvas.getAttribute('ratio'));

        this.top = this.options.padding && this.options.padding.top || 0;
        this.bottom = this.options.padding && this.options.padding.bottom || 0;
        this.left = this.options.padding && this.options.padding.left || 0;
        this.right = this.options.padding && this.options.padding.right || 0;

        this.width -= this.left + this.right;
        this.height -=  this.top + this.bottom;
    }
}
