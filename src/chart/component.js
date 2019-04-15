
import { Line } from './element.line.js';
import { Pie } from './element.pie.js';
import { Area } from './element.area.js';
import { Bar } from './element.bar.js';
import { Grid } from './element.grid.js';
import { ScaleY } from './element.scaley.js';
import { ScaleX } from './element.scalex.js';

import Utils from './utils.js';

const availableElements = {Line, Grid, ScaleY, ScaleX, Area, Bar, Pie};

export class abstractComponent {
    constructor(chart, options) {
        // console.log('options', options);
        this._chart = chart;
        this.name = this.constructor.name;
        
        this.$state = chart.$state;
        this.$methods = chart.$methods;
        
        this.$componentOptions = options;
        this.container = chart.container;
        this.elements = [];
        this.pixelRatio = 1;
        this.eventsList = ['Mouseup', 'Touchend', 'Mousemove', 'Touchmove', 'Mousedown', 'Touchstart', 'Click'];

        let parent = this.$componentOptions.outside ? this.container.parentNode : this.container;
        if (options.type === 'html') {
            this.div = parent.appendChild(document.createElement('DIV'));
        } else {
            this.canvas = parent.appendChild(document.createElement('CANVAS'));
            this.pixelRatio = this.getPixelRatio(this.canvas);
            this.ctx = this.canvas.getContext("2d");
        }

        this.component = this.canvas || this.div;
        this.component.classList.add('yetchart-' + this.constructor.name);

        if (this.$componentOptions.attrs) {
            Object.keys(this.$componentOptions.attrs).forEach(key => {
                this.component.setAttribute(key, this.$componentOptions.attrs[key]);
            });
        }
        if (this.$componentOptions.style) {
            this.component.style.position = 'absolute';
            Object.keys(this.$componentOptions.style).forEach(key => {
                this.component.style[key] = this.$componentOptions.style[key];
            });
        }

        this.$componentState = {
            opacity: 1
        };
        this.setSizes();
        this.registerEvents();
    }


    setAreaPosition(x, animate) {
        x = Math.max(Math.min(1, x), 0);
        this.$methods.setAreaPosition(x, animate);
    }

    setAreaSize(x, mode) {
        x = Math.max(Math.min(1, x), 0);
        this.$methods.setAreaSize(x, mode);
    }


    updateOptions(options = {}) {
        this.$componentOptions = Utils.objMerge({}, this.$componentOptions, options, true);

        this.elements.forEach(element => {
            let options = Utils.objMerge(
                {},
                this.$componentOptions.elementsTypes[element.type],
                this.$componentOptions.elements[element.type]);
            element.updateOptions(options);
        });
        this.render(true);
    }

    setSizes() {
        let height = this.component.offsetHeight * this.pixelRatio;
        let width = this.component.offsetWidth * this.pixelRatio;

        this.width = width;
        this.height = height;
        this.$state.pixelRatio = this.pixelRatio;
        this.$state.width = this.container.offsetWidth;
        this.$state.height = this.container.offsetWidth;

        if (this.canvas) {
            this.canvas.setAttribute('width', parseInt(width));
            this.canvas.setAttribute('height', parseInt(height));
            this.canvas.setAttribute('ratio', parseInt(this.pixelRatio));
        }

        // console.log('this.width', this.constructor.name, this.width);

        this.callElements(['setSizes']);
    }

