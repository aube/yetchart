
import Utils from './utils.js';
import { abstractComponent } from './component.js';

export class Graph extends abstractComponent {

    constructor(chart, options) {
        super(chart, options);
        this.name = 'Graph';
        this.data = {
            datasets: []
        };
        this.$componentState = {};
    }

    render(force) {
        if (force || this.elementsAnimate) {
            this.cleanup();
            this.elements.forEach(element => {
                element.draw();
            });
            if (!force)
                requestAnimationFrame(this.render.bind(this));
        }
    }

    prepareData() {
        let currentState = this.$state;
        let to, from, w;
        let globalMin = Infinity;
        let globalMax = -Infinity;
        let dataMargin = this.dataMargin;
        let animations = [];
        let newData;
        let mm;
        this.drawReverse = currentState.drawReverse;

        w = Math.round((currentState.end - currentState.start) * this.$data.labels.length);
        if (this.drawReverse) {
            to = Math.floor(currentState.end * this.$data.labels.length);
            from = Math.max(0, to - w);
        } else {
            from = Math.ceil(currentState.start * this.$data.labels.length);
            to = from + w;
        }

        this.$data.datasets.forEach(dataset => {
            if (!dataset.hidden) {
                let values = dataset.values.slice(from, to);
                mm = Object.assign({}, this.getMinMax(values));
                globalMin = Math.min(mm.min, globalMin);
                globalMax = Math.max(mm.max, globalMax);
            }
        });

        mm = this.normalizeMinMax(globalMin, globalMax, this.options.elements.ScaleY.labelsAmount);

        this.$componentState.max = mm.max;
        this.$componentState.min = mm.min;
        this.data.labels = this.$data.labels.slice(from, to);
        this.render(true);

        // this.datasets.forEach(dataset => {
        //     if (!dataset.hidden) {
        //         newData.globalMin = globalMin;
        //         newData.globalMax = globalMax;
        //         animations.push(dataset.element.setData(newData));
        //     }
        // });

        // this.elementsAnimate = true;
        // this.render();
        // animations.sort();
        // if (this.animation) {
        //     clearTimeout(this.animation);
        // }
        // this.animation = setTimeout(()=>{
        //     this.elementsAnimate = false;
        // }, animations.pop());
    }

    setActivePoint(x, y) {
        if (this._activeX === x) return;
        this._activeX = x;

        this.prepareActiveData(x);
        this.$methods.setActivePoint(x, y, this.activeData);
    }

    prepareActiveData(x) {
        if (!x) {
            this.activeData = false;
            return;
        }

        x = (this.$state.end - this.$state.start) * x;
        let title;
        let content = [];
        let activePoint = Math.round(this.$data.labels.length * x);

        title = this.$data.labels[activePoint];

        this.$data.datasets.forEach(ds => {
            if (ds.hidden) return;
            content.push({
                name: ds.name,
                color: ds.options.color,
                value: ds.values[activePoint]
            })
        });

        this.activeData = {
            title,
            content,
            activePoint
        }
    }


    /**
     * Events
     */
    onUpdatePosition() {
        this.prepareData();
        super.render();
    }

    onToggleDataset() {
        this.prepareData();
        super.render();
    }

    onSetActivePoint() {
        super.render();
    }


    /**
     * Events
     */
    onMouseup() {
        this.setActivePoint(0, 0);
    }

    onMousedown(x, y) {
        this.setActivePoint(x, y);
    }

    onMousemove(x, y, e) {
        if (e.path && !e.path.includes(this.component)) {
            this.setActivePoint(0, 0);
            return;
        }
        this.setActivePoint(x, y);
    }

    onTouchend() {
        this.setActivePoint(0, 0);
    }

    onTouchmove(x, y, e) {
        this.onMousemove(x, y, e);
    }

    onTouchstart(x, y) {
        this.onMousedown(x, y);
    }
}

