
import Utils from './utils.js';

export class abstractElement {
    constructor(canvas, options) {
        this.options = options;
        this.canvas = canvas;
    }

    updateOptions(options) {
        this.options = Utils.objMerge(this.options, options, true);
        // console.log('this', this.elementType);
    }

    init() {
        this.width = parseInt(+this.canvas.getAttribute('width'));
        this.height = parseInt(+this.canvas.getAttribute('height'));
        this.pixelRatio = parseInt(+this.canvas.getAttribute('ratio'));

        this.top = this.options.padding && this.options.padding.top || 0;
        this.bottom = this.options.padding && this.options.padding.bottom || 0;
        this.left = this.options.padding && this.options.padding.left || 0;
        this.right = this.options.padding && this.options.padding.right || 0;

        this.width -= this.left + this.right;
        this.height -=  this.top + this.bottom;
    }
}

// export class Line extends abstractElement {
//     constructor(canvas, options) {
//         super(canvas, options);
//         // if (data) {
//         //     let ds =  data.datasets.find(ds => ds.name === options.name);
//         //     this.data = ds.data;
//         //     this.firstOutside = ds.firstOutside;
//         //     this.lastOutside = ds.lastOutside;
//         // }
//         // this.min = data.min;
//         // this.max = data.max;
//     }

//     draw() {
//         if (!this.dataset) return;
//         this.firstOutside = this.dataset.firstOutside;
//         this.lastOutside = this.dataset.lastOutside;
//         this.min = this.dataset.min;
//         this.max = this.dataset.max;
//         this.data = this.dataset.data;

//         this.init();

//         let _posY = (value) => {
//             return this.height + this.top - (+value - this.min) * rate;
//         };

//         let _posX = (point) => {
//             return (point - firstOutside) * pointWidth  + pointWidth/2 + this.left;
//         };
//         // console.log('', this.max, rate);
//         let rate = this.height / Math.abs(this.max - this.min) || 1;
//         let firstOutside = this.firstOutside ? 1 : 0;
//         let lastOutside = this.lastOutside ? 1 : 0;
//         let length = this.data.length || 1;
//         let pointWidth = this.width / (length - firstOutside - lastOutside);
//         let ctx = this.canvas.getContext("2d");
//         let y, x;

//         // ctx.translate(0.5, 0.5);

//         ctx.beginPath();
//         ctx.lineWidth = this.options.width;
//         ctx.lineJoin = this.options.join;
//         ctx.strokeStyle = this.options.color;

//         y = _posY(this.data[0]);
//         x = _posX(0);
//         ctx.moveTo(x, y);
//         for (let i = 1; i < length; i++) {
//             y = _posY(this.data[i]);
//             x = _posX(i);
//             ctx.lineTo(x, y);
//         }
//         ctx.stroke();
//     }
// }

// export class Grid extends abstractElement {
//     constructor(canvas, options, data) {
//         super(canvas, options, data);
//         // this.min = options.min;
//         // this.max = options.max;
//         // if (data) {
//         //     this.min = data.min;
//         //     this.max = data.max;
//         // }
//     }

//     _drawVertical() {

//         let _posX = (point) => {
//             return point * cellWidth  + this.left;
//         };

//         let ctx = this.canvas.getContext("2d");
//         let cellWidth = this.width / (this.options.vertical - 1);

//         ctx.beginPath();
//         ctx.lineWidth = this.options.width;
//         ctx.strokeStyle = this.options.color;
//         for (let i = 0, ii = this.options.vertical; i < ii; i++) {
//             ctx.moveTo(_posX(i), this.top);
//             ctx.lineTo(_posX(i), this.top + this.height);
//         }

//         ctx.stroke();
//     }

//     _drawHorizontal() {

//         let _posY = (point) => {
//             return point * cellHeidht  + this.top;
//         };

//         let ctx = this.canvas.getContext("2d");
//         let cellHeidht = this.height / (this.options.horizontal);

//         ctx.beginPath();
//         ctx.lineWidth = this.options.width;
//         ctx.strokeStyle = this.options.color;
//         for (let i = 1, ii = this.options.horizontal; i <= ii; i++) {
//             ctx.moveTo(this.left, _posY(i));
//             ctx.lineTo(this.left + this.width, _posY(i));
//         }

//         ctx.stroke();
//     }

//     draw() {
//         // console.log('GGG', this.data);
//         // if (!this.data) return;
//         this.init();
//         if (this.options.vertical) {
//             this._drawVertical();
//         }
//         if (this.options.horizontal) {
//             this._drawHorizontal();
//         }
//     }
// }


// export class ScaleY extends abstractElement {
//     constructor(canvas, options, data) {
//         super(canvas, options);
//         // if (data) {
//         //     this.min = data.min;
//         //     this.max = data.max;
//         // }
//     }

//     draw() {

//         if (!this.data) return;
//         // console.log('this.data', this.data);
//         // this.firstOutside = this.data.firstOutside;
//         // this.lastOutside = this.data.lastOutside;
//         // this.min = this.data.min;
//         // this.max = this.data.max;
//         // if (!this.data) return;
//         this.init();
//         let _posY = (point) => {
//             return point * cellHeidht  + this.top;
//         };

