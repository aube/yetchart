// +debug
// import { Line } from './element.line.js';
// import { Grid } from './element.grid.js';
// import { ScaleY } from './element.scaley.js';
// import { ScaleX } from './element.scalex.js';
// import { Tooltip } from './element.tooltip.js';

// import Utils from './utils.js';
// const availableElements = {Line, Grid, ScaleY, ScaleX, Tooltip};
// -debug


import { abstractComponent } from './component.js';

export class Map extends abstractComponent {

    constructor(chart, options) {
        super(chart, options);
        this.name = 'Map';
        this.data = {
            datasets: []
        };
        this.$componentState = {};
    }


    prepareData() {
        let globalMin = Infinity;
        let globalMax = -Infinity;

        this.$data.datasets.forEach(dataset => {
            if (!dataset.hidden) {
                let values = this.dataCompression(dataset.values, this.width * this.pixelRatio);;
                let mm = Object.assign({}, this.getMinMax(values));
                globalMin = Math.min(mm.min, globalMin);
                globalMax = Math.max(mm.max, globalMax);
            }
        });
        
        this.$componentState.min = globalMin;
        this.$componentState.max = globalMax;
        this.$componentState.start = 0.0001;
        this.$componentState.end = 1;
    }

    /**
     * Events
     */
    onToggleDataset() {
        this.prepareData();
        this.render();
    }
}