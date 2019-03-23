
import { abstractComponent } from './component.js';
import Utils from './utils.js';
import  './tooltip.scss';

export class Tooltip extends abstractComponent {

    constructor(chart, options) {
        super(chart, options);
        this.name = 'Tooltip';
    }

    resize() {}

    prepareData() {
        if (!this.activeData) {
            // this.component.classList.remove('active');
            return;
        }
        this.component.classList.add('active');

        let title = this.options.titleFormat ? this.options.titleFormat(this.activeData.title) : this.activeData.title;
        
        this.html = this.options.titleTemplate.replace('%TITLE%', title);
        this.html += '<div class="chart-tooltip-items">';
        this.activeData.content.forEach(
            row => this.html += this.options.itemTemplate
                .replace('%VALUE%', row.value)
                .replace('%COLOR%', row.color)
                .replace('%NAME%', row.name)
        );
        this.html += '</div>';
    }

    render() {
        this.component.innerHTML = this.html;
    }

    onSetActivePoint() {
        let currentState = this.getCurrentState();
        this.activeData = currentState.activeData;
        this.activeX = currentState.activeX;
        this.activeY = currentState.activeY;

        this.prepareData();
        this.render();
    }

}
