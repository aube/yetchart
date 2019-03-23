
import { Line } from './element.line.js';
import { Grid } from './element.grid.js';
import { ScaleY } from './element.scaley.js';
import { ScaleX } from './element.scalex.js';
import { Tooltip } from './element.tooltip.js';

import Utils from './utils.js';

const elements = {Line, Grid, ScaleY, ScaleX, Tooltip};

export class abstractComponent {
    constructor(chart, options) {
        this._chart = chart;
        this._options = options;

        let parent = options.inheritOptions;
        let parentOptions = {};
        if (parent) {
            parentOptions = chart.getComponentOptions(parent);
            delete parentOptions.elements;
        }

        this.options = Utils.objMerge(
            {},
            parentOptions,
            options,
            true
        );

        this.container = chart.container;

        this.elements = [];
        this.data = {datasets: []};
        this.type = this.options.type || 'canvas';
        this.createComponent();
        this.resize();
    }


    getCurrentState() {
        return this._chart.getCurrentState();
    }
    setAreaPosition(x, animate) {
        this._chart.setAreaPosition(x, animate);
    }
    setAreaSize(x, mode) {
        this._chart.setAreaSize(x, mode);
    }

    setData(data) {
        this._data = data;
        this.prepareData();
        this.createElements();
        this.render();
    }

    updateOptions(options = {}) {
        this.options = Utils.objMerge({}, this._options, options, true);

        this.elements.forEach(element => {
            let options = Utils.objMerge(
                {},
                this.options.elementsTypes[element.type],
                this.options.elements[element.type]);
            element.updateOptions(options);
        });

        this.render();
    }

    createComponent() {
        let tag = this.type === 'canvas' ? 'CANVAS' : 'DIV';
        let parent = this.options.outside ? this.container.parentNode : this.container;

        this.component = parent.appendChild(document.createElement(tag));

        this.pixelRatio = this.type === 'canvas' ? this.getPixelRatio(this.component) : 1;

        this.component.style.background = this.options.background;
        if (this.options.attrs) {
            Object.keys(this.options.attrs).forEach(key => {
                this.component.setAttribute(key, this.options.attrs[key]);
            });
        }
        if (this.options.style) {
            Object.keys(this.options.style).forEach(key => {
                this.component.style[key] = this.options.style[key];
            });
        }
    }

    resize() {
        if (this.containerHeight === this.container.offsetHeight
            && this.containerWidth === this.container.offsetWidth) {
            return false;
        }
        this.containerHeight = this.container.offsetHeight;
        this.containerWidth = this.container.offsetWidth;

        this.top = Utils.percent2value(this.options.top, this.containerHeight);
        this.left = Utils.percent2value(this.options.left, this.containerWidth);
        this.height = Utils.percent2value(this.options.height, this.containerHeight);
        this.width = Utils.percent2value(this.options.width, this.containerWidth);

        this.component.setAttribute('width', parseInt(this.width * this.pixelRatio));
        this.component.setAttribute('height', parseInt(this.height * this.pixelRatio));
        this.component.setAttribute('ratio', parseInt(this.pixelRatio));

        this.component.style.position = 'absolute';
        this.component.style.width = parseInt(this.width) + 'px';
        this.component.style.height = parseInt(this.height) + 'px';
        this.component.style.top = parseInt(this.top) + 'px';
        this.component.style.left = parseInt(this.left) + 'px';
    }

    cleanup() {
        if (this.type !== 'canvas') {
            return;
        }
        var ctx = this.component.getContext("2d");
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, this.width * this.pixelRatio, this.height * this.pixelRatio);
        ctx.restore();
    }

    render() {
        this.cleanup();

        this.elements.forEach(element => {
            element.draw();
        });
    }

    createElements() {
        this.elements = [];

        let elsTypes = this.options.elementsTypes || {};
        let els = this.options.elements;

        // predefault elements like Grid
        Object.keys(els || {}).forEach(el => {

            let elOptions = els[el];
            let elementType = elOptions.elementType || el;

            if (elements[elementType]) {
                let elsTypeOptions = elsTypes[elOptions.name || el];

                let sumOptions = Utils.objMerge({}, elsTypeOptions, elOptions);
                sumOptions.padding = Utils.sumObj(sumOptions.padding, this.options.padding);

                this.addElement(elementType, sumOptions);
            }
        });

        this.data.datasets && this.data.datasets.forEach(dataset => {
            if (elsTypes[dataset.options.elementType]) {

                let elsTypeOptions = elsTypes[dataset.options.elementType];
                let elementType = elsTypeOptions.elementType;

                if (elements[elementType]) {

                    let sumOptions = Utils.objMerge({}, elsTypeOptions, dataset.options);
                    sumOptions.padding = Utils.sumObj(sumOptions.padding, this.options.padding);

                    let element = this.addElement(elementType, sumOptions);
                    element.dataset = dataset;
                }
            }
        });

        this.elements.sort((a, b) => a.options.zindex >= b.options.zindex ? 1 : -1);
    }

    addElement(elementType, options, data) {
        let element =  new elements[elementType](this.component, options);
        element.type = elementType;
        element.data = data || this.data;
        this.elements.push(element);
        return element;
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

    normalizeMinMax(amount = 5) {
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

        if (this.data.max > this.data.min * 2) {
            this.data.min = 0;
        } else {
            this.data.min = _down(this.data.min);
        }

        this.data.max *= 1.05;

        let step = (this.data.max - this.data.min) / amount;

        step = _up(step);
        this.data.max = this.data.min + step * amount;
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

}
