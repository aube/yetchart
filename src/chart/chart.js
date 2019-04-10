
import Utils from './utils.js';
import Presets from './presets.js';

import { Graph } from './component.graph.js';
import { Map } from './component.map.js';
import { Scroll } from './component.scroll.js';
import { Legend } from './component.legend.js';


const availableComponents = {Graph, Map, Scroll, Legend};

export default class Chart {

    constructor(options, preset) {
        this.components = [];

        const defOpt = Presets[preset] || Presets.default;

        this._options = Utils.objMerge({}, defOpt, options, true);

        this.$state = {
            start: 0,
            end: .1,
        };

        this.$methods = {
            setAreaPosition: this.setAreaPosition.bind(this),
            setAreaSize: this.setAreaSize.bind(this),
            setActivePoint: this.setActivePoint.bind(this),
            toggleDataset: this.toggleDataset.bind(this),
        };

        this.setContainer(options && options.element);
        this.createComponents();


        window.addEventListener('resize', () => {this.onScreenResize();});
    }

    set data(data) {
        this.$data = data;
        this.calcVisibleDatasetsAmount();
        this.calcSumDatasetsValues();
        this.components.forEach(component => {
            component.setData(this.$data);
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
            if (availableComponents[componentName]) {

                let options = this._options[componentName];
                let inheritedOptions = this._options[options.inheritOptions] || {};
                if (inheritedOptions.elements) {
                    delete inheritedOptions.elements;
                }
                options = Utils.objMerge({}, inheritedOptions, options);
                this.components.push(new availableComponents[componentName](this, options));
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


    setAreaPosition(x) {
        let w = this.$state.end - this.$state.start;

        // autoscroll
        if (x > 1 || x < 0) {
            x = x > 1 ? x - 1 : x;
            x = this._start + w / 2 + x / 10
        }

        let _start = Math.min(Math.max(x - w / 2, 0), 1 - w);
        let _end = _start + w;
        _start = +_start.toFixed(3);
        _end = +_end.toFixed(3);

        this.$state.start = _start;
        this.$state.end = _end;
        this.$state.resize = false;

        this.callComponents(['onUpdatePosition']);
    }

    setAreaSize(x, type) {
        let minimumSize = .07;

        if (type === 'start') {
            this.$state.start = +Math.min(Math.max(x, 0), this.$state.end - minimumSize).toFixed(3);
            this.$state.drawReverse = true;
        } else {
            this.$state.end = +Math.max(Math.min(x, 1), this.$state.start + minimumSize).toFixed(3);
            this.$state.drawReverse = false;
        }
        this.$state.resize = true;

        this.callComponents(['onUpdatePosition']);
    }

    setActivePoint(x, y, data) {

        this.$state.activeX = x;
        this.$state.activeY = y;
        this.$state.activeData = data;

        this.callComponents(['onSetActivePoint']);
    }

    toggleDataset(index) {
        let datasets = this.$data.datasets;
        datasets[index].hidden = !datasets[index].hidden;
        this.calcVisibleDatasetsAmount();
        this.calcSumDatasetsValues();
        this.callComponents(['onToggleDataset']);
    }

    calcVisibleDatasetsAmount() {
        let datasets = this.$data.datasets;
        datasets.visibles = 0;
        datasets.forEach(ds => {
            datasets.visibles += ds.hidden ? 0 : 1;
        });
    }

    calcSumDatasetsValues() {
        let datasets = this.$data.datasets;
        let sumValues = [];

        for (let d = 0; d < datasets.length; d++) {
            if (datasets[d].hidden) continue;
            for (let v = 0; v < datasets[d].values.length; v++) {
                sumValues[v] = (sumValues[v] || 0) + datasets[d].values[v];
            }
        }
        datasets.sumValues = sumValues;
    }

    onScreenResize() {
        this.callComponents(['onScreenResize']);
    }

}



if (typeof window.$Chart !== 'undefined') {
    throw ('window.$Chart already taken');
}
window.$Chart = Chart;
