
import { abstractComponent } from './component.js';
import Utils from './utils.js';

export class Header extends abstractComponent {

    constructor(chart, options) {
        super(chart, options);

        this.component.innerHTML = options.template;
        this.descript = this.component.querySelector('.chart-header-descript');
        this.state = this.component.querySelector('.chart-header-state');
        this.title = this.component.querySelector('.chart-header-title');
        this.title.innerText = this.$componentOptions.title;
    }

    render() {
        let currentState = this.$state;
        let options = this.$componentOptions;
        let _label = label => options.labelsFormat ? options.labelsFormat(label, currentState.zoom) : label;

        this.descript.innerText = _label(currentState.startLabel) + ' - ' + _label(currentState.endLabel);
    }

    /**
     * Events
     */
    onSetData() {
        this.render();
    }

    onUpdatePosition() {
        this.render();
    }

    onClick(e) {
        if (!this.$state.zoom) return;
        if (!e.path.includes(this.component)) return;
            this.$methods.zoomOut();
    }
}
