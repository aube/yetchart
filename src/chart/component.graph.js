
import Utils from './utils.js';
import { abstractComponent } from './component.js';

export class Graph extends abstractComponent {

    constructor(chart, options) {
        super(chart, options);
        this.data = {
            datasets: []
        };
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
        this.component.style.opacity = this.$componentOptions.opacity;
    }

    renderingStop() {
        this.elementsAnimate = false;
    }



    prepareData() {
        let $data = this.$data;
        let labels = $data.labels;
        let datasets = $data.datasets;
        let $state = this.$state;
        let $componentState = this.$componentState;

        let {min, max} = this.getMinMax();

        $componentState.max = max;
        $componentState.min = min;

        $state.startLabel = labels[$state.from];
        $state.endLabel = labels[$state.to];

    }

    setActivePoint(x, y) {
        if (!x) {
            this.$methods.setActivePoint(x, y, false);
            // this.activeData = false;
            return;
        }
        if (this._activeX === x) return;
        this._activeX = x;

        this.elements.forEach(element => {
            if (element.dataset && element.checkSelection) {
                let data = element.checkSelection(x * this.width, y * this.height);
                this.$methods.setActivePoint(x, y, data);
            }
        });

    }


    /**
     * Events
     */
    onUpdatePosition() {
        this.prepareData();
        super.render();
    }

    onToggleDataset() {
        this.uniAni(this.getMinMax());
    }

    onSetActivePoint() {
        super.render();
    }

    onSetData() {
        let params = {
            opacity: 1,
        }
        this.$componentOptions.opacity = 0;
        super.onSetData();
        this.uniAni(params, {
            duration: 500,
            timing: 'pow2',
        }, this.$componentOptions);
    }

    /**
     * Events
     */
    
    onMouseup(e) {
        this.mousePress = false;
    }

    onMousedown(e, x, y) {
        this.mousePress = true;
        this.setActivePoint(x, y);
    }

    onMousemove(e, x, y) {
        if (!this.mousePress || e.path && !e.path.includes(this.component)) {
            return;
        }
        this.setActivePoint(x, y);
    }

    onTouchend(e) {
        this.onMouseup(e);
    }

    onTouchmove(e, x, y) {
        this.onMousemove(e, x, y);
    }

    onTouchstart(e, x, y) {
        this.onMousedown(e, x, y);
    }

    onZoomIn() {
        // console.log('onZoomIn', 132);
        this.uniAni({
            start: .4,
            end: .5,
            // opacity: 1,
        }, {exec: this.$methods.updateAreaSize});
    }
}

