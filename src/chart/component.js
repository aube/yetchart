
import { Line } from './element.line.js';
import { Area } from './element.area.js';
import { Bar } from './element.bar.js';
import { Grid } from './element.grid.js';
import { ScaleY } from './element.scaley.js';
import { ScaleX } from './element.scalex.js';
// import { Tooltip } from './element.tooltip.js';

import Utils from './utils.js';

const availableElements = {Line, Grid, ScaleY, ScaleX, Area, Bar};

export class abstractComponent {
    constructor(chart, options) {
        // console.log('options', options);
        this._chart = chart;
        this.name = this.constructor.name;
        
        this.$state = chart.$state;
        this.$methods = chart.$methods;
        
        this.options = options;
        this.container = chart.container;
        this.elements = [];
        // this.datasets = [];
        this.pixelRatio = 1;
        // this.dataMargin = .2;
        this.eventsList = ['Mouseup', 'Touchend', 'Mousemove', 'Touchmove', 'Mousedown', 'Touchstart', 'Click'];

        let parent = this.options.outside ? this.container.parentNode : this.container;
        if (options.type === 'html') {
            this.div = parent.appendChild(document.createElement('DIV'));
        } else {
            this.canvas = parent.appendChild(document.createElement('CANVAS'));
            this.pixelRatio = this.getPixelRatio(this.canvas);
            this.ctx = this.canvas.getContext("2d");
            // this.ctx.scale(this.pixelRatio, this.pixelRatio);
        }

        this.component = this.canvas || this.div;
        this.component.classList.add('yetchart-' + this.constructor.name);

        if (this.options.attrs) {
            Object.keys(this.options.attrs).forEach(key => {
                this.component.setAttribute(key, this.options.attrs[key]);
            });
        }
        if (this.options.style) {
            this.component.style.position = 'absolute';
            Object.keys(this.options.style).forEach(key => {
                this.component.style[key] = this.options.style[key];
            });
        }

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
        this.options = Utils.objMerge({}, this.options, options, true);

        this.elements.forEach(element => {
            let options = Utils.objMerge(
                {},
                this.options.elementsTypes[element.type],
                this.options.elements[element.type]);
            element.updateOptions(options);
        });
    }

    setSizes() {
        let height = this.component.offsetHeight;
        let width = this.component.offsetWidth;

        this.width = width;
        this.height = height;
        this.$state.width = this.container.offsetWidth;
        this.$state.height = this.container.offsetWidth;

        if (this.canvas) {
            this.canvas.setAttribute('width', parseInt(width * this.pixelRatio));
            this.canvas.setAttribute('height', parseInt(height * this.pixelRatio));
            this.canvas.setAttribute('ratio', parseInt(this.pixelRatio));
        }

        // console.log('this.width', this.constructor.name, this.width);

        this.callElements(['setSizes']);
    }

