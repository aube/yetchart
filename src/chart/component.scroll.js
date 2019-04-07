
import { abstractComponent } from './component.js';
import Utils from './utils.js';

export class Scroll extends abstractComponent {

    constructor(chart, options) {
        super(chart, options);
        this.name = 'Scroll';

        this.component.innerHTML = options.template;
        this.bars = this.component.getElementsByClassName('chart-scroll-bar');
        this.carret = this.component.querySelector('.chart-scroll-carret');
        this.scroll = this.component.querySelector('.chart-scroll');
    }

    setData(data) {
        this.prepareData();
        this.render();
    }

    _scrollMoveAni(x) {
        let current = (this.start + this.end) / 2 / 100;
        let shift = x - current;

        if (this._aniStop) {
            this._aniStop();
        }

        this._aniStop = Utils.animate({
            duration: 200,
            exec: (progress) => {
                this.setAreaPosition(current + shift * progress);
            }
        });
    }

    render() {
        this.bars[0].style.width = this.start + '%';
        this.bars[1].style.width = 100 - this.end + '%';
        this.carret.style.width = this.end - this.start + '%';
        this.scroll.style.opacity = .7;
    }

    prepareData() {
        let currentState = this.$state;
        this.start = currentState.start * 100;
        this.end = currentState.end * 100;
    }

    /**
     * Events
     */
    onUpdatePosition() {
        this.prepareData();
        this.render();
    }

    onMousedown(x, y) {
        this.drag = 'click';
        this.clickX = x;
        let accuracy = 0.05;
        let currentState = this.$state;
        let relAccuracy = (currentState.end - currentState.start) * accuracy * 2;

        if (currentState.start - accuracy <= x && currentState.end + accuracy >= x) {
            if (currentState.start + relAccuracy >= x) {
                this.drag = 'start';
            } else if (currentState.end - relAccuracy <= x) {
                this.drag = 'end';
            } else {
                this.drag = 'shift';
            }
            this.deltaX = x - (currentState.end + currentState.start) / 2;
        }
    }

    onMouseup() {
        if (this.drag === 'click') {
            this.setAreaPosition(this.clickX);
        }
        this.drag = false;
        this.clickX = false;
    }

    onMousemove(x, y) {
        if (!this.drag) {
            return;
        }

        if (this.drag === 'click') {
            this.clickX = x;
        }else if (this.drag === 'shift') {
            this.clickX = x;
            this.setAreaPosition(x - this.deltaX);
        } else if (['start', 'end'].includes(this.drag)) {
            this.setAreaSize(x, this.drag);
        }
    }

    onTouchend() {
        this.onMouseup();
    }

    onTouchmove(x, y) {
        this.onMousemove(x, y);
    }

    onTouchstart(x, y) {
        this.onMousedown(x, y);
    }
}
