! function(a) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = a();
    else if ("function" == typeof define && define.amd) define([], a);
    else {
        var b;
        b = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, b.Clipboard = a()
    }
}(function() {
    return function a(b, c, d) {
        function e(g, h) {
            if (!c[g]) {
                if (!b[g]) {
                    var i = "function" == typeof require && require;
                    if (!h && i) return i(g, !0);
                    if (f) return f(g, !0);
                    var j = new Error("Cannot find module '" + g + "'");
                    throw j.code = "MODULE_NOT_FOUND", j
                }
                var k = c[g] = {
                    exports: {}
                };
                b[g][0].call(k.exports, function(a) {
                    var c = b[g][1][a];
                    return e(c ? c : a)
                }, k, k.exports, a, b, c, d)
            }
            return c[g].exports
        }
        for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);
        return e
    }({
        1: [function(a, b, c) {
            var d = a("closest"),
                e = a("component-event"),
                f = ["focus", "blur"];
            c.bind = function(a, b, c, g, h) {
                return -1 !== f.indexOf(c) && (h = !0), e.bind(a, c, function(c) {
                    var e = c.target || c.srcElement;
                    c.delegateTarget = d(e, b, !0, a), c.delegateTarget && g.call(a, c)
                }, h)
            }, c.unbind = function(a, b, c, d) {
                -1 !== f.indexOf(b) && (d = !0), e.unbind(a, b, c, d)
            }
        }, {
            closest: 2,
            "component-event": 4
        }],
        2: [function(a, b, c) {
            var d = a("matches-selector");
            b.exports = function(a, b, c) {
                for (var e = c ? a : a.parentNode; e && e !== document;) {
                    if (d(e, b)) return e;
                    e = e.parentNode
                }
            }
        }, {
            "matches-selector": 3
        }],
        3: [function(a, b, c) {
            function d(a, b) {
                if (f) return f.call(a, b);
                for (var c = a.parentNode.querySelectorAll(b), d = 0; d < c.length; ++d)
                    if (c[d] == a) return !0;
                return !1
            }
            var e = Element.prototype,
                f = e.matchesSelector || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector;
            b.exports = d
        }, {}],
        4: [function(a, b, c) {
            var d = window.addEventListener ? "addEventListener" : "attachEvent",
                e = window.removeEventListener ? "removeEventListener" : "detachEvent",
                f = "addEventListener" !== d ? "on" : "";
            c.bind = function(a, b, c, e) {
                return a[d](f + b, c, e || !1), c
            }, c.unbind = function(a, b, c, d) {
                return a[e](f + b, c, d || !1), c
            }
        }, {}],
        5: [function(a, b, c) {
            function d() {}
            d.prototype = {
                on: function(a, b, c) {
                    var d = this.e || (this.e = {});
                    return (d[a] || (d[a] = [])).push({
                        fn: b,
                        ctx: c
                    }), this
                },
                once: function(a, b, c) {
                    var d = this,
                        e = function() {
                            d.off(a, e), b.apply(c, arguments)
                        };
                    return this.on(a, e, c)
                },
                emit: function(a) {
                    var b = [].slice.call(arguments, 1),
                        c = ((this.e || (this.e = {}))[a] || []).slice(),
                        d = 0,
                        e = c.length;
                    for (d; e > d; d++) c[d].fn.apply(c[d].ctx, b);
                    return this
                },
                off: function(a, b) {
                    var c = this.e || (this.e = {}),
                        d = c[a],
                        e = [];
                    if (d && b)
                        for (var f = 0, g = d.length; g > f; f++) d[f].fn !== b && e.push(d[f]);
                    return e.length ? c[a] = e : delete c[a], this
                }
            }, b.exports = d
        }, {}],
        6: [function(a, b, c) {
            "use strict";

            function d(a, b) {
                if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
            }
            c.__esModule = !0;
            var e = function() {
                    function a(a, b) {
                        for (var c = 0; c < b.length; c++) {
                            var d = b[c];
                            d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
                        }
                    }
                    return function(b, c, d) {
                        return c && a(b.prototype, c), d && a(b, d), b
                    }
                }(),
                f = function() {
                    function a(b) {
                        d(this, a), this.resolveOptions(b), this.initSelection()
                    }
                    return a.prototype.resolveOptions = function() {
                        var a = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
                        this.action = a.action, this.emitter = a.emitter, this.target = a.target, this.text = a.text, this.trigger = a.trigger, this.selectedText = ""
                    }, a.prototype.initSelection = function() {
                        if (this.text && this.target) throw new Error('Multiple attributes declared, use either "target" or "text"');
                        if (this.text) this.selectFake();
                        else {
                            if (!this.target) throw new Error('Missing required attributes, use either "target" or "text"');
                            this.selectTarget()
                        }
                    }, a.prototype.selectFake = function() {
                        var a = this;
                        this.removeFake(), this.fakeHandler = document.body.addEventListener("click", function() {
                            return a.removeFake()
                        }), this.fakeElem = document.createElement("textarea"), this.fakeElem.style.position = "absolute", this.fakeElem.style.left = "-9999px", this.fakeElem.style.top = (window.pageYOffset || document.documentElement.scrollTop) + "px", this.fakeElem.setAttribute("readonly", ""), this.fakeElem.value = this.text, this.selectedText = this.text, document.body.appendChild(this.fakeElem), this.fakeElem.select(), this.copyText()
                    }, a.prototype.removeFake = function() {
                        this.fakeHandler && (document.body.removeEventListener("click"), this.fakeHandler = null), this.fakeElem && (document.body.removeChild(this.fakeElem), this.fakeElem = null)
                    }, a.prototype.selectTarget = function() {
                        if ("INPUT" === this.target.nodeName || "TEXTAREA" === this.target.nodeName) this.target.select(), this.selectedText = this.target.value;
                        else {
                            var a = document.createRange(),
                                b = window.getSelection();
                            b.removeAllRanges(), a.selectNodeContents(this.target), b.addRange(a), this.selectedText = b.toString()
                        }
                        this.copyText()
                    }, a.prototype.copyText = function() {
                        var a = void 0;
                        try {
                            a = document.execCommand(this.action)
                        } catch (b) {
                            a = !1
                        }
                        this.handleResult(a)
                    }, a.prototype.handleResult = function(a) {
                        a ? this.emitter.emit("success", {
                            action: this.action,
                            text: this.selectedText,
                            trigger: this.trigger,
                            clearSelection: this.clearSelection.bind(this)
                        }) : this.emitter.emit("error", {
                            action: this.action,
                            trigger: this.trigger,
                            clearSelection: this.clearSelection.bind(this)
                        })
                    }, a.prototype.clearSelection = function() {
                        this.target && this.target.blur(), window.getSelection().removeAllRanges()
                    }, a.prototype.destroy = function() {
                        this.removeFake()
                    }, e(a, [{
                        key: "action",
                        set: function() {
                            var a = arguments.length <= 0 || void 0 === arguments[0] ? "copy" : arguments[0];
                            if (this._action = a, "copy" !== this._action && "cut" !== this._action) throw new Error('Invalid "action" value, use either "copy" or "cut"')
                        },
                        get: function() {
                            return this._action
                        }
                    }, {
                        key: "target",
                        set: function(a) {
                            if (void 0 !== a) {
                                if (!a || "object" != typeof a || 1 !== a.nodeType) throw new Error('Invalid "target" value, use a valid Element');
                                this._target = a
                            }
                        },
                        get: function() {
                            return this._target
                        }
                    }]), a
                }();
            c["default"] = f, b.exports = c["default"]
        }, {}],
        7: [function(a, b, c) {
            "use strict";

            function d(a) {
                return a && a.__esModule ? a : {
                    "default": a
                }
            }

            function e(a, b) {
                if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
            }

            function f(a, b) {
                if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
                a.prototype = Object.create(b && b.prototype, {
                    constructor: {
                        value: a,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
            }

            function g(a, b) {
                var c = "data-clipboard-" + a;
                if (b.hasAttribute(c)) return b.getAttribute(c)
            }
            c.__esModule = !0;
            var h = a("./clipboard-action"),
                i = d(h),
                j = a("delegate-events"),
                k = d(j),
                l = a("tiny-emitter"),
                m = d(l),
                n = function(a) {
                    function b(c, d) {
                        e(this, b), a.call(this), this.resolveOptions(d), this.delegateClick(c)
                    }
                    return f(b, a), b.prototype.resolveOptions = function() {
                        var a = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
                        this.action = "function" == typeof a.action ? a.action : this.defaultAction, this.target = "function" == typeof a.target ? a.target : this.defaultTarget, this.text = "function" == typeof a.text ? a.text : this.defaultText
                    }, b.prototype.delegateClick = function(a) {
                        var b = this;
                        this.binding = k["default"].bind(document.body, a, "click", function(a) {
                            return b.onClick(a)
                        })
                    }, b.prototype.undelegateClick = function() {
                        k["default"].unbind(document.body, "click", this.binding)
                    }, b.prototype.onClick = function(a) {
                        this.clipboardAction && (this.clipboardAction = null), this.clipboardAction = new i["default"]({
                            action: this.action(a.delegateTarget),
                            target: this.target(a.delegateTarget),
                            text: this.text(a.delegateTarget),
                            trigger: a.delegateTarget,
                            emitter: this
                        })
                    }, b.prototype.defaultAction = function(a) {
                        return g("action", a)
                    }, b.prototype.defaultTarget = function(a) {
                        var b = g("target", a);
                        return b ? document.querySelector(b) : void 0
                    }, b.prototype.defaultText = function(a) {
                        return g("text", a)
                    }, b.prototype.destroy = function() {
                        this.undelegateClick(), this.clipboardAction && (this.clipboardAction.destroy(), this.clipboardAction = null)
                    }, b
                }(m["default"]);
            c["default"] = n, b.exports = c["default"]
        }, {
            "./clipboard-action": 6,
            "delegate-events": 1,
            "tiny-emitter": 5
        }]
    }, {}, [7])(7)
});