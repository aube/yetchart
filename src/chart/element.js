
import Utils from './utils.js';

export class abstractElement {

    constructor({canvas, ctx, options}) {
        this.options = options;
        this.canvas = canvas;
        this.ctx = ctx;
        this.hidden = false;

        this.setSizes();
    }

    updateOptions(options) {
        this.options = Utils.objMerge(this.options, options, true);
    }

    setSizes() {
        let offset = this.options.offset || {};

        this.top = offset.top || 0;
        this.bottom = offset.bottom || 0;
        this.left = offset.left || 0;
        this.right = offset.right || 0;

        this.width = parseInt(+this.canvas.getAttribute('width'));
        this.height = parseInt(+this.canvas.getAttribute('height'));
        this.pixelRatio = parseInt(+this.canvas.getAttribute('ratio'));

        this.width -= this.left + this.right;
        this.height -=  this.top + this.bottom;
    }

    ani(base, delta, duration, callback) {
        let id = 'ani' + Date.now();
        this._aniStop = Utils.animate({
            duration: duration || 200,
            timing: 'linear',
            exec: (progress) => {
                this.data = Utils.objSum(base, delta, progress);
                this.data.reverse = true;
                // console.log('this.data', this.data);
            },
            callback: () => {
                // console.log(id, this.data.pointWidth, 'end');
                // this.draw();
                this._aniStop = false;
                // console.log('callback exec', 'promise  resolve');
                callback && callback();
            },
            context: this
        });
    }

    setData(newData) {

        this._aniStop && this._aniStop();

        if (!this.data) {
            this.data = newData;

        } else {

            let base = Utils.objMerge({}, newData, this.data);
            let delta = Utils.objDelta(this.data, newData);
            // console.log('rev', this.data);
            // console.log('rev',base);
            // delta.pointWidth = -delta.pointWidth;
            // console.log('pointWidth', base.pointWidth, delta.pointWidth);

            if (newData.resize) {
                base.values = newData.values;
            } else {
                if (newData.values.length > this.data.values.length) {
                    if (newData.reverse) {
                        base.values = [...newData.values.splice(0, this.data.values.length), ...this.data.values];
                    } else {
                        base.values = [...this.data.values, ...newData.values.splice(this.data.values.length)];
                    }
                } else {
                    base.values = this.data.values.slice(0, newData.values.length);
                }
            }
            // base.
            // base.values.fill(0);
            // if (delta.values.length != this.data.values.length) {
                
            
            //     if (data.reverse) {
            //         this.data.values.unshift([...])
            //     }
            //     base = Utils.objMerge(base, this.data);
            //     // console.log('db', delta.values.length, base.values.length);
            // }
            
            // console.log('13323', data, delta, base);
            // return new Promise((resolve) => {
            //     this.ani(base, delta, 600, resolve);
            // });
            this.ani(base, delta, 200);
            return 200;
        }
    }

    hide() {
        this.hidden = true;
    }

    show() {
        this.hidden = false;
    }
    // init() {
    //     // this.setSizes();
    // }
}
