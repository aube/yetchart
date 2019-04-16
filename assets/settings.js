const zoomDataIn = (chart) => {
    if (chart.zoom) return;
    let dt = new Date(chart.$state.currentTS);
    let url = chart._options.dataPath;

    url += dt.getFullYear() + '-'
        + (dt.getMonth() + 1).toString().padStart(2, '0') + '/'
        + dt.getDate().toString().padStart(2, '0') + '.json';

    chart.zoom = true;
    chart._state = chart.$state;
    chart._data = chart.$data;
    
    return getJSON(url)
        .then(dataConvertation)
        .then(data => {
            chart.$state = {
                start: .4,
                end: .6,
                zoom: true,
            };
            chart.data = data;
            chart.callComponents(['onZoomIn']);
        });

}


const zoomDataOut = (chart) => {
    chart.zoom = false;
    chart.$state = chart._state;
    chart.data = chart._data;
}


const zoomPie = (chart) => {
    chart.forceDataElements = chart.$state.zoom ? '' : 'Pie';
    chart.$state.zoom = !chart.$state.zoom;
    chart.update();
}

const labelsFormat = (ts, time) => {
    return time ? ts2time(ts) : ts2date(ts);
}
const titleFormat = (ts, time) => {
    return time ? ts2time(ts) : ts2date(ts);
}


const chart1 = {
    default: {
        dataPath: 'assets/data/1/',
        zoomIn: zoomDataIn,
        zoomOut: zoomDataOut,
        Graph: {
            elements: {
                ScaleX: {
                    labelsFormat,
                    offset: {
                        bottom: -20
                    }
                },
            },
            destroyAni: {
                type: 'fade',
                duration: 1000
            }
        },
        Header: {
            title: 'Followers',
            labelsFormat,
        },
        Tooltip: {
            titleFormat,
        },
    },
    day: {
        Graph: {
            elementsTypes: {
                Line: {
                    fillColor: '#fff'
                }
            },
            elements: {
                Grid: {
                    color: '#182D3B19',
                    activeColor: '#dfe6eb',
                },
                ScaleY: {
                    color: '#8E8E93',
                },
                ScaleX: {
                    color: '#8E8E93',
                },
                Tooltip: {
                    color: '#222',
                    background: '#fff',
                }
            }
        },
    },
    night: {
        Graph: {
            elementsTypes: {
                Line: {
                    fillColor: '#242f3e'
                }
            },
            elements: {
                Grid: {
                    color: '#ffffff19',
                    activeColor: '#3b4a5a',
                },
                ScaleY: {
                    color: '#A3B1C23C',
                },
                ScaleX: {
                    color: '#A3B1C23C',
                },
                Tooltip: {
                    color: '#fff',
                    background: '#253241',
                }
            }
        },
    },
};


const chart2 = {
    default: {
        dataPath: 'assets/data/2/',
        zoomIn: zoomDataIn,
        zoomOut: zoomDataOut,
        Graph: {
            elements: {
                ScaleX: {
                    labelsFormat,
                    offset: {
                        bottom: -20
                    }
                },
            }
        },
        Header: {
            title: 'Interactions',
            labelsFormat,
        },
        Tooltip: {
            titleFormat,
        },
    },
    day: {
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
                    color: '#8E8E93',
                },
                ScaleX: {
                    color: '#8E8E93',
                },
                Tooltip: {
                    color: '#222',
                    background: '#fff',
                }
            }
        }
    },
    night: {
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
                    color: '#A3B1C23C',
                },
                ScaleX: {
                    color: '#A3B1C23C',
                },
                Tooltip: {
                    color: '#fff',
                    background: '#253241',
                }
            }
        }
    },
};


const chart3 = {
    default: {
        dataPath: 'assets/data/3/',
        zoomIn: zoomDataIn,
        zoomOut: zoomDataOut,
        Graph: {
            elements: {
                ScaleX: {
                    labelsFormat,
                    offset: {
                        bottom: -20
                    }
                },
            }
        },
        Header: {
            title: 'Growth',
            labelsFormat,
        },
        Tooltip: {
            titleFormat,
        },
    },
    day: {
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
                    color: '#8E8E93',
                },
                ScaleX: {
                    color: '#8E8E93',
                },
                Tooltip: {
                    color: '#222',
                    background: '#fff',
                }
            }
        }
    },
    night: {
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
                    color: '#A3B1C23C',
                },
                ScaleX: {
                    color: '#A3B1C23C',
                },
                Tooltip: {
                    color: '#fff',
                    background: '#253241',
                }
            }
        }
    },
};


const chart4 = {
    default: {
        dataPath: 'assets/data/4/',
        zoomIn: zoomDataIn,
        zoomOut: zoomDataOut,
        Graph: {
            scaleYStartsFromZero: true,
            destroyAni: 300,
            elements: {
                ScaleX: {
                    labelsFormat,
                    offset: {
                        bottom: -20
                    }
                },
            }
        },
        Header: {
            title: 'Messages',
            labelsFormat,
        },
        Tooltip: {
            titleFormat,
        },
        Map: {
            destroyAni: 300
        },
        Legend: {
            destroyAni: 3001
        }
    },
    day: {
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
                    color: '#25252932',
                },
                ScaleX: {
                    color: '#25252932',
                },
                Tooltip: {
                    color: '#222',
                    background: '#fff',
                }
            }
        }
    },
    night: {
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
                },
                ScaleX: {
                    color: '#546778',
                },
                Tooltip: {
                    color: '#fff',
                    background: '#253241',
                }
            }
        }
    },
}


const chart5 = {
    default: {
        dataPath: 'assets/data/5/',
        zoomIn: zoomPie,
        zoomOut: zoomPie,
        Graph: {
            elements: {
                ScaleX: {
                    labelsFormat,
                    offset: {
                        bottom: -20
                    }
                },
            },
            destroyAni: {
                type: 'fade',
                duration: 1000
            }
        },
        Header: {
            title: 'Apps',
            labelsFormat,
        },
        Tooltip: {
            titleFormat,
        },
    },

    day: {
        Graph: {
            elementsTypes: {
                Line: {
                    fillColor: '#fff'
                }
            },
            elements: {
                Grid: false,
                ScaleY: {
                    color: '#25252932',
                },
                ScaleX: {
                    color: '#25252932',
                },
            }
        }
    },
    night: {
        Graph: {
            elementsTypes: {
                Line: {
                    fillColor: '#242f3e'
                }
            },
            elements: {
                Grid: false,
                ScaleY: {
                    color: '#ECF2F832',
                },
                ScaleX: {
                    color: '#A3B1C23C',
                },
            }
        }
    },
};



const settings = [
    chart1,
    chart2,
    chart3,
    chart4,
    chart5,
];