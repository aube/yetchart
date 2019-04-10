
import { abstractElement } from './element.js';

export class Area extends abstractElement {
    constructor(params) {
        super(params);
    }

    getMinMax(data){
        if (!data) {
            return false;
        }

        let min = Infinity,
            max = -Infinity;

        for (let i = data.length - 1; i >= 0; i--) {
            min = Math.min(min, +data[i]);
            max = Math.max(max, +data[i]);
        }

        return {
            min,
            max
        };
    }

    calculate() {

        let _posY = value => {
            // values in percents
            return this.height * value + this.top;

            // absolute values
            return this.height - value * verticalRate + this.top;
        };

        let $componentState = this.$componentState;
        let start = $componentState.start || this.$state.start;
        let end = $componentState.end || this.$state.end;
        let min = $componentState.min;
        let max = $componentState.max;

        let $datasets = this.$data.datasets;
        let sumValues = $datasets.sumValues;
        let dataset = this.dataset;
        let $componentName = this.$componentName;
        dataset[$componentName] = dataset[$componentName] || {};

        let datasetScope = dataset[$componentName];
        let values = dataset.values;
        let length = values.length;
        let from = Math.floor(length * start);
        let to = Math.ceil(length * end);
        let verticalRate = this.height / (max - min) || 1;

        datasetScope.pointsY = [];
        datasetScope.beginY = [];

        let pointsY = datasetScope.pointsY;
        let beginY = datasetScope.beginY;
        let lastVisibleIndex = false;
        let visibleNumber = 0;
        let prevDataset = false;
        $datasets.forEach(ds => {
            if (!ds.hidden) {
                lastVisibleIndex = ds.index;
                visibleNumber++;
                if (ds.index < dataset.index) {
                    prevDataset = ds;
                }
            }
        });

        for (let i = from, c = 0; i < to; i++) {
            let b = prevDataset ? prevDataset[$componentName].pointsY[c++] : this.height + this.top;
            let y = _posY(values[i] / sumValues[i]);
            y = dataset.index ? b - y : y;
            pointsY.push(y);
            beginY.push(b);
        }

        // if ($componentName == 'Graph') {
        //     console.log('po',dataset.name, pointsY);
        //     console.log('bo',dataset.name, beginY);
        // }

        if (lastVisibleIndex === dataset.index) {
            pointsY.fill(this.top);
            if (visibleNumber === 1) {
                beginY.fill(this.height + this.top);
            }
        }

        this.start = start;
        this.end = end;
        this.min = min;
        this.max = max;
    }

    draw() {
        if (!this.dataset || this.dataset.hidden) return;
        this.calculate();

        let _posX = point => {
            return point * pointWidth + pointWidth/2 * 0 + this.left ;
        };

        let pointsY = this.dataset[this.$componentName].pointsY;
        let beginY = this.dataset[this.$componentName].beginY;
        let options = this.options;
        let y, x, t;
        let length = pointsY.length - 1;


        let pointWidth = this.width / (length - 1);
        let ctx = this.ctx;

        ctx.translate(0.5, 0.5);
        ctx.beginPath();
        ctx.lineWidth = options.width;
        ctx.lineJoin = options.join;
        ctx.strokeStyle = options.color;
        ctx.fillStyle = options.color;

        let i = 0;
        let firstY = pointsY[0];
        let firstX = _posX(0);
        ctx.moveTo(firstX, firstY);

        for (i; i < length; i++) {
            y = pointsY[i];
            x = _posX(i);
            ctx.lineTo(x, y);
        }

        for (i = length - 1; i >= 0; i--) {
            y = beginY[i];
            x = _posX(i);
            ctx.lineTo(x, y);
        }

        ctx.lineTo(firstX, firstY);
        ctx.fill();
        ctx.stroke();


        // debug
        // if (this.dataset.name === 'y0') {
        //     let x = 50;
        //     let y = 1;
        //     ctx.textAlign = 'left';
        //     ctx.font = '32px arial';
        //     ctx.fillStyle = '#333';
        //     ctx.fillText('length: ' + length, x, y++ * 30 + 100);

        //     Object.keys(this.$state).forEach(key => {
        //         ctx.fillText(key + ': ' + this.$state[key], x, y++ * 30 + 100);
        //     });
        // }

        ctx.stroke();
        ctx.translate(-0.5, -0.5);
    }
}