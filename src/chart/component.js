
import { Line } from './element.line.js';
import { Grid } from './element.grid.js';
import { ScaleY } from './element.scaley.js';
import { ScaleX } from './element.scalex.js';
import { Tooltip } from './element.tooltip.js';

import Utils from './utils.js';

const availableElements = {Line, Grid, ScaleY, ScaleX, Tooltip};

export class abstractComponent {
    constructor(chart, options) {
        // console.log('options', options);
        this._chart = chart;
        
        this.$state = chart.$state;
        this.$methods = chart.$methods;
        
        this.options = options;
        this.container = chart.container;
        this.elements = [];
        this.datasets = [];
        this.pixelRatio = 1;
        this.dataMargin = .2;

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

        if (this.options.attrs) {
            Object.keys(this.options.attrs).forEach(key => {
                this.component.setAttribute(key, this.options.attrs[key]);
            });
        }
        if (this.options.style) {
            Object.keys(this.options.style).forEach(key => {
                this.component.style[key] = this.options.style[key];
            });
            this.component.style.position = 'absolute';
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

    setData(data) {
        this.$data = data;
        // console.log('setData on', this.name);
        this.createDataElements();
        this.prepareData();
        this.createElements();
        this.render(true);
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
        let containerHeight = this.container.offsetHeight;
        let containerWidth = this.container.offsetWidth;

        this.width = this.component.offsetWidth;
        this.height = this.component.offsetHeight;
        if (this.canvas) {
            this.canvas.setAttribute('width', parseInt(this.width * this.pixelRatio));
            this.canvas.setAttribute('height', parseInt(this.height * this.pixelRatio));
            this.canvas.setAttribute('ratio', parseInt(this.pixelRatio));
        }

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
        let options = this.options;
        let elementsTypesSettings = options.elementsTypes || {};
        if (elementsTypesSettings[type] && availableElements[type]) {
            let typeOptions = elementsTypesSettings[type];
            let mergedOptions = Utils.objMerge({}, typeOptions, datasetOptions);
            mergedOptions.offset = Utils.objSum(mergedOptions.offset, options.offset);
// console.log('mergedOptions.offset, options.offset', mergedOptions.offset, options.offset);
            
            let element = this._addElement(type, mergedOptions);
            element.dataset = dataset;
        }
    }

    createDataElements() {
        this.$data.datasets.forEach(dataset => {
            this.createDataElement(dataset);
        });
    }

    createElements() {
        // this.elements = [];

        let elsTypes = this.options.elementsTypes || {};
        let els = this.options.elements;

        // predefault elements like Grid
        Object.keys(els || {}).forEach(el => {

            let elOptions = els[el];
            let elementType = elOptions.elementType || el;

            if (availableElements[elementType]) {
                let elsTypeOptions = elsTypes[elOptions.name || el];

                let mergedOptions = Utils.objMerge({}, elsTypeOptions, elOptions);
                mergedOptions.offset = Utils.objSum(mergedOptions.offset, this.options.offset);

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
            options
        });
        element.type = elementType;
        element.$data = this.$data;
        element.$state = this.$state;
        element.$componentState = this.$componentState;

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
            return data.slice();
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

        if (max > min * 2) {
            min = 0;
        } else {
            min = _down(min);
        }

        // max *= 1.05;

        let step = (max - min) / amount;
        if (step * 1.2 < _up(step)) {
            step = Math.round(step * 1.1);
        } else {
            step = _up(step);
        }

        max = min + step * amount;
        return {min, max};
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




    checkEvent(e, eventName) {
        let ignoreTarget = !['Mousedown', 'Touchstart'].includes(eventName);
        if (!ignoreTarget && e.path && !e.path.includes(this.component)) {
            return {x: false, y: false};
        }

        let ignoreCoordinates = ['Mouseup', 'Touchend'].includes(eventName);
        if (ignoreCoordinates) {
            return {x: true, y: true};
        }
        let xy = Utils.getEventXY(e, this.component);
        return {x: xy.x / this.width, y: xy.y / this.height};
    }
    registerEvents() {
        let t = this;

        function event(e, eventName) {
            let {x, y} = t.checkEvent(e, eventName);
            if (x === false) return;
            t['on' + eventName](x, y, e);
        }

        ['Mouseup', 'Touchend', 'Mousemove', 'Touchmove', 'Mousedown', 'Touchstart'].forEach(eventName => {
            if (this['on' + eventName])
                document.addEventListener(eventName.toLowerCase(), e => {event(e, eventName)}, true);
        });
    }

    /**
     * Events
     */
    

    onScreenResize() {
        this.setSizes();
        this.render();
    }

}
