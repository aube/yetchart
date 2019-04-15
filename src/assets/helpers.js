// toLocaleDateString works very slow :(
// function getLang() {
//     if (navigator.languages != undefined) {
//         return navigator.languages[0]; 
//     } else {
//         return navigator.language;
//     }
//     return getLang.lang;
// }

// function ts2date(ts, options) {
//     let dt = new Date(ts);
//     let lang = getLang();

//     options = options || { month: 'short', day: 'numeric' };
//     return dt.toLocaleDateString(lang, options)
// }


const en_months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const en_days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function ts2date(ts) {
    let dt = new Date(ts);
    return en_months[dt.getMonth()] + ' ' + dt.getDate();
}

function ts2dateTooltip(ts) {
    let dt = new Date(ts);
    return en_days[date.getDay()] + ', ' + en_months[dt.getMonth()] + ' ' + dt.getDate();
}

function ts2time(ts) {
    let dt = new Date(ts);
    return ('0' + dt.getHours()).substr(-2) + ':' + ('0' + dt.getMinutes()).substr(-2);
}



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
        datasets: [],
        percentage: rawData.percentage,
        stacked: rawData.stacked,
    };

    rawData.columns.forEach(column => {
        let id = column.shift();
        if (id === 'x') {
            data.labels = column;
            // data.labels = column.map(v => ts2date(v));
            return;
        }
        // column = column.map(c => Math.random().toFixed(2) * 1); // test
        let type = rawData.types[id];
        type = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
        // type = 'Pie';
        let ds = {
            values: column,
            name: rawData.names[id],
            options: {
                color: rawData.colors[id],
                elementType: type,
            }
        }

        data.datasets.push(ds);
    });
    return data;
}

function toggleNightMode() {
    document.body.classList.toggle('night-mode');
    toggleNightMode.night = !toggleNightMode.night;

    for (let i = 0; i < activeCharts.length; i++) {
        activeCharts[i].options = toggleNightMode.night ? settings[i].night : settings[i].day;
    }
}

function objMerge(base, obj) {
    Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'object') {
            base[key] = base[key] || {};
            objMerge(base[key], obj[key]);
        } else {
            Object.assign(base, {[key]: obj[key]});
        }
    });
};