    cleanup() {
        this.$data.stackedValues = []
        if (!this.canvas) {
            return;
        }
        var ctx = this.ctx;
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, this.width, this.height * this.pixelRatio);
        ctx.restore();
    }

    render() {
        this.cleanup();
        this.callElements(['draw']);
        // requestAnimationFrame(this.render.bind(this));
    }

    createDataElement(dataset) {
        let datasetOptions = dataset.options;
        let type = this._chart.forceDataElements || datasetOptions.elementType;
        let componentOptions = this.$componentOptions;
        let elementsTypesOptions = componentOptions.elementsTypes || {};

        if (elementsTypesOptions[type] && availableElements[type]) {
            let elsTypeOptions = elementsTypesOptions[type];

            let mergedOptions = Utils.objMerge({}, elsTypeOptions, datasetOptions, true);
            // fix sort by zindex
            mergedOptions.zindex = (mergedOptions.zindex || 0) + dataset.index / 100;
            
            let element = this.addElement(type, mergedOptions);
            element.dataset = dataset;
        }
    }

    createDataElements(datasets) {
        for (let i = 0; i < datasets.length; i++) {
            datasets[i].index = i;
            this.createDataElement(datasets[i]);
        }
    }


    createElements() {

        let elsTypes = this.$componentOptions.elementsTypes || {};
        let els = this.$componentOptions.elements;

        // predefault elements like Grid
        Object.keys(els || {}).forEach(el => {
            if (!els[el]) return;

            let elOptions = els[el];
            let elementType = elOptions.elementType || el;

            if (availableElements[elementType]) {
                let elsTypeOptions = elsTypes[elOptions.name || el];

                let mergedOptions = Utils.objMerge({}, elsTypeOptions, elOptions, true);

                let element = this.addElement(elementType, mergedOptions);
                element.data = this.data;
            }
        });

        this.elements.sort((a, b) => a.options.zindex >= b.options.zindex ? 1 : -1);
    }

    addElement(elementType, options, data) {
        if (this.name === 'Map' && elementType === 'Pie') {
            elementType = 'Area';
        }
        let element =  new availableElements[elementType]({
            canvas: this.canvas,
            ctx: this.ctx,
            component: this,
            options
        });
        element.type = elementType;
        element.$data = this.$data;
        element.$state = this.$state;
        element.$componentOptions = this.$componentOptions;
        element.$componentState = this.$componentState;
        element.$componentName = this.constructor.name;
        this.elements.push(element);
        return element;
    }

    callElements(methods) {
        this.elements.forEach(element => {
            methods.forEach(method => element[method] && element[method]());
        });
    }


    getPixelRatio(canvas){
        let ctx = canvas.getContext("2d");
        let dpr = window.devicePixelRatio || 1;
        let bsr = ctx.webkitBackingStorePixelRatio ||
                  ctx.mozBackingStorePixelRatio ||
                  ctx.msBackingStorePixelRatio ||
                  ctx.oBackingStorePixelRatio ||
                  ctx.backingStorePixelRatio || 1;

        return dpr / bsr;
    }

    dataCompression(data, maxLength, type = 'pulling'){ // pulling | averaging | maximizing
        let _data = [];
        let step = data.length / maxLength;

        if (maxLength >= data.length) {
            return data;
        }

        for (let i = 0, ii = maxLength; i < ii; i++) {
            let d = Math.min(Math.round(i * step), data.length - 1);

            if (type === 'pulling') {
                _data.push(data[d]);

            } else {
                let value = 0,
                    dd = Math.min(Math.round((i + 1) * step), data.length - 1);


                if (type === 'averaging') {
                    for (let a = d; a <= dd; a++) {
                        value += +(data[a] || 0);
                    }
                    _data.push(value / Math.max(1, dd - d));

                } else if (type === 'maximizing') {
                    for (let a = d; a <= dd; a++) {
                        value = Math.max(+(data[a] || 0), value);
                    }
                    _data.push(value);
                }
            }
        }
        return _data;
    }

    // normalizeMinMax(min, max, amount = 5) {
    //     function _n(number) {
    //         let n = 0;
    //         number = Math.abs(number);
    //         if (number < 1) {
    //             while (number * 10 * ++n < 1) {}
    //         } else {
    //             n = 1 - number.toFixed(0).length;
    //         }
    //         return Math.pow(10, n);
    //     }

    //     function _up(number) {
    //         let n = _n(number);
    //         return Math.ceil(number * n) / n;
    //     }

    //     function _down(number) {
    //         let n = _n(number);
    //         return Math.floor(number * n) / n;
    //     }

    //     function _flat(number) {
    //         let n = _n(number);
    //         return Math.round(number * n) / n;
    //     }
    //     return {min, max};

    //     min = _flat(min);
    //     let mmax = min + _flat((max - min) / amount) * amount;
    //     max = _up( max);
    //     return {min, max};
    // }


    getMinMax(fullWidth = false) {
        let length = this.$data.labels.length - 1;
        let $state = this.$state;
        let $componentState = this.$componentState;
        let min = Infinity;
        let max = -Infinity;
        let from = $state.from;
        let to = $state.to;
        let mm;
        let scaleYStartsFromZero = this.$componentOptions.scaleYStartsFromZero;

        if (fullWidth) {
            from = 0;
            to = length;
        } else {
            from = Math.max(from - 2, 0);
            to = Math.min(to + 2, length);
        }

        this.$data.datasets.forEach(dataset => {
            if (!dataset.hidden) {
                let values = dataset.values.slice(from, to);
                values = this.dataCompression(values, this.width, 'maximizing');
                mm = Object.assign({}, this.calcMinMax(values));
                min = Math.min(mm.min, min);
                max = Math.max(mm.max, max);
            }
        });
        if (this.$data.stacked) {
            let values = this.$data.sumValues.slice(from, to);
            max = Math.max(this.calcMinMax(values).max, max);
        }
// console.log('min', min, max);
        // max = max === -Infinity ? 0 : max;
        // min = min === Infinity ? 0 : min;
        max = scaleYStartsFromZero ? max * 1.2 : max;
        min = scaleYStartsFromZero ? 0 : min;
        return {max, min};
    }

    calcMinMax(data){
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


    uniAni(params, {duration, exec, callback, timing} = {}, source) {
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

        let snapshot;
        if (source) {
            snapshot = Utils.objMerge({}, params, source);
        } else {
            snapshot = Utils.objMerge({}, params, this.$state, this.$componentState);
        }

        //max min kostyl
        if (snapshot.max === -Infinity && params.max) {
            snapshot.max =  params.max * 3;
            snapshot.min =  params.min;
        }

        this.render();

        let delta = Utils.objDelta(snapshot, params);

        handle = Utils.animate({
            duration: duration || 200,
            timing: timing || 'linear',
            exec: (progress) => {
                let result = Utils.objSum(snapshot, delta, progress);

                if (source) {
                    Utils.objMerge(source, result, false);
                }

                Utils.objMerge(this.$componentState, result, false);
                Utils.objMerge(this.$state, result, false);
            

                if (exec) {
                    exec.call(this);
                } else {
                    this.render(true);
                }
            },
            callback: () => {
                callback && callback.call(this);
                handle = false;
                this.render(true);
            },
            context: this
        });
    }


    event(e, eventName, external) {
        
        if (!e.path) {
            let target = e.target;
            e.path = [target];
            while (target = target.parentNode) {
                e.path.push(target);
            }
        }
        let onEventName = 'on' + eventName;
        let ignoreTarget = !['Mousedown', 'Touchstart'].includes(eventName);
        if (!ignoreTarget && e.path && !e.path.includes(this.component)) {
            return this[onEventName](e, false, false);
        }

        let ignoreCoordinates = ['Mouseup', 'Touchend'].includes(eventName);
        if (ignoreCoordinates) {
            return this[onEventName](e, true, true);
        }
        let {x, y} = Utils.getEventXY(e, this.component);
        

        x /= this.width / this.pixelRatio;
        y /= this.height / this.pixelRatio;

        this[onEventName] && this[onEventName](e, x, y);
    }

    registerEvents() {
        let t = this;
        this.eventsList.forEach(eventName => {
            if (this['on' + eventName]) {
                document.addEventListener(eventName.toLowerCase(), e => {
                    t.event(e, eventName)
                }, false);
            }
        });
    }

    removeEvents() {
        let t = this;
        this.eventsList.forEach(eventName => {
            if (this['on' + eventName]) {
                document.removeEventListener(eventName.toLowerCase(), e => {t.event(e, eventName)}, false);
            }
        });
    }

    destroy() {
        let el = this.component;
        this.removeEvents();

        let $state = this.$state;
        let center = $state.start + ($state.end - $state.start) / 2;
        let destroyAni = this.$componentOptions.destroyAni;
        let remove = () => {
            el.parentNode.removeChild(el);
        };

        if (!destroyAni) {
            return remove();
        }

        let type = destroyAni.type || 'fade';
        let duration = destroyAni.duration || +destroyAni || 500;

        if (type === 'fade') {
            this.uniAni({
                opacity: 0,
            }, {
                duration,
                callback: remove,
            });
        }
    }

    /**
     * Events
     */

    onSetData() {
        this.$data = this._chart.$data;
        this.createDataElements(this.$data.datasets);
        if (this.$data.zoomData) {
            this.createDataElements(this.$data.zoomData.datasets);
        }
        
        this.prepareData();
        this.createElements();
        this.render(true);
    }

    onScreenResize() {
        this.setSizes();
        this.render(true);
    }

}
