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
        // this.name = 'Map';
        this.data = {
            datasets: []
        };
        this.$componentState = {};
    }


    prepareData() {

        let labels = this.$data.labels;
        let $state = this.$state;
        let $componentState = this.$componentState;

        let {min, max} = this.getMinMax(true);

        $state.max = max;
        $state.min = min;
        $componentState.max = max;
        $componentState.min = min;

        $componentState.start = 0;
        $componentState.end = 1;
        $componentState.fixedSize = true;
    }

    /**
     * Events
     */
    onToggleDataset() {
        this.prepareData();
        this.render();
    }
}