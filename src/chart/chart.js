
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
            zoomToggle: this.zoomToggle.bind(this),
        };

        this.setContainer(options && options.element);

        window.addEventListener('resize', () => {this.onScreenResize();});
    }

    set data(data) {
        let $state = this.$state;
        $state.length = data.labels.length;
        $state.from = Math.ceil($state.start * ($state.length - 1));
        $state.to = Math.floor($state.end * ($state.length - 1));

        this.$data = data;
        this.callComponents(['destroy']);
        this.createComponents();
        this.calcVisibleDatasetsAmount();
        this.calcSumDatasetsValues();
        this.callComponents(['onSetData']);
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
        this.data = this.$data;
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
        $state.from = Math.ceil($state.start * ($state.length - 1));
        $state.to = Math.floor($state.end * ($state.length - 1));
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

    zoomToggle() {
        this.zoom = !this.zoom;
        if (this.zoom) {
            this.zoomInFn();
        } else {
            this.zoomOutFn();
        }
        // console.log('123', this._options);
    }

    zoomInFn(ts = 1542326400000) {
        this.container.parentNode.classList.add('zoom');
        setTimeout(()=>{
            let opt = this._options;
            this._state = this.$state;
            this._data = this.$data;
            try {
                opt.zoomData(this, ts).then(data => {
                    this.$state = {
                        start: 0,
                        end: 1,
                        zoom: true,
                    };
                    this.data = data;
                });
            } catch(err) {}
        }, 200);
        setTimeout(()=>{
            this.callComponents(['onZoomIn']);
        }, 400);
    }

    zoomOutFn(e) {
        this.container.parentNode.classList.remove('zoom');
        this.$state = this._state;
        this.data = this._data;
    }


    onScreenResize() {
        this.callComponents(['onScreenResize']);
    }

}



if (typeof window.$Chart !== 'undefined') {
    throw ('window.$Chart already taken');
}
window.$Chart = Chart;
