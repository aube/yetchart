
import { abstractComponent } from './component.js';

export class Legend extends abstractComponent {

    constructor(chart, options) {
        super(chart, options);
        // this.name = 'Legend';
    }

    setSizes() {}

    render() {
        this.component.innerHTML = this.template;
        let btns = this.component.children;
        for (let i = 0; i < btns.length; i++) {
            btns[i].addEventListener('click', (e) => {
                btns[i].classList.toggle('hidden');
                this.$methods.toggleDataset(i);
            });
        }
    }

    prepareData() {
        this.template = '';
        this.$data.datasets.forEach(dataset => {
            this.template += this.options.itemTemplate
                .replace('%TEXT%', dataset.name)
                .replace(/%COLOR%/g, dataset.options.color);
        });
    }

}
