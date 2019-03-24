
import { abstractComponent } from './component.js';

export class Map extends abstractComponent {

    constructor(chart, options) {
        super(chart, options);
        this.name = 'Map';
        this.data = {
            datasets: []
        };
    }

    render() {
        this.cleanup();
        this.elements.forEach(element => {
            element.min = this.data.min;
            element.max = this.data.max;
            element.draw();
        });
    }

    prepareData() {
        let min = Infinity;
        let max = -Infinity;
        let dataMargin = .2;

        this._data.datasets.forEach(_dataset => {
            let dataset = this.data.datasets.find(ds => ds.options.name === _dataset.options.name);
            if (!dataset) {
                dataset = {
                    options: Object.assign({}, _dataset.options),
                    data: [],
                };
                this.data.datasets.push(dataset);
            }

            dataset.hidden = _dataset.hidden;
            if (!dataset.hidden) {
                dataset.data = this.dataCompression(_dataset.data, this.width * this.pixelRatio);
                // dataset minmax
                Object.assign(dataset, this.getMinMax(dataset.data));

                min = Math.min(dataset.min, min) * dataMargin;
                max = Math.max(dataset.max, max) * (1 + dataMargin);
            }
        });
        Object.assign(this.data, {min, max});
    }

    /**
     * Events
     */
    onToggleDataset() {
        this.prepareData();
        this.render();
    }
}