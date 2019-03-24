export default {
    default: {
        visibleArea: '20%',
        areaStartPositionAtLast: true,
        Graph: {
            width: '100%',
            height: '90%',
            top: '0',
            left: '0',
            padding: {
                top: 10,
                left: 0,
                right: 0,
                bottom: 100,
            },
            background: 'transparent',
            elementsTypes: {
                Line: {
                    elementType: 'Line',
                    width: 5,
                    join: 'round',
                    fillColor: '#fff',
                    zindex: 0,
                }
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
                }, 
                ScaleY: {
                    elementType: 'ScaleY',
                    labelsAmount: 5,
                    color: '#96a2aa',
                    shadowColor: '#fff',
                    shadowBlur: 15,
                    fontsize: 16,
                    fontname: 'Arial',
                    baseline: 'bottom',
                    zindex: 1,
                },
                ScaleX: {
                    elementType: 'ScaleX',
                    color: '#96a2aa',
                    shadowColor: '#fff',
                    shadowBlur: 15,
                    fontsize: 16,
                    fontname: 'Arial',
                    baseline: 'top',
                    align: 'center',
                    zindex: 1,
                    margin: {
                        top: 20
                    }
                },
                Tooltip: {
                    elementType: 'Tooltip',
                    background: '#fff',
                    color: '#222',
                    shadowColor: '#e3e3e3',
                    shadowBlur: 15,
                    fontsizeValue: 14,
                    fontsizeName: 10,
                    fontsizeTitle: 12,
                    fontname: 'Arial',
                    zindex: 2,
                },
            },
        },
        Map: {
            width: '100%',
            height: '10%',
            top: '90%',
            left: '0',
            background: 'transparent',
            elementsTypes: {
                Line: {
                    elementType: 'Line',
                    width: 3,
                    join: 'round',
                    color: 'tomato',
                }
            },
        },
        Scroll: {
            type: 'html',
            inheritOptions: 'Map',
            template: `
            <div class="chart-scroll">
                <div class="chart-scroll-bar"></div>
                <div class="chart-scroll-carret"></div>
                <div class="chart-scroll-bar"></div>
            </div>`,
        },
        Legend: {
            type: 'html',
            outside: true,
            itemTemplate: `
            <div class="chart-legend-item">
                <i class="icon" style="background-color: %COLOR%"></i>
                <span>%TEXT%</span>
            </div>
            `,
            attrs: {
                class: 'chart-legend',
            },
        },
        // Tooltip: {
        //     type: 'html',
        //     titleTemplate: `<h3 class="chart-tooltip-title">%TITLE%</h3>`,
        //     itemTemplate: `
        //     <div class="chart-tooltip-item" style="color: %COLOR%">
        //         <p class="chart-tooltip-item-value">%VALUE%</p>
        //         <p class="chart-tooltip-item-name">%NAME%</p>
        //     </div>
        //     `,
        //     attrs: {
        //         class: 'chart-tooltip',
        //     },
        // }
    }
}