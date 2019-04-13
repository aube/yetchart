
import Utils from './utils.js';
import { abstractComponent } from './component.js';

export class Graph extends abstractComponent {

    constructor(chart, options) {
        super(chart, options);
        // this.name = 'Graph';
        this.data = {
            datasets: []
        };
        this.$componentState = {
            opacity: 0
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
    }

    renderStop() {
        this.elementsAnimate = false;
    }


    uniAni(params, fn, callback) {
        function objEqual(o0, o1) {
            let keys = Object.keys(o0);
            for (let i = 0; i < keys.length; i++) {
                if (o0[keys[i]] !== o1[keys[i]]) {
                    return false;
                }
            }
            return true;
        }
        let id = Object.keys(params).join('');
        this._aniHandles = this._aniHandles || {};
        let handle = this._aniHandles[id] = this._aniHandles[id] || {};

        if (handle.params && objEqual(handle.params, params)) return;
        handle.params = Object.assign({}, params);
        handle.stop && handle.stop();

        let snapshot = Utils.objMerge({}, params, this.$state, this.$componentState);

        //max min kostyl
        if (snapshot.max === -Infinity && params.max) {
            snapshot.max =  params.max * 3;
            snapshot.min =  params.min;
        }

        this.elementsAnimate = true;
        this.render();

        let delta = Utils.objDelta(snapshot, params);
// console.log('delta', delta);
// console.log('snapshot', snapshot);
// console.log('params', params);
        handle = Utils.animate({
            duration: 200,
            timing: 'linear',
            exec: (progress) => {
                let result = Utils.objSum(snapshot, delta, progress);

                Utils.objMerge(this.$componentState, result, false);
                Utils.objMerge(this.$state, result, false);

                if (fn) {
                    fn.call(this);
                } else {
                    this.render(true);
                }
            },
            callback: () => {
                callback && callback.call(this);
                this.renderStop();
                handle = false;
            },
            context: this
        });
    }

    // minMaxAni(mm) {
    //     this.minMaxAniHandle = this.minMaxAniHandle || {};
    //     let handle = this.minMaxAniHandle;
    //     if (handle.mm && mm.min === handle.mm.min && mm.max === handle.mm.max) {
    //         return;
    //     }

    //     handle.stop && handle.stop();
    //     this.minMaxAniHandle.mm = mm;
    //     let snapshot = Utils.objMerge({min: 0, max: 0}, this.$componentState);
    //     snapshot.max = snapshot.max === -Infinity ? mm.max * 3 : snapshot.max;
    //     snapshot.min = snapshot.min ===  Infinity ? mm.min : snapshot.min;
    //     let delta = {
    //         max: mm.max - snapshot.max,
    //         min: mm.min - snapshot.min,
    //     }
    //     // console.log('mm', snapshot, mm, delta);
    //     // Utils.objMerge(this.$componentState, mm);
    //     // ani(base, delta, duration, callback) {
    //     // let id = 'ani' + Date.now();
    //     this.minMaxAniHandle = Utils.animate({
    //         duration: 200,
    //         timing: 'linear',
    //         exec: (progress) => {
    //             let result = Utils.objSum(snapshot, delta, progress);
    //             // console.log('result', result);
    //             Utils.objMerge(this.$componentState, result);
    //             this.render(true);
    //             // this.data.reverse = true;
    //             // console.log('this.data', this.data);
    //         },
    //         callback: () => {
    //             // console.log(id, this.data.pointWidth, 'end');
    //             // this.draw();
    //             this.minMaxAniHandle = false;
    //             // console.log('callback exec', 'promise  resolve');
    //             // callback && callback();
    //         },
    //         context: this
    //     });
    //     // }
    // }


    prepareData() {
        let labels = this.$data.labels;
        let $state = this.$state;
        let $componentState = this.$componentState;

        let {min, max} = this.getMinMax();

        // $state.max = max;
        // $state.min = min;
        $componentState.max = max;
        $componentState.min = min;

        $state.startLabel = labels[$state.from];
        $state.endLabel = labels[$state.to];

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
            // if (ds.hidden) return;
            content.push({
                index: ds.index,
                hidden: ds.hidden,
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
        // let $state = this.$state;
        // let $componentState = this.$componentState;

        // console.log('$state', $state,$componentState);

        // let {min, max} = this.getMinMax();

        // // $state.max = max;
        // // $state.min = min;
        // $componentState.max = max;
        // $componentState.min = min;
        
        this.uniAni(this.getMinMax());
        // this.uniAni({
        //     start: Math.random(),
        //     end: Math.random(),
        // }, this.$methods.updateAreaSize);

        // super.render();
    }

    onSetActivePoint() {
        super.render();
    }

    onSetData() {
        super.onSetData();
        this.uniAni({opacity: 1});
    }

    /**
     * Events
     */
    onMouseup(e) {
        if (this.$state.zoom)
            this.setActivePoint(0, 0);
    }

    onMousedown(e, x, y) {
        this.setActivePoint(x, y);
    }

    onMousemove(e, x, y) {
        if (e.path && !e.path.includes(this.component)) {
            this.setActivePoint(0, 0);
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

    beforeZoomIn() {
        let $state = this.$state;
        let center = $state.start + ($state.end - $state.start) / 2;

        this.uniAni({
            start: center - .02,
            end: center + .02,
            opacity: 0,
        }, this.$methods.updateAreaSize);
    }
    onZoomIn() {
        // console.log('onZoomIn', 132);
        this.uniAni({
            start: .4,
            end: .5,
            opacity: 1,
        }, this.$methods.updateAreaSize);
    }
}

