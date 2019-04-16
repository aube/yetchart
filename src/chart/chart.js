
import Utils from './utils.js';
import Presets from './presets.js';

import { Tooltip } from './component.tooltip.js';
import { Header } from './component.header.js';
import { Graph } from './component.graph.js';
import { Map } from './component.map.js';
import { Scroll } from './component.scroll.js';
import { Legend } from './component.legend.js';


const availableComponents = {Graph, Map, Scroll, Tooltip, Header, Legend};

export default class Chart {

    constructor(options, preset) {
        const defOpt = Presets[preset] || Presets.default;

        this._options = Utils.objMerge({}, defOpt, options, true);

        this.$state = {
            start: .9,
            end: 1,
        };

        this.$methods = {
            setAreaPosition: this.setAreaPosition.bind(this),
            setAreaSize: this.setAreaSize.bind(this),
            setActivePoint: this.setActivePoint.bind(this),
            updateAreaSize: this.updateAreaSize.bind(this),
            toggleDataset: this.toggleDataset.bind(this),
            // zoomToggle: this.zoomToggle.bind(this),
            zoomOut: this.zoomOutFn.bind(this),
            zoomIn: this.zoomInFn.bind(this),
        };

        this.setContainer(options && options.element);

        window.addEventListener('resize', () => {this.onScreenResize();});
    }

    set data(data) {
        this.$data = data;

        let $state = this.$state;
        $state.length = data.labels.length;
        $state.from = Math.ceil($state.start * ($state.length - 1));
        $state.to = Math.floor($state.end * ($state.length - 1));
        this.update();
    }

    set options(options) {
        this._options = Utils.objMerge(this._options, options, true);

        this.components.forEach(component => {
            if (options[component.name]) {
                component.updateOptions(this._options[component.name]);
            }
        });
    }

    update() {
        this.callComponents(['destroy']);
        this.createComponents();
        this.calcVisibleDatasetsAmount();
        this.calcSumDatasetsValues();
        this.callComponents(['onSetData']);
    }

    createComponents() {
        // console.log('this.components', this.components);
        // (this.components || []).forEach(component => component.destroy1);
        this.components = [];
        Object.keys(this._options).forEach(this.createComponent.bind(this));
    }

    createComponent(componentName) {
        if (availableComponents[componentName]) {

            let options = this._options[componentName];
            let inheritedOptions = this._options[options.inheritOptions] || {};
            delete inheritedOptions.elements;
            delete inheritedOptions.attrs;
            options = Utils.objMerge({}, inheritedOptions, options);
            this.components.push(new availableComponents[componentName](this, options));
        }
    }

    callComponents(methods) {
        (this.components || []).forEach(component => {
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
        let $state = this.$state;
        let w = $state.end - $state.start;
        let _start = Math.min(Math.max(x - w / 2, 0), 1 - w);
        let _end = _start + w;

        $state.start = +_start.toFixed(3);
        $state.end = +_end.toFixed(3);
        $state.shift = true;

        this.updateAreaSize();
    }

    setAreaSize(x, type) {
        let $state = this.$state;
        let minimumSize = .01;

        if (type === 'start') {
            $state.start = +Math.min(Math.max(x, 0), $state.end - minimumSize).toFixed(3);
        } else {
            $state.end = +Math.max(Math.min(x, 1), $state.start + minimumSize).toFixed(3);
        }
        $state.shift = false;
        $state.reverse = type === 'start';

        this.updateAreaSize();
    }

    updateAreaSize() {
        let $state = this.$state;
        let from = Math.ceil($state.start * ($state.length - 1));
        let to = Math.floor($state.end * ($state.length - 1));
        if ($state.from !== from || $state.to !== to) {
            $state.from = from;
            $state.to = to;
            this.callComponents(['onUpdatePosition']);
        }
    }

    setActivePoint(x, y, data) {
        let $state = this.$state;
        if ($state.activeData && $state.activeData.title === data.title) {
            return;
        }
        $state.activeX = x;
        $state.activeY = y;
        $state.activeData = data;
        $state.currentTS = data && data.title || $state.currentTS;
        this.callComponents(['onSetActivePoint']);
    }

    toggleDataset(index) {
        let datasets = this.$data.datasets;
        datasets[index].hidden = !datasets[index].hidden;
        this.calcVisibleDatasetsAmount();
        if (this.$data.stacked)
            this.calcSumDatasetsValues();
        this.callComponents(['onToggleDataset']);
    }

    calcVisibleDatasetsAmount() {
        let visiblesDatasets = 0;
        this.$data.datasets.forEach(ds => {
            visiblesDatasets += ds.hidden ? 0 : 1;
        });
        this.$state.visiblesDatasets = visiblesDatasets;
    }

    calcSumDatasetsValues() {
        let datasets = this.$data.datasets;
        let sumValues = [];
        let prevDataset;

        for (let d = 0; d < datasets.length; d++) {
            if (datasets[d].hidden) continue;
            datasets[d].values0 = [];
            datasets[d].values1 = [];
            for (let v = 0; v < datasets[d].values.length; v++) {
                sumValues[v] = (sumValues[v] || 0) + datasets[d].values[v];
                datasets[d].values0[v] = prevDataset ? prevDataset.values1[v] : 0;
                datasets[d].values1[v] = datasets[d].values[v] + datasets[d].values0[v];
            }
            prevDataset = datasets[d];
        }
        this.$data.sumValues = sumValues;
        this.$data.stackedValues = [];
    }

    zoomInFn(e) {
        this.container.parentNode.classList.add('zoom');
        if (this._options.zoomIn) {
            this._options.zoomIn(this);
        }
    }

    zoomOutFn(e) {
        this.container.parentNode.classList.remove('zoom');
        if (this._options.zoomOut) {
            this._options.zoomOut(this);
        }
    }


    onScreenResize() {
        this.callComponents(['onScreenResize']);
    }

}



if (typeof window.$Chart !== 'undefined') {
    throw ('window.$Chart already taken');
}
window.$Chart = Chart;
