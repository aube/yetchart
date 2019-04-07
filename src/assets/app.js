// Charts activation and Day/Night mode toggle
function getLang() {
    if (navigator.languages != undefined) {
        return navigator.languages[0]; 
    } else {
        return navigator.language;
    }
    return getLang.lang;
}

function ts2date(ts, options) {
    options = options || { month: 'short', day: 'numeric' };
    if (typeof ts === 'string') {
        ts;
    }
    let lang = getLang();
    let dt = new Date(ts);
    return dt.toLocaleDateString(lang, options)
}

function ts2dateTooltip(ts) {
    let options = { weekday: 'short', month: 'short', day: 'numeric' };
    return ts2date(ts, options);
}

function toggleNightMode() {
    document.body.classList.toggle('night-mode');


    let daySettings = {
        Graph: {
            elementsTypes: {
                Line: {
                    fillColor: '#fff'
                }
            },
            elements: {
                Grid: {
                    color: '#f2f4f5',
                    activeColor: '#dfe6eb',
                },
                ScaleY: {
                    color: '#96a2aa',
                    shadowColor: '#fff',
                },
                ScaleX: {
                    color: '#96a2aa',
                    shadowColor: '#fff',
                },
                Tooltip: {
                    color: '#222',
                    background: '#fff',
                    shadowColor: '#e3e3e3',
                }
            }
        }
    };

    let nightSettings = {
        Graph: {
            elementsTypes: {
                Line: {
                    fillColor: '#242f3e'
                }
            },
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

    toggleNightMode.night = !toggleNightMode.night;
    activeCharts.forEach(Chart => {
        Chart.options = toggleNightMode.night ? nightSettings : daySettings;
    })
}


let activeCharts = [];

let defaultChartSettings = {
    Graph: {
        elementsTypes: {
            ScaleX: {
                // labelsFormat: ts2date
            },
            Tooltip: {
                // titleFormat: ts2dateTooltip
            }
        }
    },
};

setTimeout(() => {
    getJSON('assets/chart_data.json').then(result => {
        let content = document.querySelector('.content');
        result = [result[0]];
        for (var i = 0; i < result.length; i++) {
            // layout
            let chart = document.createElement('DIV');
            let graphContainer = document.createElement('DIV');
            chart.className = 'chart';
            graphContainer.className = 'graph-container';
            chart.appendChild(graphContainer);
            content.appendChild(chart);

            // chart activation
            defaultChartSettings.element = graphContainer;
            let Chart = new $Chart(defaultChartSettings);
            Chart.data = dataConvertation(result[i]);

            activeCharts.push(Chart);
        }
    });
});


// DATA FETCH & CONVERTATION
function getJSON(path) {
    return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    let data;
                    try {
                        data = JSON.parse(this.responseText);
                    } catch (err) {
                        console.error('getJSON request error', err);
                        reject(err);
                    }
                    resolve(data);
                } else {
                    console.error('getJSON request error', this.status);
                    reject(this.status);
                }
            }
        };
        xhttp.open("GET", path, true);
        xhttp.send();
    });
};

function dataConvertation(rawData) {
    let data = {
        datasets: []
    };
    rawData.columns.forEach(column => {
        let name = column.shift();
        if (name === 'x') {
            data.labels = column.map(v => ts2date(v));
            return;
        }
        // column = column.map(c => Math.random().toFixed(2) * 1); // test
        let elementType = rawData.types[name].charAt(0).toUpperCase() + rawData.types[name].slice(1).toLowerCase();
        let ds = {
            values: column,
            name,
            options: {
                color: rawData.colors[name],
                elementType,
            }
        }

        data.datasets.push(ds);
    });
    return data;
}
