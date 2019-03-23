
import Utils from './utils.js';
import Presets from './presets.js';

import { Graph } from './component.graph.js';
import { Map } from './component.map.js';
import { Scroll } from './component.scroll.js';
import { Legend } from './component.legend.js';
// import { Tooltip } from './component.tooltip.js';



const components = {Graph, Map, Scroll, Legend};


function copyJSON(obj) {
    return JSON.parse(JSON.stringify(obj));
};


export default class Chart {

    constructor(options = {}, preset = 'default') {
        this.components = [];

        const defOpt = copyJSON(Presets[preset] || Presets.default);

        this._options = Utils.objMerge(defOpt, options, true);
        // this.options = {
        //     Graph: Object.assign({}, Graph, (options.Graph || {})),
        //     Map: Object.assign({}, Map, (options.Map || {})),
        // };
        // console.log('this._options', this._options);
        this.setContainer(options && options.element);
        this.createComponents();
        this.callComponents(['resize']);

        let visibleAreaWidth = Utils.percent2value(this._options.visibleArea || '10%');
        this._start = options.areaStartPositionAtLast ? 1 - visibleAreaWidth : 0;
        this._end = options.areaStartPositionAtLast ? 1 : visibleAreaWidth;

        window.addEventListener('resize', () => {this.onScreenResize();});
    }

    set data(data) {
        this.baseData = data;
        this.components.forEach(component => {
            component.setData(this.baseData);
        });
    }

    set options(options) {
        this._options = Utils.objMerge(this._options, options, true);

        this.components.forEach(component => {
            if (options[component.name]) {
                component.updateOptions(this._options[component.name]);
            }
        });
    }

    createComponents() {
        Object.keys(this._options).forEach(componentName => {
            if (components[componentName]) {
                this.components.push(new components[componentName](this, this._options[componentName]));
            }
        });
    }

    callComponents(methods) {
        this.components.forEach(component => {
            methods.forEach(method => component[method] && component[method]());
        });
    }

    setContainer(el) {
        if (el && typeof el === 'string') {
            el = document.querySelector(el);
        }

        if (!el) {
            el = document.currentScript || [].slice.call(document.getElementsByTagName('script')).pop();
            el = el.parentNode;
        }

        if (!el || !el.tagName) {
            throw 'Chart container not found';
        }
        this.container = el;
        this.container.style.position = 'relative';
    }

    getComponentOptions(componentName) {
        return Utils.objMerge({}, this._options[componentName]);
    }

    getCurrentState() {
        return {
            start: this._start,
            end: this._end,
            drawReverse: this.drawReverse,
            activeX: this.activeX,
            activeY: this.activeY,
            activeData: this.activeData,
        };
    }

    setAreaPosition(x) {
        let w = this._end - this._start;

        this._start = Math.min(Math.max(x - w / 2, 0), 1 - w);
        this._end = this._start + w;
        this._start = +this._start.toFixed(3);
        this._end = +this._end.toFixed(3);
        this.callComponents(['onUpdatePosition']);
    }

    setAreaSize(x, type) {
        let minimumSize = .07;
        if (type === 'start') {
            this._start = +Math.min(Math.max(x, 0), this._end - minimumSize).toFixed(3);
            this.drawReverse = true;
        } else {
            this._end = +Math.max(Math.min(x, 1), this._start + minimumSize).toFixed(3);
            this.drawReverse = false;
        }
        this.callComponents(['onUpdatePosition']);
    }

    setActivePoint(x, y, data) {
        this.activeX = x;
        this.activeY = y;
        this.activeData = data;
        this.callComponents(['onSetActivePoint']);
    }

    toggleDataset(index) {
        this.baseData.datasets[index].hidden = !this.baseData.datasets[index].hidden;
        this.callComponents(['onToggleDataset']);
    }

    onScreenResize() {
        this.callComponents(['resize', 'render']);
    }

}



if (typeof window.$Chart !== 'undefined') {
    throw ('window.$Chart already taken');
}
window.$Chart = Chart;
