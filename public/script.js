if (!Object["hasOwnProperty"]("values")) {
  Object["values"] = function (c) {
    return Object["keys"](c)["map"](function (d) {
      return c[d];
    });
  };
}
if (!String["prototype"]["startsWith"]) {
  String["prototype"]["startsWith"] = function (e, f) {
    f = f || 0x0;
    return this["indexOf"](e, f) === f;
  };
}
TDV["EventDispatcher"] = function () {
  this["_handlers"] = {};
};
TDV["EventDispatcher"]["prototype"]["bind"] = function (g, h) {
  if (!(g in this["_handlers"])) this["_handlers"][g] = [];
  this["_handlers"][g]["push"](h);
};
TDV["EventDispatcher"]["prototype"]["unbind"] = function (i, j) {
  if (i in this["_handlers"]) {
    var k = this["_handlers"][i]["indexOf"](j);
    if (k != -0x1) this["_handlers"][i]["splice"](k, 0x1);
  }
};
TDV["EventDispatcher"]["prototype"]["createNewEvent"] = function (l) {
  if (typeof Event === "function") return new Event(l);
  var m = document["createEvent"]("Event");
  m["initEvent"](l, !![], !![]);
  return m;
};
TDV["EventDispatcher"]["prototype"]["dispatchEvent"] = function (n) {
  if (n["type"] in this["_handlers"]) {
    var o = this["_handlers"][n["type"]];
    for (var p = 0x0; p < o["length"]; ++p) {
      o[p]["call"](window, n);
      if (n["defaultPrevented"]) break;
    }
  }
};
TDV["Tour"] = function (q, r) {
  TDV["EventDispatcher"]["call"](this);
  this["player"] = undefined;
  this["_settings"] = q;
  this["_devicesUrl"] = r;
  this["_playersPlayingTmp"] = [];
  this["_isInitialized"] = ![];
  this["_isPaused"] = ![];
  this["_isRemoteSession"] = ![];
  this["_orientation"] = undefined;
  this["_lockedOrientation"] = undefined;
  this["_device"] = undefined;
  Object["defineProperty"](this, "isInitialized", {
    get: function () {
      return this["_isInitialized"];
    },
  });
  Object["defineProperty"](this, "isPaused", {
    get: function () {
      return this["_isPaused"];
    },
  });
  this["_setupRemote"]();
};
TDV["Tour"]["DEVICE_GENERAL"] = "general";
TDV["Tour"]["DEVICE_MOBILE"] = "mobile";
TDV["Tour"]["DEVICE_IPAD"] = "ipad";
TDV["Tour"]["DEVICE_VR"] = "vr";
TDV["Tour"]["EVENT_TOUR_INITIALIZED"] = "tourInitialized";
TDV["Tour"]["EVENT_TOUR_LOADED"] = "tourLoaded";
TDV["Tour"]["EVENT_TOUR_ENDED"] = "tourEnded";
TDV["Tour"]["prototype"] = new TDV["EventDispatcher"]();
TDV["Tour"]["prototype"]["dispose"] = function () {
  if (!this["player"]) return;
  if (this["_onHashChange"]) {
    window["removeEventListener"]("hashchange", this["_onHashChange"]);
    this["_onHashChange"] = undefined;
  }
  if (this["_onKeyUp"]) {
    document["removeEventListener"]("keyup", this["_onKeyUp"]);
    this["_onKeyUp"] = undefined;
  }
  if (this["_onBeforeUnload"]) {
    window["removeEventListener"]("beforeunload", this["_onBeforeUnload"]);
    this["_onBeforeUnload"] = undefined;
  }
  var s = this["_getRootPlayer"]();
  if (s !== undefined) {
    s["stopTextToSpeech"]();
    s["stopGlobalAudios"]();
  }
  this["player"]["delete"]();
  this["player"] = undefined;
  this["_isInitialized"] = ![];
  window["currentGlobalAudios"] = undefined;
  window["pauseGlobalAudiosState"] = undefined;
  window["currentPanoramasWithCameraChanged"] = undefined;
  window["overlaysDispatched"] = undefined;
};
TDV["Tour"]["prototype"]["load"] = function () {
  if (this["player"]) return;
  var t = function (w) {
    if (w["name"] == "begin") {
      var A = w["data"]["source"]["get"]("camera");
      if (
        A &&
        A["get"]("initialSequence") &&
        A["get"]("initialSequence")["get"]("movements")["length"] > 0x0
      )
        return;
    }
    if (
      w["sourceClassName"] == "MediaAudio" ||
      w["sourceClassName"] == "Model3DCameraSequence" ||
      this["_isInitialized"]
    )
      return;
    this["_isInitialized"] = !![];
    u["unbind"]("preloadMediaShow", t, this, !![]);
    u["unbindOnObjectsOf"]("PlayListItem", "begin", t, this, !![]);
    u["unbind"]("stateChange", t, this, !![]);
    if (this["_isPaused"]) this["pause"]();
    window["parent"]["postMessage"](TDV["Tour"]["EVENT_TOUR_LOADED"], "*");
    this["dispatchEvent"](
      this["createNewEvent"](TDV["Tour"]["EVENT_TOUR_LOADED"])
    );
  };
  this["_setup"]();
  this["_settings"]["set"](
    TDV["PlayerSettings"]["SCRIPT_URL"],
    this["_currentScriptUrl"]
  );
  var u = (this["player"] = TDV["PlayerAPI"]["create"](this["_settings"]));
  u["bindOnObject"]("rootPlayer", "start", v, this, !![]);
  window["addEventListener"](
    "message",
    function (B) {
      var C = B["data"];
      if (C == "pauseTour") C = "pause";
      else if (C == "resumeTour") C = "resume";
      else return;
      this[C]["apply"](this);
    }["bind"](this)
  );
  function v(D) {
    u["unbindOnObject"]("rootPlayer", "start", v, this, !![]);
    var E = D["data"]["source"];
    E["get"]("data")["tour"] = this;
    var F =
      window["navigator"]["language"] ||
      window["navigator"]["userLanguage"] ||
      "en";
    var G = E["get"]("data")["locales"] || {};
    var H = E["get"]("data")["defaultLocale"] || F;
    var I = (this["locManager"] = new TDV["Tour"]["LocaleManager"](
      E,
      G,
      H,
      this["_settings"]["get"](TDV["PlayerSettings"]["QUERY_STRING_PARAMETERS"])
    ));
    E["get"]("data")["localeManager"] = I;
    var J = function () {
      var U = E["get"]("data");
      if (!("updateText" in U)) {
        U["updateText"] = function (Y) {
          var Z = Y[0x0]["split"](".");
          if (Z["length"] == 0x2) {
            var a0 = I["trans"]["apply"](I, Y);
            var a1 = Y[0x1] || E;
            if (typeof a1 == "string") {
              var a2 = a1["split"](".");
              a1 = E[a2["shift"]()];
              for (var a3 = 0x0; a3 < a2["length"] - 0x1; ++a3) {
                if (a1 != undefined)
                  a1 = "get" in a1 ? a1["get"](a2[a3]) : a1[a2[a3]];
              }
              if (a1 != undefined) {
                var a4 = a2[a2["length"] - 0x1];
                if (Array["isArray"](a1)) {
                  for (var a5 = 0x0; a5 < a1["length"]; ++a5) {
                    this["setValue"](a1[a5], a4, a0);
                  }
                } else this["setValue"](a1, a4, a0);
              }
            } else {
              a1 = a1[Z[0x0]];
              this["setValue"](a1, Z[0x1], a0);
            }
          }
        }["bind"](E);
      }
      var V = U["translateObjs"];
      var W = U["updateText"];
      var X = function () {
        for (var a6 in V) {
          W(V[a6]);
        }
      };
      X();
      X();
    };
    this["locManager"]["bind"](
      TDV["Tour"]["LocaleManager"]["EVENT_LOCALE_CHANGED"],
      J["bind"](this)
    );
    var K = this["_getParams"](location["search"]["substr"](0x1));
    K = E["mixObject"](K, this["_getParams"](location["hash"]["substr"](0x1)));
    var L = K["language"];
    if (!L || !this["locManager"]["hasLocale"](K["language"])) {
      if (E["get"]("data")["forceDefaultLocale"]) L = H;
      else L = F;
    }
    this["setLocale"](L);
    var M = E["getByClassName"]("HotspotPanoramaOverlay");
    for (var O = 0x0, P = M["length"]; O < P; ++O) {
      var Q = M[O];
      var R = Q["get"]("data");
      if (!R) Q["set"]("data", (R = {}));
      R["defaultEnabledValue"] = Q["get"]("enabled");
    }
    this["_setMediaFromURL"](K, 0x0);
    this["_updateParams"](K, ![]);
    if (
      this["isMobile"]() &&
      typeof this["_devicesUrl"][this["_device"]] == "object"
    ) {
      var S = function () {
        if (
          !E["isCardboardViewMode"]() &&
          this["_getOrientation"]() != this["_orientation"]
        ) {
          this["reload"](!![]);
          return !![];
        }
        return ![];
      };
      if (S["call"](this)) return;
      var T = E["getByClassName"]("PanoramaPlayer");
      for (var O = 0x0; O < T["length"]; ++O) {
        T[O]["bind"]("viewModeChange", S, this);
      }
      E["bind"]("orientationChange", S, this);
    }
    this["_onHashChange"] = function () {
      var a7 = this["_getParams"](location["hash"]["substr"](0x1));
      this["_setMediaFromURL"](a7);
      this["_updateParams"](a7, !![]);
    }["bind"](this);
    this["_onKeyUp"] = function (a8) {
      switch (a8["key"]["toLowerCase"]()) {
        case "u":
          this["updateDeepLink"]();
          E["copyToClipboard"](location["href"]);
          break;
        case "m":
          var a9 = E["getByClassName"]("MeasureModel3DObject");
          var aa = E["getActiveMediaWithViewer"](E["getMainViewer"]());
          if (a9["length"] > 0x0 && aa["get"]("class") == "Model3D") {
            E["startMeasurement"](null, a9[0x0]);
          }
          break;
      }
    }["bind"](this);
    this["_onBeforeUnload"] = function (ab) {
      E["stopTextToSpeech"]();
    };
    window["addEventListener"]("hashchange", this["_onHashChange"]);
    window["addEventListener"]("beforeunload", this["_onBeforeUnload"]);
    document["addEventListener"]("keyup", this["_onKeyUp"]);
    E["bind"](
      "tourEnded",
      function () {
        this["dispatchEvent"](
          this["createNewEvent"](TDV["Tour"]["EVENT_TOUR_ENDED"])
        );
      },
      this,
      !![]
    );
    E["bind"](
      "mute_changed",
      function () {
        if (this["get"]("mute")) this["stopTextToSpeech"]();
      },
      E,
      !![]
    );
    u["bind"]("preloadMediaShow", t, this, !![]);
    u["bind"]("stateChange", t, this, !![]);
    u["bindOnObjectsOf"]("PlayListItem", "begin", t, this, !![]);
    this["dispatchEvent"](
      this["createNewEvent"](TDV["Tour"]["EVENT_TOUR_INITIALIZED"])
    );
  }
};
TDV["Tour"]["prototype"]["pause"] = function () {
  this["_isPaused"] = !![];
  if (!this["_isInitialized"]) return;
  var ac = function (al) {
    var am = al["source"];
    if (!this["_isPaused"]) am["unbind"]("stateChange", ac, this);
    else if (am["get"]("state") == "playing") {
      am["pause"]();
    }
  };
  var ad = this["player"]["getByClassName"]("PlayList");
  for (var ae = 0x0, af = ad["length"]; ae < af; ae++) {
    var ag = ad[ae];
    var ah = ag["get"]("selectedIndex");
    if (ah != -0x1) {
      var ai = ag["get"]("items")[ah];
      var aj = ai["get"]("player");
      if (aj && aj["pause"]) {
        if (aj["get"]("state") != "playing")
          aj["bind"]("stateChange", ac, this);
        else aj["pause"]();
        this["_playersPlayingTmp"]["push"](aj);
      }
    }
  }
  var ak = this["_getRootPlayer"]();
  ak["pauseGlobalAudios"]();
  ak["quizPauseTimer"]();
};
TDV["Tour"]["prototype"]["resume"] = function () {
  this["_isPaused"] = ![];
  if (!this["_isInitialized"]) return;
  while (this["_playersPlayingTmp"]["length"]) {
    var an = this["_playersPlayingTmp"]["pop"]();
    an["play"]();
  }
  var ao = this["_getRootPlayer"]();
  ao["resumeGlobalAudios"]();
  ao["quizResumeTimer"]();
};
TDV["Tour"]["prototype"]["reload"] = function (ap) {
  this["_orientation"] = this["_getOrientation"]();
  if (ap) this["updateDeepLink"]();
  this["dispose"]();
  this["load"]();
};
TDV["Tour"]["prototype"]["setMediaByIndex"] = function (aq) {
  var ar = this["_getRootPlayer"]();
  if (ar !== undefined) {
    return ar["setMainMediaByIndex"](aq);
  }
};
TDV["Tour"]["prototype"]["setMediaByName"] = function (as) {
  var at = this["_getRootPlayer"]();
  if (at !== undefined) {
    return at["setMainMediaByName"](as);
  }
};
TDV["Tour"]["prototype"]["triggerOverlayByName"] = function (au, av, aw) {
  var ax = this["_getRootPlayer"]();
  if (!aw) aw = "click";
  if (ax !== undefined && aw) {
    var ay = ax["getPanoramaOverlayByName"](au, av);
    if (ay) {
      ax["triggerOverlay"](ay, aw);
    }
  }
};
TDV["Tour"]["prototype"]["focusOverlayByName"] = function (az, aA) {
  var aB = this["_getRootPlayer"]();
  if (aB !== undefined) {
    var aC = aB["getPanoramaOverlayByName"](az["get"]("media"), aA);
    if (aC) {
      var aD = aC["get"]("class");
      var aE =
        aD == "VideoPanoramaOverlay" || aD == "QuadVideoPanoramaOverlay"
          ? aC
          : aC["get"]("items")[0x0];
      var aF, aG;
      aD = aE["get"]("class");
      if (
        aD == "QuadVideoPanoramaOverlay" ||
        aD == "QuadHotspotPanoramaOverlayImage"
      ) {
        var aH = aE["get"]("vertices");
        var aI = 0x0,
          aJ = aH["length"];
        aF = 0x0;
        aG = 0x0;
        while (aI < aJ) {
          var aK = aH[aI++];
          var aL = aK["get"]("yaw");
          if (aL < 0x0) aL += 0x168;
          aF += aL;
          aG += aK["get"]("pitch");
        }
        aF /= 0x4;
        aG /= 0x4;
        if (aF > 0xb4) aF -= 0x168;
      } else {
        aF = aE["get"]("yaw");
        aG = aE["get"]("pitch");
      }
      var aM = aB["getPlayListWithItem"](az);
      if (aM) {
        var aN = function () {
          aB["setPanoramaCameraWithSpot"](aM, az, aF, aG);
        };
        if (!this["_isInitialized"]) {
          var aO = function () {
            az["unbind"]("begin", aO, this);
            aN();
          };
          az["bind"]("begin", aO, this);
        } else {
          aN();
        }
      }
    }
  }
};
TDV["Tour"]["prototype"]["setComponentsVisibilityByTags"] = function (
  aP,
  aQ,
  aR
) {
  var aS = this["_getRootPlayer"]();
  if (aS !== undefined) {
    var aT = aS["getComponentsByTags"](aP, aR);
    for (var aU = 0x0, aV = aT["length"]; aU < aV; ++aU) {
      aT[aU]["set"]("visible", aQ);
    }
  }
};
TDV["Tour"]["prototype"]["setOverlaysVisibilityByTags"] = function (
  aW,
  aX,
  aY
) {
  var aZ = this["_getRootPlayer"]();
  if (aZ !== undefined) {
    var b0 = aZ["getOverlaysByTags"](aW, aY);
    aZ["setOverlaysVisibility"](b0, aX);
  }
};
TDV["Tour"]["prototype"]["setOverlaysVisibilityByName"] = function (b1, b2) {
  var b3 = this["_getRootPlayer"]();
  if (b3 !== undefined) {
    var b4 = b3["getActiveMediaWithViewer"](b3["getMainViewer"]());
    var b5 = [];
    for (var b6 = 0x0, b7 = b1["length"]; b6 < b7; ++b6) {
      var b8 = b3["getPanoramaOverlayByName"](b4, b1[b6]);
      if (b8) b5["push"](b8);
    }
    b3["setOverlaysVisibility"](b5, b2);
  }
};
TDV["Tour"]["prototype"]["setObjectsVisibilityByID"] = function (b9, ba) {
  var bb = this["_getRootPlayer"]();
  if (bb !== undefined) {
    var bc = bb["getActiveMediaWithViewer"](bb["getMainViewer"]());
    if (bc["get"]("class") == "Model3D") {
      bb["setObjectsVisibilityByID"](bc, b9, ba);
    }
  }
};
TDV["Tour"]["prototype"]["setModel3DVariant"] = function (bd) {
  var be = this["_getRootPlayer"]();
  if (be !== undefined) {
    var bf = be["getActiveMediaWithViewer"](be["getMainViewer"]());
    if (bf["get"]("class") == "Model3D") {
      bf["set"]("variant", bd);
    }
  }
};
TDV["Tour"]["prototype"]["updateDeepLink"] = function () {
  var bg = this["_getRootPlayer"]();
  if (bg !== undefined) {
    bg["updateDeepLink"]({
      includeCurrentView: !![],
      includeCurrentVisibleHotspots: !![],
      includeCurrentMeasureModel3DObjects: !![],
      setHash: !![],
    });
  }
};
TDV["Tour"]["prototype"]["setLocale"] = function (bh) {
  var bi = this["_getRootPlayer"]();
  if (bi !== undefined && this["locManager"] !== undefined) {
    this["locManager"]["setLocale"](bh);
  }
};
TDV["Tour"]["prototype"]["getLocale"] = function () {
  var bj = this["_getRootPlayer"]();
  return bj !== undefined && this["locManager"] !== undefined
    ? this["locManager"]["currentLocaleID"]
    : undefined;
};
TDV["Tour"]["prototype"]["isMobile"] = function () {
  return TDV["PlayerAPI"]["mobile"];
};
TDV["Tour"]["prototype"]["isIPhone"] = function () {
  return TDV["PlayerAPI"]["device"] == TDV["PlayerAPI"]["DEVICE_IPHONE"];
};
TDV["Tour"]["prototype"]["isIPad"] = function () {
  return TDV["PlayerAPI"]["device"] == TDV["PlayerAPI"]["DEVICE_IPAD"];
};
TDV["Tour"]["prototype"]["isIOS"] = function () {
  return this["isIPad"]() || this["isIPhone"]();
};
TDV["Tour"]["prototype"]["isMobileApp"] = function () {
  return navigator["userAgent"]["indexOf"]("App/TDV") != -0x1;
};
TDV["Tour"]["prototype"]["getNotchValue"] = function () {
  var bk = document["documentElement"];
  bk["style"]["setProperty"]("--notch-top", "env(safe-area-inset-top)");
  bk["style"]["setProperty"]("--notch-right", "env(safe-area-inset-right)");
  bk["style"]["setProperty"]("--notch-bottom", "env(safe-area-inset-bottom)");
  bk["style"]["setProperty"]("--notch-left", "env(safe-area-inset-left)");
  var bl = window["getComputedStyle"](bk);
  return (
    parseInt(bl["getPropertyValue"]("--notch-top") || "0", 0xa) ||
    parseInt(bl["getPropertyValue"]("--notch-right") || "0", 0xa) ||
    parseInt(bl["getPropertyValue"]("--notch-bottom") || "0", 0xa) ||
    parseInt(bl["getPropertyValue"]("--notch-left") || "0", 0xa)
  );
};
TDV["Tour"]["prototype"]["hasNotch"] = function () {
  return this["getNotchValue"]() > 0x0;
};
TDV["Tour"]["prototype"]["_getOrientation"] = function () {
  var bm = this["_getRootPlayer"]();
  if (bm) {
    return bm["get"]("orientation");
  } else if (this["_lockedOrientation"]) {
    return this["_lockedOrientation"];
  } else {
    return TDV["PlayerAPI"]["getOrientation"]();
  }
};
TDV["Tour"]["prototype"]["_getParams"] = function (bn) {
  var bo = {};
  bn["split"]("&")["forEach"](function (bp) {
    var bq = bp["split"]("=")[0x0],
      br = decodeURIComponent(bp["split"]("=")[0x1]);
    bo[bq["toLowerCase"]()] = br;
  });
  return bo;
};
TDV["Tour"]["prototype"]["_getRootPlayer"] = function () {
  return this["player"] !== undefined
    ? this["player"]["getById"]("rootPlayer")
    : undefined;
};
TDV["Tour"]["prototype"]["_setup"] = function () {
  if (!this["_orientation"]) this["_orientation"] = this["_getOrientation"]();
  this["_device"] = this["_getDevice"]();
  this["_currentScriptUrl"] = this["_getScriptUrl"]();
  if (this["isMobile"]()) {
    var bs = document["getElementById"]("metaViewport");
    if (bs) {
      var bt = this["_devicesUrl"][this["_device"]];
      var bu = 0x1;
      if (
        (typeof bt == "object" &&
          this["_orientation"] in bt &&
          this["_orientation"] == TDV["PlayerAPI"]["ORIENTATION_LANDSCAPE"]) ||
        this["_device"] == TDV["Tour"]["DEVICE_GENERAL"]
      ) {
        bu = bs["getAttribute"]("data-tdv-general-scale") || 0.5;
      }
      var bv = bs["getAttribute"]("content");
      bv = bv["replace"](/initial-scale=(\d+(\.\d+)?)/, function (bw, bx) {
        return "initial-scale=" + bu;
      });
      bs["setAttribute"]("content", bv);
    }
  }
};
TDV["Tour"]["prototype"]["_getScriptUrl"] = function () {
  var by = this["_devicesUrl"][this["_device"]];
  if (typeof by == "object") {
    if (this["_orientation"] in by) {
      by = by[this["_orientation"]];
    }
  }
  return by;
};
TDV["Tour"]["prototype"]["_getDevice"] = function () {
  var bz = TDV["Tour"]["DEVICE_GENERAL"];
  if (!this["_isRemoteSession"] && this["isMobile"]()) {
    if (this["isIPad"]() && TDV["Tour"]["DEVICE_IPAD"] in this["_devicesUrl"])
      bz = TDV["Tour"]["DEVICE_IPAD"];
    else if (TDV["Tour"]["DEVICE_MOBILE"] in this["_devicesUrl"])
      bz = TDV["Tour"]["DEVICE_MOBILE"];
  }
  return bz;
};
TDV["Tour"]["prototype"]["_setMediaFromURL"] = function (bA, bB) {
  var bC = this["_getRootPlayer"]();
  var bD = bC["getActivePlayerWithViewer"](bC["getMainViewer"]());
  var bE = bD ? bC["getMediaFromPlayer"](bD) : undefined;
  var bF;
  if ("media" in bA) {
    var bG = bA["media"];
    var bH = Number(bG);
    bF = isNaN(bH)
      ? this["setMediaByName"](bG)
      : this["setMediaByIndex"](bH - 0x1);
  } else if ("media-index" in bA) {
    bF = this["setMediaByIndex"](parseInt(bA["media-index"]) - 0x1);
  } else if ("media-name" in bA) {
    bF = this["setMediaByName"](decodeURIComponent(bA["media-name"]));
  }
  if (bF == undefined && bB !== undefined) {
    bF = this["setMediaByIndex"](0x0);
  }
  if (bF != undefined) {
    var bI = bF["get"]("player");
    var bJ = function () {
      if ("trigger-overlay-name" in bA) {
        this["triggerOverlayByName"](
          bF["get"]("media"),
          bA["trigger-overlay-name"],
          bA["trigger-overlay-event"]
        );
      }
      if ("focus-overlay-name" in bA) {
        this["focusOverlayByName"](bF, bA["focus-overlay-name"]);
      } else if ("yaw" in bA || "pitch" in bA) {
        var bN = bC["getPlayListWithItem"](bF);
        if (bN) {
          switch (bF["get"]("class")) {
            case "PanoramaPlayListItem":
              var bO = parseFloat(bA["yaw"]) || undefined;
              var bP = parseFloat(bA["pitch"]) || undefined;
              var bQ = parseFloat(bA["fov"]) || undefined;
              bC["setPanoramaCameraWithSpot"](bN, bF, bO, bP, bQ);
              break;
            case "Model3DPlayListItem":
              var bR = ["yaw", "pitch", "x", "y", "z", "distance"];
              var bS = {};
              for (var bT = 0x0; bT < bR["length"]; ++bT) {
                var bU = bR[bT];
                var bV = parseFloat(bA[bU]);
                if (!isNaN(bV)) bS[bU] = bV;
              }
              bC["setModel3DCameraSpot"](bN, bF, bS);
              break;
          }
        }
      }
    }["bind"](this);
    if (bI) {
      var bK = bI["get"]("viewerArea") == bC["getMainViewer"]();
      var bL = bC["getMediaFromPlayer"](bI);
      if (
        (bK && bE == bF["get"]("media")) ||
        (!bK && bL == bF["get"]("media"))
      ) {
        bJ();
        return bF != undefined;
      }
    }
    var bM = function () {
      bF["unbind"]("begin", bM, this);
      bJ();
    };
    bF["bind"]("begin", bM, bC);
  }
  return bF != undefined;
};
TDV["Tour"]["prototype"]["_setupRemote"] = function () {
  if (this["isMobile"]() && TDV["Remote"] != undefined) {
    var bW = function () {
      var bX;
      var bY = function () {
        var c1 = this["_getRootPlayer"]();
        bX = c1["get"]("lockedOrientation");
        c1["set"]("lockedOrientation", this["_lockedOrientation"]);
      }["bind"](this);
      this["_isRemoteSession"] = !![];
      this["_lockedOrientation"] = TDV["PlayerAPI"]["ORIENTATION_LANDSCAPE"];
      if (this["_device"] != TDV["Tour"]["DEVICE_GENERAL"]) {
        var bZ = function () {
          bY();
          this["unbind"](TDV["Tour"]["EVENT_TOUR_INITIALIZED"], bZ);
        }["bind"](this);
        this["bind"](TDV["Tour"]["EVENT_TOUR_INITIALIZED"], bZ);
        this["reload"](!![]);
      } else {
        bY();
      }
      var c0 = function () {
        this["_isRemoteSession"] = ![];
        this["_getRootPlayer"]()["set"]("lockedOrientation", bX);
        TDV["Remote"]["unbind"](TDV["Remote"]["EVENT_CALL_END"], c0);
        var c2 = this["_getScriptUrl"]();
        if (this["_currentScriptUrl"] != c2) this["reload"](!![]);
      }["bind"](this);
      TDV["Remote"]["bind"](TDV["Remote"]["EVENT_CALL_END"], c0);
    }["bind"](this);
    TDV["Remote"]["bind"](TDV["Remote"]["EVENT_CALL_BEGIN"], bW);
  }
};
TDV["Tour"]["prototype"]["_updateParams"] = function (c3, c4) {
  if (c4 && "language" in c3) {
    var c5 = c3["language"];
    if (this["locManager"]["hasLocale"](c5)) {
      this["setLocale"](c5);
    }
  }
  var c6 = function (c8, c9, ca) {
    var cb = c9["split"](",");
    for (var cc = 0x0, cd = cb["length"]; cc < cd; ++cc) {
      c8["call"](this, cb[cc]["split"]("+"), ca, "and");
    }
  };
  var c7 = function (ce) {
    var cf = this["_getRootPlayer"]();
    var cg = cf["getActiveMediaWithViewer"](cf["getMainViewer"]());
    if (cg["get"]("class") != "Model3D") return;
    var ch = cg["get"]("objects");
    var ci = [];
    ce["split"]("+")["forEach"](
      function (cj) {
        var ck = cj["split"](",");
        var cl = ck["shift"]();
        if (cl in cf && ck["length"] % 0x3 == 0x0) {
          var cm = ck[0x0],
            cn = ck[0x1],
            co = ck[0x2];
          var cp = ch["some"](function (cu) {
            return (
              cu["get"]("class") == "MeasureModel3DObject" &&
              cm == cu["get"]("x") &&
              cn == cu["get"]("y") &&
              co == cu["get"]("z")
            );
          });
          if (cp) return;
          var cq = [];
          var cr = _cloneMeasureModel3DObject["call"](this, this[cl]);
          cr["set"]("mode", "view");
          cr["set"]("x", cm);
          cr["set"]("y", cn);
          cr["set"]("z", co);
          for (var cs = 0x3; cs < ck["length"]; cs += 0x3) {
            var ct = this["createInstance"]("MeasureModel3DObjectPoint");
            ct["set"]("x", ck[cs]);
            ct["set"]("y", ck[cs + 0x1]);
            ct["set"]("z", ck[cs + 0x2]);
            cq["push"](ct);
          }
          cr["set"]("points", cq);
          ci["push"](cr);
        }
      }["bind"](cf)
    );
    if (ci["length"] > 0x0) {
      cg["set"]("objects", ch["concat"](ci));
    }
  };
  if ("hide-components-tags" in c3 || "hct" in c3)
    c6["call"](
      this,
      this["setComponentsVisibilityByTags"],
      c3["hide-components-tags"] || c3["hct"],
      ![]
    );
  if ("show-components-tags" in c3 || "sct" in c3)
    c6["call"](
      this,
      this["setComponentsVisibilityByTags"],
      c3["show-components-tags"] || c3["sct"],
      !![]
    );
  if ("hide-overlays-tags" in c3 || "hot" in c3)
    c6["call"](
      this,
      this["setOverlaysVisibilityByTags"],
      c3["hide-overlays-tags"] || c3["hot"],
      ![]
    );
  if ("show-overlays-tags" in c3 || "sot" in c3)
    c6["call"](
      this,
      this["setOverlaysVisibilityByTags"],
      c3["show-overlays-tags"] || c3["sot"],
      !![]
    );
  if ("hide-overlays-names" in c3 || "hon" in c3)
    this["setOverlaysVisibilityByName"](
      decodeURIComponent(c3["hide-overlays-names"] || c3["hon"])["split"](","),
      ![]
    );
  if ("show-overlays-names" in c3 || "son" in c3)
    this["setOverlaysVisibilityByName"](
      decodeURIComponent(c3["show-overlays-names"] || c3["son"])["split"](","),
      !![]
    );
  if ("show-object-ids" in c3 || "sobjids" in c3)
    this["setObjectsVisibilityByID"](
      decodeURIComponent(c3["show-object-ids"] || c3["sobjids"])["split"](","),
      !![]
    );
  if ("hide-object-ids" in c3 || "hobjids" in c3)
    this["setObjectsVisibilityByID"](
      decodeURIComponent(c3["hide-object-ids"] || c3["hobjids"])["split"](","),
      ![]
    );
  if ("variant" in c3)
    this["setModel3DVariant"](decodeURIComponent(c3["variant"]));
  if ("measures" in c3)
    c7["call"](this, decodeURIComponent(c3["measures"]["split"](";")));
};
TDV["Tour"]["LocaleManager"] = function (cv, cw, cx, cy) {
  TDV["EventDispatcher"]["call"](this);
  this["rootPlayer"] = cv;
  this["locales"] = {};
  this["defaultLocale"] = cx;
  this["queryParam"] = cy;
  this["currentLocaleMap"] = {};
  this["currentLocaleID"] = undefined;
  for (var cz in cw) {
    this["registerLocale"](cz, cw[cz]);
  }
};
TDV["Tour"]["LocaleManager"]["EVENT_LOCALE_CHANGED"] = "localeChanged";
TDV["Tour"]["LocaleManager"]["prototype"] = new TDV["EventDispatcher"]();
TDV["Tour"]["LocaleManager"]["prototype"]["registerLocale"] = function (
  cA,
  cB
) {
  var cC = [cA, cA["split"]("-")[0x0]];
  for (var cD = 0x0; cD < cC["length"]; ++cD) {
    cA = cC[cD];
    if (!(cA in this["locales"])) {
      this["locales"][cA] = cB;
    }
  }
};
TDV["Tour"]["LocaleManager"]["prototype"]["unregisterLocale"] = function (cE) {
  delete this["locales"][cE];
  if (cE == this["currentLocaleID"]) {
    this["setLocale"](this["defaultLocale"]);
  }
};
TDV["Tour"]["LocaleManager"]["prototype"]["hasLocale"] = function (cF) {
  return cF in this["locales"];
};
TDV["Tour"]["LocaleManager"]["prototype"]["setLocale"] = function (cG) {
  var cH;
  var cI = cG["split"]("-")[0x0];
  var cJ = [cG, cI];
  for (var cK = 0x0; cK < cJ["length"]; ++cK) {
    var cM = cJ[cK];
    if (cM in this["locales"]) {
      cH = cM;
      break;
    }
  }
  if (cH === undefined) {
    for (var cM in this["locales"]) {
      if (cM["indexOf"](cI) == 0x0) {
        cH = cM;
        break;
      }
    }
  }
  if (cH === undefined) {
    cH = this["defaultLocale"];
  }
  var cN = this["locales"][cH];
  if (cN !== undefined && this["currentLocaleID"] != cH) {
    this["currentLocaleID"] = cH;
    var cO = this;
    if (typeof cN == "string") {
      var cP = new XMLHttpRequest();
      cP["onreadystatechange"] = function () {
        if (cP["readyState"] == 0x4) {
          if (cP["status"] == 0xc8) {
            cO["locales"][cH] = cO["currentLocaleMap"] = cO[
              "_parsePropertiesContent"
            ](cP["responseText"]);
            cO["dispatchEvent"](
              cO["createNewEvent"](
                TDV["Tour"]["LocaleManager"]["EVENT_LOCALE_CHANGED"]
              )
            );
          } else {
            throw cN + "\x20can\x27t\x20be\x20loaded";
          }
        }
      };
      var cQ = cN;
      if (this["queryParam"])
        cQ += (cQ["indexOf"]("?") == -0x1 ? "?" : "&") + this["queryParam"];
      cP["open"]("GET", cQ);
      cP["send"]();
    } else {
      this["currentLocaleMap"] = cN;
      this["dispatchEvent"](
        this["createNewEvent"](
          TDV["Tour"]["LocaleManager"]["EVENT_LOCALE_CHANGED"]
        )
      );
    }
  }
};
TDV["Tour"]["LocaleManager"]["prototype"]["trans"] = function (cR) {
  function cS(cW) {
    return /^\d+$/["test"](cW);
  }
  var cT = this["currentLocaleMap"][cR];
  if (cT && arguments["length"] > 0x2) {
    var cU = typeof arguments[0x2] == "object" ? arguments[0x2] : undefined;
    var cV = arguments;
    cT = cT["replace"](
      /\{\{([\w _\-\.]+)\}\}/g,
      function (cX, cY) {
        if (cS(cY)) cY = cV[parseInt(cY) + 0x1];
        else if (cU !== undefined) cY = cU[cY];
        if (typeof cY == "string") cY = this["currentLocaleMap"][cY] || cY;
        else if (typeof cY == "function") cY = cY["call"](this["rootPlayer"]);
        return cY !== undefined ? cY : "";
      }["bind"](this)
    );
  }
  return cT;
};
TDV["Tour"]["LocaleManager"]["prototype"]["_parsePropertiesContent"] =
  function (cZ) {
    cZ = cZ["replace"](/(^|\n)#[^\n]*/g, "");
    var d0 = {};
    var d1 = cZ["split"]("\x0a");
    for (var d2 = 0x0, d3 = d1["length"]; d2 < d3; ++d2) {
      var d4 = d1[d2]["trim"]();
      if (d4["length"] == 0x0) {
        continue;
      }
      var d5 = d4["indexOf"]("=");
      if (d5 == -0x1) {
        console["error"]("Locale\x20parser:\x20Invalid\x20line\x20" + d2);
        continue;
      }
      var d6 = d4["substr"](0x0, d5)["trim"]();
      var d7 = d4["substr"](d5 + 0x1)["trim"]();
      var d8;
      while (
        (d8 = d7["lastIndexOf"]("\x5c")) != -0x1 &&
        d8 == d7["length"] - 0x1 &&
        ++d2 < d3
      ) {
        d7 = d7["substr"](0x0, d7["length"] - 0x2);
        d4 = d1[d2];
        if (d4["length"] == 0x0) break;
        d7 += "\x0a" + d4;
        d7 = d7["trim"]();
      }
      d0[d6] = d7;
    }
    return d0;
  };
TDV["Tour"]["HistoryData"] = function (d9) {
  this["playList"] = d9;
  this["list"] = [];
  this["pointer"] = -0x1;
};
TDV["Tour"]["HistoryData"]["prototype"]["add"] = function (da) {
  if (
    this["pointer"] < this["list"]["length"] &&
    this["list"][this["pointer"]] == da
  ) {
    return;
  }
  ++this["pointer"];
  this["list"]["splice"](
    this["pointer"],
    this["list"]["length"] - this["pointer"],
    da
  );
};
TDV["Tour"]["HistoryData"]["prototype"]["back"] = function () {
  if (!this["canBack"]()) return;
  this["playList"]["set"]("selectedIndex", this["list"][--this["pointer"]]);
};
TDV["Tour"]["HistoryData"]["prototype"]["forward"] = function () {
  if (!this["canForward"]()) return;
  this["playList"]["set"]("selectedIndex", this["list"][++this["pointer"]]);
};
TDV["Tour"]["HistoryData"]["prototype"]["canBack"] = function () {
  return this["pointer"] > 0x0;
};
TDV["Tour"]["HistoryData"]["prototype"]["canForward"] = function () {
  return (
    this["pointer"] >= 0x0 && this["pointer"] < this["list"]["length"] - 0x1
  );
};
function _getObject(db, dc) {
  return typeof dc == "string" ? db[dc["replace"]("this.", "")] : dc;
}
function _initModels() {
  var dd = this["getByClassName"]("Model3D");
  dd["forEach"](
    function (de) {
      var df = de["get"]("data");
      var dg = df["panoramaLocations"];
      if (dg) {
        dg["forEach"](
          function (dh) {
            dh = _getObject(this, dh);
            var di = dh["get"]("data");
            var dj = _getObject(this, di["panorama"]);
            dj["set"](
              "modelLocations",
              (dj["get"]("modelLocations") || [])["concat"](dh)
            );
          }["bind"](this)
        );
      }
      this["getPlayListItems"](de)["forEach"](
        function (dk) {
          _initModel3DItem["call"](this, dk);
        }["bind"](this)
      );
    }["bind"](this)
  );
}
function _initModel3DItem(dl) {
  var dm = dl["get"]("player");
  if (!dm) return;
  var dn = dm["get"]("viewerArea");
  if (!dn) return;
  var dp = dl["get"]("media");
  var dq;
  dl["bind"](
    "begin",
    function () {
      _initModel["call"](this, dp);
      dq = dn["get"]("doubleClickAction");
      dn["set"]("doubleClickAction", "none");
      this["getCurrentPlayers"]()["forEach"](function (dr) {
        if (
          dr["get"]("class") == "PanoramaPlayer" &&
          dr["get"]("viewerArea") == dn
        ) {
          dr["set"]("model3DPlayer", dm);
        }
      });
    },
    this
  );
  dl["bind"](
    "stop",
    function () {
      dn["set"]("doubleClickAction", dq);
    },
    this
  );
}
function _initModel(ds) {
  var dt = ds["get"]("data");
  if (!dt) ds["set"]("data", (dt = {}));
  if (!dt["panoramaLocations"] || dt["isInitialized"] || !ds["get"]("isLoaded"))
    return;
  var du = 0xb4 / Math["PI"];
  var dv = ds["get"]("worldUnitToMeters") || 0x1;
  var dw = dt["maxDistanceObjectsVisible"] || 0x0;
  var dx = dt["panoramaLocations"];
  var dy = [];
  var dz = this["get"]("data")["surfaceSelectionHotspotMode"];
  var dA = dz == "hotspotEnabled";
  dx["forEach"](
    function (dH) {
      dH = _getObject(this, dH);
      var dI = dH["get"]("data");
      var dJ = ds["getDistanceToFloor"]([
        dH["get"]("x"),
        dH["get"]("y"),
        dH["get"]("z"),
      ]);
      var dK = _getObject(this, dI["panorama"]);
      var dL = dx["filter"](
        function (dU) {
          var dV = _getObject(this, _getObject(this, dU)["get"]("data"));
          return !dV["excludeAsHotspotPanorama"] && dK != dV["panorama"];
        }["bind"](this)
      )["map"](
        function (dW) {
          dW = _getObject(this, dW);
          var dX = dW["get"]("data");
          var dY = !!dX["excludeSurfaceSelectionModel"];
          var dZ = dW["get"]("x") - dH["get"]("x"),
            e0 = dW["get"]("y") - dH["get"]("y"),
            e1 = dW["get"]("z") - dH["get"]("z");
          var e2 = Math["atan2"](dZ, -e1) * du;
          var e3 = Math["atan2"](e0, Math["sqrt"](dZ * dZ + e1 * e1)) * du;
          var e4 = Math["sqrt"](dZ * dZ + e0 * e0 + e1 * e1);
          var e5 = ds["getDistanceToFloor"]([
            dW["get"]("x"),
            dW["get"]("y"),
            dW["get"]("z"),
          ]);
          if (dJ !== undefined && e5 !== undefined) e0 = e5 - dJ;
          var e6 = Math["sqrt"](dZ * dZ + e0 * e0 + e1 * e1);
          return {
            yaw: e2,
            pitch: e3,
            width: dX["width"],
            height: dX["height"],
            opacity: dX["opacity"],
            anchorX: dX["anchorX"] ? dX["anchorX"] : 0.5,
            anchorY: dX["anchorY"] ? dX["anchorY"] : 0.5,
            transparentAreaActive: !!dX["transparentAreaActive"],
            actions: dX["actions"],
            position: {
              x: dW["get"]("x"),
              y: dW["get"]("y"),
              z: dW["get"]("z"),
            },
            toolTip: dX["toolTip"],
            image: _getObject(this, dX["image"]),
            distance: e4 * dv,
            floorDistance: e6 * dv,
            panorama: _getObject(this, dX["panorama"]),
            backwardYaw: e2 - 0xb4 - dW["get"]("yaw"),
            excludeSurfacePanorama: dY,
          };
        }["bind"](this)
      );
      dL["sort"](function (e7, e8) {
        return e7["distance"] - e8["distance"];
      });
      var dM = [],
        dN = (dK["get"]("adjacentPanoramas") || [])["concat"]();
      var dO = ds["get"]("maxNearestObjectsVisible");
      var dP = dt["showOnlyHotspotsLineSightInPanoramas"];
      var dQ = { x: dH["get"]("x"), y: dH["get"]("y"), z: dH["get"]("z") };
      dL["forEach"](
        function (e9) {
          if (
            e9["panorama"] == dK ||
            (dO > 0x0 && dM["length"] >= dO) ||
            (dw > 0x0 && e9["distance"] > dw) ||
            (dP && ds["testIntersection"](dQ, e9["position"]))
          )
            return;
          var ea = dC["call"](
            this,
            e9["panorama"],
            e9["yaw"] - dH["get"]("yaw"),
            e9["pitch"],
            e9["width"],
            e9["height"],
            e9["anchorX"],
            e9["anchorY"],
            e9["opacity"],
            e9["transparentAreaActive"],
            e9["image"],
            dA && !e9["excludeSurfacePanorama"]
          );
          var eb = dD["call"](
            this,
            e9["panorama"],
            e9["yaw"] - dH["get"]("yaw"),
            e9["backwardYaw"],
            e9["floorDistance"],
            !e9["excludeSurfacePanorama"]
          );
          dM["push"](ea);
          var ec = dN["findIndex"](function (ef) {
            return ef["get"]("panorama") == e9["panorama"];
          });
          if (ec != -0x1) dN["splice"](ec, 0x1);
          dN["push"](eb);
          var ed = ea["get"]("areas")[0x0];
          if (e9["toolTip"]) ed["set"]("toolTip", e9["toolTip"]);
          ed["bind"](
            "click",
            dB["bind"](this, dK, e9["panorama"], ds, !![]),
            this
          );
          eb["bind"](
            "select",
            dB["bind"](this, dK, e9["panorama"], ds, !![]),
            this
          );
          var ee = e9["actions"];
          if (ee) {
            dG["call"](this, ea, ee);
            if ("click" in ee)
              eb["bind"]("select", new Function("event", ee["click"]), this);
          }
        }["bind"](this)
      );
      dK["set"]("overlays", (dK["get"]("overlays") || [])["concat"](dM));
      dK["set"]("adjacentPanoramas", dN);
      var dR =
        !ds["get"]("surfaceSelectionEnabled") ||
        !!dI["excludeSurfaceSelectionModel"];
      var dS;
      if (dR) {
        dS = dE["call"](
          this,
          dH["get"]("x"),
          dH["get"]("y"),
          dH["get"]("z"),
          dI["width"],
          dI["height"],
          dI["anchorX"] ? dI["anchorX"] : 0.5,
          dI["anchorY"] ? dI["anchorY"] : 0.5,
          dI["opacity"],
          !!dI["transparentAreaActive"],
          dt["showOnlyHotspotsLineSight"],
          _getObject(this, dI["image"])
        );
        dS["set"]("id", "sprite_" + dH["get"]("id"));
        dS["set"](
          "translationLineColor",
          dI["translationLineColor"] != null
            ? dI["translationLineColor"]
            : "#ffffff"
        );
        dS["set"](
          "translationLineOpacity",
          dI["translationLineOpacity"] != null
            ? dI["translationLineOpacity"]
            : 0x1
        );
        dS["set"](
          "translationLineVisible",
          dI["translationLineVisible"] != null
            ? dI["translationLineVisible"]
            : ![]
        );
        dS["set"](
          "translationLineWidth",
          dI["translationLineWidth"] != null ? dI["translationLineWidth"] : 0x1
        );
        dS["set"](
          "translationLength",
          dI["translationLength"] != null
            ? dI["translationLength"]
            : dt["showOnlyHotspotsLineSight"] &&
              (dI["translationY"] == null || dI["translationY"] == 0x0)
            ? dI["height"] / 0x2
            : undefined
        );
        dS["set"](
          "translationX",
          dI["translationX"] != null ? dI["translationX"] : 0x0
        );
        dS["set"](
          "translationY",
          dI["translationY"] != null && dI["translationY"] != 0x0
            ? dI["translationY"]
            : dt["showOnlyHotspotsLineSight"]
            ? 0x1
            : 0x0
        );
        dS["set"](
          "translationZ",
          dI["translationZ"] != null ? dI["translationZ"] : 0x0
        );
        if (dI["toolTip"]) dS["set"]("toolTip", dI["toolTip"]);
        dI["sprite"] = dS;
      } else
        dS = dF["call"](this, dH["get"]("x"), dH["get"]("y"), dH["get"]("z"));
      if (dI["enabled"] !== undefined) dS["set"]("enabled", dI["enabled"]);
      dS["get"]("data")["location"] = dH;
      var dT = dI["actions"];
      if (dT) {
        dG["call"](this, dS, dT);
      }
      dS["bind"]("click", dB["bind"](this, ds, dK, ds, ![]), this);
      dy["push"](dS);
    }["bind"](this)
  );
  ds["set"]("objects", (ds["get"]("objects") || [])["concat"](dy));
  dt["isInitialized"] = !![];
  function dB(eg, eh, ei, ej) {
    var ek = this["getPlayListsWithMedia"](eg, !![])["filter"](
      function (er) {
        return (
          this["getMediaFromPlayer"](
            er["get"]("items")[er["get"]("selectedIndex")]["get"]("player")
          ) == eg
        );
      }["bind"](this)
    );
    if (ek["length"] == 0x0) return;
    var el = this["getPlayListItemByMedia"](ek[0x0], eg);
    var em = el["get"]("player")["get"]("viewerArea");
    var en;
    this["getPlayListsWithMedia"](eh)["forEach"](
      function (es) {
        var et = this["getPlayListItemByMedia"](es, eh);
        if (et["get"]("player")["get"]("viewerArea") == em) {
          if (
            ej &&
            el["get"]("player")
              ["get"]("viewerArea")
              ["get"]("translationTransitionEnabled")
          ) {
            eo();
            et["bind"]("begin", eq, this);
          }
          es["set"]("selectedIndex", es["get"]("items")["indexOf"](et));
        }
      }["bind"](this)
    );
    function eo() {
      en = ei["get"]("objects")["filter"](function (eu) {
        var ev = eu["get"]("data");
        return ev && ev["location"] !== undefined;
      });
      en["forEach"](function (ew) {
        ew["set"]("enabled", ![]);
      });
    }
    function ep() {
      en["forEach"](function (ex) {
        ex["set"]("enabled", !![]);
      });
    }
    function eq(ey) {
      ey["source"]["unbind"]("begin", eq, this);
      ep();
    }
  }
  function dC(ez, eA, eB, eC, eD, eE, eF, eG, eH, eI, eJ) {
    var eK = _createInstanceFromObj(this, {
      class: "HotspotPanoramaOverlay",
      useHandCursor: !![],
      enabledInSurfaceSelection: eJ,
      areas: [
        { class: "HotspotPanoramaOverlayArea", mapColor: eH ? "any" : "image" },
      ],
      items: [
        {
          class: "FlatHotspotPanoramaOverlayImage",
          yaw: eA,
          pitch: eB,
          width: eC,
          height: eD,
          offsetX: eE * eC,
          offsetY: eF * eD,
          opacity: eG != undefined ? eG : 0x1,
        },
      ],
    });
    eK["get"]("items")[0x0]["set"]("image", eI);
    return eK;
  }
  function dD(eL, eM, eN, eO, eP) {
    return _createInstanceFromObj(this, {
      class: "AdjacentPanorama",
      panorama: "this." + eL["get"]("id"),
      backwardYaw: eN,
      yaw: eM,
      distance: eO,
      enabledInSurfaceSelection: eP,
    });
  }
  function dE(eQ, eR, eS, eT, eU, eV, eW, eX, eY, eZ, f0) {
    var f1 = _createInstanceFromObj(this, {
      class: "SpriteModel3DObject",
      x: eQ,
      y: eR,
      z: eS,
      anchorX: eV,
      anchorY: eW,
      depthTest: eZ,
      transparentAreaActive: eY,
      hideBasedOnDistance: !![],
      width: eT,
      height: eU,
      opacity: eX != undefined ? eX : 0x1,
      data: {},
    });
    f1["set"]("image", f0);
    return f1;
  }
  function dF(f2, f3, f4) {
    return _createInstanceFromObj(this, {
      class: "SurfaceReticleModel3DObject",
      x: f2,
      y: f3,
      z: f4,
      depthTest: ![],
      data: {},
    });
  }
  function dG(f5, f6) {
    Object["keys"](f6)["forEach"](
      function (f7) {
        if (f5["hasEvent"](f7))
          f5["bind"](f7, new Function("event", f6[f7]), this);
      }["bind"](this)
    );
  }
}
function _findLocationWithPanorama(f8) {
  var f9 = this["getByClassName"]("Model3D");
  for (var fa = 0x0, fb = f9["length"]; fa < fb; ++fa) {
    var fc = f9[fa];
    var fd = fc["get"]("data");
    if (fd && fd["panoramaLocations"]) {
      var fe = fd["panoramaLocations"]["find"](
        function (ff) {
          ff = _getObject(this, ff);
          return _getObject(this, ff["get"]("data")["panorama"]) == f8;
        }["bind"](this)
      );
      if (fe) return _getObject(this, fe);
    }
  }
  return undefined;
}
function _getPlayersWithViewer(fg) {
  var fh = this["getCurrentPlayers"]();
  var fi = fh["length"];
  while (fi-- > 0x0) {
    var fj = fh[fi];
    if (fj["get"]("viewerArea") != fg) {
      fh["splice"](fi, 0x1);
    }
  }
  return fh;
}
function _createInstance(fk, fl, fm) {
  var fn = fk["createInstance"](fl);
  if (fm) {
    fn["set"]("id", fm);
    fk[fm] = fn;
  }
  return fn;
}
function _createInstanceFromObj(fo, fp) {
  return fq(fp);
  function fq(fr, fs) {
    if (typeof fr == "object") {
      if ("class" in fr) {
        try {
          fs = _createInstance(fo, fr["class"], fr["id"]);
        } catch (fw) {
          fs = fr;
        }
      } else {
        fs = fr;
      }
    }
    var ft = function (fx, fy) {
      if ("set" in fs) fs["set"](fx, fy);
      else fs[fx] = fy;
    };
    for (var fu in fr) {
      var fv = fr[fu];
      if (typeof fv == "object" && fv !== null) ft(fu, fq(fv, fs));
      else if (typeof fv == "string" && fv["indexOf"]("this.") == 0x0)
        ft(fu, fo[fv["replace"]("this.", "")]);
      else ft(fu, fv);
    }
    return fs;
  }
}
TDV["Tour"]["Script"] = function () {};
TDV["Tour"]["Script"]["assignObjRecursively"] = function (fz, fA) {
  for (var fB in fz) {
    var fC = fz[fB];
    if (typeof fC == "object" && fC !== null)
      this["assignObjRecursively"](fz[fB], fA[fB] || (fA[fB] = {}));
    else fA[fB] = fC;
  }
  return fA;
};
TDV["Tour"]["Script"]["autotriggerAtStart"] = function (fD, fE, fF) {
  var fG = function (fH) {
    fE();
    if (fF == !![]) fD["unbind"]("change", fG, this);
  };
  fD["bind"]("change", fG, this);
};
TDV["Tour"]["Script"]["changeBackgroundWhilePlay"] = function (fI, fJ, fK) {
  var fL = function () {
    fM["unbind"]("stop", fL, this);
    if (
      fK == fO["get"]("backgroundColor") &&
      fR == fO["get"]("backgroundColorRatios")
    ) {
      fO["set"]("backgroundColor", fP);
      fO["set"]("backgroundColorRatios", fQ);
    }
  };
  var fM = fI["get"]("items")[fJ];
  var fN = fM["get"]("player");
  var fO = fN["get"]("viewerArea");
  var fP = fO["get"]("backgroundColor");
  var fQ = fO["get"]("backgroundColorRatios");
  var fR = [0x0];
  if (fK != fP || fR != fQ) {
    fO["set"]("backgroundColor", fK);
    fO["set"]("backgroundColorRatios", fR);
    fM["bind"]("stop", fL, this);
  }
};
TDV["Tour"]["Script"]["changeOpacityWhilePlay"] = function (fS, fT, fU) {
  var fV = function () {
    fW["unbind"]("stop", fV, this);
    if (fZ == fY["get"]("backgroundOpacity")) {
      fY["set"]("opacity", fZ);
    }
  };
  var fW = fS["get"]("items")[fT];
  var fX = fW["get"]("player");
  var fY = fX["get"]("viewerArea");
  var fZ = fY["get"]("backgroundOpacity");
  if (fU != fZ) {
    fY["set"]("backgroundOpacity", fU);
    fW["bind"]("stop", fV, this);
  }
};
TDV["Tour"]["Script"]["changePlayListWithSameSpot"] = function (g0, g1) {
  var g2 = g0["get"]("selectedIndex");
  if (g2 >= 0x0 && g1 >= 0x0 && g2 != g1) {
    var g3 = g0["get"]("items")[g2];
    var g4 = g0["get"]("items")[g1];
    var g5 = g3["get"]("player");
    var g6 = g4["get"]("player");
    if (
      (g5["get"]("class") == "PanoramaPlayer" ||
        g5["get"]("class") == "Video360Player") &&
      (g6["get"]("class") == "PanoramaPlayer" ||
        g6["get"]("class") == "Video360Player")
    ) {
      var g7 = this["clonePanoramaCamera"](g4["get"]("camera"));
      this["setCameraSameSpotAsMedia"](g7, g3["get"]("media"));
      var g8 = g7["get"]("initialPosition");
      if (
        g8["get"]("yaw") == undefined ||
        g8["get"]("pitch") == undefined ||
        g8["get"]("hfov") == undefined
      )
        return;
      this["startPanoramaWithCamera"](g4["get"]("media"), g7);
    }
  }
};
TDV["Tour"]["Script"]["clone"] = function (g9, gb) {
  var gc = this["rootPlayer"]["createInstance"](g9["get"]("class"));
  var gd = g9["get"]("id");
  if (gd) {
    var ge =
      gd + "_" + Math["random"]()["toString"](0x24)["substring"](0x2, 0xf);
    gc["set"]("id", ge);
    this[ge] = gc;
  }
  for (var gf = 0x0; gf < gb["length"]; ++gf) {
    var gg = gb[gf];
    var gh = g9["get"](gg);
    if (gh != null) gc["set"](gg, gh);
  }
  return gc;
};
TDV["Tour"]["Script"]["cloneBindings"] = function (gi, gj, gk) {
  var gl = gi["getBindings"](gk);
  for (var gm = 0x0; gm < gl["length"]; ++gm) {
    var gn = gl[gm];
    if (typeof gn == "string") gn = new Function("event", gn);
    gj["bind"](gk, gn, this);
  }
};
TDV["Tour"]["Script"]["clonePanoramaCamera"] = function (go) {
  var gp = this["clone"](go, [
    "manualRotationSpeed",
    "manualZoomSpeed",
    "automaticRotationSpeed",
    "automaticZoomSpeed",
    "timeToIdle",
    "sequences",
    "draggingFactor",
    "hoverFactor",
  ]);
  var gq = ["initialSequence", "idleSequence"];
  for (var gr = 0x0; gr < gq["length"]; ++gr) {
    var gs = gq[gr];
    var gt = go["get"](gs);
    if (gt) {
      var gu = this["clone"](gt, [
        "mandatory",
        "repeat",
        "restartMovementOnUserInteraction",
        "restartMovementDelay",
      ]);
      gp["set"](gs, gu);
      var gv = gt["get"]("movements");
      var gw = [];
      var gx = [
        "easing",
        "duration",
        "hfovSpeed",
        "pitchSpeed",
        "yawSpeed",
        "path",
        "stereographicFactorSpeed",
        "targetYaw",
        "targetPitch",
        "targetHfov",
        "targetStereographicFactor",
        "hfovDelta",
        "pitchDelta",
        "yawDelta",
      ];
      for (var gy = 0x0; gy < gv["length"]; ++gy) {
        var gz = gv[gy];
        var gA = this["clone"](gz, gx);
        var gB = gz["getBindings"]("end");
        if (gB["length"] > 0x0) {
          for (var gC = 0x0; gC < gB["length"]; ++gC) {
            var gD = gB[gC];
            if (typeof gD == "string") {
              gD = gD["replace"](go["get"]("id"), gp["get"]("id"));
              gD = new Function("event", gD);
              gA["bind"]("end", gD, this);
            }
          }
        }
        gw["push"](gA);
      }
      gu["set"]("movements", gw);
    }
  }
  return gp;
};
TDV["Tour"]["Script"]["copyObjRecursively"] = function (gE) {
  var gF = {};
  for (var gG in gE) {
    var gH = gE[gG];
    if (typeof gH == "object" && gH !== null)
      gF[gG] = this["copyObjRecursively"](gE[gG]);
    else gF[gG] = gH;
  }
  return gF;
};
TDV["Tour"]["Script"]["copyToClipboard"] = function (gI) {
  if (navigator["clipboard"]) {
    navigator["clipboard"]["writeText"](gI);
  } else {
    var gJ = document["createElement"]("textarea");
    gJ["value"] = gI;
    gJ["style"]["position"] = "fixed";
    document["body"]["appendChild"](gJ);
    gJ["focus"]();
    gJ["select"]();
    try {
      document["execCommand"]("copy");
    } catch (gK) {}
    document["body"]["removeChild"](gJ);
  }
};
TDV["Tour"]["Script"]["createTween"] = function (gL, gM, gN, gO, gP) {
  var gQ = this["rootPlayer"]["createInstance"]("Effect");
  var gR = this["get"]("data")["tweensState"];
  if (!gR) {
    this["get"]("data")["tweensState"] = gR = {};
  }
  var gS = "get" in gL && typeof gL["get"] === "function";
  var gT =
    (gS && gL["get"]("id")
      ? gL["get"]("id")
      : (Math["random"]() + 0x1)["toString"](0x24)["substring"](0x2)) + "_";
  var gU = {};
  for (var gV in gM) {
    var gW = gM[gV];
    if (
      gV["startsWith"]("on") &&
      (typeof gW === "function" || typeof gW === "string")
    ) {
      var gX = gV["slice"](0x2);
      if (typeof gW === "string") gW = eval("(" + gW + ")");
      gQ["bind"](
        gX["charAt"](0x0)["toLowerCase"]() + gX["slice"](0x1),
        gW,
        this
      );
    } else if (typeof gW === "string" && gW["startsWith"]("#")) {
      var gY = parseInt(
        "0x" + (gS ? gL["get"](gV)["slice"](0x1) : gL[gV]["slice"](0x1))
      );
      var gZ = parseInt("0x" + gW["slice"](0x1));
      gU[gV] = {
        color: !![],
        initialRGB: [(gY >> 0x10) & 0xff, (gY >> 0x8) & 0xff, gY & 0xff],
        finalRGB: [(gZ >> 0x10) & 0xff, (gZ >> 0x8) & 0xff, gZ & 0xff],
      };
      gR[gT + gV] = gQ;
    } else {
      gU[gV] = gS ? gL["get"](gV) : gL[gV];
      if (gV == "yaw" && gW - gU[gV] > 0xb4)
        gU[gV] = gU[gV] + (gW > gU[gV] ? 0x168 : -0x168);
      gR[gT + gV] = gQ;
    }
  }
  gQ["set"]("duration", (gN || 0x0) * 0x3e8);
  gQ["set"]("easing", gO || "cubic_in_out");
  gQ["set"]("animationDirection", gP || "normal");
  gQ["bind"](
    "end",
    function () {
      for (var h0 in gU) {
        if (gR[gT + h0] == gQ) delete gR[gT + h0];
      }
      this["disposeInstance"](gQ);
    },
    this
  );
  gQ["bind"](
    "frame",
    function () {
      var h1 = gQ["getPosition"]();
      for (var h2 in gU) {
        var h3 = gU[h2];
        if (gR[gT + h2] != gQ) continue;
        if (typeof h3 === "object" && "color" in h3) {
          var h4 = Math["round"](
            h3["initialRGB"][0x0] +
              (h3["finalRGB"][0x0] - h3["initialRGB"][0x0]) * h1
          );
          var h5 = Math["round"](
            h3["initialRGB"][0x1] +
              (h3["finalRGB"][0x1] - h3["initialRGB"][0x1]) * h1
          );
          var h6 = Math["round"](
            h3["initialRGB"][0x2] +
              (h3["finalRGB"][0x2] - h3["initialRGB"][0x2]) * h1
          );
          h3 =
            "#" +
            ((0x1 << 0x18) + (h4 << 0x10) + (h5 << 0x8) + h6)
              ["toString"](0x10)
              ["slice"](0x1);
        } else {
          h3 = h3 + (gM[h2] - h3) * h1;
        }
        if (gS) gL["set"](h2, h3);
        else gL[h2] = h3;
      }
    },
    this
  );
  return gQ;
};
TDV["Tour"]["Script"]["executeFunctionWhenChange"] = function (h7, h8, h9, ha) {
  var hb = undefined;
  var hc = function (hg) {
    if (hg["data"]["previousSelectedIndex"] == h8) {
      if (ha) ha["call"](this);
      if (h9 && hb) hb["unbind"]("end", h9, this);
      h7["unbind"]("change", hc, this);
    }
  };
  if (h9) {
    var hd = h7["get"]("items")[h8];
    var he = hd["get"]("class");
    if (he == "PanoramaPlayListItem" || he == "Model3DPlayListItem") {
      var hf = hd["get"]("camera");
      if (hf != undefined) {
        hb = hf["get"]("initialSequence");
        if (hb == undefined) hb = hf["get"]("idleSequence");
      }
    } else {
      hb = hd["get"]("media");
    }
    if (hb) {
      hb["bind"]("end", h9, this);
    }
  }
  h7["bind"]("change", hc, this);
};
TDV["Tour"]["Script"]["executeJS"] = function (hh) {
  try {
    eval(hh);
  } catch (hi) {
    console["log"]("Javascript\x20error:\x20" + hi);
    console["log"]("\x20\x20\x20code:\x20" + hh);
  }
};
TDV["Tour"]["Script"]["fixTogglePlayPauseButton"] = function (hj) {
  var hk = hj["get"]("buttonPlayPause");
  if (typeof hk !== "undefined" && hj["get"]("state") == "playing") {
    if (!Array["isArray"](hk)) hk = [hk];
    for (var hl = 0x0; hl < hk["length"]; ++hl) hk[hl]["set"]("pressed", !![]);
  }
};
TDV["Tour"]["Script"]["getActiveMediaWithViewer"] = function (hm) {
  var hn = this["getActivePlayerWithViewer"](hm);
  if (hn == undefined) {
    return undefined;
  }
  return this["getMediaFromPlayer"](hn);
};
TDV["Tour"]["Script"]["getActivePlayerWithViewer"] = function (ho) {
  var hp = this["getActivePlayersWithViewer"](ho);
  if (hp["length"] > 0x1) {
    hp["sort"](function (hq, hr) {
      var hs = hq["get"]("class");
      var ht = hr["get"]("class");
      if (hs == "Model3DPlayer") return 0x1;
      else if (ht == "Model3DPlayer") return -0x1;
      else return 0x0;
    });
  }
  return hp["length"] > 0x0 ? hp[0x0] : undefined;
};
TDV["Tour"]["Script"]["getActivePlayersWithViewer"] = function (hu) {
  var hv = this["getCurrentPlayers"]();
  var hw = hv["length"];
  var hx = [];
  while (hw-- > 0x0) {
    var hy = hv[hw];
    if (hy["get"]("viewerArea") == hu) {
      var hz = hy["get"]("class");
      if (
        (hz == "PanoramaPlayer" &&
          (hy["get"]("panorama") != undefined ||
            hy["get"]("video") != undefined)) ||
        ((hz == "VideoPlayer" || hz == "Video360Player") &&
          hy["get"]("video") != undefined) ||
        (hz == "PhotoAlbumPlayer" && hy["get"]("photoAlbum") != undefined) ||
        (hz == "MapPlayer" && hy["get"]("map") != undefined) ||
        (hz == "Model3DPlayer" && hy["get"]("model") != undefined)
      )
        hx["push"](hy);
    }
  }
  return hx;
};
TDV["Tour"]["Script"]["getCurrentPlayerWithMedia"] = function (hA) {
  var hB = undefined;
  var hC = undefined;
  switch (hA["get"]("class")) {
    case "Panorama":
    case "LivePanorama":
    case "HDRPanorama":
      hB = "PanoramaPlayer";
      hC = "panorama";
      break;
    case "Video360":
      hB = "PanoramaPlayer";
      hC = "video";
      break;
    case "PhotoAlbum":
      hB = "PhotoAlbumPlayer";
      hC = "photoAlbum";
      break;
    case "Map":
      hB = "MapPlayer";
      hC = "map";
      break;
    case "Video":
      hB = "VideoPlayer";
      hC = "video";
      break;
    case "Model3D":
      hB = "Model3DPlayer";
      hC = "media";
      break;
  }
  if (hB != undefined) {
    var hD = this["getByClassName"](hB);
    for (var hE = 0x0; hE < hD["length"]; ++hE) {
      var hF = hD[hE];
      if (hF["get"](hC) == hA) {
        return hF;
      }
    }
  } else {
    return undefined;
  }
};
TDV["Tour"]["Script"]["getCurrentPlayers"] = function () {
  var hG = this["getByClassName"]("PanoramaPlayer");
  hG = hG["concat"](this["getByClassName"]("VideoPlayer"));
  hG = hG["concat"](this["getByClassName"]("Video360Player"));
  hG = hG["concat"](this["getByClassName"]("PhotoAlbumPlayer"));
  hG = hG["concat"](this["getByClassName"]("MapPlayer"));
  hG = hG["concat"](this["getByClassName"]("Model3DPlayer"));
  return hG;
};
TDV["Tour"]["Script"]["getGlobalAudio"] = function (hH) {
  var hI = window["currentGlobalAudios"];
  if (hI != undefined && hH["get"]("id") in hI) {
    hH = hI[hH["get"]("id")]["audio"];
  }
  return hH;
};
TDV["Tour"]["Script"]["getMediaByName"] = function (hJ) {
  var hK = this["getByClassName"]("Media");
  for (var hL = 0x0, hM = hK["length"]; hL < hM; ++hL) {
    var hN = hK[hL];
    var hO = hN["get"]("data");
    if (hO && hO["label"] == hJ) {
      return hN;
    }
  }
  return undefined;
};
TDV["Tour"]["Script"]["getMediaByTags"] = function (hP, hQ) {
  return this["_getObjectsByTags"](hP, ["Media"], "tags2Media", hQ);
};
TDV["Tour"]["Script"]["getAudioByTags"] = function (hR, hS) {
  return this["_getObjectsByTags"](hR, ["Audio"], "tags2Media", hS);
};
TDV["Tour"]["Script"]["getOverlaysByTags"] = function (hT, hU) {
  return this["_getObjectsByTags"](
    hT,
    [
      "HotspotPanoramaOverlay",
      "HotspotMapOverlay",
      "VideoPanoramaOverlay",
      "QuadVideoPanoramaOverlay",
      "FramePanoramaOverlay",
      "QuadFramePanoramaOverlay",
      "SpriteModel3DObject",
      "PanoramaModel3DLocation",
    ],
    "tags2Overlays",
    hU
  );
};
TDV["Tour"]["Script"]["getOverlaysByGroupname"] = function (hV) {
  var hW = this["get"]("data");
  var hX = "groupname2Overlays";
  var hY = hW[hX];
  if (!hY) {
    var hZ = [
      "HotspotPanoramaOverlay",
      "VideoPanoramaOverlay",
      "QuadVideoPanoramaOverlay",
      "FramePanoramaOverlay",
      "QuadFramePanoramaOverlay",
    ];
    hW[hX] = hY = {};
    for (var i0 = 0x0; i0 < hZ["length"]; ++i0) {
      var i1 = hZ[i0];
      var i2 = this["getByClassName"](i1);
      for (var i3 = 0x0, i4 = i2["length"]; i3 < i4; ++i3) {
        var i5 = i2[i3];
        var i6 = i5["get"]("data");
        if (i6 && i6["group"]) {
          var i7 = hY[i6["group"]];
          if (!i7) hY[i6["group"]] = i7 = [];
          i7["push"](i5);
        }
      }
    }
  }
  return hY[hV] || [];
};
TDV["Tour"]["Script"]["getRootOverlay"] = function (i8) {
  var i9 = i8["get"]("class");
  var ia = i9["indexOf"]("HotspotPanoramaOverlayArea") != -0x1;
  var ib = i9["indexOf"]("HotspotPanoramaOverlayImage") != -0x1;
  if (ia || ib) {
    var ic = this["get"]("data");
    var ie = "overlays";
    var ig = ic[ie];
    if (!ig) {
      var ih = ["HotspotPanoramaOverlay"];
      ig = [];
      for (var ii = 0x0; ii < ih["length"]; ++ii) {
        var ij = ih[ii];
        ig = ig["concat"](this["getByClassName"](ij));
      }
      ic[ie] = ig;
    }
    var ik = ia ? "areas" : "items";
    for (var il = 0x0, im = ig["length"]; il < im; ++il) {
      var io = ig[il];
      var ip = io["get"](ik);
      if (ip) {
        for (var iq = 0x0; iq < ip["length"]; ++iq) {
          if (ip[iq] == i8) return io;
        }
      }
    }
  }
  return i8;
};
TDV["Tour"]["Script"]["initOverlayGroupRotationOnClick"] = function (ir) {
  var is = this["getOverlaysByGroupname"](ir);
  if (is["length"] > 0x1) {
    is["sort"](function (iz, iA) {
      var iB = iz["get"]("data")["groupIndex"];
      var iC = iA["get"]("data")["groupIndex"];
      return iB - iC;
    });
    for (var it = 0x0, iu = is["length"]; it < iu; ++it) {
      var iv = is[it];
      var iw = is[(it + 0x1) % iu];
      var ix = iv["get"]("class");
      var iy = iv;
      if (ix == "HotspotPanoramaOverlay") {
        iy = iv["get"]("areas")[0x0];
      }
      iy["bind"](
        "click",
        function (iD, iE) {
          this["setOverlaysVisibility"]([iD], ![]);
          this["setOverlaysVisibility"]([iE], !![]);
        }["bind"](this, iv, iw),
        this
      );
    }
  }
};
TDV["Tour"]["Script"]["getComponentsByTags"] = function (iF, iG) {
  return this["_getObjectsByTags"](iF, ["UIComponent"], "tags2Components", iG);
};
TDV["Tour"]["Script"]["_getObjectsByTags"] = function (iH, iI, iJ, iK) {
  var iL = this["get"]("data");
  var iM = iL[iJ];
  if (!iM) {
    iL[iJ] = iM = {};
    for (var iN = 0x0; iN < iI["length"]; ++iN) {
      var iO = iI[iN];
      var iP = this["getByClassName"](iO);
      for (var iR = 0x0, iT = iP["length"]; iR < iT; ++iR) {
        var iV = iP[iR];
        var iW = iV["get"]("data");
        if (iW && iW["tags"]) {
          var iX = iW["tags"];
          for (var j0 = 0x0, j1 = iX["length"]; j0 < j1; ++j0) {
            var j2 = iX[j0];
            if (j2 in iM) iM[j2]["push"](iV);
            else iM[j2] = [iV];
          }
        }
      }
    }
  }
  var j3 = undefined;
  iK = iK || "and";
  for (var iR = 0x0, iT = iH["length"]; iR < iT; ++iR) {
    var j4 = iM[iH[iR]];
    if (!j4) continue;
    if (!j3) j3 = j4["concat"]();
    else {
      if (iK == "and") {
        for (var j0 = j3["length"] - 0x1; j0 >= 0x0; --j0) {
          if (j4["indexOf"](j3[j0]) == -0x1) j3["splice"](j0, 0x1);
        }
      } else if (iK == "or") {
        for (var j0 = j4["length"] - 0x1; j0 >= 0x0; --j0) {
          var iV = j4[j0];
          if (j3["indexOf"](iV) == -0x1) j3["push"](iV);
        }
      }
    }
  }
  return j3 || [];
};
TDV["Tour"]["Script"]["getComponentByName"] = function (j5) {
  var j6 = this["getByClassName"]("UIComponent");
  for (var j7 = 0x0, j8 = j6["length"]; j7 < j8; ++j7) {
    var j9 = j6[j7];
    var ja = j9["get"]("data");
    if (ja != undefined && ja["name"] == j5) {
      return j9;
    }
  }
  return undefined;
};
TDV["Tour"]["Script"]["getMainViewer"] = function () {
  var jb = "MainViewer";
  return this[jb] || this[jb + "_mobile"];
};
TDV["Tour"]["Script"]["getMediaFromPlayer"] = function (jc) {
  switch (jc["get"]("class")) {
    case "PanoramaPlayer":
      return jc["get"]("panorama") || jc["get"]("video");
    case "VideoPlayer":
    case "Video360Player":
      return jc["get"]("video");
    case "PhotoAlbumPlayer":
      return jc["get"]("photoAlbum");
    case "MapPlayer":
      return jc["get"]("map");
    case "Model3DPlayer":
      return jc["get"]("model");
  }
};
TDV["Tour"]["Script"]["getMediaWidth"] = function (jd) {
  switch (jd["get"]("class")) {
    case "Video360":
      var je = jd["get"]("video");
      if (je instanceof Array) {
        var jf = 0x0;
        for (var jg = 0x0; jg < je["length"]; jg++) {
          var jh = je[jg];
          if (jh["get"]("width") > jf) jf = jh["get"]("width");
        }
        return jf;
      } else {
        return jh["get"]("width");
      }
    default:
      return jd["get"]("width");
  }
};
TDV["Tour"]["Script"]["getMediaHeight"] = function (ji) {
  switch (ji["get"]("class")) {
    case "Video360":
      var jj = ji["get"]("video");
      if (jj instanceof Array) {
        var jk = 0x0;
        for (var jl = 0x0; jl < jj["length"]; jl++) {
          var jm = jj[jl];
          if (jm["get"]("height") > jk) jk = jm["get"]("height");
        }
        return jk;
      } else {
        return jm["get"]("height");
      }
    default:
      return ji["get"]("height");
  }
};
TDV["Tour"]["Script"]["getOverlays"] = function (jn) {
  switch (jn["get"]("class")) {
    case "LivePanorama":
    case "HDRPanorama":
    case "Panorama":
      var jo = jn["get"]("overlays")["concat"]() || [];
      var jp = jn["get"]("frames");
      for (var jq = 0x0; jq < jp["length"]; ++jq) {
        jo = jo["concat"](jp[jq]["get"]("overlays") || []);
      }
      return jo;
    case "Video360":
    case "Map":
      return jn["get"]("overlays") || [];
    case "Model3D":
      return jn["get"]("objects");
    default:
      return [];
  }
};
TDV["Tour"]["Script"]["getPanoramaOverlayByName"] = function (jr, js) {
  var jt = this["getOverlays"](jr);
  for (var ju = 0x0, jv = jt["length"]; ju < jv; ++ju) {
    var jw = jt[ju];
    var jx = jw["get"]("data");
    if (jx != undefined && jx["label"] == js) {
      return jw;
    }
  }
  return undefined;
};
TDV["Tour"]["Script"]["getPanoramaOverlaysByTags"] = function (jy, jz, jA) {
  var jB = [];
  var jC = this["getOverlays"](jy);
  var jD = this["getOverlaysByTags"](jz, jA);
  for (var jE = 0x0, jF = jC["length"]; jE < jF; ++jE) {
    var jG = jC[jE];
    if (jD["indexOf"](jG) != -0x1) jB["push"](jG);
  }
  return jB;
};
TDV["Tour"]["Script"]["getPixels"] = function (jH) {
  var jI = /((\+|-)?d+(.d*)?)(px|vw|vh|vmin|vmax)?/i["exec"](jH);
  if (jI == undefined) {
    return 0x0;
  }
  var jJ = parseFloat(jI[0x1]);
  var jK = jI[0x4];
  var jL = this["rootPlayer"]["get"]("actualWidth") / 0x64;
  var jM = this["rootPlayer"]["get"]("actualHeight") / 0x64;
  switch (jK) {
    case "vw":
      return jJ * jL;
    case "vh":
      return jJ * jM;
    case "vmin":
      return jJ * Math["min"](jL, jM);
    case "vmax":
      return jJ * Math["max"](jL, jM);
    default:
      return jJ;
  }
};
TDV["Tour"]["Script"]["getPlayListsWithMedia"] = function (jN, jO) {
  var jP = [];
  var jQ = this["getByClassName"]("PlayList");
  for (var jR = 0x0, jS = jQ["length"]; jR < jS; ++jR) {
    var jT = jQ[jR];
    if (jO && jT["get"]("selectedIndex") == -0x1) continue;
    var jU = this["getPlayListItemByMedia"](jT, jN);
    if (jU != undefined && jU["get"]("player") != undefined) jP["push"](jT);
  }
  return jP;
};
TDV["Tour"]["Script"]["_getPlayListsWithViewer"] = function (jV) {
  var jW = this["getByClassName"]("PlayList");
  var jX = function (jZ) {
    var k0 = jZ["get"]("items");
    for (var k1 = k0["length"] - 0x1; k1 >= 0x0; --k1) {
      var k2 = k0[k1];
      var k3 = k2["get"]("player");
      if (k3 !== undefined && k3["get"]("viewerArea") == jV) return !![];
    }
    return ![];
  };
  for (var jY = jW["length"] - 0x1; jY >= 0x0; --jY) {
    if (!jX(jW[jY])) jW["splice"](jY, 0x1);
  }
  return jW;
};
TDV["Tour"]["Script"]["getPlayListWithItem"] = function (k4) {
  var k5 = this["getByClassName"]("PlayList");
  for (var k6 = k5["length"] - 0x1; k6 >= 0x0; --k6) {
    var k7 = k5[k6];
    var k8 = k7["get"]("items");
    for (var k9 = k8["length"] - 0x1; k9 >= 0x0; --k9) {
      var ka = k8[k9];
      if (ka == k4) return k7;
    }
  }
  return undefined;
};
TDV["Tour"]["Script"]["getFirstPlayListWithMedia"] = function (kb, kc) {
  var kd = this["getPlayListsWithMedia"](kb, kc);
  return kd["length"] > 0x0 ? kd[0x0] : undefined;
};
TDV["Tour"]["Script"]["getPlayListItemByMedia"] = function (ke, kf) {
  var kg = ke["get"]("items");
  for (var kh = 0x0, ki = kg["length"]; kh < ki; ++kh) {
    var kj = kg[kh];
    if (kj["get"]("media") == kf) return kj;
  }
  return undefined;
};
TDV["Tour"]["Script"]["getPlayListItemIndexByMedia"] = function (kk, kl) {
  var km = this["getPlayListItemByMedia"](kk, kl);
  return km ? kk["get"]("items")["indexOf"](km) : -0x1;
};
TDV["Tour"]["Script"]["getPlayListItems"] = function (kn, ko) {
  var kp = (function () {
    switch (kn["get"]("class")) {
      case "Panorama":
      case "LivePanorama":
      case "HDRPanorama":
        return "PanoramaPlayListItem";
      case "Map":
        return "MapPlayListItem";
      case "Model3D":
        return "Model3DPlayListItem";
      case "PhotoAlbum":
        return "PhotoAlbumPlayListItem";
      case "Video":
        return "VideoPlayListItem";
      case "Video360":
        return "Video360PlayListItem";
    }
  })();
  if (kp != undefined) {
    var kq = this["getByClassName"](kp);
    for (var kr = kq["length"] - 0x1; kr >= 0x0; --kr) {
      var ks = kq[kr];
      if (
        ks["get"]("media") != kn ||
        (ko != undefined && ks["get"]("player") != ko)
      ) {
        kq["splice"](kr, 0x1);
      }
    }
    return kq;
  } else {
    return [];
  }
};
TDV["Tour"]["Script"]["historyGoBack"] = function (kt) {
  var ku = this["get"]("data")["history"][kt["get"]("id")];
  if (ku != undefined) {
    ku["back"]();
  }
};
TDV["Tour"]["Script"]["historyGoForward"] = function (kv) {
  var kw = this["get"]("data")["history"][kv["get"]("id")];
  if (kw != undefined) {
    kw["forward"]();
  }
};
TDV["Tour"]["Script"]["init"] = function () {
  var kx = this["get"]("data")["history"];
  var ky = function (kH) {
    var kI = kH["source"];
    var kJ = kI["get"]("selectedIndex");
    if (kJ < 0x0) return;
    var kK = kI["get"]("id");
    if (!kx["hasOwnProperty"](kK)) kx[kK] = new TDV["Tour"]["HistoryData"](kI);
    kx[kK]["add"](kJ);
  };
  var kz = this["getByClassName"]("PlayList");
  for (var kB = 0x0, kC = kz["length"]; kB < kC; ++kB) {
    var kD = kz[kB];
    kD["bind"]("change", ky, this);
  }
  if (this["getMainViewer"]()["get"]("translationTransitionEnabled")) {
    var kE = this["getByClassName"]("ThumbnailList");
    kE = kE["concat"](this["getByClassName"]("ThumbnailGrid"));
    kE = kE["concat"](this["getByClassName"]("DropDown"));
    function kL(kM) {
      var kN = kM["source"]["get"]("playList");
      var kO = kN["get"]("selectedIndex");
      if (kO >= 0x0) {
        this["skip3DTransitionOnce"](kN["get"]("items")[kO]["get"]("player"));
      }
    }
    for (var kB = 0x0, kF = kE["length"]; kB < kF; ++kB) {
      var kG = kE[kB];
      kG["bind"]("change", kL, this);
    }
  }
  _initModels["call"](this);
};
TDV["Tour"]["Script"]["sendAnalyticsData"] = function (kP, kQ, kR) {
  if (window["dataLayer"]) {
    window["dataLayer"]["push"]({ event: kQ, label: kR, category: kP });
  }
  if (!this["get"]("data")["tour"]["player"]["cookiesEnabled"]) return;
  if (window["ga"]) {
    window["ga"]("send", "event", kP, kQ, kR);
  }
  if (window["gtag"]) {
    window["gtag"]("event", kQ, { category: kP, label: kR });
  }
};
TDV["Tour"]["Script"]["initAnalytics"] = function () {
  var kT = this["getByClassName"]("Panorama");
  kT = kT["concat"](this["getByClassName"]("Video360"));
  kT = kT["concat"](this["getByClassName"]("Map"));
  kT = kT["concat"](this["getByClassName"]("Model3D"));
  for (var kW = 0x0, kZ = kT["length"]; kW < kZ; ++kW) {
    var l0 = kT[kW];
    var l2 = l0["get"]("data");
    var l3 = l2 ? l2["label"] : "";
    var l4 = this["getOverlays"](l0);
    for (var l5 = 0x0, l6 = l4["length"]; l5 < l6; ++l5) {
      var l7 = l4[l5];
      var l8 =
        l7["get"]("data") != undefined
          ? l3 + "\x20-\x20" + l7["get"]("data")["label"]
          : l3;
      switch (l7["get"]("class")) {
        case "FlatHotspotPanoramaOverlay":
        case "HotspotPanoramaOverlay":
        case "HotspotMapOverlay":
        case "AreaHotspotMapOverlay":
          var l9 = l7["get"]("areas");
          for (var la = 0x0; la < l9["length"]; ++la) {
            l9[la]["bind"](
              "click",
              this["sendAnalyticsData"]["bind"](this, "Hotspot", "click", l8),
              this,
              ![]
            );
          }
          break;
        case "CeilingCapPanoramaOverlay":
        case "TripodCapPanoramaOverlay":
          l7["bind"](
            "click",
            this["sendAnalyticsData"]["bind"](this, "Cap", "click", l8),
            this,
            ![]
          );
          break;
        case "QuadVideoPanoramaOverlay":
        case "VideoPanoramaOverlay":
          l7["bind"](
            "click",
            this["sendAnalyticsData"]["bind"](this, "Hotspot", "click", l8),
            this,
            ![]
          );
          l7["bind"](
            "start",
            this["sendAnalyticsData"]["bind"](this, "Hotspot", "start", l8),
            this,
            ![]
          );
          break;
        case "QuadFramePanoramaOverlay":
        case "FramePanoramaOverlay":
        case "SpriteModel3DObject":
          l7["bind"](
            "click",
            this["sendAnalyticsData"]["bind"](this, "Hotspot", "click", l8),
            this,
            ![]
          );
          break;
      }
    }
  }
  var lb = this["getByClassName"]("UIComponent");
  for (var kW = 0x0, kZ = lb["length"]; kW < kZ; ++kW) {
    var lc = lb[kW];
    var ld = lc["getBindings"]("click");
    if (ld["length"] > 0x0) {
      var le = lc["get"]("data")["name"];
      lc["bind"](
        "click",
        this["sendAnalyticsData"]["bind"](this, "Skin", "click", le),
        this,
        ![]
      );
    }
  }
  var lf = this["mainPlayList"]
    ["get"]("items")
    ["concat"](this["getByClassName"]("PlayListItem"));
  var lg = {};
  for (var kW = 0x0, kZ = lf["length"]; kW < kZ; ++kW) {
    var lh = lf[kW];
    var kT = lh["get"]("media");
    if (!(kT["get"]("id") in lg)) {
      var l2 = kT["get"]("data");
      lh["bind"](
        "begin",
        this["sendAnalyticsData"]["bind"](
          this,
          "Media",
          "play",
          l2 ? l2["label"] : undefined
        ),
        this,
        ![]
      );
      lg[kT["get"]("id")] = lh;
    }
  }
  if (TDV["Remote"] != undefined) {
    var li = undefined;
    TDV["Remote"]["bind"](
      TDV["Remote"]["EVENT_CALL_BEGIN"],
      function (lj) {
        li = Date["now"]();
        this["sendAnalyticsData"](
          "Live\x20Guided\x20Tour",
          "Start\x20Call",
          "Guest:\x20" + lj
        );
      }["bind"](this)
    );
    TDV["Remote"]["bind"](
      TDV["Remote"]["EVENT_CALL_END"],
      function (lk) {
        var ll = new Date();
        ll["setTime"](Date["now"]() - li);
        this["sendAnalyticsData"](
          "Live\x20Guided\x20Tour",
          "End\x20Call",
          "Guest:\x20" +
            lk +
            "\x20Duration:\x20" +
            ll["toUTCString"]()["split"]("\x20")[0x4]
        );
      }["bind"](this)
    );
  }
};
TDV["Tour"]["Script"]["initQuiz"] = function (lm, ln, lo) {
  var lp = {
    score: {
      window: {
        statsContainer: {
          contentOpaque: true,
          overflow: "scroll",
          paddingLeft: 100,
          gap: 20,
          paddingBottom: 15,
          verticalAlign: "middle",
          paddingRight: 100,
          paddingTop: 15,
          horizontalAlign: "center",
        },
        shadowOpacity: 0.3,
        shadowSpread: 4,
        backgroundColor: "#ffffff",
        stats: {
          borderColor: "#009fe3",
          secondaryValue: {
            paddingLeft: 5,
            fontWeight: "bold",
            fontFamily: "Arial",
            fontSize: 20,
            fontColor: "#000000",
          },
          height: 150,
          label: {
            fontWeight: "normal",
            fontFamily: "Arial",
            fontSize: 15,
            fontColor: "#000000",
          },
          verticalAlign: "middle",
          minWidth: 150,
          borderSize: 1,
          borderRadius: 75,
          gap: 0,
          mainValue: {
            fontWeight: "bold",
            fontFamily: "Arial",
            fontSize: 40,
            fontColor: "#000000",
          },
          title: {
            fontFamily: "Arial",
            paddingLeft: 5,
            fontWeight: "normal",
            fontColor: "#000000",
            paddingRight: 5,
            paddingTop: 10,
            fontSize: 20,
          },
          layout: "vertical",
          horizontalAlign: "center",
        },
        shadowColor: "#000000",
        timeContainer: {
          paddingLeft: 100,
          gap: 5,
          paddingBottom: 15,
          verticalAlign: "middle",
          paddingRight: 100,
          paddingTop: 10,
          width: "100%",
          horizontalAlign: "center",
        },
        paddingRight: 20,
        paddingTop: 20,
        shadowVerticalLength: 0,
        shadowHorizontalLength: 0,
        minWidth: 500,
        calification: {
          width: "100%",
          paddingRight: 100,
          fontFamily: "Arial",
          fontWeight: "bold",
          fontColor: "#009fe3",
          paddingTop: 15,
          verticalAlign: "middle",
          textAlign: "center",
          paddingLeft: 100,
          fontSize: 30,
          paddingBottom: 10,
        },
        closeButton: {
          iconLineWidth: 2,
          height: 45,
          width: 45,
          backgroundColor: "#009fe3",
          iconWidth: 18,
          iconHeight: 18,
          iconColor: "#ffffff",
        },
        content: { width: "100%", horizontalAlign: "center" },
        paddingBottom: 20,
        title: {
          fontFamily: "Arial",
          fontWeight: "bold",
          paddingBottom: 15,
          textAlign: "center",
          paddingTop: 50,
          fontSize: 50,
          fontColor: "#000000",
        },
        description: {
          textAlign: "center",
          fontFamily: "Arial",
          fontWeight: "normal",
          fontColor: "#000000",
          paddingTop: 15,
          paddingRight: 100,
          paddingLeft: 100,
          fontSize: 16,
          paddingBottom: 15,
        },
        buttonsContainer: {
          button: {
            paddingBottom: 12,
            paddingTop: 12,
            fontFamily: "Arial",
            fontSize: 15,
            backgroundColor: "#009fe3",
            fontColor: "#ffffff",
            verticalAlign: "middle",
            paddingRight: 25,
            paddingLeft: 25,
            fontWeight: "bold",
            horizontalAlign: "center",
          },
          paddingLeft: 100,
          gap: 8,
          paddingBottom: 50,
          verticalAlign: "middle",
          paddingRight: 100,
          paddingTop: 35,
          width: "100%",
          horizontalAlign: "center",
        },
        shadowBlurRadius: 4,
        maxWidth: 1500,
        paddingLeft: 20,
        shadow: true,
        horizontalAlign: "center",
      },
      veil: { backgroundOpacity: 0.3, backgroundColor: "#000000" },
    },
    timeout: {
      window: {
        shadowOpacity: 0.3,
        shadowSpread: 4,
        backgroundColor: "#ffffff",
        button: {
          paddingBottom: 12,
          paddingTop: 12,
          fontFamily: "Arial",
          fontSize: 15,
          backgroundColor: "#009fe3",
          fontColor: "#ffffff",
          verticalAlign: "middle",
          paddingRight: 25,
          paddingLeft: 25,
          fontWeight: "bold",
          horizontalAlign: "center",
        },
        shadowColor: "#000000",
        paddingRight: 80,
        paddingTop: 45,
        shadowVerticalLength: 0,
        shadowHorizontalLength: 0,
        buttonsContainer: { width: "100%", gap: 10, horizontalAlign: "center" },
        gap: 15,
        paddingBottom: 55,
        title: {
          fontFamily: "Arial",
          fontWeight: "bold",
          paddingBottom: 20,
          textAlign: "center",
          fontSize: 40,
          fontColor: "#000000",
        },
        icon: {
          height: 72,
          url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAABGCAYAAAB/h5zrAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABhRJREFUeNrsW41y2jgQliVjGxMuhDR37/92l2uvhVIcjGtzuLO6aBRpdyVb9G4azWiABKH99n9XcibSj9V13geu6a7z7+scUhAkbwB6GbFmAVP8X0H/58Y76HfQ76DfQYeOLmLNGKq+pyIouxFzS3jNkZg9MucrvB8B96mIyW8EumV858L8XlLQC5DKqGqHSDX9WeMe6G+BdpZ6jwseDZsfIC0MBa6M7KqEzwr5/hlUu4P3MYzeXGdtfG6uc0eBtgGLQOAjqAo2nppKjnuejBkK2Ak8YwI2ifgTcVYrAJxi9ED80VOIrGH6xr/A8wDAvhBXwmZFYjtVsM8KgB8cAsOG1oCdCgCsw0pjMOAeprqhk8qA0bUV2jKGlo04lQLin5iJioJNxu9+uIF0qcSqhtcugPmLDNA//UppaA5c6lIW7RB+WtjHlYQooCUHOqqUKXJmqMrjzMA7cDinyLZPCV2XembMu8yykTmAn8GztjPa7grmVOmPIavJHBvontYooW0AEwYoGJqEIesh0HnuwPEWgKcTDm93MWz8An+rmNL9BK+pxgUYOjBp6g3QZ9PEFMHZLaP8HAn5bDApRHJ5hL13ILUlQZs0BPJmY994ZJSee1cVwxg1xPkV0HAKXD+Az6CAly5HKhGiCoaEj4wMSCIpofB4ZwkES0LinAOBe66kt8SGI/e+EJs9Qa5cA4FmJ6QytGgk+ptF0++gBePaF8R0BvjtmpFFdhjomviRnmHDo5TujFxAAvFmJ0UazsaU1p3hqDLY50zQY7akfBp3xDona0YYGBg2R33eIZHABQobB2DUApF2rcOpLekK1GqKHWtQujBpIX5zvXtvrD0ExP2OoF3q38oRB+PjKHc0ExKVmLW67PVhKLR9K4sTG4KQF8//1mCLF5GmXy3h97cgzbPHxHpC2j8cmrQ4gQ2fWq8AdAVEqZnBrsGbr+GzEnjvHOvhLW31LikOIZ7aLlf7GcDGFhlHRGMLG3RBxGVM7Ssmp+cAO0Am6BtUdVfmzMZaSzDk2WhIxNTOykhkqMLmM7FHTzRF8pyRgwtG9dQHqPRoDr8ZRPVMP7BnhkvBBZ0TMXeuCy+1w94UA8Au0GwwASw4B3jfGeUhR60lSNjWjoJwSntPo0MKf+MfZRBH0lg+q3vl48Z/EcALq8b9hEhf5+StpxgqjAzyo6fhQBbaMb2nylrPabS7HGPjcIwfEedZMJ0vCTrGZvsQlbL+X3pSX453PgY4WFS9Y1LHBkq/JdTDFGidOkqQ1h8Om+bk23tDC3z5Q8YBHfudY0AY0d3SjeEElaNg4IxTgClFSVoazmrq0N1M+9zpGNlrw6KK18xyZqG+EPM17/UBuz48THGtA5P0kDOzmIoAvQHn1CIdkSlZnB3ajkj+LQnQZ8n0hBVBTG20ZGqRZtRWORtD649wKZlFhUK4l4V4zgljQHpu3O5PZyclVMzzcffFsMsO6a5MHQfwBWfEhBSR1jYuqWwJ9XgWCW/yzTA2hKSf7R6ZzlmXRPjiHsHovtYCGBVy1lVBcZJDOOWsXQi8x3fWOUXuCCdYfatPHDjhyzzrLiG95MbYrQFeMSMC9ZxII5BC48BQIcnkPOZR9QMtFZEBcrLGFWHLPQW6IexWWXUxp9vSeACvxNsOamslLN8YzKWkfOCkaxfCoS0YHv8E9nhyaE9lVVqtxehGvF7j6Bg1fUaEqT0HdCdeL7BivS6sNWzeanDF9tqIuQeHs6Kcn76OQan/m1I1I36Uc6kOSwkphxXbQeXecDy4fBQmyYvg3e8ojIIkJCxdIkKZjiAPgnel80toCaYXSkEf+eTi9a5mqmcvJIC9Y6S6A/TgLjGgtZNRjH6U7qKUERUUJ8l5YPbE9L30XsS0VQJTPFfIakT8jcEF7LcU/MYl6yJ+aEUUCtwMX/oRBd+TOKVRMJQi/PST/chFTBlI3aD/GaOD0MQyqZiz5DPMStzuuS4qZO5CTCib6GA2It0zG5x2016EX7ybRVK3eobDtF3deo7q0M6pnqnBTwabsp+lxOsFODUDUDP0zTJSOyIFGqCfwssFfd+zN8Jbkmcv/xFgALaVsLLFsFFBAAAAAElFTkSuQmCC",
          width: 62,
        },
        shadowBlurRadius: 4,
        paddingLeft: 80,
        shadow: true,
        horizontalAlign: "center",
      },
      veil: { backgroundOpacity: 0.3, backgroundColor: "#000000" },
    },
    question: {
      window: {
        backgroundColor: "#ffffff",
        option: {
          label: {
            pressedBackgroundOpacity: 1,
            fontFamily: "Arial",
            fontWeight: "bold",
            correct: {
              pressedBackgroundOpacity: 1,
              fontFamily: "Arial",
              fontWeight: "bold",
              verticalAlign: "middle",
              backgroundColor: "#39b54a",
              width: 38,
              fontSize: 18,
              height: 38,
              borderRadius: 19,
              backgroundOpacity: 1,
              fontColor: "#ffffff",
              horizontalAlign: "center",
            },
            verticalAlign: "middle",
            backgroundColor: "#000000",
            width: 38,
            fontSize: 18,
            incorrect: {
              pressedBackgroundOpacity: 1,
              fontFamily: "Arial",
              fontWeight: "bold",
              verticalAlign: "middle",
              backgroundColor: "#ed1c24",
              width: 38,
              fontSize: 18,
              height: 38,
              borderRadius: 19,
              backgroundOpacity: 1,
              fontColor: "#ffffff",
              horizontalAlign: "center",
            },
            height: 38,
            borderRadius: 19,
            backgroundOpacity: 0.2,
            fontColor: "#ffffff",
            horizontalAlign: "center",
          },
          gap: 10,
          text: {
            selected: {
              paddingTop: 9,
              textAlign: "left",
              fontFamily: "Arial",
              fontSize: 18,
              fontColor: "#000000",
            },
            fontFamily: "Arial",
            fontSize: 18,
            fontColor: "#404040",
            verticalAlign: "middle",
            textAlign: "left",
            paddingTop: 9,
          },
        },
        shadowColor: "#000000",
        paddingRight: 20,
        width: "60%",
        shadowVerticalLength: 0,
        minWidth: 500,
        height: "60%",
        backgroundOpacity: 1,
        bodyContainer: {
          height: "100%",
          width: "100%",
          gap: 35,
          paddingBottom: 30,
          layout: "horizontal",
          paddingRight: 30,
          paddingLeft: 30,
        },
        buttonsContainer: {
          horizontalAlign: "right",
          verticalAlign: "bottom",
          button: {
            backgroundColor: "#000000",
            fontFamily: "Arial",
            fontWeight: "bold",
            horizontalAlign: "center",
            borderRadius: 3,
            paddingRight: 25,
            paddingTop: 10,
            fontSize: 18,
            verticalAlign: "middle",
            backgroundOpacity: 0.7,
            paddingBottom: 10,
            paddingLeft: 25,
            fontColor: "#ffffff",
          },
        },
        shadowBlurRadius: 4,
        shadowOpacity: 0.3,
        shadowSpread: 4,
        optionsContainer: {
          height: "100%",
          overflow: "scroll",
          width: "30%",
          gap: 10,
          contentOpaque: true,
        },
        borderRadius: 5,
        paddingTop: 20,
        shadowHorizontalLength: 0,
        closeButton: {
          iconLineWidth: 2,
          height: 45,
          width: 45,
          backgroundColor: "#009FE3",
          iconWidth: 18,
          iconHeight: 18,
          iconColor: "#FFFFFF",
        },
        mediaContainer: {
          buttonNext: {
            height: 37,
            iconURL:
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAlCAMAAACAj7KHAAAAA3NCSVQICAjb4U/gAAAAS1BMVEX///8AAAAAAAAAAAAAAACVlZWLi4uDg4MAAAC8vLx8fHx5eXl2dnZ0dHRxcXHDw8PAwMBra2tjY2PY2NiLi4v7+/v5+fn////7+/sWSBTRAAAAGXRSTlMAESIzRFVVVVVmZmZmZmZ3d3d3mZnu7v//nfgMagAAAAlwSFlzAAAK6wAACusBgosNWgAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAAWdEVYdENyZWF0aW9uIFRpbWUAMDYvMjkvMTUTtAt+AAAAjElEQVQokbXTyRaAIAgFUJHmeTL7/y9Naie+Toti2T0R4suYH4qI0HNKGpGV0iYwuoLFlEzeu0YT2dqH2jtFZHN3UR9T6FamKQi3O6Q+STL2O4r6WR4QcTZfdIQjR6NzttxUaKk2Eb/qdql34HfgbPA8eAdwb3jXD/eD7xTnAGcH5g1n9CHXBv8Ln9UJhXMPrAhUbYMAAAAASUVORK5CYII=",
            width: 25,
          },
          height: "100%",
          buttonPrevious: {
            height: 37,
            iconURL:
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAlCAMAAACAj7KHAAAAA3NCSVQICAjb4U/gAAAAS1BMVEX///8AAAAAAAAAAAAAAACVlZWLi4uDg4MAAAC8vLx8fHx5eXl2dnZ0dHRxcXHDw8PAwMBra2tjY2PY2NiLi4v7+/v5+fn////7+/sWSBTRAAAAGXRSTlMAESIzRFVVVVVmZmZmZmZ3d3d3mZnu7v//nfgMagAAAAlwSFlzAAAK6wAACusBgosNWgAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAAWdEVYdENyZWF0aW9uIFRpbWUAMDYvMjkvMTUTtAt+AAAAkElEQVQokbXSyRaDIAwFUALOQ7W2iP//pQK6CGheF55mmXuYwlPqn0VEUp/uzPd0qAuFvqnsdKEInXVuziTCsDpfraYcxgi25MKh5rsxWHvDhMMIIJWf8EpAeei2CO/CJK8kXR2w5ED6E8B9m0zkNegc8W7ye8AM5LmBWYP/AX8KcgCyA/IGMqrkXJ92239aO3W4D6yL2ECSAAAAAElFTkSuQmCC",
            width: 25,
          },
          width: "70%",
          viewerArea: {
            playbackBarLeft: 0,
            backgroundColor: "#e6e6e6",
            playbackBarHeadBorderColor: "#ffffff",
            playbackBarBorderSize: 0,
            playbackBarHeadHeight: 14,
            playbackBarBottom: 5,
            playbackBarHeadShadowColor: "#000000",
            backgroundOpacity: 1,
            playbackBarProgressBackgroundColor: "#3399ff",
            playbackBarHeadBorderSize: 3,
            playbackBarHeadShadowVerticalLength: 0,
            playbackBarBorderRadius: 0,
            playbackBarHeight: 6,
            playbackBarHeadShadowOpacity: 0.3,
            playbackBarHeadOpacity: 1,
            playbackBarHeadShadow: true,
            playbackBarHeadShadowSpread: 2,
            playbackBarHeadWidth: 14,
            playbackBarBackgroundColor: "#000000",
            playbackBarHeadShadowHorizontalLength: 0,
            playbackBarHeadShadowBlurRadius: 2,
            playbackBarHeadBorderRadius: 7,
            playbackBarBackgroundOpacity: 0.5,
            playbackBarProgressOpacity: 0.5,
            playbackBarRight: 0,
            playbackBarHeadBackgroundColor: "#cccccc",
          },
        },
        paddingBottom: 20,
        title: {
          textAlign: "center",
          fontFamily: "Arial",
          fontWeight: "bold",
          fontColor: "#000000",
          paddingTop: 25,
          paddingRight: 50,
          paddingLeft: 50,
          fontSize: 20,
          paddingBottom: 40,
        },
        paddingLeft: 20,
        shadow: true,
        horizontalAlign: "center",
      },
      veil: { backgroundOpacity: 0.3, backgroundColor: "#000000" },
    },
  };
  var lq = this["get"]("data");
  var lr = lq["createQuizConfig"]["call"](this);
  lC["call"](this, lr);
  lr["playList"] = lm;
  lr["player"] = this;
  lr["theme"] = "theme" in lr ? this["mixObject"](lp, lr["theme"]) : lp;
  if (lr["questions"]) {
    lB["call"](this, lr["questions"]);
    for (var ls = 0x0; ls < lr["questions"]["length"]; ++ls) {
      var lt = lr["questions"][ls];
      lB["call"](this, lt["options"]);
    }
  }
  if (lr["objectives"]) {
    lB["call"](this, lr["objectives"]);
  }
  if (lr["califications"]) {
    lB["call"](this, lr["califications"]);
  }
  if (lr["score"]) {
    this[lr["score"]["id"]] = lr["score"];
  }
  if (lr["question"]) {
    this[lr["question"]["id"]] = lr["question"];
  }
  if (lr["timeout"]) {
    this[lr["timeout"]["id"]] = lr["timeout"];
  }
  var lu =
    lr["data"] && lr["data"]["titlesScale"] ? lr["data"]["titlesScale"] : 0x1;
  var lv =
    lr["data"] && lr["data"]["bodyScale"] ? lr["data"]["bodyScale"] : 0x1;
  if (this["get"]("isMobile")) {
    var lw = this["mixObject"](lr["theme"], {
      question: {
        window: {
          width: "100%",
          height: "100%",
          minWidth: undefined,
          backgroundOpacity: 0x1,
          borderRadius: 0x0,
          paddingLeft: 0x0,
          paddingRight: 0x0,
          paddingBottom: 0x0,
          paddingTop: 0x0,
          verticalAlign: "middle",
          title: { paddingBottom: 0x19, paddingTop: 0x19 },
          bodyContainer: {
            layout: "vertical",
            horizontalAlign: "center",
            paddingLeft: 0x0,
            paddingRight: 0x0,
            gap: 0x14,
          },
          mediaContainer: { width: "100%", height: "45%" },
          optionsContainer: {
            width: "100%",
            height: "55%",
            paddingLeft: 0x14,
            paddingRight: 0x14,
          },
        },
      },
      score: {
        window: {
          description: { paddingLeft: 0xa, paddingRight: 0xa },
          calification: {
            fontSize: 0x14 * lv,
            paddingLeft: 0xa,
            paddingRight: 0xa,
          },
        },
      },
    });
    lr["theme"] = lw;
  }
  var lx = document["getElementById"]("metaViewport");
  var ly = lx
    ? /initial-scale=(\d+(\.\d+)?)/["exec"](lx["getAttribute"]("content"))
    : undefined;
  var lz = ly ? ly[0x1] : 0x1;
  lq["scorePortraitConfig"] = {
    theme: {
      window: {
        minWidth: 0xfa / lz,
        maxHeight: 0x258 / lz,
        content: { height: "100%" },
        statsContainer: {
          layout: "vertical",
          horizontalAlign: "center",
          maxHeight: 0x258,
          paddingLeft: 0x0,
          paddingRight: 0x0,
          width: "100%",
          height: "100%",
        },
        buttonsContainer: {
          paddingLeft: 0xa,
          paddingRight: 0xa,
          button: { paddingLeft: 0xf, paddingRight: 0xf },
        },
      },
    },
  };
  lq["scoreLandscapeConfig"] = {
    theme: {
      window: {
        title: { fontSize: 0x1e * lu, paddingTop: 0xa },
        stats: { height: 0x64 },
        buttonsContainer: { paddingBottom: 0x14, paddingTop: 0xa },
        description: { paddingBottom: 0x5, paddingTop: 0x5 },
      },
    },
  };
  var lA = new TDV["Quiz"](lr);
  lA["setMaxListeners"](0x32);
  if (lo === !![]) {
    lA["bind"](
      TDV["Quiz"]["EVENT_PROPERTIES_CHANGE"],
      function () {
        if (
          (lA["get"](TDV["Quiz"]["PROPERTY"]["QUESTIONS_ANSWERED"]) +
            lA["get"](TDV["Quiz"]["PROPERTY"]["ITEMS_FOUND"])) /
            (lA["get"](TDV["Quiz"]["PROPERTY"]["QUESTION_COUNT"]) +
              lA["get"](TDV["Quiz"]["PROPERTY"]["ITEM_COUNT"])) ==
          0x1
        )
          setTimeout(function () {
            lA["finish"]();
          }, 0x0);
      }["bind"](this)
    );
  }
  if (ln === !![]) {
    lA["start"]();
  }
  lq["quiz"] = lA;
  lq["quizConfig"] = lr;
  function lB(lD) {
    for (var lE = 0x0; lE < lD["length"]; ++lE) {
      var lF = lD[lE];
      if ("id" in lF) this[lF["id"]] = lF;
    }
  }
  function lC(lG) {
    for (var lH in lG) {
      var lI = lG[lH];
      if (typeof lI == "object" && lI !== null) lC["call"](this, lI);
      else if (typeof lI == "string" && lI["startsWith"]("this."))
        lG[lH] = _getObject(this, lI);
    }
  }
};
TDV["Tour"]["Script"]["getQuizTotalObjectiveProperty"] = function (lJ) {
  var lK = this["get"]("data")["quiz"];
  var lL = this["get"]("data")["quizConfig"];
  var lM = lL["objectives"];
  var lN = 0x0;
  for (var lO = 0x0, lP = lM["length"]; lO < lP; ++lO) {
    var lQ = lM[lO];
    lN += lK["getObjective"](lQ["id"], lJ);
  }
  return lN;
};
TDV["Tour"]["Script"]["_initSplitViewer"] = function (lR) {
  function lS() {
    var md = lR["get"]("actualWidth");
    m3["get"]("children")[0x0]["set"]("width", md);
    m4["get"]("children")[0x0]["set"]("width", md);
    var me = m7["get"]("left");
    var mf = typeof me == "string" ? lT(me) : me;
    mf += m7["get"]("actualWidth") * 0.5;
    m3["set"]("width", lU(mf));
    m4["set"]("width", lU(md - mf));
  }
  function lT(mg) {
    return (
      (parseFloat(mg["replace"]("%", "")) / 0x64) * lR["get"]("actualWidth")
    );
  }
  function lU(mh) {
    return (mh / lR["get"]("actualWidth")) * 0x64 + "%";
  }
  function lV(mi) {
    lW(mi["source"]);
  }
  function lW(mj) {
    var mk = mj == m9 ? m8 : m9;
    if ((ma && mj != ma) || !mj || !mk) return;
    var ml =
      mk["get"]("camera")["get"]("initialPosition")["get"]("yaw") -
      mj["get"]("camera")["get"]("initialPosition")["get"]("yaw");
    mk["setPosition"](
      mj["get"]("yaw") + ml,
      mj["get"]("pitch"),
      mj["get"]("roll"),
      mj["get"]("hfov")
    );
  }
  function lX(mm) {
    ma = mm["source"];
  }
  function lY(mn) {
    lZ(mn["source"]);
  }
  function lZ(mo) {
    var mp = mo["get"]("viewerArea");
    if (mp == m5) {
      if (m8) {
        m8["get"]("camera")["set"]("hoverFactor", mb);
      }
      m8 = mo;
      ma = m8;
      if (m8) {
        mb = m8["get"]("camera")["get"]("hoverFactor");
        m8["get"]("camera")["set"]("hoverFactor", 0x0);
      }
    } else if (mp == m6) {
      if (m9) {
        m9["get"]("camera")["set"]("hoverFactor", mc);
      }
      m9 = mo;
      ma = m8;
      if (m9) {
        mc = m9["get"]("camera")["get"]("hoverFactor");
        m9["get"]("camera")["set"]("hoverFactor", 0x0);
      }
    }
    lW(mo);
  }
  function m0(mq) {
    var mr = this["getCurrentPlayers"]();
    var ms = mr["length"];
    while (ms-- > 0x0) {
      var mu = mr[ms];
      if (mu["get"]("viewerArea") != mq) {
        mr["splice"](ms, 0x1);
      }
    }
    for (ms = 0x0; ms < mr["length"]; ++ms) {
      var mu = mr[ms];
      mu["bind"]("preloadMediaShow", lY, this);
      mu["bind"]("cameraPositionChange", lV, this);
      mu["bind"]("userInteractionStart", lX, this);
      if (mu["get"]("panorama")) lZ(mu);
    }
    return mr;
  }
  function m1(mv) {
    lZ(this["getActivePlayerWithViewer"](mv["source"]));
    lW(ma);
  }
  var m2 = lR["get"]("children");
  var m3 = m2[0x0];
  var m4 = m2[0x1];
  var m5 = m3["get"]("children")[0x0];
  var m6 = m4["get"]("children")[0x0];
  var m7 = m2[0x2];
  var m8, m9, ma;
  var mb, mc;
  m0["call"](this, m5);
  m0["call"](this, m6);
  m5["bind"]("mouseDown", m1, this);
  m6["bind"]("mouseDown", m1, this);
  lR["bind"](
    "resize",
    function () {
      m7["set"](
        "left",
        (lR["get"]("actualWidth") - m7["get"]("actualWidth")) * 0.5
      );
      lS();
    },
    this
  );
  m7["bind"](
    "mouseDown",
    function (mw) {
      var mx = mw["pageX"];
      var my = function (mz) {
        var mA = mz["pageX"];
        var mB = mx - mA;
        var mC = lR["get"]("actualWidth");
        var mD = m7["get"]("left");
        var mE = (typeof mD == "string" ? lT(mD) : mD) - mB;
        if (mE < 0x0) {
          mA -= mE;
          mE = 0x0;
        } else if (mE + m7["get"]("actualWidth") >= mC) {
          mA -= mE - (mC - m7["get"]("actualWidth"));
          mE = mC - m7["get"]("actualWidth");
        }
        m7["set"]("left", mE);
        lS();
        mx = mA;
      };
      this["bind"]("mouseMove", my, this);
      this["bind"](
        "mouseUp",
        function () {
          this["unbind"]("mouseMove", my, this);
        },
        this
      );
    },
    this
  );
  lS();
};
TDV["Tour"]["Script"]["_initTwinsViewer"] = function (mF) {
  function mG() {
    var n1 = mF["get"]("actualWidth");
    mR["get"]("children")[0x0]["set"]("width", n1);
    mS["get"]("children")[0x0]["set"]("width", n1);
    var n2 = mV["get"]("left");
    var n3 = typeof n2 == "string" ? mH(n2) : n2;
    n3 += mV["get"]("actualWidth") * 0.5;
    mR["set"]("width", mI(n3));
    mS["set"]("width", mI(n1 - n3));
  }
  function mH(n4) {
    return (
      (parseFloat(n4["replace"]("%", "")) / 0x64) * mF["get"]("actualWidth")
    );
  }
  function mI(n5) {
    return (n5 / mF["get"]("actualWidth")) * 0x64 + "%";
  }
  function mJ(n6) {
    mK(n6["source"]);
  }
  function mK(n7) {
    var n8 = n7 == mX ? mW : mX;
    if ((mY && n7 != mY) || !n7 || !n8) return;
    var n9 =
      n8["get"]("camera")["get"]("initialPosition")["get"]("yaw") -
      n7["get"]("camera")["get"]("initialPosition")["get"]("yaw");
    n8["setPosition"](
      n7["get"]("yaw") + n9,
      n7["get"]("pitch"),
      n7["get"]("roll"),
      n7["get"]("hfov")
    );
  }
  function mL(na) {
    mY = na["source"];
  }
  function mM(nb) {
    mN(nb["source"]);
  }
  function mN(nc) {
    var nd = nc["get"]("viewerArea");
    if (nd == mT) {
      if (mW) {
        mW["get"]("camera")["set"]("hoverFactor", mZ);
      }
      mW = nc;
      mY = mW;
      if (mW) {
        mZ = mW["get"]("camera")["get"]("hoverFactor");
        mW["get"]("camera")["set"]("hoverFactor", 0x0);
      }
    } else if (nd == mU) {
      if (mX) {
        mX["get"]("camera")["set"]("hoverFactor", n0);
      }
      mX = nc;
      mY = mW;
      if (mX) {
        n0 = mX["get"]("camera")["get"]("hoverFactor");
        mX["get"]("camera")["set"]("hoverFactor", 0x0);
      }
    }
    mK(nc);
  }
  function mO(ne) {
    var nf = this["getCurrentPlayers"]();
    var ng = nf["length"];
    while (ng-- > 0x0) {
      var ni = nf[ng];
      if (ni["get"]("viewerArea") != ne) {
        nf["splice"](ng, 0x1);
      }
    }
    for (ng = 0x0; ng < nf["length"]; ++ng) {
      var ni = nf[ng];
      ni["bind"]("preloadMediaShow", mM, this);
      ni["bind"]("cameraPositionChange", mJ, this);
      ni["bind"]("userInteractionStart", mL, this);
      if (ni["get"]("panorama")) mN(ni);
    }
    return nf;
  }
  function mP(nj) {
    mN(this["getActivePlayerWithViewer"](nj["source"]));
    mK(mY);
  }
  var mQ = mF["get"]("children");
  var mR = mQ[0x0];
  var mS = mQ[0x1];
  var mT = mR["get"]("children")[0x0];
  var mU = mS["get"]("children")[0x0];
  var mV = mQ[0x2];
  var mW, mX, mY;
  var mZ, n0;
  mO["call"](this, mT);
  mO["call"](this, mU);
  mT["bind"]("mouseDown", mP, this);
  mU["bind"]("mouseDown", mP, this);
  mF["bind"](
    "resize",
    function () {
      mV["set"](
        "left",
        (mF["get"]("actualWidth") - mV["get"]("actualWidth")) * 0.5
      );
      mG();
    },
    this
  );
  mG();
};
TDV["Tour"]["Script"]["isCardboardViewMode"] = function () {
  var nk = this["getByClassName"]("PanoramaPlayer");
  return nk["length"] > 0x0 && nk[0x0]["get"]("viewMode") == "cardboard";
};
TDV["Tour"]["Script"]["isPanorama"] = function (nl) {
  return (
    ["Panorama", "HDRPanorama", "LivePanorama", "Video360", "VideoPanorama"][
      "indexOf"
    ](nl["get"]("class")) != -0x1
  );
};
TDV["Tour"]["Script"]["keepCompVisible"] = function (nm, nn) {
  var no = "keepVisibility_" + nm["get"]("id");
  var np = this["getKey"](no);
  if (np == undefined && nn) {
    this["registerKey"](no, nn);
  } else if (np != undefined && !nn) {
    this["unregisterKey"](no);
  }
};
TDV["Tour"]["Script"]["_initItemWithComps"] = function (
  nq,
  nr,
  ns,
  nt,
  nu,
  nv,
  nw,
  nx
) {
  var ny = nq["get"]("items")[nr];
  var nz = ny["get"]("media");
  var nA = nz["get"]("loop") == undefined || nz["get"]("loop");
  var nB = nx > 0x0;
  var nC = this["rootPlayer"];
  var nD = function (nL) {
    var nM = nv ? nv["get"]("class") : undefined;
    var nN = undefined;
    switch (nM) {
      case "FadeInEffect":
      case "FadeOutEffect":
        nN = nC["createInstance"](nL ? "FadeInEffect" : "FadeOutEffect");
        break;
      case "SlideInEffect":
      case "SlideOutEffect":
        nN = nC["createInstance"](nL ? "SlideInEffect" : "SlideOutEffect");
        break;
    }
    if (nN) {
      nN["set"]("duration", nv["get"]("duration"));
      nN["set"]("easing", nv["get"]("easing"));
      if (nM["indexOf"]("Slide") != -0x1)
        nN["set"](
          nL ? "from" : "to",
          nv["get"](nv["get"]("class") == "SlideInEffect" ? "from" : "to")
        );
    }
    return nN;
  };
  var nE = function () {
    for (var nO = 0x0, nP = ns["length"]; nO < nP; ++nO) {
      var nQ = ns[nO];
      if (nx > 0x0) {
        this["setComponentVisibility"](nQ, !nu, 0x0, nD(!nu));
      } else {
        var nR = "visibility_" + nQ["get"]("id");
        if (this["existsKey"](nR)) {
          if (this["getKey"](nR))
            this["setComponentVisibility"](nQ, !![], 0x0, nD(!![]));
          else this["setComponentVisibility"](nQ, ![], 0x0, nD(![]));
          this["unregisterKey"](nR);
        }
      }
    }
    ny["unbind"]("end", nE, this);
    if (!nA) nz["unbind"]("end", nE, this);
  };
  var nF = function () {
    ny["unbind"]("stop", nF, this, !![]);
    ny["unbind"]("stop", nF, this);
    ny["unbind"]("begin", nF, this, !![]);
    ny["unbind"]("begin", nF, this);
    for (var nS = 0x0, nT = ns["length"]; nS < nT; ++nS) {
      this["keepCompVisible"](ns[nS], ![]);
    }
  };
  var nG = function (nU, nV, nW) {
    var nX = function () {
      var nY = function (o2, o3, o4) {
        nC["setComponentVisibility"](
          o2,
          o3,
          nV,
          o4,
          o3 ? "showEffect" : "hideEffect",
          ![]
        );
        if (nW > 0x0) {
          var o5 = nV + nW + (o4 != undefined ? o4["get"]("duration") : 0x0);
          nC["setComponentVisibility"](
            o2,
            !o3,
            o5,
            nD(!o3),
            o3 ? "hideEffect" : "showEffect",
            !![]
          );
        }
      };
      for (var nZ = 0x0, o0 = ns["length"]; nZ < o0; ++nZ) {
        var o1 = ns[nZ];
        if (nu == "toggle") {
          if (!o1["get"]("visible")) nY(o1, !![], nD(!![]));
          else nY(o1, ![], nD(![]));
        } else {
          nY(o1, nu, nD(nu));
        }
      }
      ny["unbind"](nU, nX, this);
      if (nU == "end" && !nA) nz["unbind"](nU, nX, this);
    };
    ny["bind"](nU, nX, this);
    if (nU == "end" && !nA) nz["bind"](nU, nX, this);
  };
  if (nt == "begin") {
    for (var nH = 0x0, nI = ns["length"]; nH < nI; ++nH) {
      var nJ = ns[nH];
      this["keepCompVisible"](nJ, !![]);
      if (nB) {
        var nK = "visibility_" + nJ["get"]("id");
        this["registerKey"](nK, nJ["get"]("visible"));
      }
    }
    ny["bind"]("stop", nF, this, !![]);
    ny["bind"]("stop", nF, this);
    ny["bind"]("begin", nF, this, !![]);
    ny["bind"]("begin", nF, this);
    if (nB) {
      ny["bind"]("end", nE, this);
      if (!nA) nz["bind"]("end", nE, this);
    }
  } else if (nt == "end" && nx > 0x0) {
    nG("begin", nx, 0x0);
    nx = 0x0;
  }
  if (nt != undefined) nG(nt, nw, nx);
};
TDV["Tour"]["Script"]["loadFromCurrentMediaPlayList"] = function (o6, o7, o8) {
  var o9 = o6["get"]("selectedIndex");
  var oa = o6["get"]("items")["length"];
  var ob = (o9 + o7) % oa;
  while (ob < 0x0) {
    ob = oa + ob;
  }
  if (o9 != ob) {
    if (o8) {
      var oc = o6["get"]("items")[ob];
      this["skip3DTransitionOnce"](oc["get"]("player"));
    }
    o6["set"]("selectedIndex", ob);
  }
};
TDV["Tour"]["Script"]["mixObject"] = function (od, oe) {
  return this["assignObjRecursively"](oe, this["copyObjRecursively"](od));
};
TDV["Tour"]["Script"]["downloadFile"] = function (of) {
  if (
    (navigator["userAgent"]["toLowerCase"]()["indexOf"]("chrome") > -0x1 ||
      navigator["userAgent"]["toLowerCase"]()["indexOf"]("safari") > -0x1) &&
    !/(iP)/g["test"](navigator["userAgent"])
  ) {
    var og = document["createElement"]("a");
    og["href"] = of;
    og["setAttribute"]("target", "_blank");
    if (og["download"] !== undefined) {
      var oh = of["substring"](of["lastIndexOf"]("/") + 0x1, of["length"]);
      og["download"] = oh;
    }
    if (document["createEvent"]) {
      var oi = document["createEvent"]("MouseEvents");
      oi["initEvent"]("click", !![], !![]);
      og["dispatchEvent"](oi);
      return;
    }
  }
  window["open"](of, "_blank");
};
TDV["Tour"]["Script"]["openLink"] = function (oj, ok) {
  if (!oj || oj == location["href"]) {
    return;
  }
  if (!ok) ok = "_blank";
  if (ok == "_top" || ok == "_self") {
    this["updateDeepLink"]({
      includeCurrentView: !![],
      includeCurrentVisibleHotspots: !![],
      includeCurrentMeasureModel3DObjects: !![],
      setHash: !![],
    });
  }
  var ol =
    (window &&
      window["process"] &&
      window["process"]["versions"] &&
      window["process"]["versions"]["electron"]) ||
    (navigator &&
      navigator["userAgent"] &&
      navigator["userAgent"]["indexOf"]("Electron") >= 0x0);
  if (ol && ok == "_blank") {
    if (oj["startsWith"]("files/")) {
      oj = "/" + oj;
    }
    if (oj["startsWith"]("//")) {
      oj = "https:" + oj;
    } else if (oj["startsWith"]("/")) {
      var om = window["location"]["href"]["split"]("/");
      om["pop"]();
      oj = om["join"]("/") + oj;
    }
    var on = oj["split"](".")["pop"]()["toLowerCase"]();
    if (
      (["pdf", "zip", "xls", "xlsx"]["indexOf"](on) == -0x1 ||
        oj["startsWith"]("file://")) &&
      window["hasOwnProperty"]("require")
    ) {
      var oo = window["require"]("electron")["shell"];
      oo["openExternal"](oj);
    } else {
      window["open"](oj, ok);
    }
  } else if (ol && (ok == "_top" || ok == "_self")) {
    window["location"] = oj;
  } else {
    var op = this["get"]("data")["tour"];
    if (op["isMobileApp"]() && op["isIOS"]()) oj = "blank:" + oj;
    var oq = window["open"](oj, ok);
    oq["focus"]();
  }
};
TDV["Tour"]["Script"]["startPanoramaWithModel"] = function (or, os) {
  var ot = or["get"]("media");
  var ou = _findLocationWithPanorama["call"](this, ot);
  if (!ou) {
    os["call"](this);
    return;
  }
  var ov = ou["get"]("model");
  var ow = or["get"]("player")["get"]("viewerArea");
  var oy = this["getActivePlayersWithViewer"](ow);
  var oA =
    oy["length"] == 0x1
      ? oy["find"](
          function (oH) {
            return this["getMediaFromPlayer"](oH) == ov;
          }["bind"](this)
        )
      : undefined;
  if (oA) {
    os["call"](this);
  } else {
    var oy = _getPlayersWithViewer["call"](this, ow);
    var oA = oy["find"](function (oI) {
      return oI["get"]("class") == "Model3DPlayer";
    });
    var oB, oC;
    if (!oA) {
      oA = this["createInstance"]("Model3DPlayer");
      oA["set"]("viewerArea", ow);
    } else {
      var oD = this["getByClassName"]("Model3DPlayListItem");
      oB = oD["find"](
        function (oJ) {
          return oJ["get"]("player") == oA;
        }["bind"](this)
      );
    }
    if (!oB) {
      oB = this["createInstance"]("Model3DPlayListItem");
      oB["set"]("player", oA);
      _initModel3DItem["call"](this, oB);
    }
    oB["set"]("media", ov);
    var oE = ou["get"]("forceModelLoading");
    ou["set"]("forceModelLoading", !![]);
    var oF = function () {
      oB["unbind"]("begin", oF, this);
      os["call"](this);
    };
    var oG = function () {
      or["unbind"]("begin", oG, this);
      ou["set"]("forceModelLoading", oE);
      if (oC) this["disposeInstance"](oC);
    };
    or["bind"]("begin", oG, this);
    if (oB["get"]("state") == "playing") oF["call"](this);
    else {
      oB["bind"]("begin", oF, this);
      oC = this["createInstance"]("PlayList");
      oC["set"]("items", [oB]);
      oC["set"]("selectedIndex", 0x0);
    }
  }
};
TDV["Tour"]["Script"]["pauseCurrentPlayers"] = function (oK) {
  var oL = this["getCurrentPlayers"]();
  var oM = oL["length"];
  while (oM-- > 0x0) {
    var oN = oL[oM];
    if (
      oN["get"]("state") == "playing" ||
      (oN["get"]("data") && oN["get"]("data")["playing"]) ||
      (oN["get"]("viewerArea") &&
        oN["get"]("viewerArea")["get"]("id") == this["getMainViewer"]()) ||
      (oN["get"]("camera") &&
        oN["get"]("camera")["get"]("idleSequence") &&
        oN["get"]("camera")["get"]("timeToIdle") > 0x0 &&
        oN["get"]("state") == "playing") ||
      (oN["get"]("class") == "Model3DPlayer" &&
        oN["get"]("model") &&
        oN["get"]("model")["get"]("camera")["get"]("state") == "playing")
    ) {
      var oO = this["getMediaFromPlayer"](oN);
      if (oK && oO && oO["get"]("class") != "Video360" && "pauseCamera" in oN) {
        oN["pauseCamera"]();
      } else {
        oN["pause"]();
      }
    } else {
      oL["splice"](oM, 0x1);
    }
  }
  return oL;
};
TDV["Tour"]["Script"]["pauseGlobalAudiosWhilePlayItem"] = function (
  oP,
  oQ,
  oR
) {
  var oS = function () {
    if (oP["get"]("selectedIndex") != oQ) {
      this["resumeGlobalAudios"]();
    }
  };
  this["pauseGlobalAudios"](oR, !![]);
  this["executeFunctionWhenChange"](oP, oQ, oS, oS);
};
TDV["Tour"]["Script"]["pauseGlobalAudios"] = function (oT, oU) {
  this["stopTextToSpeech"]();
  if (window["pausedAudiosLIFO"] == undefined) window["pausedAudiosLIFO"] = [];
  var oV = this["getByClassName"]("VideoPanoramaOverlay");
  oV = oV["concat"](this["getByClassName"]("QuadVideoPanoramaOverlay"));
  for (var oX = oV["length"] - 0x1; oX >= 0x0; --oX) {
    var oY = oV[oX];
    if (oY["get"]("video")["get"]("hasAudio") == ![]) oV["splice"](oX, 0x1);
  }
  var oZ = this["getByClassName"]("Audio")["concat"](oV);
  var p0 = {};
  if (window["currentGlobalAudios"] != undefined)
    oZ = oZ["concat"](
      Object["values"](window["currentGlobalAudios"])["map"](function (p4) {
        if (!p4["allowResume"]) p0[p4["audio"]["get"]("id")] = p4["audio"];
        return p4["audio"];
      })
    );
  var p1 = [];
  for (var oX = 0x0, p2 = oZ["length"]; oX < p2; ++oX) {
    var p3 = oZ[oX];
    if (
      p3 &&
      p3["get"]("state") == "playing" &&
      (oT == undefined || oT["indexOf"](p3) == -0x1)
    ) {
      if (p3["get"]("id") in p0) {
        p3["stop"]();
      } else {
        p3["pause"]();
        p1["push"](p3);
      }
    }
  }
  if (oU || p1["length"] > 0x0) window["pausedAudiosLIFO"]["push"](p1);
  return p1;
};
TDV["Tour"]["Script"]["resumeGlobalAudios"] = function () {
  if (window["pausedAudiosLIFO"] == undefined) return;
  if (window["resumeAudiosBlocked"]) {
    if (window["pausedAudiosLIFO"]["length"] > 0x1) {
      window["pausedAudiosLIFO"][window["pausedAudiosLIFO"]["length"] - 0x2] =
        window["pausedAudiosLIFO"][window["pausedAudiosLIFO"]["length"] - 0x2][
          "concat"
        ](
          window["pausedAudiosLIFO"][window["pausedAudiosLIFO"]["length"] - 0x1]
        );
      window["pausedAudiosLIFO"]["splice"](
        window["pausedAudiosLIFO"]["length"] - 0x1,
        0x1
      );
    }
    return;
  }
  var p5 = window["pausedAudiosLIFO"]["pop"]();
  if (!p5) return;
  for (var p6 = 0x0, p7 = p5["length"]; p6 < p7; ++p6) {
    var p8 = p5[p6];
    if (p8["get"]("state") == "paused") p8["play"]();
  }
};
TDV["Tour"]["Script"]["pauseGlobalAudio"] = function (p9) {
  var pa = window["currentGlobalAudios"];
  if (pa) {
    var pb = pa[p9["get"]("id")];
    if (pb) p9 = pb["audio"];
  }
  if (p9["get"]("state") == "playing") p9["pause"]();
};
TDV["Tour"]["Script"]["playAudioList"] = function (pc, pd) {
  if (pc["length"] == 0x0) return;
  if (pc["length"] == 0x1 && pd) {
    var pe = pc[0x0];
    pe["set"]("loop", !![]);
    this["playGlobalAudio"](pe, !![], null, !![]);
  } else {
    var pf = -0x1;
    var pg;
    var ph = this["playGlobalAudio"];
    var pi = function () {
      if (++pf >= pc["length"]) {
        if (!pd) return;
        pf = 0x0;
      }
      pg = pc[pf];
      ph(pg, !![], pi, !![]);
    };
    pi();
  }
};
TDV["Tour"]["Script"]["playGlobalAudioWhilePlayActiveMedia"] = function (
  pj,
  pk,
  pl,
  pm
) {
  var pn = this["getActiveMediaWithViewer"](this["getMainViewer"]());
  var po = this["getFirstPlayListWithMedia"](pn, !![]);
  var pp = this["getPlayListItemByMedia"](po, pn);
  var pq = po["get"]("items")["indexOf"](pp);
  return this["playGlobalAudioWhilePlay"](po, pq, pj, pk, pl, pm);
};
TDV["Tour"]["Script"]["playGlobalAudioWhilePlay"] = function (
  pr,
  ps,
  pt,
  pu,
  pv,
  pw
) {
  var px = function (pG) {
    if (pG["data"]["previousSelectedIndex"] == ps) {
      this["stopGlobalAudio"](pt);
      if (pB) {
        var pH = pA["get"]("media");
        var pI = pH["get"]("audios");
        pI["splice"](pI["indexOf"](pt), 0x1);
        pH["set"]("audios", pI);
      }
      pr["unbind"]("change", px, this);
      if (pv) pv();
    }
  };
  var pz = window["currentGlobalAudios"];
  if (pz && pt["get"]("id") in pz) {
    pt = pz[pt["get"]("id")]["audio"];
    if (pt["get"]("state") != "playing") {
      pt["play"]();
    }
    return pt;
  }
  pr["bind"]("change", px, this);
  var pA = pr["get"]("items")[ps];
  var pB = pA["get"]("class") == "PanoramaPlayListItem";
  if (pB) {
    var pC = pA["get"]("media");
    var pz = (pC["get"]("audios") || [])["slice"]();
    if (pt["get"]("class") == "MediaAudio") {
      var pD = this["rootPlayer"]["createInstance"]("PanoramaAudio");
      pD["set"]("autoplay", ![]);
      pD["set"]("audio", pt["get"]("audio"));
      pD["set"]("loop", pt["get"]("loop"));
      pD["set"]("id", pt["get"]("id"));
      this["cloneBindings"](pt, pD, "start");
      this["cloneBindings"](pt, pD, "end");
      this["cloneBindings"](pt, pD, "stateChange");
      pt = pD;
    }
    pz["push"](pt);
    pC["set"]("audios", pz);
  }
  var pE = this["playGlobalAudio"](pt, pu, function () {
    pr["unbind"]("change", px, this);
    if (pv) pv["call"](this);
  });
  if (pw === !![]) {
    var pF = function () {
      if (pE["get"]("state") == "playing") {
        this["pauseGlobalAudios"]([pE], !![]);
      } else if (pE["get"]("state") == "stopped") {
        this["resumeGlobalAudios"]();
        pE["unbind"]("stateChange", pF, this);
      }
    };
    pE["bind"]("stateChange", pF, this);
  }
  return pE;
};
TDV["Tour"]["Script"]["playGlobalAudio"] = function (pJ, pK, pL, pM) {
  var pN = function () {
    pJ["unbind"]("end", pN, this);
    this["stopGlobalAudio"](pJ);
    if (pL) pL["call"](this);
  };
  pJ = this["getGlobalAudio"](pJ);
  var pO = window["currentGlobalAudios"];
  if (!pO) {
    pO = window["currentGlobalAudios"] = {};
  }
  pO[pJ["get"]("id")] = { audio: pJ, asBackground: pM || ![], allowResume: pK };
  if (pJ["get"]("state") == "playing") {
    return pJ;
  }
  if (!pJ["get"]("loop")) {
    pJ["bind"]("end", pN, this);
  }
  pJ["play"]();
  return pJ;
};
TDV["Tour"]["Script"]["restartTourWithoutInteraction"] = function (pP) {
  var pQ = -0x1;
  this["bind"]("userInteraction", pR["bind"](this), this);
  pR();
  function pR() {
    if (pQ != -0x1) clearTimeout(pQ);
    pQ = setTimeout(
      function () {
        var pS = this["get"]("data")["tour"];
        if (pS) {
          if (this["isCardboardViewMode"]()) location["reload"]();
          else pS["reload"]();
        }
      }["bind"](this),
      pP * 0x3e8
    );
  }
};
TDV["Tour"]["Script"]["resumePlayers"] = function (pT, pU) {
  for (var pV = 0x0; pV < pT["length"]; ++pV) {
    var pW = pT[pV];
    var pX = this["getMediaFromPlayer"](pW);
    if (!pX) continue;
    if (pU && pX["get"]("class") != "Video360" && "pauseCamera" in pW) {
      pW["resumeCamera"]();
    } else if (pW["get"]("state") != "playing") {
      var pY = pW["get"]("data");
      if (!pY) {
        pY = {};
        pW["set"]("data", pY);
      }
      pY["playing"] = !![];
      var pZ = function () {
        if (pW["get"]("state") == "playing") {
          delete pY["playing"];
          pW["unbind"]("stateChange", pZ, this);
        }
      };
      pW["bind"]("stateChange", pZ, this);
      pW["play"]();
    }
  }
};
TDV["Tour"]["Script"]["stopGlobalAudios"] = function (q0) {
  var q1 = window["currentGlobalAudios"];
  var q2 = this;
  if (q1) {
    Object["keys"](q1)["forEach"](function (q3) {
      var q4 = q1[q3];
      if (!q0 || (q0 && !q4["asBackground"])) {
        q2["stopGlobalAudio"](q4["audio"]);
      }
    });
  }
};
TDV["Tour"]["Script"]["stopGlobalAudio"] = function (q5) {
  var q6 = window["currentGlobalAudios"];
  if (q6) {
    var q7 = q6[q5["get"]("id")];
    if (q7) {
      q5 = q7["audio"];
      delete q6[q5["get"]("id")];
      if (Object["keys"](q6)["length"] == 0x0) {
        window["currentGlobalAudios"] = undefined;
      }
    }
  }
  if (q5) q5["stop"]();
};
TDV["Tour"]["Script"]["setCameraSameSpotAsMedia"] = function (q8, q9) {
  var qa = this["getCurrentPlayerWithMedia"](q9);
  if (qa != undefined) {
    var qb = q8["get"]("initialPosition");
    qb["set"]("yaw", qa["get"]("yaw"));
    qb["set"]("pitch", qa["get"]("pitch"));
    qb["set"]("hfov", qa["get"]("hfov"));
  }
};
TDV["Tour"]["Script"]["setComponentVisibility"] = function (
  qc,
  qd,
  qe,
  qf,
  qg,
  qh
) {
  var qi = this["getKey"]("keepVisibility_" + qc["get"]("id"));
  if (qi) return;
  this["unregisterKey"]("visibility_" + qc["get"]("id"));
  var qj = function () {
    if (qg) {
      qc["set"](qg, qf);
    }
    qc["set"]("visible", qd);
    if (qc["get"]("class") == "ViewerArea") {
      try {
        if (qd) qc["restart"]();
        else if (qc["get"]("playbackState") == "playing") qc["pause"]();
      } catch (qo) {}
    }
  };
  var qk = "effectTimeout_" + qc["get"]("id");
  if (!qh && window["hasOwnProperty"](qk)) {
    var qm = window[qk];
    if (qm instanceof Array) {
      for (var qn = 0x0; qn < qm["length"]; qn++) {
        clearTimeout(qm[qn]);
      }
    } else {
      clearTimeout(qm);
    }
    delete window[qk];
  } else if (qd == qc["get"]("visible") && !qh) return;
  if (qe && qe > 0x0) {
    var qm = setTimeout(function () {
      if (window[qk] instanceof Array) {
        var qp = window[qk];
        var qq = qp["indexOf"](qm);
        qp["splice"](qq, 0x1);
        if (qp["length"] == 0x0) {
          delete window[qk];
        }
      } else {
        delete window[qk];
      }
      qj();
    }, qe);
    if (window["hasOwnProperty"](qk)) {
      window[qk] = [window[qk], qm];
    } else {
      window[qk] = qm;
    }
  } else {
    qj();
  }
};
TDV["Tour"]["Script"]["setDirectionalPanoramaAudio"] = function (
  qr,
  qs,
  qt,
  qu
) {
  qr["set"]("yaw", qs);
  qr["set"]("pitch", qt);
  qr["set"]("maximumAngle", qu);
};
TDV["Tour"]["Script"]["setLocale"] = function (qv) {
  this["stopTextToSpeech"]();
  var qw = this["get"]("data")["localeManager"];
  if (qw) this["get"]("data")["localeManager"]["setLocale"](qv);
  else {
    this["get"]("data")["defaultLocale"] = qv;
    this["get"]("data")["forceDefaultLocale"] = !![];
  }
};
TDV["Tour"]["Script"]["setEndToItemIndex"] = function (qx, qy, qz) {
  var qA = function () {
    if (qx["get"]("selectedIndex") == qy) {
      var qB = qx["get"]("items")[qz];
      this["skip3DTransitionOnce"](qB["get"]("player"));
      qx["set"]("selectedIndex", qz);
    }
  };
  this["executeFunctionWhenChange"](qx, qy, qA);
};
TDV["Tour"]["Script"]["setMapLocation"] = function (qC, qD) {
  var qE = function () {
    qC["unbind"]("stop", qE, this);
    qF["set"]("mapPlayer", null);
  };
  qC["bind"]("stop", qE, this);
  var qF = qC["get"]("player");
  qF["set"]("mapPlayer", qD);
};
TDV["Tour"]["Script"]["setMainMediaByIndex"] = function (qG) {
  var qH = undefined;
  if (qG >= 0x0 && qG < this["mainPlayList"]["get"]("items")["length"]) {
    qH = this["mainPlayList"]["get"]("items")[qG];
    var qI = qH["get"]("media");
    var qJ =
      qI["get"]("class")["indexOf"]("Panorama") != -0x1
        ? _findLocationWithPanorama["call"](this, qI)
        : null;
    if (qJ) {
      this["startPanoramaWithModel"]["call"](
        this,
        qH,
        function () {
          this["mainPlayList"]["set"]("selectedIndex", qG);
        }["bind"](this)
      );
    } else {
      this["mainPlayList"]["set"]("selectedIndex", qG);
    }
  }
  return qH;
};
TDV["Tour"]["Script"]["setMainMediaByName"] = function (qK) {
  var qL = this["getMainViewer"]();
  var qM = this["_getPlayListsWithViewer"](qL);
  for (var qN = 0x0, qO = qM["length"]; qN < qO; ++qN) {
    var qP = qM[qN];
    var qQ = qP["get"]("items");
    for (var qR = 0x0, qS = qQ["length"]; qR < qS; ++qR) {
      var qT = qQ[qR];
      var qU = qT["get"]("media")["get"]("data");
      if (
        qU !== undefined &&
        qU["label"] == qK &&
        qT["get"]("player")["get"]("viewerArea") == qL
      ) {
        qP["set"]("selectedIndex", qR);
        return qT;
      }
    }
  }
};
TDV["Tour"]["Script"]["executeAudioAction"] = function (
  qV,
  qW,
  qX,
  qY,
  qZ,
  r0
) {
  if (qV["length"] == 0x0) return;
  var r1, r2;
  var r3 = this["getMainViewer"]();
  if (qX && !(qX === !![])) {
    var r4 = this["getPlayListsWithMedia"](qX);
    for (var r5 = 0x0; r5 < r4["length"]; ++r5) {
      var r6 = r4[r5];
      var r8 = this["getPlayListItemByMedia"](r6, qX);
      if (
        r8 &&
        r8["get"]("player") &&
        r8["get"]("player")["get"]("viewerArea") == r3
      ) {
        r1 = r6;
        r2 = r1["get"]("items")["indexOf"](r8);
        break;
      }
    }
    if (!r1 && r4["length"] > 0x0) {
      r1 = r4[0x0];
      r2 = this["getPlayListItemIndexByMedia"](r1, qX);
    }
    if (!r1) qX = !![];
  }
  if (qX === !![]) {
    var r9 = this["getActiveMediaWithViewer"](r3);
    if (r9) {
      r1 = this["getFirstPlayListWithMedia"](r9, !![]);
      var r8 = this["getPlayListItemByMedia"](r1, r9);
      r2 = r1["get"]("items")["indexOf"](r8);
    } else {
      qX = null;
    }
  }
  var ra = [];
  var rb = function () {
    var rj = ra["concat"]();
    var rk = ![];
    var rl = function (ro) {
      var rp = ro["source"]["get"]("state");
      if (rp == "playing") {
        if (!rk) {
          rk = !![];
          this["pauseGlobalAudios"](ra, !![]);
        }
      } else if (rp == "stopped") {
        rj["splice"](rj["indexOf"](ro["source"]), 0x1);
        if (rj["length"] == 0x0) {
          this["resumeGlobalAudios"]();
        }
        ro["source"]["unbind"]("stateChange", rl, this);
      }
    }["bind"](this);
    for (var rm = 0x0, rn = ra["length"]; rm < rn; ++rm) {
      ra[rm]["bind"]("stateChange", rl, this);
    }
  }["bind"](this);
  var rc = function () {
    for (var rq = 0x0, rr = qV["length"]; rq < rr; ++rq) {
      var rs = qV[rq];
      ra["push"](this["playGlobalAudio"](rs, qY));
    }
    if (qZ) rb();
  }["bind"](this);
  var rd = function () {
    for (var rt = 0x0, ru = qV["length"]; rt < ru; ++rt) {
      var rv = qV[rt];
      ra["push"](this["playGlobalAudioWhilePlay"](r1, r2, rv, qY));
    }
    if (qZ) rb();
  }["bind"](this);
  var re = function () {
    for (var rw = 0x0, rx = qV["length"]; rw < rx; ++rw) {
      this["pauseGlobalAudio"](qV[rw]);
    }
  }["bind"](this);
  var rf = function () {
    for (var ry = 0x0, rz = qV["length"]; ry < rz; ++ry) {
      this["stopGlobalAudio"](qV[ry]);
    }
  }["bind"](this);
  var rg = function () {
    for (var rA = 0x0, rB = qV["length"]; rA < rB; ++rA) {
      if (this["getGlobalAudio"](qV[rA])["get"]("state") == "playing")
        return !![];
    }
    return ![];
  }["bind"](this);
  if (qW == "playPause" || qW == "playStop") {
    if (rg()) {
      if (qW == "playPause") {
        re();
      } else if (qW == "playStop") {
        rf();
      }
    } else {
      if (qZ) {
        if (qW == "playStop") {
          this["stopGlobalAudios"](!![]);
        }
      }
      if (r1) {
        rd();
      } else {
        rc();
      }
    }
  } else if (qW == "play" || qW == "forcePlay") {
    if (qW == "forcePlay") rf();
    if (r1 || qX === !![]) {
      if (r0) {
        var rh = r1
          ? r1["get"]("items")[r2]["get"]("player")
          : this["getActivePlayerWithViewer"](this["getMainViewer"]());
        if (rh && rh["pauseCamera"]) {
          var ri = qV["concat"]();
          endCallback = function (rC) {
            ri["splice"](ri["indexOf"](rC), 0x1);
            if (ri["length"] == 0x0) rh["resumeCamera"]();
          }["bind"](this);
          rh["pauseCamera"]();
        }
      }
      rd();
    } else {
      rc();
    }
  } else if (qW == "stop") {
    rf();
  } else if (qW == "pause") {
    re();
  }
};
TDV["Tour"]["Script"]["executeAudioActionByTags"] = function (
  rD,
  rE,
  rF,
  rG,
  rH,
  rI,
  rJ
) {
  var rK = this["getAudioByTags"](rD, rE);
  this["executeAudioAction"](rK, rF, rG, rH, rI, rJ);
};
TDV["Tour"]["Script"]["setPlayListSelectedIndex"] = function (rL, rM) {
  var rN = rL["get"]("items")[rM];
  var rO = rN["get"]("player");
  var rP = rO["get"]("viewerArea");
  var rQ = this["getByClassName"]("PlayList");
  for (var rR of rQ) {
    if (rR == rL) continue;
    var rS = rR["get"]("selectedIndex");
    if (rS != -0x1) {
      var rT = rR["get"]("items")[rS];
      var rU = rT["get"]("player");
      if (
        rU &&
        rU != rO &&
        rU["get"]("class") != "Model3DPlayer" &&
        rU["get"]("viewerArea") == rP
      )
        rR["set"]("selectedIndex", -0x1);
    }
  }
  rL["set"]("selectedIndex", rM);
};
TDV["Tour"]["Script"]["setMediaBehaviour"] = function (rV, rW, rX, rY) {
  var rZ = this;
  var s0 = function (sn) {
    if (sn["data"]["state"] == "stopped" && rY) {
      s4["call"](this, !![]);
    }
  };
  var s1 = function () {
    sa["unbind"]("begin", s1, rZ);
    var so = sa["get"]("media");
    var sp = so["get"]("class");
    if (
      (sp != "Panorama" && sp != "Model3D") ||
      (so["get"]("camera") != undefined &&
        so["get"]("camera")["get"]("initialSequence") != undefined)
    ) {
      sb["bind"]("stateChange", s0, rZ);
    }
  };
  var s2 = function () {
    var sq = s7["get"]("selectedIndex");
    if (sq != -0x1) {
      s9 = sq;
      s4["call"](this, ![]);
    }
  };
  var s3 = function () {
    s4["call"](this, ![]);
  };
  var s4 = function (sr) {
    if (!s7) return;
    var ss = sa["get"]("media");
    if (
      (ss["get"]("class") == "Video360" || ss["get"]("class") == "Video") &&
      ss["get"]("loop") == !![] &&
      !sr
    )
      return;
    rV["set"]("selectedIndex", -0x1);
    if (si && sh != -0x1) {
      if (si) {
        if (
          sh > 0x0 &&
          si["get"]("movements")[sh - 0x1]["get"]("class") ==
            "TargetPanoramaCameraMovement"
        ) {
          var st = sj["get"]("initialPosition");
          var su = st["get"]("yaw");
          var sv = st["get"]("pitch");
          var sw = st["get"]("hfov");
          var sx = si["get"]("movements")[sh - 0x1];
          var sy = sx["get"]("targetYaw");
          var sz = sx["get"]("targetPitch");
          var sA = sx["get"]("targetHfov");
          if (sy !== undefined) st["set"]("yaw", sy);
          if (sz !== undefined) st["set"]("pitch", sz);
          if (sA !== undefined) st["set"]("hfov", sA);
          var sB = function (sE) {
            st["set"]("yaw", su);
            st["set"]("pitch", sv);
            st["set"]("hfov", sw);
            sd["unbind"]("end", sB, this);
          };
          sd["bind"]("end", sB, this);
        }
        si["set"]("movementIndex", sh);
      }
    }
    if (sb) {
      sa["unbind"]("begin", s1, this);
      sb["unbind"]("stateChange", s0, this);
      for (var sC = 0x0; sC < sk["length"]; ++sC) {
        sk[sC]["unbind"]("click", s3, this);
      }
    }
    if (sg) {
      var sD = this["getMediaFromPlayer"](sb);
      if (
        (s7 == this["mainPlayList"] || s7["get"]("items")["length"] > 0x1) &&
        (sD == undefined || sD == sa["get"]("media"))
      ) {
        s7["set"]("selectedIndex", s9);
      }
      if (rV != s7) s7["unbind"]("change", s2, this);
    } else {
      se["set"]("visible", sf);
    }
    s7 = undefined;
  };
  if (!rX) {
    var s5 = rV["get"]("selectedIndex");
    var s6 =
      s5 != -0x1
        ? rV["get"]("items")[rV["get"]("selectedIndex")]["get"]("player")
        : this["getActivePlayerWithViewer"](this["getMainViewer"]());
    if (s6) {
      rX = this["getMediaFromPlayer"](s6);
    }
  }
  var s7 = undefined;
  if (rX) {
    var s8 = this["getPlayListsWithMedia"](rX, !![]);
    if (s8["indexOf"](rV) != -0x1) {
      s7 = rV;
    } else if (s8["indexOf"](this["mainPlayList"]) != -0x1) {
      s7 = this["mainPlayList"];
    } else if (s8["length"] > 0x0) {
      s7 = s8[0x0];
    }
  }
  if (!s7) {
    rV["set"]("selectedIndex", rW);
    return;
  }
  var s9 = s7["get"]("selectedIndex");
  var sa = rV["get"]("items")[rW];
  var sb = sa["get"]("player");
  var sc = this["getMediaFromPlayer"](sb);
  if (
    (rV["get"]("selectedIndex") == rW && sc == sa["get"]("media")) ||
    s9 == -0x1
  ) {
    return;
  }
  if (rV["get"]("selectedIndex") == rW && sc != sa["get"]("media"))
    rV["set"]("selectedIndex", -0x1);
  var sd = s7["get"]("items")[s9];
  var se = sb["get"]("viewerArea");
  var sf = se["get"]("visible");
  var sg = se == sd["get"]("player")["get"]("viewerArea");
  if (sg) {
    if (rV != s7) {
      s7["set"]("selectedIndex", -0x1);
      s7["bind"]("change", s2, this);
    }
  } else {
    se["set"]("visible", !![]);
  }
  var sh = -0x1;
  var si = undefined;
  var sj = sd["get"]("camera");
  if (sj) {
    si = sj["get"]("initialSequence");
    if (si) {
      sh = si["get"]("movementIndex");
    }
  }
  rV["set"]("selectedIndex", rW);
  var sk = [];
  var sl = function (sF) {
    var sG = sb["get"](sF);
    if (sG == undefined) return;
    if (Array["isArray"](sG)) sk = sk["concat"](sG);
    else sk["push"](sG);
  };
  sl("buttonStop");
  for (var sm = 0x0; sm < sk["length"]; ++sm) {
    sk[sm]["bind"]("click", s3, this);
  }
  sa["bind"]("begin", s1, rZ);
  this["executeFunctionWhenChange"](rV, rW, rY ? s3 : undefined);
};
TDV["Tour"]["Script"]["setOverlayBehaviour"] = function (sH, sI, sJ, sK) {
  var sL = function () {
    switch (sJ) {
      case "triggerClick":
        this["triggerOverlay"](sH, "click");
        break;
      case "stop":
      case "play":
      case "pause":
        sH[sJ]();
        break;
      case "togglePlayPause":
      case "togglePlayStop":
        if (sH["get"]("state") == "playing")
          sH[sJ == "togglePlayPause" ? "pause" : "stop"]();
        else sH["play"]();
        break;
    }
    if (sK) {
      if (window["overlaysDispatched"] == undefined)
        window["overlaysDispatched"] = {};
      var sQ = sH["get"]("id");
      window["overlaysDispatched"][sQ] = !![];
      setTimeout(function () {
        delete window["overlaysDispatched"][sQ];
      }, 0x3e8);
    }
  };
  if (
    sK &&
    window["overlaysDispatched"] != undefined &&
    sH["get"]("id") in window["overlaysDispatched"]
  )
    return;
  var sM = this["getFirstPlayListWithMedia"](sI, !![]);
  if (sM != undefined) {
    var sN = this["getPlayListItemByMedia"](sM, sI);
    var sO = sN["get"]("player");
    if (
      sM["get"]("items")["indexOf"](sN) != sM["get"]("selectedIndex") ||
      (this["isPanorama"](sN["get"]("media")) &&
        sO["get"]("rendererPanorama") != sN["get"]("media"))
    ) {
      var sP = function (sR) {
        sN["unbind"]("begin", sP, this);
        sL["call"](this);
      };
      sN["bind"]("begin", sP, this);
      return;
    }
  }
  sL["call"](this);
};
TDV["Tour"]["Script"]["setOverlaysVisibility"] = function (sS, sT, sU) {
  var sV = "overlayEffects";
  var sW = undefined;
  var sX = this["getKey"](sV);
  if (!sX) {
    sX = {};
    this["registerKey"](sV, sX);
  }
  for (var sY = 0x0, sZ = sS["length"]; sY < sZ; ++sY) {
    var t0 = sS[sY];
    if (!t0) continue;
    if (sU && sU > 0x0) {
      sX[t0["get"]("id")] = setTimeout(t1["bind"](this, t0), sU);
    } else {
      t1["call"](this, t0);
    }
  }
  function t1(t2) {
    var t3 = t2["get"]("id");
    var t4 = sX[t3];
    if (t4) {
      clearTimeout(t4);
      delete t4[t3];
    }
    var t5 =
      t2["get"]("class") == "PanoramaModel3DLocation"
        ? t2["get"]("data")["sprite"]
        : t2;
    if (!t5) return;
    var t6 = sT == "toggle" ? !t5["get"]("enabled") : sT;
    t5["set"]("enabled", t6);
    if (t2["get"]("class") == "PanoramaModel3DLocation")
      t2["get"]("data")["enabled"] = t6;
    var t8 = t2["get"]("data");
    if (t6 && t8 && "group" in t8) {
      var t9 = this["getOverlaysByGroupname"](t8["group"]);
      for (var ta = 0x0, tb = t9["length"]; ta < tb; ++ta) {
        var td = t9[ta];
        if (td != t2) td["set"]("enabled", !t6);
      }
    }
    if (!sW) sW = this["getByClassName"]("AdjacentPanorama");
    for (var te = 0x0, tf = sW["length"]; te < tf; ++te) {
      var tg = sW[te];
      var t8 = tg["get"]("data");
      if (!t8) continue;
      var td = this[t8["overlayID"]];
      if (td && td == t2) {
        tg["set"]("enabled", td["get"]("enabled"));
      }
    }
  }
};
TDV["Tour"]["Script"]["setOverlaysVisibilityByTags"] = function (
  th,
  ti,
  tj,
  tk,
  tl
) {
  var tm = tj
    ? this["getPanoramaOverlaysByTags"](tj, th, tk)
    : this["getOverlaysByTags"](th, tk);
  this["setOverlaysVisibility"](tm, ti, tl);
};
TDV["Tour"]["Script"]["setComponentsVisibilityByTags"] = function (
  tn,
  to,
  tp,
  tq,
  tr
) {
  var ts = this["getComponentsByTags"](tn, tr);
  for (var tt = 0x0, tu = ts["length"]; tt < tu; ++tt) {
    var tv = ts[tt];
    if (to == "toggle") tv["get"]("visible") ? tq(tv) : tp(tv);
    else to ? tp(tv) : tq(tv);
  }
};
TDV["Tour"]["Script"]["setModel3DCameraSpot"] = function (tw, tx, ty, tz, tA) {
  var tB = tw["get"]("selectedIndex");
  var tC = tw["get"]("items");
  var tD = tx["get"]("media");
  var tE = tD["get"]("camera");
  if (tB >= 0x0 && tC[tB] == tx && tD["get"]("isLoaded")) {
    tE["set"]("yaw", tE["get"]("yaw") % 0x168);
    var tF = tx["get"]("player")["get"]("viewerArea");
    var tG = this["getActiveMediaWithViewer"](tF);
    if (tG["get"]("class")["indexOf"]("Panorama") != -0x1) {
      if (tz !== undefined) {
        tz *= 0x3e8;
        var tH = tF["get"]("modelToPanoramaTraslationDuration");
        var tI = tF["get"]("panoramaToModelTraslationDuration");
        var tJ = () => {
          clearTimeout(tK);
          tw["unbind"]("change", tJ, this);
          tF["set"]("modelToPanoramaTraslationDuration", tH);
          tF["set"]("panoramaToModelTraslationDuration", tI);
        };
        var tK = setTimeout(tJ, tz);
        tw["bind"]("change", tJ, this);
        tF["set"]("modelToPanoramaTraslationDuration", tz);
        tF["set"]("panoramaToModelTraslationDuration", tz);
      }
      tE["setStoredPosition"](ty);
    } else {
      if (tE["get"]("state") == "playing") tE["stop"]();
      this["createTween"](tE, ty, tz, tA)["play"]();
    }
  } else {
    if (tE["get"]("state") == "playing") tE["stop"]();
    this["startModel3DWithCameraSpot"](tx, ty);
  }
};
TDV["Tour"]["Script"]["setModel3DCameraSequence"] = function (tL, tM, tN) {
  var tO = tL["get"]("selectedIndex");
  var tP = tL["get"]("items");
  var tQ = tM["get"]("media");
  if (tP[tO] == tM && tQ["get"]("isLoaded")) {
    tN["play"]();
  } else {
    var tR = tN["get"]("movements");
    var tS = {};
    if (tR["length"] > 0x0) {
      var tT = tR[0x0];
      if (tT["get"]("class") == "TargetModel3DCameraMovement") {
        var tU = ["x", "y", "z", "yaw", "pitch", "fov", "distance"];
        for (var tV in tU) {
          tV = tU[tV];
          var tW = tT["get"](
            "target" + tV["charAt"](0x0)["toUpperCase"]() + tV["slice"](0x1)
          );
          if (tW !== undefined) {
            tS[tV] = tW;
          }
        }
      }
    }
    this["startModel3DWithCameraSpot"](tM, tS);
    var tX = function () {
      tM["unbind"]("begin", tX, this);
      tN["play"]();
    };
    tM["bind"]("begin", tX, this);
  }
};
TDV["Tour"]["Script"]["setPanoramaCameraWithCurrentSpot"] = function (tY, tZ) {
  var u0 = this["getActiveMediaWithViewer"](tZ || this["getMainViewer"]());
  if (
    u0 != undefined &&
    (u0["get"]("class")["indexOf"]("Panorama") != -0x1 ||
      u0["get"]("class") == "Video360")
  ) {
    var u1 = tY["get"]("media");
    var u2 = this["clonePanoramaCamera"](tY["get"]("camera"));
    this["setCameraSameSpotAsMedia"](u2, u0);
    this["startPanoramaWithCamera"](u1, u2);
  }
};
TDV["Tour"]["Script"]["setPanoramaCameraWithSpot"] = function (
  u3,
  u4,
  u5,
  u6,
  u7
) {
  var u8 = u4["get"]("media");
  var u9 = u4["get"]("player");
  if (
    u3["get"]("items")[u3["get"]("selectedIndex")] == u4 ||
    u9["get"]("rendererPanorama") == u8
  ) {
    if (u5 === undefined) u5 = u9["get"]("yaw");
    if (u6 === undefined) u6 = u9["get"]("pitch");
    if (u7 === undefined) u7 = u9["get"]("hfov");
    u9["moveTo"](u5, u6, u9["get"]("roll"), u7);
  } else {
    var ua = this["clonePanoramaCamera"](u4["get"]("camera"));
    var ub = ua["get"]("initialPosition");
    if (u5 !== undefined) ub["set"]("yaw", u5);
    if (u6 !== undefined) ub["set"]("pitch", u6);
    if (u7 !== undefined) ub["set"]("hfov", u7);
    this["startPanoramaWithCamera"](u8, ua);
  }
};
TDV["Tour"]["Script"]["setSurfaceSelectionHotspotMode"] = function (uc) {
  var ud = this["getByClassName"]("HotspotPanoramaOverlay");
  var ue = this["getByClassName"]("PanoramaPlayer");
  var uf = uc == "hotspotEnabled";
  var ug = uc == "circleEnabled";
  var uh = !!uc;
  ud["forEach"](function (ui) {
    var uj = ui["get"]("data");
    if (uj && uj["hasPanoramaAction"] == !![])
      ui["set"]("enabledInSurfaceSelection", uf);
  });
  ue["forEach"](function (uk) {
    uk["set"]("adjacentPanoramaPositionsEnabled", ug);
    uk["set"]("surfaceSelectionEnabled", uh);
  });
  this["get"]("data")["surfaceSelectionHotspotMode"] = uc;
};
TDV["Tour"]["Script"]["setValue"] = function (ul, um, un) {
  try {
    if ("set" in ul) ul["set"](um, un);
    else ul[um] = un;
  } catch (uo) {}
};
TDV["Tour"]["Script"]["setStartTimeVideo"] = function (up, uq) {
  var ur = this["getPlayListItems"](up);
  var us = [];
  var ut = function () {
    for (var ux = 0x0; ux < ur["length"]; ++ux) {
      var uy = ur[ux];
      uy["set"]("startTime", us[ux]);
      uy["unbind"]("stop", ut, this);
    }
  };
  for (var uu = 0x0; uu < ur["length"]; ++uu) {
    var uv = ur[uu];
    var uw = uv["get"]("player");
    if (!uw) continue;
    if (uw["get"]("video") == up && uw["get"]("state") == "playing") {
      uw["seek"](uq);
    } else {
      us["push"](uv["get"]("startTime"));
      uv["set"]("startTime", uq);
      uv["bind"]("stop", ut, this);
    }
  }
};
TDV["Tour"]["Script"]["setStartTimeVideoSync"] = function (uz, uA) {
  if (uz && uA) this["setStartTimeVideo"](uz, uA["get"]("currentTime"));
};
TDV["Tour"]["Script"]["skip3DTransitionOnce"] = function (uB) {
  if (uB && uB["get"]("class") == "PanoramaPlayer") {
    var uC = uB["get"]("viewerArea");
    if (uC && uC["get"]("translationTransitionEnabled") == !![]) {
      var uD = function () {
        uB["unbind"]("preloadMediaShow", uD, this);
        uC["set"]("translationTransitionEnabled", !![]);
      };
      uC["set"]("translationTransitionEnabled", ![]);
      uB["bind"]("preloadMediaShow", uD, this);
    }
  }
};
TDV["Tour"]["Script"]["shareSocial"] = function (uE, uF, uG, uH, uI) {
  if (uF == undefined) {
    uF = location["href"]["split"](
      location["search"] || location["hash"] || /[?#]/
    )[0x0];
  }
  if (uG) {
    uF += this["updateDeepLink"](uH, ![]);
  }
  uF = (function (uK) {
    switch (uK) {
      case "email":
        return "mailto:?body=" + encodeURIComponent(uF);
      case "facebook":
        var uL = uF["indexOf"]("?") != -0x1;
        uF = uF["replace"]("#", "?");
        if (uL) {
          var uM = uF["lastIndexOf"]("?");
          uF = uF["substring"](0x0, uM) + "&" + uF["substring"](uM + 0x1);
        }
        return (
          "https://www.facebook.com/sharer/sharer.php?u=" +
          encodeURIComponent(uF)
        );
      case "linkedin":
        return (
          "https://www.linkedin.com/shareArticle?mini=true&url=" +
          encodeURIComponent(uF)
        );
      case "pinterest":
        return "https://pinterest.com/pin/create/button/?url=" + uF;
      case "telegram":
        return "https://t.me/share/url?url=" + uF;
      case "twitter":
        return "https://twitter.com/intent/tweet?source=webclient&url=" + uF;
      case "whatsapp":
        return "https://api.whatsapp.com/send/?text=" + encodeURIComponent(uF);
      default:
        return uF;
    }
  })(uE);
  if (uI) {
    for (var uJ in uI) {
      uF += "&" + uJ + "=" + uI[uJ];
    }
  }
  if (uE == "clipboard") this["copyToClipboard"](uF);
  else this["openLink"](uF, "_blank");
};
TDV["Tour"]["Script"]["showComponentsWhileMouseOver"] = function (
  uN,
  uO,
  uP,
  uQ
) {
  var uR = function (uV) {
    for (var uW = 0x0, uX = uO["length"]; uW < uX; uW++) {
      var uY = uO[uW];
      if (!uQ || uQ(uY, uV)) uY["set"]("visible", uV);
    }
  };
  if (this["get"]("isMobile") || this["get"]("touchDevice")) {
    uR["call"](this, !![]);
  } else {
    var uS = -0x1;
    var uT = function () {
      uR["call"](this, !![]);
      if (uS >= 0x0) clearTimeout(uS);
      uN["bind"]("rollOut", uU, this);
    };
    var uU = function () {
      var uZ = function () {
        uR["call"](this, ![]);
      };
      uN["unbind"]("rollOut", uU, this);
      uS = setTimeout(uZ["bind"](this), uP);
    };
    uN["bind"]("rollOver", uT, this);
  }
};
TDV["Tour"]["Script"]["setObjectsVisibilityByTags"] = function (
  v0,
  v1,
  v2,
  v3
) {
  var v4 = this["_getObjectsByTags"](
    v1,
    ["InnerModel3DObject"],
    "tags2Objects",
    v2
  )["filter"](
    function (v5) {
      return v0["get"]("objects")["indexOf"](v5) != -0x1;
    }["bind"](this)
  );
  this["setObjectsVisibility"](v4, v3);
};
TDV["Tour"]["Script"]["setObjectsVisibilityByID"] = function (v6, v7, v8) {
  var v9 = v7["map"](
    function (va) {
      return this["getModel3DInnerObject"](v6, va);
    }["bind"](this)
  );
  this["setObjectsVisibility"](v9, v8);
};
TDV["Tour"]["Script"]["setObjectsVisibility"] = function (vb, vc) {
  vb["forEach"](
    function (vd) {
      if (vd)
        vd["set"]("enabled", vc === "toggle" ? !vd["get"]("enabled") : vc);
    }["bind"](this)
  );
};
TDV["Tour"]["Script"]["getModel3DInnerObject"] = function (ve, vf) {
  var vg = ve["get"]("objects");
  for (var vh = 0x0, vi = vg["length"]; vh < vi; ++vh) {
    var vj = vg[vh];
    if (
      vj["get"]("class") == "InnerModel3DObject" &&
      vj["get"]("objectId") == vf
    )
      return vj;
  }
  return undefined;
};
TDV["Tour"]["Script"]["showPopupMedia"] = function (vk, vl, vm, vn, vo, vp) {
  var vq = this;
  var vr = function () {
    window["resumeAudiosBlocked"] = ![];
    vm["set"]("selectedIndex", -0x1);
    vq["getMainViewer"]()["set"]("toolTipEnabled", !![]);
    this["resumePlayers"](vw, !![]);
    if (vv) {
      this["unbind"]("resize", vt, this);
    }
    vk["unbind"]("close", vr, this);
  };
  var vs = function () {
    vk["hide"]();
  };
  var vt = function () {
    var vx = function (vO) {
      return vk["get"](vO) || 0x0;
    };
    var vy = vq["get"]("actualWidth");
    var vz = vq["get"]("actualHeight");
    var vA = vq["getMediaWidth"](vl);
    var vB = vq["getMediaHeight"](vl);
    var vC = parseFloat(vn) / 0x64;
    var vD = parseFloat(vo) / 0x64;
    var vE = vC * vy;
    var vF = vD * vz;
    var vG = vx("footerHeight");
    var vH = vx("headerHeight");
    if (!vH) {
      var vI =
        vx("closeButtonIconHeight") +
        vx("closeButtonPaddingTop") +
        vx("closeButtonPaddingBottom");
      var vJ =
        vq["getPixels"](vx("titleFontSize")) +
        vx("titlePaddingTop") +
        vx("titlePaddingBottom");
      vH = vI > vJ ? vI : vJ;
      vH += vx("headerPaddingTop") + vx("headerPaddingBottom");
    }
    var vK =
      vE -
      vx("bodyPaddingLeft") -
      vx("bodyPaddingRight") -
      vx("paddingLeft") -
      vx("paddingRight");
    var vL =
      vF -
      vH -
      vG -
      vx("bodyPaddingTop") -
      vx("bodyPaddingBottom") -
      vx("paddingTop") -
      vx("paddingBottom");
    var vM = vK / vL;
    var vN = vA / vB;
    if (vM > vN) {
      vE =
        vL * vN +
        vx("bodyPaddingLeft") +
        vx("bodyPaddingRight") +
        vx("paddingLeft") +
        vx("paddingRight");
    } else {
      vF =
        vK / vN +
        vH +
        vG +
        vx("bodyPaddingTop") +
        vx("bodyPaddingBottom") +
        vx("paddingTop") +
        vx("paddingBottom");
    }
    if (vE > vy * vC) {
      vE = vy * vC;
    }
    if (vF > vz * vD) {
      vF = vz * vD;
    }
    vk["set"]("width", vE);
    vk["set"]("height", vF);
    vk["set"]("x", (vy - vx("actualWidth")) * 0.5);
    vk["set"]("y", (vz - vx("actualHeight")) * 0.5);
  };
  if (vp) {
    this["executeFunctionWhenChange"](vm, 0x0, vs);
  }
  var vu = vl["get"]("class");
  var vv = vu == "Video" || vu == "Video360";
  vm["set"]("selectedIndex", 0x0);
  if (vv) {
    this["bind"]("resize", vt, this);
    vt();
    vm["get"]("items")[0x0]["get"]("player")["play"]();
  } else {
    vk["set"]("width", vn);
    vk["set"]("height", vo);
  }
  window["resumeAudiosBlocked"] = !![];
  this["getMainViewer"]()["set"]("toolTipEnabled", ![]);
  var vw = this["pauseCurrentPlayers"](!![]);
  vk["bind"]("close", vr, this);
  vk["show"](this, !![]);
};
TDV["Tour"]["Script"]["showPopupImage"] = function (
  vP,
  vQ,
  vR,
  vS,
  vT,
  vU,
  vV,
  vW,
  vX,
  vY,
  vZ,
  w0
) {
  var w1 = ![];
  var w2 = function () {
    wk["unbind"]("loaded", w5, this);
    w9["call"](this);
  };
  var w3 = function () {
    wk["unbind"]("click", w3, this);
    if (wo != undefined) {
      clearTimeout(wo);
    }
  };
  var w4 = function () {
    setTimeout(we, 0x0);
  };
  var w5 = function () {
    this["unbind"]("click", w2, this);
    wj["set"]("visible", !![]);
    we();
    wl["set"]("visible", !![]);
    wk["unbind"]("loaded", w5, this);
    wk["bind"]("resize", w4, this);
    wo = setTimeout(w6["bind"](this), 0xc8);
  };
  var w6 = function () {
    wo = undefined;
    if (vW) {
      wk["bind"]("click", w3, this);
      w8["call"](this);
    }
    wk["bind"]("userInteractionStart", wf, this);
    wk["bind"]("userInteractionEnd", wg, this);
    wk["bind"]("backgroundClick", w9, this);
    if (vQ) {
      wk["bind"]("click", wc, this);
      wk["set"]("imageCursor", "hand");
    }
    wl["bind"]("click", w9, this);
    if (vZ) vZ["call"](this);
  };
  var w7 = function () {
    if (vW && wo) {
      clearTimeout(wo);
      wo = undefined;
    }
  };
  var w8 = function () {
    if (vW) {
      w7();
      wo = setTimeout(w9["bind"](this), vW);
    }
  };
  var w9 = function () {
    this["getMainViewer"]()["set"]("toolTipEnabled", !![]);
    w1 = !![];
    if (wo) clearTimeout(wo);
    if (wp) clearTimeout(wp);
    if (vW) w3();
    if (vU && vU["get"]("duration") > 0x0) {
      vU["bind"]("end", wb, this);
    } else {
      setTimeout(() => {
        wa["call"](this);
      }, 0x0);
    }
    wk["set"]("visible", ![]);
    wl["set"]("visible", ![]);
    wj["set"]("visible", ![]);
    this["unbind"]("click", w2, this);
    wk["unbind"]("backgroundClick", w9, this);
    wk["unbind"]("userInteractionStart", wf, this);
    wk["unbind"]("userInteractionEnd", wg, this, !![]);
    wk["unbind"]("resize", w4, this);
    if (vQ) {
      wk["unbind"]("click", wc, this);
      wk["set"]("cursor", "default");
    }
    wl["unbind"]("click", w9, this);
    this["resumePlayers"](wn, vX == null || vY);
    if (vY) {
      this["resumeGlobalAudios"]();
    }
    if (vX) {
      this["stopGlobalAudio"](vX);
    }
  };
  var wa = function () {
    wk["set"]("image", null);
    if (w0) w0["call"](this);
  };
  var wb = function () {
    vU["unbind"]("end", wb, this);
    wa["call"](this);
  };
  var wc = function () {
    wk["set"]("image", wd() ? vP : vQ);
  };
  var wd = function () {
    return wk["get"]("image") == vQ;
  };
  var we = function () {
    var wq =
      wk["get"]("actualWidth") -
      wk["get"]("imageLeft") -
      wk["get"]("imageWidth") +
      0xa;
    var wr = wk["get"]("imageTop") + 0xa;
    if (wq < 0xa) wq = 0xa;
    if (wr < 0xa) wr = 0xa;
    wl["set"]("right", wq);
    wl["set"]("top", wr);
  };
  var wf = function () {
    w7();
    if (wp) {
      clearTimeout(wp);
      wp = undefined;
    } else {
      wl["set"]("visible", ![]);
    }
  };
  var wg = function () {
    w8["call"](this);
    if (!w1) {
      wp = setTimeout(wh, 0x12c);
    }
  };
  var wh = function () {
    wp = undefined;
    wl["set"]("visible", !![]);
    we();
  };
  var wi = function (ws) {
    var wt = ws["get"]("data");
    if (wt && "extraLevels" in wt) {
      var wu = this["rootPlayer"]["createInstance"](ws["get"]("class"));
      var wv = wt["extraLevels"];
      for (var ww = 0x0; ww < wv["length"]; ww++) {
        var wx = wv[ww];
        if (typeof wx == "string") wv[ww] = this[wx["replace"]("this.", "")];
      }
      wu["set"]("levels", ws["get"]("levels")["concat"](wv));
      ws = wu;
    }
    return ws;
  };
  this["getMainViewer"]()["set"]("toolTipEnabled", ![]);
  var wj = this["veilPopupPanorama"];
  var wk = this["zoomImagePopupPanorama"];
  var wl = this["closeButtonPopupPanorama"];
  if (vV) {
    for (var wm in vV) {
      wl["set"](wm, vV[wm]);
    }
  }
  var wn = this["pauseCurrentPlayers"](vX == null || !vY);
  if (vY) {
    this["pauseGlobalAudios"](null, !![]);
  }
  if (vX) {
    this["playGlobalAudio"](vX, !![]);
  }
  var wo = undefined;
  var wp = undefined;
  vP = wi["call"](this, vP);
  if (vQ) vQ = wi["call"](this, vQ);
  wk["bind"]("loaded", w5, this);
  setTimeout(
    function () {
      this["bind"]("click", w2, this, ![]);
    }["bind"](this),
    0x0
  );
  wk["set"]("image", vP);
  wk["set"]("customWidth", vR);
  wk["set"]("customHeight", vS);
  wk["set"]("showEffect", vT);
  wk["set"]("hideEffect", vU);
  wk["set"]("visible", !![]);
  return wk;
};
TDV["Tour"]["Script"]["showPopupPanoramaOverlay"] = function (
  wy,
  wz,
  wA,
  wB,
  wC,
  wD,
  wE,
  wF
) {
  var wG = this["isCardboardViewMode"]();
  if (
    wy["get"]("visible") ||
    (!wG && this["zoomImagePopupPanorama"]["get"]("visible"))
  )
    return;
  this["getMainViewer"]()["set"]("toolTipEnabled", ![]);
  if (!wG) {
    var wH = this["zoomImagePopupPanorama"];
    var wI = wy["get"]("showDuration");
    var wJ = wy["get"]("hideDuration");
    var wL = this["pauseCurrentPlayers"](wD == null || !wE);
    var wM = wy["get"]("popupMaxWidth");
    var wN = wy["get"]("popupMaxHeight");
    var wO = function () {
      var wS = function () {
        if (!this["isCardboardViewMode"]()) wy["set"]("visible", ![]);
      };
      wy["unbind"]("showEnd", wO, this);
      wy["set"]("showDuration", 0x1);
      wy["set"]("hideDuration", 0x1);
      this["showPopupImage"](
        wA,
        wB,
        wy["get"]("popupMaxWidth"),
        wy["get"]("popupMaxHeight"),
        null,
        null,
        wz,
        wC,
        wD,
        wE,
        wS,
        wP
      );
    };
    var wP = function () {
      var wT = function () {
        wy["unbind"]("hideEnd", wT, this);
        if (wF) wF();
      };
      var wU = function () {
        wy["unbind"]("showEnd", wU, this);
        wy["bind"]("hideEnd", wT, this, !![]);
        wy["set"]("visible", ![]);
        wy["set"]("showDuration", wI);
        wy["set"]("popupMaxWidth", wM);
        wy["set"]("popupMaxHeight", wN);
      };
      this["resumePlayers"](wL, wD == null || !wE);
      var wV = wH["get"]("imageWidth");
      var wW = wH["get"]("imageHeight");
      wy["bind"]("showEnd", wU, this, !![]);
      wy["set"]("showDuration", 0x1);
      wy["set"]("hideDuration", wJ);
      wy["set"]("popupMaxWidth", wV);
      wy["set"]("popupMaxHeight", wW);
      if (wy["get"]("visible")) wU();
      else wy["set"]("visible", !![]);
      this["getMainViewer"]()["set"]("toolTipEnabled", !![]);
    };
    wy["bind"]("showEnd", wO, this, !![]);
  } else {
    var wQ = function () {
      this["resumePlayers"](wL, wD == null || wE);
      if (wE) {
        this["resumeGlobalAudios"]();
      }
      if (wD) {
        this["stopGlobalAudio"](wD);
      }
      if (wB) {
        wy["set"]("image", wA);
        wy["unbind"]("click", wR, this);
      }
      wy["unbind"]("hideEnd", wQ, this);
      this["getMainViewer"]()["set"]("toolTipEnabled", !![]);
      if (wF) wF();
    };
    var wR = function () {
      wy["set"]("image", wy["get"]("image") == wA ? wB : wA);
    };
    var wL = this["pauseCurrentPlayers"](wD == null || !wE);
    if (wE) {
      this["pauseGlobalAudios"](null, !![]);
    }
    if (wD) {
      this["playGlobalAudio"](wD, !![]);
    }
    if (wB) wy["bind"]("click", wR, this);
    wy["bind"]("hideEnd", wQ, this, !![]);
  }
  wy["set"]("visible", !![]);
};
TDV["Tour"]["Script"]["showPopupPanoramaVideoOverlay"] = function (
  wX,
  wY,
  wZ,
  x0,
  x1
) {
  var x2 = ![];
  var x3 = function () {
    wX["unbind"]("showEnd", x3);
    x7["bind"]("click", x5, this);
    x6();
    x7["set"]("visible", !![]);
  }["bind"](this);
  var x4 = function () {
    x2 = !![];
    if (!wX["get"]("loop")) x5();
  }["bind"](this);
  var x5 = function () {
    window["resumeAudiosBlocked"] = ![];
    this["getMainViewer"]()["set"]("toolTipEnabled", !![]);
    wX["set"]("visible", ![]);
    x7["set"]("visible", ![]);
    x7["unbind"]("click", x5, this);
    wX["unbind"]("end", x4, this);
    wX["unbind"]("hideEnd", x5, this, !![]);
    this["resumePlayers"](x9, !![]);
    if (wZ) {
      this["resumeGlobalAudios"]();
    }
    if (x0) x0();
    if (x1 && x2) x1();
  }["bind"](this);
  var x6 = function () {
    var xa = 0xa;
    var xb = 0xa;
    x7["set"]("right", xa);
    x7["set"]("top", xb);
  }["bind"](this);
  this["getMainViewer"]()["set"]("toolTipEnabled", ![]);
  var x7 = this["closeButtonPopupPanorama"];
  if (wY) {
    for (var x8 in wY) {
      x7["set"](x8, wY[x8]);
    }
  }
  window["resumeAudiosBlocked"] = !![];
  var x9 = this["pauseCurrentPlayers"](!![]);
  if (wZ) {
    this["pauseGlobalAudios"]();
  }
  wX["bind"]("end", x4, this, !![]);
  wX["bind"]("showEnd", x3, this, !![]);
  wX["bind"]("hideEnd", x5, this, !![]);
  wX["set"]("visible", !![]);
};
TDV["Tour"]["Script"]["showWindow"] = function (xc, xd, xe) {
  if (xc["get"]("visible") == !![]) {
    return;
  }
  var xf = function () {
    this["getMainViewer"]()["set"]("toolTipEnabled", !![]);
    if (xe) {
      this["resumeGlobalAudios"]();
    }
    xg();
    this["resumePlayers"](xj, !xe);
    xc["unbind"]("close", xf, this);
  };
  var xg = function () {
    xc["unbind"]("click", xg, this);
    if (xh != undefined) {
      clearTimeout(xh);
    }
  };
  var xh = undefined;
  if (xd) {
    var xi = function () {
      xc["hide"]();
    };
    xc["bind"]("click", xg, this);
    xh = setTimeout(xi, xd);
  }
  this["getMainViewer"]()["set"]("toolTipEnabled", ![]);
  if (xe) {
    this["pauseGlobalAudios"](null, !![]);
  }
  var xj = this["pauseCurrentPlayers"](!xe);
  xc["bind"]("close", xf, this);
  xc["show"](this, !![]);
};
TDV["Tour"]["Script"]["startModel3DWithCameraSpot"] = function (xk, xl) {
  var xm = xk["get"]("media");
  var xn =
    window["currentPanoramasWithCameraChanged"] == undefined ||
    !(xm["get"]("id") in window["currentPanoramasWithCameraChanged"]);
  if (!xn) {
    return;
  }
  var xo = xm["get"]("camera");
  xl = Object["assign"]({}, xl);
  if (!xm["get"]("isLoaded")) {
    var xp = {};
    for (var xr in xl) {
      var xs =
        "initial" + xr["charAt"](0x0)["toUpperCase"]() + xr["slice"](0x1);
      xp[xs] = xo["get"](xs);
      xl[xs] = xl[xr];
      delete xl[xr];
    }
    if (window["currentPanoramasWithCameraChanged"] == undefined) {
      window["currentPanoramasWithCameraChanged"] = {};
    }
    var xt = xm["get"]("id");
    window["currentPanoramasWithCameraChanged"][xt] = [xk];
    var xu = function () {
      if (xt in window["currentPanoramasWithCameraChanged"]) {
        delete window["currentPanoramasWithCameraChanged"][xt];
      }
      xk["unbind"]("begin", xu, this);
      for (var xC in xp) {
        xo["set"](xC, xp[xC]);
      }
    };
    xk["bind"]("begin", xu, this);
  } else {
    for (var xr in xl) {
      xo["set"](xr, xl[xr]);
    }
    xo["setStoredPosition"](xl);
  }
  var xv = xk["get"]("player");
  var xw = xv["get"]("viewerArea");
  var xx = this["getActivePlayersWithViewer"](xw);
  var xy = xx["find"](
    function (xD) {
      return (
        this["getMediaFromPlayer"](xD)["get"]("class")["indexOf"]("Panorama") !=
        -0x1
      );
    }["bind"](this)
  );
  var xz = xm["get"]("data");
  if (xy && xz["panoramaLocations"]) {
    var xA = this["getMediaFromPlayer"](xy);
    var xB = _getObject(
      this,
      xz["panoramaLocations"]["find"](
        (xE) =>
          xA ==
          _getObject(this, _getObject(this, xE)["get"]("data")["panorama"])
      )
    );
    if (xB && !xB["get"]("forceModelLoading")) {
      xB["set"]("forceModelLoading", !![]);
      xk["bind"](
        "begin",
        function xF() {
          xk["unbind"]("begin", xF, this);
          xB["set"]("forceModelLoading", ![]);
        },
        this
      );
    }
  }
};
TDV["Tour"]["Script"]["startPanoramaWithCamera"] = function (xG, xH) {
  var xI = this["getByClassName"]("PlayList");
  if (xI["length"] == 0x0) return;
  var xJ =
    window["currentPanoramasWithCameraChanged"] == undefined ||
    !(xG["get"]("id") in window["currentPanoramasWithCameraChanged"]);
  var xK = [];
  for (var xM = 0x0, xN = xI["length"]; xM < xN; ++xM) {
    var xO = xI[xM];
    var xP = xO["get"]("items");
    for (var xQ = 0x0, xR = xP["length"]; xQ < xR; ++xQ) {
      var xT = xP[xQ];
      if (
        xT["get"]("media") == xG &&
        (xT["get"]("class") == "PanoramaPlayListItem" ||
          xT["get"]("class") == "Video360PlayListItem")
      ) {
        if (xJ) {
          xK["push"]({ camera: xT["get"]("camera"), item: xT });
        }
        xT["set"]("camera", xH);
      }
    }
  }
  if (xK["length"] > 0x0) {
    if (window["currentPanoramasWithCameraChanged"] == undefined) {
      window["currentPanoramasWithCameraChanged"] = {};
    }
    var xU = xG["get"]("id");
    window["currentPanoramasWithCameraChanged"][xU] = xK;
    var xV = function () {
      if (xU in window["currentPanoramasWithCameraChanged"]) {
        delete window["currentPanoramasWithCameraChanged"][xU];
      }
      for (var xX = 0x0; xX < xK["length"]; xX++) {
        xK[xX]["item"]["set"]("camera", xK[xX]["camera"]);
        xK[xX]["item"]["unbind"]("end", xV, this);
      }
    };
    for (var xM = 0x0; xM < xK["length"]; xM++) {
      var xW = xK[xM];
      var xT = xW["item"];
      this["skip3DTransitionOnce"](xT["get"]("player"));
      xT["bind"]("end", xV, this);
    }
  }
};
TDV["Tour"]["Script"]["stopAndGoCamera"] = function (xY, xZ) {
  var y0 = xY["get"]("initialSequence");
  y0["pause"]();
  var y1 = function () {
    y0["play"]();
  };
  setTimeout(y1, xZ);
};
TDV["Tour"]["Script"]["syncPlaylists"] = function (y2) {
  var y3 = function (yb, yc) {
    for (var yd = 0x0, ye = y2["length"]; yd < ye; ++yd) {
      var yf = y2[yd];
      if (yf != yc) {
        var yg = yf["get"]("items");
        for (var yh = 0x0, yi = yg["length"]; yh < yi; ++yh) {
          if (yg[yh]["get"]("media") == yb) {
            if (yf["get"]("selectedIndex") != yh) {
              yf["set"]("selectedIndex", yh);
            }
            break;
          }
        }
      }
    }
  };
  var y4 = function (yj) {
    var yk = yj["source"];
    var yl = yk["get"]("selectedIndex");
    if (yl < 0x0) return;
    var ym = yk["get"]("items")[yl]["get"]("media");
    y3(ym, yk);
  };
  var y5 = function (yn) {
    var yo = yn["source"]["get"]("panoramaMapLocation");
    if (yo) {
      var yp = yo["get"]("map");
      y3(yp);
    }
  };
  for (var y7 = 0x0, y9 = y2["length"]; y7 < y9; ++y7) {
    y2[y7]["bind"]("change", y4, this);
  }
  var ya = this["getByClassName"]("MapPlayer");
  for (var y7 = 0x0, y9 = ya["length"]; y7 < y9; ++y7) {
    ya[y7]["bind"]("panoramaMapLocation_change", y5, this);
  }
};
TDV["Tour"]["Script"]["translate"] = function (yq) {
  return this["get"]("data")["localeManager"]["trans"](yq);
};
TDV["Tour"]["Script"]["triggerOverlay"] = function (yr, ys) {
  if (yr["get"]("areas") != undefined) {
    var yt = yr["get"]("areas");
    for (var yu = 0x0; yu < yt["length"]; ++yu) {
      yt[yu]["trigger"](ys);
    }
  } else {
    yr["trigger"](ys);
  }
};
TDV["Tour"]["Script"]["updateDeepLink"] = function (yv) {
  yv = yv || {};
  var yw = this["mainPlayList"]["get"]("selectedIndex");
  var yx;
  var yy =
    yw >= 0x0
      ? this["mainPlayList"]["get"]("items")[yw]["get"]("media")
      : this["getActiveMediaWithViewer"](this["getMainViewer"]());
  if (yy != undefined) {
    var yA = yy["get"]("data");
    if (yA && yA["label"]) {
      if (yw >= 0x0) {
        var yC = this["mainPlayList"]
          ["get"]("items")
          ["reduce"](function (yX, yY) {
            var yZ = yY["get"]("media")["get"]("data");
            return yZ && yA["label"] == yZ["label"] ? yX + 0x1 : yX;
          }, 0x0);
        if (yC != 0x1) yx = "#media=" + (yw + 0x1);
      }
      if (!yx) yx = "#media-name=" + encodeURIComponent(yA["label"]);
    } else if (yw >= 0x0) {
      yx = "#media=" + (yw + 0x1);
    }
  }
  if (yy) {
    if (yv["includeCurrentView"] === !![]) {
      var yD = this["getActivePlayerWithViewer"](this["getMainViewer"]());
      if (yD) {
        switch (yD["get"]("class")) {
          case "PanoramaPlayer":
            var yE = yD["get"]("yaw");
            var yF = yD["get"]("pitch");
            var yG = yD["get"]("hfov");
            if (!isNaN(yE) && !isNaN(yF))
              yx +=
                "&yaw=" + yE["toFixed"](0x2) + "&pitch=" + yF["toFixed"](0x2);
            if (!isNaN(yG)) yx += "&fov=" + yG["toFixed"](0x2);
            break;
          case "Model3DPlayer":
            var yH = yD["get"]("model");
            var yI = yH["get"]("camera");
            var yJ = [];
            yJ["push"]("yaw=" + yI["get"]("yaw")["toFixed"](0x2));
            yJ["push"]("pitch=" + yI["get"]("pitch")["toFixed"](0x2));
            yJ["push"]("x=" + yI["get"]("x")["toFixed"](0x5));
            yJ["push"]("y=" + yI["get"]("y")["toFixed"](0x5));
            yJ["push"]("z=" + yI["get"]("z")["toFixed"](0x5));
            if (yI["get"]("class") == "OrbitModel3DCamera")
              yJ["push"]("distance=" + yI["get"]("distance")["toFixed"](0x5));
            yx += "&" + yJ["join"]("&");
            break;
        }
      }
    }
    if (yv["includeCurrentVisibleHotspots"] === !![]) {
      var yK = this["getOverlays"](yy);
      var yL = [];
      var yM = [];
      for (var yN = 0x0, yC = yK["length"]; yN < yC; ++yN) {
        var yO = yK[yN];
        var yP = yO["get"]("enabled");
        var yA = yO["get"]("data");
        if (yP === undefined || !yA || !yA["label"]) continue;
        var yQ = encodeURIComponent(yA["label"]);
        var yR = yA["group"];
        if (yP != yA["defaultEnabledValue"]) {
          if (yP) {
            yL["push"](yQ);
          } else if (!yR) {
            yM["push"](yQ);
          }
        }
      }
      if (yL["length"] > 0x0) yx += "&son=" + yL["join"](",");
      if (yM["length"] > 0x0) yx += "&hon=" + yM["join"](",");
      if (yy["get"]("class") == "Model3D") {
        var yS = yy["get"]("variant");
        if (yS) yx += "&variant=" + yS;
        var yT = yy["get"]("objects");
        var yU = [];
        var yV = [];
        yT["forEach"](function (z0) {
          if (z0["get"]("class") == "InnerModel3DObject")
            (z0["get"]("enabled") ? yU : yV)["push"](z0["get"]("objectId"));
        });
        if (yU["length"] > 0x0) yx += "&sobjids=" + yU["join"](",");
        if (yV["length"] > 0x0) yx += "&hobjids=" + yV["join"](",");
      }
    }
    if (
      yv["includeCurrentMeasureModel3DObjects"] === !![] &&
      yy["get"]("class") == "Model3D"
    ) {
      var yW = [];
      yy["get"]("objects")["forEach"](function (z1) {
        if (
          z1["get"]("class") == "MeasureModel3DObject" &&
          z1["get"]("mode") != "create"
        ) {
          var z2 = [
            z1["get"]("data")["id"],
            z1["get"]("x"),
            z1["get"]("y"),
            z1["get"]("z"),
          ];
          z1["get"]("points")["forEach"](function (z3) {
            z2["push"](z3["get"]("x"), z3["get"]("y"), z3["get"]("z"));
          });
          if (z2["length"] > 0x4) {
            yW["push"](z2["join"](","));
          }
        }
      });
      if (yW["length"] > 0x0) yx += "&measures=" + yW["join"]("+");
    }
  }
  if (yx && yv["setHash"] === !![]) {
    location["hash"] = yx;
  }
  return yx;
};
TDV["Tour"]["Script"]["updateMediaLabelFromPlayList"] = function (z4, z5, z6) {
  var z7 = function () {
    var z9 = z4["get"]("selectedIndex");
    if (z9 >= 0x0) {
      var za = function () {
        zd["unbind"]("begin", za);
        zb(z9);
      };
      var zb = function (ze) {
        var zf = zd["get"]("media");
        var zg = zf["get"]("data");
        var zh = zg !== undefined ? zg["description"] : undefined;
        zc(zh);
      };
      var zc = function (zi) {
        if (zi !== undefined) {
          z5["set"](
            "html",
            "<div\x20style=\x22text-align:left\x22><SPAN\x20STYLE=\x22color:#FFFFFF;font-size:12px;font-family:Verdana\x22><span\x20color=\x22white\x22\x20font-family=\x22Verdana\x22\x20font-size=\x2212px\x22>" +
              zi +
              "</SPAN></div>"
          );
        } else {
          z5["set"]("html", "");
        }
        var zj = z5["get"]("html");
        z5["set"]("visible", zj !== undefined && zj);
      };
      var zd = z4["get"]("items")[z9];
      if (z5["get"]("html")) {
        zc("Loading...");
        zd["bind"]("begin", za);
      } else {
        zb(z9);
      }
    }
  };
  var z8 = function () {
    z5["set"]("html", undefined);
    z4["unbind"]("change", z7, this);
    z6["unbind"]("stop", z8, this);
  };
  if (z6) {
    z6["bind"]("stop", z8, this);
  }
  z4["bind"]("change", z7, this);
  z7();
};
TDV["Tour"]["Script"]["updateVideoCues"] = function (zk, zl) {
  var zm = zk["get"]("items")[zl];
  var zn = zm["get"]("media");
  if (zn["get"]("cues")["length"] == 0x0) return;
  var zo = zm["get"]("player");
  var zp = [];
  var zq = function () {
    if (zk["get"]("selectedIndex") != zl) {
      zn["unbind"]("cueChange", zr, this);
      zk["unbind"]("change", zq, this);
    }
  };
  var zr = function (zs) {
    var zt = zs["data"]["activeCues"];
    for (var zu = 0x0, zv = zp["length"]; zu < zv; ++zu) {
      var zw = zp[zu];
      if (
        zt["indexOf"](zw) == -0x1 &&
        (zw["get"]("startTime") > zo["get"]("currentTime") ||
          zw["get"]("endTime") < zo["get"]("currentTime") + 0.5)
      ) {
        zw["trigger"]("end");
      }
    }
    zp = zt;
  };
  zn["bind"]("cueChange", zr, this);
  zk["bind"]("change", zq, this);
};
TDV["Tour"]["Script"]["visibleComponentsIfPlayerFlagEnabled"] = function (
  zx,
  zy
) {
  var zz = this["get"](zy);
  for (var zA in zx) {
    zx[zA]["set"]("visible", zz);
  }
};
TDV["Tour"]["Script"]["quizStart"] = function () {
  var zB = this["get"]("data")["quiz"];
  return zB ? zB["start"]() : undefined;
};
TDV["Tour"]["Script"]["quizFinish"] = function () {
  var zC = this["get"]("data")["quiz"];
  return zC ? zC["finish"]() : undefined;
};
TDV["Tour"]["Script"]["quizPauseTimer"] = function () {
  var zD = this["get"]("data")["quiz"];
  return zD ? zD["pauseTimer"]() : undefined;
};
TDV["Tour"]["Script"]["quizResumeTimer"] = function () {
  var zE = this["get"]("data")["quiz"];
  return zE ? zE["continueTimer"]() : undefined;
};
TDV["Tour"]["Script"]["quizSetItemFound"] = function (zF) {
  var zG = this["get"]("data")["quiz"];
  if (zG) zG["setItemFound"](zF);
};
TDV["Tour"]["Script"]["quizShowQuestion"] = function (zH) {
  var zI = this["get"]("data");
  var zJ = zI["quiz"];
  var zK;
  if (zJ) {
    var zL = this["pauseCurrentPlayers"](!![]);
    var zM = this[zH];
    var zN;
    if (!zM["media"]) {
      zN = this["get"]("isMobile")
        ? {
            theme: {
              window: {
                height: undefined,
                maxHeight: this["get"]("actualHeight"),
                optionsContainer: { height: "100%" },
              },
            },
          }
        : {
            theme: {
              window: {
                width: "40%",
                height: undefined,
                maxHeight: 0x2bc,
                optionsContainer: { width: "100%" },
              },
            },
          };
    } else if (
      this["get"]("isMobile") &&
      this["get"]("orientation") == "landscape"
    ) {
      zN = {
        theme: {
          window: {
            bodyContainer: {
              layout: "horizontal",
              paddingLeft: 0x1e,
              paddingRight: 0x1e,
            },
            mediaContainer: { width: "60%", height: "100%" },
            buttonsContainer: { paddingLeft: 0x14, paddingRight: 0x14 },
            optionsContainer: {
              width: "40%",
              height: "100%",
              paddingLeft: 0x0,
              paddingRight: 0x0,
            },
          },
        },
      };
    }
    if (this["get"]("isMobile") && this["get"]("orientation") == "landscape") {
      var zO = this["get"]("data")["tour"]["getNotchValue"]();
      if (zO > 0x0) {
        zN = this["mixObject"](zN || {}, {
          theme: { window: { width: undefined, left: zO, right: zO } },
        });
      }
    }
    var zP =
      this["get"]("data")["textToSpeechConfig"]["speechOnQuizQuestion"] &&
      !!zM["title"];
    if (zP) this["textToSpeech"](zM["title"], zH);
    zK = zJ["showQuestion"](zH, zN);
    zK["then"](
      function (zQ) {
        if (zP) this["stopTextToSpeech"]();
        this["resumePlayers"](zL, !![]);
      }["bind"](this)
    );
  }
  return zK;
};
TDV["Tour"]["Script"]["quizShowScore"] = function (zR) {
  var zS = this["get"]("data");
  var zT = zS["quiz"];
  if (zT) {
    if (this["get"]("isMobile")) {
      zR = zR || {};
      zR = this["mixObject"](
        zR,
        zS[
          this["get"]("orientation") == "portrait"
            ? "scorePortraitConfig"
            : "scoreLandscapeConfig"
        ]
      );
    }
    return zT["showScore"](zR);
  }
};
TDV["Tour"]["Script"]["quizShowTimeout"] = function (zU, zV) {
  var zW = this["get"]("data");
  var zX = zW["quiz"];
  if (zX) {
    if (this["get"]("isMobile")) {
      zV = zV || {};
      zV = this["mixObject"](
        zV,
        zW[
          this["get"]("orientation") == "portrait"
            ? "scorePortraitConfig"
            : "scoreLandscapeConfig"
        ]
      );
    }
    zX["showTimeout"](zU, zV);
  }
};
TDV["Tour"]["Script"]["stopTextToSpeech"] = function (zY) {
  if (
    window["speechSynthesis"] &&
    (zY == undefined || this["t2sLastID"] == zY)
  ) {
    var zZ = window["speechSynthesis"];
    if (zZ["speaking"]) {
      zZ["cancel"]();
    }
    this["t2sLastID"] = undefined;
  }
};
TDV["Tour"]["Script"]["getStateTextToSpeech"] = function (A0) {
  return this["t2sLastID"] == A0 ? "playing" : "stopped";
};
TDV["Tour"]["Script"]["textToSpeech"] = function (A1, A2, A3) {
  if (this["get"]("mute")) {
    return;
  }
  var A4 = this["get"]("data");
  var A5 = A4["disableTTS"] || ![];
  if (A5) return;
  if ((A2 != undefined && this["t2sLastID"] != A2) || A2 == undefined) {
    A3 = A3 || 0x0;
    if (this["t2sLastID"] && A3 > this["t2sLastPriority"]) {
      return;
    }
    var A6 = A4["tour"];
    var A7 = A4["textToSpeechConfig"];
    var A8 = A4["localeManager"]["currentLocaleID"];
    if (window["speechSynthesis"]) {
      var A9 = window["speechSynthesis"];
      if (A9["speaking"]) {
        A9["cancel"]();
      }
      var Aa = new SpeechSynthesisUtterance(A1);
      if (A8) Aa["lang"] = A8;
      var Ab;
      if (A7) {
        Aa["volume"] = A7["volume"];
        Aa["pitch"] = A7["pitch"];
        Aa["rate"] = A7["rate"];
        if (A7["stopBackgroundAudio"]) this["pauseGlobalAudios"](null, !![]);
      }
      Aa["onend"] = function () {
        this["t2sLastID"] = null;
        if (Ab) clearInterval(Ab);
        if (A7["stopBackgroundAudio"]) this["resumeGlobalAudios"]();
      }["bind"](this);
      if (
        navigator["userAgent"]["indexOf"]("Chrome") != -0x1 &&
        !this["get"]("isMobile")
      ) {
        Ab = setInterval(function () {
          A9["pause"]();
          A9["resume"]();
        }, 0xbb8);
      }
      A9["speak"](Aa);
      this["t2sLastPriority"] = A3;
      this["t2sLastID"] = A2;
    } else if (A6["isMobileApp"]()) {
      if (!A6["isIOS"]()) {
        var Ac = function (Ad, Ae) {
          var Af = { command: "tts", type: Ad };
          if (Ae) Af = this["mixObject"](Af, Ae);
          android["sendJSON"](JSON["stringify"](Af));
        }["bind"](this);
        android["onTTSEnd"] = function () {
          this["t2sLastID"] = null;
          if (A7["stopBackgroundAudio"]) this["resumeGlobalAudios"]();
          android["onTTSEnd"] = undefined;
        }["bind"](this);
        Ac("stop");
        if (A7) {
          Ac("init", {
            volume: A7["volume"],
            pitch: A7["pitch"],
            rate: A7["rate"],
            language: A8,
          });
          if (A7["stopBackgroundAudio"]) this["pauseGlobalAudios"](null, !![]);
        }
        Ac("play", { text: A1, androidCallback: "onTTSEnd" });
      } else {
        console["error"](
          "Text\x20to\x20Speech\x20isn\x27t\x20supported\x20on\x20this\x20browser"
        );
      }
    } else {
      console["error"](
        "Text\x20to\x20Speech\x20isn\x27t\x20supported\x20on\x20this\x20browser"
      );
    }
  }
};
TDV["Tour"]["Script"]["textToSpeechComponent"] = function (Ag) {
  var Ah = Ag["get"]("class");
  var Ai;
  if (Ah == "HTMLText") {
    var Aj = Ag["get"]("html");
    if (Aj) {
      Ai = this["htmlToPlainText"](Aj, {
        linkProcess: function (Ak, Al) {
          return Al;
        },
      });
    }
  } else if (Ah == "BaseButton") {
    Ai = Ag["get"]("label");
  } else if (Ah == "Label") {
    Ai = Ag["get"]("text");
  }
  if (Ai) {
    this["textToSpeech"](Ai, Ag["get"]("id"));
  }
};
TDV["Tour"]["Script"]["toggleTextToSpeechComponent"] = function (Am) {
  var An = Am["get"]("id");
  if (this["getStateTextToSpeech"](An) != "playing")
    this["textToSpeechComponent"](Am);
  else this["stopTextToSpeech"](An);
};
TDV["Tour"]["Script"]["_initTTSTooltips"] = function () {
  function Ao(Aq) {
    var Ar = Aq["source"];
    this["textToSpeech"](Ar["get"]("toolTip"), Ar["get"]("id"), 0x1);
  }
  function Ap(As) {
    var At = As["source"];
    this["stopTextToSpeech"](At["get"]("id"));
  }
  setTimeout(
    function () {
      var Au = this["getByClassName"]("UIComponent");
      for (var Av = 0x0, Aw = Au["length"]; Av < Aw; ++Av) {
        var Ax = Au[Av];
        var Ay = Ax["get"]("toolTip");
        if (!!Ay || Ax["get"]("class") == "ViewerArea") {
          Ax["bind"]("toolTipShow", Ao, this);
          Ax["bind"]("toolTipHide", Ap, this);
        }
      }
    }["bind"](this),
    0x0
  );
};
TDV["Tour"]["Script"]["takeScreenshot"] = function (Az) {
  var AA = this["getActivePlayerWithViewer"](Az);
  if (
    AA &&
    (AA["get"]("class") == "PanoramaPlayer" ||
      AA["get"]("class") == "Model3DPlayer")
  )
    AA["saveScreenshot"]();
};
TDV["Tour"]["Script"]["htmlToPlainText"] = function htmlToPlainText(AB, AC) {
  var AD = function (AR, AS) {
    var AT = "";
    for (var AU = 0x0; AU < AS; AU += 0x1) {
      AT += AR;
    }
    return AT;
  };
  var AE = null;
  var AF = null;
  var AG = "underline";
  var AH = "indention";
  var AI = "-";
  var AJ = 0x3;
  var AK = "-";
  var AL = ![];
  if (!!AC) {
    if (typeof AC["linkProcess"] === "function") {
      AE = AC["linkProcess"];
    }
    if (typeof AC["imgProcess"] === "function") {
      AF = AC["imgProcess"];
    }
    if (!!AC["headingStyle"]) {
      AG = AC["headingStyle"];
    }
    if (!!AC["listStyle"]) {
      AH = AC["listStyle"];
    }
    if (!!AC["uIndentionChar"]) {
      AI = AC["uIndentionChar"];
    }
    if (!!AC["listIndentionTabs"]) {
      AJ = AC["listIndentionTabs"];
    }
    if (!!AC["oIndentionChar"]) {
      AK = AC["oIndentionChar"];
    }
    if (!!AC["keepNbsps"]) {
      AL = AC["keepNbsps"];
    }
  }
  var AM = AD(AI, AJ);
  var AN = String(AB)["replace"](/\n|\r/g, "\x20");
  const AO = AN["match"](/<\/body>/i);
  if (AO) {
    AN = AN["substring"](0x0, AO["index"]);
  }
  const AP = AN["match"](/<body[^>]*>/i);
  if (AP) {
    AN = AN["substring"](AP["index"] + AP[0x0]["length"], AN["length"]);
  }
  AN = AN["replace"](
    /<(script|style)( [^>]*)*>((?!<\/\1( [^>]*)*>).)*<\/\1>/gi,
    ""
  );
  AN = AN["replace"](
    /<(\/)?((?!h[1-6]( [^>]*)*>)(?!img( [^>]*)*>)(?!a( [^>]*)*>)(?!ul( [^>]*)*>)(?!ol( [^>]*)*>)(?!li( [^>]*)*>)(?!p( [^>]*)*>)(?!div( [^>]*)*>)(?!td( [^>]*)*>)(?!br( [^>]*)*>)[^>\/])[^<>]*>/gi,
    ""
  );
  AN = AN["replace"](/<img([^>]*)>/gi, function (AV, AW) {
    var AX = "";
    var AY = "";
    var AZ = /src="([^"]*)"/i["exec"](AW);
    var B0 = /alt="([^"]*)"/i["exec"](AW);
    if (AZ !== null) {
      AX = AZ[0x1];
    }
    if (B0 !== null) {
      AY = B0[0x1];
    }
    if (typeof AF === "function") {
      return AF(AX, AY);
    }
    if (AY === "") {
      return "![image]\x20(" + AX + ")";
    }
    return "![" + AY + "]\x20(" + AX + ")";
  });
  function AQ() {
    return function (B1, B2, B3, B4) {
      var B5 = 0x0;
      if (B3 && /start="([0-9]+)"/i["test"](B3)) {
        B5 = /start="([0-9]+)"/i["exec"](B3)[0x1] - 0x1;
      }
      var B6 =
        "<p>" +
        B4["replace"](
          /<li[^>]*>(((?!<li[^>]*>)(?!<\/li>).)*)<\/li>/gi,
          function (B7, B8) {
            var B9 = 0x0;
            var Ba = B8["replace"](/(^|(<br \/>))(?!<p>)/gi, function () {
              if (B2 === "o" && B9 === 0x0) {
                B5 += 0x1;
                B9 += 0x1;
                return "<br\x20/>" + B5 + AD(AK, AJ - String(B5)["length"]);
              }
              return "<br\x20/>" + AM;
            });
            return Ba;
          }
        ) +
        "</p>";
      return B6;
    };
  }
  if (AH === "linebreak") {
    AN = AN["replace"](/<\/?ul[^>]*>|<\/?ol[^>]*>|<\/?li[^>]*>/gi, "\x0a");
  } else if (AH === "indention") {
    while (/<(o|u)l[^>]*>(.*)<\/\1l>/gi["test"](AN)) {
      AN = AN["replace"](
        /<(o|u)l([^>]*)>(((?!<(o|u)l[^>]*>)(?!<\/(o|u)l>).)*)<\/\1l>/gi,
        AQ()
      );
    }
  }
  if (AG === "linebreak") {
    AN = AN["replace"](/<h([1-6])[^>]*>([^<]*)<\/h\1>/gi, "\x0a$2\x0a");
  } else if (AG === "underline") {
    AN = AN["replace"](/<h1[^>]*>(((?!<\/h1>).)*)<\/h1>/gi, function (Bb, Bc) {
      return (
        "\x0a&nbsp;\x0a" +
        Bc +
        "\x0a" +
        AD("=", Bc["length"]) +
        "\x0a&nbsp;\x0a"
      );
    });
    AN = AN["replace"](/<h2[^>]*>(((?!<\/h2>).)*)<\/h2>/gi, function (Bd, Be) {
      return (
        "\x0a&nbsp;\x0a" +
        Be +
        "\x0a" +
        AD("-", Be["length"]) +
        "\x0a&nbsp;\x0a"
      );
    });
    AN = AN["replace"](
      /<h([3-6])[^>]*>(((?!<\/h\1>).)*)<\/h\1>/gi,
      function (Bf, Bg, Bh) {
        return "\x0a&nbsp;\x0a" + Bh + "\x0a&nbsp;\x0a";
      }
    );
  } else if (AG === "hashify") {
    AN = AN["replace"](
      /<h([1-6])[^>]*>([^<]*)<\/h\1>/gi,
      function (Bi, Bj, Bk) {
        return "\x0a&nbsp;\x0a" + AD("#", Bj) + "\x20" + Bk + "\x0a&nbsp;\x0a";
      }
    );
  }
  AN = AN["replace"](
    /<br( [^>]*)*>|<p( [^>]*)*>|<\/p( [^>]*)*>|<div( [^>]*)*>|<\/div( [^>]*)*>|<td( [^>]*)*>|<\/td( [^>]*)*>/gi,
    "\x0a"
  );
  AN = AN["replace"](
    /<a[^>]*href="([^"]*)"[^>]*>([^<]+)<\/a[^>]*>/gi,
    function (Bl, Bm, Bn) {
      if (typeof AE === "function") {
        return AE(Bm, Bn);
      }
      return "\x20[" + Bn + "]\x20(" + Bm + ")\x20";
    }
  );
  AN = AN["replace"](/\n[ \t\f]*/gi, "\x0a");
  AN = AN["replace"](/\n\n+/gi, "\x0a");
  if (AL) {
    AN = AN["replace"](/( |\t)+/gi, "\x20");
    AN = AN["replace"](/&nbsp;/gi, "\x20");
  } else {
    AN = AN["replace"](/( |&nbsp;|\t)+/gi, "\x20");
  }
  AN = AN["replace"](/\n +/gi, "\x0a");
  AN = AN["replace"](/^ +/gi, "");
  while (AN["indexOf"]("\x0a") === 0x0) {
    AN = AN["substring"](0x1);
  }
  if (
    AN["length"] === 0x0 ||
    AN["lastIndexOf"]("\x0a") !== AN["length"] - 0x1
  ) {
    AN += "\x0a";
  }
  return AN;
};
TDV["Tour"]["Script"]["openEmbeddedPDF"] = function (Bo, Bp) {
  var Bq = !!window["MSInputMethodContext"] && !!document["documentMode"];
  if (Bq) {
    this["openLink"](Bp, "_blank");
    return;
  }
  var Br = Bo["get"]("class");
  var Bs = !new RegExp("^(?:[a-z]+:)?//", "i")["test"](Bp);
  if (Bs && Br == "WebFrame") {
    var Bt = location["origin"] + location["pathname"];
    Bo["set"](
      "url",
      "lib/pdfjs/web/viewer.html?file=" +
        encodeURIComponent(
          Bt["substring"](0x0, Bt["lastIndexOf"]("/")) + "/" + Bp
        ) +
        "#0"
    );
  } else {
    var Bu = location["origin"] == new URL(Bp)["origin"];
    var Bv =
      "<iframe\x20\x20id=\x27googleViewer\x27\x20src=\x27https://docs.google.com/viewer?url=[url]&embedded=true\x27\x20width=\x27100%\x27\x20height=\x27100%\x27\x20frameborder=\x270\x27>" +
      "<p>This\x20browser\x20does\x20not\x20support\x20inline\x20PDFs.\x20Please\x20download\x20the\x20PDF\x20to\x20view\x20it:\x20<a\x20href=\x27[url]\x27>Download\x20PDF</a></p>" +
      "</iframe>";
    var Bw = /^((?!chrome|android|crios|ipad|iphone).)*safari/i["test"](
      navigator["userAgent"]
    );
    var Bx =
      "<div\x20id=\x22content\x22\x20style=\x22width:100%;height:100%;position:absolute;left:0;top:0;\x22></div>" +
      "<script\x20type=\x22text/javascript\x22>" +
      "!function(root,factory){\x22function\x22==typeof\x20define&&define.amd?define([],factory):\x22object\x22==typeof\x20module&&module.exports?module.exports=factory():root.PDFObject=factory()}(this,function(){\x22use\x20strict\x22;if(void\x200===window||void\x200===window.navigator||void\x200===window.navigator.userAgent||void\x200===window.navigator.mimeTypes)return!1;let\x20nav=window.navigator,ua=window.navigator.userAgent,isIE=\x22ActiveXObject\x22in\x20window,isModernBrowser=void\x200!==window.Promise,supportsPdfMimeType=void\x200!==nav.mimeTypes[\x22application/pdf\x22],isMobileDevice=void\x200!==nav.platform&&\x22MacIntel\x22===nav.platform&&void\x200!==nav.maxTouchPoints&&nav.maxTouchPoints>1||/Mobi|Tablet|Android|iPad|iPhone/.test(ua),isSafariDesktop=!isMobileDevice&&void\x200!==nav.vendor&&/Apple/.test(nav.vendor)&&/Safari/.test(ua),isFirefoxWithPDFJS=!(isMobileDevice||!/irefox/.test(ua))&&parseInt(ua.split(\x22rv:\x22)[1].split(\x22.\x22)[0],10)>18,createAXO=function(type){var\x20ax;try{ax=new\x20ActiveXObject(type)}catch(e){ax=null}return\x20ax},supportsPDFs=!isMobileDevice&&(isFirefoxWithPDFJS||supportsPdfMimeType||isIE&&!(!createAXO(\x22AcroPDF.PDF\x22)&&!createAXO(\x22PDF.PdfCtrl\x22))),embedError=function(msg,suppressConsole){return\x20suppressConsole||console.log(\x22[PDFObject]\x20\x22+msg),!1},emptyNodeContents=function(node){for(;node.firstChild;)node.removeChild(node.firstChild)},generatePDFJSMarkup=function(targetNode,url,pdfOpenFragment,PDFJS_URL,id,omitInlineStyles){emptyNodeContents(targetNode);let\x20fullURL=PDFJS_URL+\x22?file=\x22+encodeURIComponent(url)+pdfOpenFragment,div=document.createElement(\x22div\x22),iframe=document.createElement(\x22iframe\x22);return\x20iframe.src=fullURL,iframe.className=\x22pdfobject\x22,iframe.type=\x22application/pdf\x22,iframe.frameborder=\x220\x22,id&&(iframe.id=id),omitInlineStyles||(div.style.cssText=\x22position:\x20absolute;\x20top:\x200;\x20right:\x200;\x20bottom:\x200;\x20left:\x200;\x22,iframe.style.cssText=\x22border:\x20none;\x20width:\x20100%;\x20height:\x20100%;\x22,/*targetNode.style.position=\x22relative\x22,*/targetNode.style.overflow=\x22auto\x22),div.appendChild(iframe),targetNode.appendChild(div),targetNode.classList.add(\x22pdfobject-container\x22),targetNode.getElementsByTagName(\x22iframe\x22)[0]},embed=function(url,targetSelector,options){let\x20selector=targetSelector||!1,opt=options||{},id=\x22string\x22==typeof\x20opt.id?opt.id:\x22\x22,page=opt.page||!1,pdfOpenParams=opt.pdfOpenParams||{},fallbackLink=opt.fallbackLink||!0,width=opt.width||\x22100%\x22,height=opt.height||\x22100%\x22,assumptionMode=\x22boolean\x22!=typeof\x20opt.assumptionMode||opt.assumptionMode,forcePDFJS=\x22boolean\x22==typeof\x20opt.forcePDFJS&&opt.forcePDFJS,supportRedirect=\x22boolean\x22==typeof\x20opt.supportRedirect&&opt.supportRedirect,omitInlineStyles=\x22boolean\x22==typeof\x20opt.omitInlineStyles&&opt.omitInlineStyles,suppressConsole=\x22boolean\x22==typeof\x20opt.suppressConsole&&opt.suppressConsole,forceIframe=\x22boolean\x22==typeof\x20opt.forceIframe&&opt.forceIframe,PDFJS_URL=opt.PDFJS_URL||!1,targetNode=function(targetSelector){let\x20targetNode=document.body;return\x22string\x22==typeof\x20targetSelector?targetNode=document.querySelector(targetSelector):void\x200!==window.jQuery&&targetSelector\x20instanceof\x20jQuery&&targetSelector.length?targetNode=targetSelector.get(0):void\x200!==targetSelector.nodeType&&1===targetSelector.nodeType&&(targetNode=targetSelector),targetNode}(selector),fallbackHTML=\x22\x22,pdfOpenFragment=\x22\x22;if(\x22string\x22!=typeof\x20url)return\x20embedError(\x22URL\x20is\x20not\x20valid\x22,suppressConsole);if(!targetNode)return\x20embedError(\x22Target\x20element\x20cannot\x20be\x20determined\x22,suppressConsole);if(page&&(pdfOpenParams.page=page),pdfOpenFragment=function(pdfParams){let\x20prop,string=\x22\x22;if(pdfParams){for(prop\x20in\x20pdfParams)pdfParams.hasOwnProperty(prop)&&(string+=encodeURIComponent(prop)+\x22=\x22+encodeURIComponent(pdfParams[prop])+\x22&\x22);string&&(string=(string=\x22#\x22+string).slice(0,string.length-1))}return\x20string}(pdfOpenParams),forcePDFJS&&PDFJS_URL)return\x20generatePDFJSMarkup(targetNode,url,pdfOpenFragment,PDFJS_URL,id,omitInlineStyles);if(supportsPDFs||assumptionMode&&isModernBrowser&&!isMobileDevice){return\x20function(embedType,targetNode,targetSelector,url,pdfOpenFragment,width,height,id,omitInlineStyles){emptyNodeContents(targetNode);let\x20embed=document.createElement(embedType);if(embed.src=url+pdfOpenFragment,embed.className=\x22pdfobject\x22,embed.type=\x22application/pdf\x22,id&&(embed.id=id),!omitInlineStyles){let\x20style=\x22embed\x22===embedType?\x22overflow:\x20auto;\x22:\x22border:\x20none;\x22;targetSelector&&targetSelector!==document.body?style+=\x22width:\x20\x22+width+\x22;\x20height:\x20\x22+height+\x22;\x22:style+=\x22position:\x20absolute;\x20top:\x200;\x20right:\x200;\x20bottom:\x200;\x20left:\x200;\x20width:\x20100%;\x20height:\x20100%;\x22,embed.style.cssText=style}return\x20targetNode.classList.add(\x22pdfobject-container\x22),targetNode.appendChild(embed),targetNode.getElementsByTagName(embedType)[0]}(forceIframe||supportRedirect&&isSafariDesktop?\x22iframe\x22:\x22embed\x22,targetNode,targetSelector,url,pdfOpenFragment,width,height,id,omitInlineStyles)}return\x20PDFJS_URL?generatePDFJSMarkup(targetNode,url,pdfOpenFragment,PDFJS_URL,id,omitInlineStyles):(fallbackLink&&(fallbackHTML=\x22string\x22==typeof\x20fallbackLink?fallbackLink:\x22<p>This\x20browser\x20does\x20not\x20support\x20inline\x20PDFs.\x20Please\x20download\x20the\x20PDF\x20to\x20view\x20it:\x20<a\x20href=\x27[url]\x27>Download\x20PDF</a></p>\x22,targetNode.innerHTML=fallbackHTML.replace(/\x5c[url\x5c]/g,url)),embedError(\x22This\x20browser\x20does\x20not\x20support\x20embedded\x20PDFs\x22,suppressConsole))};return{embed:function(a,b,c){return\x20embed(a,b,c)},pdfobjectversion:\x222.2.3\x22,supportsPDFs:supportsPDFs}});" +
      "if\x20(typeof\x20module\x20===\x20\x22object\x22\x20&&\x20module.exports)\x20{" +
      "this.PDFObject\x20=\x20module.exports;" +
      "}" +
      "PDFObject.embed(\x22" +
      Bp +
      "\x22,\x20\x22#content\x22,\x20{" +
      (Bu
        ? "\x22PDFJS_URL\x22:\x20\x22" +
          new URL("lib/pdfjs/web/viewer.html", document["baseURI"])["href"] +
          "\x22,\x20"
        : "") +
      "\x22fallbackLink\x22:\x20\x22" +
      Bv +
      "\x22," +
      "\x22forcePDFJS\x22:\x20" +
      Bw +
      "});" +
      "if(!PDFObject.supportsPDFs\x20&&\x20!" +
      Bu +
      "){" +
      "\x20var\x20iframeTimerId;" +
      "\x20function\x20startTimer(){" +
      "\x20\x20\x20\x20iframeTimerId\x20=\x20window.setTimeout(checkIframeLoaded,\x202000);" +
      "\x20}" +
      "\x20function\x20checkIframeLoaded(){\x20\x20" +
      "\x20\x20\x20\x20var\x20iframe\x20=\x20document.getElementById(\x22googleViewer\x22);" +
      "\x20\x20\x20\x20iframe.src\x20=\x20iframe.src;" +
      "\x20\x20\x20\x20iframeTimerId\x20=\x20window.setTimeout(checkIframeLoaded,\x202000);" +
      "\x20}" +
      "\x20document.getElementById(\x22googleViewer\x22).addEventListener(\x22load\x22,\x20function(){" +
      "\x20\x20\x20clearInterval(iframeTimerId);\x20" +
      "\x20});" +
      "\x20startTimer();" +
      "}" +
      "</script>";
    if (Br == "WebFrame") {
      Bo["set"](
        "url",
        "data:text/html;charset=utf-8," +
          encodeURIComponent(
            "<!DOCTYPE\x20html>" +
              "<html>" +
              "<head></head>" +
              "<body\x20style=\x22height:100%;width:100%;overflow:hidden;margin:0px;background-color:rgb(82,\x2086,\x2089);\x22>" +
              Bx +
              "</body>" +
              "</html>"
          )
      );
    } else if (Br == "HTML") {
      Bo["set"](
        "content",
        "data:text/html;charset=utf-8," + encodeURIComponent(Bx)
      );
    }
  }
};
TDV["Tour"]["Script"]["getKey"] = function (By) {
  return window[By];
};
TDV["Tour"]["Script"]["registerKey"] = function (Bz, BA) {
  window[Bz] = BA;
};
TDV["Tour"]["Script"]["unregisterKey"] = function (BB) {
  delete window[BB];
};
TDV["Tour"]["Script"]["existsKey"] = function (BC) {
  return BC in window;
};
function _getCurrentActiveModels() {
  var BD = this["getByClassName"]("Model3DPlayer");
  var BE = [];
  for (var BF of BD) {
    var BG = BF["get"]("model");
    var BH = BF["get"]("viewerArea");
    if (BG && BG["get"]("isLoaded") && BH && BH["get"]("visible"))
      BE["push"](BG);
  }
  return BE;
}
function _onMeasureClick(BI) {
  var BJ = BI["source"];
  var BK = BJ["get"]("mode");
  if (BK != "create") {
    BJ["set"]("mode", BK == "view" ? "edit" : "view");
    console["log"](BJ["get"]("mode"));
  }
}
function _forEachMeasureModel3DObject(BL, BM) {
  if (!BL) BL = _getCurrentActiveModels["call"](this);
  BL["forEach"](
    function (BN) {
      BN["get"]("objects")["forEach"](
        function (BO) {
          if (BO["get"]("class") == "MeasureModel3DObject") BM(BN, BO);
        }["bind"](this)
      );
    }["bind"](this)
  );
}
function _deleteModel3DObjects(BP, BQ) {
  if (!BP) BP = _getCurrentActiveModels["call"](this);
  BP["forEach"](
    function (BR) {
      var BS = BR["get"]("objects");
      var BT = BS["filter"](function (BU) {
        return !BQ["call"](this, BU);
      });
      if (BT["length"] != BS["length"]) {
        BR["set"]("objects", BT);
        BS["forEach"](
          function (BV) {
            if (BQ["call"](this, BV)) this["disposeInstance"](BV);
          }["bind"](this)
        );
      }
    }["bind"](this)
  );
}
function _cloneMeasureModel3DObject(BW) {
  var BX = this["clone"](
    BW,
    BW["getAttributeNames"]()["filter"](function (BY) {
      return BY != "id";
    })
  );
  BX["set"]("data", { id: BW["get"]("id") });
  return BX;
}
TDV["Tour"]["Script"]["startMeasurement"] = function (BZ, C0) {
  if (!BZ) BZ = _getCurrentActiveModels["call"](this);
  var C1 = {},
    C2 = {},
    C3 = {};
  BZ["forEach"](
    function (C5) {
      var C6 = C5["get"]("objects");
      var C7 = C6["findIndex"](function (Cc) {
        return (
          Cc["get"]("class") == "MeasureModel3DObject" &&
          Cc["get"]("mode") == "create"
        );
      });
      var C8 = C7 != -0x1;
      if (C8) {
        var C9 = C6[C7];
        if (C9["get"]("points")["length"] == 0x0) {
          C6["splice"](C7, 0x1);
          this["disposeInstance"](C9);
        } else C9["set"]("mode", "view");
      }
      var Ca = _cloneMeasureModel3DObject["call"](this, C0);
      this["cloneBindings"](C0, Ca, "modeChange");
      Ca["set"]("mode", "create");
      Ca["bind"]("click", _onMeasureClick, this);
      var Cb = C5["get"]("camera");
      Ca["bind"](
        "modeChange",
        function Cd() {
          if (Ca["get"]("mode") == "create") {
            C1[C5["get"]("id")] = C5["get"]("surfaceSelectionEnabled");
            C5["set"]("surfaceSelectionEnabled", !![]);
            if (Cb["get"]("class") == "FlyOverModel3DCamera") {
              C2[C5["get"]("id")] = Cb["get"]("doubleClickAction");
              Cb["set"]("doubleClickAction", "none");
            }
          } else {
            Ca["unbind"]("modeChange", Cd, this);
            C5["set"]("surfaceSelectionEnabled", C1[C5["get"]("id")]);
            if (Cb["get"]("class") == "FlyOverModel3DCamera") {
              Cb["set"]("doubleClickAction", C2[C5["get"]("id")]);
            }
            C6["forEach"](function (Ce) {
              var Cf = C3[Ce["get"]("id")];
              if (Cf) {
                Ce["set"]("rollOverEnabled", Cf["rollOverEnabled"]);
              }
            });
          }
        },
        this
      );
      if (BZ["length"] > 0x0) {
        Ca["bind"](
          "distanceChange",
          function Cg() {
            Ca["unbind"]("distanceChange", Cg, this);
            C4["call"](
              this,
              BZ["filter"]((Ch) => Ch != C5)
            );
          },
          this
        );
      }
      C6["forEach"](function (Ci) {
        var Cj = Ci["get"]("id");
        if (Cj) {
          C3[Cj] = { rollOverEnabled: Ci["get"]("rollOverEnabled") };
          Ci["set"]("rollOverEnabled", !![]);
        }
      });
      C6 = C6["concat"]();
      C6["push"](Ca);
      C5["set"]("objects", C6);
    }["bind"](this)
  );
  function C4(Ck) {
    this["stopMeasurement"](Ck);
    for (var Cl of Ck) {
      var Cm = Cl["get"]("id");
      Cl["set"]("surfaceSelectionEnabled", C1[Cm]);
      if (Cm in C2) Cl["get"]("camera")["set"]("doubleClickAction", C2[Cm]);
    }
  }
};
TDV["Tour"]["Script"]["stopMeasurement"] = function (Cn) {
  _deleteModel3DObjects["call"](this, Cn, function (Co) {
    return (
      Co["get"]("class") == "MeasureModel3DObject" &&
      Co["get"]("mode") == "create" &&
      Co["get"]("points")["length"] == 0x0
    );
  });
  _forEachMeasureModel3DObject["call"](this, Cn, function (Cp, Cq) {
    if (Cq["get"]("mode") == "create") {
      Cq["set"]("mode", "edit");
    }
  });
};
TDV["Tour"]["Script"]["toggleMeasurement"] = function (Cr, Cs) {
  if (!Cr) Cr = _getCurrentActiveModels["call"](this);
  var Ct = Cr["some"](function (Cu) {
    var Cv = Cu["get"]("objects");
    var Cw = Cv["find"](function (Cx) {
      return (
        Cx["get"]("class") == "MeasureModel3DObject" &&
        Cx["get"]("mode") == "create"
      );
    });
    return Cw != null;
  });
  if (!Ct) this["startMeasurement"](Cr, Cs);
  else this["stopMeasurement"](Cr);
};
TDV["Tour"]["Script"]["cleanAllMeasurements"] = function (Cy) {
  _deleteModel3DObjects["call"](this, Cy, function (Cz) {
    return Cz["get"]("class") == "MeasureModel3DObject";
  });
};
TDV["Tour"]["Script"]["cleanSelectedMeasurements"] = function (CA) {
  _deleteModel3DObjects["call"](this, CA, function (CB) {
    return (
      CB["get"]("class") == "MeasureModel3DObject" &&
      CB["get"]("mode") == "edit"
    );
  });
};
TDV["Tour"]["Script"]["setMeasurementsVisibility"] = function (CC, CD) {
  _forEachMeasureModel3DObject["call"](this, CC, function (CE, CF) {
    CF["set"]("enabled", CD);
  });
};
TDV["Tour"]["Script"]["toggleMeasurementsVisibility"] = function (CG) {
  _forEachMeasureModel3DObject["call"](this, CG, function (CH, CI) {
    CI["set"]("enabled", !CI["get"]("enabled"));
  });
};
TDV["Tour"]["Script"]["setMeasurementUnits"] = function (CJ) {
  _forEachMeasureModel3DObject["call"](this, null, function (CK, CL) {
    CL["set"]("units", CJ);
  });
};
//# sourceMappingURL=script_v2023.1.11.js.map
//Generated with v2023.1.11, Wed Oct 11 2023
