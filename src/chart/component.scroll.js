
import { abstractComponent } from './component.js';
import Utils from './utils.js';
import  './scroll.scss';

export class Scroll extends abstractComponent {

    constructor(chart, options) {
        super(chart, options);
        this.name = 'Scroll';

        this.component.innerHTML = options.template;
        this.bars = this.component.getElementsByClassName('chart-scroll-bar');
        this.carret = this.component.querySelector('.chart-scroll-carret');
        this.scroll = this.component.querySelector('.chart-scroll');

        let _e = (e, el) => {
            e = Utils.getEventXY(e, this.component);
            return {x: e.x / this.width, y: e.y / this.height};
        }

        this.scroll.addEventListener('mouseup', (e) => {
            e = _e(e);
            this.mouseup(e.x, e.y);
        });
        this.scroll.addEventListener('touchend', (e) => {
            this.mouseup();
        });
        this.scroll.addEventListener('mousemove', (e) => {
            e = _e(e);
            this.mousemove(e.x, e.y);
        });
        this.scroll.addEventListener('touchmove', (e) => {
            e = _e(e);
            this.mousemove(e.x, e.y);
        });
        this.scroll.addEventListener('mousedown', (e) => {
            e = _e(e);
            this.mousedown(e.x, e.y, 0.05);
        });
        this.scroll.addEventListener('touchstart', (e) => {
            e = _e(e);
            this.mousedown(e.x, e.y, 0.05);
        });
        this.scroll.addEventListener('mouseleave', (e) => {
            this.drag = false;
        });
    }

    _scrollMoveAni(x) {
        let current = (this.start + this.end) / 200;
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
        let currentState = this.getCurrentState();
        this.start = currentState.start * 100;
        this.end = currentState.end * 100;
    }
    onUpdatePosition() {
        this.prepareData();
        this.render();
    }





    /**
     * Drag'n'Drop
     */
    mousedown(x, y, accuracy) {
        this.startX = x;
        let currentState = this.getCurrentState();
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

    mouseup(x, y) {
        this.startX = null;
        if (!this.drag && x) {
            this._scrollMoveAni(x);
        }
        setTimeout(() => {
            this.drag = false;
        });
    }

    mouseleave(x, y) {
        this.drag = false;
    }

    mousemove(x, y) {
        if (!this.drag) {
            return;
        }

        if (this.drag) {

            if (this._aniStop) {
                this._aniStop();
            }
            if (this.drag === 'shift') {
                // Utils.throttle(this.setAreaPosition, 10, this, x - this.deltaX);
                this.setAreaPosition(x - this.deltaX);
            } else {
                // Utils.throttle(this.setAreaSize, 20, this, x, this.drag);
                this.setAreaSize(x, this.drag);
            }
            this.prevX = x;
        }
    }


}
