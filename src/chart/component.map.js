
import { abstractComponent } from './component.js';

export class Map extends abstractComponent {

    constructor(chart, options) {
        super(chart, options);
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

        this.$data.stackedValues = [];
    }

    /**
     * Events
     */
    onToggleDataset() {
        this.prepareData();
        this.render();
    }
}