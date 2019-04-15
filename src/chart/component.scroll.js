
import { abstractComponent } from './component.js';
import Utils from './utils.js';

export class Scroll extends abstractComponent {

    constructor(chart, options) {
        super(chart, options);

        this.component.innerHTML = options.template;
        this.bars = this.component.getElementsByClassName('chart-scroll-bar');
        this.carret = this.component.querySelector('.chart-scroll-carret');
        this.scroll = this.component.querySelector('.chart-scroll');
    }

    _scrollMoveAni(x) {
        let current = (this.start + this.end) / 2 / 100;
        let shift = x - current;
        
        if (this._scrollAnimation) {
            this._scrollAnimation.stop();
        }

        this._scrollAnimation = Utils.animate({
            duration: 200,
            exec: (progress) => {
                this.setAreaPosition(current + shift * progress);
            }
        });
    }

    render() {
        let borderWidthCorrection = parseInt(getComputedStyle(this.carret)['border-left-width']);
        this.carret.style.width = this.end - this.start + '%';
        this.carret.style.left = 'calc(' + this.start + '% - ' + borderWidthCorrection + 'px)';
        this.bars[0].style.width = this.start + '%';
        this.bars[1].style.width = 100 - this.end + '%';
    }

    prepareData() {
        let $state = this.$state;
        this.start = $state.start * 100;
        this.end = $state.end * 100;
    }

    /**
     * Events
     */
    onSetData() {
        this.prepareData();
        this.render();
    }

    onUpdatePosition() {
        this.prepareData();
        this.render();
    }

    onMousedown(e, x, y) {
        if (!e.path.includes(this.component)) return;
        this.drag = this.drag || 'click';
        this.clickX = x;
        let accuracy = 0.05;
        let $state = this.$state;
        let relAccuracy = ($state.end - $state.start) * accuracy * 2;
        if ($state.start - accuracy <= x && $state.end + accuracy >= x) {
            if ($state.start + relAccuracy >= x) {
                this.drag = 'start';
            } else if ($state.end - relAccuracy <= x) {
                this.drag = 'end';
            } else {
                this.drag = 'shift';
            }
            this.deltaX = x - ($state.end + $state.start) / 2;
        }
        // console.log('this.drag ', this.drag );
    }

    onMouseup(e) {
        if (this.drag === 'click' && e.path.includes(this.component)) {
            // console.log('this.clickX', this.clickX);
            this._scrollMoveAni(this.clickX);
            // this.setAreaPosition(this.clickX);
        }
        this.drag = false;
        this.clickX = false;
    }

    onMousemove(e, x, y) {
        if (!this.drag) {
            return;
        }

        if (this.drag === 'click') {
            this.clickX = x;
        }else if (this.drag === 'shift') {
            this.clickX = x;
            this.setAreaPosition(x - this.deltaX);
            // Utils.throttle(this.setAreaPosition, 50, this, x - this.deltaX);
            // Utils.throttle(this.setAreaPosition(x - this.deltaX);)
        } else if (['start', 'end'].includes(this.drag)) {
            this.setAreaSize(x, this.drag);
        }
    }

    onTouchend(e) {
        this.onMouseup(e);
    }

    onTouchmove(e, x, y) {
        this.onMousemove(e, x, y);
    }

    onTouchstart(e, x, y) {
        this.onMousedown(e, x, y);
    }
}
