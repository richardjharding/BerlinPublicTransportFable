import _toConsumableArray from "babel-runtime/helpers/toConsumableArray";
import _classCallCheck from "babel-runtime/helpers/classCallCheck";
import _createClass from "babel-runtime/helpers/createClass";
import { setType } from "fable-core/Symbol";
import _Symbol from "fable-core/Symbol";
import { createObj, makeGeneric, Tuple, compareRecords, equalsRecords, compareUnions, equalsUnions } from "fable-core/Util";
import { map as map_1, ofArray } from "fable-core/List";
import List from "fable-core/List";
import { Marker as Marker_1, Map as _Map } from "google-maps-react";
import { fsFormat } from "fable-core/String";
import { fetch as _fetch } from "../node_modules/fable-powerpack/Fetch";
import { PromiseImpl } from "../node_modules/fable-powerpack/Promise";
import { createElement } from "react";
import { ProgramModule, CmdModule } from "../node_modules/fable-elmish/elmish";
import Timer from "fable-core/Timer";
import { subscribe } from "fable-core/Observable";
import { withReact } from "../node_modules/fable-elmish-react/react";
export var ZoomScale = function () {
  function ZoomScale(caseName, fields) {
    _classCallCheck(this, ZoomScale);

    this.Case = caseName;
    this.Fields = fields;
  }

  _createClass(ZoomScale, [{
    key: _Symbol.reflection,
    value: function () {
      return {
        type: "App.ZoomScale",
        interfaces: ["FSharpUnion", "System.IEquatable", "System.IComparable"],
        cases: {
          ZoomScale: ["number"]
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return equalsUnions(this, other);
    }
  }, {
    key: "CompareTo",
    value: function (other) {
      return compareUnions(this, other);
    }
  }]);

  return ZoomScale;
}();
setType("App.ZoomScale", ZoomScale);
export var vc = function () {
  function vc(b, f) {
    _classCallCheck(this, vc);

    this.b = b;
    this.f = f;
  }

  _createClass(vc, [{
    key: _Symbol.reflection,
    value: function () {
      return {
        type: "App.vc",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          b: "number",
          f: "number"
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return equalsRecords(this, other);
    }
  }, {
    key: "CompareTo",
    value: function (other) {
      return compareRecords(this, other);
    }
  }]);

  return vc;
}();
setType("App.vc", vc);
export var Ec = function () {
  function Ec(b, f) {
    _classCallCheck(this, Ec);

    this.b = b;
    this.f = f;
  }

  _createClass(Ec, [{
    key: _Symbol.reflection,
    value: function () {
      return {
        type: "App.Ec",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          b: "number",
          f: "number"
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return equalsRecords(this, other);
    }
  }, {
    key: "CompareTo",
    value: function (other) {
      return compareRecords(this, other);
    }
  }]);

  return Ec;
}();
setType("App.Ec", Ec);
export var BoundingRect = function () {
  function BoundingRect(f, b) {
    _classCallCheck(this, BoundingRect);

    this.f = f;
    this.b = b;
  }

  _createClass(BoundingRect, [{
    key: _Symbol.reflection,
    value: function () {
      return {
        type: "App.BoundingRect",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          f: Ec,
          b: vc
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return equalsRecords(this, other);
    }
  }, {
    key: "CompareTo",
    value: function (other) {
      return compareRecords(this, other);
    }
  }]);

  return BoundingRect;
}();
setType("App.BoundingRect", BoundingRect);
export var RadarItem = function () {
  function RadarItem(direction, latitude, longitude) {
    _classCallCheck(this, RadarItem);

    this.direction = direction;
    this.latitude = latitude;
    this.longitude = longitude;
  }

  _createClass(RadarItem, [{
    key: _Symbol.reflection,
    value: function () {
      return {
        type: "App.RadarItem",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          direction: "string",
          latitude: "number",
          longitude: "number"
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return equalsRecords(this, other);
    }
  }, {
    key: "CompareTo",
    value: function (other) {
      return compareRecords(this, other);
    }
  }]);

  return RadarItem;
}();
setType("App.RadarItem", RadarItem);
export var Model = function () {
  function Model(boundingRect, zoomScale, center, radar) {
    _classCallCheck(this, Model);

    this.boundingRect = boundingRect;
    this.zoomScale = zoomScale;
    this.center = center;
    this.Radar = radar;
  }

  _createClass(Model, [{
    key: _Symbol.reflection,
    value: function () {
      return {
        type: "App.Model",
        interfaces: ["FSharpRecord", "System.IEquatable", "System.IComparable"],
        properties: {
          boundingRect: BoundingRect,
          zoomScale: ZoomScale,
          center: Tuple(["number", "number"]),
          Radar: makeGeneric(List, {
            T: RadarItem
          })
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return equalsRecords(this, other);
    }
  }, {
    key: "CompareTo",
    value: function (other) {
      return compareRecords(this, other);
    }
  }]);

  return Model;
}();
setType("App.Model", Model);
export var Message = function () {
  function Message(caseName, fields) {
    _classCallCheck(this, Message);

    this.Case = caseName;
    this.Fields = fields;
  }

  _createClass(Message, [{
    key: _Symbol.reflection,
    value: function () {
      return {
        type: "App.Message",
        interfaces: ["FSharpUnion", "System.IEquatable"],
        cases: {
          GetRadar: [BoundingRect],
          GetRadarError: [Error],
          GetRadarReceived: [makeGeneric(List, {
            T: RadarItem
          })],
          RadarSelected: [],
          Refresh: [],
          ZoomChange: [ZoomScale, BoundingRect]
        }
      };
    }
  }, {
    key: "Equals",
    value: function (other) {
      return equalsUnions(this, other);
    }
  }]);

  return Message;
}();
setType("App.Message", Message);
export var MapComponent = _Map;
export var Marker = Marker_1;
export function text(content) {
  return content;
}
export var google = window["google"];
export var mapStyle = createObj(ofArray([["width", "100%"], ["height", "100%"], ["position", "relative"]]));
export var startPos = {
  lat: 52.531677,
  lng: 13.381777
};
export function boundsChange(map, dispatch) {
  console.log("bounds changed");
  var rect = map.getBounds();
  return dispatch(new Message("GetRadar", [rect]));
}
export function fetchRadar(rect) {
  var url = fsFormat("https://transport.rest/radar?north=%f&west=%f&south=%f&east=%f")(function (x) {
    return x;
  })(rect.f.b)(rect.b.b)(rect.f.f)(rect.b.f);
  return function (builder_) {
    return builder_.Delay(function () {
      return _fetch(url, {}).then(function (_arg1) {
        return _arg1.json();
      });
    });
  }(PromiseImpl.promise);
}
export function MapMarkers(radarItems) {
  return map_1(function (r) {
    var element = createElement(Marker_1, {
      name: r.direction,
      position: {
        lat: r.latitude,
        lng: r.longitude
      }
    });
    return element;
  }, radarItems);
}
export function mapProps(dispatch) {
  return {
    google: google,
    zoom: 14,
    center: startPos,
    initialCenter: startPos,
    style: mapStyle,
    onReady: function onReady(mapProps_1, map) {
      return map.addListener("bounds_changed", function () {
        return boundsChange(map, dispatch);
      });
    }
  };
}
export function view(model, dispatch) {
  return createElement("div", {}, createElement("h2", {}, text("This is a live view of the Berlin public transport system")), createElement.apply(undefined, [_Map, mapProps(dispatch)].concat(_toConsumableArray(MapMarkers(model.Radar)))));
}
export function update(msg, model) {
  if (msg.Case === "Refresh") {
    return [model, CmdModule.ofPromise(function (rect) {
      return fetchRadar(rect);
    }, model.boundingRect, function (arg0) {
      return new Message("GetRadarReceived", [arg0]);
    }, function (arg0_1) {
      return new Message("GetRadarError", [arg0_1]);
    })];
  } else if (msg.Case === "GetRadarError") {
    return [function () {
      var Radar = new List();
      return new Model(model.boundingRect, model.zoomScale, model.center, Radar);
    }(), new List()];
  } else if (msg.Case === "GetRadarReceived") {
    return [new Model(model.boundingRect, model.zoomScale, model.center, msg.Fields[0]), new List()];
  } else if (msg.Case === "RadarSelected") {
    return [model, new List()];
  } else if (msg.Case === "ZoomChange") {
    return [new Model(msg.Fields[1], model.zoomScale, model.center, model.Radar), CmdModule.ofPromise(function (rect_1) {
      return fetchRadar(rect_1);
    }, msg.Fields[1], function (arg0_2) {
      return new Message("GetRadarReceived", [arg0_2]);
    }, function (arg0_3) {
      return new Message("GetRadarError", [arg0_3]);
    })];
  } else {
    return [new Model(msg.Fields[0], model.zoomScale, model.center, model.Radar), CmdModule.ofPromise(function (rect_2) {
      return fetchRadar(rect_2);
    }, msg.Fields[0], function (arg0_4) {
      return new Message("GetRadarReceived", [arg0_4]);
    }, function (arg0_5) {
      return new Message("GetRadarError", [arg0_5]);
    })];
  }
}
export function init() {
  return [new Model(function () {
    var b = new vc(0, 0);
    return new BoundingRect(new Ec(0, 0), b);
  }(), new ZoomScale("ZoomScale", [14]), [52.531677, 13.381777], new List()), new List()];
}
export function timerTick(dispatch) {
  var t = new Timer(10000);
  subscribe(function (_arg1) {
    dispatch(new Message("Refresh", []));
  }, t.Elapsed);
  t.Enabled = true;
}
export function subscription(_arg1) {
  return CmdModule.ofSub(function (dispatch) {
    timerTick(dispatch);
  });
}
ProgramModule.run(withReact("app", ProgramModule.withSubscription(function (arg00_) {
  return subscription(arg00_);
}, ProgramModule.mkProgram(function () {
  return init();
}, function (msg) {
  return function (model) {
    return update(msg, model);
  };
}, function (model_1) {
  return function (dispatch) {
    return view(model_1, dispatch);
  };
}))));