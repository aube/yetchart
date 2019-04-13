
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


    calculateStakedAndPercentage() {
        let _posY = value => {
            if (percentage)
                return height - height * value + offsetTop;

            return height - (value - min) * verticalRate + offsetTop;
        };

        let $state = this.$state;
        let $componentState = this.$componentState;
        let start = $componentState.start || $state.start;
        let end = $componentState.end || $state.end;
        let min = $componentState.min;
        let max = $componentState.max;
        let fixedSize = $componentState.fixedSize;

        let $data = this.$data;
        let $datasets = $data.datasets;
        let sumValues = $data.sumValues;
        let percentage = $data.percentage;
        let dataset = this.dataset;
        let $componentName = this.$componentName;
        dataset[$componentName] = dataset[$componentName] || {};
        let datasetScope = dataset[$componentName];
        let values = dataset.values;
        let length = values.length;
        let from = Math.floor(length * start);
        let to = Math.ceil(length * end);

        // ignore for maps
        if (!fixedSize) {
            from--;
            to++;
        }

        let offsetTop = this.top;
        let height = this.height - offsetTop - this.bottom;
        let verticalRate = height / (max - min) || 1;

        datasetScope.pointsY0 = [];
        datasetScope.pointsY1 = [];
        datasetScope.stackedValues = Array(to - from);
        if ($state.visiblesDatasets === 1) {
            datasetScope.stackedValues.fill($componentState.min);
        } else {
            datasetScope.stackedValues.fill(0);
        }


        let pointsY0 = datasetScope.pointsY0;
        let pointsY1 = datasetScope.pointsY1;
        let stackedValues = datasetScope.stackedValues;
        let prevDataset = false;

        $datasets.forEach(ds => {
            if (!ds.hidden) {
                if (ds.index < dataset.index) {
                    prevDataset = ds;
                }
            }
        });

        for (let i = from, c = 0; i <= to; i++) {
            if (prevDataset) {
                stackedValues[c] += prevDataset[$componentName].stackedValues[c];
            }

            let y0, y1;

            y0 = percentage ? _posY(stackedValues[c] / sumValues[i]) : _posY(stackedValues[c]);
            
            stackedValues[c] += values[i];
            
            y1 = percentage ? _posY(stackedValues[c] / sumValues[i]) : _posY(stackedValues[c]);

            y0 = isNaN(y1) ? y1 : y0;
            pointsY0.push(y0);
            pointsY1.push(y1);
            c++;
        }
    }


}
