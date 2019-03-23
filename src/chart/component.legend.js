
import { abstractComponent } from './component.js';
import './legend.scss';

export class Legend extends abstractComponent {

    constructor(chart, options) {
        super(chart, options);
        this.name = 'Legend';
    }

    resize() {}

    render() {
        this.component.innerHTML = this.template;
        let btns = this.component.children;
        for (let i = 0; i < btns.length; i++) {
            btns[i].addEventListener('click', (e) => {
                btns[i].classList.toggle('hidden');
                this._chart.toggleDataset(i);
            });
        }
    }

    prepareData() {
        this.template = '';
        this._data.datasets.forEach(_dataset => {
            let o = _dataset.options;
            this.template += this.options.itemTemplate
                .replace('%TEXT%', o.title || o.name)
                .replace('%COLOR%', o.color);
        });
    }

}
