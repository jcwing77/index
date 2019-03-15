var CountUp = function(f, k, m, n, p, g) {
    for (var l = 0, e = ["webkit", "moz", "ms", "o"], c = 0; c < e.length && !window.requestAnimationFrame; ++c) window.requestAnimationFrame = window[e[c] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e[c] + "CancelAnimationFrame"] || window[e[c] + "CancelRequestAnimationFrame"];
    window.requestAnimationFrame || (window.requestAnimationFrame = function(a, q) {
        var d = (new Date).getTime(),
            c = Math.max(0, 16 - (d - l)),
            e = window.setTimeout(function() { a(d + c) }, c);
        l = d + c;
        return e
    });
    window.cancelAnimationFrame ||
        (window.cancelAnimationFrame = function(a) { clearTimeout(a) });
    var a = this;
    a.options = { useEasing: !0, useGrouping: !0, separator: ",", decimal: ".", easingFn: null, formattingFn: null };
    for (var h in g) g.hasOwnProperty(h) && (a.options[h] = g[h]);
    "" === a.options.separator && (a.options.useGrouping = !1);
    a.options.prefix || (a.options.prefix = "");
    a.options.suffix || (a.options.suffix = "");
    a.d = "string" === typeof f ? document.getElementById(f) : f;
    a.startVal = Number(k);
    a.endVal = Number(m);
    a.countDown = a.startVal > a.endVal;
    a.frameVal = a.startVal;
    a.decimals = Math.max(0, n || 0);
    a.dec = Math.pow(10, a.decimals);
    a.duration = 1E3 * Number(p) || 2E3;
    a.formatNumber = function(b) {
        b = b.toFixed(a.decimals);
        var c, d;
        c = (b + "").split(".");
        b = c[0];
        c = 1 < c.length ? a.options.decimal + c[1] : "";
        d = /(\d+)(\d{3})/;
        if (a.options.useGrouping)
            for (; d.test(b);) b = b.replace(d, "$1" + a.options.separator + "$2");
        return a.options.prefix + b + c + a.options.suffix
    };
    a.easeOutExpo = function(a, c, d, e) { return d * (-Math.pow(2, -10 * a / e) + 1) * 1024 / 1023 + c };
    a.easingFn = a.options.easingFn ? a.options.easingFn : a.easeOutExpo;
    a.formattingFn = a.options.formattingFn ? a.options.formattingFn : a.formatNumber;
    a.version = function() { return "1.7.1" };
    a.printValue = function(b) { b = a.formattingFn(b); "INPUT" === a.d.tagName ? this.d.value = b : "text" === a.d.tagName || "tspan" === a.d.tagName ? this.d.textContent = b : this.d.innerHTML = b };
    a.count = function(b) {
        a.startTime || (a.startTime = b);
        a.timestamp = b;
        b -= a.startTime;
        a.remaining = a.duration - b;
        a.frameVal = a.options.useEasing ? a.countDown ? a.startVal - a.easingFn(b, 0, a.startVal - a.endVal, a.duration) : a.easingFn(b, a.startVal,
            a.endVal - a.startVal, a.duration) : a.countDown ? a.startVal - b / a.duration * (a.startVal - a.endVal) : a.startVal + b / a.duration * (a.endVal - a.startVal);
        a.frameVal = a.countDown ? a.frameVal < a.endVal ? a.endVal : a.frameVal : a.frameVal > a.endVal ? a.endVal : a.frameVal;
        a.frameVal = Math.round(a.frameVal * a.dec) / a.dec;
        a.printValue(a.frameVal);
        b < a.duration ? a.rAF = requestAnimationFrame(a.count) : a.callback && a.callback()
    };
    a.start = function(b) {
        a.callback = b;
        a.rAF = requestAnimationFrame(a.count);
        return !1
    };
    a.pauseResume = function() {
        a.paused ? (a.paused = !1, delete a.startTime, a.duration = a.remaining, a.startVal = a.frameVal, requestAnimationFrame(a.count)) : (a.paused = !0, cancelAnimationFrame(a.rAF))
    };
    a.reset = function() {
        a.paused = !1;
        delete a.startTime;
        a.startVal = k;
        cancelAnimationFrame(a.rAF);
        a.printValue(a.startVal)
    };
    a.update = function(b) {
        cancelAnimationFrame(a.rAF);
        a.paused = !1;
        delete a.startTime;
        a.startVal = a.frameVal;
        a.endVal = Number(b);
        a.countDown = a.startVal > a.endVal;
        a.rAF = requestAnimationFrame(a.count)
    };
    a.printValue(a.startVal)
};