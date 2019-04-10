
import { abstractElement } from './element.js';


export class Tooltip extends abstractElement {
    constructor(params) {
        super(params);
    }

    draw() {
        if (!this.$state.activeData) return;

        let _columnsSumWidth = (columnNumber) => {
            let x = 0;
            while(columnNumber-- >= 0) {
                x += columns[columnNumber] || 0;
            }
            return x;
        }
        let _posX = i => {
            let column = i % columns.length;
            let x = this.left + rectX;
            x += _columnsSumWidth(column);
            x += padding * column + padding;
            return x;
        }
        let _rowsSumHeight = rows => {
            return (heightValue + heightName) * 1.5 * rows;
        }

        let _posY = i => {
            let row = Math.floor(i / columns.length);
            let y = this.top + _rowsSumHeight(row);
            y += padding * row;
            y += rectY;
            y += titleHeight + padding * 4;
            return y;
        }

        let _font = name => {
            return options[name] * pixelRatio + 'pt ' + options.fontname;
        }

        // this.init();

        let options = this.options;
        let pixelRatio = this.pixelRatio;
        let padding = 20;
        let cursorX = this.width * this.$state.activeX;
        let cursorY = this.height * this.$state.activeY;

        let content = this.$state.activeData.content;
        let title = this.$state.activeData.title;
        let columns = Array(Math.ceil(Math.sqrt(content.length)));
        let rows = Math.ceil(content.length / columns.length);
        let ctx = this.ctx;

        columns.fill(0);
        ctx.beginPath();

        title = options.titleFormat ? options.titleFormat(title) : title;

        ctx.font = 'bold ' + _font('fontsizeValue');
        let titleHeight = options.fontsizeTitle * pixelRatio;
        let titleWidth = ctx.measureText(title).width;

        ctx.font = 'bold ' + _font('fontsizeValue');
        let heightValue = options.fontsizeValue * pixelRatio;
        
        ctx.font = _font('fontsizeName');
        let heightName = options.fontsizeName * pixelRatio;

        // columns width calculate
        for (let i = 0; i < content.length; i += columns.length) {
            for (let ii = 0; ii < columns.length; ii++) {
                let value = content[i + ii].value;
                let name = content[i + ii].name;

                ctx.font = _font('fontsizeValue');
                columns[ii] = Math.max(columns[ii], ctx.measureText(value).width);
                
                ctx.font = _font('fontsizeName');
                columns[ii] = Math.max(columns[ii], ctx.measureText(name).width);

                columns[ii] = +columns[ii].toFixed(2);
            }
        }

        ctx.textBaseline = 'middle';
        ctx.textAlign = 'left';

        // rectangle
        let width = Math.max(titleWidth + padding * 2, _columnsSumWidth(columns.length) + padding * (1 + columns.length));
        let height = _rowsSumHeight(rows) + padding * (1 + rows) + titleHeight + padding * 2;

        let rectX = cursorX;
        rectX = Math.min(rectX, cursorX - width * 1.2);
        rectX = rectX < 0 ? cursorX + padding * 4 : rectX;

        let rectY = Math.max(cursorY - height, 0 + padding);

        ctx.strokeStyle = options.bordercolor;
        ctx.lineJoin = 'round';
        ctx.lineWidth = options.width;
        ctx.strokeRect(rectX, rectY, width, height);

        ctx.fillStyle = options.background;
        ctx.fillRect(rectX, rectY, width, height);

        ctx.fillStyle = options.color;
        ctx.font = 'bold ' + _font('fontsizeTitle');
        ctx.fillText(title, rectX + padding, rectY + padding * 2);

        for (let i = 0; i < content.length; i++) {
            let x = _posX(i);
            let y = _posY(i);

            ctx.fillStyle = content[i].color;

            ctx.font = 'bold ' + _font('fontsizeValue');
            ctx.fillText(content[i].value, x, y);
            ctx.font = _font('fontsizeName');
            ctx.fillText(content[i].name, x, y + heightValue + padding / 2);
        }

        ctx.stroke();
    }
}