    cleanup() {
        if (!this.canvas) {
            return;
        }
        var ctx = this.ctx;
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, this.width * this.pixelRatio, this.height * this.pixelRatio);
        ctx.restore();
    }

    render() {
        this.cleanup();
        this.callElements(['draw']);
        // requestAnimationFrame(this.render.bind(this));
    }

    createDataElement(dataset) {
        let datasetOptions = dataset.options;
        let type = datasetOptions.elementType;
        let componentOptions = this.options;
        let elementsTypesOptions = componentOptions.elementsTypes || {};

        if (elementsTypesOptions[type] && availableElements[type]) {
            let elsTypeOptions = elementsTypesOptions[type];

            let mergedOptions = Utils.objMerge({}, componentOptions, elsTypeOptions, datasetOptions, true);
            // fix sort by zindex
            mergedOptions.zindex = (mergedOptions.zindex || 0) + dataset.index / 100;
            
            let element = this._addElement(type, mergedOptions);
            element.dataset = dataset;
        }
    }

    createDataElements() {
        let datasets = this.$data.datasets;

        for (let i = 0; i < datasets.length; i++) {
            datasets[i].index = i;
            this.createDataElement(datasets[i]);
        }
    }


    createElements() {
        // this.elements = [];

        let elsTypes = this.options.elementsTypes || {};
        let els = this.options.elements;
        let componentOptions = this.options;

        // predefault elements like Grid
        Object.keys(els || {}).forEach(el => {

            let elOptions = els[el];
            let elementType = elOptions.elementType || el;

            if (availableElements[elementType]) {
                let elsTypeOptions = elsTypes[elOptions.name || el];

                let mergedOptions = Utils.objMerge({}, componentOptions, elsTypeOptions, elOptions, true);

                let element = this._addElement(elementType, mergedOptions);
                element.data = this.data;
            }
        });

        this.elements.sort((a, b) => a.options.zindex >= b.options.zindex ? 1 : -1);
    }

    _addElement(elementType, options, data) {

        let element =  new availableElements[elementType]({
            canvas: this.canvas,
            ctx: this.ctx,
            component: this,
            options
        });
        element.type = elementType;
        element.$data = this.$data;
        element.$state = this.$state;
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

    normalizeMinMax(min, max, amount = 5) {
        function _n(number) {
            let n = 0;
            number = Math.abs(number);
            if (number < 1) {
                while (number * 10 * ++n < 1) {}
            } else {
                n = 1 - number.toFixed(0).length;
            }
            return Math.pow(10, n);
        }

        function _up(number) {
            let n = _n(number);
            return Math.ceil(number * n) / n;
        }

        function _down(number) {
            let n = _n(number);
            return Math.floor(number * n) / n;
        }

        function _flat(number) {
            let n = _n(number);
            return Math.round(number * n) / n;
        }
        return {min, max};

        min = _flat(min);
        let mmax = min + _flat((max - min) / amount) * amount;
        max = _up( max);
        return {min, max};




        // if (max > min * 2) {
        //     min = 0;
        // } else {
        //     min = _down(min);
        // }

        // // max *= 1.05;

        // let step = (max - min) / amount;
        // if (step * 1.2 < _up(step)) {
        //     step = Math.round(step * 1.1);
        // } else {
        //     step = _up(step);
        // }

        // max = min + step * amount;
        // return {min, max};
    }


    getMinMax(fullWidth = false) {
        let length = this.$data.labels.length - 1;
        let $state = this.$state;
        let $componentState = this.$componentState;
        let min = Infinity;
        let max = -Infinity;
        let from = $state.from;
        let to = $state.to;
        let mm;
        let scaleYStartsFromZero = this.options.scaleYStartsFromZero;

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
                values = this.dataCompression(values, this.width * this.pixelRatio, 'maximizing');
                mm = Object.assign({}, this.calcMinMax(values));
                min = Math.min(mm.min, min);
                max = Math.max(mm.max, max);
            }
        });

        if (this.$data.stacked) {
            let values = this.$data.sumValues.slice(from, to);
            max = Math.max(this.calcMinMax(values).max, max);
        }
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
        

        x /= this.width;
        y /= this.height;

        // if (external) {
        //     this.options[onEventName] && this.options[onEventName].call(this, e, x, y);
        // } else {
            this[onEventName] && this[onEventName](e, x, y);
        // }
        // console.log('this.options[onEventName]', onEventName, this.options[onEventName]);
        // external function:
    }

    registerEvents() {
        let t = this;
        this.eventsList.forEach(eventName => {
            if (this['on' + eventName])
                document.addEventListener(eventName.toLowerCase(), e => {
                    t.event(e, eventName)
                }, false);
            // if (this.options['on' + eventName])
            //     document.addEventListener(eventName.toLowerCase(), this.options['on' + eventName], true);
        });
    }

    removeEvents() {
        let t = this;
        this.eventsList.forEach(eventName => {
            if (this['on' + eventName])
                document.removeEventListener(eventName.toLowerCase(), e => {t.event(e, eventName)}, false);
            // if (this.options['on' + eventName])
            //     document.removeEventListener(eventName.toLowerCase(), this.options['on' + eventName], true);
        });
    }

    destroy() {
        let el = this.component;
        this.removeEvents();
        el.parentNode.removeChild(el);
    }

    /**
     * Events
     */

    onSetData() {
        this.$data = this._chart.$data;
        this.createDataElements();
        this.prepareData();
        this.createElements();
        this.render(true);
    }

    onScreenResize() {
        this.setSizes();
        this.render();
    }

}
