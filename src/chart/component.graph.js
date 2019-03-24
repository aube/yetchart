
import Utils from './utils.js';
import { abstractComponent } from './component.js';

export class Graph extends abstractComponent {

    constructor(chart, options) {
        super(chart, options);
        this.name = 'Graph';
        this.data = {
            datasets: []
        };

        let _e = (e, el) => {
            e = Utils.getEventXY(e, this.component);
            return {x: e.x / this.width, y: e.y / this.height};
        }

        this.component.addEventListener('mousemove', (e) => {
            e = _e(e);
            this.setActivePoint(e.x, e.y);
        });
        this.component.addEventListener('touchmove', (e) => {
            e = _e(e);
            this.setActivePoint(e.x, e.y, true);
        });
        this.component.addEventListener('touchend', (e) => {
            this.setActivePoint(0, 0);
        });
        this.component.addEventListener('mouseleave', (e) => {
            this.setActivePoint(0, 0);
        });
    }

    renderAniY(duration, callback) {
        let scaleYRate = this.data.scaleYRate || 1;

        this._aniYStop && this._aniYStop();

        this._aniYStop = Utils.animate({
            duration: duration || 200,
            exec: (progress) => {
                this.data.scaleYRate = 1 + scaleYRate * (1 - progress);
                Utils.throttle(this.render, 10, this);
            },
            callback: () => {
                this._aniYStop = false;
            },
            context: this
        });
    }

    renderAniX(duration, callback) {
        let pointWidthRate = this.data.pointWidthRate - 1;

        this._aniXStop && this._aniXStop();

        this._aniXStop = Utils.animate({
            duration: duration || 200,
            exec: (progress) => {
                this.data.pointWidthRate = 1 - pointWidthRate * (1 - progress);
                Utils.throttle(this.render, 10, this);
            },
            callback: () => {
                this._aniXStop = false;
            },
            context: this
        });
    }

    render() {
        this.cleanup();
        this.elements.forEach(element => {
            element.scaleYRate = this.data.scaleYRate;
            element.pointWidthRate = this.data.pointWidthRate;
            element.min = this.data.min;
            element.max = this.data.max;
            element.drawReverse = this.drawReverse;
            element.activeY = this.activeY;
            element.activeX = this.activeX;
            element.activeData = this.activeData;
            // element.fpsX = (this._aniXStop || {}).fps;
            // element.fpsY = (this._aniYStop || {}).fps;
            element.draw();
        });
    }

    prepareData() {
        let currentState = this.getCurrentState();
        let to, from, w;
        let min = Infinity;
        let max = -Infinity;
        this.drawReverse = currentState.drawReverse;

        w = Math.round((currentState.end - currentState.start) * this._data.labels.length);
        if (this.drawReverse) {
            to = Math.floor(currentState.end * this._data.labels.length);
            from = Math.max(0, to - w);
        } else {
            from = Math.ceil(currentState.start * this._data.labels.length);
            to = from + w;
        }

        this._data.datasets.forEach(_dataset => {
            let dataset = this.data.datasets.find(ds => ds.options.name === _dataset.options.name);
            if (!dataset) {
                dataset = {
                    options: Object.assign({}, _dataset.options),
                    data: [],
                };
                this.data.datasets.push(dataset);
            }

            dataset.hidden = _dataset.hidden;
            if (!dataset.hidden) {
                dataset.data = _dataset.data.slice(from, to);
                dataset.data = this.dataCompression(dataset.data, this.width * this.pixelRatio);

                // dataset minmax
                Object.assign(dataset, this.getMinMax(dataset.data));

                min = Math.min(dataset.min, min);
                max = Math.max(dataset.max, max);
            }
        });

        let prevDelta = this.data.max - this.data.min || 0;

        this.data.max = max;
        this.data.min = min;
        this.normalizeMinMax(this.options.elements.labelsAmount);

        if (prevDelta && (this.data.max - this.data.min) / prevDelta !== 1) {
            this.data.scaleYRate = (this.data.scaleYRate || 1) * (this.data.max - this.data.min) / prevDelta || 0;
        }

        this.data.pointWidthRate = this.data.labels && (this.data.labels.length / (to - from)) || 1;
        this.data.labels = this._data.labels.slice(from, to);
    }

    setActivePoint(x, y, isTouch) {
        this.prepareActiveData(x);
        this._chart.setActivePoint(x, y, this.activeData);

        // autoscroll
        if (isTouch && (x > .9 || x < .1)) {
            this.setAreaPosition(x > .9 ? x + .1 : x - .1);
        }
    }

    prepareActiveData(x) {
        if (!x) {
            this.activeData = false;
            return;
        }
        let title;
        let content = [];
        let activePoint = Math.round(this.data.labels.length * x);
        title = this.data.labels[activePoint];

        this.data.datasets.forEach(ds => {
            if (ds.hidden) return;
            content.push({
                name: ds.options.name,
                color: ds.options.color,
                value: ds.data[activePoint]
            })
        });

        this.activeData = {
            title,
            content
        }
    }


    /**
     * Events
     */
    onUpdatePosition() {
        this.prepareData();

        if (this.data.pointWidthRate !== 1) {
            if (!this._aniXStop) {
                this.renderAniX();
            }
        } else {
            if (!this._aniXStop) {
                this.renderAniX();
            }
        }
        if (this.data.scaleYRate != 1) {
            if (!this._aniYStop) {
                this.renderAniY();
            }
        }
    }

    onToggleDataset() {
        this.prepareData();
        this.renderAniY();
    }

    onSetActivePoint() {
        let currentState = this.getCurrentState();
        this.activeX = currentState.activeX;
        this.activeY = currentState.activeY;
        this.render();
    }

}

