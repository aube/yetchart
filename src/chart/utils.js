const Utils = {

    copyObj: function (o) {
        if (!o || typeof o !== 'object')
            return o;

        var d = o instanceof Array ? [] : Object.create(Object.getPrototypeOf(o)),
            keys = Object.getOwnPropertyNames(o);

        for (var i = 0, n = keys.length; i < n; ++i) {
            var key = keys[i];
            Object.defineProperty(d, key, Object.getOwnPropertyDescriptor(o, key));
        }

        return d;
    },

    objMerge: function(base, objs, extend = true) {
        let args = Array.prototype.slice.call(arguments, 1);
        if (args.length < 1) {
            return base;
        }

        extend = typeof args[args.length - 1] === 'boolean' ? args.pop() : true;
        function _type(v) {
            if (!v) return false;
            let t = Object.getPrototypeOf(v).constructor;
            return t === Array || t === Object ? t : false;
        }
        for (let i = 0; i < args.length; i++) {
            let obj = args[i];
            if (!obj) {
                continue;
            }
            if (_type(obj) !== _type(base)) {
                continue;
            }
            Object.keys(obj).forEach(key => {
                let type = _type(obj[key]);
                if (!type) { // String etc.
                    if (extend || Utils.isDef(base[key])) {
                        base[key] = obj[key];
                    }
                } else if (extend || Utils.isDef(base[key])) {
                    if (type === Object) {
                        base[key] = Utils.objMerge(base[key] || {}, obj[key], extend);
                    }
                    // ARRAYS IGNORED!
                }
            });
        };
        return base;
    },

    // TODO try to use reduce
    arrDelta: function(base, arr) {
        if (!base) {
            return arr.slice();
        }
        let len = arr.length;
        let delta = Array(len);
        for (var i = 0; i < len; i++) {
            delta[i] = Utils.isDef(base[i]) ? arr[i] - base[i] : 0;
        }
        return delta;
    },

    // TODO try to use reduce
    objDelta: function(base, obj, keys) {
        let delta = {};
        keys = keys || Object.keys(obj);

        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];

            if (typeof obj[key] === 'number') {
                delta[key] = Utils.isDef(base[key]) ? obj[key] - base[key] : 0;
            } else if (obj[key] && Object.getPrototypeOf(obj[key]).constructor === Array) {
                delta[key] = Utils.arrDelta(base[key], obj[key]);
            }
        };
        return delta;
    },

    // TODO try to use reduce
    arrSum: function(base, arr = [], progress = 1) {
        // console.log('bap', base, arr, progress);
        if (!base) {
            return arr.slice();
        }

        let result = [];
        let len = arr.length;
        for (var i = 0; i < len; i++) {
            result[i] = (base[i] || 0) + arr[i] * progress;
        }
        return result;
    },

    // TODO try to use reduce
    objSum: function(base = {}, obj = {}, progress = 1) {
        let result = {};
        Object.keys(obj).forEach(key => {
            if (typeof obj[key] === 'number') {
                // console.log('key', key);
                result[key] = (base[key] || 0) + obj[key] * progress;
            } else if (obj[key] && Object.getPrototypeOf(obj[key]).constructor === Array) {
                result[key] = Utils.arrSum(base[key], obj[key], progress);
            } else {
                result[key] = base[key];
            }
        });
        return result;
    },

    isDef: function(v) {
        return typeof v !== 'undefined';
    },

    animate: function(options) {
        let args = Array.prototype.slice.call(arguments, 1),
            start = performance.now(),
            prevStamp = start,
            stop = false,
            timing,
            timings = {
                pow2: function(progress) {
                    return Math.pow(progress, 2);
                },
                pow5: function(progress) {
                    return Math.pow(progress, 5);
                },
                circ: function(progress) {
                    return 1 - Math.sin(Math.acos(progress));
                },
                linear: function(progress) {
                    return progress;
                },
            };

        let handle = function() {
            stop = true;
        }

        if (options.timing) {
            timing = timings[options.timing];
        }

        if (!timing) {
            timing = (function() {
                let timing = timings.pow2;
                return function(progress) {
                    return 1 - timing(1 - progress);
                };
            })();
        }

        requestAnimationFrame(function _animate(time) {
            let timeFraction = Math.min(1, (time - start) / options.duration);
            let progress = timing(timeFraction);

            // fps
            // let stamp = performance.now();
            // handle.fps = Math.round(1000 / (stamp - prevStamp));
            // prevStamp = stamp;

            // // low fps, end animation
            // if (handle.fps < 20) {
            //     progress = timeFraction = 1;
            // }

            options.exec(progress);

            if (timeFraction < 1 && !stop) {
                requestAnimationFrame(_animate);
            } else if (options.callback) {
                options.callback.apply(options.context, args);
            }
        });

        return handle;
    },

    getEventXY: function(e, el) {


        let offsets = el.getBoundingClientRect();
        let pos = e.targetTouches ? e.targetTouches[0] : e;

        if (!pos) {
            console.log('e', e);
        }

        // if (e.pageX || e.pageY) {
        //     pos = e;
        // } else if (e.targetTouches && e.targetTouches.length === 1){
        //     pos = e.targetTouches[0];
        // }
        return {
            x: pos.pageX - offsets.left,
            y: pos.clientY - offsets.top,
        };
    },

    /**
     * Pause before one time execution execution
     * @param {Function}  fn      [function]
     * @param {Number}    to      [timeout ms]
     * @param {any}       context [this of executed function]
     */
    // throttle: function(fn, to = 200, context = null) {
    //     let args = Array.prototype.slice.call(arguments, 2);

    //     if (fn.throttle) {
    //         clearTimeout(fn.throttle);
    //     }

    //     return new Promise((resolve, reject) => {
    //         fn.throttle = setTimeout(() => {
    //             fn.throttle = null;
    //             let result = fn.call(...args);
    //             resolve(result);
    //         }, to);
    //     });
    // }
}

export default Utils;

