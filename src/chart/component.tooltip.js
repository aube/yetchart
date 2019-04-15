
import { abstractComponent } from './component.js';
import Utils from './utils.js';

export class Tooltip extends abstractComponent {

    constructor(chart, options) {
        super(chart, options);
    }


    createDOM() {
        let options = this.$componentOptions;
        let itemsHTML = '';

        this.$data.datasets.forEach(dataset => {
            itemsHTML += options.itemTemplate.replace('%COLOR%', dataset.options.color);
        });

        this.component.innerHTML = options.template.replace('%ITEMS%', itemsHTML);
        this.title = this.component.querySelector('.chart-tooltip-title');
        this.items = this.component.querySelectorAll('.chart-tooltip-item');
        this.items = [].slice.call(this.items).map(item => {
            return {
                item,
                name: item.querySelector('.chart-tooltip-item-name'),
                value: item.querySelector('.chart-tooltip-item-value'),
            }
        });
    }

    render() {
        let $state = this.$state;
        let activeData = $state.activeData;
        let options = this.$componentOptions;
        let xPadding = .02;
        let _label = label => options.titleFormat ? options.titleFormat(label, $state.zoom) : label;

        if (activeData && activeData.title) {
            this.div.classList.add('active');
        } else {
            this.div.classList.remove('active');
            return;
        }

        this.title.innerText = _label(activeData.title);
        let tooltipWidth = this.div.offsetWidth / $state.width;
        let x = $state.activeX - tooltipWidth / 2;
        x = Math.max(0.02, x);
        x = Math.min(0.98 - tooltipWidth, x);
        this.div.style.left = x * 100 + '%';

        for (let i = 0; i < activeData.content.length; i++) {
            let content = activeData.content[i];
            this.items[i].item.style.display = content.hidden ? 'none' : '';
            this.items[i].name.innerText = content.name;
            this.items[i].value.innerText = content.value;
        }
    }

    /**
     * Events
     */
    onSetData() {
        this.$data = this._chart.$data;
        this.createDOM();
    }

    onSetActivePoint() {
        this.render();
    }

    onMousedown(e) {
        if (this.$state.zoom) return;
        if (!e.path.includes(this.div)) return;
        this.$methods.zoomToggle();
    }
    
}