//         let ctx = this.canvas.getContext("2d");
//         let cellHeidht = this.height / (this.options.amount);
//         let step = ((this.max - this.min) / (this.options.amount));
        
//         ctx.beginPath();
//         ctx.textAlign = 'left';
//         ctx.textBaseline = this.options.baseline;
//         ctx.font = this.options.fontsize * this.pixelRatio + 'px ' + this.options.fontname;
//         ctx.fillStyle = this.options.color;
//         for (let i = 1, ii = this.options.amount ; i <= ii; i++) {
//             // ctx.moveTo(this.left, _posY(i));
//             // ctx.textBaseline = i ? 'bottom' : 'top'; // test
//             ctx.fillText(this.max - (step * i), this.left, _posY(i));
//         }

//         ctx.stroke();
//     }
// }




// export class ScaleX extends abstractElement {
//     constructor(canvas, options) {
//         super(canvas, options);
//         // if (data && data.labels) {
//         //     this.labels = data.labels;
//         // this.labels = options.labelsFormat ? data.labels.map(options.labelsFormat) : data.labels;
//         // this.min = data.min;
//         // this.max = data.max;
//         // }
//         // console.log('this.labels', this.labels);
//     }

//     draw() {
//         if (!this.data) return;
//         // console.log('this.data', this.data);
//         // this.firstOutside = this.data.firstOutside;
//         // this.lastOutside = this.data.lastOutside;
//         // this.min = this.data.min;
//         this.labels = this.data.labels;


//         // if (!this.data) return;
//         this.init();
//         let _posX = point => {
//             return point * cellWidth  + this.left;
//         };

//         let _txt = n => {
//             let label = this.labels[n];
//             label = this.options.labelsFormat ? this.options.labelsFormat(label) : label;
//             return label;
//         };

//         let amount = this.labels.length;
//         let ctx = this.canvas.getContext("2d");
//         let cellWidth = this.width / (amount);
//         let step = ((this.max - this.min) / (amount));
//         let labelWidth = ctx.measureText(_txt(0)).width * 1.2;
//         let minX = labelWidth;
//         let posY = this.top + this.height + this.options.margin.top;
        
//         ctx.beginPath();
//         ctx.textBaseline = this.options.baseline;
//         ctx.fillStyle = this.options.color;
//         ctx.font = this.options.fontsize * this.pixelRatio + 'px ' + this.options.fontname;

//         // first
//         ctx.textAlign = 'left';
//         ctx.fillText(_txt(0), _posX(0), posY);

//         // last
//         ctx.textAlign = 'right';
//         ctx.fillText(_txt(amount - 1), this.width, posY);

//         ctx.textAlign = this.options.align;
//         for (let i = 0, ii = amount - 1; i < ii; i++) {
//             let x = _posX(i);
//             if (x >= minX) {
//                 let txt = _txt(i);
//                 minX = labelWidth + x;
//                 if (minX < this.width && x - labelWidth / 2 > 0) {
//                     ctx.fillText(txt, x, posY);
//                 }
//             }
//         }

//         ctx.stroke();
//     }
// }

// export class ScrollRects extends abstractElement {
//     constructor(canvas, options) {
//         super(canvas, options);
//         // this.data = data;
//         // if (data) {
//         //     this.labels = data.labels;
//         //     this.min = data.min;
//         //     this.max = data.max;
//         // }
//         // console.log('this.options.padding', this.options.padding);
//     }

//     draw() {
//         if (!this.data) return;

//         this.init();

//         let _posX = (proportion) => {
//             return this.width * proportion + this.left;
//         };

//         let _posY = (proportion) => {
//             return this.height * proportion  + this.top;
//         };
        
//         // this.visibleAreaCoords = [];


//         let ctx = this.canvas.getContext("2d");

//         this.data.forEach(rect => {
//             ctx.fillStyle = rect.background;
//             ctx.fillRect(
//                 _posX(rect.x0),
//                 _posY(rect.y0),
//                 _posX(rect.width),
//                 _posY(rect.height)
//             );

//             if (rect.borderWidth && rect.borderColor) {
//                 let width = (rect.borderWidth || 0) * this.pixelRatio;

//                 ctx.strokeStyle = rect.borderColor;
//                 ctx.lineWidth = width;
//                 ctx.strokeRect(
//                     _posX(rect.x0),
//                     _posY(rect.y0),
//                     _posX(rect.width),
//                     _posY(rect.height)
//                 );
//                 // this.visibleAreaCoords = [_posX(rect.x0), _posY(rect.y0), _posX(rect.width), _posY(rect.height)];

//                 ctx.fillStyle = rect.borderColor;
//                 ctx.fillRect(
//                     _posX(rect.x0),
//                     _posY(rect.y0),
//                     (width * 2),
//                     _posY(rect.height)
//                 );

//                 ctx.fillRect(
//                     _posX(rect.x0 + rect.width) - width * 2,
//                     _posY(rect.y0),
//                     (width * 2),
//                     _posY(rect.height)
//                 );
//             }
//         });
//     }
// }

