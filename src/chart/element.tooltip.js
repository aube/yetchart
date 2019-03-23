
import { abstractElement } from './element.js';


export class Tooltip extends abstractElement {
    constructor(canvas, options) {
        super(canvas, options);

        // this.container = this.canvas.parentNode;
        // this.templateTitle = '<h3>%TITLE%</h3>';
        // this.templateItem = '<div><p>%VALUE%</p><p>%NAME%</p></div>';
    }

    prepareTemplate() {

    }


    draw() {
        if (!this.activeData || !this.activeData.title) return;


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
            y += padding * row + padding;
            y += rectY;
            y += titleHeight + padding * 3;
            return y;
        }

        let _font = name => {
            return this.options[name] * pixelRatio + 'pt ' + this.options.fontname;
        }

        this.init();
        
        let pixelRatio = this.pixelRatio;
        let padding = 20;
        let cursorX = this.width * this.activeX;
        let cursorY = this.height * this.activeY;

        let content = this.activeData.content;
        let title = this.activeData.title;
        let columns = Array(Math.ceil(Math.sqrt(content.length)));
        let rows = Math.ceil(content.length / columns.length);
        let ctx = this.canvas.getContext("2d");

        columns.fill(0);
        ctx.beginPath();

        title = this.options.titleFormat ? this.options.titleFormat(title) : title;

        ctx.font = 'bold ' + _font('fontsizeValue');
        let titleHeight = this.options.fontsizeTitle * pixelRatio;
        let titleWidth = ctx.measureText(title).width;

        ctx.font = 'bold ' + _font('fontsizeValue');
        let heightValue = this.options.fontsizeValue * pixelRatio;
        
        ctx.font = _font('fontsizeName');
        let heightName = this.options.fontsizeName * pixelRatio;

        // columns width calculate
        for (var i = 0; i < content.length; i += columns.length) {
            for (var ii = 0; ii < columns.length; ii++) {
                let value = content[i + ii].value;
                let name = content[i + ii].name;

                ctx.font = _font('fontsizeValue');
                let width0 = ctx.measureText(value).width;
                
                ctx.font = _font('fontsizeName');
                let width1 = ctx.measureText(name).width;

                columns[ii] = Math.max(columns[ii], width0, width1);
                columns[ii] = +columns[ii].toFixed(2);
            }
        }

        ctx.textBaseline = 'middle';


        // rectangle
        let width = Math.max(titleWidth + padding * 2, _columnsSumWidth(columns.length) + padding * (1 + columns.length));
        let height = _rowsSumHeight(rows) + padding * (1 + rows) + titleHeight + padding * 2;


        let rectX = cursorX;
        rectX = Math.min(rectX, cursorX - width * 1.2);
        rectX = rectX < 0 ? cursorX + width * .2 : rectX;

        let rectY = cursorY < height + padding ? cursorY + padding : padding;

        ctx.strokeStyle = this.options.background;
        ctx.lineJoin = 'round';
        ctx.lineWidth = 15;
        ctx.strokeRect(rectX, rectY, width, height);

        ctx.shadowColor = this.options.shadowColor || '';
        ctx.shadowBlur = this.options.shadowBlur || 0;

        ctx.fillStyle = this.options.background;
        ctx.fillRect(rectX, rectY, width, height);

        // content
        ctx.textAlign = 'left';


        ctx.fillStyle = this.options.color;
        ctx.font = 'bold ' + _font('fontsizeTitle');
        ctx.fillText(title, rectX + padding, rectY + padding * 2);

        for (var i = 0; i < content.length; i++) {
            let x = _posX(i);
            let y = _posY(i);

            ctx.fillStyle = content[i].color;

            ctx.shadowColor = '';
            ctx.shadowBlur = 0;
            
            ctx.font = 'bold ' + _font('fontsizeValue');
            ctx.fillText(content[i].value, x, y);
            ctx.font = _font('fontsizeName');
            ctx.fillText(content[i].name, x, y + heightValue + padding / 2);
        }

        ctx.stroke();
    }
}
