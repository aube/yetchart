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
                    width: 2,
                    activePointRadius: 5,
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
                    width: 1,
                    color: '#f2f4f5',
                    color: '#333333',
                    activeColor: '#dfe6eb',
                    activeColor: '#333333',
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
                    fontsize: 12,
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
                    fontsize: 12,
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
                    width: 1,
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
                <div class="scrollbar">
                    <div class="scrollbar__left"></div>
                    <div class="scrollbar__carret">
                        <div class="scrollbar__left-handle"></div>
                        <div class="scrollbar__right-handle"></div>
                    </div>
                    <div class="scrollbar__right"></div>
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
