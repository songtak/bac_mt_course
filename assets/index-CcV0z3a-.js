function Wd(e, t) {
  for (var n = 0; n < t.length; n++) {
    const r = t[n];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const l in r)
        if (l !== "default" && !(l in e)) {
          const i = Object.getOwnPropertyDescriptor(r, l);
          i &&
            Object.defineProperty(
              e,
              l,
              i.get ? i : { enumerable: !0, get: () => r[l] }
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" })
  );
}
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const l of document.querySelectorAll('link[rel="modulepreload"]')) r(l);
  new MutationObserver((l) => {
    for (const i of l)
      if (i.type === "childList")
        for (const o of i.addedNodes)
          o.tagName === "LINK" && o.rel === "modulepreload" && r(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(l) {
    const i = {};
    return (
      l.integrity && (i.integrity = l.integrity),
      l.referrerPolicy && (i.referrerPolicy = l.referrerPolicy),
      l.crossOrigin === "use-credentials"
        ? (i.credentials = "include")
        : l.crossOrigin === "anonymous"
        ? (i.credentials = "omit")
        : (i.credentials = "same-origin"),
      i
    );
  }
  function r(l) {
    if (l.ep) return;
    l.ep = !0;
    const i = n(l);
    fetch(l.href, i);
  }
})();
function mu(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var hu = { exports: {} },
  ul = {},
  gu = { exports: {} },
  R = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var tr = Symbol.for("react.element"),
  Hd = Symbol.for("react.portal"),
  Qd = Symbol.for("react.fragment"),
  Kd = Symbol.for("react.strict_mode"),
  Xd = Symbol.for("react.profiler"),
  Yd = Symbol.for("react.provider"),
  Gd = Symbol.for("react.context"),
  Zd = Symbol.for("react.forward_ref"),
  Jd = Symbol.for("react.suspense"),
  qd = Symbol.for("react.memo"),
  bd = Symbol.for("react.lazy"),
  Zo = Symbol.iterator;
function ec(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (Zo && e[Zo]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var vu = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  yu = Object.assign,
  wu = {};
function sn(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = wu),
    (this.updater = n || vu);
}
sn.prototype.isReactComponent = {};
sn.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
sn.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Nu() {}
Nu.prototype = sn.prototype;
function qi(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = wu),
    (this.updater = n || vu);
}
var bi = (qi.prototype = new Nu());
bi.constructor = qi;
yu(bi, sn.prototype);
bi.isPureReactComponent = !0;
var Jo = Array.isArray,
  Su = Object.prototype.hasOwnProperty,
  eo = { current: null },
  ku = { key: !0, ref: !0, __self: !0, __source: !0 };
function xu(e, t, n) {
  var r,
    l = {},
    i = null,
    o = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (o = t.ref),
    t.key !== void 0 && (i = "" + t.key),
    t))
      Su.call(t, r) && !ku.hasOwnProperty(r) && (l[r] = t[r]);
  var a = arguments.length - 2;
  if (a === 1) l.children = n;
  else if (1 < a) {
    for (var u = Array(a), d = 0; d < a; d++) u[d] = arguments[d + 2];
    l.children = u;
  }
  if (e && e.defaultProps)
    for (r in ((a = e.defaultProps), a)) l[r] === void 0 && (l[r] = a[r]);
  return {
    $$typeof: tr,
    type: e,
    key: i,
    ref: o,
    props: l,
    _owner: eo.current,
  };
}
function tc(e, t) {
  return {
    $$typeof: tr,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function to(e) {
  return typeof e == "object" && e !== null && e.$$typeof === tr;
}
function nc(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var qo = /\/+/g;
function Dl(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? nc("" + e.key)
    : t.toString(36);
}
function Er(e, t, n, r, l) {
  var i = typeof e;
  (i === "undefined" || i === "boolean") && (e = null);
  var o = !1;
  if (e === null) o = !0;
  else
    switch (i) {
      case "string":
      case "number":
        o = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case tr:
          case Hd:
            o = !0;
        }
    }
  if (o)
    return (
      (o = e),
      (l = l(o)),
      (e = r === "" ? "." + Dl(o, 0) : r),
      Jo(l)
        ? ((n = ""),
          e != null && (n = e.replace(qo, "$&/") + "/"),
          Er(l, t, n, "", function (d) {
            return d;
          }))
        : l != null &&
          (to(l) &&
            (l = tc(
              l,
              n +
                (!l.key || (o && o.key === l.key)
                  ? ""
                  : ("" + l.key).replace(qo, "$&/") + "/") +
                e
            )),
          t.push(l)),
      1
    );
  if (((o = 0), (r = r === "" ? "." : r + ":"), Jo(e)))
    for (var a = 0; a < e.length; a++) {
      i = e[a];
      var u = r + Dl(i, a);
      o += Er(i, t, n, u, l);
    }
  else if (((u = ec(e)), typeof u == "function"))
    for (e = u.call(e), a = 0; !(i = e.next()).done; )
      (i = i.value), (u = r + Dl(i, a++)), (o += Er(i, t, n, u, l));
  else if (i === "object")
    throw (
      ((t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : t) +
          "). If you meant to render a collection of children, use an array instead."
      ))
    );
  return o;
}
function ur(e, t, n) {
  if (e == null) return e;
  var r = [],
    l = 0;
  return (
    Er(e, r, "", "", function (i) {
      return t.call(n, i, l++);
    }),
    r
  );
}
function rc(e) {
  if (e._status === -1) {
    var t = e._result;
    (t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = n));
        }
      ),
      e._status === -1 && ((e._status = 0), (e._result = t));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var se = { current: null },
  Lr = { transition: null },
  lc = {
    ReactCurrentDispatcher: se,
    ReactCurrentBatchConfig: Lr,
    ReactCurrentOwner: eo,
  };
function Cu() {
  throw Error("act(...) is not supported in production builds of React.");
}
R.Children = {
  map: ur,
  forEach: function (e, t, n) {
    ur(
      e,
      function () {
        t.apply(this, arguments);
      },
      n
    );
  },
  count: function (e) {
    var t = 0;
    return (
      ur(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      ur(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!to(e))
      throw Error(
        "React.Children.only expected to receive a single React element child."
      );
    return e;
  },
};
R.Component = sn;
R.Fragment = Qd;
R.Profiler = Xd;
R.PureComponent = qi;
R.StrictMode = Kd;
R.Suspense = Jd;
R.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = lc;
R.act = Cu;
R.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        e +
        "."
    );
  var r = yu({}, e.props),
    l = e.key,
    i = e.ref,
    o = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((i = t.ref), (o = eo.current)),
      t.key !== void 0 && (l = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var a = e.type.defaultProps;
    for (u in t)
      Su.call(t, u) &&
        !ku.hasOwnProperty(u) &&
        (r[u] = t[u] === void 0 && a !== void 0 ? a[u] : t[u]);
  }
  var u = arguments.length - 2;
  if (u === 1) r.children = n;
  else if (1 < u) {
    a = Array(u);
    for (var d = 0; d < u; d++) a[d] = arguments[d + 2];
    r.children = a;
  }
  return { $$typeof: tr, type: e.type, key: l, ref: i, props: r, _owner: o };
};
R.createContext = function (e) {
  return (
    (e = {
      $$typeof: Gd,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: Yd, _context: e }),
    (e.Consumer = e)
  );
};
R.createElement = xu;
R.createFactory = function (e) {
  var t = xu.bind(null, e);
  return (t.type = e), t;
};
R.createRef = function () {
  return { current: null };
};
R.forwardRef = function (e) {
  return { $$typeof: Zd, render: e };
};
R.isValidElement = to;
R.lazy = function (e) {
  return { $$typeof: bd, _payload: { _status: -1, _result: e }, _init: rc };
};
R.memo = function (e, t) {
  return { $$typeof: qd, type: e, compare: t === void 0 ? null : t };
};
R.startTransition = function (e) {
  var t = Lr.transition;
  Lr.transition = {};
  try {
    e();
  } finally {
    Lr.transition = t;
  }
};
R.unstable_act = Cu;
R.useCallback = function (e, t) {
  return se.current.useCallback(e, t);
};
R.useContext = function (e) {
  return se.current.useContext(e);
};
R.useDebugValue = function () {};
R.useDeferredValue = function (e) {
  return se.current.useDeferredValue(e);
};
R.useEffect = function (e, t) {
  return se.current.useEffect(e, t);
};
R.useId = function () {
  return se.current.useId();
};
R.useImperativeHandle = function (e, t, n) {
  return se.current.useImperativeHandle(e, t, n);
};
R.useInsertionEffect = function (e, t) {
  return se.current.useInsertionEffect(e, t);
};
R.useLayoutEffect = function (e, t) {
  return se.current.useLayoutEffect(e, t);
};
R.useMemo = function (e, t) {
  return se.current.useMemo(e, t);
};
R.useReducer = function (e, t, n) {
  return se.current.useReducer(e, t, n);
};
R.useRef = function (e) {
  return se.current.useRef(e);
};
R.useState = function (e) {
  return se.current.useState(e);
};
R.useSyncExternalStore = function (e, t, n) {
  return se.current.useSyncExternalStore(e, t, n);
};
R.useTransition = function () {
  return se.current.useTransition();
};
R.version = "18.3.1";
gu.exports = R;
var x = gu.exports;
const ic = mu(x),
  oc = Wd({ __proto__: null, default: ic }, [x]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var ac = x,
  uc = Symbol.for("react.element"),
  sc = Symbol.for("react.fragment"),
  dc = Object.prototype.hasOwnProperty,
  cc = ac.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  fc = { key: !0, ref: !0, __self: !0, __source: !0 };
function Eu(e, t, n) {
  var r,
    l = {},
    i = null,
    o = null;
  n !== void 0 && (i = "" + n),
    t.key !== void 0 && (i = "" + t.key),
    t.ref !== void 0 && (o = t.ref);
  for (r in t) dc.call(t, r) && !fc.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) l[r] === void 0 && (l[r] = t[r]);
  return {
    $$typeof: uc,
    type: e,
    key: i,
    ref: o,
    props: l,
    _owner: cc.current,
  };
}
ul.Fragment = sc;
ul.jsx = Eu;
ul.jsxs = Eu;
hu.exports = ul;
var I = hu.exports,
  Lu = { exports: {} },
  Ne = {},
  _u = { exports: {} },
  Pu = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(E, D) {
    var z = E.length;
    E.push(D);
    e: for (; 0 < z; ) {
      var Q = (z - 1) >>> 1,
        J = E[Q];
      if (0 < l(J, D)) (E[Q] = D), (E[z] = J), (z = Q);
      else break e;
    }
  }
  function n(E) {
    return E.length === 0 ? null : E[0];
  }
  function r(E) {
    if (E.length === 0) return null;
    var D = E[0],
      z = E.pop();
    if (z !== D) {
      E[0] = z;
      e: for (var Q = 0, J = E.length, or = J >>> 1; Q < or; ) {
        var yt = 2 * (Q + 1) - 1,
          Il = E[yt],
          wt = yt + 1,
          ar = E[wt];
        if (0 > l(Il, z))
          wt < J && 0 > l(ar, Il)
            ? ((E[Q] = ar), (E[wt] = z), (Q = wt))
            : ((E[Q] = Il), (E[yt] = z), (Q = yt));
        else if (wt < J && 0 > l(ar, z)) (E[Q] = ar), (E[wt] = z), (Q = wt);
        else break e;
      }
    }
    return D;
  }
  function l(E, D) {
    var z = E.sortIndex - D.sortIndex;
    return z !== 0 ? z : E.id - D.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var i = performance;
    e.unstable_now = function () {
      return i.now();
    };
  } else {
    var o = Date,
      a = o.now();
    e.unstable_now = function () {
      return o.now() - a;
    };
  }
  var u = [],
    d = [],
    m = 1,
    f = null,
    h = 3,
    g = !1,
    v = !1,
    y = !1,
    k = typeof setTimeout == "function" ? setTimeout : null,
    c = typeof clearTimeout == "function" ? clearTimeout : null,
    s = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function p(E) {
    for (var D = n(d); D !== null; ) {
      if (D.callback === null) r(d);
      else if (D.startTime <= E)
        r(d), (D.sortIndex = D.expirationTime), t(u, D);
      else break;
      D = n(d);
    }
  }
  function w(E) {
    if (((y = !1), p(E), !v))
      if (n(u) !== null) (v = !0), _l(S);
      else {
        var D = n(d);
        D !== null && Pl(w, D.startTime - E);
      }
  }
  function S(E, D) {
    (v = !1), y && ((y = !1), c(P), (P = -1)), (g = !0);
    var z = h;
    try {
      for (
        p(D), f = n(u);
        f !== null && (!(f.expirationTime > D) || (E && !Pe()));

      ) {
        var Q = f.callback;
        if (typeof Q == "function") {
          (f.callback = null), (h = f.priorityLevel);
          var J = Q(f.expirationTime <= D);
          (D = e.unstable_now()),
            typeof J == "function" ? (f.callback = J) : f === n(u) && r(u),
            p(D);
        } else r(u);
        f = n(u);
      }
      if (f !== null) var or = !0;
      else {
        var yt = n(d);
        yt !== null && Pl(w, yt.startTime - D), (or = !1);
      }
      return or;
    } finally {
      (f = null), (h = z), (g = !1);
    }
  }
  var L = !1,
    _ = null,
    P = -1,
    H = 5,
    T = -1;
  function Pe() {
    return !(e.unstable_now() - T < H);
  }
  function pn() {
    if (_ !== null) {
      var E = e.unstable_now();
      T = E;
      var D = !0;
      try {
        D = _(!0, E);
      } finally {
        D ? mn() : ((L = !1), (_ = null));
      }
    } else L = !1;
  }
  var mn;
  if (typeof s == "function")
    mn = function () {
      s(pn);
    };
  else if (typeof MessageChannel < "u") {
    var Go = new MessageChannel(),
      Bd = Go.port2;
    (Go.port1.onmessage = pn),
      (mn = function () {
        Bd.postMessage(null);
      });
  } else
    mn = function () {
      k(pn, 0);
    };
  function _l(E) {
    (_ = E), L || ((L = !0), mn());
  }
  function Pl(E, D) {
    P = k(function () {
      E(e.unstable_now());
    }, D);
  }
  (e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (E) {
      E.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      v || g || ((v = !0), _l(S));
    }),
    (e.unstable_forceFrameRate = function (E) {
      0 > E || 125 < E
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
          )
        : (H = 0 < E ? Math.floor(1e3 / E) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return h;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(u);
    }),
    (e.unstable_next = function (E) {
      switch (h) {
        case 1:
        case 2:
        case 3:
          var D = 3;
          break;
        default:
          D = h;
      }
      var z = h;
      h = D;
      try {
        return E();
      } finally {
        h = z;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (E, D) {
      switch (E) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          E = 3;
      }
      var z = h;
      h = E;
      try {
        return D();
      } finally {
        h = z;
      }
    }),
    (e.unstable_scheduleCallback = function (E, D, z) {
      var Q = e.unstable_now();
      switch (
        (typeof z == "object" && z !== null
          ? ((z = z.delay), (z = typeof z == "number" && 0 < z ? Q + z : Q))
          : (z = Q),
        E)
      ) {
        case 1:
          var J = -1;
          break;
        case 2:
          J = 250;
          break;
        case 5:
          J = 1073741823;
          break;
        case 4:
          J = 1e4;
          break;
        default:
          J = 5e3;
      }
      return (
        (J = z + J),
        (E = {
          id: m++,
          callback: D,
          priorityLevel: E,
          startTime: z,
          expirationTime: J,
          sortIndex: -1,
        }),
        z > Q
          ? ((E.sortIndex = z),
            t(d, E),
            n(u) === null &&
              E === n(d) &&
              (y ? (c(P), (P = -1)) : (y = !0), Pl(w, z - Q)))
          : ((E.sortIndex = J), t(u, E), v || g || ((v = !0), _l(S))),
        E
      );
    }),
    (e.unstable_shouldYield = Pe),
    (e.unstable_wrapCallback = function (E) {
      var D = h;
      return function () {
        var z = h;
        h = D;
        try {
          return E.apply(this, arguments);
        } finally {
          h = z;
        }
      };
    });
})(Pu);
_u.exports = Pu;
var pc = _u.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var mc = x,
  we = pc;
function N(e) {
  for (
    var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1;
    n < arguments.length;
    n++
  )
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var Iu = new Set(),
  Mn = {};
function Tt(e, t) {
  tn(e, t), tn(e + "Capture", t);
}
function tn(e, t) {
  for (Mn[e] = t, e = 0; e < t.length; e++) Iu.add(t[e]);
}
var Ke = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  li = Object.prototype.hasOwnProperty,
  hc =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  bo = {},
  ea = {};
function gc(e) {
  return li.call(ea, e)
    ? !0
    : li.call(bo, e)
    ? !1
    : hc.test(e)
    ? (ea[e] = !0)
    : ((bo[e] = !0), !1);
}
function vc(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r
        ? !1
        : n !== null
        ? !n.acceptsBooleans
        : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function yc(e, t, n, r) {
  if (t === null || typeof t > "u" || vc(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function de(e, t, n, r, l, i, o) {
  (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = l),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = i),
    (this.removeEmptyString = o);
}
var ne = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    ne[e] = new de(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  ne[t] = new de(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  ne[e] = new de(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (e) {
  ne[e] = new de(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    ne[e] = new de(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  ne[e] = new de(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  ne[e] = new de(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  ne[e] = new de(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  ne[e] = new de(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var no = /[\-:]([a-z])/g;
function ro(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(no, ro);
    ne[t] = new de(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(no, ro);
    ne[t] = new de(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(no, ro);
  ne[t] = new de(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  ne[e] = new de(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ne.xlinkHref = new de(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1
);
["src", "href", "action", "formAction"].forEach(function (e) {
  ne[e] = new de(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function lo(e, t, n, r) {
  var l = ne.hasOwnProperty(t) ? ne[t] : null;
  (l !== null
    ? l.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== "o" && t[0] !== "O") ||
      (t[1] !== "n" && t[1] !== "N")) &&
    (yc(t, n, l, r) && (n = null),
    r || l === null
      ? gc(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
      : l.mustUseProperty
      ? (e[l.propertyName] = n === null ? (l.type === 3 ? !1 : "") : n)
      : ((t = l.attributeName),
        (r = l.attributeNamespace),
        n === null
          ? e.removeAttribute(t)
          : ((l = l.type),
            (n = l === 3 || (l === 4 && n === !0) ? "" : "" + n),
            r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Ze = mc.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  sr = Symbol.for("react.element"),
  Ot = Symbol.for("react.portal"),
  Ft = Symbol.for("react.fragment"),
  io = Symbol.for("react.strict_mode"),
  ii = Symbol.for("react.profiler"),
  Du = Symbol.for("react.provider"),
  zu = Symbol.for("react.context"),
  oo = Symbol.for("react.forward_ref"),
  oi = Symbol.for("react.suspense"),
  ai = Symbol.for("react.suspense_list"),
  ao = Symbol.for("react.memo"),
  qe = Symbol.for("react.lazy"),
  Ru = Symbol.for("react.offscreen"),
  ta = Symbol.iterator;
function hn(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (ta && e[ta]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var B = Object.assign,
  zl;
function xn(e) {
  if (zl === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      zl = (t && t[1]) || "";
    }
  return (
    `
` +
    zl +
    e
  );
}
var Rl = !1;
function Tl(e, t) {
  if (!e || Rl) return "";
  Rl = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (d) {
          var r = d;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (d) {
          r = d;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (d) {
        r = d;
      }
      e();
    }
  } catch (d) {
    if (d && r && typeof d.stack == "string") {
      for (
        var l = d.stack.split(`
`),
          i = r.stack.split(`
`),
          o = l.length - 1,
          a = i.length - 1;
        1 <= o && 0 <= a && l[o] !== i[a];

      )
        a--;
      for (; 1 <= o && 0 <= a; o--, a--)
        if (l[o] !== i[a]) {
          if (o !== 1 || a !== 1)
            do
              if ((o--, a--, 0 > a || l[o] !== i[a])) {
                var u =
                  `
` + l[o].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    u.includes("<anonymous>") &&
                    (u = u.replace("<anonymous>", e.displayName)),
                  u
                );
              }
            while (1 <= o && 0 <= a);
          break;
        }
    }
  } finally {
    (Rl = !1), (Error.prepareStackTrace = n);
  }
  return (e = e ? e.displayName || e.name : "") ? xn(e) : "";
}
function wc(e) {
  switch (e.tag) {
    case 5:
      return xn(e.type);
    case 16:
      return xn("Lazy");
    case 13:
      return xn("Suspense");
    case 19:
      return xn("SuspenseList");
    case 0:
    case 2:
    case 15:
      return (e = Tl(e.type, !1)), e;
    case 11:
      return (e = Tl(e.type.render, !1)), e;
    case 1:
      return (e = Tl(e.type, !0)), e;
    default:
      return "";
  }
}
function ui(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Ft:
      return "Fragment";
    case Ot:
      return "Portal";
    case ii:
      return "Profiler";
    case io:
      return "StrictMode";
    case oi:
      return "Suspense";
    case ai:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case zu:
        return (e.displayName || "Context") + ".Consumer";
      case Du:
        return (e._context.displayName || "Context") + ".Provider";
      case oo:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case ao:
        return (
          (t = e.displayName || null), t !== null ? t : ui(e.type) || "Memo"
        );
      case qe:
        (t = e._payload), (e = e._init);
        try {
          return ui(e(t));
        } catch {}
    }
  return null;
}
function Nc(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ""),
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return ui(t);
    case 8:
      return t === io ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function pt(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function Tu(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function Sc(e) {
  var t = Tu(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var l = n.get,
      i = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return l.call(this);
        },
        set: function (o) {
          (r = "" + o), i.call(this, o);
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (o) {
          r = "" + o;
        },
        stopTracking: function () {
          (e._valueTracker = null), delete e[t];
        },
      }
    );
  }
}
function dr(e) {
  e._valueTracker || (e._valueTracker = Sc(e));
}
function Au(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = Tu(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function Fr(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function si(e, t) {
  var n = t.checked;
  return B({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function na(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  (n = pt(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    });
}
function ju(e, t) {
  (t = t.checked), t != null && lo(e, "checked", t, !1);
}
function di(e, t) {
  ju(e, t);
  var n = pt(t.value),
    r = t.type;
  if (n != null)
    r === "number"
      ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
      : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value")
    ? ci(e, t.type, n)
    : t.hasOwnProperty("defaultValue") && ci(e, t.type, pt(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked);
}
function ra(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (
      !(
        (r !== "submit" && r !== "reset") ||
        (t.value !== void 0 && t.value !== null)
      )
    )
      return;
    (t = "" + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t);
  }
  (n = e.name),
    n !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== "" && (e.name = n);
}
function ci(e, t, n) {
  (t !== "number" || Fr(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Cn = Array.isArray;
function Gt(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++)
      (l = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== l && (e[n].selected = l),
        l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + pt(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        (e[l].selected = !0), r && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function fi(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(N(91));
  return B({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function la(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(N(92));
      if (Cn(n)) {
        if (1 < n.length) throw Error(N(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), (n = t);
  }
  e._wrapperState = { initialValue: pt(n) };
}
function Mu(e, t) {
  var n = pt(t.value),
    r = pt(t.defaultValue);
  n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r);
}
function ia(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Ou(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function pi(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? Ou(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
    ? "http://www.w3.org/1999/xhtml"
    : e;
}
var cr,
  Fu = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, l) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, l);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = t;
    else {
      for (
        cr = cr || document.createElement("div"),
          cr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = cr.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function On(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var _n = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  kc = ["Webkit", "ms", "Moz", "O"];
Object.keys(_n).forEach(function (e) {
  kc.forEach(function (t) {
    (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (_n[t] = _n[e]);
  });
});
function Uu(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (_n.hasOwnProperty(e) && _n[e])
    ? ("" + t).trim()
    : t + "px";
}
function $u(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        l = Uu(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : (e[n] = l);
    }
}
var xc = B(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  }
);
function mi(e, t) {
  if (t) {
    if (xc[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(N(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(N(60));
      if (
        typeof t.dangerouslySetInnerHTML != "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(N(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(N(62));
  }
}
function hi(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var gi = null;
function uo(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var vi = null,
  Zt = null,
  Jt = null;
function oa(e) {
  if ((e = lr(e))) {
    if (typeof vi != "function") throw Error(N(280));
    var t = e.stateNode;
    t && ((t = pl(t)), vi(e.stateNode, e.type, t));
  }
}
function Vu(e) {
  Zt ? (Jt ? Jt.push(e) : (Jt = [e])) : (Zt = e);
}
function Bu() {
  if (Zt) {
    var e = Zt,
      t = Jt;
    if (((Jt = Zt = null), oa(e), t)) for (e = 0; e < t.length; e++) oa(t[e]);
  }
}
function Wu(e, t) {
  return e(t);
}
function Hu() {}
var Al = !1;
function Qu(e, t, n) {
  if (Al) return e(t, n);
  Al = !0;
  try {
    return Wu(e, t, n);
  } finally {
    (Al = !1), (Zt !== null || Jt !== null) && (Hu(), Bu());
  }
}
function Fn(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = pl(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !r);
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(N(231, t, typeof n));
  return n;
}
var yi = !1;
if (Ke)
  try {
    var gn = {};
    Object.defineProperty(gn, "passive", {
      get: function () {
        yi = !0;
      },
    }),
      window.addEventListener("test", gn, gn),
      window.removeEventListener("test", gn, gn);
  } catch {
    yi = !1;
  }
function Cc(e, t, n, r, l, i, o, a, u) {
  var d = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, d);
  } catch (m) {
    this.onError(m);
  }
}
var Pn = !1,
  Ur = null,
  $r = !1,
  wi = null,
  Ec = {
    onError: function (e) {
      (Pn = !0), (Ur = e);
    },
  };
function Lc(e, t, n, r, l, i, o, a, u) {
  (Pn = !1), (Ur = null), Cc.apply(Ec, arguments);
}
function _c(e, t, n, r, l, i, o, a, u) {
  if ((Lc.apply(this, arguments), Pn)) {
    if (Pn) {
      var d = Ur;
      (Pn = !1), (Ur = null);
    } else throw Error(N(198));
    $r || (($r = !0), (wi = d));
  }
}
function At(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do (t = e), t.flags & 4098 && (n = t.return), (e = t.return);
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function Ku(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function aa(e) {
  if (At(e) !== e) throw Error(N(188));
}
function Pc(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = At(e)), t === null)) throw Error(N(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var l = n.return;
    if (l === null) break;
    var i = l.alternate;
    if (i === null) {
      if (((r = l.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (l.child === i.child) {
      for (i = l.child; i; ) {
        if (i === n) return aa(l), e;
        if (i === r) return aa(l), t;
        i = i.sibling;
      }
      throw Error(N(188));
    }
    if (n.return !== r.return) (n = l), (r = i);
    else {
      for (var o = !1, a = l.child; a; ) {
        if (a === n) {
          (o = !0), (n = l), (r = i);
          break;
        }
        if (a === r) {
          (o = !0), (r = l), (n = i);
          break;
        }
        a = a.sibling;
      }
      if (!o) {
        for (a = i.child; a; ) {
          if (a === n) {
            (o = !0), (n = i), (r = l);
            break;
          }
          if (a === r) {
            (o = !0), (r = i), (n = l);
            break;
          }
          a = a.sibling;
        }
        if (!o) throw Error(N(189));
      }
    }
    if (n.alternate !== r) throw Error(N(190));
  }
  if (n.tag !== 3) throw Error(N(188));
  return n.stateNode.current === n ? e : t;
}
function Xu(e) {
  return (e = Pc(e)), e !== null ? Yu(e) : null;
}
function Yu(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Yu(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Gu = we.unstable_scheduleCallback,
  ua = we.unstable_cancelCallback,
  Ic = we.unstable_shouldYield,
  Dc = we.unstable_requestPaint,
  K = we.unstable_now,
  zc = we.unstable_getCurrentPriorityLevel,
  so = we.unstable_ImmediatePriority,
  Zu = we.unstable_UserBlockingPriority,
  Vr = we.unstable_NormalPriority,
  Rc = we.unstable_LowPriority,
  Ju = we.unstable_IdlePriority,
  sl = null,
  Ue = null;
function Tc(e) {
  if (Ue && typeof Ue.onCommitFiberRoot == "function")
    try {
      Ue.onCommitFiberRoot(sl, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var Te = Math.clz32 ? Math.clz32 : Mc,
  Ac = Math.log,
  jc = Math.LN2;
function Mc(e) {
  return (e >>>= 0), e === 0 ? 32 : (31 - ((Ac(e) / jc) | 0)) | 0;
}
var fr = 64,
  pr = 4194304;
function En(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function Br(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    l = e.suspendedLanes,
    i = e.pingedLanes,
    o = n & 268435455;
  if (o !== 0) {
    var a = o & ~l;
    a !== 0 ? (r = En(a)) : ((i &= o), i !== 0 && (r = En(i)));
  } else (o = n & ~l), o !== 0 ? (r = En(o)) : i !== 0 && (r = En(i));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & l) &&
    ((l = r & -r), (i = t & -t), l >= i || (l === 16 && (i & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      (n = 31 - Te(t)), (l = 1 << n), (r |= e[n]), (t &= ~l);
  return r;
}
function Oc(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function Fc(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      l = e.expirationTimes,
      i = e.pendingLanes;
    0 < i;

  ) {
    var o = 31 - Te(i),
      a = 1 << o,
      u = l[o];
    u === -1
      ? (!(a & n) || a & r) && (l[o] = Oc(a, t))
      : u <= t && (e.expiredLanes |= a),
      (i &= ~a);
  }
}
function Ni(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function qu() {
  var e = fr;
  return (fr <<= 1), !(fr & 4194240) && (fr = 64), e;
}
function jl(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function nr(e, t, n) {
  (e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - Te(t)),
    (e[t] = n);
}
function Uc(e, t) {
  var n = e.pendingLanes & ~t;
  (e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements);
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - Te(n),
      i = 1 << l;
    (t[l] = 0), (r[l] = -1), (e[l] = -1), (n &= ~i);
  }
}
function co(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - Te(n),
      l = 1 << r;
    (l & t) | (e[r] & t) && (e[r] |= t), (n &= ~l);
  }
}
var j = 0;
function bu(e) {
  return (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1;
}
var es,
  fo,
  ts,
  ns,
  rs,
  Si = !1,
  mr = [],
  it = null,
  ot = null,
  at = null,
  Un = new Map(),
  $n = new Map(),
  et = [],
  $c =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " "
    );
function sa(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      it = null;
      break;
    case "dragenter":
    case "dragleave":
      ot = null;
      break;
    case "mouseover":
    case "mouseout":
      at = null;
      break;
    case "pointerover":
    case "pointerout":
      Un.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      $n.delete(t.pointerId);
  }
}
function vn(e, t, n, r, l, i) {
  return e === null || e.nativeEvent !== i
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: i,
        targetContainers: [l],
      }),
      t !== null && ((t = lr(t)), t !== null && fo(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      l !== null && t.indexOf(l) === -1 && t.push(l),
      e);
}
function Vc(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return (it = vn(it, e, t, n, r, l)), !0;
    case "dragenter":
      return (ot = vn(ot, e, t, n, r, l)), !0;
    case "mouseover":
      return (at = vn(at, e, t, n, r, l)), !0;
    case "pointerover":
      var i = l.pointerId;
      return Un.set(i, vn(Un.get(i) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return (
        (i = l.pointerId), $n.set(i, vn($n.get(i) || null, e, t, n, r, l)), !0
      );
  }
  return !1;
}
function ls(e) {
  var t = kt(e.target);
  if (t !== null) {
    var n = At(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = Ku(n)), t !== null)) {
          (e.blockedOn = t),
            rs(e.priority, function () {
              ts(n);
            });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function _r(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = ki(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      (gi = r), n.target.dispatchEvent(r), (gi = null);
    } else return (t = lr(n)), t !== null && fo(t), (e.blockedOn = n), !1;
    t.shift();
  }
  return !0;
}
function da(e, t, n) {
  _r(e) && n.delete(t);
}
function Bc() {
  (Si = !1),
    it !== null && _r(it) && (it = null),
    ot !== null && _r(ot) && (ot = null),
    at !== null && _r(at) && (at = null),
    Un.forEach(da),
    $n.forEach(da);
}
function yn(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    Si ||
      ((Si = !0),
      we.unstable_scheduleCallback(we.unstable_NormalPriority, Bc)));
}
function Vn(e) {
  function t(l) {
    return yn(l, e);
  }
  if (0 < mr.length) {
    yn(mr[0], e);
    for (var n = 1; n < mr.length; n++) {
      var r = mr[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    it !== null && yn(it, e),
      ot !== null && yn(ot, e),
      at !== null && yn(at, e),
      Un.forEach(t),
      $n.forEach(t),
      n = 0;
    n < et.length;
    n++
  )
    (r = et[n]), r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < et.length && ((n = et[0]), n.blockedOn === null); )
    ls(n), n.blockedOn === null && et.shift();
}
var qt = Ze.ReactCurrentBatchConfig,
  Wr = !0;
function Wc(e, t, n, r) {
  var l = j,
    i = qt.transition;
  qt.transition = null;
  try {
    (j = 1), po(e, t, n, r);
  } finally {
    (j = l), (qt.transition = i);
  }
}
function Hc(e, t, n, r) {
  var l = j,
    i = qt.transition;
  qt.transition = null;
  try {
    (j = 4), po(e, t, n, r);
  } finally {
    (j = l), (qt.transition = i);
  }
}
function po(e, t, n, r) {
  if (Wr) {
    var l = ki(e, t, n, r);
    if (l === null) Ql(e, t, r, Hr, n), sa(e, r);
    else if (Vc(l, e, t, n, r)) r.stopPropagation();
    else if ((sa(e, r), t & 4 && -1 < $c.indexOf(e))) {
      for (; l !== null; ) {
        var i = lr(l);
        if (
          (i !== null && es(i),
          (i = ki(e, t, n, r)),
          i === null && Ql(e, t, r, Hr, n),
          i === l)
        )
          break;
        l = i;
      }
      l !== null && r.stopPropagation();
    } else Ql(e, t, r, null, n);
  }
}
var Hr = null;
function ki(e, t, n, r) {
  if (((Hr = null), (e = uo(r)), (e = kt(e)), e !== null))
    if (((t = At(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = Ku(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return (Hr = e), null;
}
function is(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (zc()) {
        case so:
          return 1;
        case Zu:
          return 4;
        case Vr:
        case Rc:
          return 16;
        case Ju:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var nt = null,
  mo = null,
  Pr = null;
function os() {
  if (Pr) return Pr;
  var e,
    t = mo,
    n = t.length,
    r,
    l = "value" in nt ? nt.value : nt.textContent,
    i = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++);
  var o = n - e;
  for (r = 1; r <= o && t[n - r] === l[i - r]; r++);
  return (Pr = l.slice(e, 1 < r ? 1 - r : void 0));
}
function Ir(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function hr() {
  return !0;
}
function ca() {
  return !1;
}
function Se(e) {
  function t(n, r, l, i, o) {
    (this._reactName = n),
      (this._targetInst = l),
      (this.type = r),
      (this.nativeEvent = i),
      (this.target = o),
      (this.currentTarget = null);
    for (var a in e)
      e.hasOwnProperty(a) && ((n = e[a]), (this[a] = n ? n(i) : i[a]));
    return (
      (this.isDefaultPrevented = (
        i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1
      )
        ? hr
        : ca),
      (this.isPropagationStopped = ca),
      this
    );
  }
  return (
    B(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = hr));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = hr));
      },
      persist: function () {},
      isPersistent: hr,
    }),
    t
  );
}
var dn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  ho = Se(dn),
  rr = B({}, dn, { view: 0, detail: 0 }),
  Qc = Se(rr),
  Ml,
  Ol,
  wn,
  dl = B({}, rr, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: go,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== wn &&
            (wn && e.type === "mousemove"
              ? ((Ml = e.screenX - wn.screenX), (Ol = e.screenY - wn.screenY))
              : (Ol = Ml = 0),
            (wn = e)),
          Ml);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : Ol;
    },
  }),
  fa = Se(dl),
  Kc = B({}, dl, { dataTransfer: 0 }),
  Xc = Se(Kc),
  Yc = B({}, rr, { relatedTarget: 0 }),
  Fl = Se(Yc),
  Gc = B({}, dn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Zc = Se(Gc),
  Jc = B({}, dn, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  qc = Se(Jc),
  bc = B({}, dn, { data: 0 }),
  pa = Se(bc),
  ef = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  tf = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  nf = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function rf(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = nf[e]) ? !!t[e] : !1;
}
function go() {
  return rf;
}
var lf = B({}, rr, {
    key: function (e) {
      if (e.key) {
        var t = ef[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = Ir(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
        ? tf[e.keyCode] || "Unidentified"
        : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: go,
    charCode: function (e) {
      return e.type === "keypress" ? Ir(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? Ir(e)
        : e.type === "keydown" || e.type === "keyup"
        ? e.keyCode
        : 0;
    },
  }),
  of = Se(lf),
  af = B({}, dl, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  ma = Se(af),
  uf = B({}, rr, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: go,
  }),
  sf = Se(uf),
  df = B({}, dn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  cf = Se(df),
  ff = B({}, dl, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
        ? -e.wheelDeltaY
        : "wheelDelta" in e
        ? -e.wheelDelta
        : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  pf = Se(ff),
  mf = [9, 13, 27, 32],
  vo = Ke && "CompositionEvent" in window,
  In = null;
Ke && "documentMode" in document && (In = document.documentMode);
var hf = Ke && "TextEvent" in window && !In,
  as = Ke && (!vo || (In && 8 < In && 11 >= In)),
  ha = " ",
  ga = !1;
function us(e, t) {
  switch (e) {
    case "keyup":
      return mf.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function ss(e) {
  return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
}
var Ut = !1;
function gf(e, t) {
  switch (e) {
    case "compositionend":
      return ss(t);
    case "keypress":
      return t.which !== 32 ? null : ((ga = !0), ha);
    case "textInput":
      return (e = t.data), e === ha && ga ? null : e;
    default:
      return null;
  }
}
function vf(e, t) {
  if (Ut)
    return e === "compositionend" || (!vo && us(e, t))
      ? ((e = os()), (Pr = mo = nt = null), (Ut = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return as && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var yf = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function va(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!yf[e.type] : t === "textarea";
}
function ds(e, t, n, r) {
  Vu(r),
    (t = Qr(t, "onChange")),
    0 < t.length &&
      ((n = new ho("onChange", "change", null, n, r)),
      e.push({ event: n, listeners: t }));
}
var Dn = null,
  Bn = null;
function wf(e) {
  Ss(e, 0);
}
function cl(e) {
  var t = Bt(e);
  if (Au(t)) return e;
}
function Nf(e, t) {
  if (e === "change") return t;
}
var cs = !1;
if (Ke) {
  var Ul;
  if (Ke) {
    var $l = "oninput" in document;
    if (!$l) {
      var ya = document.createElement("div");
      ya.setAttribute("oninput", "return;"),
        ($l = typeof ya.oninput == "function");
    }
    Ul = $l;
  } else Ul = !1;
  cs = Ul && (!document.documentMode || 9 < document.documentMode);
}
function wa() {
  Dn && (Dn.detachEvent("onpropertychange", fs), (Bn = Dn = null));
}
function fs(e) {
  if (e.propertyName === "value" && cl(Bn)) {
    var t = [];
    ds(t, Bn, e, uo(e)), Qu(wf, t);
  }
}
function Sf(e, t, n) {
  e === "focusin"
    ? (wa(), (Dn = t), (Bn = n), Dn.attachEvent("onpropertychange", fs))
    : e === "focusout" && wa();
}
function kf(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return cl(Bn);
}
function xf(e, t) {
  if (e === "click") return cl(t);
}
function Cf(e, t) {
  if (e === "input" || e === "change") return cl(t);
}
function Ef(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var je = typeof Object.is == "function" ? Object.is : Ef;
function Wn(e, t) {
  if (je(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!li.call(t, l) || !je(e[l], t[l])) return !1;
  }
  return !0;
}
function Na(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Sa(e, t) {
  var n = Na(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t))
        return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = Na(n);
  }
}
function ps(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
      ? !1
      : t && t.nodeType === 3
      ? ps(e, t.parentNode)
      : "contains" in e
      ? e.contains(t)
      : e.compareDocumentPosition
      ? !!(e.compareDocumentPosition(t) & 16)
      : !1
    : !1;
}
function ms() {
  for (var e = window, t = Fr(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Fr(e.document);
  }
  return t;
}
function yo(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function Lf(e) {
  var t = ms(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    ps(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && yo(n)) {
      if (
        ((t = r.start),
        (e = r.end),
        e === void 0 && (e = t),
        "selectionStart" in n)
      )
        (n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var l = n.textContent.length,
          i = Math.min(r.start, l);
        (r = r.end === void 0 ? i : Math.min(r.end, l)),
          !e.extend && i > r && ((l = r), (r = i), (i = l)),
          (l = Sa(n, i));
        var o = Sa(n, r);
        l &&
          o &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== l.node ||
            e.anchorOffset !== l.offset ||
            e.focusNode !== o.node ||
            e.focusOffset !== o.offset) &&
          ((t = t.createRange()),
          t.setStart(l.node, l.offset),
          e.removeAllRanges(),
          i > r
            ? (e.addRange(t), e.extend(o.node, o.offset))
            : (t.setEnd(o.node, o.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
      (e = t[n]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top);
  }
}
var _f = Ke && "documentMode" in document && 11 >= document.documentMode,
  $t = null,
  xi = null,
  zn = null,
  Ci = !1;
function ka(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Ci ||
    $t == null ||
    $t !== Fr(r) ||
    ((r = $t),
    "selectionStart" in r && yo(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (zn && Wn(zn, r)) ||
      ((zn = r),
      (r = Qr(xi, "onSelect")),
      0 < r.length &&
        ((t = new ho("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = $t))));
}
function gr(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var Vt = {
    animationend: gr("Animation", "AnimationEnd"),
    animationiteration: gr("Animation", "AnimationIteration"),
    animationstart: gr("Animation", "AnimationStart"),
    transitionend: gr("Transition", "TransitionEnd"),
  },
  Vl = {},
  hs = {};
Ke &&
  ((hs = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete Vt.animationend.animation,
    delete Vt.animationiteration.animation,
    delete Vt.animationstart.animation),
  "TransitionEvent" in window || delete Vt.transitionend.transition);
function fl(e) {
  if (Vl[e]) return Vl[e];
  if (!Vt[e]) return e;
  var t = Vt[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in hs) return (Vl[e] = t[n]);
  return e;
}
var gs = fl("animationend"),
  vs = fl("animationiteration"),
  ys = fl("animationstart"),
  ws = fl("transitionend"),
  Ns = new Map(),
  xa =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " "
    );
function ht(e, t) {
  Ns.set(e, t), Tt(t, [e]);
}
for (var Bl = 0; Bl < xa.length; Bl++) {
  var Wl = xa[Bl],
    Pf = Wl.toLowerCase(),
    If = Wl[0].toUpperCase() + Wl.slice(1);
  ht(Pf, "on" + If);
}
ht(gs, "onAnimationEnd");
ht(vs, "onAnimationIteration");
ht(ys, "onAnimationStart");
ht("dblclick", "onDoubleClick");
ht("focusin", "onFocus");
ht("focusout", "onBlur");
ht(ws, "onTransitionEnd");
tn("onMouseEnter", ["mouseout", "mouseover"]);
tn("onMouseLeave", ["mouseout", "mouseover"]);
tn("onPointerEnter", ["pointerout", "pointerover"]);
tn("onPointerLeave", ["pointerout", "pointerover"]);
Tt(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(" ")
);
Tt(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " "
  )
);
Tt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Tt(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" ")
);
Tt(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" ")
);
Tt(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
);
var Ln =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " "
    ),
  Df = new Set("cancel close invalid load scroll toggle".split(" ").concat(Ln));
function Ca(e, t, n) {
  var r = e.type || "unknown-event";
  (e.currentTarget = n), _c(r, t, void 0, e), (e.currentTarget = null);
}
function Ss(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      l = r.event;
    r = r.listeners;
    e: {
      var i = void 0;
      if (t)
        for (var o = r.length - 1; 0 <= o; o--) {
          var a = r[o],
            u = a.instance,
            d = a.currentTarget;
          if (((a = a.listener), u !== i && l.isPropagationStopped())) break e;
          Ca(l, a, d), (i = u);
        }
      else
        for (o = 0; o < r.length; o++) {
          if (
            ((a = r[o]),
            (u = a.instance),
            (d = a.currentTarget),
            (a = a.listener),
            u !== i && l.isPropagationStopped())
          )
            break e;
          Ca(l, a, d), (i = u);
        }
    }
  }
  if ($r) throw ((e = wi), ($r = !1), (wi = null), e);
}
function O(e, t) {
  var n = t[Ii];
  n === void 0 && (n = t[Ii] = new Set());
  var r = e + "__bubble";
  n.has(r) || (ks(t, e, 2, !1), n.add(r));
}
function Hl(e, t, n) {
  var r = 0;
  t && (r |= 4), ks(n, e, r, t);
}
var vr = "_reactListening" + Math.random().toString(36).slice(2);
function Hn(e) {
  if (!e[vr]) {
    (e[vr] = !0),
      Iu.forEach(function (n) {
        n !== "selectionchange" && (Df.has(n) || Hl(n, !1, e), Hl(n, !0, e));
      });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[vr] || ((t[vr] = !0), Hl("selectionchange", !1, t));
  }
}
function ks(e, t, n, r) {
  switch (is(t)) {
    case 1:
      var l = Wc;
      break;
    case 4:
      l = Hc;
      break;
    default:
      l = po;
  }
  (n = l.bind(null, t, n, e)),
    (l = void 0),
    !yi ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (l = !0),
    r
      ? l !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: l })
        : e.addEventListener(t, n, !0)
      : l !== void 0
      ? e.addEventListener(t, n, { passive: l })
      : e.addEventListener(t, n, !1);
}
function Ql(e, t, n, r, l) {
  var i = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var o = r.tag;
      if (o === 3 || o === 4) {
        var a = r.stateNode.containerInfo;
        if (a === l || (a.nodeType === 8 && a.parentNode === l)) break;
        if (o === 4)
          for (o = r.return; o !== null; ) {
            var u = o.tag;
            if (
              (u === 3 || u === 4) &&
              ((u = o.stateNode.containerInfo),
              u === l || (u.nodeType === 8 && u.parentNode === l))
            )
              return;
            o = o.return;
          }
        for (; a !== null; ) {
          if (((o = kt(a)), o === null)) return;
          if (((u = o.tag), u === 5 || u === 6)) {
            r = i = o;
            continue e;
          }
          a = a.parentNode;
        }
      }
      r = r.return;
    }
  Qu(function () {
    var d = i,
      m = uo(n),
      f = [];
    e: {
      var h = Ns.get(e);
      if (h !== void 0) {
        var g = ho,
          v = e;
        switch (e) {
          case "keypress":
            if (Ir(n) === 0) break e;
          case "keydown":
          case "keyup":
            g = of;
            break;
          case "focusin":
            (v = "focus"), (g = Fl);
            break;
          case "focusout":
            (v = "blur"), (g = Fl);
            break;
          case "beforeblur":
          case "afterblur":
            g = Fl;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            g = fa;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            g = Xc;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            g = sf;
            break;
          case gs:
          case vs:
          case ys:
            g = Zc;
            break;
          case ws:
            g = cf;
            break;
          case "scroll":
            g = Qc;
            break;
          case "wheel":
            g = pf;
            break;
          case "copy":
          case "cut":
          case "paste":
            g = qc;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            g = ma;
        }
        var y = (t & 4) !== 0,
          k = !y && e === "scroll",
          c = y ? (h !== null ? h + "Capture" : null) : h;
        y = [];
        for (var s = d, p; s !== null; ) {
          p = s;
          var w = p.stateNode;
          if (
            (p.tag === 5 &&
              w !== null &&
              ((p = w),
              c !== null && ((w = Fn(s, c)), w != null && y.push(Qn(s, w, p)))),
            k)
          )
            break;
          s = s.return;
        }
        0 < y.length &&
          ((h = new g(h, v, null, n, m)), f.push({ event: h, listeners: y }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((h = e === "mouseover" || e === "pointerover"),
          (g = e === "mouseout" || e === "pointerout"),
          h &&
            n !== gi &&
            (v = n.relatedTarget || n.fromElement) &&
            (kt(v) || v[Xe]))
        )
          break e;
        if (
          (g || h) &&
          ((h =
            m.window === m
              ? m
              : (h = m.ownerDocument)
              ? h.defaultView || h.parentWindow
              : window),
          g
            ? ((v = n.relatedTarget || n.toElement),
              (g = d),
              (v = v ? kt(v) : null),
              v !== null &&
                ((k = At(v)), v !== k || (v.tag !== 5 && v.tag !== 6)) &&
                (v = null))
            : ((g = null), (v = d)),
          g !== v)
        ) {
          if (
            ((y = fa),
            (w = "onMouseLeave"),
            (c = "onMouseEnter"),
            (s = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((y = ma),
              (w = "onPointerLeave"),
              (c = "onPointerEnter"),
              (s = "pointer")),
            (k = g == null ? h : Bt(g)),
            (p = v == null ? h : Bt(v)),
            (h = new y(w, s + "leave", g, n, m)),
            (h.target = k),
            (h.relatedTarget = p),
            (w = null),
            kt(m) === d &&
              ((y = new y(c, s + "enter", v, n, m)),
              (y.target = p),
              (y.relatedTarget = k),
              (w = y)),
            (k = w),
            g && v)
          )
            t: {
              for (y = g, c = v, s = 0, p = y; p; p = Mt(p)) s++;
              for (p = 0, w = c; w; w = Mt(w)) p++;
              for (; 0 < s - p; ) (y = Mt(y)), s--;
              for (; 0 < p - s; ) (c = Mt(c)), p--;
              for (; s--; ) {
                if (y === c || (c !== null && y === c.alternate)) break t;
                (y = Mt(y)), (c = Mt(c));
              }
              y = null;
            }
          else y = null;
          g !== null && Ea(f, h, g, y, !1),
            v !== null && k !== null && Ea(f, k, v, y, !0);
        }
      }
      e: {
        if (
          ((h = d ? Bt(d) : window),
          (g = h.nodeName && h.nodeName.toLowerCase()),
          g === "select" || (g === "input" && h.type === "file"))
        )
          var S = Nf;
        else if (va(h))
          if (cs) S = Cf;
          else {
            S = kf;
            var L = Sf;
          }
        else
          (g = h.nodeName) &&
            g.toLowerCase() === "input" &&
            (h.type === "checkbox" || h.type === "radio") &&
            (S = xf);
        if (S && (S = S(e, d))) {
          ds(f, S, n, m);
          break e;
        }
        L && L(e, h, d),
          e === "focusout" &&
            (L = h._wrapperState) &&
            L.controlled &&
            h.type === "number" &&
            ci(h, "number", h.value);
      }
      switch (((L = d ? Bt(d) : window), e)) {
        case "focusin":
          (va(L) || L.contentEditable === "true") &&
            (($t = L), (xi = d), (zn = null));
          break;
        case "focusout":
          zn = xi = $t = null;
          break;
        case "mousedown":
          Ci = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          (Ci = !1), ka(f, n, m);
          break;
        case "selectionchange":
          if (_f) break;
        case "keydown":
        case "keyup":
          ka(f, n, m);
      }
      var _;
      if (vo)
        e: {
          switch (e) {
            case "compositionstart":
              var P = "onCompositionStart";
              break e;
            case "compositionend":
              P = "onCompositionEnd";
              break e;
            case "compositionupdate":
              P = "onCompositionUpdate";
              break e;
          }
          P = void 0;
        }
      else
        Ut
          ? us(e, n) && (P = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (P = "onCompositionStart");
      P &&
        (as &&
          n.locale !== "ko" &&
          (Ut || P !== "onCompositionStart"
            ? P === "onCompositionEnd" && Ut && (_ = os())
            : ((nt = m),
              (mo = "value" in nt ? nt.value : nt.textContent),
              (Ut = !0))),
        (L = Qr(d, P)),
        0 < L.length &&
          ((P = new pa(P, e, null, n, m)),
          f.push({ event: P, listeners: L }),
          _ ? (P.data = _) : ((_ = ss(n)), _ !== null && (P.data = _)))),
        (_ = hf ? gf(e, n) : vf(e, n)) &&
          ((d = Qr(d, "onBeforeInput")),
          0 < d.length &&
            ((m = new pa("onBeforeInput", "beforeinput", null, n, m)),
            f.push({ event: m, listeners: d }),
            (m.data = _)));
    }
    Ss(f, t);
  });
}
function Qn(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Qr(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e,
      i = l.stateNode;
    l.tag === 5 &&
      i !== null &&
      ((l = i),
      (i = Fn(e, n)),
      i != null && r.unshift(Qn(e, i, l)),
      (i = Fn(e, t)),
      i != null && r.push(Qn(e, i, l))),
      (e = e.return);
  }
  return r;
}
function Mt(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Ea(e, t, n, r, l) {
  for (var i = t._reactName, o = []; n !== null && n !== r; ) {
    var a = n,
      u = a.alternate,
      d = a.stateNode;
    if (u !== null && u === r) break;
    a.tag === 5 &&
      d !== null &&
      ((a = d),
      l
        ? ((u = Fn(n, i)), u != null && o.unshift(Qn(n, u, a)))
        : l || ((u = Fn(n, i)), u != null && o.push(Qn(n, u, a)))),
      (n = n.return);
  }
  o.length !== 0 && e.push({ event: t, listeners: o });
}
var zf = /\r\n?/g,
  Rf = /\u0000|\uFFFD/g;
function La(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      zf,
      `
`
    )
    .replace(Rf, "");
}
function yr(e, t, n) {
  if (((t = La(t)), La(e) !== t && n)) throw Error(N(425));
}
function Kr() {}
var Ei = null,
  Li = null;
function _i(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var Pi = typeof setTimeout == "function" ? setTimeout : void 0,
  Tf = typeof clearTimeout == "function" ? clearTimeout : void 0,
  _a = typeof Promise == "function" ? Promise : void 0,
  Af =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof _a < "u"
      ? function (e) {
          return _a.resolve(null).then(e).catch(jf);
        }
      : Pi;
function jf(e) {
  setTimeout(function () {
    throw e;
  });
}
function Kl(e, t) {
  var n = t,
    r = 0;
  do {
    var l = n.nextSibling;
    if ((e.removeChild(n), l && l.nodeType === 8))
      if (((n = l.data), n === "/$")) {
        if (r === 0) {
          e.removeChild(l), Vn(t);
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = l;
  } while (n);
  Vn(t);
}
function ut(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function Pa(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var cn = Math.random().toString(36).slice(2),
  Fe = "__reactFiber$" + cn,
  Kn = "__reactProps$" + cn,
  Xe = "__reactContainer$" + cn,
  Ii = "__reactEvents$" + cn,
  Mf = "__reactListeners$" + cn,
  Of = "__reactHandles$" + cn;
function kt(e) {
  var t = e[Fe];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[Xe] || n[Fe])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = Pa(e); e !== null; ) {
          if ((n = e[Fe])) return n;
          e = Pa(e);
        }
      return t;
    }
    (e = n), (n = e.parentNode);
  }
  return null;
}
function lr(e) {
  return (
    (e = e[Fe] || e[Xe]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function Bt(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(N(33));
}
function pl(e) {
  return e[Kn] || null;
}
var Di = [],
  Wt = -1;
function gt(e) {
  return { current: e };
}
function F(e) {
  0 > Wt || ((e.current = Di[Wt]), (Di[Wt] = null), Wt--);
}
function M(e, t) {
  Wt++, (Di[Wt] = e.current), (e.current = t);
}
var mt = {},
  oe = gt(mt),
  pe = gt(!1),
  Pt = mt;
function nn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return mt;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var l = {},
    i;
  for (i in n) l[i] = t[i];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = l)),
    l
  );
}
function me(e) {
  return (e = e.childContextTypes), e != null;
}
function Xr() {
  F(pe), F(oe);
}
function Ia(e, t, n) {
  if (oe.current !== mt) throw Error(N(168));
  M(oe, t), M(pe, n);
}
function xs(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
    return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(N(108, Nc(e) || "Unknown", l));
  return B({}, n, r);
}
function Yr(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || mt),
    (Pt = oe.current),
    M(oe, e),
    M(pe, pe.current),
    !0
  );
}
function Da(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(N(169));
  n
    ? ((e = xs(e, t, Pt)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      F(pe),
      F(oe),
      M(oe, e))
    : F(pe),
    M(pe, n);
}
var Be = null,
  ml = !1,
  Xl = !1;
function Cs(e) {
  Be === null ? (Be = [e]) : Be.push(e);
}
function Ff(e) {
  (ml = !0), Cs(e);
}
function vt() {
  if (!Xl && Be !== null) {
    Xl = !0;
    var e = 0,
      t = j;
    try {
      var n = Be;
      for (j = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      (Be = null), (ml = !1);
    } catch (l) {
      throw (Be !== null && (Be = Be.slice(e + 1)), Gu(so, vt), l);
    } finally {
      (j = t), (Xl = !1);
    }
  }
  return null;
}
var Ht = [],
  Qt = 0,
  Gr = null,
  Zr = 0,
  ke = [],
  xe = 0,
  It = null,
  We = 1,
  He = "";
function Nt(e, t) {
  (Ht[Qt++] = Zr), (Ht[Qt++] = Gr), (Gr = e), (Zr = t);
}
function Es(e, t, n) {
  (ke[xe++] = We), (ke[xe++] = He), (ke[xe++] = It), (It = e);
  var r = We;
  e = He;
  var l = 32 - Te(r) - 1;
  (r &= ~(1 << l)), (n += 1);
  var i = 32 - Te(t) + l;
  if (30 < i) {
    var o = l - (l % 5);
    (i = (r & ((1 << o) - 1)).toString(32)),
      (r >>= o),
      (l -= o),
      (We = (1 << (32 - Te(t) + l)) | (n << l) | r),
      (He = i + e);
  } else (We = (1 << i) | (n << l) | r), (He = e);
}
function wo(e) {
  e.return !== null && (Nt(e, 1), Es(e, 1, 0));
}
function No(e) {
  for (; e === Gr; )
    (Gr = Ht[--Qt]), (Ht[Qt] = null), (Zr = Ht[--Qt]), (Ht[Qt] = null);
  for (; e === It; )
    (It = ke[--xe]),
      (ke[xe] = null),
      (He = ke[--xe]),
      (ke[xe] = null),
      (We = ke[--xe]),
      (ke[xe] = null);
}
var ye = null,
  ve = null,
  U = !1,
  Re = null;
function Ls(e, t) {
  var n = Ce(5, null, null, 0);
  (n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function za(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (ye = e), (ve = ut(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (ye = e), (ve = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = It !== null ? { id: We, overflow: He } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = Ce(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (ye = e),
            (ve = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function zi(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Ri(e) {
  if (U) {
    var t = ve;
    if (t) {
      var n = t;
      if (!za(e, t)) {
        if (zi(e)) throw Error(N(418));
        t = ut(n.nextSibling);
        var r = ye;
        t && za(e, t)
          ? Ls(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (U = !1), (ye = e));
      }
    } else {
      if (zi(e)) throw Error(N(418));
      (e.flags = (e.flags & -4097) | 2), (U = !1), (ye = e);
    }
  }
}
function Ra(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  ye = e;
}
function wr(e) {
  if (e !== ye) return !1;
  if (!U) return Ra(e), (U = !0), !1;
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== "head" && t !== "body" && !_i(e.type, e.memoizedProps))),
    t && (t = ve))
  ) {
    if (zi(e)) throw (_s(), Error(N(418)));
    for (; t; ) Ls(e, t), (t = ut(t.nextSibling));
  }
  if ((Ra(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(N(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              ve = ut(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      ve = null;
    }
  } else ve = ye ? ut(e.stateNode.nextSibling) : null;
  return !0;
}
function _s() {
  for (var e = ve; e; ) e = ut(e.nextSibling);
}
function rn() {
  (ve = ye = null), (U = !1);
}
function So(e) {
  Re === null ? (Re = [e]) : Re.push(e);
}
var Uf = Ze.ReactCurrentBatchConfig;
function Nn(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(N(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(N(147, e));
      var l = r,
        i = "" + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == "function" &&
        t.ref._stringRef === i
        ? t.ref
        : ((t = function (o) {
            var a = l.refs;
            o === null ? delete a[i] : (a[i] = o);
          }),
          (t._stringRef = i),
          t);
    }
    if (typeof e != "string") throw Error(N(284));
    if (!n._owner) throw Error(N(290, e));
  }
  return e;
}
function Nr(e, t) {
  throw (
    ((e = Object.prototype.toString.call(t)),
    Error(
      N(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e
      )
    ))
  );
}
function Ta(e) {
  var t = e._init;
  return t(e._payload);
}
function Ps(e) {
  function t(c, s) {
    if (e) {
      var p = c.deletions;
      p === null ? ((c.deletions = [s]), (c.flags |= 16)) : p.push(s);
    }
  }
  function n(c, s) {
    if (!e) return null;
    for (; s !== null; ) t(c, s), (s = s.sibling);
    return null;
  }
  function r(c, s) {
    for (c = new Map(); s !== null; )
      s.key !== null ? c.set(s.key, s) : c.set(s.index, s), (s = s.sibling);
    return c;
  }
  function l(c, s) {
    return (c = ft(c, s)), (c.index = 0), (c.sibling = null), c;
  }
  function i(c, s, p) {
    return (
      (c.index = p),
      e
        ? ((p = c.alternate),
          p !== null
            ? ((p = p.index), p < s ? ((c.flags |= 2), s) : p)
            : ((c.flags |= 2), s))
        : ((c.flags |= 1048576), s)
    );
  }
  function o(c) {
    return e && c.alternate === null && (c.flags |= 2), c;
  }
  function a(c, s, p, w) {
    return s === null || s.tag !== 6
      ? ((s = ei(p, c.mode, w)), (s.return = c), s)
      : ((s = l(s, p)), (s.return = c), s);
  }
  function u(c, s, p, w) {
    var S = p.type;
    return S === Ft
      ? m(c, s, p.props.children, w, p.key)
      : s !== null &&
        (s.elementType === S ||
          (typeof S == "object" &&
            S !== null &&
            S.$$typeof === qe &&
            Ta(S) === s.type))
      ? ((w = l(s, p.props)), (w.ref = Nn(c, s, p)), (w.return = c), w)
      : ((w = Mr(p.type, p.key, p.props, null, c.mode, w)),
        (w.ref = Nn(c, s, p)),
        (w.return = c),
        w);
  }
  function d(c, s, p, w) {
    return s === null ||
      s.tag !== 4 ||
      s.stateNode.containerInfo !== p.containerInfo ||
      s.stateNode.implementation !== p.implementation
      ? ((s = ti(p, c.mode, w)), (s.return = c), s)
      : ((s = l(s, p.children || [])), (s.return = c), s);
  }
  function m(c, s, p, w, S) {
    return s === null || s.tag !== 7
      ? ((s = Lt(p, c.mode, w, S)), (s.return = c), s)
      : ((s = l(s, p)), (s.return = c), s);
  }
  function f(c, s, p) {
    if ((typeof s == "string" && s !== "") || typeof s == "number")
      return (s = ei("" + s, c.mode, p)), (s.return = c), s;
    if (typeof s == "object" && s !== null) {
      switch (s.$$typeof) {
        case sr:
          return (
            (p = Mr(s.type, s.key, s.props, null, c.mode, p)),
            (p.ref = Nn(c, null, s)),
            (p.return = c),
            p
          );
        case Ot:
          return (s = ti(s, c.mode, p)), (s.return = c), s;
        case qe:
          var w = s._init;
          return f(c, w(s._payload), p);
      }
      if (Cn(s) || hn(s))
        return (s = Lt(s, c.mode, p, null)), (s.return = c), s;
      Nr(c, s);
    }
    return null;
  }
  function h(c, s, p, w) {
    var S = s !== null ? s.key : null;
    if ((typeof p == "string" && p !== "") || typeof p == "number")
      return S !== null ? null : a(c, s, "" + p, w);
    if (typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case sr:
          return p.key === S ? u(c, s, p, w) : null;
        case Ot:
          return p.key === S ? d(c, s, p, w) : null;
        case qe:
          return (S = p._init), h(c, s, S(p._payload), w);
      }
      if (Cn(p) || hn(p)) return S !== null ? null : m(c, s, p, w, null);
      Nr(c, p);
    }
    return null;
  }
  function g(c, s, p, w, S) {
    if ((typeof w == "string" && w !== "") || typeof w == "number")
      return (c = c.get(p) || null), a(s, c, "" + w, S);
    if (typeof w == "object" && w !== null) {
      switch (w.$$typeof) {
        case sr:
          return (c = c.get(w.key === null ? p : w.key) || null), u(s, c, w, S);
        case Ot:
          return (c = c.get(w.key === null ? p : w.key) || null), d(s, c, w, S);
        case qe:
          var L = w._init;
          return g(c, s, p, L(w._payload), S);
      }
      if (Cn(w) || hn(w)) return (c = c.get(p) || null), m(s, c, w, S, null);
      Nr(s, w);
    }
    return null;
  }
  function v(c, s, p, w) {
    for (
      var S = null, L = null, _ = s, P = (s = 0), H = null;
      _ !== null && P < p.length;
      P++
    ) {
      _.index > P ? ((H = _), (_ = null)) : (H = _.sibling);
      var T = h(c, _, p[P], w);
      if (T === null) {
        _ === null && (_ = H);
        break;
      }
      e && _ && T.alternate === null && t(c, _),
        (s = i(T, s, P)),
        L === null ? (S = T) : (L.sibling = T),
        (L = T),
        (_ = H);
    }
    if (P === p.length) return n(c, _), U && Nt(c, P), S;
    if (_ === null) {
      for (; P < p.length; P++)
        (_ = f(c, p[P], w)),
          _ !== null &&
            ((s = i(_, s, P)), L === null ? (S = _) : (L.sibling = _), (L = _));
      return U && Nt(c, P), S;
    }
    for (_ = r(c, _); P < p.length; P++)
      (H = g(_, c, P, p[P], w)),
        H !== null &&
          (e && H.alternate !== null && _.delete(H.key === null ? P : H.key),
          (s = i(H, s, P)),
          L === null ? (S = H) : (L.sibling = H),
          (L = H));
    return (
      e &&
        _.forEach(function (Pe) {
          return t(c, Pe);
        }),
      U && Nt(c, P),
      S
    );
  }
  function y(c, s, p, w) {
    var S = hn(p);
    if (typeof S != "function") throw Error(N(150));
    if (((p = S.call(p)), p == null)) throw Error(N(151));
    for (
      var L = (S = null), _ = s, P = (s = 0), H = null, T = p.next();
      _ !== null && !T.done;
      P++, T = p.next()
    ) {
      _.index > P ? ((H = _), (_ = null)) : (H = _.sibling);
      var Pe = h(c, _, T.value, w);
      if (Pe === null) {
        _ === null && (_ = H);
        break;
      }
      e && _ && Pe.alternate === null && t(c, _),
        (s = i(Pe, s, P)),
        L === null ? (S = Pe) : (L.sibling = Pe),
        (L = Pe),
        (_ = H);
    }
    if (T.done) return n(c, _), U && Nt(c, P), S;
    if (_ === null) {
      for (; !T.done; P++, T = p.next())
        (T = f(c, T.value, w)),
          T !== null &&
            ((s = i(T, s, P)), L === null ? (S = T) : (L.sibling = T), (L = T));
      return U && Nt(c, P), S;
    }
    for (_ = r(c, _); !T.done; P++, T = p.next())
      (T = g(_, c, P, T.value, w)),
        T !== null &&
          (e && T.alternate !== null && _.delete(T.key === null ? P : T.key),
          (s = i(T, s, P)),
          L === null ? (S = T) : (L.sibling = T),
          (L = T));
    return (
      e &&
        _.forEach(function (pn) {
          return t(c, pn);
        }),
      U && Nt(c, P),
      S
    );
  }
  function k(c, s, p, w) {
    if (
      (typeof p == "object" &&
        p !== null &&
        p.type === Ft &&
        p.key === null &&
        (p = p.props.children),
      typeof p == "object" && p !== null)
    ) {
      switch (p.$$typeof) {
        case sr:
          e: {
            for (var S = p.key, L = s; L !== null; ) {
              if (L.key === S) {
                if (((S = p.type), S === Ft)) {
                  if (L.tag === 7) {
                    n(c, L.sibling),
                      (s = l(L, p.props.children)),
                      (s.return = c),
                      (c = s);
                    break e;
                  }
                } else if (
                  L.elementType === S ||
                  (typeof S == "object" &&
                    S !== null &&
                    S.$$typeof === qe &&
                    Ta(S) === L.type)
                ) {
                  n(c, L.sibling),
                    (s = l(L, p.props)),
                    (s.ref = Nn(c, L, p)),
                    (s.return = c),
                    (c = s);
                  break e;
                }
                n(c, L);
                break;
              } else t(c, L);
              L = L.sibling;
            }
            p.type === Ft
              ? ((s = Lt(p.props.children, c.mode, w, p.key)),
                (s.return = c),
                (c = s))
              : ((w = Mr(p.type, p.key, p.props, null, c.mode, w)),
                (w.ref = Nn(c, s, p)),
                (w.return = c),
                (c = w));
          }
          return o(c);
        case Ot:
          e: {
            for (L = p.key; s !== null; ) {
              if (s.key === L)
                if (
                  s.tag === 4 &&
                  s.stateNode.containerInfo === p.containerInfo &&
                  s.stateNode.implementation === p.implementation
                ) {
                  n(c, s.sibling),
                    (s = l(s, p.children || [])),
                    (s.return = c),
                    (c = s);
                  break e;
                } else {
                  n(c, s);
                  break;
                }
              else t(c, s);
              s = s.sibling;
            }
            (s = ti(p, c.mode, w)), (s.return = c), (c = s);
          }
          return o(c);
        case qe:
          return (L = p._init), k(c, s, L(p._payload), w);
      }
      if (Cn(p)) return v(c, s, p, w);
      if (hn(p)) return y(c, s, p, w);
      Nr(c, p);
    }
    return (typeof p == "string" && p !== "") || typeof p == "number"
      ? ((p = "" + p),
        s !== null && s.tag === 6
          ? (n(c, s.sibling), (s = l(s, p)), (s.return = c), (c = s))
          : (n(c, s), (s = ei(p, c.mode, w)), (s.return = c), (c = s)),
        o(c))
      : n(c, s);
  }
  return k;
}
var ln = Ps(!0),
  Is = Ps(!1),
  Jr = gt(null),
  qr = null,
  Kt = null,
  ko = null;
function xo() {
  ko = Kt = qr = null;
}
function Co(e) {
  var t = Jr.current;
  F(Jr), (e._currentValue = t);
}
function Ti(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function bt(e, t) {
  (qr = e),
    (ko = Kt = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (fe = !0), (e.firstContext = null));
}
function Le(e) {
  var t = e._currentValue;
  if (ko !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), Kt === null)) {
      if (qr === null) throw Error(N(308));
      (Kt = e), (qr.dependencies = { lanes: 0, firstContext: e });
    } else Kt = Kt.next = e;
  return t;
}
var xt = null;
function Eo(e) {
  xt === null ? (xt = [e]) : xt.push(e);
}
function Ds(e, t, n, r) {
  var l = t.interleaved;
  return (
    l === null ? ((n.next = n), Eo(t)) : ((n.next = l.next), (l.next = n)),
    (t.interleaved = n),
    Ye(e, r)
  );
}
function Ye(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    (e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return);
  return n.tag === 3 ? n.stateNode : null;
}
var be = !1;
function Lo(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function zs(e, t) {
  (e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      });
}
function Qe(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function st(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), A & 2)) {
    var l = r.pending;
    return (
      l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)),
      (r.pending = t),
      Ye(e, n)
    );
  }
  return (
    (l = r.interleaved),
    l === null ? ((t.next = t), Eo(r)) : ((t.next = l.next), (l.next = t)),
    (r.interleaved = t),
    Ye(e, n)
  );
}
function Dr(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), co(e, n);
  }
}
function Aa(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var l = null,
      i = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var o = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        i === null ? (l = i = o) : (i = i.next = o), (n = n.next);
      } while (n !== null);
      i === null ? (l = i = t) : (i = i.next = t);
    } else l = i = t;
    (n = {
      baseState: r.baseState,
      firstBaseUpdate: l,
      lastBaseUpdate: i,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n);
    return;
  }
  (e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t);
}
function br(e, t, n, r) {
  var l = e.updateQueue;
  be = !1;
  var i = l.firstBaseUpdate,
    o = l.lastBaseUpdate,
    a = l.shared.pending;
  if (a !== null) {
    l.shared.pending = null;
    var u = a,
      d = u.next;
    (u.next = null), o === null ? (i = d) : (o.next = d), (o = u);
    var m = e.alternate;
    m !== null &&
      ((m = m.updateQueue),
      (a = m.lastBaseUpdate),
      a !== o &&
        (a === null ? (m.firstBaseUpdate = d) : (a.next = d),
        (m.lastBaseUpdate = u)));
  }
  if (i !== null) {
    var f = l.baseState;
    (o = 0), (m = d = u = null), (a = i);
    do {
      var h = a.lane,
        g = a.eventTime;
      if ((r & h) === h) {
        m !== null &&
          (m = m.next =
            {
              eventTime: g,
              lane: 0,
              tag: a.tag,
              payload: a.payload,
              callback: a.callback,
              next: null,
            });
        e: {
          var v = e,
            y = a;
          switch (((h = t), (g = n), y.tag)) {
            case 1:
              if (((v = y.payload), typeof v == "function")) {
                f = v.call(g, f, h);
                break e;
              }
              f = v;
              break e;
            case 3:
              v.flags = (v.flags & -65537) | 128;
            case 0:
              if (
                ((v = y.payload),
                (h = typeof v == "function" ? v.call(g, f, h) : v),
                h == null)
              )
                break e;
              f = B({}, f, h);
              break e;
            case 2:
              be = !0;
          }
        }
        a.callback !== null &&
          a.lane !== 0 &&
          ((e.flags |= 64),
          (h = l.effects),
          h === null ? (l.effects = [a]) : h.push(a));
      } else
        (g = {
          eventTime: g,
          lane: h,
          tag: a.tag,
          payload: a.payload,
          callback: a.callback,
          next: null,
        }),
          m === null ? ((d = m = g), (u = f)) : (m = m.next = g),
          (o |= h);
      if (((a = a.next), a === null)) {
        if (((a = l.shared.pending), a === null)) break;
        (h = a),
          (a = h.next),
          (h.next = null),
          (l.lastBaseUpdate = h),
          (l.shared.pending = null);
      }
    } while (!0);
    if (
      (m === null && (u = f),
      (l.baseState = u),
      (l.firstBaseUpdate = d),
      (l.lastBaseUpdate = m),
      (t = l.shared.interleaved),
      t !== null)
    ) {
      l = t;
      do (o |= l.lane), (l = l.next);
      while (l !== t);
    } else i === null && (l.shared.lanes = 0);
    (zt |= o), (e.lanes = o), (e.memoizedState = f);
  }
}
function ja(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        l = r.callback;
      if (l !== null) {
        if (((r.callback = null), (r = n), typeof l != "function"))
          throw Error(N(191, l));
        l.call(r);
      }
    }
}
var ir = {},
  $e = gt(ir),
  Xn = gt(ir),
  Yn = gt(ir);
function Ct(e) {
  if (e === ir) throw Error(N(174));
  return e;
}
function _o(e, t) {
  switch ((M(Yn, t), M(Xn, e), M($e, ir), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : pi(null, "");
      break;
    default:
      (e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = pi(t, e));
  }
  F($e), M($e, t);
}
function on() {
  F($e), F(Xn), F(Yn);
}
function Rs(e) {
  Ct(Yn.current);
  var t = Ct($e.current),
    n = pi(t, e.type);
  t !== n && (M(Xn, e), M($e, n));
}
function Po(e) {
  Xn.current === e && (F($e), F(Xn));
}
var $ = gt(0);
function el(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      (t.child.return = t), (t = t.child);
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    (t.sibling.return = t.return), (t = t.sibling);
  }
  return null;
}
var Yl = [];
function Io() {
  for (var e = 0; e < Yl.length; e++)
    Yl[e]._workInProgressVersionPrimary = null;
  Yl.length = 0;
}
var zr = Ze.ReactCurrentDispatcher,
  Gl = Ze.ReactCurrentBatchConfig,
  Dt = 0,
  V = null,
  Y = null,
  q = null,
  tl = !1,
  Rn = !1,
  Gn = 0,
  $f = 0;
function re() {
  throw Error(N(321));
}
function Do(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!je(e[n], t[n])) return !1;
  return !0;
}
function zo(e, t, n, r, l, i) {
  if (
    ((Dt = i),
    (V = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (zr.current = e === null || e.memoizedState === null ? Hf : Qf),
    (e = n(r, l)),
    Rn)
  ) {
    i = 0;
    do {
      if (((Rn = !1), (Gn = 0), 25 <= i)) throw Error(N(301));
      (i += 1),
        (q = Y = null),
        (t.updateQueue = null),
        (zr.current = Kf),
        (e = n(r, l));
    } while (Rn);
  }
  if (
    ((zr.current = nl),
    (t = Y !== null && Y.next !== null),
    (Dt = 0),
    (q = Y = V = null),
    (tl = !1),
    t)
  )
    throw Error(N(300));
  return e;
}
function Ro() {
  var e = Gn !== 0;
  return (Gn = 0), e;
}
function Oe() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return q === null ? (V.memoizedState = q = e) : (q = q.next = e), q;
}
function _e() {
  if (Y === null) {
    var e = V.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = Y.next;
  var t = q === null ? V.memoizedState : q.next;
  if (t !== null) (q = t), (Y = e);
  else {
    if (e === null) throw Error(N(310));
    (Y = e),
      (e = {
        memoizedState: Y.memoizedState,
        baseState: Y.baseState,
        baseQueue: Y.baseQueue,
        queue: Y.queue,
        next: null,
      }),
      q === null ? (V.memoizedState = q = e) : (q = q.next = e);
  }
  return q;
}
function Zn(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Zl(e) {
  var t = _e(),
    n = t.queue;
  if (n === null) throw Error(N(311));
  n.lastRenderedReducer = e;
  var r = Y,
    l = r.baseQueue,
    i = n.pending;
  if (i !== null) {
    if (l !== null) {
      var o = l.next;
      (l.next = i.next), (i.next = o);
    }
    (r.baseQueue = l = i), (n.pending = null);
  }
  if (l !== null) {
    (i = l.next), (r = r.baseState);
    var a = (o = null),
      u = null,
      d = i;
    do {
      var m = d.lane;
      if ((Dt & m) === m)
        u !== null &&
          (u = u.next =
            {
              lane: 0,
              action: d.action,
              hasEagerState: d.hasEagerState,
              eagerState: d.eagerState,
              next: null,
            }),
          (r = d.hasEagerState ? d.eagerState : e(r, d.action));
      else {
        var f = {
          lane: m,
          action: d.action,
          hasEagerState: d.hasEagerState,
          eagerState: d.eagerState,
          next: null,
        };
        u === null ? ((a = u = f), (o = r)) : (u = u.next = f),
          (V.lanes |= m),
          (zt |= m);
      }
      d = d.next;
    } while (d !== null && d !== i);
    u === null ? (o = r) : (u.next = a),
      je(r, t.memoizedState) || (fe = !0),
      (t.memoizedState = r),
      (t.baseState = o),
      (t.baseQueue = u),
      (n.lastRenderedState = r);
  }
  if (((e = n.interleaved), e !== null)) {
    l = e;
    do (i = l.lane), (V.lanes |= i), (zt |= i), (l = l.next);
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Jl(e) {
  var t = _e(),
    n = t.queue;
  if (n === null) throw Error(N(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    l = n.pending,
    i = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var o = (l = l.next);
    do (i = e(i, o.action)), (o = o.next);
    while (o !== l);
    je(i, t.memoizedState) || (fe = !0),
      (t.memoizedState = i),
      t.baseQueue === null && (t.baseState = i),
      (n.lastRenderedState = i);
  }
  return [i, r];
}
function Ts() {}
function As(e, t) {
  var n = V,
    r = _e(),
    l = t(),
    i = !je(r.memoizedState, l);
  if (
    (i && ((r.memoizedState = l), (fe = !0)),
    (r = r.queue),
    To(Os.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || i || (q !== null && q.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      Jn(9, Ms.bind(null, n, r, l, t), void 0, null),
      b === null)
    )
      throw Error(N(349));
    Dt & 30 || js(n, t, l);
  }
  return l;
}
function js(e, t, n) {
  (e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = V.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (V.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
}
function Ms(e, t, n, r) {
  (t.value = n), (t.getSnapshot = r), Fs(t) && Us(e);
}
function Os(e, t, n) {
  return n(function () {
    Fs(t) && Us(e);
  });
}
function Fs(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !je(e, n);
  } catch {
    return !0;
  }
}
function Us(e) {
  var t = Ye(e, 1);
  t !== null && Ae(t, e, 1, -1);
}
function Ma(e) {
  var t = Oe();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Zn,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = Wf.bind(null, V, e)),
    [t.memoizedState, e]
  );
}
function Jn(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = V.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (V.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function $s() {
  return _e().memoizedState;
}
function Rr(e, t, n, r) {
  var l = Oe();
  (V.flags |= e),
    (l.memoizedState = Jn(1 | t, n, void 0, r === void 0 ? null : r));
}
function hl(e, t, n, r) {
  var l = _e();
  r = r === void 0 ? null : r;
  var i = void 0;
  if (Y !== null) {
    var o = Y.memoizedState;
    if (((i = o.destroy), r !== null && Do(r, o.deps))) {
      l.memoizedState = Jn(t, n, i, r);
      return;
    }
  }
  (V.flags |= e), (l.memoizedState = Jn(1 | t, n, i, r));
}
function Oa(e, t) {
  return Rr(8390656, 8, e, t);
}
function To(e, t) {
  return hl(2048, 8, e, t);
}
function Vs(e, t) {
  return hl(4, 2, e, t);
}
function Bs(e, t) {
  return hl(4, 4, e, t);
}
function Ws(e, t) {
  if (typeof t == "function")
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function Hs(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null), hl(4, 4, Ws.bind(null, t, e), n)
  );
}
function Ao() {}
function Qs(e, t) {
  var n = _e();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Do(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function Ks(e, t) {
  var n = _e();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Do(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function Xs(e, t, n) {
  return Dt & 21
    ? (je(n, t) || ((n = qu()), (V.lanes |= n), (zt |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (fe = !0)), (e.memoizedState = n));
}
function Vf(e, t) {
  var n = j;
  (j = n !== 0 && 4 > n ? n : 4), e(!0);
  var r = Gl.transition;
  Gl.transition = {};
  try {
    e(!1), t();
  } finally {
    (j = n), (Gl.transition = r);
  }
}
function Ys() {
  return _e().memoizedState;
}
function Bf(e, t, n) {
  var r = ct(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    Gs(e))
  )
    Zs(t, n);
  else if (((n = Ds(e, t, n, r)), n !== null)) {
    var l = ue();
    Ae(n, e, r, l), Js(n, t, r);
  }
}
function Wf(e, t, n) {
  var r = ct(e),
    l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Gs(e)) Zs(t, l);
  else {
    var i = e.alternate;
    if (
      e.lanes === 0 &&
      (i === null || i.lanes === 0) &&
      ((i = t.lastRenderedReducer), i !== null)
    )
      try {
        var o = t.lastRenderedState,
          a = i(o, n);
        if (((l.hasEagerState = !0), (l.eagerState = a), je(a, o))) {
          var u = t.interleaved;
          u === null
            ? ((l.next = l), Eo(t))
            : ((l.next = u.next), (u.next = l)),
            (t.interleaved = l);
          return;
        }
      } catch {
      } finally {
      }
    (n = Ds(e, t, l, r)),
      n !== null && ((l = ue()), Ae(n, e, r, l), Js(n, t, r));
  }
}
function Gs(e) {
  var t = e.alternate;
  return e === V || (t !== null && t === V);
}
function Zs(e, t) {
  Rn = tl = !0;
  var n = e.pending;
  n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t);
}
function Js(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), co(e, n);
  }
}
var nl = {
    readContext: Le,
    useCallback: re,
    useContext: re,
    useEffect: re,
    useImperativeHandle: re,
    useInsertionEffect: re,
    useLayoutEffect: re,
    useMemo: re,
    useReducer: re,
    useRef: re,
    useState: re,
    useDebugValue: re,
    useDeferredValue: re,
    useTransition: re,
    useMutableSource: re,
    useSyncExternalStore: re,
    useId: re,
    unstable_isNewReconciler: !1,
  },
  Hf = {
    readContext: Le,
    useCallback: function (e, t) {
      return (Oe().memoizedState = [e, t === void 0 ? null : t]), e;
    },
    useContext: Le,
    useEffect: Oa,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        Rr(4194308, 4, Ws.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return Rr(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return Rr(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = Oe();
      return (
        (t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e
      );
    },
    useReducer: function (e, t, n) {
      var r = Oe();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = Bf.bind(null, V, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = Oe();
      return (e = { current: e }), (t.memoizedState = e);
    },
    useState: Ma,
    useDebugValue: Ao,
    useDeferredValue: function (e) {
      return (Oe().memoizedState = e);
    },
    useTransition: function () {
      var e = Ma(!1),
        t = e[0];
      return (e = Vf.bind(null, e[1])), (Oe().memoizedState = e), [t, e];
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = V,
        l = Oe();
      if (U) {
        if (n === void 0) throw Error(N(407));
        n = n();
      } else {
        if (((n = t()), b === null)) throw Error(N(349));
        Dt & 30 || js(r, t, n);
      }
      l.memoizedState = n;
      var i = { value: n, getSnapshot: t };
      return (
        (l.queue = i),
        Oa(Os.bind(null, r, i, e), [e]),
        (r.flags |= 2048),
        Jn(9, Ms.bind(null, r, i, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = Oe(),
        t = b.identifierPrefix;
      if (U) {
        var n = He,
          r = We;
        (n = (r & ~(1 << (32 - Te(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = Gn++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":");
      } else (n = $f++), (t = ":" + t + "r" + n.toString(32) + ":");
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  Qf = {
    readContext: Le,
    useCallback: Qs,
    useContext: Le,
    useEffect: To,
    useImperativeHandle: Hs,
    useInsertionEffect: Vs,
    useLayoutEffect: Bs,
    useMemo: Ks,
    useReducer: Zl,
    useRef: $s,
    useState: function () {
      return Zl(Zn);
    },
    useDebugValue: Ao,
    useDeferredValue: function (e) {
      var t = _e();
      return Xs(t, Y.memoizedState, e);
    },
    useTransition: function () {
      var e = Zl(Zn)[0],
        t = _e().memoizedState;
      return [e, t];
    },
    useMutableSource: Ts,
    useSyncExternalStore: As,
    useId: Ys,
    unstable_isNewReconciler: !1,
  },
  Kf = {
    readContext: Le,
    useCallback: Qs,
    useContext: Le,
    useEffect: To,
    useImperativeHandle: Hs,
    useInsertionEffect: Vs,
    useLayoutEffect: Bs,
    useMemo: Ks,
    useReducer: Jl,
    useRef: $s,
    useState: function () {
      return Jl(Zn);
    },
    useDebugValue: Ao,
    useDeferredValue: function (e) {
      var t = _e();
      return Y === null ? (t.memoizedState = e) : Xs(t, Y.memoizedState, e);
    },
    useTransition: function () {
      var e = Jl(Zn)[0],
        t = _e().memoizedState;
      return [e, t];
    },
    useMutableSource: Ts,
    useSyncExternalStore: As,
    useId: Ys,
    unstable_isNewReconciler: !1,
  };
function De(e, t) {
  if (e && e.defaultProps) {
    (t = B({}, t)), (e = e.defaultProps);
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Ai(e, t, n, r) {
  (t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : B({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n);
}
var gl = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? At(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = ue(),
      l = ct(e),
      i = Qe(r, l);
    (i.payload = t),
      n != null && (i.callback = n),
      (t = st(e, i, l)),
      t !== null && (Ae(t, e, l, r), Dr(t, e, l));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = ue(),
      l = ct(e),
      i = Qe(r, l);
    (i.tag = 1),
      (i.payload = t),
      n != null && (i.callback = n),
      (t = st(e, i, l)),
      t !== null && (Ae(t, e, l, r), Dr(t, e, l));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = ue(),
      r = ct(e),
      l = Qe(n, r);
    (l.tag = 2),
      t != null && (l.callback = t),
      (t = st(e, l, r)),
      t !== null && (Ae(t, e, r, n), Dr(t, e, r));
  },
};
function Fa(e, t, n, r, l, i, o) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, i, o)
      : t.prototype && t.prototype.isPureReactComponent
      ? !Wn(n, r) || !Wn(l, i)
      : !0
  );
}
function qs(e, t, n) {
  var r = !1,
    l = mt,
    i = t.contextType;
  return (
    typeof i == "object" && i !== null
      ? (i = Le(i))
      : ((l = me(t) ? Pt : oe.current),
        (r = t.contextTypes),
        (i = (r = r != null) ? nn(e, l) : mt)),
    (t = new t(n, i)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = gl),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = l),
      (e.__reactInternalMemoizedMaskedChildContext = i)),
    t
  );
}
function Ua(e, t, n, r) {
  (e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && gl.enqueueReplaceState(t, t.state, null);
}
function ji(e, t, n, r) {
  var l = e.stateNode;
  (l.props = n), (l.state = e.memoizedState), (l.refs = {}), Lo(e);
  var i = t.contextType;
  typeof i == "object" && i !== null
    ? (l.context = Le(i))
    : ((i = me(t) ? Pt : oe.current), (l.context = nn(e, i))),
    (l.state = e.memoizedState),
    (i = t.getDerivedStateFromProps),
    typeof i == "function" && (Ai(e, t, i, n), (l.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof l.getSnapshotBeforeUpdate == "function" ||
      (typeof l.UNSAFE_componentWillMount != "function" &&
        typeof l.componentWillMount != "function") ||
      ((t = l.state),
      typeof l.componentWillMount == "function" && l.componentWillMount(),
      typeof l.UNSAFE_componentWillMount == "function" &&
        l.UNSAFE_componentWillMount(),
      t !== l.state && gl.enqueueReplaceState(l, l.state, null),
      br(e, n, l, r),
      (l.state = e.memoizedState)),
    typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function an(e, t) {
  try {
    var n = "",
      r = t;
    do (n += wc(r)), (r = r.return);
    while (r);
    var l = n;
  } catch (i) {
    l =
      `
Error generating stack: ` +
      i.message +
      `
` +
      i.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function ql(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Mi(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var Xf = typeof WeakMap == "function" ? WeakMap : Map;
function bs(e, t, n) {
  (n = Qe(-1, n)), (n.tag = 3), (n.payload = { element: null });
  var r = t.value;
  return (
    (n.callback = function () {
      ll || ((ll = !0), (Ki = r)), Mi(e, t);
    }),
    n
  );
}
function ed(e, t, n) {
  (n = Qe(-1, n)), (n.tag = 3);
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    (n.payload = function () {
      return r(l);
    }),
      (n.callback = function () {
        Mi(e, t);
      });
  }
  var i = e.stateNode;
  return (
    i !== null &&
      typeof i.componentDidCatch == "function" &&
      (n.callback = function () {
        Mi(e, t),
          typeof r != "function" &&
            (dt === null ? (dt = new Set([this])) : dt.add(this));
        var o = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: o !== null ? o : "",
        });
      }),
    n
  );
}
function $a(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Xf();
    var l = new Set();
    r.set(t, l);
  } else (l = r.get(t)), l === void 0 && ((l = new Set()), r.set(t, l));
  l.has(n) || (l.add(n), (e = a0.bind(null, e, t, n)), t.then(e, e));
}
function Va(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Ba(e, t, n, r, l) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = l), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = Qe(-1, 1)), (t.tag = 2), st(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var Yf = Ze.ReactCurrentOwner,
  fe = !1;
function ae(e, t, n, r) {
  t.child = e === null ? Is(t, null, n, r) : ln(t, e.child, n, r);
}
function Wa(e, t, n, r, l) {
  n = n.render;
  var i = t.ref;
  return (
    bt(t, l),
    (r = zo(e, t, n, r, i, l)),
    (n = Ro()),
    e !== null && !fe
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~l),
        Ge(e, t, l))
      : (U && n && wo(t), (t.flags |= 1), ae(e, t, r, l), t.child)
  );
}
function Ha(e, t, n, r, l) {
  if (e === null) {
    var i = n.type;
    return typeof i == "function" &&
      !Bo(i) &&
      i.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = i), td(e, t, i, r, l))
      : ((e = Mr(n.type, null, r, t, t.mode, l)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((i = e.child), !(e.lanes & l))) {
    var o = i.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : Wn), n(o, r) && e.ref === t.ref)
    )
      return Ge(e, t, l);
  }
  return (
    (t.flags |= 1),
    (e = ft(i, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function td(e, t, n, r, l) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (Wn(i, r) && e.ref === t.ref)
      if (((fe = !1), (t.pendingProps = r = i), (e.lanes & l) !== 0))
        e.flags & 131072 && (fe = !0);
      else return (t.lanes = e.lanes), Ge(e, t, l);
  }
  return Oi(e, t, n, r, l);
}
function nd(e, t, n) {
  var r = t.pendingProps,
    l = r.children,
    i = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        M(Yt, ge),
        (ge |= n);
    else {
      if (!(n & 1073741824))
        return (
          (e = i !== null ? i.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          M(Yt, ge),
          (ge |= e),
          null
        );
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = i !== null ? i.baseLanes : n),
        M(Yt, ge),
        (ge |= r);
    }
  else
    i !== null ? ((r = i.baseLanes | n), (t.memoizedState = null)) : (r = n),
      M(Yt, ge),
      (ge |= r);
  return ae(e, t, l, n), t.child;
}
function rd(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function Oi(e, t, n, r, l) {
  var i = me(n) ? Pt : oe.current;
  return (
    (i = nn(t, i)),
    bt(t, l),
    (n = zo(e, t, n, r, i, l)),
    (r = Ro()),
    e !== null && !fe
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~l),
        Ge(e, t, l))
      : (U && r && wo(t), (t.flags |= 1), ae(e, t, n, l), t.child)
  );
}
function Qa(e, t, n, r, l) {
  if (me(n)) {
    var i = !0;
    Yr(t);
  } else i = !1;
  if ((bt(t, l), t.stateNode === null))
    Tr(e, t), qs(t, n, r), ji(t, n, r, l), (r = !0);
  else if (e === null) {
    var o = t.stateNode,
      a = t.memoizedProps;
    o.props = a;
    var u = o.context,
      d = n.contextType;
    typeof d == "object" && d !== null
      ? (d = Le(d))
      : ((d = me(n) ? Pt : oe.current), (d = nn(t, d)));
    var m = n.getDerivedStateFromProps,
      f =
        typeof m == "function" ||
        typeof o.getSnapshotBeforeUpdate == "function";
    f ||
      (typeof o.UNSAFE_componentWillReceiveProps != "function" &&
        typeof o.componentWillReceiveProps != "function") ||
      ((a !== r || u !== d) && Ua(t, o, r, d)),
      (be = !1);
    var h = t.memoizedState;
    (o.state = h),
      br(t, r, o, l),
      (u = t.memoizedState),
      a !== r || h !== u || pe.current || be
        ? (typeof m == "function" && (Ai(t, n, m, r), (u = t.memoizedState)),
          (a = be || Fa(t, n, a, r, h, u, d))
            ? (f ||
                (typeof o.UNSAFE_componentWillMount != "function" &&
                  typeof o.componentWillMount != "function") ||
                (typeof o.componentWillMount == "function" &&
                  o.componentWillMount(),
                typeof o.UNSAFE_componentWillMount == "function" &&
                  o.UNSAFE_componentWillMount()),
              typeof o.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof o.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = u)),
          (o.props = r),
          (o.state = u),
          (o.context = d),
          (r = a))
        : (typeof o.componentDidMount == "function" && (t.flags |= 4194308),
          (r = !1));
  } else {
    (o = t.stateNode),
      zs(e, t),
      (a = t.memoizedProps),
      (d = t.type === t.elementType ? a : De(t.type, a)),
      (o.props = d),
      (f = t.pendingProps),
      (h = o.context),
      (u = n.contextType),
      typeof u == "object" && u !== null
        ? (u = Le(u))
        : ((u = me(n) ? Pt : oe.current), (u = nn(t, u)));
    var g = n.getDerivedStateFromProps;
    (m =
      typeof g == "function" ||
      typeof o.getSnapshotBeforeUpdate == "function") ||
      (typeof o.UNSAFE_componentWillReceiveProps != "function" &&
        typeof o.componentWillReceiveProps != "function") ||
      ((a !== f || h !== u) && Ua(t, o, r, u)),
      (be = !1),
      (h = t.memoizedState),
      (o.state = h),
      br(t, r, o, l);
    var v = t.memoizedState;
    a !== f || h !== v || pe.current || be
      ? (typeof g == "function" && (Ai(t, n, g, r), (v = t.memoizedState)),
        (d = be || Fa(t, n, d, r, h, v, u) || !1)
          ? (m ||
              (typeof o.UNSAFE_componentWillUpdate != "function" &&
                typeof o.componentWillUpdate != "function") ||
              (typeof o.componentWillUpdate == "function" &&
                o.componentWillUpdate(r, v, u),
              typeof o.UNSAFE_componentWillUpdate == "function" &&
                o.UNSAFE_componentWillUpdate(r, v, u)),
            typeof o.componentDidUpdate == "function" && (t.flags |= 4),
            typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof o.componentDidUpdate != "function" ||
              (a === e.memoizedProps && h === e.memoizedState) ||
              (t.flags |= 4),
            typeof o.getSnapshotBeforeUpdate != "function" ||
              (a === e.memoizedProps && h === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = v)),
        (o.props = r),
        (o.state = v),
        (o.context = u),
        (r = d))
      : (typeof o.componentDidUpdate != "function" ||
          (a === e.memoizedProps && h === e.memoizedState) ||
          (t.flags |= 4),
        typeof o.getSnapshotBeforeUpdate != "function" ||
          (a === e.memoizedProps && h === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return Fi(e, t, n, r, i, l);
}
function Fi(e, t, n, r, l, i) {
  rd(e, t);
  var o = (t.flags & 128) !== 0;
  if (!r && !o) return l && Da(t, n, !1), Ge(e, t, i);
  (r = t.stateNode), (Yf.current = t);
  var a =
    o && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && o
      ? ((t.child = ln(t, e.child, null, i)), (t.child = ln(t, null, a, i)))
      : ae(e, t, a, i),
    (t.memoizedState = r.state),
    l && Da(t, n, !0),
    t.child
  );
}
function ld(e) {
  var t = e.stateNode;
  t.pendingContext
    ? Ia(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && Ia(e, t.context, !1),
    _o(e, t.containerInfo);
}
function Ka(e, t, n, r, l) {
  return rn(), So(l), (t.flags |= 256), ae(e, t, n, r), t.child;
}
var Ui = { dehydrated: null, treeContext: null, retryLane: 0 };
function $i(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function id(e, t, n) {
  var r = t.pendingProps,
    l = $.current,
    i = !1,
    o = (t.flags & 128) !== 0,
    a;
  if (
    ((a = o) ||
      (a = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0),
    a
      ? ((i = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (l |= 1),
    M($, l & 1),
    e === null)
  )
    return (
      Ri(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === "$!"
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((o = r.children),
          (e = r.fallback),
          i
            ? ((r = t.mode),
              (i = t.child),
              (o = { mode: "hidden", children: o }),
              !(r & 1) && i !== null
                ? ((i.childLanes = 0), (i.pendingProps = o))
                : (i = wl(o, r, 0, null)),
              (e = Lt(e, r, n, null)),
              (i.return = t),
              (e.return = t),
              (i.sibling = e),
              (t.child = i),
              (t.child.memoizedState = $i(n)),
              (t.memoizedState = Ui),
              e)
            : jo(t, o))
    );
  if (((l = e.memoizedState), l !== null && ((a = l.dehydrated), a !== null)))
    return Gf(e, t, o, r, a, l, n);
  if (i) {
    (i = r.fallback), (o = t.mode), (l = e.child), (a = l.sibling);
    var u = { mode: "hidden", children: r.children };
    return (
      !(o & 1) && t.child !== l
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = u),
          (t.deletions = null))
        : ((r = ft(l, u)), (r.subtreeFlags = l.subtreeFlags & 14680064)),
      a !== null ? (i = ft(a, i)) : ((i = Lt(i, o, n, null)), (i.flags |= 2)),
      (i.return = t),
      (r.return = t),
      (r.sibling = i),
      (t.child = r),
      (r = i),
      (i = t.child),
      (o = e.child.memoizedState),
      (o =
        o === null
          ? $i(n)
          : {
              baseLanes: o.baseLanes | n,
              cachePool: null,
              transitions: o.transitions,
            }),
      (i.memoizedState = o),
      (i.childLanes = e.childLanes & ~n),
      (t.memoizedState = Ui),
      r
    );
  }
  return (
    (i = e.child),
    (e = i.sibling),
    (r = ft(i, { mode: "visible", children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions),
      n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function jo(e, t) {
  return (
    (t = wl({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function Sr(e, t, n, r) {
  return (
    r !== null && So(r),
    ln(t, e.child, null, n),
    (e = jo(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function Gf(e, t, n, r, l, i, o) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = ql(Error(N(422)))), Sr(e, t, o, r))
      : t.memoizedState !== null
      ? ((t.child = e.child), (t.flags |= 128), null)
      : ((i = r.fallback),
        (l = t.mode),
        (r = wl({ mode: "visible", children: r.children }, l, 0, null)),
        (i = Lt(i, l, o, null)),
        (i.flags |= 2),
        (r.return = t),
        (i.return = t),
        (r.sibling = i),
        (t.child = r),
        t.mode & 1 && ln(t, e.child, null, o),
        (t.child.memoizedState = $i(o)),
        (t.memoizedState = Ui),
        i);
  if (!(t.mode & 1)) return Sr(e, t, o, null);
  if (l.data === "$!") {
    if (((r = l.nextSibling && l.nextSibling.dataset), r)) var a = r.dgst;
    return (r = a), (i = Error(N(419))), (r = ql(i, r, void 0)), Sr(e, t, o, r);
  }
  if (((a = (o & e.childLanes) !== 0), fe || a)) {
    if (((r = b), r !== null)) {
      switch (o & -o) {
        case 4:
          l = 2;
          break;
        case 16:
          l = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          l = 32;
          break;
        case 536870912:
          l = 268435456;
          break;
        default:
          l = 0;
      }
      (l = l & (r.suspendedLanes | o) ? 0 : l),
        l !== 0 &&
          l !== i.retryLane &&
          ((i.retryLane = l), Ye(e, l), Ae(r, e, l, -1));
    }
    return Vo(), (r = ql(Error(N(421)))), Sr(e, t, o, r);
  }
  return l.data === "$?"
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = u0.bind(null, e)),
      (l._reactRetry = t),
      null)
    : ((e = i.treeContext),
      (ve = ut(l.nextSibling)),
      (ye = t),
      (U = !0),
      (Re = null),
      e !== null &&
        ((ke[xe++] = We),
        (ke[xe++] = He),
        (ke[xe++] = It),
        (We = e.id),
        (He = e.overflow),
        (It = t)),
      (t = jo(t, r.children)),
      (t.flags |= 4096),
      t);
}
function Xa(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Ti(e.return, t, n);
}
function bl(e, t, n, r, l) {
  var i = e.memoizedState;
  i === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: l,
      })
    : ((i.isBackwards = t),
      (i.rendering = null),
      (i.renderingStartTime = 0),
      (i.last = r),
      (i.tail = n),
      (i.tailMode = l));
}
function od(e, t, n) {
  var r = t.pendingProps,
    l = r.revealOrder,
    i = r.tail;
  if ((ae(e, t, r.children, n), (r = $.current), r & 2))
    (r = (r & 1) | 2), (t.flags |= 128);
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Xa(e, n, t);
        else if (e.tag === 19) Xa(e, n, t);
        else if (e.child !== null) {
          (e.child.return = e), (e = e.child);
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    r &= 1;
  }
  if ((M($, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (l) {
      case "forwards":
        for (n = t.child, l = null; n !== null; )
          (e = n.alternate),
            e !== null && el(e) === null && (l = n),
            (n = n.sibling);
        (n = l),
          n === null
            ? ((l = t.child), (t.child = null))
            : ((l = n.sibling), (n.sibling = null)),
          bl(t, !1, l, n, i);
        break;
      case "backwards":
        for (n = null, l = t.child, t.child = null; l !== null; ) {
          if (((e = l.alternate), e !== null && el(e) === null)) {
            t.child = l;
            break;
          }
          (e = l.sibling), (l.sibling = n), (n = l), (l = e);
        }
        bl(t, !0, n, null, i);
        break;
      case "together":
        bl(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function Tr(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function Ge(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (zt |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(N(153));
  if (t.child !== null) {
    for (
      e = t.child, n = ft(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;

    )
      (e = e.sibling), (n = n.sibling = ft(e, e.pendingProps)), (n.return = t);
    n.sibling = null;
  }
  return t.child;
}
function Zf(e, t, n) {
  switch (t.tag) {
    case 3:
      ld(t), rn();
      break;
    case 5:
      Rs(t);
      break;
    case 1:
      me(t.type) && Yr(t);
      break;
    case 4:
      _o(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        l = t.memoizedProps.value;
      M(Jr, r._currentValue), (r._currentValue = l);
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (M($, $.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
          ? id(e, t, n)
          : (M($, $.current & 1),
            (e = Ge(e, t, n)),
            e !== null ? e.sibling : null);
      M($, $.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return od(e, t, n);
        t.flags |= 128;
      }
      if (
        ((l = t.memoizedState),
        l !== null &&
          ((l.rendering = null), (l.tail = null), (l.lastEffect = null)),
        M($, $.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return (t.lanes = 0), nd(e, t, n);
  }
  return Ge(e, t, n);
}
var ad, Vi, ud, sd;
ad = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      (n.child.return = n), (n = n.child);
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    (n.sibling.return = n.return), (n = n.sibling);
  }
};
Vi = function () {};
ud = function (e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    (e = t.stateNode), Ct($e.current);
    var i = null;
    switch (n) {
      case "input":
        (l = si(e, l)), (r = si(e, r)), (i = []);
        break;
      case "select":
        (l = B({}, l, { value: void 0 })),
          (r = B({}, r, { value: void 0 })),
          (i = []);
        break;
      case "textarea":
        (l = fi(e, l)), (r = fi(e, r)), (i = []);
        break;
      default:
        typeof l.onClick != "function" &&
          typeof r.onClick == "function" &&
          (e.onclick = Kr);
    }
    mi(n, r);
    var o;
    n = null;
    for (d in l)
      if (!r.hasOwnProperty(d) && l.hasOwnProperty(d) && l[d] != null)
        if (d === "style") {
          var a = l[d];
          for (o in a) a.hasOwnProperty(o) && (n || (n = {}), (n[o] = ""));
        } else
          d !== "dangerouslySetInnerHTML" &&
            d !== "children" &&
            d !== "suppressContentEditableWarning" &&
            d !== "suppressHydrationWarning" &&
            d !== "autoFocus" &&
            (Mn.hasOwnProperty(d)
              ? i || (i = [])
              : (i = i || []).push(d, null));
    for (d in r) {
      var u = r[d];
      if (
        ((a = l != null ? l[d] : void 0),
        r.hasOwnProperty(d) && u !== a && (u != null || a != null))
      )
        if (d === "style")
          if (a) {
            for (o in a)
              !a.hasOwnProperty(o) ||
                (u && u.hasOwnProperty(o)) ||
                (n || (n = {}), (n[o] = ""));
            for (o in u)
              u.hasOwnProperty(o) &&
                a[o] !== u[o] &&
                (n || (n = {}), (n[o] = u[o]));
          } else n || (i || (i = []), i.push(d, n)), (n = u);
        else
          d === "dangerouslySetInnerHTML"
            ? ((u = u ? u.__html : void 0),
              (a = a ? a.__html : void 0),
              u != null && a !== u && (i = i || []).push(d, u))
            : d === "children"
            ? (typeof u != "string" && typeof u != "number") ||
              (i = i || []).push(d, "" + u)
            : d !== "suppressContentEditableWarning" &&
              d !== "suppressHydrationWarning" &&
              (Mn.hasOwnProperty(d)
                ? (u != null && d === "onScroll" && O("scroll", e),
                  i || a === u || (i = []))
                : (i = i || []).push(d, u));
    }
    n && (i = i || []).push("style", n);
    var d = i;
    (t.updateQueue = d) && (t.flags |= 4);
  }
};
sd = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Sn(e, t) {
  if (!U)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; )
          t.alternate !== null && (n = t), (t = t.sibling);
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; )
          n.alternate !== null && (r = n), (n = n.sibling);
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function le(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var l = e.child; l !== null; )
      (n |= l.lanes | l.childLanes),
        (r |= l.subtreeFlags & 14680064),
        (r |= l.flags & 14680064),
        (l.return = e),
        (l = l.sibling);
  else
    for (l = e.child; l !== null; )
      (n |= l.lanes | l.childLanes),
        (r |= l.subtreeFlags),
        (r |= l.flags),
        (l.return = e),
        (l = l.sibling);
  return (e.subtreeFlags |= r), (e.childLanes = n), t;
}
function Jf(e, t, n) {
  var r = t.pendingProps;
  switch ((No(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return le(t), null;
    case 1:
      return me(t.type) && Xr(), le(t), null;
    case 3:
      return (
        (r = t.stateNode),
        on(),
        F(pe),
        F(oe),
        Io(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (wr(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), Re !== null && (Gi(Re), (Re = null)))),
        Vi(e, t),
        le(t),
        null
      );
    case 5:
      Po(t);
      var l = Ct(Yn.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        ud(e, t, n, r, l),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(N(166));
          return le(t), null;
        }
        if (((e = Ct($e.current)), wr(t))) {
          (r = t.stateNode), (n = t.type);
          var i = t.memoizedProps;
          switch (((r[Fe] = t), (r[Kn] = i), (e = (t.mode & 1) !== 0), n)) {
            case "dialog":
              O("cancel", r), O("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              O("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < Ln.length; l++) O(Ln[l], r);
              break;
            case "source":
              O("error", r);
              break;
            case "img":
            case "image":
            case "link":
              O("error", r), O("load", r);
              break;
            case "details":
              O("toggle", r);
              break;
            case "input":
              na(r, i), O("invalid", r);
              break;
            case "select":
              (r._wrapperState = { wasMultiple: !!i.multiple }),
                O("invalid", r);
              break;
            case "textarea":
              la(r, i), O("invalid", r);
          }
          mi(n, i), (l = null);
          for (var o in i)
            if (i.hasOwnProperty(o)) {
              var a = i[o];
              o === "children"
                ? typeof a == "string"
                  ? r.textContent !== a &&
                    (i.suppressHydrationWarning !== !0 &&
                      yr(r.textContent, a, e),
                    (l = ["children", a]))
                  : typeof a == "number" &&
                    r.textContent !== "" + a &&
                    (i.suppressHydrationWarning !== !0 &&
                      yr(r.textContent, a, e),
                    (l = ["children", "" + a]))
                : Mn.hasOwnProperty(o) &&
                  a != null &&
                  o === "onScroll" &&
                  O("scroll", r);
            }
          switch (n) {
            case "input":
              dr(r), ra(r, i, !0);
              break;
            case "textarea":
              dr(r), ia(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof i.onClick == "function" && (r.onclick = Kr);
          }
          (r = l), (t.updateQueue = r), r !== null && (t.flags |= 4);
        } else {
          (o = l.nodeType === 9 ? l : l.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = Ou(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = o.createElement("div")),
                  (e.innerHTML = "<script></script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                ? (e = o.createElement(n, { is: r.is }))
                : ((e = o.createElement(n)),
                  n === "select" &&
                    ((o = e),
                    r.multiple
                      ? (o.multiple = !0)
                      : r.size && (o.size = r.size)))
              : (e = o.createElementNS(e, n)),
            (e[Fe] = t),
            (e[Kn] = r),
            ad(e, t, !1, !1),
            (t.stateNode = e);
          e: {
            switch (((o = hi(n, r)), n)) {
              case "dialog":
                O("cancel", e), O("close", e), (l = r);
                break;
              case "iframe":
              case "object":
              case "embed":
                O("load", e), (l = r);
                break;
              case "video":
              case "audio":
                for (l = 0; l < Ln.length; l++) O(Ln[l], e);
                l = r;
                break;
              case "source":
                O("error", e), (l = r);
                break;
              case "img":
              case "image":
              case "link":
                O("error", e), O("load", e), (l = r);
                break;
              case "details":
                O("toggle", e), (l = r);
                break;
              case "input":
                na(e, r), (l = si(e, r)), O("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                (e._wrapperState = { wasMultiple: !!r.multiple }),
                  (l = B({}, r, { value: void 0 })),
                  O("invalid", e);
                break;
              case "textarea":
                la(e, r), (l = fi(e, r)), O("invalid", e);
                break;
              default:
                l = r;
            }
            mi(n, l), (a = l);
            for (i in a)
              if (a.hasOwnProperty(i)) {
                var u = a[i];
                i === "style"
                  ? $u(e, u)
                  : i === "dangerouslySetInnerHTML"
                  ? ((u = u ? u.__html : void 0), u != null && Fu(e, u))
                  : i === "children"
                  ? typeof u == "string"
                    ? (n !== "textarea" || u !== "") && On(e, u)
                    : typeof u == "number" && On(e, "" + u)
                  : i !== "suppressContentEditableWarning" &&
                    i !== "suppressHydrationWarning" &&
                    i !== "autoFocus" &&
                    (Mn.hasOwnProperty(i)
                      ? u != null && i === "onScroll" && O("scroll", e)
                      : u != null && lo(e, i, u, o));
              }
            switch (n) {
              case "input":
                dr(e), ra(e, r, !1);
                break;
              case "textarea":
                dr(e), ia(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + pt(r.value));
                break;
              case "select":
                (e.multiple = !!r.multiple),
                  (i = r.value),
                  i != null
                    ? Gt(e, !!r.multiple, i, !1)
                    : r.defaultValue != null &&
                      Gt(e, !!r.multiple, r.defaultValue, !0);
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = Kr);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return le(t), null;
    case 6:
      if (e && t.stateNode != null) sd(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(N(166));
        if (((n = Ct(Yn.current)), Ct($e.current), wr(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[Fe] = t),
            (i = r.nodeValue !== n) && ((e = ye), e !== null))
          )
            switch (e.tag) {
              case 3:
                yr(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  yr(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          i && (t.flags |= 4);
        } else
          (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[Fe] = t),
            (t.stateNode = r);
      }
      return le(t), null;
    case 13:
      if (
        (F($),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (U && ve !== null && t.mode & 1 && !(t.flags & 128))
          _s(), rn(), (t.flags |= 98560), (i = !1);
        else if (((i = wr(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!i) throw Error(N(318));
            if (
              ((i = t.memoizedState),
              (i = i !== null ? i.dehydrated : null),
              !i)
            )
              throw Error(N(317));
            i[Fe] = t;
          } else
            rn(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4);
          le(t), (i = !1);
        } else Re !== null && (Gi(Re), (Re = null)), (i = !0);
        if (!i) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || $.current & 1 ? G === 0 && (G = 3) : Vo())),
          t.updateQueue !== null && (t.flags |= 4),
          le(t),
          null);
    case 4:
      return (
        on(), Vi(e, t), e === null && Hn(t.stateNode.containerInfo), le(t), null
      );
    case 10:
      return Co(t.type._context), le(t), null;
    case 17:
      return me(t.type) && Xr(), le(t), null;
    case 19:
      if ((F($), (i = t.memoizedState), i === null)) return le(t), null;
      if (((r = (t.flags & 128) !== 0), (o = i.rendering), o === null))
        if (r) Sn(i, !1);
        else {
          if (G !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((o = el(e)), o !== null)) {
                for (
                  t.flags |= 128,
                    Sn(i, !1),
                    r = o.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;

                )
                  (i = n),
                    (e = r),
                    (i.flags &= 14680066),
                    (o = i.alternate),
                    o === null
                      ? ((i.childLanes = 0),
                        (i.lanes = e),
                        (i.child = null),
                        (i.subtreeFlags = 0),
                        (i.memoizedProps = null),
                        (i.memoizedState = null),
                        (i.updateQueue = null),
                        (i.dependencies = null),
                        (i.stateNode = null))
                      : ((i.childLanes = o.childLanes),
                        (i.lanes = o.lanes),
                        (i.child = o.child),
                        (i.subtreeFlags = 0),
                        (i.deletions = null),
                        (i.memoizedProps = o.memoizedProps),
                        (i.memoizedState = o.memoizedState),
                        (i.updateQueue = o.updateQueue),
                        (i.type = o.type),
                        (e = o.dependencies),
                        (i.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling);
                return M($, ($.current & 1) | 2), t.child;
              }
              e = e.sibling;
            }
          i.tail !== null &&
            K() > un &&
            ((t.flags |= 128), (r = !0), Sn(i, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = el(o)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              Sn(i, !0),
              i.tail === null && i.tailMode === "hidden" && !o.alternate && !U)
            )
              return le(t), null;
          } else
            2 * K() - i.renderingStartTime > un &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), Sn(i, !1), (t.lanes = 4194304));
        i.isBackwards
          ? ((o.sibling = t.child), (t.child = o))
          : ((n = i.last),
            n !== null ? (n.sibling = o) : (t.child = o),
            (i.last = o));
      }
      return i.tail !== null
        ? ((t = i.tail),
          (i.rendering = t),
          (i.tail = t.sibling),
          (i.renderingStartTime = K()),
          (t.sibling = null),
          (n = $.current),
          M($, r ? (n & 1) | 2 : n & 1),
          t)
        : (le(t), null);
    case 22:
    case 23:
      return (
        $o(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? ge & 1073741824 && (le(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : le(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(N(156, t.tag));
}
function qf(e, t) {
  switch ((No(t), t.tag)) {
    case 1:
      return (
        me(t.type) && Xr(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        on(),
        F(pe),
        F(oe),
        Io(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return Po(t), null;
    case 13:
      if ((F($), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
        if (t.alternate === null) throw Error(N(340));
        rn();
      }
      return (
        (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return F($), null;
    case 4:
      return on(), null;
    case 10:
      return Co(t.type._context), null;
    case 22:
    case 23:
      return $o(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var kr = !1,
  ie = !1,
  bf = typeof WeakSet == "function" ? WeakSet : Set,
  C = null;
function Xt(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        W(e, t, r);
      }
    else n.current = null;
}
function Bi(e, t, n) {
  try {
    n();
  } catch (r) {
    W(e, t, r);
  }
}
var Ya = !1;
function e0(e, t) {
  if (((Ei = Wr), (e = ms()), yo(e))) {
    if ("selectionStart" in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var l = r.anchorOffset,
            i = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, i.nodeType;
          } catch {
            n = null;
            break e;
          }
          var o = 0,
            a = -1,
            u = -1,
            d = 0,
            m = 0,
            f = e,
            h = null;
          t: for (;;) {
            for (
              var g;
              f !== n || (l !== 0 && f.nodeType !== 3) || (a = o + l),
                f !== i || (r !== 0 && f.nodeType !== 3) || (u = o + r),
                f.nodeType === 3 && (o += f.nodeValue.length),
                (g = f.firstChild) !== null;

            )
              (h = f), (f = g);
            for (;;) {
              if (f === e) break t;
              if (
                (h === n && ++d === l && (a = o),
                h === i && ++m === r && (u = o),
                (g = f.nextSibling) !== null)
              )
                break;
              (f = h), (h = f.parentNode);
            }
            f = g;
          }
          n = a === -1 || u === -1 ? null : { start: a, end: u };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Li = { focusedElem: e, selectionRange: n }, Wr = !1, C = t; C !== null; )
    if (((t = C), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      (e.return = t), (C = e);
    else
      for (; C !== null; ) {
        t = C;
        try {
          var v = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (v !== null) {
                  var y = v.memoizedProps,
                    k = v.memoizedState,
                    c = t.stateNode,
                    s = c.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? y : De(t.type, y),
                      k
                    );
                  c.__reactInternalSnapshotBeforeUpdate = s;
                }
                break;
              case 3:
                var p = t.stateNode.containerInfo;
                p.nodeType === 1
                  ? (p.textContent = "")
                  : p.nodeType === 9 &&
                    p.documentElement &&
                    p.removeChild(p.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(N(163));
            }
        } catch (w) {
          W(t, t.return, w);
        }
        if (((e = t.sibling), e !== null)) {
          (e.return = t.return), (C = e);
          break;
        }
        C = t.return;
      }
  return (v = Ya), (Ya = !1), v;
}
function Tn(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var l = (r = r.next);
    do {
      if ((l.tag & e) === e) {
        var i = l.destroy;
        (l.destroy = void 0), i !== void 0 && Bi(t, n, i);
      }
      l = l.next;
    } while (l !== r);
  }
}
function vl(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function Wi(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : (t.current = e);
  }
}
function dd(e) {
  var t = e.alternate;
  t !== null && ((e.alternate = null), dd(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[Fe], delete t[Kn], delete t[Ii], delete t[Mf], delete t[Of])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null);
}
function cd(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Ga(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || cd(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      (e.child.return = e), (e = e.child);
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Hi(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = Kr));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Hi(e, t, n), e = e.sibling; e !== null; ) Hi(e, t, n), (e = e.sibling);
}
function Qi(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Qi(e, t, n), e = e.sibling; e !== null; ) Qi(e, t, n), (e = e.sibling);
}
var ee = null,
  ze = !1;
function Je(e, t, n) {
  for (n = n.child; n !== null; ) fd(e, t, n), (n = n.sibling);
}
function fd(e, t, n) {
  if (Ue && typeof Ue.onCommitFiberUnmount == "function")
    try {
      Ue.onCommitFiberUnmount(sl, n);
    } catch {}
  switch (n.tag) {
    case 5:
      ie || Xt(n, t);
    case 6:
      var r = ee,
        l = ze;
      (ee = null),
        Je(e, t, n),
        (ee = r),
        (ze = l),
        ee !== null &&
          (ze
            ? ((e = ee),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : ee.removeChild(n.stateNode));
      break;
    case 18:
      ee !== null &&
        (ze
          ? ((e = ee),
            (n = n.stateNode),
            e.nodeType === 8
              ? Kl(e.parentNode, n)
              : e.nodeType === 1 && Kl(e, n),
            Vn(e))
          : Kl(ee, n.stateNode));
      break;
    case 4:
      (r = ee),
        (l = ze),
        (ee = n.stateNode.containerInfo),
        (ze = !0),
        Je(e, t, n),
        (ee = r),
        (ze = l);
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !ie &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        l = r = r.next;
        do {
          var i = l,
            o = i.destroy;
          (i = i.tag),
            o !== void 0 && (i & 2 || i & 4) && Bi(n, t, o),
            (l = l.next);
        } while (l !== r);
      }
      Je(e, t, n);
      break;
    case 1:
      if (
        !ie &&
        (Xt(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == "function")
      )
        try {
          (r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount();
        } catch (a) {
          W(n, t, a);
        }
      Je(e, t, n);
      break;
    case 21:
      Je(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((ie = (r = ie) || n.memoizedState !== null), Je(e, t, n), (ie = r))
        : Je(e, t, n);
      break;
    default:
      Je(e, t, n);
  }
}
function Za(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new bf()),
      t.forEach(function (r) {
        var l = s0.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(l, l));
      });
  }
}
function Ie(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var l = n[r];
      try {
        var i = e,
          o = t,
          a = o;
        e: for (; a !== null; ) {
          switch (a.tag) {
            case 5:
              (ee = a.stateNode), (ze = !1);
              break e;
            case 3:
              (ee = a.stateNode.containerInfo), (ze = !0);
              break e;
            case 4:
              (ee = a.stateNode.containerInfo), (ze = !0);
              break e;
          }
          a = a.return;
        }
        if (ee === null) throw Error(N(160));
        fd(i, o, l), (ee = null), (ze = !1);
        var u = l.alternate;
        u !== null && (u.return = null), (l.return = null);
      } catch (d) {
        W(l, t, d);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) pd(t, e), (t = t.sibling);
}
function pd(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((Ie(t, e), Me(e), r & 4)) {
        try {
          Tn(3, e, e.return), vl(3, e);
        } catch (y) {
          W(e, e.return, y);
        }
        try {
          Tn(5, e, e.return);
        } catch (y) {
          W(e, e.return, y);
        }
      }
      break;
    case 1:
      Ie(t, e), Me(e), r & 512 && n !== null && Xt(n, n.return);
      break;
    case 5:
      if (
        (Ie(t, e),
        Me(e),
        r & 512 && n !== null && Xt(n, n.return),
        e.flags & 32)
      ) {
        var l = e.stateNode;
        try {
          On(l, "");
        } catch (y) {
          W(e, e.return, y);
        }
      }
      if (r & 4 && ((l = e.stateNode), l != null)) {
        var i = e.memoizedProps,
          o = n !== null ? n.memoizedProps : i,
          a = e.type,
          u = e.updateQueue;
        if (((e.updateQueue = null), u !== null))
          try {
            a === "input" && i.type === "radio" && i.name != null && ju(l, i),
              hi(a, o);
            var d = hi(a, i);
            for (o = 0; o < u.length; o += 2) {
              var m = u[o],
                f = u[o + 1];
              m === "style"
                ? $u(l, f)
                : m === "dangerouslySetInnerHTML"
                ? Fu(l, f)
                : m === "children"
                ? On(l, f)
                : lo(l, m, f, d);
            }
            switch (a) {
              case "input":
                di(l, i);
                break;
              case "textarea":
                Mu(l, i);
                break;
              case "select":
                var h = l._wrapperState.wasMultiple;
                l._wrapperState.wasMultiple = !!i.multiple;
                var g = i.value;
                g != null
                  ? Gt(l, !!i.multiple, g, !1)
                  : h !== !!i.multiple &&
                    (i.defaultValue != null
                      ? Gt(l, !!i.multiple, i.defaultValue, !0)
                      : Gt(l, !!i.multiple, i.multiple ? [] : "", !1));
            }
            l[Kn] = i;
          } catch (y) {
            W(e, e.return, y);
          }
      }
      break;
    case 6:
      if ((Ie(t, e), Me(e), r & 4)) {
        if (e.stateNode === null) throw Error(N(162));
        (l = e.stateNode), (i = e.memoizedProps);
        try {
          l.nodeValue = i;
        } catch (y) {
          W(e, e.return, y);
        }
      }
      break;
    case 3:
      if (
        (Ie(t, e), Me(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          Vn(t.containerInfo);
        } catch (y) {
          W(e, e.return, y);
        }
      break;
    case 4:
      Ie(t, e), Me(e);
      break;
    case 13:
      Ie(t, e),
        Me(e),
        (l = e.child),
        l.flags & 8192 &&
          ((i = l.memoizedState !== null),
          (l.stateNode.isHidden = i),
          !i ||
            (l.alternate !== null && l.alternate.memoizedState !== null) ||
            (Fo = K())),
        r & 4 && Za(e);
      break;
    case 22:
      if (
        ((m = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((ie = (d = ie) || m), Ie(t, e), (ie = d)) : Ie(t, e),
        Me(e),
        r & 8192)
      ) {
        if (
          ((d = e.memoizedState !== null),
          (e.stateNode.isHidden = d) && !m && e.mode & 1)
        )
          for (C = e, m = e.child; m !== null; ) {
            for (f = C = m; C !== null; ) {
              switch (((h = C), (g = h.child), h.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Tn(4, h, h.return);
                  break;
                case 1:
                  Xt(h, h.return);
                  var v = h.stateNode;
                  if (typeof v.componentWillUnmount == "function") {
                    (r = h), (n = h.return);
                    try {
                      (t = r),
                        (v.props = t.memoizedProps),
                        (v.state = t.memoizedState),
                        v.componentWillUnmount();
                    } catch (y) {
                      W(r, n, y);
                    }
                  }
                  break;
                case 5:
                  Xt(h, h.return);
                  break;
                case 22:
                  if (h.memoizedState !== null) {
                    qa(f);
                    continue;
                  }
              }
              g !== null ? ((g.return = h), (C = g)) : qa(f);
            }
            m = m.sibling;
          }
        e: for (m = null, f = e; ; ) {
          if (f.tag === 5) {
            if (m === null) {
              m = f;
              try {
                (l = f.stateNode),
                  d
                    ? ((i = l.style),
                      typeof i.setProperty == "function"
                        ? i.setProperty("display", "none", "important")
                        : (i.display = "none"))
                    : ((a = f.stateNode),
                      (u = f.memoizedProps.style),
                      (o =
                        u != null && u.hasOwnProperty("display")
                          ? u.display
                          : null),
                      (a.style.display = Uu("display", o)));
              } catch (y) {
                W(e, e.return, y);
              }
            }
          } else if (f.tag === 6) {
            if (m === null)
              try {
                f.stateNode.nodeValue = d ? "" : f.memoizedProps;
              } catch (y) {
                W(e, e.return, y);
              }
          } else if (
            ((f.tag !== 22 && f.tag !== 23) ||
              f.memoizedState === null ||
              f === e) &&
            f.child !== null
          ) {
            (f.child.return = f), (f = f.child);
            continue;
          }
          if (f === e) break e;
          for (; f.sibling === null; ) {
            if (f.return === null || f.return === e) break e;
            m === f && (m = null), (f = f.return);
          }
          m === f && (m = null), (f.sibling.return = f.return), (f = f.sibling);
        }
      }
      break;
    case 19:
      Ie(t, e), Me(e), r & 4 && Za(e);
      break;
    case 21:
      break;
    default:
      Ie(t, e), Me(e);
  }
}
function Me(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (cd(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(N(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (On(l, ""), (r.flags &= -33));
          var i = Ga(e);
          Qi(e, i, l);
          break;
        case 3:
        case 4:
          var o = r.stateNode.containerInfo,
            a = Ga(e);
          Hi(e, a, o);
          break;
        default:
          throw Error(N(161));
      }
    } catch (u) {
      W(e, e.return, u);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function t0(e, t, n) {
  (C = e), md(e);
}
function md(e, t, n) {
  for (var r = (e.mode & 1) !== 0; C !== null; ) {
    var l = C,
      i = l.child;
    if (l.tag === 22 && r) {
      var o = l.memoizedState !== null || kr;
      if (!o) {
        var a = l.alternate,
          u = (a !== null && a.memoizedState !== null) || ie;
        a = kr;
        var d = ie;
        if (((kr = o), (ie = u) && !d))
          for (C = l; C !== null; )
            (o = C),
              (u = o.child),
              o.tag === 22 && o.memoizedState !== null
                ? ba(l)
                : u !== null
                ? ((u.return = o), (C = u))
                : ba(l);
        for (; i !== null; ) (C = i), md(i), (i = i.sibling);
        (C = l), (kr = a), (ie = d);
      }
      Ja(e);
    } else
      l.subtreeFlags & 8772 && i !== null ? ((i.return = l), (C = i)) : Ja(e);
  }
}
function Ja(e) {
  for (; C !== null; ) {
    var t = C;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              ie || vl(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !ie)
                if (n === null) r.componentDidMount();
                else {
                  var l =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : De(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    l,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate
                  );
                }
              var i = t.updateQueue;
              i !== null && ja(t, i, r);
              break;
            case 3:
              var o = t.updateQueue;
              if (o !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                ja(t, o, n);
              }
              break;
            case 5:
              var a = t.stateNode;
              if (n === null && t.flags & 4) {
                n = a;
                var u = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    u.autoFocus && n.focus();
                    break;
                  case "img":
                    u.src && (n.src = u.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var d = t.alternate;
                if (d !== null) {
                  var m = d.memoizedState;
                  if (m !== null) {
                    var f = m.dehydrated;
                    f !== null && Vn(f);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(N(163));
          }
        ie || (t.flags & 512 && Wi(t));
      } catch (h) {
        W(t, t.return, h);
      }
    }
    if (t === e) {
      C = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      (n.return = t.return), (C = n);
      break;
    }
    C = t.return;
  }
}
function qa(e) {
  for (; C !== null; ) {
    var t = C;
    if (t === e) {
      C = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      (n.return = t.return), (C = n);
      break;
    }
    C = t.return;
  }
}
function ba(e) {
  for (; C !== null; ) {
    var t = C;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            vl(4, t);
          } catch (u) {
            W(t, n, u);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (u) {
              W(t, l, u);
            }
          }
          var i = t.return;
          try {
            Wi(t);
          } catch (u) {
            W(t, i, u);
          }
          break;
        case 5:
          var o = t.return;
          try {
            Wi(t);
          } catch (u) {
            W(t, o, u);
          }
      }
    } catch (u) {
      W(t, t.return, u);
    }
    if (t === e) {
      C = null;
      break;
    }
    var a = t.sibling;
    if (a !== null) {
      (a.return = t.return), (C = a);
      break;
    }
    C = t.return;
  }
}
var n0 = Math.ceil,
  rl = Ze.ReactCurrentDispatcher,
  Mo = Ze.ReactCurrentOwner,
  Ee = Ze.ReactCurrentBatchConfig,
  A = 0,
  b = null,
  X = null,
  te = 0,
  ge = 0,
  Yt = gt(0),
  G = 0,
  qn = null,
  zt = 0,
  yl = 0,
  Oo = 0,
  An = null,
  ce = null,
  Fo = 0,
  un = 1 / 0,
  Ve = null,
  ll = !1,
  Ki = null,
  dt = null,
  xr = !1,
  rt = null,
  il = 0,
  jn = 0,
  Xi = null,
  Ar = -1,
  jr = 0;
function ue() {
  return A & 6 ? K() : Ar !== -1 ? Ar : (Ar = K());
}
function ct(e) {
  return e.mode & 1
    ? A & 2 && te !== 0
      ? te & -te
      : Uf.transition !== null
      ? (jr === 0 && (jr = qu()), jr)
      : ((e = j),
        e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : is(e.type))),
        e)
    : 1;
}
function Ae(e, t, n, r) {
  if (50 < jn) throw ((jn = 0), (Xi = null), Error(N(185)));
  nr(e, n, r),
    (!(A & 2) || e !== b) &&
      (e === b && (!(A & 2) && (yl |= n), G === 4 && tt(e, te)),
      he(e, r),
      n === 1 && A === 0 && !(t.mode & 1) && ((un = K() + 500), ml && vt()));
}
function he(e, t) {
  var n = e.callbackNode;
  Fc(e, t);
  var r = Br(e, e === b ? te : 0);
  if (r === 0)
    n !== null && ua(n), (e.callbackNode = null), (e.callbackPriority = 0);
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && ua(n), t === 1))
      e.tag === 0 ? Ff(eu.bind(null, e)) : Cs(eu.bind(null, e)),
        Af(function () {
          !(A & 6) && vt();
        }),
        (n = null);
    else {
      switch (bu(r)) {
        case 1:
          n = so;
          break;
        case 4:
          n = Zu;
          break;
        case 16:
          n = Vr;
          break;
        case 536870912:
          n = Ju;
          break;
        default:
          n = Vr;
      }
      n = kd(n, hd.bind(null, e));
    }
    (e.callbackPriority = t), (e.callbackNode = n);
  }
}
function hd(e, t) {
  if (((Ar = -1), (jr = 0), A & 6)) throw Error(N(327));
  var n = e.callbackNode;
  if (en() && e.callbackNode !== n) return null;
  var r = Br(e, e === b ? te : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = ol(e, r);
  else {
    t = r;
    var l = A;
    A |= 2;
    var i = vd();
    (b !== e || te !== t) && ((Ve = null), (un = K() + 500), Et(e, t));
    do
      try {
        i0();
        break;
      } catch (a) {
        gd(e, a);
      }
    while (!0);
    xo(),
      (rl.current = i),
      (A = l),
      X !== null ? (t = 0) : ((b = null), (te = 0), (t = G));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((l = Ni(e)), l !== 0 && ((r = l), (t = Yi(e, l)))), t === 1)
    )
      throw ((n = qn), Et(e, 0), tt(e, r), he(e, K()), n);
    if (t === 6) tt(e, r);
    else {
      if (
        ((l = e.current.alternate),
        !(r & 30) &&
          !r0(l) &&
          ((t = ol(e, r)),
          t === 2 && ((i = Ni(e)), i !== 0 && ((r = i), (t = Yi(e, i)))),
          t === 1))
      )
        throw ((n = qn), Et(e, 0), tt(e, r), he(e, K()), n);
      switch (((e.finishedWork = l), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(N(345));
        case 2:
          St(e, ce, Ve);
          break;
        case 3:
          if (
            (tt(e, r), (r & 130023424) === r && ((t = Fo + 500 - K()), 10 < t))
          ) {
            if (Br(e, 0) !== 0) break;
            if (((l = e.suspendedLanes), (l & r) !== r)) {
              ue(), (e.pingedLanes |= e.suspendedLanes & l);
              break;
            }
            e.timeoutHandle = Pi(St.bind(null, e, ce, Ve), t);
            break;
          }
          St(e, ce, Ve);
          break;
        case 4:
          if ((tt(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var o = 31 - Te(r);
            (i = 1 << o), (o = t[o]), o > l && (l = o), (r &= ~i);
          }
          if (
            ((r = l),
            (r = K() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                ? 480
                : 1080 > r
                ? 1080
                : 1920 > r
                ? 1920
                : 3e3 > r
                ? 3e3
                : 4320 > r
                ? 4320
                : 1960 * n0(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = Pi(St.bind(null, e, ce, Ve), r);
            break;
          }
          St(e, ce, Ve);
          break;
        case 5:
          St(e, ce, Ve);
          break;
        default:
          throw Error(N(329));
      }
    }
  }
  return he(e, K()), e.callbackNode === n ? hd.bind(null, e) : null;
}
function Yi(e, t) {
  var n = An;
  return (
    e.current.memoizedState.isDehydrated && (Et(e, t).flags |= 256),
    (e = ol(e, t)),
    e !== 2 && ((t = ce), (ce = n), t !== null && Gi(t)),
    e
  );
}
function Gi(e) {
  ce === null ? (ce = e) : ce.push.apply(ce, e);
}
function r0(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var l = n[r],
            i = l.getSnapshot;
          l = l.value;
          try {
            if (!je(i(), l)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      (n.return = t), (t = n);
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
  }
  return !0;
}
function tt(e, t) {
  for (
    t &= ~Oo,
      t &= ~yl,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;

  ) {
    var n = 31 - Te(t),
      r = 1 << n;
    (e[n] = -1), (t &= ~r);
  }
}
function eu(e) {
  if (A & 6) throw Error(N(327));
  en();
  var t = Br(e, 0);
  if (!(t & 1)) return he(e, K()), null;
  var n = ol(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Ni(e);
    r !== 0 && ((t = r), (n = Yi(e, r)));
  }
  if (n === 1) throw ((n = qn), Et(e, 0), tt(e, t), he(e, K()), n);
  if (n === 6) throw Error(N(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    St(e, ce, Ve),
    he(e, K()),
    null
  );
}
function Uo(e, t) {
  var n = A;
  A |= 1;
  try {
    return e(t);
  } finally {
    (A = n), A === 0 && ((un = K() + 500), ml && vt());
  }
}
function Rt(e) {
  rt !== null && rt.tag === 0 && !(A & 6) && en();
  var t = A;
  A |= 1;
  var n = Ee.transition,
    r = j;
  try {
    if (((Ee.transition = null), (j = 1), e)) return e();
  } finally {
    (j = r), (Ee.transition = n), (A = t), !(A & 6) && vt();
  }
}
function $o() {
  (ge = Yt.current), F(Yt);
}
function Et(e, t) {
  (e.finishedWork = null), (e.finishedLanes = 0);
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), Tf(n)), X !== null))
    for (n = X.return; n !== null; ) {
      var r = n;
      switch ((No(r), r.tag)) {
        case 1:
          (r = r.type.childContextTypes), r != null && Xr();
          break;
        case 3:
          on(), F(pe), F(oe), Io();
          break;
        case 5:
          Po(r);
          break;
        case 4:
          on();
          break;
        case 13:
          F($);
          break;
        case 19:
          F($);
          break;
        case 10:
          Co(r.type._context);
          break;
        case 22:
        case 23:
          $o();
      }
      n = n.return;
    }
  if (
    ((b = e),
    (X = e = ft(e.current, null)),
    (te = ge = t),
    (G = 0),
    (qn = null),
    (Oo = yl = zt = 0),
    (ce = An = null),
    xt !== null)
  ) {
    for (t = 0; t < xt.length; t++)
      if (((n = xt[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var l = r.next,
          i = n.pending;
        if (i !== null) {
          var o = i.next;
          (i.next = l), (r.next = o);
        }
        n.pending = r;
      }
    xt = null;
  }
  return e;
}
function gd(e, t) {
  do {
    var n = X;
    try {
      if ((xo(), (zr.current = nl), tl)) {
        for (var r = V.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), (r = r.next);
        }
        tl = !1;
      }
      if (
        ((Dt = 0),
        (q = Y = V = null),
        (Rn = !1),
        (Gn = 0),
        (Mo.current = null),
        n === null || n.return === null)
      ) {
        (G = 1), (qn = t), (X = null);
        break;
      }
      e: {
        var i = e,
          o = n.return,
          a = n,
          u = t;
        if (
          ((t = te),
          (a.flags |= 32768),
          u !== null && typeof u == "object" && typeof u.then == "function")
        ) {
          var d = u,
            m = a,
            f = m.tag;
          if (!(m.mode & 1) && (f === 0 || f === 11 || f === 15)) {
            var h = m.alternate;
            h
              ? ((m.updateQueue = h.updateQueue),
                (m.memoizedState = h.memoizedState),
                (m.lanes = h.lanes))
              : ((m.updateQueue = null), (m.memoizedState = null));
          }
          var g = Va(o);
          if (g !== null) {
            (g.flags &= -257),
              Ba(g, o, a, i, t),
              g.mode & 1 && $a(i, d, t),
              (t = g),
              (u = d);
            var v = t.updateQueue;
            if (v === null) {
              var y = new Set();
              y.add(u), (t.updateQueue = y);
            } else v.add(u);
            break e;
          } else {
            if (!(t & 1)) {
              $a(i, d, t), Vo();
              break e;
            }
            u = Error(N(426));
          }
        } else if (U && a.mode & 1) {
          var k = Va(o);
          if (k !== null) {
            !(k.flags & 65536) && (k.flags |= 256),
              Ba(k, o, a, i, t),
              So(an(u, a));
            break e;
          }
        }
        (i = u = an(u, a)),
          G !== 4 && (G = 2),
          An === null ? (An = [i]) : An.push(i),
          (i = o);
        do {
          switch (i.tag) {
            case 3:
              (i.flags |= 65536), (t &= -t), (i.lanes |= t);
              var c = bs(i, u, t);
              Aa(i, c);
              break e;
            case 1:
              a = u;
              var s = i.type,
                p = i.stateNode;
              if (
                !(i.flags & 128) &&
                (typeof s.getDerivedStateFromError == "function" ||
                  (p !== null &&
                    typeof p.componentDidCatch == "function" &&
                    (dt === null || !dt.has(p))))
              ) {
                (i.flags |= 65536), (t &= -t), (i.lanes |= t);
                var w = ed(i, a, t);
                Aa(i, w);
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
      }
      wd(n);
    } catch (S) {
      (t = S), X === n && n !== null && (X = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function vd() {
  var e = rl.current;
  return (rl.current = nl), e === null ? nl : e;
}
function Vo() {
  (G === 0 || G === 3 || G === 2) && (G = 4),
    b === null || (!(zt & 268435455) && !(yl & 268435455)) || tt(b, te);
}
function ol(e, t) {
  var n = A;
  A |= 2;
  var r = vd();
  (b !== e || te !== t) && ((Ve = null), Et(e, t));
  do
    try {
      l0();
      break;
    } catch (l) {
      gd(e, l);
    }
  while (!0);
  if ((xo(), (A = n), (rl.current = r), X !== null)) throw Error(N(261));
  return (b = null), (te = 0), G;
}
function l0() {
  for (; X !== null; ) yd(X);
}
function i0() {
  for (; X !== null && !Ic(); ) yd(X);
}
function yd(e) {
  var t = Sd(e.alternate, e, ge);
  (e.memoizedProps = e.pendingProps),
    t === null ? wd(e) : (X = t),
    (Mo.current = null);
}
function wd(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = qf(n, t)), n !== null)) {
        (n.flags &= 32767), (X = n);
        return;
      }
      if (e !== null)
        (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
      else {
        (G = 6), (X = null);
        return;
      }
    } else if (((n = Jf(n, t, ge)), n !== null)) {
      X = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      X = t;
      return;
    }
    X = t = e;
  } while (t !== null);
  G === 0 && (G = 5);
}
function St(e, t, n) {
  var r = j,
    l = Ee.transition;
  try {
    (Ee.transition = null), (j = 1), o0(e, t, n, r);
  } finally {
    (Ee.transition = l), (j = r);
  }
  return null;
}
function o0(e, t, n, r) {
  do en();
  while (rt !== null);
  if (A & 6) throw Error(N(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(N(177));
  (e.callbackNode = null), (e.callbackPriority = 0);
  var i = n.lanes | n.childLanes;
  if (
    (Uc(e, i),
    e === b && ((X = b = null), (te = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      xr ||
      ((xr = !0),
      kd(Vr, function () {
        return en(), null;
      })),
    (i = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || i)
  ) {
    (i = Ee.transition), (Ee.transition = null);
    var o = j;
    j = 1;
    var a = A;
    (A |= 4),
      (Mo.current = null),
      e0(e, n),
      pd(n, e),
      Lf(Li),
      (Wr = !!Ei),
      (Li = Ei = null),
      (e.current = n),
      t0(n),
      Dc(),
      (A = a),
      (j = o),
      (Ee.transition = i);
  } else e.current = n;
  if (
    (xr && ((xr = !1), (rt = e), (il = l)),
    (i = e.pendingLanes),
    i === 0 && (dt = null),
    Tc(n.stateNode),
    he(e, K()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      (l = t[n]), r(l.value, { componentStack: l.stack, digest: l.digest });
  if (ll) throw ((ll = !1), (e = Ki), (Ki = null), e);
  return (
    il & 1 && e.tag !== 0 && en(),
    (i = e.pendingLanes),
    i & 1 ? (e === Xi ? jn++ : ((jn = 0), (Xi = e))) : (jn = 0),
    vt(),
    null
  );
}
function en() {
  if (rt !== null) {
    var e = bu(il),
      t = Ee.transition,
      n = j;
    try {
      if (((Ee.transition = null), (j = 16 > e ? 16 : e), rt === null))
        var r = !1;
      else {
        if (((e = rt), (rt = null), (il = 0), A & 6)) throw Error(N(331));
        var l = A;
        for (A |= 4, C = e.current; C !== null; ) {
          var i = C,
            o = i.child;
          if (C.flags & 16) {
            var a = i.deletions;
            if (a !== null) {
              for (var u = 0; u < a.length; u++) {
                var d = a[u];
                for (C = d; C !== null; ) {
                  var m = C;
                  switch (m.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Tn(8, m, i);
                  }
                  var f = m.child;
                  if (f !== null) (f.return = m), (C = f);
                  else
                    for (; C !== null; ) {
                      m = C;
                      var h = m.sibling,
                        g = m.return;
                      if ((dd(m), m === d)) {
                        C = null;
                        break;
                      }
                      if (h !== null) {
                        (h.return = g), (C = h);
                        break;
                      }
                      C = g;
                    }
                }
              }
              var v = i.alternate;
              if (v !== null) {
                var y = v.child;
                if (y !== null) {
                  v.child = null;
                  do {
                    var k = y.sibling;
                    (y.sibling = null), (y = k);
                  } while (y !== null);
                }
              }
              C = i;
            }
          }
          if (i.subtreeFlags & 2064 && o !== null) (o.return = i), (C = o);
          else
            e: for (; C !== null; ) {
              if (((i = C), i.flags & 2048))
                switch (i.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Tn(9, i, i.return);
                }
              var c = i.sibling;
              if (c !== null) {
                (c.return = i.return), (C = c);
                break e;
              }
              C = i.return;
            }
        }
        var s = e.current;
        for (C = s; C !== null; ) {
          o = C;
          var p = o.child;
          if (o.subtreeFlags & 2064 && p !== null) (p.return = o), (C = p);
          else
            e: for (o = s; C !== null; ) {
              if (((a = C), a.flags & 2048))
                try {
                  switch (a.tag) {
                    case 0:
                    case 11:
                    case 15:
                      vl(9, a);
                  }
                } catch (S) {
                  W(a, a.return, S);
                }
              if (a === o) {
                C = null;
                break e;
              }
              var w = a.sibling;
              if (w !== null) {
                (w.return = a.return), (C = w);
                break e;
              }
              C = a.return;
            }
        }
        if (
          ((A = l), vt(), Ue && typeof Ue.onPostCommitFiberRoot == "function")
        )
          try {
            Ue.onPostCommitFiberRoot(sl, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      (j = n), (Ee.transition = t);
    }
  }
  return !1;
}
function tu(e, t, n) {
  (t = an(n, t)),
    (t = bs(e, t, 1)),
    (e = st(e, t, 1)),
    (t = ue()),
    e !== null && (nr(e, 1, t), he(e, t));
}
function W(e, t, n) {
  if (e.tag === 3) tu(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        tu(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" &&
            (dt === null || !dt.has(r)))
        ) {
          (e = an(n, e)),
            (e = ed(t, e, 1)),
            (t = st(t, e, 1)),
            (e = ue()),
            t !== null && (nr(t, 1, e), he(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function a0(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t),
    (t = ue()),
    (e.pingedLanes |= e.suspendedLanes & n),
    b === e &&
      (te & n) === n &&
      (G === 4 || (G === 3 && (te & 130023424) === te && 500 > K() - Fo)
        ? Et(e, 0)
        : (Oo |= n)),
    he(e, t);
}
function Nd(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = pr), (pr <<= 1), !(pr & 130023424) && (pr = 4194304))
      : (t = 1));
  var n = ue();
  (e = Ye(e, t)), e !== null && (nr(e, t, n), he(e, n));
}
function u0(e) {
  var t = e.memoizedState,
    n = 0;
  t !== null && (n = t.retryLane), Nd(e, n);
}
function s0(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        l = e.memoizedState;
      l !== null && (n = l.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(N(314));
  }
  r !== null && r.delete(t), Nd(e, n);
}
var Sd;
Sd = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || pe.current) fe = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return (fe = !1), Zf(e, t, n);
      fe = !!(e.flags & 131072);
    }
  else (fe = !1), U && t.flags & 1048576 && Es(t, Zr, t.index);
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      Tr(e, t), (e = t.pendingProps);
      var l = nn(t, oe.current);
      bt(t, n), (l = zo(null, t, r, e, l, n));
      var i = Ro();
      return (
        (t.flags |= 1),
        typeof l == "object" &&
        l !== null &&
        typeof l.render == "function" &&
        l.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            me(r) ? ((i = !0), Yr(t)) : (i = !1),
            (t.memoizedState =
              l.state !== null && l.state !== void 0 ? l.state : null),
            Lo(t),
            (l.updater = gl),
            (t.stateNode = l),
            (l._reactInternals = t),
            ji(t, r, e, n),
            (t = Fi(null, t, r, !0, i, n)))
          : ((t.tag = 0), U && i && wo(t), ae(null, t, l, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (Tr(e, t),
          (e = t.pendingProps),
          (l = r._init),
          (r = l(r._payload)),
          (t.type = r),
          (l = t.tag = c0(r)),
          (e = De(r, e)),
          l)
        ) {
          case 0:
            t = Oi(null, t, r, e, n);
            break e;
          case 1:
            t = Qa(null, t, r, e, n);
            break e;
          case 11:
            t = Wa(null, t, r, e, n);
            break e;
          case 14:
            t = Ha(null, t, r, De(r.type, e), n);
            break e;
        }
        throw Error(N(306, r, ""));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : De(r, l)),
        Oi(e, t, r, l, n)
      );
    case 1:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : De(r, l)),
        Qa(e, t, r, l, n)
      );
    case 3:
      e: {
        if ((ld(t), e === null)) throw Error(N(387));
        (r = t.pendingProps),
          (i = t.memoizedState),
          (l = i.element),
          zs(e, t),
          br(t, r, null, n);
        var o = t.memoizedState;
        if (((r = o.element), i.isDehydrated))
          if (
            ((i = {
              element: r,
              isDehydrated: !1,
              cache: o.cache,
              pendingSuspenseBoundaries: o.pendingSuspenseBoundaries,
              transitions: o.transitions,
            }),
            (t.updateQueue.baseState = i),
            (t.memoizedState = i),
            t.flags & 256)
          ) {
            (l = an(Error(N(423)), t)), (t = Ka(e, t, r, n, l));
            break e;
          } else if (r !== l) {
            (l = an(Error(N(424)), t)), (t = Ka(e, t, r, n, l));
            break e;
          } else
            for (
              ve = ut(t.stateNode.containerInfo.firstChild),
                ye = t,
                U = !0,
                Re = null,
                n = Is(t, null, r, n),
                t.child = n;
              n;

            )
              (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
        else {
          if ((rn(), r === l)) {
            t = Ge(e, t, n);
            break e;
          }
          ae(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        Rs(t),
        e === null && Ri(t),
        (r = t.type),
        (l = t.pendingProps),
        (i = e !== null ? e.memoizedProps : null),
        (o = l.children),
        _i(r, l) ? (o = null) : i !== null && _i(r, i) && (t.flags |= 32),
        rd(e, t),
        ae(e, t, o, n),
        t.child
      );
    case 6:
      return e === null && Ri(t), null;
    case 13:
      return id(e, t, n);
    case 4:
      return (
        _o(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = ln(t, null, r, n)) : ae(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : De(r, l)),
        Wa(e, t, r, l, n)
      );
    case 7:
      return ae(e, t, t.pendingProps, n), t.child;
    case 8:
      return ae(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return ae(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (l = t.pendingProps),
          (i = t.memoizedProps),
          (o = l.value),
          M(Jr, r._currentValue),
          (r._currentValue = o),
          i !== null)
        )
          if (je(i.value, o)) {
            if (i.children === l.children && !pe.current) {
              t = Ge(e, t, n);
              break e;
            }
          } else
            for (i = t.child, i !== null && (i.return = t); i !== null; ) {
              var a = i.dependencies;
              if (a !== null) {
                o = i.child;
                for (var u = a.firstContext; u !== null; ) {
                  if (u.context === r) {
                    if (i.tag === 1) {
                      (u = Qe(-1, n & -n)), (u.tag = 2);
                      var d = i.updateQueue;
                      if (d !== null) {
                        d = d.shared;
                        var m = d.pending;
                        m === null
                          ? (u.next = u)
                          : ((u.next = m.next), (m.next = u)),
                          (d.pending = u);
                      }
                    }
                    (i.lanes |= n),
                      (u = i.alternate),
                      u !== null && (u.lanes |= n),
                      Ti(i.return, n, t),
                      (a.lanes |= n);
                    break;
                  }
                  u = u.next;
                }
              } else if (i.tag === 10) o = i.type === t.type ? null : i.child;
              else if (i.tag === 18) {
                if (((o = i.return), o === null)) throw Error(N(341));
                (o.lanes |= n),
                  (a = o.alternate),
                  a !== null && (a.lanes |= n),
                  Ti(o, n, t),
                  (o = i.sibling);
              } else o = i.child;
              if (o !== null) o.return = i;
              else
                for (o = i; o !== null; ) {
                  if (o === t) {
                    o = null;
                    break;
                  }
                  if (((i = o.sibling), i !== null)) {
                    (i.return = o.return), (o = i);
                    break;
                  }
                  o = o.return;
                }
              i = o;
            }
        ae(e, t, l.children, n), (t = t.child);
      }
      return t;
    case 9:
      return (
        (l = t.type),
        (r = t.pendingProps.children),
        bt(t, n),
        (l = Le(l)),
        (r = r(l)),
        (t.flags |= 1),
        ae(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (l = De(r, t.pendingProps)),
        (l = De(r.type, l)),
        Ha(e, t, r, l, n)
      );
    case 15:
      return td(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : De(r, l)),
        Tr(e, t),
        (t.tag = 1),
        me(r) ? ((e = !0), Yr(t)) : (e = !1),
        bt(t, n),
        qs(t, r, l),
        ji(t, r, l, n),
        Fi(null, t, r, !0, e, n)
      );
    case 19:
      return od(e, t, n);
    case 22:
      return nd(e, t, n);
  }
  throw Error(N(156, t.tag));
};
function kd(e, t) {
  return Gu(e, t);
}
function d0(e, t, n, r) {
  (this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null);
}
function Ce(e, t, n, r) {
  return new d0(e, t, n, r);
}
function Bo(e) {
  return (e = e.prototype), !(!e || !e.isReactComponent);
}
function c0(e) {
  if (typeof e == "function") return Bo(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === oo)) return 11;
    if (e === ao) return 14;
  }
  return 2;
}
function ft(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = Ce(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function Mr(e, t, n, r, l, i) {
  var o = 2;
  if (((r = e), typeof e == "function")) Bo(e) && (o = 1);
  else if (typeof e == "string") o = 5;
  else
    e: switch (e) {
      case Ft:
        return Lt(n.children, l, i, t);
      case io:
        (o = 8), (l |= 8);
        break;
      case ii:
        return (
          (e = Ce(12, n, t, l | 2)), (e.elementType = ii), (e.lanes = i), e
        );
      case oi:
        return (e = Ce(13, n, t, l)), (e.elementType = oi), (e.lanes = i), e;
      case ai:
        return (e = Ce(19, n, t, l)), (e.elementType = ai), (e.lanes = i), e;
      case Ru:
        return wl(n, l, i, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case Du:
              o = 10;
              break e;
            case zu:
              o = 9;
              break e;
            case oo:
              o = 11;
              break e;
            case ao:
              o = 14;
              break e;
            case qe:
              (o = 16), (r = null);
              break e;
          }
        throw Error(N(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = Ce(o, n, t, l)), (t.elementType = e), (t.type = r), (t.lanes = i), t
  );
}
function Lt(e, t, n, r) {
  return (e = Ce(7, e, r, t)), (e.lanes = n), e;
}
function wl(e, t, n, r) {
  return (
    (e = Ce(22, e, r, t)),
    (e.elementType = Ru),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function ei(e, t, n) {
  return (e = Ce(6, e, null, t)), (e.lanes = n), e;
}
function ti(e, t, n) {
  return (
    (t = Ce(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function f0(e, t, n, r, l) {
  (this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = jl(0)),
    (this.expirationTimes = jl(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = jl(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = l),
    (this.mutableSourceEagerHydrationData = null);
}
function Wo(e, t, n, r, l, i, o, a, u) {
  return (
    (e = new f0(e, t, n, a, u)),
    t === 1 ? ((t = 1), i === !0 && (t |= 8)) : (t = 0),
    (i = Ce(3, null, null, t)),
    (e.current = i),
    (i.stateNode = e),
    (i.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    Lo(i),
    e
  );
}
function p0(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: Ot,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function xd(e) {
  if (!e) return mt;
  e = e._reactInternals;
  e: {
    if (At(e) !== e || e.tag !== 1) throw Error(N(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (me(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(N(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (me(n)) return xs(e, n, t);
  }
  return t;
}
function Cd(e, t, n, r, l, i, o, a, u) {
  return (
    (e = Wo(n, r, !0, e, l, i, o, a, u)),
    (e.context = xd(null)),
    (n = e.current),
    (r = ue()),
    (l = ct(n)),
    (i = Qe(r, l)),
    (i.callback = t ?? null),
    st(n, i, l),
    (e.current.lanes = l),
    nr(e, l, r),
    he(e, r),
    e
  );
}
function Nl(e, t, n, r) {
  var l = t.current,
    i = ue(),
    o = ct(l);
  return (
    (n = xd(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = Qe(i, o)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = st(l, t, o)),
    e !== null && (Ae(e, l, o, i), Dr(e, l, o)),
    o
  );
}
function al(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function nu(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Ho(e, t) {
  nu(e, t), (e = e.alternate) && nu(e, t);
}
function m0() {
  return null;
}
var Ed =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function Qo(e) {
  this._internalRoot = e;
}
Sl.prototype.render = Qo.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(N(409));
  Nl(e, t, null, null);
};
Sl.prototype.unmount = Qo.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Rt(function () {
      Nl(null, e, null, null);
    }),
      (t[Xe] = null);
  }
};
function Sl(e) {
  this._internalRoot = e;
}
Sl.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = ns();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < et.length && t !== 0 && t < et[n].priority; n++);
    et.splice(n, 0, e), n === 0 && ls(e);
  }
};
function Ko(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function kl(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function ru() {}
function h0(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var i = r;
      r = function () {
        var d = al(o);
        i.call(d);
      };
    }
    var o = Cd(t, r, e, 0, null, !1, !1, "", ru);
    return (
      (e._reactRootContainer = o),
      (e[Xe] = o.current),
      Hn(e.nodeType === 8 ? e.parentNode : e),
      Rt(),
      o
    );
  }
  for (; (l = e.lastChild); ) e.removeChild(l);
  if (typeof r == "function") {
    var a = r;
    r = function () {
      var d = al(u);
      a.call(d);
    };
  }
  var u = Wo(e, 0, !1, null, null, !1, !1, "", ru);
  return (
    (e._reactRootContainer = u),
    (e[Xe] = u.current),
    Hn(e.nodeType === 8 ? e.parentNode : e),
    Rt(function () {
      Nl(t, u, n, r);
    }),
    u
  );
}
function xl(e, t, n, r, l) {
  var i = n._reactRootContainer;
  if (i) {
    var o = i;
    if (typeof l == "function") {
      var a = l;
      l = function () {
        var u = al(o);
        a.call(u);
      };
    }
    Nl(t, o, e, l);
  } else o = h0(n, t, e, l, r);
  return al(o);
}
es = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = En(t.pendingLanes);
        n !== 0 &&
          (co(t, n | 1), he(t, K()), !(A & 6) && ((un = K() + 500), vt()));
      }
      break;
    case 13:
      Rt(function () {
        var r = Ye(e, 1);
        if (r !== null) {
          var l = ue();
          Ae(r, e, 1, l);
        }
      }),
        Ho(e, 1);
  }
};
fo = function (e) {
  if (e.tag === 13) {
    var t = Ye(e, 134217728);
    if (t !== null) {
      var n = ue();
      Ae(t, e, 134217728, n);
    }
    Ho(e, 134217728);
  }
};
ts = function (e) {
  if (e.tag === 13) {
    var t = ct(e),
      n = Ye(e, t);
    if (n !== null) {
      var r = ue();
      Ae(n, e, t, r);
    }
    Ho(e, t);
  }
};
ns = function () {
  return j;
};
rs = function (e, t) {
  var n = j;
  try {
    return (j = e), t();
  } finally {
    j = n;
  }
};
vi = function (e, t, n) {
  switch (t) {
    case "input":
      if ((di(e, n), (t = n.name), n.type === "radio" && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (
          n = n.querySelectorAll(
            "input[name=" + JSON.stringify("" + t) + '][type="radio"]'
          ),
            t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = pl(r);
            if (!l) throw Error(N(90));
            Au(r), di(r, l);
          }
        }
      }
      break;
    case "textarea":
      Mu(e, n);
      break;
    case "select":
      (t = n.value), t != null && Gt(e, !!n.multiple, t, !1);
  }
};
Wu = Uo;
Hu = Rt;
var g0 = { usingClientEntryPoint: !1, Events: [lr, Bt, pl, Vu, Bu, Uo] },
  kn = {
    findFiberByHostInstance: kt,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom",
  },
  v0 = {
    bundleType: kn.bundleType,
    version: kn.version,
    rendererPackageName: kn.rendererPackageName,
    rendererConfig: kn.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: Ze.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return (e = Xu(e)), e === null ? null : e.stateNode;
    },
    findFiberByHostInstance: kn.findFiberByHostInstance || m0,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Cr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Cr.isDisabled && Cr.supportsFiber)
    try {
      (sl = Cr.inject(v0)), (Ue = Cr);
    } catch {}
}
Ne.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = g0;
Ne.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Ko(t)) throw Error(N(200));
  return p0(e, t, null, n);
};
Ne.createRoot = function (e, t) {
  if (!Ko(e)) throw Error(N(299));
  var n = !1,
    r = "",
    l = Ed;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (l = t.onRecoverableError)),
    (t = Wo(e, 1, !1, null, null, n, !1, r, l)),
    (e[Xe] = t.current),
    Hn(e.nodeType === 8 ? e.parentNode : e),
    new Qo(t)
  );
};
Ne.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(N(188))
      : ((e = Object.keys(e).join(",")), Error(N(268, e)));
  return (e = Xu(t)), (e = e === null ? null : e.stateNode), e;
};
Ne.flushSync = function (e) {
  return Rt(e);
};
Ne.hydrate = function (e, t, n) {
  if (!kl(t)) throw Error(N(200));
  return xl(null, e, t, !0, n);
};
Ne.hydrateRoot = function (e, t, n) {
  if (!Ko(e)) throw Error(N(405));
  var r = (n != null && n.hydratedSources) || null,
    l = !1,
    i = "",
    o = Ed;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (l = !0),
      n.identifierPrefix !== void 0 && (i = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (o = n.onRecoverableError)),
    (t = Cd(t, null, e, 1, n ?? null, l, !1, i, o)),
    (e[Xe] = t.current),
    Hn(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      (n = r[e]),
        (l = n._getVersion),
        (l = l(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, l])
          : t.mutableSourceEagerHydrationData.push(n, l);
  return new Sl(t);
};
Ne.render = function (e, t, n) {
  if (!kl(t)) throw Error(N(200));
  return xl(null, e, t, !1, n);
};
Ne.unmountComponentAtNode = function (e) {
  if (!kl(e)) throw Error(N(40));
  return e._reactRootContainer
    ? (Rt(function () {
        xl(null, null, e, !1, function () {
          (e._reactRootContainer = null), (e[Xe] = null);
        });
      }),
      !0)
    : !1;
};
Ne.unstable_batchedUpdates = Uo;
Ne.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!kl(n)) throw Error(N(200));
  if (e == null || e._reactInternals === void 0) throw Error(N(38));
  return xl(e, t, n, !1, r);
};
Ne.version = "18.3.1-next-f1338f8080-20240426";
function Ld() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Ld);
    } catch (e) {
      console.error(e);
    }
}
Ld(), (Lu.exports = Ne);
var y0 = Lu.exports,
  _d,
  lu = y0;
(_d = lu.createRoot), lu.hydrateRoot;
/**
 * @remix-run/router v1.22.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function bn() {
  return (
    (bn = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    bn.apply(this, arguments)
  );
}
var lt;
(function (e) {
  (e.Pop = "POP"), (e.Push = "PUSH"), (e.Replace = "REPLACE");
})(lt || (lt = {}));
const iu = "popstate";
function w0(e) {
  e === void 0 && (e = {});
  function t(r, l) {
    let { pathname: i, search: o, hash: a } = r.location;
    return Zi(
      "",
      { pathname: i, search: o, hash: a },
      (l.state && l.state.usr) || null,
      (l.state && l.state.key) || "default"
    );
  }
  function n(r, l) {
    return typeof l == "string" ? l : Id(l);
  }
  return S0(t, n, null, e);
}
function Z(e, t) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
function Pd(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {}
  }
}
function N0() {
  return Math.random().toString(36).substr(2, 8);
}
function ou(e, t) {
  return { usr: e.state, key: e.key, idx: t };
}
function Zi(e, t, n, r) {
  return (
    n === void 0 && (n = null),
    bn(
      { pathname: typeof e == "string" ? e : e.pathname, search: "", hash: "" },
      typeof t == "string" ? fn(t) : t,
      { state: n, key: (t && t.key) || r || N0() }
    )
  );
}
function Id(e) {
  let { pathname: t = "/", search: n = "", hash: r = "" } = e;
  return (
    n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n),
    r && r !== "#" && (t += r.charAt(0) === "#" ? r : "#" + r),
    t
  );
}
function fn(e) {
  let t = {};
  if (e) {
    let n = e.indexOf("#");
    n >= 0 && ((t.hash = e.substr(n)), (e = e.substr(0, n)));
    let r = e.indexOf("?");
    r >= 0 && ((t.search = e.substr(r)), (e = e.substr(0, r))),
      e && (t.pathname = e);
  }
  return t;
}
function S0(e, t, n, r) {
  r === void 0 && (r = {});
  let { window: l = document.defaultView, v5Compat: i = !1 } = r,
    o = l.history,
    a = lt.Pop,
    u = null,
    d = m();
  d == null && ((d = 0), o.replaceState(bn({}, o.state, { idx: d }), ""));
  function m() {
    return (o.state || { idx: null }).idx;
  }
  function f() {
    a = lt.Pop;
    let k = m(),
      c = k == null ? null : k - d;
    (d = k), u && u({ action: a, location: y.location, delta: c });
  }
  function h(k, c) {
    a = lt.Push;
    let s = Zi(y.location, k, c);
    d = m() + 1;
    let p = ou(s, d),
      w = y.createHref(s);
    try {
      o.pushState(p, "", w);
    } catch (S) {
      if (S instanceof DOMException && S.name === "DataCloneError") throw S;
      l.location.assign(w);
    }
    i && u && u({ action: a, location: y.location, delta: 1 });
  }
  function g(k, c) {
    a = lt.Replace;
    let s = Zi(y.location, k, c);
    d = m();
    let p = ou(s, d),
      w = y.createHref(s);
    o.replaceState(p, "", w),
      i && u && u({ action: a, location: y.location, delta: 0 });
  }
  function v(k) {
    let c = l.location.origin !== "null" ? l.location.origin : l.location.href,
      s = typeof k == "string" ? k : Id(k);
    return (
      (s = s.replace(/ $/, "%20")),
      Z(
        c,
        "No window.location.(origin|href) available to create URL for href: " +
          s
      ),
      new URL(s, c)
    );
  }
  let y = {
    get action() {
      return a;
    },
    get location() {
      return e(l, o);
    },
    listen(k) {
      if (u) throw new Error("A history only accepts one active listener");
      return (
        l.addEventListener(iu, f),
        (u = k),
        () => {
          l.removeEventListener(iu, f), (u = null);
        }
      );
    },
    createHref(k) {
      return t(l, k);
    },
    createURL: v,
    encodeLocation(k) {
      let c = v(k);
      return { pathname: c.pathname, search: c.search, hash: c.hash };
    },
    push: h,
    replace: g,
    go(k) {
      return o.go(k);
    },
  };
  return y;
}
var au;
(function (e) {
  (e.data = "data"),
    (e.deferred = "deferred"),
    (e.redirect = "redirect"),
    (e.error = "error");
})(au || (au = {}));
function k0(e, t, n) {
  return n === void 0 && (n = "/"), x0(e, t, n);
}
function x0(e, t, n, r) {
  let l = typeof t == "string" ? fn(t) : t,
    i = Rd(l.pathname || "/", n);
  if (i == null) return null;
  let o = Dd(e);
  C0(o);
  let a = null;
  for (let u = 0; a == null && u < o.length; ++u) {
    let d = M0(i);
    a = T0(o[u], d);
  }
  return a;
}
function Dd(e, t, n, r) {
  t === void 0 && (t = []), n === void 0 && (n = []), r === void 0 && (r = "");
  let l = (i, o, a) => {
    let u = {
      relativePath: a === void 0 ? i.path || "" : a,
      caseSensitive: i.caseSensitive === !0,
      childrenIndex: o,
      route: i,
    };
    u.relativePath.startsWith("/") &&
      (Z(
        u.relativePath.startsWith(r),
        'Absolute route path "' +
          u.relativePath +
          '" nested under path ' +
          ('"' + r + '" is not valid. An absolute child route path ') +
          "must start with the combined path of all its parent routes."
      ),
      (u.relativePath = u.relativePath.slice(r.length)));
    let d = _t([r, u.relativePath]),
      m = n.concat(u);
    i.children &&
      i.children.length > 0 &&
      (Z(
        i.index !== !0,
        "Index routes must not have child routes. Please remove " +
          ('all child routes from route path "' + d + '".')
      ),
      Dd(i.children, t, m, d)),
      !(i.path == null && !i.index) &&
        t.push({ path: d, score: z0(d, i.index), routesMeta: m });
  };
  return (
    e.forEach((i, o) => {
      var a;
      if (i.path === "" || !((a = i.path) != null && a.includes("?"))) l(i, o);
      else for (let u of zd(i.path)) l(i, o, u);
    }),
    t
  );
}
function zd(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [n, ...r] = t,
    l = n.endsWith("?"),
    i = n.replace(/\?$/, "");
  if (r.length === 0) return l ? [i, ""] : [i];
  let o = zd(r.join("/")),
    a = [];
  return (
    a.push(...o.map((u) => (u === "" ? i : [i, u].join("/")))),
    l && a.push(...o),
    a.map((u) => (e.startsWith("/") && u === "" ? "/" : u))
  );
}
function C0(e) {
  e.sort((t, n) =>
    t.score !== n.score
      ? n.score - t.score
      : R0(
          t.routesMeta.map((r) => r.childrenIndex),
          n.routesMeta.map((r) => r.childrenIndex)
        )
  );
}
const E0 = /^:[\w-]+$/,
  L0 = 3,
  _0 = 2,
  P0 = 1,
  I0 = 10,
  D0 = -2,
  uu = (e) => e === "*";
function z0(e, t) {
  let n = e.split("/"),
    r = n.length;
  return (
    n.some(uu) && (r += D0),
    t && (r += _0),
    n
      .filter((l) => !uu(l))
      .reduce((l, i) => l + (E0.test(i) ? L0 : i === "" ? P0 : I0), r)
  );
}
function R0(e, t) {
  return e.length === t.length && e.slice(0, -1).every((r, l) => r === t[l])
    ? e[e.length - 1] - t[t.length - 1]
    : 0;
}
function T0(e, t, n) {
  let { routesMeta: r } = e,
    l = {},
    i = "/",
    o = [];
  for (let a = 0; a < r.length; ++a) {
    let u = r[a],
      d = a === r.length - 1,
      m = i === "/" ? t : t.slice(i.length) || "/",
      f = A0(
        { path: u.relativePath, caseSensitive: u.caseSensitive, end: d },
        m
      ),
      h = u.route;
    if (!f) return null;
    Object.assign(l, f.params),
      o.push({
        params: l,
        pathname: _t([i, f.pathname]),
        pathnameBase: B0(_t([i, f.pathnameBase])),
        route: h,
      }),
      f.pathnameBase !== "/" && (i = _t([i, f.pathnameBase]));
  }
  return o;
}
function A0(e, t) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [n, r] = j0(e.path, e.caseSensitive, e.end),
    l = t.match(n);
  if (!l) return null;
  let i = l[0],
    o = i.replace(/(.)\/+$/, "$1"),
    a = l.slice(1);
  return {
    params: r.reduce((d, m, f) => {
      let { paramName: h, isOptional: g } = m;
      if (h === "*") {
        let y = a[f] || "";
        o = i.slice(0, i.length - y.length).replace(/(.)\/+$/, "$1");
      }
      const v = a[f];
      return (
        g && !v ? (d[h] = void 0) : (d[h] = (v || "").replace(/%2F/g, "/")), d
      );
    }, {}),
    pathname: i,
    pathnameBase: o,
    pattern: e,
  };
}
function j0(e, t, n) {
  t === void 0 && (t = !1),
    n === void 0 && (n = !0),
    Pd(
      e === "*" || !e.endsWith("*") || e.endsWith("/*"),
      'Route path "' +
        e +
        '" will be treated as if it were ' +
        ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') +
        "always follow a `/` in the pattern. To get rid of this warning, " +
        ('please change the route path to "' + e.replace(/\*$/, "/*") + '".')
    );
  let r = [],
    l =
      "^" +
      e
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (o, a, u) => (
            r.push({ paramName: a, isOptional: u != null }),
            u ? "/?([^\\/]+)?" : "/([^\\/]+)"
          )
        );
  return (
    e.endsWith("*")
      ? (r.push({ paramName: "*" }),
        (l += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : n
      ? (l += "\\/*$")
      : e !== "" && e !== "/" && (l += "(?:(?=\\/|$))"),
    [new RegExp(l, t ? void 0 : "i"), r]
  );
}
function M0(e) {
  try {
    return e
      .split("/")
      .map((t) => decodeURIComponent(t).replace(/\//g, "%2F"))
      .join("/");
  } catch (t) {
    return (
      Pd(
        !1,
        'The URL path "' +
          e +
          '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
          ("encoding (" + t + ").")
      ),
      e
    );
  }
}
function Rd(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let n = t.endsWith("/") ? t.length - 1 : t.length,
    r = e.charAt(n);
  return r && r !== "/" ? null : e.slice(n) || "/";
}
function O0(e, t) {
  t === void 0 && (t = "/");
  let {
    pathname: n,
    search: r = "",
    hash: l = "",
  } = typeof e == "string" ? fn(e) : e;
  return {
    pathname: n ? (n.startsWith("/") ? n : F0(n, t)) : t,
    search: W0(r),
    hash: H0(l),
  };
}
function F0(e, t) {
  let n = t.replace(/\/+$/, "").split("/");
  return (
    e.split("/").forEach((l) => {
      l === ".." ? n.length > 1 && n.pop() : l !== "." && n.push(l);
    }),
    n.length > 1 ? n.join("/") : "/"
  );
}
function ni(e, t, n, r) {
  return (
    "Cannot include a '" +
    e +
    "' character in a manually specified " +
    ("`to." +
      t +
      "` field [" +
      JSON.stringify(r) +
      "].  Please separate it out to the ") +
    ("`to." + n + "` field. Alternatively you may provide the full path as ") +
    'a string in <Link to="..."> and the router will parse it for you.'
  );
}
function U0(e) {
  return e.filter(
    (t, n) => n === 0 || (t.route.path && t.route.path.length > 0)
  );
}
function $0(e, t) {
  let n = U0(e);
  return t
    ? n.map((r, l) => (l === n.length - 1 ? r.pathname : r.pathnameBase))
    : n.map((r) => r.pathnameBase);
}
function V0(e, t, n, r) {
  r === void 0 && (r = !1);
  let l;
  typeof e == "string"
    ? (l = fn(e))
    : ((l = bn({}, e)),
      Z(
        !l.pathname || !l.pathname.includes("?"),
        ni("?", "pathname", "search", l)
      ),
      Z(
        !l.pathname || !l.pathname.includes("#"),
        ni("#", "pathname", "hash", l)
      ),
      Z(!l.search || !l.search.includes("#"), ni("#", "search", "hash", l)));
  let i = e === "" || l.pathname === "",
    o = i ? "/" : l.pathname,
    a;
  if (o == null) a = n;
  else {
    let f = t.length - 1;
    if (!r && o.startsWith("..")) {
      let h = o.split("/");
      for (; h[0] === ".."; ) h.shift(), (f -= 1);
      l.pathname = h.join("/");
    }
    a = f >= 0 ? t[f] : "/";
  }
  let u = O0(l, a),
    d = o && o !== "/" && o.endsWith("/"),
    m = (i || o === ".") && n.endsWith("/");
  return !u.pathname.endsWith("/") && (d || m) && (u.pathname += "/"), u;
}
const _t = (e) => e.join("/").replace(/\/\/+/g, "/"),
  B0 = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
  W0 = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
  H0 = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e);
function Q0(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.internal == "boolean" &&
    "data" in e
  );
}
const Td = ["post", "put", "patch", "delete"];
new Set(Td);
const K0 = ["get", ...Td];
new Set(K0);
/**
 * React Router v6.29.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function er() {
  return (
    (er = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    er.apply(this, arguments)
  );
}
const Xo = x.createContext(null),
  X0 = x.createContext(null),
  Cl = x.createContext(null),
  El = x.createContext(null),
  jt = x.createContext({ outlet: null, matches: [], isDataRoute: !1 }),
  Ad = x.createContext(null);
function Ll() {
  return x.useContext(El) != null;
}
function jd() {
  return Ll() || Z(!1), x.useContext(El).location;
}
function Md(e) {
  x.useContext(Cl).static || x.useLayoutEffect(e);
}
function Yo() {
  let { isDataRoute: e } = x.useContext(jt);
  return e ? ap() : Y0();
}
function Y0() {
  Ll() || Z(!1);
  let e = x.useContext(Xo),
    { basename: t, future: n, navigator: r } = x.useContext(Cl),
    { matches: l } = x.useContext(jt),
    { pathname: i } = jd(),
    o = JSON.stringify($0(l, n.v7_relativeSplatPath)),
    a = x.useRef(!1);
  return (
    Md(() => {
      a.current = !0;
    }),
    x.useCallback(
      function (d, m) {
        if ((m === void 0 && (m = {}), !a.current)) return;
        if (typeof d == "number") {
          r.go(d);
          return;
        }
        let f = V0(d, JSON.parse(o), i, m.relative === "path");
        e == null &&
          t !== "/" &&
          (f.pathname = f.pathname === "/" ? t : _t([t, f.pathname])),
          (m.replace ? r.replace : r.push)(f, m.state, m);
      },
      [t, r, o, i, e]
    )
  );
}
function G0() {
  let { matches: e } = x.useContext(jt),
    t = e[e.length - 1];
  return t ? t.params : {};
}
function Z0(e, t) {
  return J0(e, t);
}
function J0(e, t, n, r) {
  Ll() || Z(!1);
  let { navigator: l, static: i } = x.useContext(Cl),
    { matches: o } = x.useContext(jt),
    a = o[o.length - 1],
    u = a ? a.params : {};
  a && a.pathname;
  let d = a ? a.pathnameBase : "/";
  a && a.route;
  let m = jd(),
    f;
  if (t) {
    var h;
    let c = typeof t == "string" ? fn(t) : t;
    d === "/" || ((h = c.pathname) != null && h.startsWith(d)) || Z(!1),
      (f = c);
  } else f = m;
  let g = f.pathname || "/",
    v = g;
  if (d !== "/") {
    let c = d.replace(/^\//, "").split("/");
    v = "/" + g.replace(/^\//, "").split("/").slice(c.length).join("/");
  }
  let y = k0(e, { pathname: v }),
    k = np(
      y &&
        y.map((c) =>
          Object.assign({}, c, {
            params: Object.assign({}, u, c.params),
            pathname: _t([
              d,
              l.encodeLocation
                ? l.encodeLocation(c.pathname).pathname
                : c.pathname,
            ]),
            pathnameBase:
              c.pathnameBase === "/"
                ? d
                : _t([
                    d,
                    l.encodeLocation
                      ? l.encodeLocation(c.pathnameBase).pathname
                      : c.pathnameBase,
                  ]),
          })
        ),
      o,
      n,
      r
    );
  return t && k
    ? x.createElement(
        El.Provider,
        {
          value: {
            location: er(
              {
                pathname: "/",
                search: "",
                hash: "",
                state: null,
                key: "default",
              },
              f
            ),
            navigationType: lt.Pop,
          },
        },
        k
      )
    : k;
}
function q0() {
  let e = op(),
    t = Q0(e)
      ? e.status + " " + e.statusText
      : e instanceof Error
      ? e.message
      : JSON.stringify(e),
    n = e instanceof Error ? e.stack : null,
    l = { padding: "0.5rem", backgroundColor: "rgba(200,200,200, 0.5)" };
  return x.createElement(
    x.Fragment,
    null,
    x.createElement("h2", null, "Unexpected Application Error!"),
    x.createElement("h3", { style: { fontStyle: "italic" } }, t),
    n ? x.createElement("pre", { style: l }, n) : null,
    null
  );
}
const b0 = x.createElement(q0, null);
class ep extends x.Component {
  constructor(t) {
    super(t),
      (this.state = {
        location: t.location,
        revalidation: t.revalidation,
        error: t.error,
      });
  }
  static getDerivedStateFromError(t) {
    return { error: t };
  }
  static getDerivedStateFromProps(t, n) {
    return n.location !== t.location ||
      (n.revalidation !== "idle" && t.revalidation === "idle")
      ? { error: t.error, location: t.location, revalidation: t.revalidation }
      : {
          error: t.error !== void 0 ? t.error : n.error,
          location: n.location,
          revalidation: t.revalidation || n.revalidation,
        };
  }
  componentDidCatch(t, n) {
    console.error(
      "React Router caught the following error during render",
      t,
      n
    );
  }
  render() {
    return this.state.error !== void 0
      ? x.createElement(
          jt.Provider,
          { value: this.props.routeContext },
          x.createElement(Ad.Provider, {
            value: this.state.error,
            children: this.props.component,
          })
        )
      : this.props.children;
  }
}
function tp(e) {
  let { routeContext: t, match: n, children: r } = e,
    l = x.useContext(Xo);
  return (
    l &&
      l.static &&
      l.staticContext &&
      (n.route.errorElement || n.route.ErrorBoundary) &&
      (l.staticContext._deepestRenderedBoundaryId = n.route.id),
    x.createElement(jt.Provider, { value: t }, r)
  );
}
function np(e, t, n, r) {
  var l;
  if (
    (t === void 0 && (t = []),
    n === void 0 && (n = null),
    r === void 0 && (r = null),
    e == null)
  ) {
    var i;
    if (!n) return null;
    if (n.errors) e = n.matches;
    else if (
      (i = r) != null &&
      i.v7_partialHydration &&
      t.length === 0 &&
      !n.initialized &&
      n.matches.length > 0
    )
      e = n.matches;
    else return null;
  }
  let o = e,
    a = (l = n) == null ? void 0 : l.errors;
  if (a != null) {
    let m = o.findIndex(
      (f) => f.route.id && (a == null ? void 0 : a[f.route.id]) !== void 0
    );
    m >= 0 || Z(!1), (o = o.slice(0, Math.min(o.length, m + 1)));
  }
  let u = !1,
    d = -1;
  if (n && r && r.v7_partialHydration)
    for (let m = 0; m < o.length; m++) {
      let f = o[m];
      if (
        ((f.route.HydrateFallback || f.route.hydrateFallbackElement) && (d = m),
        f.route.id)
      ) {
        let { loaderData: h, errors: g } = n,
          v =
            f.route.loader &&
            h[f.route.id] === void 0 &&
            (!g || g[f.route.id] === void 0);
        if (f.route.lazy || v) {
          (u = !0), d >= 0 ? (o = o.slice(0, d + 1)) : (o = [o[0]]);
          break;
        }
      }
    }
  return o.reduceRight((m, f, h) => {
    let g,
      v = !1,
      y = null,
      k = null;
    n &&
      ((g = a && f.route.id ? a[f.route.id] : void 0),
      (y = f.route.errorElement || b0),
      u &&
        (d < 0 && h === 0
          ? (up("route-fallback"), (v = !0), (k = null))
          : d === h &&
            ((v = !0), (k = f.route.hydrateFallbackElement || null))));
    let c = t.concat(o.slice(0, h + 1)),
      s = () => {
        let p;
        return (
          g
            ? (p = y)
            : v
            ? (p = k)
            : f.route.Component
            ? (p = x.createElement(f.route.Component, null))
            : f.route.element
            ? (p = f.route.element)
            : (p = m),
          x.createElement(tp, {
            match: f,
            routeContext: { outlet: m, matches: c, isDataRoute: n != null },
            children: p,
          })
        );
      };
    return n && (f.route.ErrorBoundary || f.route.errorElement || h === 0)
      ? x.createElement(ep, {
          location: n.location,
          revalidation: n.revalidation,
          component: y,
          error: g,
          children: s(),
          routeContext: { outlet: null, matches: c, isDataRoute: !0 },
        })
      : s();
  }, null);
}
var Od = (function (e) {
    return (
      (e.UseBlocker = "useBlocker"),
      (e.UseRevalidator = "useRevalidator"),
      (e.UseNavigateStable = "useNavigate"),
      e
    );
  })(Od || {}),
  Fd = (function (e) {
    return (
      (e.UseBlocker = "useBlocker"),
      (e.UseLoaderData = "useLoaderData"),
      (e.UseActionData = "useActionData"),
      (e.UseRouteError = "useRouteError"),
      (e.UseNavigation = "useNavigation"),
      (e.UseRouteLoaderData = "useRouteLoaderData"),
      (e.UseMatches = "useMatches"),
      (e.UseRevalidator = "useRevalidator"),
      (e.UseNavigateStable = "useNavigate"),
      (e.UseRouteId = "useRouteId"),
      e
    );
  })(Fd || {});
function rp(e) {
  let t = x.useContext(Xo);
  return t || Z(!1), t;
}
function lp(e) {
  let t = x.useContext(X0);
  return t || Z(!1), t;
}
function ip(e) {
  let t = x.useContext(jt);
  return t || Z(!1), t;
}
function Ud(e) {
  let t = ip(),
    n = t.matches[t.matches.length - 1];
  return n.route.id || Z(!1), n.route.id;
}
function op() {
  var e;
  let t = x.useContext(Ad),
    n = lp(),
    r = Ud();
  return t !== void 0 ? t : (e = n.errors) == null ? void 0 : e[r];
}
function ap() {
  let { router: e } = rp(Od.UseNavigateStable),
    t = Ud(Fd.UseNavigateStable),
    n = x.useRef(!1);
  return (
    Md(() => {
      n.current = !0;
    }),
    x.useCallback(
      function (l, i) {
        i === void 0 && (i = {}),
          n.current &&
            (typeof l == "number"
              ? e.navigate(l)
              : e.navigate(l, er({ fromRouteId: t }, i)));
      },
      [e, t]
    )
  );
}
const su = {};
function up(e, t, n) {
  su[e] || (su[e] = !0);
}
function sp(e, t) {
  e == null || e.v7_startTransition, e == null || e.v7_relativeSplatPath;
}
function Or(e) {
  Z(!1);
}
function dp(e) {
  let {
    basename: t = "/",
    children: n = null,
    location: r,
    navigationType: l = lt.Pop,
    navigator: i,
    static: o = !1,
    future: a,
  } = e;
  Ll() && Z(!1);
  let u = t.replace(/^\/*/, "/"),
    d = x.useMemo(
      () => ({
        basename: u,
        navigator: i,
        static: o,
        future: er({ v7_relativeSplatPath: !1 }, a),
      }),
      [u, a, i, o]
    );
  typeof r == "string" && (r = fn(r));
  let {
      pathname: m = "/",
      search: f = "",
      hash: h = "",
      state: g = null,
      key: v = "default",
    } = r,
    y = x.useMemo(() => {
      let k = Rd(m, u);
      return k == null
        ? null
        : {
            location: { pathname: k, search: f, hash: h, state: g, key: v },
            navigationType: l,
          };
    }, [u, m, f, h, g, v, l]);
  return y == null
    ? null
    : x.createElement(
        Cl.Provider,
        { value: d },
        x.createElement(El.Provider, { children: n, value: y })
      );
}
function cp(e) {
  let { children: t, location: n } = e;
  return Z0(Ji(t), n);
}
new Promise(() => {});
function Ji(e, t) {
  t === void 0 && (t = []);
  let n = [];
  return (
    x.Children.forEach(e, (r, l) => {
      if (!x.isValidElement(r)) return;
      let i = [...t, l];
      if (r.type === x.Fragment) {
        n.push.apply(n, Ji(r.props.children, i));
        return;
      }
      r.type !== Or && Z(!1), !r.props.index || !r.props.children || Z(!1);
      let o = {
        id: r.props.id || i.join("-"),
        caseSensitive: r.props.caseSensitive,
        element: r.props.element,
        Component: r.props.Component,
        index: r.props.index,
        path: r.props.path,
        loader: r.props.loader,
        action: r.props.action,
        errorElement: r.props.errorElement,
        ErrorBoundary: r.props.ErrorBoundary,
        hasErrorBoundary:
          r.props.ErrorBoundary != null || r.props.errorElement != null,
        shouldRevalidate: r.props.shouldRevalidate,
        handle: r.props.handle,
        lazy: r.props.lazy,
      };
      r.props.children && (o.children = Ji(r.props.children, i)), n.push(o);
    }),
    n
  );
}
/**
 * React Router DOM v6.29.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ const fp = "6";
try {
  window.__reactRouterVersion = fp;
} catch {}
const pp = "startTransition",
  du = oc[pp];
function mp(e) {
  let { basename: t, children: n, future: r, window: l } = e,
    i = x.useRef();
  i.current == null && (i.current = w0({ window: l, v5Compat: !0 }));
  let o = i.current,
    [a, u] = x.useState({ action: o.action, location: o.location }),
    { v7_startTransition: d } = r || {},
    m = x.useCallback(
      (f) => {
        d && du ? du(() => u(f)) : u(f);
      },
      [u, d]
    );
  return (
    x.useLayoutEffect(() => o.listen(m), [o, m]),
    x.useEffect(() => sp(r), [r]),
    x.createElement(dp, {
      basename: t,
      children: n,
      location: a.location,
      navigationType: a.action,
      navigator: o,
      future: r,
    })
  );
}
var cu;
(function (e) {
  (e.UseScrollRestoration = "useScrollRestoration"),
    (e.UseSubmit = "useSubmit"),
    (e.UseSubmitFetcher = "useSubmitFetcher"),
    (e.UseFetcher = "useFetcher"),
    (e.useViewTransitionState = "useViewTransitionState");
})(cu || (cu = {}));
var fu;
(function (e) {
  (e.UseFetcher = "useFetcher"),
    (e.UseFetchers = "useFetchers"),
    (e.UseScrollRestoration = "useScrollRestoration");
})(fu || (fu = {}));
function hp() {
  const e = Yo();
  return I.jsxs("div", {
    className: "min-h-screen flex flex-col",
    children: [
      I.jsxs("main", {
        className:
          "flex-1 flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-green-50",
        children: [
          I.jsx("h1", {
            className: "text-4xl md:text-6xl font-bold text-gray-800 mb-8",
            children: "대한민국 100대 명산",
          }),
          I.jsxs("button", {
            onClick: () => e("/list"),
            className:
              "group relative w-32 h-32 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center overflow-hidden",
            children: [
              I.jsx("div", {
                className:
                  "absolute inset-0 bg-gradient-to-br from-green-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
              }),
              I.jsx("span", {
                className:
                  "text-4xl relative z-10 group-hover:scale-110 transition-transform duration-300",
                children: "⛰️",
              }),
            ],
          }),
        ],
      }),
      I.jsx("footer", {
        className: "bg-white py-4 text-center shadow-lg",
        children: I.jsx("p", {
          className: "text-gray-600",
          children: "한국등산-트레킹지원센터 정보 제공",
        }),
      }),
    ],
  });
}
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var gp = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const vp = (e) =>
    e
      .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
      .toLowerCase()
      .trim(),
  yp = (e, t) => {
    const n = x.forwardRef(
      (
        {
          color: r = "currentColor",
          size: l = 24,
          strokeWidth: i = 2,
          absoluteStrokeWidth: o,
          className: a = "",
          children: u,
          ...d
        },
        m
      ) =>
        x.createElement(
          "svg",
          {
            ref: m,
            ...gp,
            width: l,
            height: l,
            stroke: r,
            strokeWidth: o ? (Number(i) * 24) / Number(l) : i,
            className: ["lucide", `lucide-${vp(e)}`, a].join(" "),
            ...d,
          },
          [
            ...t.map(([f, h]) => x.createElement(f, h)),
            ...(Array.isArray(u) ? u : [u]),
          ]
        )
    );
    return (n.displayName = `${e}`), n;
  };
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const $d = yp("ArrowLeft", [
    ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
    ["path", { d: "M19 12H5", key: "x3x0zl" }],
  ]),
  wp = [
    {
      id: 1,
      name: "가리산",
      height: 1050.9,
      address: "강원도 홍천군 두촌면ㆍ화촌면, 춘천시 북산면ㆍ동면",
      reason: `강원도에서 진달래가 가장 많이 피는 산으로 알려져 있고, 참나무 중심의 울창한 산림과 부드러운 산줄기 등 우리나라 산의 전형적인 모습을 갖추고 있으며, 홍천강의 발원지 및 소양강의 수원(水源)을 이루고 있는 점 등을 고려하여 선정
암봉이 솟아있는 정상에서 소양호를 조망할 수 있고, 야생화가 많이 서식하여 자연학습관찰에도 좋은 여건을 갖추고 있음. '98년 강원도에서 자연휴양림으로 지정`,
    },
    {
      id: 2,
      name: "가리왕산",
      height: 1561.9,
      address: "강원도 정선군 북평면ㆍ정선읍 회동리, 평창군 진부면",
      reason: `가리왕산 8경이 전해질 만큼 경관이 수려하고, 활엽수 극상림이 분포해 있으며, 전국적인 산나물 자생지로 유명. 특히 백두대간의 중심으로 주목군락지가 있어 산림유전자원보호림과 자연휴양림으로 지정되는 등 경관·생태적으로 가치가 큰 점에서 선정
동강(東江)에 흘러드는 오대천과 조양강의 발원지이며 석회암 절리동굴인 얼음동굴이 유명. 산의 이름은 그 모습이 큰 가리(벼나 나무를 쌓은 더미)같다고 하여 유래 `,
    },
    {
      id: 3,
      name: "가야산",
      height: 1432.6,
      address: "경상남도 합천군ㆍ거창군, 경상북도 성주군",
      reason:
        "예로부터 우리나라의 12대 명산 또는 8경에 속하는 산으로서 '72년 국립공원으로 지정되었으며, 특히 '95년 세계문화유산으로 지정된 국보 팔만대장경과 해인사가 있는 등 역사·문화적 가치가 높은 점을 고려하여 선정,\n`가야국'이 있었던 곳으로 전해지며, `택리지'에서는 가야산의 기암괴봉을 불꽃에 비유하여 석화성(石火星)이라 하였음. 산위에서의 조망이 좋고, 특히 용문폭포와 홍류동 계곡 등이 유명 ",
    },
    {
      id: 4,
      name: "가지산",
      height: 1240.9,
      address: "울산광역시 울주군, 경상북도 청도군, 경상남도 밀양시",
      reason: "백두대간 남단의 중심으로 ",
    },
    {
      id: 5,
      name: "감악산",
      height: 674.9,
      address: "경기도 파주시 적성면, 양주시 남면, 연천군 전곡읍",
      reason:
        "예로부터 경기 5악의 하나로서 폭포·계곡·암벽 등을 고루 갖추고 있으며, 임진강·개성 송악산 등의 조망이 좋은 점 등을 고려하여 선정\n수량이 풍부한 운계폭포가 있고, 정상에는 글자가 모두 마멸되어 판독이 불가능한 비뜰대왕비(파주군 향토유적 제8호)가 있는데 `설인귀(薛人貴)'설과 `진흥왕 순수비'설이 나뉘어 속전되고 있음. 임꺽정이 관군의 추격을 피하기 위해 숨어 지냈다는 장군봉 아래 임꺽정 굴이 있음. ",
    },
    {
      id: 6,
      name: "강천산",
      height: 583.7,
      address: "전라북도 순창군 팔덕면, 전라남도 담양군 용면",
      reason: `군립공원(1981년 지정)으로 지정되어 있으며, 강천계곡 등 경관이 수려하고 조망이 좋은 점 등을 고려하여 선정
신라 진성여왕때(887년) 도선국사가 개창한 강천사(剛泉寺)가 있으며, 산 이름도 강천사(剛泉寺)에서 유래. 삼국시대에 축조된 것으로 추정되는 금성산성(金城山城)이 유명 `,
    },
    {
      id: 7,
      name: "계룡산",
      height: 846.5,
      address:
        "대전광역시, 충청남도 공주시 계룡면, 논산시 상월면, 계룡시 신도안면",
      reason:
        "예로부터 신라 5악의 하나인 서악(西岳)으로 지칭되었고, 조선시대에는 3악 중 중악(中岳)으로 불리운 산으로서 국립공원으로 지정(1968년)된 점 등을 고려하여 선정산 능선이 마치 닭의 벼슬을 쓴 용의 모습과 닮았다고 하여 계룡산이라는 이름이 유래되었으며, `정감록(鄭鑑錄)`에 언급된 십승지지(十勝之地)중 하나임. 신라 성덕왕 2년(724년) 회의화상이 창건한 동학사(東鶴寺)와 백제 구이신왕(420년)때 고구려의 아도화상에 의하여 창건된 갑사(甲寺)등이 유명\n",
    },
    {
      id: 8,
      name: "계방산",
      height: 1579.1,
      address: "강원도 홍천군 내면, 평창군 용편면ㆍ진부면",
      reason: `남한에서 한라산, 지리산, 설악산, 덕유산에 이어 다섯 번째로 높은 산으로서 산약초·야생화 등이 많이 서식하고, 희귀수목인 주목·철쭉나무 등이 군락을 이루고 있어 생태계 보호지역으로 지정된 점 등을 고려하여 선정
백두대간을 한 눈에 조망할 수 있으며 겨울철 설경이 백미. 우리나라에서 자동차로 오를 수 있는 고개 중 가장 높은 운두령이 있으며 내린천(內麟川)으로 흐르는 계방천의 발원지임 `,
    },
    {
      id: 9,
      name: "공작산",
      height: 887.4,
      address: "강원도 홍천군 동면, 화촌면",
      reason: `울창한 산림과 수타계곡 등 경관이 수려한 점 등을 고려하여 선정
산의 형세가 마치 한 마리의 공작이 날개를 펼친 듯하다는데서 산 이름이 유래. 보물 제745호인 월인석보 제17권과 18권이 보존되어 있는 수타사(壽陀寺)와 수타사에서 노천리에 이르는 20리계곡인 수타계곡이 특히 유명 `,
    },
    {
      id: 10,
      name: "관악산",
      height: 632.2,
      address: "서울특별시 관악구, 경기도 안양시, 과천시",
      reason: `예로부터 경기 5악의 하나로서 경관이 수려하며, 도심지 가까이 위치한 도시자연공원(1968년 지정)으로 수도권 주민들의 휴식처인 점 등을 고려하여 선정
주봉은 연주대(戀主臺)로서 정상에 기상 레이더 시설이 있음. 신라시대 의상이 창건하고 조선 태조가 중수(1392년)한 연주암과 약사여래입상이 유명 `,
    },
    {
      id: 11,
      name: "구병산",
      height: 876.3,
      address: "경상북도 상주신 화북면, 충청북도 보은군 마로면ㆍ속리산면",
      reason:
        "주능선의 북쪽 지역이 속리산 국립공원에 속해 있고 서원계곡(書院溪谷) 등 경관이 수려한 점 등을 고려하여 선정\n웅장한 아홉 개의 바위봉이 병풍처럼 연이어 솟아 예로부터 구봉산이라고 불리어 왔으며, 정상에서의 조망이 좋음. 예로부터 보은지방에서는 속리산 천황봉은 지아비 산, 구병산은 지어미 산, 금적산은 아들 산이라 하여 이들을 `삼산(三山)'이라 일컬어왔음. ",
    },
    {
      id: 12,
      name: "금산",
      height: 704.9,
      address: "경상남도 남해군 상주면, 이동면, 삼동면",
      reason: `한려해상국립공원의 유일한 산악공원으로 경관이 수려하고, 바다와 섬, 일출을 조망할 수 있으며 경상남도 기념물로 지정(1974년)된 점 등을 고려하여 선정
본래 보광산이라고 불리다가 조선 태조와 관련된 전설에 따라 금산으로 이름이 바뀌었다고 함. 조선 태조가 기도했다는 이씨기단을 비롯하여, 사자암, 촉대봉, 향로봉 등 38경이 유명하며, 정상에는 우리나라 3대 기도처의 하나인 보리암이 소재 `,
    },
    {
      id: 13,
      name: "금수산",
      height: 1015.8,
      address: "충청북도 제천시 수산면, 단양군 적성면",
      reason:
        "월악산국립공원 북단에 위치하고 울창한 소나무 숲과 맑고 깨끗한 계류 등 경관이 뛰어난 점을 고려하여 선정, 봄철의 철쭉과 가을철의 단풍이 특히 유명하고 능강계곡과 얼음골이 있음. 정상에서 소백산의 웅장한 산줄기와 충주호를 조망할 수 있음 ",
    },
    {
      id: 14,
      name: "금오산",
      height: 976.5,
      address: "경상북도 구미시 칠곡군 북삼읍, 김천시 남면",
      reason:
        "기암절벽과 울창한 산림이 조화되어 경관이 수려하며, 문화유산이 많고 도립공원으로 지정(1970년)된 점 등을 고려하여 선정, 높이 38m의 명금폭포가 있으며, 정상부근에는 자연암벽을 이용해 축성한 길이 2㎞의 금오산성이 있음. 해운사, 약사암 등의 고찰과 금오산마애보살입상(보물 제490호), 선봉사대각국사비(보물 제251호), 석조석가여래좌상(보물 제245호) 등이 유명 ",
    },
    {
      id: 15,
      name: "금정산",
      height: 800.8,
      address: "부산광역시 금정구ㆍ북구, 경상남도 양산시",
      reason:
        "산림이 울창하고 산세가 비교적 웅장하며 도심지 가까이 위치한 시민들의 휴식처인 점 등을 고려하여 선정, 역사적으로 나라를 지키는 호국의 산으로서 호국사찰 범어사와 우리나라 5대 산성의 하나인 금정산성이 있음. 낙동강 지류와 수영강의 분수계(分水界)를 이루고, 금강공원 및 성지곡공원 등이 있음 ",
    },
    {
      id: 16,
      name: "깃대봉",
      height: 360.7,
      address: "전라남도 신안군 흑산면 홍도",
      reason:
        "덩굴사철, 식나무 및 동백림 등이 자생하는 등 생태적 가치가 커 섬 전체가 천연보호구역으로 지정(1965년)되어 있으며, 다도해해상국립공원으로 지정(1981년)된 점 등을 고려하여 선정, 이름 그대로 깃대처럼 생긴 암봉이며, 홍도의 최고봉임. 깃대봉은 독립문, 석화굴 등 해안경관과 조화를 이뤄 홍도의 수려한 경관을 이루고 있음. ",
    },
    {
      id: 17,
      name: "남산(금오산)",
      height: 495.1,
      address: "경상북도 경주시 남산동, 내남면",
      reason:
        "길이 약 8km, 폭 약 4㎞의 산줄기안에 불상 80여체, 탑 60여기, 절터 110여 개소가 산재하여 경주국립공원으로 지정되어 있는 등 신라시대 역사 유물·유적의 보고인 점 등을 고려하여 선정, `경주남산불적지'로 마애여래좌상(보물 제913호), 칠불암마애석불 등이 유명. 동쪽에는 남산산성 등이 있음 ",
    },
    {
      id: 18,
      name: "내연산",
      height: 711.3,
      address: "경상북도 포항시 송라면ㆍ청하면ㆍ죽장면, 영덕군 남정면",
      reason:
        "남쪽의 천령산 줄기와 마주하면서 그 사이에 험준한 협곡을 형성하고 있는 청하골이 유명. 원진국사사리탑(보물 제430호)과 원진국사비(보물 제252호)가 보존된 보경사(寶鏡寺) 등이 있음 ",
    },
    {
      id: 19,
      name: "내장산",
      height: 763.5,
      address: "전라북도 정읍시 내장동, 순창군 쌍치면ㆍ복흥면",
      reason:
        "기암괴석과 울창한 산림, 맑은 계류가 어울어진 호남 5대 명산의 하나로 국립공원으로 지정(1971년)되어 있는 점 등을 고려하여 선정, 내장사를 중심으로 서래봉에서 불출봉, 연지봉, 까치봉, 신선봉, 장군봉에 이르기까지 산줄기가 말발굽처럼 둘러쳐져 마치 철옹성 같은 특이지형을 이룸. 내장사(內藏寺) 부속암자인 원적암 일대에 있는 비자림(천연기념물 제153호)이 특히 유명 ",
    },
    {
      id: 20,
      name: "대둔산",
      height: 878.9,
      address: "충청남도 논산시 벌곡면ㆍ금산군 진산면, 전라북도 완주군 운주면",
      reason:
        "정상인 마천대를 비롯하여 사방으로 뻗은 바위능선의 기암괴석과 수목이 어우러져 경관이 뛰어나고, 도립공원으로 지정(1980년)된 점 등을 감안하여 선정, 마천대에서 낙조대에 이르는 바위능선과 일몰광경이 뛰어나며, 임금바위·장군봉·동심바위·신선바위 등이 있음. 임금바위와 입석대를 잇는 금강구름다리와 태고사(太古寺)가 유명",
    },
    {
      id: 21,
      name: "대암산",
      height: 1312.6,
      address: "강원도 양구군 동면, 인제군 서화면",
      reason:
        "휴전선이 가까운 지역으로 각종 희귀생물과 원시림에 가까운 숲이 잘 보존되어 천연보호구역(천연기념물 제246호)으로 지정(1973년) 관리되는 등 우리나라 최대 희귀생물자원의 보고인 점 등을 감안하여 선정, 대암산 정상부에 있는 약 9,000여평이 넘는 풀밭 같은 넓은 초원에 큰 용늪과 작은용늪의 고층습지가 있음. 그 주위가 마치 화채(punch) 그릇(bowl)같아 펀치볼로 불리우며 해안분지(亥安盆地)가 유명 ",
    },
    {
      id: 22,
      name: "대야산",
      height: 931,
      address: "경상북도 문경시 가은읍, 충청북도 괴산군 청천면",
      reason:
        "기암괴석과 폭포·소(沼)가 어우러져 수려한 경관을 이루고 있으며, 속리산 국립공원구역에 포함되어 있는 점 등을 감안하여 선정, 용추폭포와 촛대바위가 있는 선유동계곡 및 `월영대'가 유명 ",
    },
    {
      id: 23,
      name: "덕숭산(수덕산)",
      height: 495.2,
      address: "충청남도 예산군 덕산면",
      reason:
        "지역 주민들이 소금강이라고 할 만큼 기암괴석과 어우러진 경관이 수려하고, 도립공원으로 지정(1973년)되어 있는 점 등을 감안하여 선정, 백제 제29대 법왕 원년(599년) 지명법사가 창건한 수덕사(修德寺), 보물 제355호인 마애불과 덕산온천이 유명",
    },
    {
      id: 24,
      name: "덕유산",
      height: 1614.2,
      address: "전라북도 무주군ㆍ장수군, 경상남도 거창군ㆍ함양군",
      reason:
        "향적봉에서 남덕유까지 17km의 장대한 산줄기를 이루고 있으며, 금강과 낙동강의 수원(水源)이고 국립공원으로 지정(1975년)된 점 등을 고려하여 선정, 덕유산 북쪽으로 흘러 내리는 30여km의 무주구천동계곡(茂朱九千洞溪谷)과 자연휴양림, 신라 흥덕왕5년(830년) 무염국사가 창건한 백련사(白蓮社) 등이 유명 ",
    },
    {
      id: 25,
      name: "덕항산",
      height: 1072.9,
      address: "강원도 삼척시 신기면, 태백시 하사미동",
      reason:
        "전형적인 경동지괴(傾動地塊) 지형으로 기암절벽과 초원이 어우러져 있으며 갈매굴, 제암풍혈, 양터목세굴, 덕발세굴, 큰재세굴 등 석회동굴이 많이 소재하고, 대이동굴 군립공원(1996년 지정) 구역내인 점 등을 고려하여 선정, 약 4∼5억년 전에 이루어진 길이 6.9㎞, 천장높이 30m에 이르는 동양최대의 동굴인 환선굴(幻仙窟 : 천연기념물 제178호)이 유명 ",
    },
    {
      id: 26,
      name: "도락산",
      height: 965.3,
      address: "충청북도 단양군  단성면, 대강면",
      reason:
        "소백산과 월악산 중간에 위치하며, 단양8경인 하선암, 중선암과 사인암 등이 산재해 있는 바위산으로 경관이 수려한 점 등을 고려하여 선정, 남한강 지류인 단양천 10여km 구간에 있는 하선암(下仙岩)과 쌍룡폭포·옥렴대·명경대 등 웅장한 바위가 있는 중선암(中仙岩), 경천벽, 와룡암, 일사대, 명경담 등이 있는 상선암(上仙岩)이 특히 유명 ",
    },
    {
      id: 27,
      name: "도봉산",
      height: 740.2,
      address: "서울특별시 도봉구, 경기도 의정부시 호원동ㆍ양주시 장흥면",
      reason:
        "최고봉인 자운봉을 중심으로 만장봉, 선인봉, 원도봉계곡, 용어천계곡, 송추계곡 등 경관이 수려하고 국립공원으로 지정(1983년)되어 있으며, 수도권 시민의 휴식처인 점 등을 고려하여 선정, 암벽등산에 최적지이며, 회룡사(回龍寺), 망월사(望月寺), 천축사(天竺寺), 보문사(普門寺) 등이 유명 ",
    },
    {
      id: 28,
      name: "두륜산",
      height: 700,
      address: "전라남도 해남군 삼산면ㆍ북일면ㆍ북평면ㆍ현산면",
      reason:
        "한반도의 최남단 해남반도에 솟아 있는 산으로서 왕벚나무의 자생지가 있으며, 다도해를 조망하기에 적합하고 도립공원으로 지정(1972년)된 점 등을 감안하여 선정, 봄의 춘백, 여름의 녹음, 가을의 단풍, 겨울의 동백 등으로 유명하며 유자(柚子), 차(茶)의 산지로 알려져 있음. 보물 제320호인 삼층석탑을 비롯하여 많은 문화재를 보존하고 있는 대흥사(大興寺)가 있음 ",
    },
    {
      id: 29,
      name: "두타산",
      height: 1357,
      address: "강원도 동해시 삼화동, 삼척시 미로면ㆍ하장면",
      reason:
        "무릉계곡 등 경관이 아름다운 점 등을 고려하여 선정, 삼화사(三和寺), 관음암(觀音庵), 두타산성(頭陀山城)이 있음. 바위에 50여개의 크고 작은 구멍이 패여 산이름이 붙여졌으며, 예로부터 기우제를 지내는 등 토속신앙의 기도처인 쉰움산(五十井山)이 유명 ",
    },
    {
      id: 30,
      name: "마니산",
      height: 472.1,
      address: "인천광역시 강화군 화도면",
      reason:
        "단군시조의 전설이 간직된 산으로 역사·문화적 가치 등을 고려하여 선정, 사적 제136호인 참성단(塹星壇), 함허동천, 사적 제130호인 삼랑산성이 있음. 또한 많은 보물을 보존하고 있는 정수사(淨水寺) 및 전등사(傳燈寺)등이 있으며, 성화를 채화하는 장소이기도 함 ",
    },
    {
      id: 31,
      name: "마이산",
      height: 687.4,
      address: "전라북도 진안군 진안읍ㆍ마령면",
      reason:
        "특이한 지형을 이루고 있으며, 섬진강과 금강(錦江) 발원지이고 도립공원(1979년)으로 지정된 점 등을 고려하여 선정, 중생대 백악기에 습곡운동을 받아 융기된 역암이 침식작용에 의하여 형성된 산으로 산의 형상이 마치 말의 귀를 닮았다 하여 마이산으로 불려짐. 암마이산 남쪽 절벽 밑에 있는 80여개의 크고 작은 돌탑이 있는 탑사(塔寺)와 금당사(金塘寺)가 유명 ",
    },
    {
      id: 32,
      name: "명성산",
      height: 922,
      address: "강원도 철원군 갈말읍, 경기도 포천시 영북면ㆍ이동면",
      reason:
        "도평천(都坪川), 영평천(永平川), 한탄강의 수계를 이루며, 산세가 가파르고 곳곳에 바위가 어우러져 경관이 아름다운 점 등을 고려하여 선정, 산 북쪽으로 삼부연폭포와 남쪽으로 산정호수를 끼고 있음. 전설에 의하면 왕건(王建)에게 쫓기던 궁예(弓裔)가 피살되었던 곳으로 유명",
    },
    {
      id: 33,
      name: "명지산",
      height: 1252.3,
      address: "경기도 가평군 북면ㆍ하면",
      reason:
        "경기도내에서 두 번째로 높은 산으로 경기도의 최고봉인 화악산(1,468m)과 가평천을 사이에 하고 있으며, 강씨봉, 귀목봉, 청계산, 우목봉 등 산세가 웅장하고 군립공원으로 지정된 점 등을 감안하여 선정, 20여km를 흐르는 산 동쪽의 가평천 계곡과 익근리계곡의 명지폭포가 유명. 명지산 일대의 산과 계곡들은 경기도내에서는 첫째가는 심산유곡으로 알려져 있음 ",
    },
    {
      id: 34,
      name: "모악산",
      height: 795.2,
      address: "전라북도 김제시 금산면, 전주시 완산구, 완주군 구이면",
      reason:
        "진달래와 철쭉이 유명한 호남 4경의 하나이며, 도립공원으로 지정(1971년)된 점 등을 고려하여 선정, 신라 말에 견훤이 이 곳을 근거로 후백제를 일으켰다고 전해짐. 국보 제62호인 미륵전을 비롯하여 대적광전(보물 제467호)·혜덕왕사응탑비(보물 제24호)·5층석탑(보물 제27호)등 많은 문화재가 있는 금산사(金山寺)가 있음. 특히 미륵전에 있는 높이 11.82m나 되는 미륵불이 유명 ",
    },
    {
      id: 35,
      name: "무등산",
      height: 1186.8,
      address: "광주광역시 동구, 전라남도 담양군 남면ㆍ화순군 이서면",
      reason: `최고봉인 천왕봉 가까이에는 원기둥 모양의 절리(節理)가 발달하여 기암괴석의 경치가 뛰어나고, 도시민의 휴식처이며, 도립공원으로 지정(1972년)된 점 등을 고려하여 선정
보물 제131호인 철조비로자나불좌상 등이 있는 증심사(證心寺)와 원효사(元曉寺)가 유명 `,
    },
    {
      id: 36,
      name: "무학산",
      height: 761.4,
      address: "경상남도 창원시 교방동ㆍ두척동ㆍ내서읍",
      reason: `도시민의 휴식처로서 경관이 좋은 아기자기한 능선과 다도해를 바라다보는 조망이 좋은 점 등을 고려하여 선정
정상 북서쪽에 있는 시루봉 일대의 바위는 좋은 암벽등반 훈련장임. 예전부터 양조업이 성할 정도로 수질이 좋음 서원골 입구에 최치원의 제자들이 세운 관해정(觀海亭)이 있고 부근 원각사, 백운사 등이 유명 `,
    },
    {
      id: 37,
      name: "미륵산",
      height: 458.4,
      address: "경상남도 통영시 산양읍ㆍ봉평동",
      reason: `충무시와 연육교로 이어지는 미륵도(彌勒島)의 복판에 솟은 산으로 한려해상국립공원의 아름다운 경관을 한눈에 조망할 수 있는 등 경관이 아름다운 점 등을 고려하여 선정
지형도에는 용화산(龍華山)으로 표기되어 있으며, 석조여래상(경남유형문화재 43호)과 고려중기의 작품인 지장보살상과 시왕상 등이 보존되어 있는 용화사(龍華寺)가 있음. 도솔선사(兜率禪師)가 창건한 도솔암, 관음사(觀音寺), 봉수대터 등이 유명 `,
    },
    {
      id: 38,
      name: "민주지산",
      height: 1241.7,
      address: "충청북도 영동군, 전라북도 무주군, 경상북도 김천시",
      reason: `1000m 이상의 고산준봉을 거느리고 울창한 산림과 바위가 어우러져 있으며, 국내 최대 원시림 계곡인 물한계곡이 있는 점 등을 고려하여 선정
물이 차다는 한천마을 상류에서부터 약 20㎞를 흐르는 깊은 계곡으로, 원시림 등이 잘 보존된 손꼽히는 생태관광지인 물한계곡(勿閑溪谷)이 특히 유명. 정상 남쪽 50m쯤 아래에는 삼두마애불상이 있음. 충북, 전북, 경북의 경계인 삼도봉과 연접 `,
    },
    {
      id: 39,
      name: "방장산",
      height: 733.6,
      address: "전라남도 장성군, 전라북도 고창군 신림면ㆍ정읍시 입암면",
      reason:
        "옛부터 지리산, 무등산과 함께 호남의 삼신산으로 불려져 왔으며, 전북과 전남을 양분하는 산으로서 산세가 웅장하고 자연휴양림인 점 등을 고려하여 선정\n옛이름은 방등산으로 백제가요중 `방등산가'의 방등산이 바로 방장산임. 정상에서 멀리 서해바다와 동쪽으로 무등산이 보임. ",
    },
    {
      id: 40,
      name: "방태산",
      height: 1445.7,
      address: "강원도 인제군 기린면ㆍ상남면, 홍천군 내면",
      reason: `가칠봉(1,241m), 응복산(1,156m), 구룡덕봉(1,388m), 주걱봉(1,444m) 등 고산준봉을 거느리고 있으며 한국에서 가장 큰 자연림이라고 할 정도로 나무들이 울창하고, 희귀식물과 희귀어종이 많은 생태적 특성 등을 고려하여 선정
정감록에는 난을 피해 숨을만한 피난처로 기록되어 있음. 자연휴양림이 있으며, 높이 10m의 이폭포와 3m의 저폭포가 있는 적가리골 및 방동약수, 개인약수 등이 유명 `,
    },
    {
      id: 41,
      name: "백덕산",
      height: 1350.1,
      address: "강원도 평창군 방림면, 횡성군 안흥면, 영월군 수주면",
      reason:
        "사자산(1120m), 사갓봉(1020m), 솟때봉(884m) 등이 솟아 있어 산세가 웅장하고 골이 깊은 등 경관이 좋으며, 평창강(平昌江)과 주천강(酒泉江)의 수계인 점 등을 고려하여 선정, 신라 때 자장율사가 창건하였다고 전해지는 법흥사(法興寺)와 경내에 있는 보물 제613호로 지정된 징효대사보인탑이 유명 ",
    },
    {
      id: 42,
      name: "백암산",
      height: 741.2,
      address: "전라북도 순창군 복흥면, 잔라남도 장성군 북하면",
      reason:
        "봄이면 백양, 가을이면 내장이라 하듯이 경관이 수려하고 천연기념물인 비자나무와 굴거리나무가 집단분포하고 있으며, 내장산국립공원구역에 포함되어 있는 점 등을 고려하여 선정, 학바위, 백양산 12경, 영천굴 등이 있음. 소요대사부도, 대웅전, 극락보전, 사천왕문을 포함하여 청류암의 관음전, 경관이 아름다운 쌍계루 등 수많은 문화유산들을 보존하고 있는 백양사(白羊寺)가 유명 ",
    },
    {
      id: 43,
      name: "백운산(광양)",
      height: 1222.2,
      address: "전라남도 광양시 진상면ㆍ옥룡면ㆍ봉강면ㆍ다압면, 구례군 간전면",
      reason:
        "수려한 계곡미를 가지고 있으며 광덕산, 국망봉, 박달봉 등과 같은 높은 봉우리들과 무리를 이뤄 계곡·단애(斷崖) 등 독특한 경관을 가지고 있는 점 등을 고려하여 선정, 백운동 계곡 및 신라 말 도선이 창건하였다고 전하는 흥룡사(興龍寺)가 유명",
    },
    {
      id: 44,
      name: "백운산(정선)",
      height: 883.5,
      address: "강원도 정선군 신동읍, 평창군 미탄면",
      reason:
        "주봉을 중심으로 하여 또아리봉과 도솔봉, 매봉, 억불봉 등 산세가 웅장하며 경관이 수려하고 억새풀과 철쭉 군락, 온·한대 900종의 식물이 서식하는 등 경관·생태적 특징을 고려하여 선정, 자연휴양림이 있으며, 백운사(白雲寺), 성불사(成佛寺) 등이 유명 ",
    },
    {
      id: 45,
      name: "백운산(포천)",
      height: 903,
      address: "경기도 포천시 이동면, 강원도 화천군 사내면",
      reason:
        "동강의 가운데에 위치하고 있어 경관이 아름답고, 조망이 좋으며 생태계보존지역으로 지정되어있는 점 등을 고려하여 선정 흰구름이 늘 끼어 있는데서 산 이름이 유래, 오대산에서 발원하는 오대천과 조양강(朝陽江)을 모아 남한강으로 흐르는 동강 및 천연기념물 제260호로 지정(1979년)된 백룡동굴(白龍洞窟)이 유명",
    },
    {
      id: 46,
      name: "변산",
      height: 459,
      address: "전라북도 부안군 변산면, 상서면, 진서면",
      reason:
        "울창한 산과 계곡, 모래해안과 암석해안 및 사찰 등이 어울려 뛰어난 경관을 이루고 있으며 국립공원으로 지정(1968년)된 점 등을 고려하여 선정, 산이면서 바다와 직접 닿아 있는 특징이 있음. 직소폭포, 가마소, 봉래구곡, 채석강, 적벽강 및 내소사, 개암사 등 사찰과 호랑가시나무, 꽝꽝나무 등 희귀동·식물이 서식 ",
    },
    {
      id: 47,
      name: "북한산",
      height: 835.6,
      address:
        "서울특별시 강북구ㆍ성북구ㆍ종로구ㆍ은평구, 경기도 고양시ㆍ양주시",
      reason:
        "최고봉인 백운대를 위시하여 인수봉, 만경대, 노적봉 등 경관이 수려하고 도시민들의 휴식처이며 국립공원으로 지정(1983년)되어 있는 점 등을 고려하여 선정, 북한산성, 우이동계곡, 정릉계곡, 세검정계곡 등이 유명. 도선국사가 창건한 도선사(道詵寺), 태고사(太古寺), 화계사(華溪寺), 문수사(文殊寺), 진관사(津寬寺) 등 수많은 고찰이 있음 ",
    },
    {
      id: 48,
      name: "비슬산",
      height: 1083.4,
      address:
        "대구광역시 달성군 옥포면ㆍ유가면ㆍ가창면, 경상북도 청도군 각북면",
      reason:
        "봄에는 진달래, 가을에는 억새 등 경관이 아름다우며, 조망이 좋고 군립공원으로 지정된 점 등을 고려하여 선정, 북쪽의 팔공산과 함께 대구분지를 형성하며 낙동강을 끼고 있음. 고려말 공민왕 7년(1358년) 진보법사가 창건한 소재사(消災寺) 등이 유명 ",
    },
    {
      id: 49,
      name: "삼악산",
      height: 655.8,
      address: "강원도 춘천시 서면",
      reason:
        "고고시대에 형성된 등선계곡과 맥국시대의 산성터가 있는 유서깊은 산으로 기암괴석의 경관이 아름답고, 의암호와 북한강을 굽어보는 조망이 좋은 점 등을 고려하여 선정, 남쪽 골짜기 초입의 협곡과 등선폭포(登仙瀑布)가 특히 유명하고, 흥국사(興國寺), 금선사(金仙寺), 상원사(上院寺) 등 7개 사찰이 있음. ",
    },
    {
      id: 50,
      name: "서대산",
      height: 904.1,
      address: "충청남도 금산군 추부면ㆍ군북면, 충청북도 옥천군 군서면",
      reason:
        "충청남도에서는 제일 높은 산으로 곳곳에 기암괴석과 바위 절벽이 있어 중부의 금강이라고 일컬을 정도로 경관이 아름다우며, 산정에서의 조망이 좋은 점 등을 고려하여 선정, 용굴, 사자굴, 견우장년대, 직녀탄금대, 북두칠성바위 등이 유명 ",
    },
    {
      id: 51,
      name: "선운산",
      height: 334.7,
      address: "전라북도 고창군 아산면ㆍ심원면ㆍ해리면",
      reason:
        "산세는 별로 크지 않으나 숲이 울창하고 곳곳이 기암괴석으로 이루어져 있어 경관이 빼어나며 천연기념물 제184호인 동백나무 숲이 있는 등 생태적 가치가 크고 도립공원으로 지정(1979년)된 점 등을 고려하여 선정, 백제 위덕왕 24년(577년) 검단선사가 창건한 선운사(禪雲寺)와 수령 5백년의 동백나무 ３천여 그루가 군락을 이루고 있는 선운사 동백 숲이 유명 ",
    },
    {
      id: 52,
      name: "설악산",
      height: 1708.1,
      address: "강원도 속초시 설악동, 인제군 북면ㆍ인제읍, 양양군 서면ㆍ강현면",
      reason:
        "남한에서 세 번째로 높은 봉우리인 한계령, 마등령, 미시령 등 수많은 고개와 산줄기·계곡들이 어우러져 한국을 대표하는 산악미의 극치를 이루고 있으며, 국립공원(1970년 지정) 및 유네스코의 생물권 보존지역으로 지정(1982년)되어 관리되고 있는 점 등을 고려하여 선정, 백담사(百潭寺), 봉정암(鳳頂菴), 신흥사(新興寺), 계조암(繼祖菴), 오세암(五歲庵), 흔들바위, 토왕성폭포, 대승폭포 등이 특히 유명 ",
    },
    {
      id: 53,
      name: "성인봉",
      height: 986.5,
      address: "경상북도 울릉군 울릉읍 서면ㆍ북면",
      reason:
        "휴화산인 울릉도의 최고봉으로서 울릉도 모든 하천의 수원을 이루고, 식생이 특이한 원시림이 잘 보전되어 있는 점 등을 감안하여 선정, 울릉도에서는 유일하게 평지를 이룬 나리분지(羅里盆地)와 천연기념물 제189호로 지정(1967년)된 원시림에 유명. 나리동의 울릉국화·섬백리향의 군락은 천연기념물 제52호(1962년)로 지정되어 있음 ",
    },
    {
      id: 54,
      name: "소백산",
      height: 1439.7,
      address: "경상북도 영주시 풍기읍, 충청북도 단양군 단양읍",
      reason:
        "국망봉에서 비로봉, 연화봉으로 이어지는 해발 1,300여m의 일대 산군으로 1,000m이상은 고원지대와 같은 초원을 이루고 있으며, 국망천과 낙동강 상류로 들어가는 죽계천이 시작되고 국립공원으로 지정(1987년)된 점 등을 고려하여 선정, 주봉인 비로봉 일대에는 주목군락지(천연기념물 제244호)와 한국산 에델바이스인 솜다리가 군락을 이루고 있음. 희방사(喜方寺), 구인사, 소수서원(紹修書院 : 사적 제55호), 부석사(浮石寺), 온달성, 국립천문대",
    },
    {
      id: 55,
      name: "소요산",
      height: 587.5,
      address: "경기도 동두천시, 포천시 신북면",
      reason:
        "규모는 작으나 상백운대, 하백운대, 중백운대 등 경관이 아름답고, 등산인의 선호도가 높아 '81년 국민관광지로 지정된 점을 고려하여 선정, 원효폭포, 청량폭포, 선녀탕절벽과 가을철 단풍이 유명하며, 신라 무열왕 1년(654년)에 원효대사가 창건하였다고 전해지는 자재암이 있음.",
    },
    {
      id: 56,
      name: "속리산",
      height: 1058.4,
      address: "경상북도 상주시 화북면, 충청북도 보은군 내속리면",
      reason:
        "예로부터 산세가 수려하여 제2금강 또는 소금강이라고도 불리울 정도로 경관이 아름답고 망개나무, 미선나무 등 1,000여 종이 넘는 동식물이 서식하고 있으며, 국립공원으로 지정(1970년)된 점 등을 고려하여 선정, 법주사(法住寺), 문장대, 천연기념물 제103호인 정이품송(正二品松) 및 천연기념물 제207호인 망개나무가 유명 ",
    },
    {
      id: 57,
      name: "신불산",
      height: 1159.3,
      address: "울산광역시 울주군 삼남면ㆍ상북면",
      reason:
        "영남알프스 산군에 속하는 산으로 능선에는 광활한 억새와 바위절벽, 완만한 지대가 조화를 이루고 있으며 작천계곡, 파래소폭포 등이 있고 군립공원인 점 등을 고려하여 선정, 신불산 폭포자연휴양림 등이 유명",
    },
    {
      id: 58,
      name: "연화산",
      height: 524,
      address: "경상남도 고성군 개천면ㆍ영현면",
      reason:
        "경관이 아름답고 오래된 사찰과 문화재가 많으며 도립공원으로 지정(1983년)된 점 등을 고려하여 선정, 산 중턱에 큰 대밭이 있음. 유서 깊은 옥천사(玉泉寺)와 연대암·백련암·청연암 등이 유명",
    },
    {
      id: 59,
      name: "오대산",
      height: 1565.4,
      address: "강원도 평창군 진부면, 홍천군 내면, 강릉시 연곡면",
      reason:
        "국내 제일의 산림지대를 이루고 있으며, 경관이 수려하여 국립공원으로 지정(1975년)된 점 등을 고려하여 선정, 연꽃모양으로 둘러선 다섯 개의 봉우리가 모두 모나지 않고 평평한 대지를 이루고 있는데서 산이름이 유래. 월정사(月精寺), 적멸보궁(寂滅寶宮), 상원사(上院寺)가 있음. 골짜기마다 사찰, 암자 등 많은 불교유적이 산재해 있는 등 우리나라 최고의 불교 성지로 유명 ",
    },
    {
      id: 60,
      name: "오봉산",
      height: 777.9,
      address: "강원도 춘천시 북산면, 화천군 간동면",
      reason:
        "산세는 크지 않으나 바위와 수목이 어우러진 경관이 아름다운 점 등을 고려하여 선정, 다섯 개의 바위 봉이 연이어 솟아있는 데서 산이름이 유래. 신라때 아도화상이 창건하였다고 전해지는 청평사(淸平寺)와 구성폭포가 유명. 청평사 경내에 있는 보물 제164호인 회전문이 유명 ",
    },
    {
      id: 61,
      name: "용문산",
      height: 1157.1,
      address: "경기도 양평군 용문면ㆍ옥천면",
      reason:
        "옛부터 경기의 금강산이라 불리워질 만큼 기암괴석과 고산준령을 고루 갖춘 경관이 뛰어난 산이며, 특히 신라 선덕여왕때 창건한 용문사와 높이 62m, 둘레 14m에 달하는 은행나무(천연기념물 제30호)가 있는 등 역사·문화적 가치가 높은 점을 고려하여 선정, 경기도에서 네 번째로 높은 산으로 미지산이라는 이름으로 불리었는데 조선을 개국한 이태조가 등극하면서 `용문산'이라 바꿔 부르게 되었다는 전설이 있음. ",
    },
    {
      id: 62,
      name: "용화산",
      height: 877.8,
      address: "강원도 화천군 간동면ㆍ하남면, 춘천시 사북면",
      reason:
        "파로호, 춘천호, 소양호 등과 연접해 있으며 산림과 기암괴석이 어우러져 경관이 아름다우며 조망이 좋은 점 등을 고려하여 선정, 성불사터가 있으며 광바위, 주전자바위, 바둑바위 등 갖가지 전설을 간직한 실물을 닮은 바위가 유명 ",
    },
    {
      id: 63,
      name: "운문산",
      height: 1195.1,
      address: "경상북도 청도군 운문면, 경상남도 밀양시 산내면",
      reason:
        "구연동(臼淵洞), 얼음골이라 부르는 동학(洞壑), 해바위(景岩) 등 천태만상의 기암괴석이 계곡과 어우러져 경관이 수려하고 군립공원으로 지정(1983년)된 점 등을 고려하여 선정, 보물 제835호 대웅전, 제678호 삼층석탑, 제193호 석등, 제316호 원응국사비, 제317호 석조여래좌상 등 각종 문화유적이 있는 운문사가 있음. 석남사 경내에 있는 4백년의 수령을 자랑하는 처진 소나무(반송 : 천연기념물 제180호)가 유명 ",
    },
    {
      id: 64,
      name: "운악산",
      height: 934.7,
      address: "경기도 가평군 하면, 포천시 화현면",
      reason:
        "주봉인 망경대를 둘러싼 경관이 경기 소금강이라고 불리울 만큼 뛰어난 점 등을 고려하여 선정, 천년고찰인 현등사 및 백년폭포, 오랑캐소, 눈썹바위, 코끼리바위, 망경대, 무우폭포, 큰골내치기암벽, 노채애기소 등 운악8경이 유명 ",
    },
    {
      id: 65,
      name: "운장산",
      height: 1125.8,
      address: "전라북도 진안군 주천면, 부귀면, 정천면, 완주군 동상면",
      reason:
        "운일암(雲日岩)·반일암(半日岩)으로 유명한 대불천(大佛川) 계곡이 있으며, 물이 맑고 암벽과 숲으로 둘러싸여 경관이 아름답고 자연휴양림이 있는 점 등을 고려하여 선정, 북두칠성의 전설이 담겨있는 `칠성대'와 조선시대 송익필의 전설이 얽혀 있는 `오성대'가 유명 ",
    },
    {
      id: 66,
      name: "월악산",
      height: 1095.3,
      address: "충청북도 제천시 한수면, 덕산면",
      reason:
        "산세가 험준하고 기암이 어우러져 예로부터 신령스런 산으로 여겨졌으며 송계 8경과 용하 9곡이 있고 국립공원으로 지정(1984년)된 점 등을 고려하여 선정, 신라말 마의태자와 덕주공주가 마주보고 망국의 한을 달래고 있다는 미륵사지의 석불입상, 덕주사의 마애불 및 덕주산성 등이 유명",
    },
    {
      id: 67,
      name: "월출산",
      height: 810.7,
      address: "전라남도 영암군 영암읍ㆍ군서면ㆍ학산면, 강진군 성전면",
      reason:
        "경관이 아름다우며 난대림과 온대림이 혼생하여 생태적 가치가 크고 국립공원으로 지정(1988년)된 점 등을 고려하여 선정, 천황봉을 중심으로 무위사 극락보전(국보 제13호), 도갑사 해탈문(국보 제50호)가 있음. 구정봉 밑 용암사터 근처에는 우리나라에서 가장 높은 곳에 위치한 국보 제144호인 마애여래좌상이 유명",
    },
    {
      id: 68,
      name: "유명산",
      height: 864,
      address: "경기도 가평군 설악면, 양평군 옥천면",
      reason:
        "능선이 완만하고 부드러우며, 수량이 풍부한 계곡과 기암괴석 및 울창한 숲이 어우러져 경관이 아름다운 점 등을 고려하여 선정, 신라 법흥왕 27년(540년)에 인도에서 불법을 우리나라에 들여온 마라가미 스님에게 법흥왕이 하사한 사찰인 현등사가 유명. 자연휴양림이 있음 ",
    },
    {
      id: 69,
      name: "응봉산",
      height: 999.7,
      address: "강원도 삼척시 가곡면ㆍ원덕읍, 경상북도 울진군 북면",
      reason:
        "아름다운 여러 계곡들을 끼고 있어 계곡탐험코스로 적합하며, 산림이 울창하고 천연노천온천인 덕구온천과 용소골의 폭포와 소가 많은 등 경관이 아름다운 점을 고려하여 선정, 울진조씨가 매사냥을 하다가 잃어버린 매를 이 산에서 찾고는 산 이름을 응봉이라 한 뒤 근처에 부모의 묘자리를 쓰자 집안이 번성하였다는 전설이 전해지고 있음. 정상에서 멀리 백암산·통고산·함백산·태백산을 조망할 수 있는 곳으로 유명 ",
    },
    {
      id: 70,
      name: "장안산",
      height: 1237.4,
      address: "전라북도 장수군 장수읍, 계남면",
      reason:
        "덕산계곡을 비롯한 크고 작은 계곡과 윗용소, 아랫용소 등 연못 및 기암괴석이 산림과 어우러져 군립공원(1986년)으로 지정된 점 등을 고려하여 선정, 산등에서 동쪽 능선으로 펼쳐진 광활한 갈대밭과 덕산용소계곡이 유명 ",
    },
    {
      id: 71,
      name: "재약산",
      height: 1119.1,
      address: "경상남도 밀양시 단장면ㆍ산내면, 울산광역시 울주군 상북면",
      reason:
        "산세가 부드러우면서도 정상 일대에는 거대한 암벽을 갖추고 있어 경관이 아름다우며 우리나라에서 가장 넓은 억새밭인 사자평이 있는 점 등을 고려하여 선정, 삼복 더위에 얼음이 어는 천연기념물 제224호 얼음골이 있음. 신라 진덕여왕때 창건하고 서산대사가 의병을 모집한 곳인 표충사가 유명",
    },
    {
      id: 72,
      name: "적상산",
      height: 1030.6,
      address: "전라북도 무주군 적상면",
      reason:
        "가을에 마치 온 산이 빨간 치마를 입은 여인네의 모습과 같다 하여 이름이 붙여질 정도로 경관이 뛰어나며 덕유산 국립공원구역인 점 등을 고려하여 선정, 고려 공민왕 23년(1374) 최영 장군이 탐라를 토벌한 후 귀경길에 이 곳을 지나다가 산의 형세가 요새로서 적지임을 알고 왕에게 건의하여 축성된 적상산성(사적 제146호)과 안국사 등이 유명 ",
    },
    {
      id: 73,
      name: "점봉산",
      height: 1426,
      address: "강원도 양양군 서면, 인제군 인제읍ㆍ기린면",
      reason:
        "원시림이 울창하고 모데미풀 등이 자생하는 등 생태적 가치가 커 유네스코에서 생물권보존구역으로 지정하고, 산림유전자원보호림으로 관리되고 있는 점 등을 고려하여 선정. 특히 제1회 아름다운 숲 전국대회에서 보전되어야 할 숲으로 선정. 12담 구곡으로 불리는 오색약수터 및 주전골 성국사터에 있는 보물 제497호인 양양 오색리 삼층석탑이 있음 ",
    },
    {
      id: 74,
      name: "조계산",
      height: 887.3,
      address: "전라남도 순천시 승주읍ㆍ송광면",
      reason:
        "예로부터 소강남(小江南)이라 부른 명산으로 깊은 계곡과 울창한 숲·폭포·약수 등 자연경관이 아름답고, 불교 사적지가 많으며, 도립공원으로 지정(1979년)된 점 등을 고려하여 선정, 목조삼존불감(국보 제42호), 고려고종제서(高麗高宗制書 : 국보 제43호), 송광사국사전(국보 제56호) 등 많은 국보를 보유한 송광사와 곱향나무(천연기념물 제88호)가 유명",
    },
    {
      id: 75,
      name: "주왕산",
      height: 722.1,
      address: "경상북도 청송군 청송읍ㆍ부동면, 영덕군 지품면ㆍ달산면",
      reason:
        "석병산으로 불리울 만큼 기암괴봉과 석벽이 병풍처럼 둘러서 경관이 아름다우며 국립공원으로 지정(1976년)된 점 등을 고려하여 선정, 대전사(大典寺), 주왕암이 있음. 주왕굴을 중심으로 남아있는 자하성의 잔해는 주왕과 고려군의 싸움의 전설이 깃들여 있는 곳으로 유명 ",
    },
    {
      id: 76,
      name: "주흘산",
      height: 1108.4,
      address: "경상북도 문경시 문경읍",
      reason:
        "소백산맥의 중심을 이루고 문경새재 등 역사적 전설이 있으며, 여궁폭포와 파랑폭포 등 경관이 아름답고, 월악산 국립공원구역인 점 등을 고려하여 선정, 야생화, 오색단풍, 산죽밭이 유명하며, 조선조 문경현의 진산으로 문경 1, 2, 3관문이 있음 ",
    },
    {
      id: 77,
      name: "지리산",
      height: 1915.4,
      address:
        "전라북도 남원시, 전라남도 구례군, 경상남도 하동군ㆍ산청군ㆍ함양군",
      reason:
        "신라 5악중 남악으로 남한 내륙의 최고봉인 천왕봉(1,915m)을 주봉으로 노고단(1,507m), 반야봉(1,751m) 등 동서로 100여리의 거대한 산악군을 이뤄 `지리산 12동천'을 형성하는 등 경관이 뛰어나고 우리나라 최대의 자연생태계 보고이며 국립공원 제1호로 지정(1967년)된 점 등을 고려하여 선정, 어리석은 사람이 머물면 지혜로운 사람으로 달라진다고 한데서 산이름이 유래.화엄사, 천은사, 연곡사, 쌍계사 등이 유명 ",
    },
    {
      id: 78,
      name: "지리산",
      height: 399.3,
      address: "경상남도 통영시 사량면",
      reason:
        "한려수도의 빼어난 경관과 조화를 이루고 특히 불모산, 가마봉, 향봉, 옥녀봉 등 산 정상부의 바위산이 기암괴석을 형성하고 조망이 좋은 점 등을 고려하여 선정,`지리산이 바라 보이는 산'이란 뜻에서 산이름이 유래하였으며, 현지에서는 지리산이라고도 불리워지고 있음. 다도해의 섬을 조망할 수 있으며 기묘한 바위 능선이 특히 유명 ",
    },
    {
      id: 79,
      name: "천관산",
      height: 724.3,
      address: "전라남도 장흥군 관산읍, 대덕읍",
      reason:
        "호남의 5대 명산으로 꼽을 만큼 경관이 아름다우며 조망이 좋고 도립공원으로 지정(1998년)된 점 등을 고려하여 선정, 신라시대에 세워진 천관사와 동백숲이유명하고, 자연휴양림이 있음. ",
    },
    {
      id: 80,
      name: "천마산",
      height: 810.3,
      address: "경기도 남양주시 화도읍, 오남읍",
      reason:
        "산꼭대기를 중심으로 능선이 사방에 뻗어있어 어느 지점에서나 정상을 볼수 있는 특이한 산세와 식물상이 풍부하여 식물관찰 산행지로 이름나 있는 점 등을 고려하여 선정, 산 남쪽에 천마산스키장이 있음",
    },
    {
      id: 81,
      name: "천성산",
      height: 920.2,
      address: "경상남도 양산시 하북면, 상북면",
      reason:
        "금강산의 축소판이라고 불릴 정도로 경관이 뛰어나고, 특히 산정상부에 드넓은 초원과 산지습지가 발달하여 끈끈이주걱 등 희귀식물과 수서곤충이 서식하는 등 생태적 가치가 높은 점을 고려하여 선정, 봄에는 진달래와 철쭉, 가을에는 능선의 억새가 장관을 이루며, 원효대사가 창건했다는 내원사가 있음.",
    },
    {
      id: 82,
      name: "천태산",
      height: 715.2,
      address: "충청북도 영동군 양산면, 충청남도 금산군 제원면",
      reason:
        "충북의 설악산으로 불려질 만큼 경관이 아름다운 점 등을 고려하여 선정, 고려시대 대각국사 의천이 창건한 영국사와 수령이 약 500년 된 은행나무(천연기념물 제223호), 3층석탑(보물 제533호), 원각국사비(보물 제534호) 등이 유명 ",
    },
    {
      id: 83,
      name: "청량산",
      height: 869.7,
      address: "경상북도 봉화군 명호면ㆍ재산면, 안동시 도산면ㆍ예안면",
      reason:
        "산세는 크지 않으나 연이어 솟는 바위 봉우리와 기암절벽이 어우러져 예로부터 소금강으로 꼽힐 만큼 산세가 수려하고, 도립공원으로 지정(1982년)된 점 등을 고려하여 선정, 원효대사가 창건한 유리보전, 신라시대의외청량사, 최치원의 유적지인 고운대와 독서당, 공민왕이 홍건적의 난을 피해 은신한 오마대(五馬臺)와 청량산성, 김생이 글씨를 공부하던 김생굴, 퇴계 이황이 수도하며 성리학을 집대성한 오산당(청량정사) 등 역사적 유적지로 유명 ",
    },
    {
      id: 84,
      name: "추월산",
      height: 731.2,
      address: "전라남도 담양군 용면, 전라북도 순창군 복흥면",
      reason:
        "울창한 산림과 담양호가 어우려져 경관이 아름다우며 추월난이 자생하는 점 등을 고려하여 선정, 산 정상에서 65m 정도 아래 지점에 있는 보리암(菩提庵)과 전라북도 순창을 경계로 한 산록에 있는 용추사가 유명 ",
    },
    {
      id: 85,
      name: "축령산",
      height: 887.1,
      address: "경기도 남양주시 수동면, 가평군 상면",
      reason:
        "소나무와 잣나무 장령림이 울창한 숲을 이루고 단애가 형성되어 있으며, 산 정상에서 북으로는 운악산, 명지산, 화악산이 보이고, 동남쪽으로 청평호가 보이는 등 조망이 뛰어난 점을 고려하여 선정, 가평 7경의 하나인 축령백림과 남이장군의 전설이 깃든 남이바위, 수리바위 축령백림 등이 유명. 자연휴양림이 있음. ",
    },
    {
      id: 86,
      name: "치악산",
      height: 1282,
      address: "강원도 원주시, 횡성군, 영월군",
      reason:
        "주봉인 비로봉을 중심으로 남대봉 (1,181m)과 매화산(1,085m) 등 1천여 미터의 고봉들이 연이어 있어 경관이 아름다우며 곳곳에 산성과 사찰, 사적지들이 널리 산재해 있고 국립공원으로 지정(1984년)된 점 등을 고려하여 선정, 구룡계곡, 부곡계곡, 금대계곡 등과 신선대, 구룡소, 세렴폭포, 상원사 등이 있음. 사계절별로 봄 진달래와 철쭉, 여름 구룡사의 울창한 숲과 깨끗한 물, 가을의 단풍, 겨울 설경이 유명 ",
    },
    {
      id: 87,
      name: "칠갑산",
      height: 559.7,
      address: "충청남도 청양군 대치면, 정산면, 장평면",
      reason:
        "백운동 계곡 등 경관이 아름다우며 도립공원으로 지정(1973년)된 점 등을 고려하여 선정, 계곡은 깊고 급하며 지천과 계곡을 싸고 돌아 7곳에 명당이 생겼다는 데서 산이름이 유래. 신라 문성왕 때 보조(普照) 승려가 창건한 장곡사(長谷寺)에 있는 철조약사여래좌상(보물 제174호) 등이 유명 ",
    },
    {
      id: 88,
      name: "태백산",
      height: 1566.7,
      address: "강원도 태백시, 경상북도 봉화군 석포면",
      reason:
        "예로부터 삼한의 명산이라 불리웠으며 산 정상에는 고산 식물이 자생하고 겨울 흰 눈으로 덮인 주목군락의 설경 등 경관이 뛰어나며 도립공원으로 지정(1989년)된 점 등을 고려하여 선정, 삼국사기에 따르면 산 정상에 있는 천제단에서 왕이 친히 천제를 올렸다는 기록이 있음. 망경사, 백단사 등이 유명 ",
    },
    {
      id: 89,
      name: "태화산",
      height: 1027.5,
      address: "강원도 영월군 영월읍, 충청북도 단양군 영춘면",
      reason:
        "경관이 아름답고 고구려 시대에 쌓았던 토성인 태화산성 등 역사적 유적이 있고, 고씨동굴(高氏洞窟 : 천연기념물 제219호) 등이 소재하고 있는 점 등을 고려하여 선정 ",
    },
    {
      id: 90,
      name: "팔공산",
      height: 1192.3,
      address: "경상북도 군위군 부계면, 영천시 신녕면, 대구광역시 동구",
      reason:
        "비로봉(毘盧峰)을 중심으로 하여 동·서로 16km에 걸친 능선 경관이 아름다우며 대도시 근교에서는 가장 높은 산으로 도시민에게 휴식처를 제공하고 도립공원으로 지정(1980년)된 점 등을 고려하여 선정, 동화사(桐華寺), 은해사(銀海寺), 부인사(符仁寺), 송림사(松林寺), 관암사(冠岩寺) 등 불교문화의 성지로 유명 ",
    },
    {
      id: 91,
      name: "팔봉산",
      height: 328.2,
      address: "강원도 홍천군 서면",
      reason:
        "산은 나지막하고 규모도 작으나 여덟개의 바위봉이 팔짱 낀 8형제처럼 이여져 있고 홍천강과 연접하여 경관이 아름다운 점 등을 고려하여 선정, 국민관광지로 지정되어 있음 ",
    },
    {
      id: 92,
      name: "팔영산",
      height: 606.9,
      address: "전라남도 고흥군 점암면, 영남면",
      reason:
        "여덟개의 암봉으로 이루어진 산세가 험준하고 기암괴석이 많으며 조망이 좋고 도립공원으로 지정(1998년)된 점 등을 고려하여 선정, 예전에 화엄사, 송광사, 대흥사와 함께 호남 4대 사찰로 꼽히던 능가사가 있음. 신선대, 강산폭포 및 자연휴양림이 있음. 정상에서 대마도까지 보일 정도로 조망이 좋음 ",
    },
    {
      id: 93,
      name: "한라산",
      height: 1947.3,
      address: "제주특별자치도",
      reason:
        "남한에서 가장 높은 우리나라 3대 영산의 하나로 산마루에는 분화구인 백록담이 있고 1,800여종의 식물과 울창한 자연림 등 고산식물의 보고이며 국립공원으로 지정(1970년)된 점 등을 고려하여 선정, 남한의 최고봉으로서 백록담, 탐라계곡, 안덕계곡, 왕관릉, 성판암, 천지연 등이 유명",
    },
    {
      id: 94,
      name: "화악산",
      height: 1468.3,
      address: "경기도 가평군 북면, 강원도 화천군 사내면",
      reason:
        "경기 제１의 고봉으로 애기봉을 거쳐 수덕산까지 약 10㎞의 능선 경관이 뛰어나며 시계가 거의１백㎞에 달하는 등 조망이 좋은 점 등을 고려하여 선정, 집다리골 자연휴양림이 있으며, 정상에서 중서부지역 대부분의 산을 조망할 수 있음 ",
    },
    {
      id: 95,
      name: "화왕산",
      height: 757.7,
      address: "경상남도 창녕군 창녕읍, 고암면",
      reason:
        "억새밭과 진달래 군락 등 경관이 아름다우며 화왕산성, 목마산성 등이 있고 군립공원인 점 등을 고려하여 선정, 해마다 정월대보름이 되면 정상 일대의 억새평전에서 달맞이 행사가 열림. 정상에 화산활동으로 생긴 분화구 못(용지)이 3개 있음. 송현동 고분군 및 석불좌상, 대웅전 등 4점의 보물이 있는 관룡사 등이 유명 ",
    },
    {
      id: 96,
      name: "황매산",
      height: 1113.1,
      address: "경상남도 합천군 대병면ㆍ가회면, 산청군 차황면",
      reason:
        "화강암 기암괴석과 소나무, 철쭉, 활엽수림이 어우러져 경관이 아름다운 점 등을 고려하여 선정, 합천호 푸른물에 하봉, 중봉, 상봉의 산 그림자가 잠기면 세송이 매화꽃이 물에 잠긴 것 같다고 하여 수중매라는 별칭으로도 불림. 산 아래의 황매평전에는 목장지대와 고산 철쭉 자생지가 있으며, 통일신라시대의 고찰인 염암사지(사적131호)가 유명 ",
    },
    {
      id: 97,
      name: "황석산",
      height: 1192.5,
      address: "경상남도 함양군 안의면, 서하면, 서상면",
      reason:
        "거망에서 황석으로 이어지는 능선에 있는 광활한 억새밭 등 경관이 아름답고 황석산성 등 역사적 유적이 있는 점 등을 고려하여 선정, 정유재란 당시 왜군에게 마지막까지 항거하던 사람들이 성이 무너지자 죽음을 당하고 부녀자들은 천길 절벽에서 몸을 날려 지금껏 황석산 북쪽 바위 벼랑이 핏빛이라는 전설이 있는 황석산성이 있음 ",
    },
    {
      id: 98,
      name: "황악산",
      height: 1111.4,
      address: "경상북도 김천시 대항면",
      reason:
        "전체적인 산세는 특징 없이 완만한 편이나 산림이 울창하고 산 동쪽으로 흘러내리는 계곡은 곳곳에 폭포와 소를 이뤄 계곡미가 아름다운 점 등을 고려하여 선정, 특히 직지사 서쪽 200m 지점에 있는 천룡대부터 펼쳐지는 능여계곡은 대표적인 계곡으로 봄철에는 진달래, 벚꽃, 산목련이 유명. ",
    },
    {
      id: 99,
      name: "황장산",
      height: 1078.9,
      address: "경상북도 문경시 동로면",
      reason:
        "울창한 산림이 암벽과 어우러져 경관이 아름다우며 황장목이 유명하고 조선시대 봉산 표지석이 있는 등 경관 및 산림문화적 측면을 고려하여 선정, 동국여지승람, 대동지지, 예천군 읍지 등에는 작성산으로 표기",
    },
    {
      id: 100,
      name: "희양산",
      height: 996.4,
      address: "경상북도 문경시 가은읍, 충청북도 괴산군 연풍면",
      reason:
        "산 전체가 하나의 바위처럼 보이고 바위 낭떠러지들이 하얗게 드러나 있어 주변의 산에서뿐만 아니라 먼 산에서도 쉽게 알아볼 수 있으며 기암괴석과 풍부한 수량이 어우러진 백운곡 등 경관이 수려하고 마애본좌상 등 역사유적이 있는 점 등을 고려하여 선정",
    },
  ];
function Np() {
  const [e, t] = x.useState([]),
    n = Yo();
  return (
    x.useEffect(() => {}, []),
    I.jsx("div", {
      className: "min-h-screen bg-gray-50",
      children: I.jsxs("div", {
        className: "container mx-auto px-4 py-8",
        children: [
          I.jsxs("button", {
            onClick: () => n("/"),
            className:
              "flex items-center text-gray-600 hover:text-gray-800 mb-6",
            children: [I.jsx($d, { className: "w-5 h-5 mr-2" }), "돌아가기"],
          }),
          I.jsx("h1", {
            className: "text-3xl font-bold text-gray-800 mb-8",
            children: "100대 명산 목록",
          }),
          I.jsx("div", {
            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
            children: wp.map((r) =>
              I.jsxs(
                "div",
                {
                  onClick: () => n(`/map/${r.name}`),
                  className:
                    "bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden",
                  children: [
                    I.jsx("div", {
                      className: "h-48 overflow-hidden",
                      children: I.jsx("img", {
                        src: `/src/assets/bac_img/${r.name}.jpeg`,
                        alt: r.name,
                        className: "w-full h-full object-cover",
                      }),
                    }),
                    I.jsxs("div", {
                      className: "p-4",
                      children: [
                        I.jsx("h2", {
                          className: "text-xl font-semibold text-gray-800",
                          children: r.name,
                        }),
                        I.jsxs("p", {
                          className: "text-gray-600 mt-2",
                          children: [r.height, "m"],
                        }),
                        I.jsx("p", {
                          className: "text-gray-500 text-sm mt-1",
                          children: r.address,
                        }),
                      ],
                    }),
                  ],
                },
                r.id
              )
            ),
          }),
        ],
      }),
    })
  );
}
var Vd = { exports: {} },
  ri,
  pu;
function Sp() {
  if (pu) return ri;
  (pu = 1),
    (ri = function () {
      return e;
    });
  function e() {}
  return ri;
}
(function (e) {
  let t = function () {
    (this.xmlSource = ""),
      (this.metadata = {}),
      (this.waypoints = []),
      (this.tracks = []),
      (this.routes = []);
  };
  (t.prototype.parse = function (n) {
    let r = this,
      l = new window.DOMParser();
    this.xmlSource = l.parseFromString(n, "text/xml");
    let i = this.xmlSource.querySelector("metadata");
    if (i != null) {
      (this.metadata.name = this.getElementValue(i, "name")),
        (this.metadata.desc = this.getElementValue(i, "desc")),
        (this.metadata.time = this.getElementValue(i, "time"));
      let h = {},
        g = i.querySelector("author");
      if (g != null) {
        (h.name = this.getElementValue(g, "name")), (h.email = {});
        let k = g.querySelector("email");
        k != null &&
          ((h.email.id = k.getAttribute("id")),
          (h.email.domain = k.getAttribute("domain")));
        let c = {},
          s = g.querySelector("link");
        s != null &&
          ((c.href = s.getAttribute("href")),
          (c.text = this.getElementValue(s, "text")),
          (c.type = this.getElementValue(s, "type"))),
          (h.link = c);
      }
      this.metadata.author = h;
      let v = {},
        y = this.queryDirectSelector(i, "link");
      y != null &&
        ((v.href = y.getAttribute("href")),
        (v.text = this.getElementValue(y, "text")),
        (v.type = this.getElementValue(y, "type")),
        (this.metadata.link = v));
    }
    var o = [].slice.call(this.xmlSource.querySelectorAll("wpt"));
    for (let h in o) {
      var a = o[h];
      let g = {};
      (g.name = r.getElementValue(a, "name")),
        (g.sym = r.getElementValue(a, "sym")),
        (g.lat = parseFloat(a.getAttribute("lat"))),
        (g.lon = parseFloat(a.getAttribute("lon")));
      let v = parseFloat(r.getElementValue(a, "ele"));
      (g.ele = isNaN(v) ? null : v),
        (g.cmt = r.getElementValue(a, "cmt")),
        (g.desc = r.getElementValue(a, "desc"));
      let y = r.getElementValue(a, "time");
      (g.time = y == null ? null : new Date(y)), r.waypoints.push(g);
    }
    var u = [].slice.call(this.xmlSource.querySelectorAll("rte"));
    for (let h in u) {
      let g = u[h],
        v = {};
      (v.name = r.getElementValue(g, "name")),
        (v.cmt = r.getElementValue(g, "cmt")),
        (v.desc = r.getElementValue(g, "desc")),
        (v.src = r.getElementValue(g, "src")),
        (v.number = r.getElementValue(g, "number"));
      let y = r.queryDirectSelector(g, "type");
      v.type = y != null ? y.innerHTML : null;
      let k = {},
        c = g.querySelector("link");
      c != null &&
        ((k.href = c.getAttribute("href")),
        (k.text = r.getElementValue(c, "text")),
        (k.type = r.getElementValue(c, "type"))),
        (v.link = k);
      let s = [];
      var d = [].slice.call(g.querySelectorAll("rtept"));
      for (let p in d) {
        let w = d[p],
          S = {};
        (S.lat = parseFloat(w.getAttribute("lat"))),
          (S.lon = parseFloat(w.getAttribute("lon")));
        let L = parseFloat(r.getElementValue(w, "ele"));
        S.ele = isNaN(L) ? null : L;
        let _ = r.getElementValue(w, "time");
        (S.time = _ == null ? null : new Date(_)), s.push(S);
      }
      (v.distance = r.calculDistance(s)),
        (v.elevation = r.calcElevation(s)),
        (v.slopes = r.calculSlope(s, v.distance.cumul)),
        (v.points = s),
        r.routes.push(v);
    }
    var m = [].slice.call(this.xmlSource.querySelectorAll("trk"));
    for (let h in m) {
      let g = m[h],
        v = {};
      (v.name = r.getElementValue(g, "name")),
        (v.cmt = r.getElementValue(g, "cmt")),
        (v.desc = r.getElementValue(g, "desc")),
        (v.src = r.getElementValue(g, "src")),
        (v.number = r.getElementValue(g, "number"));
      let y = r.queryDirectSelector(g, "type");
      v.type = y != null ? y.innerHTML : null;
      let k = {},
        c = g.querySelector("link");
      c != null &&
        ((k.href = c.getAttribute("href")),
        (k.text = r.getElementValue(c, "text")),
        (k.type = r.getElementValue(c, "type"))),
        (v.link = k);
      let s = [],
        p = [].slice.call(g.querySelectorAll("trkpt"));
      for (let w in p) {
        var f = p[w];
        let S = {};
        (S.lat = parseFloat(f.getAttribute("lat"))),
          (S.lon = parseFloat(f.getAttribute("lon")));
        let L = parseFloat(r.getElementValue(f, "ele"));
        S.ele = isNaN(L) ? null : L;
        let _ = r.getElementValue(f, "time");
        (S.time = _ == null ? null : new Date(_)), s.push(S);
      }
      (v.distance = r.calculDistance(s)),
        (v.elevation = r.calcElevation(s)),
        (v.slopes = r.calculSlope(s, v.distance.cumul)),
        (v.points = s),
        r.tracks.push(v);
    }
  }),
    (t.prototype.getElementValue = function (n, r) {
      let l = n.querySelector(r);
      return l != null
        ? l.innerHTML != null
          ? l.innerHTML
          : l.childNodes[0].data
        : l;
    }),
    (t.prototype.queryDirectSelector = function (n, r) {
      let l = n.querySelectorAll(r),
        i = l[0];
      if (l.length > 1) {
        let o = n.childNodes;
        for (idx in o) (elem = o[idx]), elem.tagName === r && (i = elem);
      }
      return i;
    }),
    (t.prototype.calculDistance = function (n) {
      let r = {},
        l = 0,
        i = [];
      for (var o = 0; o < n.length - 1; o++)
        (l += this.calcDistanceBetween(n[o], n[o + 1])), (i[o] = l);
      return (i[n.length - 1] = l), (r.total = l), (r.cumul = i), r;
    }),
    (t.prototype.calcDistanceBetween = function (n, r) {
      let l = {};
      (l.lat = n.lat), (l.lon = n.lon);
      let i = {};
      (i.lat = r.lat), (i.lon = r.lon);
      var o = Math.PI / 180,
        a = l.lat * o,
        u = i.lat * o,
        d = Math.sin(((i.lat - l.lat) * o) / 2),
        m = Math.sin(((i.lon - l.lon) * o) / 2),
        f = d * d + Math.cos(a) * Math.cos(u) * m * m;
      return 6371e3 * (2 * Math.atan2(Math.sqrt(f), Math.sqrt(1 - f)));
    }),
    (t.prototype.calcElevation = function (n) {
      for (var r = 0, l = 0, i = {}, o = 0; o < n.length - 1; o++) {
        let f = n[o + 1].ele,
          h = n[o].ele;
        if (f !== null && h !== null) {
          let g = parseFloat(f) - parseFloat(h);
          g < 0 ? (l += g) : g > 0 && (r += g);
        }
      }
      for (var a = [], u = 0, d = ((o = 0), n.length); o < d; o++)
        if (n[o].ele !== null) {
          var m = parseFloat(n[o].ele);
          a.push(m), (u += m);
        }
      return (
        (i.max = Math.max.apply(null, a) || null),
        (i.min = Math.min.apply(null, a) || null),
        (i.pos = Math.abs(r) || null),
        (i.neg = Math.abs(l) || null),
        (i.avg = u / a.length || null),
        i
      );
    }),
    (t.prototype.calculSlope = function (n, r) {
      let l = [];
      for (var i = 0; i < n.length - 1; i++) {
        let o = n[i],
          a = (100 * (n[i + 1].ele - o.ele)) / (r[i + 1] - r[i]);
        l.push(a);
      }
      return l;
    }),
    (t.prototype.toGeoJSON = function () {
      var n = {
        type: "FeatureCollection",
        features: [],
        properties: {
          name: this.metadata.name,
          desc: this.metadata.desc,
          time: this.metadata.time,
          author: this.metadata.author,
          link: this.metadata.link,
        },
      };
      for (idx in this.tracks) {
        let i = this.tracks[idx];
        var r = {
          type: "Feature",
          geometry: { type: "LineString", coordinates: [] },
          properties: {},
        };
        for (idx in ((r.properties.name = i.name),
        (r.properties.cmt = i.cmt),
        (r.properties.desc = i.desc),
        (r.properties.src = i.src),
        (r.properties.number = i.number),
        (r.properties.link = i.link),
        (r.properties.type = i.type),
        i.points)) {
          let o = i.points[idx];
          (l = []).push(o.lon),
            l.push(o.lat),
            l.push(o.ele),
            r.geometry.coordinates.push(l);
        }
        n.features.push(r);
      }
      for (idx in this.routes) {
        let i = this.routes[idx];
        r = {
          type: "Feature",
          geometry: { type: "LineString", coordinates: [] },
          properties: {},
        };
        for (idx in ((r.properties.name = i.name),
        (r.properties.cmt = i.cmt),
        (r.properties.desc = i.desc),
        (r.properties.src = i.src),
        (r.properties.number = i.number),
        (r.properties.link = i.link),
        (r.properties.type = i.type),
        i.points)) {
          let o = i.points[idx];
          var l;
          (l = []).push(o.lon),
            l.push(o.lat),
            l.push(o.ele),
            r.geometry.coordinates.push(l);
        }
        n.features.push(r);
      }
      for (idx in this.waypoints) {
        let i = this.waypoints[idx];
        ((r = {
          type: "Feature",
          geometry: { type: "Point", coordinates: [] },
          properties: {},
        }).properties.name = i.name),
          (r.properties.sym = i.sym),
          (r.properties.cmt = i.cmt),
          (r.properties.desc = i.desc),
          (r.geometry.coordinates = [i.lon, i.lat, i.ele]),
          n.features.push(r);
      }
      return n;
    }),
    Sp()(),
    (e.exports = t);
})(Vd);
var kp = Vd.exports;
const xp = mu(kp),
  Cp = (e) =>
    new Promise((t, n) => {
      const r = new FileReader();
      (r.onload = (l) => {
        var i;
        try {
          const o = new xp();
          if (
            (o.parse((i = l.target) == null ? void 0 : i.result),
            o.tracks.length === 0)
          ) {
            n(new Error("No tracks found in GPX file"));
            return;
          }
          const a = [];
          o.tracks.forEach((u) => {
            u.points.forEach((d) => {
              a.push([d.lat, d.lon]);
            });
          }),
            t(a);
        } catch (o) {
          n(o);
        }
      }),
        (r.onerror = () => {
          n(new Error("Failed to read file"));
        }),
        r.readAsText(e);
    }),
  Ep = [
    {
      id: 1,
      name: "가리산",
      height: 1050.9,
      fileLength: 2,
      address: "강원도 홍천군 두촌면ㆍ화촌면, 춘천시 북산면ㆍ동면",
      reason: `강원도에서 진달래가 가장 많이 피는 산으로 알려져 있고, 참나무 중심의 울창한 산림과 부드러운 산줄기 등 우리나라 산의 전형적인 모습을 갖추고 있으며, 홍천강의 발원지 및 소양강의 수원(水源)을 이루고 있는 점 등을 고려하여 선정
암봉이 솟아있는 정상에서 소양호를 조망할 수 있고, 야생화가 많이 서식하여 자연학습관찰에도 좋은 여건을 갖추고 있음. '98년 강원도에서 자연휴양림으로 지정`,
    },
    {
      id: 2,
      name: "가리왕산",
      height: 1561.9,
      fileLength: 2,
      address: "강원도 정선군 북평면ㆍ정선읍 회동리, 평창군 진부면",
      reason: `가리왕산 8경이 전해질 만큼 경관이 수려하고, 활엽수 극상림이 분포해 있으며, 전국적인 산나물 자생지로 유명. 특히 백두대간의 중심으로 주목군락지가 있어 산림유전자원보호림과 자연휴양림으로 지정되는 등 경관·생태적으로 가치가 큰 점에서 선정
동강(東江)에 흘러드는 오대천과 조양강의 발원지이며 석회암 절리동굴인 얼음동굴이 유명. 산의 이름은 그 모습이 큰 가리(벼나 나무를 쌓은 더미)같다고 하여 유래 `,
    },
    {
      id: 3,
      name: "가야산",
      height: 1432.6,
      fileLength: 5,
      address: "경상남도 합천군ㆍ거창군, 경상북도 성주군",
      reason:
        "예로부터 우리나라의 12대 명산 또는 8경에 속하는 산으로서 '72년 국립공원으로 지정되었으며, 특히 '95년 세계문화유산으로 지정된 국보 팔만대장경과 해인사가 있는 등 역사·문화적 가치가 높은 점을 고려하여 선정,\n`가야국'이 있었던 곳으로 전해지며, `택리지'에서는 가야산의 기암괴봉을 불꽃에 비유하여 석화성(石火星)이라 하였음. 산위에서의 조망이 좋고, 특히 용문폭포와 홍류동 계곡 등이 유명 ",
    },
    {
      id: 4,
      name: "가지산",
      height: 1240.9,
      fileLength: 4,
      address: "울산광역시 울주군, 경상북도 청도군, 경상남도 밀양시",
      reason: "백두대간 남단의 중심으로 ",
    },
    {
      id: 5,
      name: "감악산",
      height: 674.9,
      fileLength: 9,
      address: "경기도 파주시 적성면, 양주시 남면, 연천군 전곡읍",
      reason:
        "예로부터 경기 5악의 하나로서 폭포·계곡·암벽 등을 고루 갖추고 있으며, 임진강·개성 송악산 등의 조망이 좋은 점 등을 고려하여 선정\n수량이 풍부한 운계폭포가 있고, 정상에는 글자가 모두 마멸되어 판독이 불가능한 비뜰대왕비(파주군 향토유적 제8호)가 있는데 `설인귀(薛人貴)'설과 `진흥왕 순수비'설이 나뉘어 속전되고 있음. 임꺽정이 관군의 추격을 피하기 위해 숨어 지냈다는 장군봉 아래 임꺽정 굴이 있음. ",
    },
    {
      id: 6,
      name: "강천산",
      height: 583.7,
      fileLength: 5,
      address: "전라북도 순창군 팔덕면, 전라남도 담양군 용면",
      reason: `군립공원(1981년 지정)으로 지정되어 있으며, 강천계곡 등 경관이 수려하고 조망이 좋은 점 등을 고려하여 선정
신라 진성여왕때(887년) 도선국사가 개창한 강천사(剛泉寺)가 있으며, 산 이름도 강천사(剛泉寺)에서 유래. 삼국시대에 축조된 것으로 추정되는 금성산성(金城山城)이 유명 `,
    },
    {
      id: 7,
      name: "계룡산",
      height: 846.5,
      fileLength: 5,
      address:
        "대전광역시, 충청남도 공주시 계룡면, 논산시 상월면, 계룡시 신도안면",
      reason:
        "예로부터 신라 5악의 하나인 서악(西岳)으로 지칭되었고, 조선시대에는 3악 중 중악(中岳)으로 불리운 산으로서 국립공원으로 지정(1968년)된 점 등을 고려하여 선정산 능선이 마치 닭의 벼슬을 쓴 용의 모습과 닮았다고 하여 계룡산이라는 이름이 유래되었으며, `정감록(鄭鑑錄)`에 언급된 십승지지(十勝之地)중 하나임. 신라 성덕왕 2년(724년) 회의화상이 창건한 동학사(東鶴寺)와 백제 구이신왕(420년)때 고구려의 아도화상에 의하여 창건된 갑사(甲寺)등이 유명\n",
    },
    {
      id: 8,
      name: "계방산",
      height: 1579.1,
      fileLength: 2,
      address: "강원도 홍천군 내면, 평창군 용편면ㆍ진부면",
      reason: `남한에서 한라산, 지리산, 설악산, 덕유산에 이어 다섯 번째로 높은 산으로서 산약초·야생화 등이 많이 서식하고, 희귀수목인 주목·철쭉나무 등이 군락을 이루고 있어 생태계 보호지역으로 지정된 점 등을 고려하여 선정
백두대간을 한 눈에 조망할 수 있으며 겨울철 설경이 백미. 우리나라에서 자동차로 오를 수 있는 고개 중 가장 높은 운두령이 있으며 내린천(內麟川)으로 흐르는 계방천의 발원지임 `,
    },
    {
      id: 9,
      name: "공작산",
      height: 887.4,
      fileLength: 10,
      address: "강원도 홍천군 동면, 화촌면",
      reason: `울창한 산림과 수타계곡 등 경관이 수려한 점 등을 고려하여 선정
산의 형세가 마치 한 마리의 공작이 날개를 펼친 듯하다는데서 산 이름이 유래. 보물 제745호인 월인석보 제17권과 18권이 보존되어 있는 수타사(壽陀寺)와 수타사에서 노천리에 이르는 20리계곡인 수타계곡이 특히 유명 `,
    },
    {
      id: 10,
      name: "관악산",
      height: 632.2,
      fileLength: 21,
      address: "서울특별시 관악구, 경기도 안양시, 과천시",
      reason: `예로부터 경기 5악의 하나로서 경관이 수려하며, 도심지 가까이 위치한 도시자연공원(1968년 지정)으로 수도권 주민들의 휴식처인 점 등을 고려하여 선정
주봉은 연주대(戀主臺)로서 정상에 기상 레이더 시설이 있음. 신라시대 의상이 창건하고 조선 태조가 중수(1392년)한 연주암과 약사여래입상이 유명 `,
    },
    {
      id: 11,
      name: "구병산",
      height: 876.3,
      fileLength: 1,
      address: "경상북도 상주신 화북면, 충청북도 보은군 마로면ㆍ속리산면",
      reason:
        "주능선의 북쪽 지역이 속리산 국립공원에 속해 있고 서원계곡(書院溪谷) 등 경관이 수려한 점 등을 고려하여 선정\n웅장한 아홉 개의 바위봉이 병풍처럼 연이어 솟아 예로부터 구봉산이라고 불리어 왔으며, 정상에서의 조망이 좋음. 예로부터 보은지방에서는 속리산 천황봉은 지아비 산, 구병산은 지어미 산, 금적산은 아들 산이라 하여 이들을 `삼산(三山)'이라 일컬어왔음. ",
    },
    {
      id: 12,
      name: "금산",
      height: 704.9,
      fileLength: 1,
      address: "경상남도 남해군 상주면, 이동면, 삼동면",
      reason: `한려해상국립공원의 유일한 산악공원으로 경관이 수려하고, 바다와 섬, 일출을 조망할 수 있으며 경상남도 기념물로 지정(1974년)된 점 등을 고려하여 선정
본래 보광산이라고 불리다가 조선 태조와 관련된 전설에 따라 금산으로 이름이 바뀌었다고 함. 조선 태조가 기도했다는 이씨기단을 비롯하여, 사자암, 촉대봉, 향로봉 등 38경이 유명하며, 정상에는 우리나라 3대 기도처의 하나인 보리암이 소재 `,
    },
    {
      id: 13,
      name: "금수산",
      height: 1015.8,
      fileLength: 6,
      address: "충청북도 제천시 수산면, 단양군 적성면",
      reason:
        "월악산국립공원 북단에 위치하고 울창한 소나무 숲과 맑고 깨끗한 계류 등 경관이 뛰어난 점을 고려하여 선정, 봄철의 철쭉과 가을철의 단풍이 특히 유명하고 능강계곡과 얼음골이 있음. 정상에서 소백산의 웅장한 산줄기와 충주호를 조망할 수 있음 ",
    },
    {
      id: 14,
      name: "금오산",
      height: 976.5,
      fileLength: 15,
      address: "경상북도 구미시 칠곡군 북삼읍, 김천시 남면",
      reason:
        "기암절벽과 울창한 산림이 조화되어 경관이 수려하며, 문화유산이 많고 도립공원으로 지정(1970년)된 점 등을 고려하여 선정, 높이 38m의 명금폭포가 있으며, 정상부근에는 자연암벽을 이용해 축성한 길이 2㎞의 금오산성이 있음. 해운사, 약사암 등의 고찰과 금오산마애보살입상(보물 제490호), 선봉사대각국사비(보물 제251호), 석조석가여래좌상(보물 제245호) 등이 유명 ",
    },
    {
      id: 15,
      name: "금정산",
      height: 800.8,
      fileLength: 37,
      address: "부산광역시 금정구ㆍ북구, 경상남도 양산시",
      reason:
        "산림이 울창하고 산세가 비교적 웅장하며 도심지 가까이 위치한 시민들의 휴식처인 점 등을 고려하여 선정, 역사적으로 나라를 지키는 호국의 산으로서 호국사찰 범어사와 우리나라 5대 산성의 하나인 금정산성이 있음. 낙동강 지류와 수영강의 분수계(分水界)를 이루고, 금강공원 및 성지곡공원 등이 있음 ",
    },
    {
      id: 16,
      name: "깃대봉",
      height: 360.7,
      fileLength: 1,
      address: "전라남도 신안군 흑산면 홍도",
      reason:
        "덩굴사철, 식나무 및 동백림 등이 자생하는 등 생태적 가치가 커 섬 전체가 천연보호구역으로 지정(1965년)되어 있으며, 다도해해상국립공원으로 지정(1981년)된 점 등을 고려하여 선정, 이름 그대로 깃대처럼 생긴 암봉이며, 홍도의 최고봉임. 깃대봉은 독립문, 석화굴 등 해안경관과 조화를 이뤄 홍도의 수려한 경관을 이루고 있음. ",
    },
    {
      id: 17,
      name: "남산",
      height: 495.1,
      fileLength: 5,
      address: "경상북도 경주시 남산동, 내남면",
      reason:
        "길이 약 8km, 폭 약 4㎞의 산줄기안에 불상 80여체, 탑 60여기, 절터 110여 개소가 산재하여 경주국립공원으로 지정되어 있는 등 신라시대 역사 유물·유적의 보고인 점 등을 고려하여 선정, `경주남산불적지'로 마애여래좌상(보물 제913호), 칠불암마애석불 등이 유명. 동쪽에는 남산산성 등이 있음 ",
    },
    {
      id: 18,
      name: "내연산",
      height: 711.3,
      fileLength: 5,
      address: "경상북도 포항시 송라면ㆍ청하면ㆍ죽장면, 영덕군 남정면",
      reason:
        "남쪽의 천령산 줄기와 마주하면서 그 사이에 험준한 협곡을 형성하고 있는 청하골이 유명. 원진국사사리탑(보물 제430호)과 원진국사비(보물 제252호)가 보존된 보경사(寶鏡寺) 등이 있음 ",
    },
    {
      id: 19,
      name: "내장산",
      height: 763.5,
      fileLength: 4,
      address: "전라북도 정읍시 내장동, 순창군 쌍치면ㆍ복흥면",
      reason:
        "기암괴석과 울창한 산림, 맑은 계류가 어울어진 호남 5대 명산의 하나로 국립공원으로 지정(1971년)되어 있는 점 등을 고려하여 선정, 내장사를 중심으로 서래봉에서 불출봉, 연지봉, 까치봉, 신선봉, 장군봉에 이르기까지 산줄기가 말발굽처럼 둘러쳐져 마치 철옹성 같은 특이지형을 이룸. 내장사(內藏寺) 부속암자인 원적암 일대에 있는 비자림(천연기념물 제153호)이 특히 유명 ",
    },
    {
      id: 20,
      name: "대둔산",
      height: 878.9,
      fileLength: 1,
      address: "충청남도 논산시 벌곡면ㆍ금산군 진산면, 전라북도 완주군 운주면",
      reason:
        "정상인 마천대를 비롯하여 사방으로 뻗은 바위능선의 기암괴석과 수목이 어우러져 경관이 뛰어나고, 도립공원으로 지정(1980년)된 점 등을 감안하여 선정, 마천대에서 낙조대에 이르는 바위능선과 일몰광경이 뛰어나며, 임금바위·장군봉·동심바위·신선바위 등이 있음. 임금바위와 입석대를 잇는 금강구름다리와 태고사(太古寺)가 유명",
    },
    {
      id: 21,
      name: "대암산",
      height: 1312.6,
      fileLength: 1,
      address: "강원도 양구군 동면, 인제군 서화면",
      reason:
        "휴전선이 가까운 지역으로 각종 희귀생물과 원시림에 가까운 숲이 잘 보존되어 천연보호구역(천연기념물 제246호)으로 지정(1973년) 관리되는 등 우리나라 최대 희귀생물자원의 보고인 점 등을 감안하여 선정, 대암산 정상부에 있는 약 9,000여평이 넘는 풀밭 같은 넓은 초원에 큰 용늪과 작은용늪의 고층습지가 있음. 그 주위가 마치 화채(punch) 그릇(bowl)같아 펀치볼로 불리우며 해안분지(亥安盆地)가 유명 ",
    },
    {
      id: 22,
      name: "대야산",
      height: 931,
      fileLength: 3,
      address: "경상북도 문경시 가은읍, 충청북도 괴산군 청천면",
      reason:
        "기암괴석과 폭포·소(沼)가 어우러져 수려한 경관을 이루고 있으며, 속리산 국립공원구역에 포함되어 있는 점 등을 감안하여 선정, 용추폭포와 촛대바위가 있는 선유동계곡 및 `월영대'가 유명 ",
    },
    {
      id: 23,
      name: "덕숭산",
      height: 495.2,
      fileLength: 4,
      address: "충청남도 예산군 덕산면",
      reason:
        "지역 주민들이 소금강이라고 할 만큼 기암괴석과 어우러진 경관이 수려하고, 도립공원으로 지정(1973년)되어 있는 점 등을 감안하여 선정, 백제 제29대 법왕 원년(599년) 지명법사가 창건한 수덕사(修德寺), 보물 제355호인 마애불과 덕산온천이 유명",
    },
    {
      id: 24,
      name: "덕유산",
      height: 1614.2,
      fileLength: 10,
      address: "전라북도 무주군ㆍ장수군, 경상남도 거창군ㆍ함양군",
      reason:
        "향적봉에서 남덕유까지 17km의 장대한 산줄기를 이루고 있으며, 금강과 낙동강의 수원(水源)이고 국립공원으로 지정(1975년)된 점 등을 고려하여 선정, 덕유산 북쪽으로 흘러 내리는 30여km의 무주구천동계곡(茂朱九千洞溪谷)과 자연휴양림, 신라 흥덕왕5년(830년) 무염국사가 창건한 백련사(白蓮社) 등이 유명 ",
    },
    {
      id: 25,
      name: "덕항산",
      height: 1072.9,
      fileLength: 2,
      address: "강원도 삼척시 신기면, 태백시 하사미동",
      reason:
        "전형적인 경동지괴(傾動地塊) 지형으로 기암절벽과 초원이 어우러져 있으며 갈매굴, 제암풍혈, 양터목세굴, 덕발세굴, 큰재세굴 등 석회동굴이 많이 소재하고, 대이동굴 군립공원(1996년 지정) 구역내인 점 등을 고려하여 선정, 약 4∼5억년 전에 이루어진 길이 6.9㎞, 천장높이 30m에 이르는 동양최대의 동굴인 환선굴(幻仙窟 : 천연기념물 제178호)이 유명 ",
    },
    {
      id: 26,
      name: "도락산",
      height: 965.3,
      fileLength: 1,
      address: "충청북도 단양군  단성면, 대강면",
      reason:
        "소백산과 월악산 중간에 위치하며, 단양8경인 하선암, 중선암과 사인암 등이 산재해 있는 바위산으로 경관이 수려한 점 등을 고려하여 선정, 남한강 지류인 단양천 10여km 구간에 있는 하선암(下仙岩)과 쌍룡폭포·옥렴대·명경대 등 웅장한 바위가 있는 중선암(中仙岩), 경천벽, 와룡암, 일사대, 명경담 등이 있는 상선암(上仙岩)이 특히 유명 ",
    },
    {
      id: 27,
      name: "도봉산",
      height: 740.2,
      fileLength: 19,
      address: "서울특별시 도봉구, 경기도 의정부시 호원동ㆍ양주시 장흥면",
      reason:
        "최고봉인 자운봉을 중심으로 만장봉, 선인봉, 원도봉계곡, 용어천계곡, 송추계곡 등 경관이 수려하고 국립공원으로 지정(1983년)되어 있으며, 수도권 시민의 휴식처인 점 등을 고려하여 선정, 암벽등산에 최적지이며, 회룡사(回龍寺), 망월사(望月寺), 천축사(天竺寺), 보문사(普門寺) 등이 유명 ",
    },
    {
      id: 28,
      name: "두륜산",
      height: 700,
      fileLength: 4,
      address: "전라남도 해남군 삼산면ㆍ북일면ㆍ북평면ㆍ현산면",
      reason:
        "한반도의 최남단 해남반도에 솟아 있는 산으로서 왕벚나무의 자생지가 있으며, 다도해를 조망하기에 적합하고 도립공원으로 지정(1972년)된 점 등을 감안하여 선정, 봄의 춘백, 여름의 녹음, 가을의 단풍, 겨울의 동백 등으로 유명하며 유자(柚子), 차(茶)의 산지로 알려져 있음. 보물 제320호인 삼층석탑을 비롯하여 많은 문화재를 보존하고 있는 대흥사(大興寺)가 있음 ",
    },
    {
      id: 29,
      name: "두타산",
      height: 1357,
      fileLength: 4,
      address: "강원도 동해시 삼화동, 삼척시 미로면ㆍ하장면",
      reason:
        "무릉계곡 등 경관이 아름다운 점 등을 고려하여 선정, 삼화사(三和寺), 관음암(觀音庵), 두타산성(頭陀山城)이 있음. 바위에 50여개의 크고 작은 구멍이 패여 산이름이 붙여졌으며, 예로부터 기우제를 지내는 등 토속신앙의 기도처인 쉰움산(五十井山)이 유명 ",
    },
    {
      id: 30,
      name: "마니산",
      height: 472.1,
      fileLength: 3,
      address: "인천광역시 강화군 화도면",
      reason:
        "단군시조의 전설이 간직된 산으로 역사·문화적 가치 등을 고려하여 선정, 사적 제136호인 참성단(塹星壇), 함허동천, 사적 제130호인 삼랑산성이 있음. 또한 많은 보물을 보존하고 있는 정수사(淨水寺) 및 전등사(傳燈寺)등이 있으며, 성화를 채화하는 장소이기도 함 ",
    },
    {
      id: 31,
      name: "마이산",
      height: 687.4,
      fileLength: 6,
      address: "전라북도 진안군 진안읍ㆍ마령면",
      reason:
        "특이한 지형을 이루고 있으며, 섬진강과 금강(錦江) 발원지이고 도립공원(1979년)으로 지정된 점 등을 고려하여 선정, 중생대 백악기에 습곡운동을 받아 융기된 역암이 침식작용에 의하여 형성된 산으로 산의 형상이 마치 말의 귀를 닮았다 하여 마이산으로 불려짐. 암마이산 남쪽 절벽 밑에 있는 80여개의 크고 작은 돌탑이 있는 탑사(塔寺)와 금당사(金塘寺)가 유명 ",
    },
    {
      id: 32,
      name: "명성산",
      height: 922,
      fileLength: 1,
      address: "강원도 철원군 갈말읍, 경기도 포천시 영북면ㆍ이동면",
      reason:
        "도평천(都坪川), 영평천(永平川), 한탄강의 수계를 이루며, 산세가 가파르고 곳곳에 바위가 어우러져 경관이 아름다운 점 등을 고려하여 선정, 산 북쪽으로 삼부연폭포와 남쪽으로 산정호수를 끼고 있음. 전설에 의하면 왕건(王建)에게 쫓기던 궁예(弓裔)가 피살되었던 곳으로 유명",
    },
    {
      id: 33,
      name: "명지산",
      height: 1252.3,
      fileLength: 4,
      address: "경기도 가평군 북면ㆍ하면",
      reason:
        "경기도내에서 두 번째로 높은 산으로 경기도의 최고봉인 화악산(1,468m)과 가평천을 사이에 하고 있으며, 강씨봉, 귀목봉, 청계산, 우목봉 등 산세가 웅장하고 군립공원으로 지정된 점 등을 감안하여 선정, 20여km를 흐르는 산 동쪽의 가평천 계곡과 익근리계곡의 명지폭포가 유명. 명지산 일대의 산과 계곡들은 경기도내에서는 첫째가는 심산유곡으로 알려져 있음 ",
    },
    {
      id: 34,
      name: "모악산",
      height: 795.2,
      fileLength: 3,
      address: "전라북도 김제시 금산면, 전주시 완산구, 완주군 구이면",
      reason:
        "진달래와 철쭉이 유명한 호남 4경의 하나이며, 도립공원으로 지정(1971년)된 점 등을 고려하여 선정, 신라 말에 견훤이 이 곳을 근거로 후백제를 일으켰다고 전해짐. 국보 제62호인 미륵전을 비롯하여 대적광전(보물 제467호)·혜덕왕사응탑비(보물 제24호)·5층석탑(보물 제27호)등 많은 문화재가 있는 금산사(金山寺)가 있음. 특히 미륵전에 있는 높이 11.82m나 되는 미륵불이 유명 ",
    },
    {
      id: 35,
      name: "무등산",
      height: 1186.8,
      fileLength: 31,
      address: "광주광역시 동구, 전라남도 담양군 남면ㆍ화순군 이서면",
      reason: `최고봉인 천왕봉 가까이에는 원기둥 모양의 절리(節理)가 발달하여 기암괴석의 경치가 뛰어나고, 도시민의 휴식처이며, 도립공원으로 지정(1972년)된 점 등을 고려하여 선정
보물 제131호인 철조비로자나불좌상 등이 있는 증심사(證心寺)와 원효사(元曉寺)가 유명 `,
    },
    {
      id: 36,
      name: "무학산",
      height: 761.4,
      fileLength: 6,
      address: "경상남도 창원시 교방동ㆍ두척동ㆍ내서읍",
      reason: `도시민의 휴식처로서 경관이 좋은 아기자기한 능선과 다도해를 바라다보는 조망이 좋은 점 등을 고려하여 선정
정상 북서쪽에 있는 시루봉 일대의 바위는 좋은 암벽등반 훈련장임. 예전부터 양조업이 성할 정도로 수질이 좋음 서원골 입구에 최치원의 제자들이 세운 관해정(觀海亭)이 있고 부근 원각사, 백운사 등이 유명 `,
    },
    {
      id: 37,
      name: "미륵산",
      height: 458.4,
      fileLength: 6,
      address: "경상남도 통영시 산양읍ㆍ봉평동",
      reason: `충무시와 연육교로 이어지는 미륵도(彌勒島)의 복판에 솟은 산으로 한려해상국립공원의 아름다운 경관을 한눈에 조망할 수 있는 등 경관이 아름다운 점 등을 고려하여 선정
지형도에는 용화산(龍華山)으로 표기되어 있으며, 석조여래상(경남유형문화재 43호)과 고려중기의 작품인 지장보살상과 시왕상 등이 보존되어 있는 용화사(龍華寺)가 있음. 도솔선사(兜率禪師)가 창건한 도솔암, 관음사(觀音寺), 봉수대터 등이 유명 `,
    },
    {
      id: 38,
      name: "민주지산",
      height: 1241.7,
      fileLength: 3,
      address: "충청북도 영동군, 전라북도 무주군, 경상북도 김천시",
      reason: `1000m 이상의 고산준봉을 거느리고 울창한 산림과 바위가 어우러져 있으며, 국내 최대 원시림 계곡인 물한계곡이 있는 점 등을 고려하여 선정
물이 차다는 한천마을 상류에서부터 약 20㎞를 흐르는 깊은 계곡으로, 원시림 등이 잘 보존된 손꼽히는 생태관광지인 물한계곡(勿閑溪谷)이 특히 유명. 정상 남쪽 50m쯤 아래에는 삼두마애불상이 있음. 충북, 전북, 경북의 경계인 삼도봉과 연접 `,
    },
    {
      id: 39,
      name: "방장산",
      height: 733.6,
      fileLength: 3,
      address: "전라남도 장성군, 전라북도 고창군 신림면ㆍ정읍시 입암면",
      reason:
        "옛부터 지리산, 무등산과 함께 호남의 삼신산으로 불려져 왔으며, 전북과 전남을 양분하는 산으로서 산세가 웅장하고 자연휴양림인 점 등을 고려하여 선정\n옛이름은 방등산으로 백제가요중 `방등산가'의 방등산이 바로 방장산임. 정상에서 멀리 서해바다와 동쪽으로 무등산이 보임. ",
    },
    {
      id: 40,
      name: "방태산",
      height: 1445.7,
      fileLength: 1,
      address: "강원도 인제군 기린면ㆍ상남면, 홍천군 내면",
      reason: `가칠봉(1,241m), 응복산(1,156m), 구룡덕봉(1,388m), 주걱봉(1,444m) 등 고산준봉을 거느리고 있으며 한국에서 가장 큰 자연림이라고 할 정도로 나무들이 울창하고, 희귀식물과 희귀어종이 많은 생태적 특성 등을 고려하여 선정
정감록에는 난을 피해 숨을만한 피난처로 기록되어 있음. 자연휴양림이 있으며, 높이 10m의 이폭포와 3m의 저폭포가 있는 적가리골 및 방동약수, 개인약수 등이 유명 `,
    },
    {
      id: 41,
      name: "백덕산",
      height: 1350.1,
      fileLength: 4,
      address: "강원도 평창군 방림면, 횡성군 안흥면, 영월군 수주면",
      reason:
        "사자산(1120m), 사갓봉(1020m), 솟때봉(884m) 등이 솟아 있어 산세가 웅장하고 골이 깊은 등 경관이 좋으며, 평창강(平昌江)과 주천강(酒泉江)의 수계인 점 등을 고려하여 선정, 신라 때 자장율사가 창건하였다고 전해지는 법흥사(法興寺)와 경내에 있는 보물 제613호로 지정된 징효대사보인탑이 유명 ",
    },
    {
      id: 42,
      name: "백암산",
      height: 741.2,
      fileLength: 4,
      address: "전라북도 순창군 복흥면, 잔라남도 장성군 북하면",
      reason:
        "봄이면 백양, 가을이면 내장이라 하듯이 경관이 수려하고 천연기념물인 비자나무와 굴거리나무가 집단분포하고 있으며, 내장산국립공원구역에 포함되어 있는 점 등을 고려하여 선정, 학바위, 백양산 12경, 영천굴 등이 있음. 소요대사부도, 대웅전, 극락보전, 사천왕문을 포함하여 청류암의 관음전, 경관이 아름다운 쌍계루 등 수많은 문화유산들을 보존하고 있는 백양사(白羊寺)가 유명 ",
    },
    {
      id: 43,
      name: "백운산(광양)",
      height: 1222.2,
      fileLength: 8,
      address: "전라남도 광양시 진상면ㆍ옥룡면ㆍ봉강면ㆍ다압면, 구례군 간전면",
      reason:
        "수려한 계곡미를 가지고 있으며 광덕산, 국망봉, 박달봉 등과 같은 높은 봉우리들과 무리를 이뤄 계곡·단애(斷崖) 등 독특한 경관을 가지고 있는 점 등을 고려하여 선정, 백운동 계곡 및 신라 말 도선이 창건하였다고 전하는 흥룡사(興龍寺)가 유명",
    },
    {
      id: 44,
      name: "백운산(정선)",
      height: 883.5,
      fileLength: 2,
      address: "강원도 정선군 신동읍, 평창군 미탄면",
      reason:
        "주봉을 중심으로 하여 또아리봉과 도솔봉, 매봉, 억불봉 등 산세가 웅장하며 경관이 수려하고 억새풀과 철쭉 군락, 온·한대 900종의 식물이 서식하는 등 경관·생태적 특징을 고려하여 선정, 자연휴양림이 있으며, 백운사(白雲寺), 성불사(成佛寺) 등이 유명 ",
    },
    {
      id: 45,
      name: "백운산(포천)",
      height: 903,
      fileLength: 6,
      address: "경기도 포천시 이동면, 강원도 화천군 사내면",
      reason:
        "동강의 가운데에 위치하고 있어 경관이 아름답고, 조망이 좋으며 생태계보존지역으로 지정되어있는 점 등을 고려하여 선정 흰구름이 늘 끼어 있는데서 산 이름이 유래, 오대산에서 발원하는 오대천과 조양강(朝陽江)을 모아 남한강으로 흐르는 동강 및 천연기념물 제260호로 지정(1979년)된 백룡동굴(白龍洞窟)이 유명",
    },
    {
      id: 46,
      name: "변산",
      height: 459,
      fileLength: 5,
      address: "전라북도 부안군 변산면, 상서면, 진서면",
      reason:
        "울창한 산과 계곡, 모래해안과 암석해안 및 사찰 등이 어울려 뛰어난 경관을 이루고 있으며 국립공원으로 지정(1968년)된 점 등을 고려하여 선정, 산이면서 바다와 직접 닿아 있는 특징이 있음. 직소폭포, 가마소, 봉래구곡, 채석강, 적벽강 및 내소사, 개암사 등 사찰과 호랑가시나무, 꽝꽝나무 등 희귀동·식물이 서식 ",
    },
    {
      id: 47,
      name: "북한산",
      height: 835.6,
      fileLength: null,
      address:
        "서울특별시 강북구ㆍ성북구ㆍ종로구ㆍ은평구, 경기도 고양시ㆍ양주시",
      reason:
        "최고봉인 백운대를 위시하여 인수봉, 만경대, 노적봉 등 경관이 수려하고 도시민들의 휴식처이며 국립공원으로 지정(1983년)되어 있는 점 등을 고려하여 선정, 북한산성, 우이동계곡, 정릉계곡, 세검정계곡 등이 유명. 도선국사가 창건한 도선사(道詵寺), 태고사(太古寺), 화계사(華溪寺), 문수사(文殊寺), 진관사(津寬寺) 등 수많은 고찰이 있음 ",
    },
    {
      id: 48,
      name: "비슬산",
      height: 1083.4,
      fileLength: 5,
      address:
        "대구광역시 달성군 옥포면ㆍ유가면ㆍ가창면, 경상북도 청도군 각북면",
      reason:
        "봄에는 진달래, 가을에는 억새 등 경관이 아름다우며, 조망이 좋고 군립공원으로 지정된 점 등을 고려하여 선정, 북쪽의 팔공산과 함께 대구분지를 형성하며 낙동강을 끼고 있음. 고려말 공민왕 7년(1358년) 진보법사가 창건한 소재사(消災寺) 등이 유명 ",
    },
    {
      id: 49,
      name: "삼악산",
      height: 655.8,
      fileLength: 17,
      address: "강원도 춘천시 서면",
      reason:
        "고고시대에 형성된 등선계곡과 맥국시대의 산성터가 있는 유서깊은 산으로 기암괴석의 경관이 아름답고, 의암호와 북한강을 굽어보는 조망이 좋은 점 등을 고려하여 선정, 남쪽 골짜기 초입의 협곡과 등선폭포(登仙瀑布)가 특히 유명하고, 흥국사(興國寺), 금선사(金仙寺), 상원사(上院寺) 등 7개 사찰이 있음. ",
    },
    {
      id: 50,
      name: "서대산",
      height: 904.1,
      fileLength: 5,
      address: "충청남도 금산군 추부면ㆍ군북면, 충청북도 옥천군 군서면",
      reason:
        "충청남도에서는 제일 높은 산으로 곳곳에 기암괴석과 바위 절벽이 있어 중부의 금강이라고 일컬을 정도로 경관이 아름다우며, 산정에서의 조망이 좋은 점 등을 고려하여 선정, 용굴, 사자굴, 견우장년대, 직녀탄금대, 북두칠성바위 등이 유명 ",
    },
    {
      id: 51,
      name: "선운산",
      height: 334.7,
      fileLength: 5,
      address: "전라북도 고창군 아산면ㆍ심원면ㆍ해리면",
      reason:
        "산세는 별로 크지 않으나 숲이 울창하고 곳곳이 기암괴석으로 이루어져 있어 경관이 빼어나며 천연기념물 제184호인 동백나무 숲이 있는 등 생태적 가치가 크고 도립공원으로 지정(1979년)된 점 등을 고려하여 선정, 백제 위덕왕 24년(577년) 검단선사가 창건한 선운사(禪雲寺)와 수령 5백년의 동백나무 ３천여 그루가 군락을 이루고 있는 선운사 동백 숲이 유명 ",
    },
    {
      id: 52,
      name: "설악산",
      height: 1708.1,
      fileLength: 8,
      address: "강원도 속초시 설악동, 인제군 북면ㆍ인제읍, 양양군 서면ㆍ강현면",
      reason:
        "남한에서 세 번째로 높은 봉우리인 한계령, 마등령, 미시령 등 수많은 고개와 산줄기·계곡들이 어우러져 한국을 대표하는 산악미의 극치를 이루고 있으며, 국립공원(1970년 지정) 및 유네스코의 생물권 보존지역으로 지정(1982년)되어 관리되고 있는 점 등을 고려하여 선정, 백담사(百潭寺), 봉정암(鳳頂菴), 신흥사(新興寺), 계조암(繼祖菴), 오세암(五歲庵), 흔들바위, 토왕성폭포, 대승폭포 등이 특히 유명 ",
    },
    {
      id: 53,
      name: "성인봉",
      height: 986.5,
      fileLength: 4,
      address: "경상북도 울릉군 울릉읍 서면ㆍ북면",
      reason:
        "휴화산인 울릉도의 최고봉으로서 울릉도 모든 하천의 수원을 이루고, 식생이 특이한 원시림이 잘 보전되어 있는 점 등을 감안하여 선정, 울릉도에서는 유일하게 평지를 이룬 나리분지(羅里盆地)와 천연기념물 제189호로 지정(1967년)된 원시림에 유명. 나리동의 울릉국화·섬백리향의 군락은 천연기념물 제52호(1962년)로 지정되어 있음 ",
    },
    {
      id: 54,
      name: "소백산",
      height: 1439.7,
      fileLength: 9,
      address: "경상북도 영주시 풍기읍, 충청북도 단양군 단양읍",
      reason:
        "국망봉에서 비로봉, 연화봉으로 이어지는 해발 1,300여m의 일대 산군으로 1,000m이상은 고원지대와 같은 초원을 이루고 있으며, 국망천과 낙동강 상류로 들어가는 죽계천이 시작되고 국립공원으로 지정(1987년)된 점 등을 고려하여 선정, 주봉인 비로봉 일대에는 주목군락지(천연기념물 제244호)와 한국산 에델바이스인 솜다리가 군락을 이루고 있음. 희방사(喜方寺), 구인사, 소수서원(紹修書院 : 사적 제55호), 부석사(浮石寺), 온달성, 국립천문대",
    },
    {
      id: 55,
      name: "소요산",
      height: 587.5,
      fileLength: 8,
      address: "경기도 동두천시, 포천시 신북면",
      reason:
        "규모는 작으나 상백운대, 하백운대, 중백운대 등 경관이 아름답고, 등산인의 선호도가 높아 '81년 국민관광지로 지정된 점을 고려하여 선정, 원효폭포, 청량폭포, 선녀탕절벽과 가을철 단풍이 유명하며, 신라 무열왕 1년(654년)에 원효대사가 창건하였다고 전해지는 자재암이 있음.",
    },
    {
      id: 56,
      name: "속리산",
      height: 1058.4,
      fileLength: 3,
      address: "경상북도 상주시 화북면, 충청북도 보은군 내속리면",
      reason:
        "예로부터 산세가 수려하여 제2금강 또는 소금강이라고도 불리울 정도로 경관이 아름답고 망개나무, 미선나무 등 1,000여 종이 넘는 동식물이 서식하고 있으며, 국립공원으로 지정(1970년)된 점 등을 고려하여 선정, 법주사(法住寺), 문장대, 천연기념물 제103호인 정이품송(正二品松) 및 천연기념물 제207호인 망개나무가 유명 ",
    },
    {
      id: 57,
      name: "신불산",
      height: 1159.3,
      fileLength: 17,
      address: "울산광역시 울주군 삼남면ㆍ상북면",
      reason:
        "영남알프스 산군에 속하는 산으로 능선에는 광활한 억새와 바위절벽, 완만한 지대가 조화를 이루고 있으며 작천계곡, 파래소폭포 등이 있고 군립공원인 점 등을 고려하여 선정, 신불산 폭포자연휴양림 등이 유명",
    },
    {
      id: 58,
      name: "연화산",
      height: 524,
      fileLength: 2,
      address: "경상남도 고성군 개천면ㆍ영현면",
      reason:
        "경관이 아름답고 오래된 사찰과 문화재가 많으며 도립공원으로 지정(1983년)된 점 등을 고려하여 선정, 산 중턱에 큰 대밭이 있음. 유서 깊은 옥천사(玉泉寺)와 연대암·백련암·청연암 등이 유명",
    },
    {
      id: 59,
      name: "오대산",
      height: 1565.4,
      fileLength: 4,
      address: "강원도 평창군 진부면, 홍천군 내면, 강릉시 연곡면",
      reason:
        "국내 제일의 산림지대를 이루고 있으며, 경관이 수려하여 국립공원으로 지정(1975년)된 점 등을 고려하여 선정, 연꽃모양으로 둘러선 다섯 개의 봉우리가 모두 모나지 않고 평평한 대지를 이루고 있는데서 산이름이 유래. 월정사(月精寺), 적멸보궁(寂滅寶宮), 상원사(上院寺)가 있음. 골짜기마다 사찰, 암자 등 많은 불교유적이 산재해 있는 등 우리나라 최고의 불교 성지로 유명 ",
    },
    {
      id: 60,
      name: "오봉산",
      height: 777.9,
      fileLength: 2,
      address: "강원도 춘천시 북산면, 화천군 간동면",
      reason:
        "산세는 크지 않으나 바위와 수목이 어우러진 경관이 아름다운 점 등을 고려하여 선정, 다섯 개의 바위 봉이 연이어 솟아있는 데서 산이름이 유래. 신라때 아도화상이 창건하였다고 전해지는 청평사(淸平寺)와 구성폭포가 유명. 청평사 경내에 있는 보물 제164호인 회전문이 유명 ",
    },
    {
      id: 61,
      name: "용문산",
      height: 1157.1,
      fileLength: 5,
      address: "경기도 양평군 용문면ㆍ옥천면",
      reason:
        "옛부터 경기의 금강산이라 불리워질 만큼 기암괴석과 고산준령을 고루 갖춘 경관이 뛰어난 산이며, 특히 신라 선덕여왕때 창건한 용문사와 높이 62m, 둘레 14m에 달하는 은행나무(천연기념물 제30호)가 있는 등 역사·문화적 가치가 높은 점을 고려하여 선정, 경기도에서 네 번째로 높은 산으로 미지산이라는 이름으로 불리었는데 조선을 개국한 이태조가 등극하면서 `용문산'이라 바꿔 부르게 되었다는 전설이 있음. ",
    },
    {
      id: 62,
      name: "용화산",
      height: 877.8,
      fileLength: 8,
      address: "강원도 화천군 간동면ㆍ하남면, 춘천시 사북면",
      reason:
        "파로호, 춘천호, 소양호 등과 연접해 있으며 산림과 기암괴석이 어우러져 경관이 아름다우며 조망이 좋은 점 등을 고려하여 선정, 성불사터가 있으며 광바위, 주전자바위, 바둑바위 등 갖가지 전설을 간직한 실물을 닮은 바위가 유명 ",
    },
    {
      id: 63,
      name: "운문산",
      height: 1195.1,
      fileLength: 9,
      address: "경상북도 청도군 운문면, 경상남도 밀양시 산내면",
      reason:
        "구연동(臼淵洞), 얼음골이라 부르는 동학(洞壑), 해바위(景岩) 등 천태만상의 기암괴석이 계곡과 어우러져 경관이 수려하고 군립공원으로 지정(1983년)된 점 등을 고려하여 선정, 보물 제835호 대웅전, 제678호 삼층석탑, 제193호 석등, 제316호 원응국사비, 제317호 석조여래좌상 등 각종 문화유적이 있는 운문사가 있음. 석남사 경내에 있는 4백년의 수령을 자랑하는 처진 소나무(반송 : 천연기념물 제180호)가 유명 ",
    },
    {
      id: 64,
      name: "운악산",
      height: 934.7,
      fileLength: 6,
      address: "경기도 가평군 하면, 포천시 화현면",
      reason:
        "주봉인 망경대를 둘러싼 경관이 경기 소금강이라고 불리울 만큼 뛰어난 점 등을 고려하여 선정, 천년고찰인 현등사 및 백년폭포, 오랑캐소, 눈썹바위, 코끼리바위, 망경대, 무우폭포, 큰골내치기암벽, 노채애기소 등 운악8경이 유명 ",
    },
    {
      id: 65,
      name: "운장산",
      height: 1125.8,
      fileLength: 1,
      address: "전라북도 진안군 주천면, 부귀면, 정천면, 완주군 동상면",
      reason:
        "운일암(雲日岩)·반일암(半日岩)으로 유명한 대불천(大佛川) 계곡이 있으며, 물이 맑고 암벽과 숲으로 둘러싸여 경관이 아름답고 자연휴양림이 있는 점 등을 고려하여 선정, 북두칠성의 전설이 담겨있는 `칠성대'와 조선시대 송익필의 전설이 얽혀 있는 `오성대'가 유명 ",
    },
    {
      id: 66,
      name: "월악산",
      height: 1095.3,
      fileLength: 4,
      address: "충청북도 제천시 한수면, 덕산면",
      reason:
        "산세가 험준하고 기암이 어우러져 예로부터 신령스런 산으로 여겨졌으며 송계 8경과 용하 9곡이 있고 국립공원으로 지정(1984년)된 점 등을 고려하여 선정, 신라말 마의태자와 덕주공주가 마주보고 망국의 한을 달래고 있다는 미륵사지의 석불입상, 덕주사의 마애불 및 덕주산성 등이 유명",
    },
    {
      id: 67,
      name: "월출산",
      height: 810.7,
      fileLength: 5,
      address: "전라남도 영암군 영암읍ㆍ군서면ㆍ학산면, 강진군 성전면",
      reason:
        "경관이 아름다우며 난대림과 온대림이 혼생하여 생태적 가치가 크고 국립공원으로 지정(1988년)된 점 등을 고려하여 선정, 천황봉을 중심으로 무위사 극락보전(국보 제13호), 도갑사 해탈문(국보 제50호)가 있음. 구정봉 밑 용암사터 근처에는 우리나라에서 가장 높은 곳에 위치한 국보 제144호인 마애여래좌상이 유명",
    },
    {
      id: 68,
      name: "유명산",
      height: 864,
      fileLength: 8,
      address: "경기도 가평군 설악면, 양평군 옥천면",
      reason:
        "능선이 완만하고 부드러우며, 수량이 풍부한 계곡과 기암괴석 및 울창한 숲이 어우러져 경관이 아름다운 점 등을 고려하여 선정, 신라 법흥왕 27년(540년)에 인도에서 불법을 우리나라에 들여온 마라가미 스님에게 법흥왕이 하사한 사찰인 현등사가 유명. 자연휴양림이 있음 ",
    },
    {
      id: 69,
      name: "응봉산",
      height: 999.7,
      fileLength: 1,
      address: "강원도 삼척시 가곡면ㆍ원덕읍, 경상북도 울진군 북면",
      reason:
        "아름다운 여러 계곡들을 끼고 있어 계곡탐험코스로 적합하며, 산림이 울창하고 천연노천온천인 덕구온천과 용소골의 폭포와 소가 많은 등 경관이 아름다운 점을 고려하여 선정, 울진조씨가 매사냥을 하다가 잃어버린 매를 이 산에서 찾고는 산 이름을 응봉이라 한 뒤 근처에 부모의 묘자리를 쓰자 집안이 번성하였다는 전설이 전해지고 있음. 정상에서 멀리 백암산·통고산·함백산·태백산을 조망할 수 있는 곳으로 유명 ",
    },
    {
      id: 70,
      name: "장안산",
      height: 1237.4,
      fileLength: 1,
      address: "전라북도 장수군 장수읍, 계남면",
      reason:
        "덕산계곡을 비롯한 크고 작은 계곡과 윗용소, 아랫용소 등 연못 및 기암괴석이 산림과 어우러져 군립공원(1986년)으로 지정된 점 등을 고려하여 선정, 산등에서 동쪽 능선으로 펼쳐진 광활한 갈대밭과 덕산용소계곡이 유명 ",
    },
    {
      id: 71,
      name: "재약산",
      height: 1119.1,
      fileLength: 14,
      address: "경상남도 밀양시 단장면ㆍ산내면, 울산광역시 울주군 상북면",
      reason:
        "산세가 부드러우면서도 정상 일대에는 거대한 암벽을 갖추고 있어 경관이 아름다우며 우리나라에서 가장 넓은 억새밭인 사자평이 있는 점 등을 고려하여 선정, 삼복 더위에 얼음이 어는 천연기념물 제224호 얼음골이 있음. 신라 진덕여왕때 창건하고 서산대사가 의병을 모집한 곳인 표충사가 유명",
    },
    {
      id: 72,
      name: "적상산",
      height: 1030.6,
      fileLength: 1,
      address: "전라북도 무주군 적상면",
      reason:
        "가을에 마치 온 산이 빨간 치마를 입은 여인네의 모습과 같다 하여 이름이 붙여질 정도로 경관이 뛰어나며 덕유산 국립공원구역인 점 등을 고려하여 선정, 고려 공민왕 23년(1374) 최영 장군이 탐라를 토벌한 후 귀경길에 이 곳을 지나다가 산의 형세가 요새로서 적지임을 알고 왕에게 건의하여 축성된 적상산성(사적 제146호)과 안국사 등이 유명 ",
    },
    {
      id: 73,
      name: "점봉산",
      height: 1426,
      fileLength: 1,
      address: "강원도 양양군 서면, 인제군 인제읍ㆍ기린면",
      reason:
        "원시림이 울창하고 모데미풀 등이 자생하는 등 생태적 가치가 커 유네스코에서 생물권보존구역으로 지정하고, 산림유전자원보호림으로 관리되고 있는 점 등을 고려하여 선정. 특히 제1회 아름다운 숲 전국대회에서 보전되어야 할 숲으로 선정. 12담 구곡으로 불리는 오색약수터 및 주전골 성국사터에 있는 보물 제497호인 양양 오색리 삼층석탑이 있음 ",
    },
    {
      id: 74,
      name: "조계산",
      height: 887.3,
      fileLength: 2,
      address: "전라남도 순천시 승주읍ㆍ송광면",
      reason:
        "예로부터 소강남(小江南)이라 부른 명산으로 깊은 계곡과 울창한 숲·폭포·약수 등 자연경관이 아름답고, 불교 사적지가 많으며, 도립공원으로 지정(1979년)된 점 등을 고려하여 선정, 목조삼존불감(국보 제42호), 고려고종제서(高麗高宗制書 : 국보 제43호), 송광사국사전(국보 제56호) 등 많은 국보를 보유한 송광사와 곱향나무(천연기념물 제88호)가 유명",
    },
    {
      id: 75,
      name: "주왕산",
      height: 722.1,
      fileLength: 1,
      address: "경상북도 청송군 청송읍ㆍ부동면, 영덕군 지품면ㆍ달산면",
      reason:
        "석병산으로 불리울 만큼 기암괴봉과 석벽이 병풍처럼 둘러서 경관이 아름다우며 국립공원으로 지정(1976년)된 점 등을 고려하여 선정, 대전사(大典寺), 주왕암이 있음. 주왕굴을 중심으로 남아있는 자하성의 잔해는 주왕과 고려군의 싸움의 전설이 깃들여 있는 곳으로 유명 ",
    },
    {
      id: 76,
      name: "주흘산",
      height: 1108.4,
      fileLength: 6,
      address: "경상북도 문경시 문경읍",
      reason:
        "소백산맥의 중심을 이루고 문경새재 등 역사적 전설이 있으며, 여궁폭포와 파랑폭포 등 경관이 아름답고, 월악산 국립공원구역인 점 등을 고려하여 선정, 야생화, 오색단풍, 산죽밭이 유명하며, 조선조 문경현의 진산으로 문경 1, 2, 3관문이 있음 ",
    },
    {
      id: 77,
      name: "지리산",
      height: 1915.4,
      fileLength: 6,
      address:
        "전라북도 남원시, 전라남도 구례군, 경상남도 하동군ㆍ산청군ㆍ함양군",
      reason:
        "신라 5악중 남악으로 남한 내륙의 최고봉인 천왕봉(1,915m)을 주봉으로 노고단(1,507m), 반야봉(1,751m) 등 동서로 100여리의 거대한 산악군을 이뤄 `지리산 12동천'을 형성하는 등 경관이 뛰어나고 우리나라 최대의 자연생태계 보고이며 국립공원 제1호로 지정(1967년)된 점 등을 고려하여 선정, 어리석은 사람이 머물면 지혜로운 사람으로 달라진다고 한데서 산이름이 유래.화엄사, 천은사, 연곡사, 쌍계사 등이 유명 ",
    },
    {
      id: 78,
      name: "지리산(통영)",
      height: 399.3,
      fileLength: 1,
      address: "경상남도 통영시 사량면",
      reason:
        "한려수도의 빼어난 경관과 조화를 이루고 특히 불모산, 가마봉, 향봉, 옥녀봉 등 산 정상부의 바위산이 기암괴석을 형성하고 조망이 좋은 점 등을 고려하여 선정,`지리산이 바라 보이는 산'이란 뜻에서 산이름이 유래하였으며, 현지에서는 지리산이라고도 불리워지고 있음. 다도해의 섬을 조망할 수 있으며 기묘한 바위 능선이 특히 유명 ",
    },
    {
      id: 79,
      name: "천관산",
      height: 724.3,
      fileLength: 6,
      address: "전라남도 장흥군 관산읍, 대덕읍",
      reason:
        "호남의 5대 명산으로 꼽을 만큼 경관이 아름다우며 조망이 좋고 도립공원으로 지정(1998년)된 점 등을 고려하여 선정, 신라시대에 세워진 천관사와 동백숲이유명하고, 자연휴양림이 있음. ",
    },
    {
      id: 80,
      name: "천마산",
      height: 810.3,
      fileLength: 7,
      address: "경기도 남양주시 화도읍, 오남읍",
      reason:
        "산꼭대기를 중심으로 능선이 사방에 뻗어있어 어느 지점에서나 정상을 볼수 있는 특이한 산세와 식물상이 풍부하여 식물관찰 산행지로 이름나 있는 점 등을 고려하여 선정, 산 남쪽에 천마산스키장이 있음",
    },
    {
      id: 81,
      name: "천성산",
      height: 920.2,
      fileLength: 2,
      address: "경상남도 양산시 하북면, 상북면",
      reason:
        "금강산의 축소판이라고 불릴 정도로 경관이 뛰어나고, 특히 산정상부에 드넓은 초원과 산지습지가 발달하여 끈끈이주걱 등 희귀식물과 수서곤충이 서식하는 등 생태적 가치가 높은 점을 고려하여 선정, 봄에는 진달래와 철쭉, 가을에는 능선의 억새가 장관을 이루며, 원효대사가 창건했다는 내원사가 있음.",
    },
    {
      id: 82,
      name: "천태산",
      height: 715.2,
      fileLength: 2,
      address: "충청북도 영동군 양산면, 충청남도 금산군 제원면",
      reason:
        "충북의 설악산으로 불려질 만큼 경관이 아름다운 점 등을 고려하여 선정, 고려시대 대각국사 의천이 창건한 영국사와 수령이 약 500년 된 은행나무(천연기념물 제223호), 3층석탑(보물 제533호), 원각국사비(보물 제534호) 등이 유명 ",
    },
    {
      id: 83,
      name: "청량산",
      height: 869.7,
      fileLength: 3,
      address: "경상북도 봉화군 명호면ㆍ재산면, 안동시 도산면ㆍ예안면",
      reason:
        "산세는 크지 않으나 연이어 솟는 바위 봉우리와 기암절벽이 어우러져 예로부터 소금강으로 꼽힐 만큼 산세가 수려하고, 도립공원으로 지정(1982년)된 점 등을 고려하여 선정, 원효대사가 창건한 유리보전, 신라시대의외청량사, 최치원의 유적지인 고운대와 독서당, 공민왕이 홍건적의 난을 피해 은신한 오마대(五馬臺)와 청량산성, 김생이 글씨를 공부하던 김생굴, 퇴계 이황이 수도하며 성리학을 집대성한 오산당(청량정사) 등 역사적 유적지로 유명 ",
    },
    {
      id: 84,
      name: "추월산",
      height: 731.2,
      fileLength: 4,
      address: "전라남도 담양군 용면, 전라북도 순창군 복흥면",
      reason:
        "울창한 산림과 담양호가 어우려져 경관이 아름다우며 추월난이 자생하는 점 등을 고려하여 선정, 산 정상에서 65m 정도 아래 지점에 있는 보리암(菩提庵)과 전라북도 순창을 경계로 한 산록에 있는 용추사가 유명 ",
    },
    {
      id: 85,
      name: "축령산",
      height: 887.1,
      fileLength: 4,
      address: "경기도 남양주시 수동면, 가평군 상면",
      reason:
        "소나무와 잣나무 장령림이 울창한 숲을 이루고 단애가 형성되어 있으며, 산 정상에서 북으로는 운악산, 명지산, 화악산이 보이고, 동남쪽으로 청평호가 보이는 등 조망이 뛰어난 점을 고려하여 선정, 가평 7경의 하나인 축령백림과 남이장군의 전설이 깃든 남이바위, 수리바위 축령백림 등이 유명. 자연휴양림이 있음. ",
    },
    {
      id: 86,
      name: "치악산",
      height: 1282,
      fileLength: 7,
      address: "강원도 원주시, 횡성군, 영월군",
      reason:
        "주봉인 비로봉을 중심으로 남대봉 (1,181m)과 매화산(1,085m) 등 1천여 미터의 고봉들이 연이어 있어 경관이 아름다우며 곳곳에 산성과 사찰, 사적지들이 널리 산재해 있고 국립공원으로 지정(1984년)된 점 등을 고려하여 선정, 구룡계곡, 부곡계곡, 금대계곡 등과 신선대, 구룡소, 세렴폭포, 상원사 등이 있음. 사계절별로 봄 진달래와 철쭉, 여름 구룡사의 울창한 숲과 깨끗한 물, 가을의 단풍, 겨울 설경이 유명 ",
    },
    {
      id: 87,
      name: "칠갑산",
      height: 559.7,
      fileLength: 4,
      address: "충청남도 청양군 대치면, 정산면, 장평면",
      reason:
        "백운동 계곡 등 경관이 아름다우며 도립공원으로 지정(1973년)된 점 등을 고려하여 선정, 계곡은 깊고 급하며 지천과 계곡을 싸고 돌아 7곳에 명당이 생겼다는 데서 산이름이 유래. 신라 문성왕 때 보조(普照) 승려가 창건한 장곡사(長谷寺)에 있는 철조약사여래좌상(보물 제174호) 등이 유명 ",
    },
    {
      id: 88,
      name: "태백산",
      height: 1566.7,
      fileLength: 6,
      address: "강원도 태백시, 경상북도 봉화군 석포면",
      reason:
        "예로부터 삼한의 명산이라 불리웠으며 산 정상에는 고산 식물이 자생하고 겨울 흰 눈으로 덮인 주목군락의 설경 등 경관이 뛰어나며 도립공원으로 지정(1989년)된 점 등을 고려하여 선정, 삼국사기에 따르면 산 정상에 있는 천제단에서 왕이 친히 천제를 올렸다는 기록이 있음. 망경사, 백단사 등이 유명 ",
    },
    {
      id: 89,
      name: "태화산",
      height: 1027.5,
      fileLength: 3,
      address: "강원도 영월군 영월읍, 충청북도 단양군 영춘면",
      reason:
        "경관이 아름답고 고구려 시대에 쌓았던 토성인 태화산성 등 역사적 유적이 있고, 고씨동굴(高氏洞窟 : 천연기념물 제219호) 등이 소재하고 있는 점 등을 고려하여 선정 ",
    },
    {
      id: 90,
      name: "팔공산",
      height: 1192.3,
      fileLength: 20,
      address: "경상북도 군위군 부계면, 영천시 신녕면, 대구광역시 동구",
      reason:
        "비로봉(毘盧峰)을 중심으로 하여 동·서로 16km에 걸친 능선 경관이 아름다우며 대도시 근교에서는 가장 높은 산으로 도시민에게 휴식처를 제공하고 도립공원으로 지정(1980년)된 점 등을 고려하여 선정, 동화사(桐華寺), 은해사(銀海寺), 부인사(符仁寺), 송림사(松林寺), 관암사(冠岩寺) 등 불교문화의 성지로 유명 ",
    },
    {
      id: 91,
      name: "팔봉산",
      height: 328.2,
      fileLength: 1,
      address: "강원도 홍천군 서면",
      reason:
        "산은 나지막하고 규모도 작으나 여덟개의 바위봉이 팔짱 낀 8형제처럼 이여져 있고 홍천강과 연접하여 경관이 아름다운 점 등을 고려하여 선정, 국민관광지로 지정되어 있음 ",
    },
    {
      id: 92,
      name: "팔영산",
      height: 606.9,
      fileLength: 2,
      address: "전라남도 고흥군 점암면, 영남면",
      reason:
        "여덟개의 암봉으로 이루어진 산세가 험준하고 기암괴석이 많으며 조망이 좋고 도립공원으로 지정(1998년)된 점 등을 고려하여 선정, 예전에 화엄사, 송광사, 대흥사와 함께 호남 4대 사찰로 꼽히던 능가사가 있음. 신선대, 강산폭포 및 자연휴양림이 있음. 정상에서 대마도까지 보일 정도로 조망이 좋음 ",
    },
    {
      id: 93,
      name: "한라산",
      height: 1947.3,
      fileLength: 5,
      address: "제주특별자치도",
      reason:
        "남한에서 가장 높은 우리나라 3대 영산의 하나로 산마루에는 분화구인 백록담이 있고 1,800여종의 식물과 울창한 자연림 등 고산식물의 보고이며 국립공원으로 지정(1970년)된 점 등을 고려하여 선정, 남한의 최고봉으로서 백록담, 탐라계곡, 안덕계곡, 왕관릉, 성판암, 천지연 등이 유명",
    },
    {
      id: 94,
      name: "화악산",
      height: 1468.3,
      fileLength: 6,
      address: "경기도 가평군 북면, 강원도 화천군 사내면",
      reason:
        "경기 제１의 고봉으로 애기봉을 거쳐 수덕산까지 약 10㎞의 능선 경관이 뛰어나며 시계가 거의１백㎞에 달하는 등 조망이 좋은 점 등을 고려하여 선정, 집다리골 자연휴양림이 있으며, 정상에서 중서부지역 대부분의 산을 조망할 수 있음 ",
    },
    {
      id: 95,
      name: "화왕산",
      height: 757.7,
      fileLength: 5,
      address: "경상남도 창녕군 창녕읍, 고암면",
      reason:
        "억새밭과 진달래 군락 등 경관이 아름다우며 화왕산성, 목마산성 등이 있고 군립공원인 점 등을 고려하여 선정, 해마다 정월대보름이 되면 정상 일대의 억새평전에서 달맞이 행사가 열림. 정상에 화산활동으로 생긴 분화구 못(용지)이 3개 있음. 송현동 고분군 및 석불좌상, 대웅전 등 4점의 보물이 있는 관룡사 등이 유명 ",
    },
    {
      id: 96,
      name: "황매산",
      height: 1113.1,
      fileLength: 4,
      address: "경상남도 합천군 대병면ㆍ가회면, 산청군 차황면",
      reason:
        "화강암 기암괴석과 소나무, 철쭉, 활엽수림이 어우러져 경관이 아름다운 점 등을 고려하여 선정, 합천호 푸른물에 하봉, 중봉, 상봉의 산 그림자가 잠기면 세송이 매화꽃이 물에 잠긴 것 같다고 하여 수중매라는 별칭으로도 불림. 산 아래의 황매평전에는 목장지대와 고산 철쭉 자생지가 있으며, 통일신라시대의 고찰인 염암사지(사적131호)가 유명 ",
    },
    {
      id: 97,
      name: "황석산",
      height: 1192.5,
      fileLength: 10,
      address: "경상남도 함양군 안의면, 서하면, 서상면",
      reason:
        "거망에서 황석으로 이어지는 능선에 있는 광활한 억새밭 등 경관이 아름답고 황석산성 등 역사적 유적이 있는 점 등을 고려하여 선정, 정유재란 당시 왜군에게 마지막까지 항거하던 사람들이 성이 무너지자 죽음을 당하고 부녀자들은 천길 절벽에서 몸을 날려 지금껏 황석산 북쪽 바위 벼랑이 핏빛이라는 전설이 있는 황석산성이 있음 ",
    },
    {
      id: 98,
      name: "황악산",
      height: 1111.4,
      fileLength: 8,
      address: "경상북도 김천시 대항면",
      reason:
        "전체적인 산세는 특징 없이 완만한 편이나 산림이 울창하고 산 동쪽으로 흘러내리는 계곡은 곳곳에 폭포와 소를 이뤄 계곡미가 아름다운 점 등을 고려하여 선정, 특히 직지사 서쪽 200m 지점에 있는 천룡대부터 펼쳐지는 능여계곡은 대표적인 계곡으로 봄철에는 진달래, 벚꽃, 산목련이 유명. ",
    },
    {
      id: 99,
      name: "황장산",
      height: 1078.9,
      fileLength: 1,
      address: "경상북도 문경시 동로면",
      reason:
        "울창한 산림이 암벽과 어우러져 경관이 아름다우며 황장목이 유명하고 조선시대 봉산 표지석이 있는 등 경관 및 산림문화적 측면을 고려하여 선정, 동국여지승람, 대동지지, 예천군 읍지 등에는 작성산으로 표기",
    },
    {
      id: 100,
      name: "희양산",
      height: 996.4,
      fileLength: 8,
      address: "경상북도 문경시 가은읍, 충청북도 괴산군 연풍면",
      reason:
        "산 전체가 하나의 바위처럼 보이고 바위 낭떠러지들이 하얗게 드러나 있어 주변의 산에서뿐만 아니라 먼 산에서도 쉽게 알아볼 수 있으며 기암괴석과 풍부한 수량이 어우러진 백운곡 등 경관이 수려하고 마애본좌상 등 역사유적이 있는 점 등을 고려하여 선정",
    },
  ],
  Lp = [
    {
      frtrlId: "0000000002",
      frtrlNm: "가리산",
      mtnCd: "421100101",
      ctpvNm: "강원특별자치도",
      addrNm: "강원도 춘천시 북산면ㆍ동면, 홍천군 두촌면ㆍ화촌면",
      lat: "37.871353",
      lot: "127.956485",
      aslAltide: "1051.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000003",
      frtrlNm: "가리왕산",
      mtnCd: "427700101",
      ctpvNm: "강원특별자치도",
      addrNm: "강원도 정선군 정선읍 회동리ㆍ북평면, 평창군 진부면",
      lat: "37.460995",
      lot: "128.56275",
      aslAltide: "1561.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000001",
      frtrlNm: "가야산",
      mtnCd: "478400101",
      ctpvNm: "경상북도",
      addrNm: "경상남도 합천군ㆍ거창군, 경상북도 성주군",
      lat: "35.822563",
      lot: "128.122518",
      aslAltide: "1430.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000004",
      frtrlNm: "가지산",
      mtnCd: "317100101",
      ctpvNm: "울산광역시",
      addrNm: "울산광역시 울주군, 경상북도 청도군, 경상남도 밀양시",
      lat: "35.619875",
      lot: "129.003523",
      aslAltide: "1240.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000005",
      frtrlNm: "감악산",
      mtnCd: "414800101",
      ctpvNm: "경기도",
      addrNm: "경기도 파주시 적성면, 양주시 남면, 연천군 전곡읍",
      lat: "37.941082",
      lot: "126.969989",
      aslAltide: "675.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000006",
      frtrlNm: "강천산",
      mtnCd: "457700101",
      ctpvNm: "전라북도",
      addrNm: "전라북도 순창군 팔덕면, 전라남도 담양군 용면",
      lat: "35.388214",
      lot: "127.034392",
      aslAltide: "584.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000007",
      frtrlNm: "계룡산",
      mtnCd: "441500301",
      ctpvNm: "충청남도",
      addrNm:
        "대전광역시, 충청남도 공주시 계룡면, 논산시 상월면, 계룡시 신도안면",
      lat: "36.361424",
      lot: "127.210292",
      aslAltide: "845.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000008",
      frtrlNm: "계방산",
      mtnCd: "427206801",
      ctpvNm: "강원특별자치도",
      addrNm: "강원도 홍천군 내면, 평창군 용편면ㆍ진부면",
      lat: "37.728268",
      lot: "128.46543",
      aslAltide: "1577.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000009",
      frtrlNm: "공작산",
      mtnCd: "427200401",
      ctpvNm: "강원특별자치도",
      addrNm: "강원도 홍천군 동면, 화촌면",
      lat: "37.71593923",
      lot: "128.0105456",
      aslAltide: "887.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000010",
      frtrlNm: "관악산",
      mtnCd: "116200201",
      ctpvNm: "서울특별시",
      addrNm: "서울특별시 관악구, 경기도 안양시, 과천시",
      lat: "37.445044",
      lot: "126.964223",
      aslAltide: "629.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000011",
      frtrlNm: "구병산",
      mtnCd: "437200401",
      ctpvNm: "충청북도",
      addrNm: "충청북도 보은군 마로면ㆍ속리산면, 경상북도 상주신 화북면,",
      lat: "36.46989438",
      lot: "127.8625301",
      aslAltide: "877.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000012",
      frtrlNm: "금산",
      mtnCd: "488400801",
      ctpvNm: "경상남도",
      addrNm: "경상남도 남해군 상주면, 이동면, 삼동면",
      lat: "34.753803",
      lot: "127.982936",
      aslAltide: "701.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000013",
      frtrlNm: "금수산",
      mtnCd: "431500701",
      ctpvNm: "충청북도",
      addrNm: "충청북도 제천시 수산면, 단양군 적성면",
      lat: "36.985009",
      lot: "128.256761",
      aslAltide: "1016.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000014",
      frtrlNm: "금오산",
      mtnCd: "471900101",
      ctpvNm: "경상북도",
      addrNm: "경상북도 구미시 칠곡군 북삼읍, 김천시 남면",
      lat: "36.092833",
      lot: "128.300054",
      aslAltide: "977.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000015",
      frtrlNm: "금정산",
      mtnCd: "264100101",
      ctpvNm: "부산광역시",
      addrNm: "부산광역시 금정구ㆍ북구, 경상남도 양산시",
      lat: "35.280118",
      lot: "129.050542",
      aslAltide: "802.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000016",
      frtrlNm: "깃대봉",
      mtnCd: "469100501",
      ctpvNm: "전라남도",
      addrNm: "전라남도 신안군 흑산면 홍도",
      lat: "34.699941",
      lot: "125.205139",
      aslAltide: "368.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000017",
      frtrlNm: "남산",
      mtnCd: "471300201",
      ctpvNm: "경상북도",
      addrNm: "경상북도 경주시 남산동, 내남면",
      lat: "35.767661",
      lot: "129.225369",
      aslAltide: "468.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000018",
      frtrlNm: "내연산",
      mtnCd: "471300201",
      ctpvNm: "경상북도",
      addrNm: "경상북도 포항시 송라면ㆍ청하면ㆍ죽장면, 영덕군 남정면",
      lat: "36.263301",
      lot: "129.258523",
      aslAltide: "710.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000019",
      frtrlNm: "내장산",
      mtnCd: "451800501",
      ctpvNm: "전라북도",
      addrNm: "전라북도 정읍시 내장동, 순창군 쌍치면ㆍ복흥면",
      lat: "35.478299",
      lot: "126.888994",
      aslAltide: "763.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000020",
      frtrlNm: "대둔산",
      mtnCd: "447103401",
      ctpvNm: "충청남도",
      addrNm: "충청남도 논산시 벌곡면ㆍ금산군 진산면, 전라북도 완주군 운주면",
      lat: "36.126556",
      lot: "127.323071",
      aslAltide: "878.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000021",
      frtrlNm: "대암산",
      mtnCd: "428101301",
      ctpvNm: "강원특별자치도",
      addrNm: "강원도 양구군 동면, 인제군 서화면",
      lat: "38.21087",
      lot: "128.13481",
      aslAltide: "1304.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000022",
      frtrlNm: "대야산",
      mtnCd: "472800901",
      ctpvNm: "경상북도",
      addrNm: "경상북도 문경시 가은읍, 충청북도 괴산군 청천면",
      lat: "36.649026",
      lot: "127.96407",
      aslAltide: "931.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000023",
      frtrlNm: "덕숭산",
      mtnCd: "448100401",
      ctpvNm: "충청남도",
      addrNm: "충청남도 예산군 덕산면",
      lat: "36.671737",
      lot: "126.624461",
      aslAltide: "495.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000024",
      frtrlNm: "덕유산",
      mtnCd: "457300702",
      ctpvNm: "전라북도",
      addrNm: "전라북도 무주군ㆍ장수군, 경상남도 거창군ㆍ함양군",
      lat: "35.85990274",
      lot: "127.746381",
      aslAltide: "1614.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000025",
      frtrlNm: "덕항산",
      mtnCd: "421900601",
      ctpvNm: "강원특별자치도",
      addrNm: "강원도 삼척시 신기면, 태백시 하사미동",
      lat: "37.318296",
      lot: "129.001612",
      aslAltide: "1071.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000026",
      frtrlNm: "도락산",
      mtnCd: "438002801",
      ctpvNm: "충청북도",
      addrNm: "충청북도 단양군  단성면, 대강면",
      lat: "36.856368",
      lot: "128.311091",
      aslAltide: "964.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000027",
      frtrlNm: "도봉산",
      mtnCd: "113200102",
      ctpvNm: "서울특별시",
      addrNm: "서울특별시 도봉구, 경기도 의정부시 호원동ㆍ양주시 장흥면",
      lat: "37.69883",
      lot: "127.01547",
      aslAltide: "740.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000028",
      frtrlNm: "두륜산",
      mtnCd: "468201301",
      ctpvNm: "전라남도",
      addrNm: "전라남도 해남군 삼산면ㆍ북일면ㆍ북평면ㆍ현산면",
      lat: "34.471848",
      lot: "126.637535",
      aslAltide: "703.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000029",
      frtrlNm: "두타산",
      mtnCd: "422301901",
      ctpvNm: "강원특별자치도",
      addrNm: "강원도 동해시 삼화동, 삼척시 미로면ㆍ하장면",
      lat: "37.43445721",
      lot: "128.9734669",
      aslAltide: "1353.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000030",
      frtrlNm: "마니산",
      mtnCd: "287100601",
      ctpvNm: "인천광역시",
      addrNm: "인천광역시 강화군 화도면",
      lat: "37.612745",
      lot: "126.436401",
      aslAltide: "469.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000031",
      frtrlNm: "마이산",
      mtnCd: "457200901",
      ctpvNm: "전라북도",
      addrNm: "전라북도 진안군 진안읍ㆍ마령면",
      lat: "35.760484",
      lot: "127.411233",
      aslAltide: "686.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000032",
      frtrlNm: "명성산",
      mtnCd: "427800701",
      ctpvNm: "경기도",
      addrNm: "강원도 철원군 갈말읍, 경기도 포천시 영북면ㆍ이동면",
      lat: "38.090196",
      lot: "127.337617",
      aslAltide: "923.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000033",
      frtrlNm: "명지산",
      mtnCd: "418201401",
      ctpvNm: "경기도",
      addrNm: "경기도 가평군 북면ㆍ하면",
      lat: "37.94024567",
      lot: "127.4325174",
      aslAltide: "1267.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000034",
      frtrlNm: "모악산",
      mtnCd: "452100701",
      ctpvNm: "전라북도",
      addrNm: "전라북도 김제시 금산면, 전주시 완산구, 완주군 구이면",
      lat: "35.728678",
      lot: "127.084721",
      aslAltide: "794.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000035",
      frtrlNm: "무등산",
      mtnCd: "291700501",
      ctpvNm: "전라남도",
      addrNm: "광주광역시 동구, 전라남도 담양군 남면ㆍ화순군 이서면",
      lat: "35.121098",
      lot: "127.00283",
      aslAltide: "1187.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000036",
      frtrlNm: "무학산",
      mtnCd: "481500901",
      ctpvNm: "경상남도",
      addrNm: "경상남도 창원시 교방동ㆍ두척동ㆍ내서읍",
      lat: "35.210231",
      lot: "128.535362",
      aslAltide: "761.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000037",
      frtrlNm: "미륵산",
      mtnCd: "482201101",
      ctpvNm: "경상남도",
      addrNm: "경상남도 통영시 산양읍ㆍ봉평동",
      lat: "34.810512",
      lot: "128.41628",
      aslAltide: "461.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000038",
      frtrlNm: "민주지산",
      mtnCd: "482201101",
      ctpvNm: "충청북도",
      addrNm: "충청북도 영동군, 전라북도 무주군, 경상북도 김천시",
      lat: "36.03976612",
      lot: "127.849333",
      aslAltide: "1242.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000039",
      frtrlNm: "방장산",
      mtnCd: "457900601",
      ctpvNm: "전라북도",
      addrNm: "전라북도 고창군 신림면ㆍ정읍시 입암면, 전라남도 장성군",
      lat: "35.455991",
      lot: "126.75431",
      aslAltide: "743.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000040",
      frtrlNm: "방태산",
      mtnCd: "428102201",
      ctpvNm: "강원특별자치도",
      addrNm: "강원도 인제군 기린면ㆍ상남면, 홍천군 내면",
      lat: "37.888141",
      lot: "128.390341",
      aslAltide: "1444.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000041",
      frtrlNm: "백덕산",
      mtnCd: "427602301",
      ctpvNm: "강원특별자치도",
      addrNm: "강원도 평창군 방림면, 횡성군 안흥면, 영월군 수주면",
      lat: "37.396072",
      lot: "128.293787",
      aslAltide: "1350.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000042",
      frtrlNm: "백암산",
      mtnCd: "468801201",
      ctpvNm: "전라북도",
      addrNm: "전라남도 장성군 북하면, 전라북도 순창군 복흥면",
      lat: "35.461171",
      lot: "126.868349",
      aslAltide: "741.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000044",
      frtrlNm: "백운산(광양)",
      mtnCd: "462300801",
      ctpvNm: "전라남도",
      addrNm: "전라남도 광양시 진상면ㆍ옥룡면ㆍ봉강면ㆍ다압면, 구례군 간전면",
      lat: "35.106243",
      lot: "127.621757",
      aslAltide: "1218.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000045",
      frtrlNm: "백운산(정선)",
      mtnCd: "427708601",
      ctpvNm: "강원특별자치도",
      addrNm: "강원도 정선군 신동읍, 평창군 미탄면",
      lat: "37.29869",
      lot: "128.579145",
      aslAltide: "883.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000043",
      frtrlNm: "백운산(포천)",
      mtnCd: "416501801",
      ctpvNm: "경기도",
      addrNm: "경기도 포천시 이동면, 강원도 화천군 사내면",
      lat: "38.130579",
      lot: "127.492505",
      aslAltide: "904.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000046",
      frtrlNm: "변산",
      mtnCd: "458002001",
      ctpvNm: "전라북도",
      addrNm: "전라북도 부안군 변산면, 상서면, 진서면",
      lat: "35.679818",
      lot: "126.620083",
      aslAltide: "508.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000047",
      frtrlNm: "북한산",
      mtnCd: "113050202",
      ctpvNm: "서울특별시",
      addrNm:
        "서울특별시 강북구ㆍ성북구ㆍ종로구ㆍ은평구, 경기도 고양시ㆍ양주시",
      lat: "37.658657",
      lot: "126.978056",
      aslAltide: "837.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000048",
      frtrlNm: "비슬산",
      mtnCd: "277101501",
      ctpvNm: "경상북도",
      addrNm:
        "대구광역시 달성군 옥포면ㆍ유가면ㆍ가창면, 경상북도 청도군 각북면",
      lat: "35.71526",
      lot: "128.523981",
      aslAltide: "1084.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000049",
      frtrlNm: "삼악산",
      mtnCd: "421102701",
      ctpvNm: "강원특별자치도",
      addrNm: "강원도 춘천시 서면",
      lat: "37.920351",
      lot: "127.612711",
      aslAltide: "654.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000050",
      frtrlNm: "서대산",
      mtnCd: "447101401",
      ctpvNm: "충청남도",
      addrNm: "충청남도 금산군 추부면ㆍ군북면, 충청북도 옥천군 군서면",
      lat: "36.220654",
      lot: "127.538562",
      aslAltide: "904.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000051",
      frtrlNm: "선운산",
      mtnCd: "457901001",
      ctpvNm: "전라북도",
      addrNm: "전라북도 고창군 아산면ㆍ심원면ㆍ해리면",
      lat: "35.517657",
      lot: "126.577097",
      aslAltide: "336.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000052",
      frtrlNm: "설악산",
      mtnCd: "428302602",
      ctpvNm: "강원특별자치도",
      addrNm: "강원도 양양군 서면ㆍ강현면, 속초시 설악동, 인제군 북면ㆍ인제읍",
      lat: "38.119135",
      lot: "128.46544",
      aslAltide: "1708.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000053",
      frtrlNm: "성인봉",
      mtnCd: "479400901",
      ctpvNm: "경상북도",
      addrNm: "경상북도 울릉군 울릉읍 서면ㆍ북면",
      lat: "37.497383",
      lot: "130.866729",
      aslAltide: "984.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000054",
      frtrlNm: "소백산",
      mtnCd: "438001301",
      ctpvNm: "충청북도",
      addrNm: "충청북도 단양군 단양읍, 경상북도 영주시 풍기읍",
      lat: "36.95786818",
      lot: "128.4788661",
      aslAltide: "1439.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000055",
      frtrlNm: "소요산",
      mtnCd: "412500201",
      ctpvNm: "경기도",
      addrNm: "경기도 동두천시, 포천시 신북면",
      lat: "37.915914",
      lot: "127.132813",
      aslAltide: "587.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000056",
      frtrlNm: "속리산",
      mtnCd: "437201201",
      ctpvNm: "충청북도",
      addrNm: "충청북도 보은군 내속리면, 경상북도 상주시 화북면",
      lat: "36.543181",
      lot: "127.870846",
      aslAltide: "1057.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000057",
      frtrlNm: "신불산",
      mtnCd: "317102401",
      ctpvNm: "울산광역시",
      addrNm: "울산광역시 울주군 삼남면ㆍ상북면",
      lat: "35.53933",
      lot: "129.053953",
      aslAltide: "1209.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000058",
      frtrlNm: "연화산",
      mtnCd: "488205101",
      ctpvNm: "경상남도",
      addrNm: "경상남도 고성군 개천면ㆍ영현면",
      lat: "35.063018",
      lot: "128.26213",
      aslAltide: "528.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000059",
      frtrlNm: "오대산",
      mtnCd: "421504602",
      ctpvNm: "강원특별자치도",
      addrNm: "강원도 강릉시 연곡면, 평창군 진부면, 홍천군 내면",
      lat: "37.794601",
      lot: "128.543605",
      aslAltide: "1563.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000060",
      frtrlNm: "오봉산",
      mtnCd: "421103801",
      ctpvNm: "강원특별자치도",
      addrNm: "강원도 춘천시 북산면, 화천군 간동면",
      lat: "38.00002881",
      lot: "127.807132",
      aslAltide: "779.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000061",
      frtrlNm: "용문산",
      mtnCd: "418303101",
      ctpvNm: "경기도",
      addrNm: "경기도 양평군 용문면ㆍ옥천면",
      lat: "37.561979",
      lot: "127.549637",
      aslAltide: "1157.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000062",
      frtrlNm: "용화산",
      mtnCd: "427901901",
      ctpvNm: "강원특별자치도",
      addrNm: "강원도 화천군 간동면ㆍ하남면, 춘천시 사북면",
      lat: "38.0380386",
      lot: "127.7479119",
      aslAltide: "878.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000063",
      frtrlNm: "운문산",
      mtnCd: "478202401",
      ctpvNm: "경상북도",
      addrNm: "경상북도 청도군 운문면, 경상남도 밀양시 산내면",
      lat: "35.615396",
      lot: "128.959625",
      aslAltide: "1188.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000064",
      frtrlNm: "운악산",
      mtnCd: "416502601",
      ctpvNm: "경기도",
      addrNm: "경기도 포천시 화현면, 가평군 하면",
      lat: "37.878718",
      lot: "127.322893",
      aslAltide: "936.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000065",
      frtrlNm: "운장산",
      mtnCd: "457202301",
      ctpvNm: "전라북도",
      addrNm: "전라북도 진안군 부귀면, 주천면, 정천면, 완주군 동상면",
      lat: "35.915653",
      lot: "127.363019",
      aslAltide: "1126.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000066",
      frtrlNm: "월악산",
      mtnCd: "431503501",
      ctpvNm: "충청북도",
      addrNm: "충청북도 제천시 한수면, 덕산면",
      lat: "36.886045",
      lot: "128.105844",
      aslAltide: "1094.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000067",
      frtrlNm: "월출산",
      mtnCd: "468102301",
      ctpvNm: "전라남도",
      addrNm: "전라남도 강진군 성전면, 영암군 영암읍ㆍ군서면ㆍ학산면",
      lat: "34.766997",
      lot: "126.704294",
      aslAltide: "809.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000068",
      frtrlNm: "유명산",
      mtnCd: "468102301",
      ctpvNm: "경기도",
      addrNm: "경기도 양평군 옥천면, 가평군 설악면",
      lat: "37.575285",
      lot: "127.48662",
      aslAltide: "862.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000069",
      frtrlNm: "응봉산",
      mtnCd: "422305301",
      ctpvNm: "강원특별자치도",
      addrNm: "강원도 삼척시 가곡면ㆍ원덕읍, 경상북도 울진군 북면",
      lat: "37.076597",
      lot: "129.230461",
      aslAltide: "999.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000070",
      frtrlNm: "장안산",
      mtnCd: "457402601",
      ctpvNm: "전라북도",
      addrNm: "전라북도 장수군 계남면, 장수읍",
      lat: "35.625733",
      lot: "127.593443",
      aslAltide: "1237.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000071",
      frtrlNm: "재약산",
      mtnCd: "482704101",
      ctpvNm: "경상남도",
      addrNm: "경상남도 밀양시 단장면ㆍ산내면, 울산광역시 울주군 상북면",
      lat: "35.557707",
      lot: "128.97228",
      aslAltide: "1189.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000072",
      frtrlNm: "적상산",
      mtnCd: "457301901",
      ctpvNm: "전라북도",
      addrNm: "전라북도 무주군 적상면",
      lat: "35.946508",
      lot: "127.689936",
      aslAltide: "1034.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000073",
      frtrlNm: "점봉산",
      mtnCd: "428104601",
      ctpvNm: "강원특별자치도",
      addrNm: "강원도 인제군 인제읍ㆍ기린면, 양양군 서면",
      lat: "38.027861",
      lot: "128.432476",
      aslAltide: "1424.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000074",
      frtrlNm: "조계산",
      mtnCd: "461502801",
      ctpvNm: "전라남도",
      addrNm: "전라남도 순천시 송광면ㆍ승주읍",
      lat: "35.001211",
      lot: "127.313555",
      aslAltide: "884.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000075",
      frtrlNm: "주왕산",
      mtnCd: "477502301",
      ctpvNm: "경상북도",
      addrNm: "경상북도 청송군 부동면ㆍ청송읍, 영덕군 지품면ㆍ달산면",
      lat: "36.389337",
      lot: "129.162417",
      aslAltide: "721.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000076",
      frtrlNm: "주흘산",
      mtnCd: "472803901",
      ctpvNm: "경상북도",
      addrNm: "경상북도 문경시 문경읍",
      lat: "36.78844",
      lot: "128.101271",
      aslAltide: "1106.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000077",
      frtrlNm: "지리산",
      mtnCd: "488605302",
      ctpvNm: "경상남도",
      addrNm:
        "경상남도 산청군ㆍ하동군ㆍ함양군, 전라북도 남원시, 전라남도 구례군",
      lat: "35.336971",
      lot: "127.730474",
      aslAltide: "1915.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000078",
      frtrlNm: "지리산(통영)",
      mtnCd: "482202301",
      ctpvNm: "경상남도",
      addrNm: "경상남도 통영시 사량면",
      lat: "34.851294",
      lot: "128.198261",
      aslAltide: "398.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000079",
      frtrlNm: "천관산",
      mtnCd: "468001701",
      ctpvNm: "전라남도",
      addrNm: "전라남도 장흥군 관산읍, 대덕읍",
      lat: "34.535402",
      lot: "126.911238",
      aslAltide: "723.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000080",
      frtrlNm: "천마산",
      mtnCd: "413602201",
      ctpvNm: "경기도",
      addrNm: "경기도 남양주시 오남읍, 화도읍",
      lat: "37.680364",
      lot: "127.273397",
      aslAltide: "812.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000081",
      frtrlNm: "천성산",
      mtnCd: "483302101",
      ctpvNm: "경상남도",
      addrNm: "경상남도 양산시 하북면, 상북면",
      lat: "35.378184",
      lot: "128.950771",
      aslAltide: "922.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000082",
      frtrlNm: "천태산",
      mtnCd: "437403501",
      ctpvNm: "충청북도",
      addrNm: "충청북도 영동군 양산면, 충청남도 금산군 제원면",
      lat: "36.159122",
      lot: "127.600005",
      aslAltide: "715.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000083",
      frtrlNm: "청량산",
      mtnCd: "479203401",
      ctpvNm: "경상북도",
      addrNm: "경상북도 봉화군 명호면ㆍ재산면, 안동시 도산면ㆍ예안면",
      lat: "36.794122",
      lot: "128.907994",
      aslAltide: "870.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000084",
      frtrlNm: "추월산",
      mtnCd: "467101801",
      ctpvNm: "전라북도",
      addrNm: "전라남도 담양군 용면, 전라북도 순창군 복흥면",
      lat: "35.399939",
      lot: "126.976087",
      aslAltide: "731.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000085",
      frtrlNm: "축령산",
      mtnCd: "418203901",
      ctpvNm: "경기도",
      addrNm: "경기도 가평군 상면, 남양주시 수동면",
      lat: "37.752705",
      lot: "127.333923",
      aslAltide: "879.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000086",
      frtrlNm: "치악산",
      mtnCd: "421302401",
      ctpvNm: "강원특별자치도",
      addrNm: "강원도 원주시, 횡성군, 영월군",
      lat: "37.365077",
      lot: "128.055568",
      aslAltide: "1288.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000087",
      frtrlNm: "칠갑산",
      mtnCd: "447902001",
      ctpvNm: "충청남도",
      addrNm: "충청남도 청양군 대치면, 정산면, 장평면",
      lat: "36.413006",
      lot: "126.884905",
      aslAltide: "561.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000088",
      frtrlNm: "태백산",
      mtnCd: "421902201",
      ctpvNm: "강원특별자치도",
      addrNm: "강원도 태백시, 경상북도 봉화군 석포면",
      lat: "37.096337",
      lot: "128.916532",
      aslAltide: "1567.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000089",
      frtrlNm: "태화산",
      mtnCd: "427504901",
      ctpvNm: "강원특별자치도",
      addrNm: "강원도 영월군 영월읍, 충청북도 단양군 영춘면",
      lat: "37.117601",
      lot: "128.486345",
      aslAltide: "1027.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000090",
      frtrlNm: "팔공산",
      mtnCd: "271401201",
      ctpvNm: "경상북도",
      addrNm: "대구광역시 동구, 경상북도 군위군 부계면, 영천시 신녕면",
      lat: "36.016137",
      lot: "128.694901",
      aslAltide: "1193.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000091",
      frtrlNm: "팔봉산",
      mtnCd: "427206501",
      ctpvNm: "강원특별자치도",
      addrNm: "강원도 홍천군 서면",
      lat: "37.696514",
      lot: "127.695577",
      aslAltide: "302.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000092",
      frtrlNm: "팔영산",
      mtnCd: "467702901",
      ctpvNm: "전라남도",
      addrNm: "전라남도 고흥군 영남면, 점암면",
      lat: "34.624358",
      lot: "127.430924",
      aslAltide: "609.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000093",
      frtrlNm: "한라산",
      mtnCd: "491102401",
      ctpvNm: "제주특별자치도",
      addrNm: "제주특별자치도",
      lat: "33.361578",
      lot: "126.535756",
      aslAltide: "1950.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000094",
      frtrlNm: "화악산",
      mtnCd: "418204301",
      ctpvNm: "경기도",
      addrNm: "경기도 가평군 북면, 강원도 화천군 사내면",
      lat: "37.988856",
      lot: "127.497655",
      aslAltide: "1468.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000095",
      frtrlNm: "화왕산",
      mtnCd: "487403301",
      ctpvNm: "경상남도",
      addrNm: "경상남도 창녕군 고암면, 창녕읍",
      lat: "35.547141",
      lot: "128.531682",
      aslAltide: "757.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000096",
      frtrlNm: "황매산",
      mtnCd: "488906401",
      ctpvNm: "경상남도",
      addrNm: "경상남도 합천군 가회면ㆍ대병면, 산청군 차황면",
      lat: "35.495206",
      lot: "127.974455",
      aslAltide: "1108.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000097",
      frtrlNm: "황석산",
      mtnCd: "488703501",
      ctpvNm: "경상남도",
      addrNm: "경상남도 함양군 서하면, 안의면, 서상면",
      lat: "35.730696",
      lot: "127.761191",
      aslAltide: "1190.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000098",
      frtrlNm: "황악산",
      mtnCd: "471500901",
      ctpvNm: "경상북도",
      addrNm: "경상북도 김천시 대항면",
      lat: "36.117593",
      lot: "127.966881",
      aslAltide: "1111.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000099",
      frtrlNm: "황장산",
      mtnCd: "472801401",
      ctpvNm: "경상북도",
      addrNm: "경상북도 문경시 동로면",
      lat: "36.812895",
      lot: "128.278063",
      aslAltide: "1077.0",
      crtrDt: "2025-02-21 05:59:23",
    },
    {
      frtrlId: "0000000100",
      frtrlNm: "희양산",
      mtnCd: "437603201",
      ctpvNm: "경상북도",
      addrNm: "충청북도 괴산군 연풍면, 경상북도 문경시 가은읍",
      lat: "36.71469",
      lot: "128.00511",
      aslAltide: "999.0",
      crtrDt: "2025-02-21 05:59:23",
    },
  ],
  _p = () =>
    Ep.map((e) => {
      const t = Lp.find((n) => n.frtrlNm === e.name);
      return t ? { ...e, ...t } : null;
    }).filter((e) => e !== null);
function Pp(e) {
  return Array.from({ length: e }, (t, n) => n + 1);
}
function Ip() {
  const { mountainName: e } = G0(),
    t = Yo(),
    [n, r] = x.useState(""),
    l = x.useRef(null),
    i = x.useRef(null),
    o = x.useRef(null),
    a = x.useRef(null),
    [u, d] = x.useState(1),
    m = _p().find((g) => g.name === e),
    f = Pp(m == null ? void 0 : m.fileLength),
    h = (g) => {
      d(g);
    };
  return (
    x.useEffect(() => {
      if (!i.current || !m) return;
      const g = {
          center: new naver.maps.LatLng(m.lat, m.lot),
          zoom: 13,
          zoomControl: !0,
          mapTypeControl: !0,
        },
        v = new naver.maps.Map(i.current, g);
      return (
        (l.current = v),
        fetch(
          `/src/assets/bac_gpx/${m.name}/${m.name}_00000000${
            u < 10 && "0"
          }${u}.gpx`
        )
          .then((y) => y.blob())
          .then((y) => {
            const k = new File([y], "track.gpx");
            return Cp(k);
          })
          .then((y) => {
            if (y.length > 0) {
              const k = y.map(([s, p]) => new naver.maps.LatLng(s, p));
              o.current = new naver.maps.Polyline({
                path: k,
                strokeColor: "#5347AA",
                strokeWeight: 3,
                map: v,
              });
              const c = new naver.maps.LatLngBounds(
                k.reduce(
                  (s, p) => s.extend(p),
                  new naver.maps.LatLngBounds(k[0], k[0])
                )
              );
              v.fitBounds(c);
            }
          })
          .catch((y) => {
            r("GPX 파일을 불러오는데 실패했습니다"), console.error(y);
          }),
        () => {
          a.current && a.current.setMap(null),
            o.current && o.current.setMap(null);
        }
      );
    }, [m]),
    m
      ? I.jsx("div", {
          className: "min-h-screen bg-gray-100",
          children: I.jsx("div", {
            className: "container mx-auto p-4",
            children: I.jsxs("div", {
              className: "bg-white rounded-lg shadow-lg p-6",
              children: [
                I.jsxs("div", {
                  className: "flex items-center justify-between mb-6",
                  children: [
                    I.jsxs("button", {
                      onClick: () => t("/list"),
                      className:
                        "flex items-center text-gray-600 hover:text-gray-800",
                      children: [
                        I.jsx($d, { className: "w-5 h-5 mr-2" }),
                        "목록으로",
                      ],
                    }),
                    I.jsx("h1", {
                      className: "text-2xl font-bold",
                      children: m.name,
                    }),
                  ],
                }),
                n &&
                  I.jsx("p", { className: "mb-4 text-red-500", children: n }),
                I.jsx("div", {
                  ref: i,
                  className:
                    "w-full h-[600px] rounded-lg overflow-hidden shadow-inner",
                }),
                I.jsx("div", {
                  children: f.map((g, v) =>
                    I.jsxs(
                      "div",
                      {
                        onClick: () => {
                          h(g);
                        },
                        children: [g, " 코스"],
                      },
                      v
                    )
                  ),
                }),
              ],
            }),
          }),
        })
      : I.jsx("div", { children: "산을 찾을 수 없습니다." })
  );
}
function Dp() {
  return I.jsxs(cp, {
    children: [
      I.jsx(Or, { path: "/", element: I.jsx(hp, {}) }),
      I.jsx(Or, { path: "/list", element: I.jsx(Np, {}) }),
      I.jsx(Or, { path: "/map/:mountainName", element: I.jsx(Ip, {}) }),
    ],
  });
}
_d(document.getElementById("root")).render(
  I.jsx(x.StrictMode, { children: I.jsx(mp, { children: I.jsx(Dp, {}) }) })
);
