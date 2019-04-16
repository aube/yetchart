export default {
    default: {
        visibleArea: '20%',
        areaStartPositionAtLast: true,
        Graph: {
            style: {
                width: '100%',
                height: '80%',
                top: '10%',
                left: '0',
            },
            offset: {
                top: 10,
                left: 15,
                right: 15,
                bottom: 100,
            },
            background: 'transparent',
            elementsTypes: {
                Line: {
                    elementType: 'Line',
                    width: 5,
                    fillColor: '#fff',
                    zindex: 0,
                    offset: {
                        left: 20,
                        right: 20,
                    }
                },
                Area: {
                    elementType: 'Area',
                    width: 5,
                    fillColor: '#fff',
                    zindex: 0,
                    offset: {
                        left: 20,
                        right: 20,
                    }
                },
                Bar: {
                    elementType: 'Bar',
                    width: 5,
                    fillColor: '#fff',
                    zindex: 0,
                    offset: {
                        left: 20,
                        right: 20,
                    }
                },
                Pie: {
                    elementType: 'Pie',
                    fillColor: '#fff',
                    zindex: 0,
                },
            },
            elements: {
                Grid: {
                    elementType: 'Grid',
                    vertical: 0,
                    horizontal: 5,
                    width: 2,
                    color: '#f2f4f5',
                    activeColor: '#dfe6eb',
                    zindex: -1,
                    offset: {
                        left: 20,
                        right: 20,
                    }
                }, 
                ScaleY: {
                    elementType: 'ScaleY',
                    labelsAmount: 5,
                    color: '#96a2aa',
                    fontsize: 16,
                    fontname: 'Arial',
                    baseline: 'bottom',
                    zindex: 1,
                    offset: {
                        left: 20,
                        right: 20,
                    }
                },
                ScaleX: {
                    elementType: 'ScaleX',
                    color: '#96a2aa',
                    fontsize: 16,
                    fontname: 'Arial',
                    baseline: 'top',
                    align: 'center',
                    zindex: 1,
                    offset: {
                        bottom: 80,
                        left: 60,
                        right: 160,
                    }
                },
            },
        },
        Map: {
            style: {
                width: '92%',
                height: '10%',
                top: '90%',
                left: '4%',
                background: 'transparent',
            },
            offset: {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            },
            elementsTypes: {
                Line: {
                    elementType: 'Line',
                    width: 3,
                    join: 'round',
                    color: 'tomato',
                },
                Area: {
                    elementType: 'Area',
                    width: 3,
                    join: 'round',
                    color: 'tomato',
                },
                Bar: {
                    elementType: 'Bar',
                    width: 3,
                    join: 'round',
                    color: 'tomato',
                },
                Pie: {
                    elementType: 'Pie',
                    fillColor: '#fff',
                    zindex: 0,
                },
            },
        },
        Scroll: {
            type: 'html',
            style: {
                width: '92%',
                height: '10%',
                top: '90%',
                left: '4%',
                background: 'transparent',
            },
            template: `
            <div class="chart-scroll">
                <div class="chart-scroll-bar"></div>
                <div class="chart-scroll-bar chart-scroll-bar-right"></div>
                <div class="chart-scroll-carret"></div>
            </div>`,
        },
        Legend: {
            type: 'html',
            style: {
                width: '92%',
                marginLeft: '4%',
                position: 'relative',
            },
            outside: true,
            itemTemplate: `
            <div class="chart-legend-item" style="--active-color: %COLOR%;">
                <i class="icon"></i>
                <span class="text">%TEXT%</span>
            </div>
            `,
            attrs: {
                class: 'chart-legend',
            },
        },
        Header: {
            style: {
                width: '94%',
                height: '10%',
                top: '0',
                left: '20px',
            },
            type: 'html',
            template: `
            <div class="chart-header">
                <div class="chart-header-title">title</div>
                <div class="chart-header-state">Zoom Out</div>
                <div class="chart-header-descript">descript</div>
            </div>`,
        },
        Tooltip: {
            style: {
                top: '1%',
            },
            type: 'html',
            template: `
            <div class="chart-tooltip">
                <h3 class="chart-tooltip-title">%TITLE%</h3>
                %ITEMS%
            </div>`,
            itemTemplate: `
            <div class="chart-tooltip-item" style="--active-color: %COLOR%;">
                <p class="chart-tooltip-item-name">%NAME%</p>
                <p class="chart-tooltip-item-value">%VALUE%</p>
            </div>
            `,
        }
    }
}