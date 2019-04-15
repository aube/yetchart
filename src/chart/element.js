
import Utils from './utils.js';

export class abstractElement {

    constructor({component, canvas, ctx, options}) {
        this.options = options;
        this.canvas = canvas;
        this.ctx = ctx;
        this.hidden = false;
        this.name = component.name + ': ' + this.constructor.name;

        this.setSizes();
    }

    getOffsets() {
        let $componentOffset = this.$componentOptions.offset || {};
        let offset = this.options.offset || {};
        let _value = key => ($componentOffset[key] || 0) + (offset[key] || 0);

        return {
            top: _value('top'),
            bottom: _value('bottom'),
            left: _value('left'),
            right: _value('right'),
        }
    }

    // calcSizes() {
    //     let offsets = this.getOffsets();
    //     let $state = this.$state;
    //     let labels = this.$data.labels;
    //     let width = this.width - offsets.left - offsets.right;
    //     let fullWidth = width / ($state.end - $state.start);
    //     this.offsetX = fullWidth * $state.start;
    //     this.pointWidth = fullWidth / labels.length;
    // }

    updateOptions(options) {
        this.options = Utils.objMerge(this.options, options, true);
    }

    setSizes() {
        this.width = parseInt(+this.canvas.getAttribute('width'));
        this.height = parseInt(+this.canvas.getAttribute('height'));
        this.pixelRatio = parseInt(+this.canvas.getAttribute('ratio'));
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


    checkSelection(x, y) {
        let activePoint = Math.round((this.offsetX + x) / this.pointWidth) - 1;
        let title = this.$data.labels[activePoint];
        let content = [];

        this.$data.datasets.forEach(ds => {
            content.push({
                index: ds.index,
                hidden: ds.hidden,
                name: ds.name,
                color: ds.options.color,
                value: ds.values[activePoint]
            })
        });

        return {
            title,
            content,
            activePoint,
        }
    }

    calcSizes() {
        let offsets = this.getOffsets();
        let $state = this.$state;
        let width = this.width - offsets.left - offsets.right;
        let fixedSize = this.$componentState.fixedSize;
        if (fixedSize) {
            this.offsetX = 0;
            this.pointWidth = width / $state.length;
            return;
        }
        let fullWidth = width / ($state.end - $state.start);
        this.offsetX = fullWidth * $state.start;
        this.pointWidth = fullWidth / $state.length;
    }

    posX(point) {
        let posX =  this.offsets.left + point * this.pointWidth - this.offsetX;
        return posX;
    };

    calculatePosY(stacked, percentage) {
        let _posY = value => {
            return height - (value - min) * verticalRate + offsetTop;
        };
        let _posYpercentage = value => {
            return height - height * value + offsetTop;
        };

        let offsets = this.getOffsets();
        let $state = this.$state;
        let $componentState = this.$componentState;
        let min = $componentState.min;
        let max = $componentState.max;
        let fixedSize = $componentState.fixedSize;

        let $data = this.$data;
        let sumValues = $data.sumValues;
        let values = this.dataset.values;
        let values0 = this.dataset.values0;
        let values1 = this.dataset.values1;
        let from = $state.from;
        let to = $state.to;

        if (fixedSize) {
            from = 0;
            to = $state.length - 1;
        } else {
            from -= 4;
            to += 4;
        }
        let offsetTop = offsets.top;
        let height = this.height - offsetTop - offsets.bottom;
        let verticalRate = height / (max - min) || 1;

        // let pointsY0 = [];
        let pointsY0 = [];
        let pointsY1 = [];

        for (let i = from; i <= to; i++) {
            if (percentage && stacked) {
                pointsY0.push({
                    n: i,
                    v: _posYpercentage(values0[i] / sumValues[i])
                });
                pointsY1.push({
                    n: i,
                    v: _posYpercentage(values1[i] / sumValues[i])
                });
            } else if (stacked) {
                pointsY0.push({
                    n: i,
                    v: _posY(values0[i])
                });
                pointsY1.push({
                    n: i,
                    v: _posY(values1[i])
                });
                // pointsY1.push(_posY(values1[i]));
            } else {

                pointsY0.push({
                    n: i,
                    v: _posY(values[i])
                });
            }
        }
        // for (let i = from; i <= to; i++) {
        //     if (percentage) {
        //         pointsY0.push({
        //             point: i,
        //             value: _posYpercentage(values0[i] / sumValues[i])
        //         });
        //         pointsY1.push(_posYpercentage(values1[i] / sumValues[i]));
        //     } else {
        //         pointsY0.push(_posY(values0[i]));
        //         pointsY1.push(_posY(values1[i]));
        //     }
        // }

        this.pointsY0 = pointsY0;
        this.pointsY1 = pointsY1;
    }

}
