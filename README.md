#Layout
##HTML
```html
<div class="chart">
    <div class="graph-container">
    </div>
</div>
```
##CSS
```CSS
.graph-container {
    height: 300px;
}
```

#Initialization
##By selector
```javascript
var Chart = new Chart({
    element: '.graph-container',
});
Chart.data = dataStructure;
```
##Inside container
```html
<div class="chart">
    <div class="graph-container">
        <script>
            var Chart = new Chart();
            Chart.data = dataStructure;
        </script>
    </div>
</div>
```
##Initialisation with data extra formatting
```javascript
function labelNewFormat(label) {
    return label.toLowerCase();
}
function titleExtraFormat(title) {
    return 'Title: ' + title.toLowerCase();
}

let chartOptions = {
    Graph: {
        elementsTypes: {
            ScaleX: {
                labelsFormat: labelNewFormat
            },
            Tooltip: {
                titleFormat: titleExtraFormat
            }
        }
    },
};

var Chart = new Chart({
    element: '.graph-container',
    ...chartOptions
});
```

#Options
All configuration settings are set in the JSON structure:
```javascript
{
    {...base parameters}
    "ComponentName": {
        {...Component parameters}
        elementsTypes: {
            "ElementType": {...base elements parameters}
        },
        elements: {
            "ElementName": {...element parameters}
        }
    }
}
```

#Data format for Line chart
```javascript
    let data = {
        datasets: [{
            data: [Number],
            options: {
                name: 'Dataset 1',
                color: '#333444',
                elementType: 'Line',
            }
        }, {
            data: [Number],
            options: {
                name: 'Dataset 2',
                color: 'green',
                elementType: 'Line',
            }
        }],
        labels: [Number|String]
    };
```


#Data & Options update
```javascript
    // Set new data:
    Chart.data = newFullDataStructure; # All chart elements will be recreated

    // Changing chart parameters:
    Chart.options = partialOptionsStructure; # All chart elements will be rerendered
```

##Chart options update example
```javascript
    let nightSettings = {
        Graph: {
            elements: {
                Grid: {
                    color: '#293544',
                    activeColor: '#3b4a5a',
                },
                ScaleY: {
                    color: '#546778',
                    shadowColor: 'black',
                },
                ScaleX: {
                    color: '#546778',
                    shadowColor: 'black',
                },
                Tooltip: {
                    color: '#fff',
                    background: '#253241',
                    shadowColor: '#202a37',
                }
            }
        }
    };
    Chart.options = nightSettings; // On-fly colors changing
```


#Live chart examples
> <a href='https://aube.github.io/yetchart/'>https://aube.github.io/yetchart</a>



#Full configuration example:
```javascript
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
                    fontsizeValue: 16,
                    fontsizeName: 12,
                    fontsizeTitle: 14,
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
    }
```
