
import { abstractComponent } from './component.js';

export class Legend extends abstractComponent {

    constructor(chart, options) {
        super(chart, options);
    }

    // setSizes() {}

    render() {
        this.div.style.opacity = this.$componentState.opacity;
    }

    // prepareData() {}

    onSetData() {
        this.$data = this._chart.$data;
        this.template = '';
        if (!this.$data.datasets || this.$data.datasets.length < 2) return;
        this.$data.datasets.forEach(dataset => {
            this.template += this.$componentOptions.itemTemplate
                .replace('%TEXT%', dataset.name)
                .replace(/%COLOR%/g, dataset.options.color);
        });

        this.component.innerHTML = this.template;

        let btns = this.component.children;
        for (let i = 0; i < btns.length; i++) {
            btns[i].addEventListener('click', (e) => {
                btns[i].classList.toggle('hidden');
                this.$methods.toggleDataset(i);
            });
        }
    }

}
