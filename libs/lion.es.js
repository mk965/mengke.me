/* eslint-disable prettier/prettier */
var P = Object.defineProperty;
var L = (n, e, t) => e in n ? P(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var a = (n, e, t) => (L(n, typeof e != "symbol" ? e + "" : e, t), t);
class I {
  constructor() {
    a(this, "logLevel", "error");
    a(this, "levelsInfo", {
      error: { key: "error", level: 4, color: "#CC0000" },
      warn: { key: "warn", level: 3, color: "#FF9900" },
      info: { key: "info", level: 2, color: "#009933" },
      debug: { key: "debug", level: 1, color: "#0099FF" }
    });
    a(this, "error", (...e) => {
      this.logIfEnabled("error", ...e);
    });
    a(this, "warn", (...e) => {
      this.logIfEnabled("warn", ...e);
    });
    a(this, "info", (...e) => {
      this.logIfEnabled("info", ...e);
    });
    a(this, "debug", (...e) => {
      this.logIfEnabled("debug", ...e);
    });
  }
  setup(e) {
    this.logLevel = e;
  }
  logIfEnabled(e, ...t) {
    const i = this.levelsInfo[e];
    i.level >= this.levelsInfo[this.logLevel].level && this.logWithColor(i, ...t);
  }
  logWithColor(e, ...t) {
    console.log(
      `%c AVP %c ${e.key.toUpperCase()} %c ${t[0]} `,
      "background: #7837f5; color: #fff; padding: 1px; border-radius: 2px 0 0 2px;",
      `background: ${e.color}; color: #fff; padding: 1px; border-right: solid 1px #fff;`,
      `background: ${e.color}; color: #fff; padding: 1px; border-radius: 0 2px 2px 0;`,
      ...t.slice(1)
    );
  }
}
const r = new I();
let m, g;
const S = (n) => ({
  getShareDataCanvas: () => ({
    shareDataCanvas: m,
    shareDataContext: g
  }),
  setShareDataCanvas: () => {
    n === "canvas" ? (m = document.createElement("canvas"), g = m.getContext(
      "2d",
      // Multiple readback operations using getImageData are faster with the willReadFrequently attribute set to true.
      { willReadFrequently: !0 }
    )) : n === "webgl" && (m = document.createElement("canvas"), g = m.getContext("webgl", {
      alpha: !0,
      antialias: !1,
      depth: !0,
      failIfMajorPerformanceCaveat: !1,
      premultipliedAlpha: !0,
      stencil: !1,
      preserveDrawingBuffer: !1
    }));
  },
  hasShareDataCanvas: () => !!(m && g),
  destroy: () => {
    m = null, g = null;
  }
});
class F {
  constructor(e, t) {
    a(this, "isPlaying", !1);
    a(this, "_options");
    a(this, "_video");
    a(this, "_stageCanvas");
    a(this, "_stageContext");
    a(this, "_dataCanvas");
    a(this, "_dataContext");
    if (this._video = t, this._options = e, e.shareDataCanvas) {
      const { getShareDataCanvas: i, setShareDataCanvas: s, hasShareDataCanvas: d } = S("canvas");
      d() || s();
      const { shareDataCanvas: o, shareDataContext: h } = i();
      this._dataCanvas = o, this._dataContext = h;
    } else
      this._dataCanvas = document.createElement("canvas"), this._dataContext = this._dataCanvas.getContext(
        "2d",
        // Multiple readback operations using getImageData are faster with the willReadFrequently attribute set to true.
        { willReadFrequently: !0 }
      );
    this._stageCanvas = this._options.canvas ? this._options.canvas : document.createElement("canvas"), this._stageContext = this._stageCanvas.getContext("2d");
  }
  async setup(e) {
    r.debug("Canvas Render Setup"), this._video = e, this.setCanvasSize(this._stageCanvas), this._dataCanvas.width = this._video.videoWidth, this._dataCanvas.height = this._video.videoHeight, this._options.container && !this._options.canvas && this._options.container.appendChild(this._stageCanvas);
  }
  setCanvasSize(e) {
    if (!this._video)
      throw r.error("No video"), new Error("No video");
    if (this._options.width || this._options.height)
      this._options.width && (e.width = this._options.width), this._options.height && (e.height = this._options.height);
    else {
      const { videoWidth: t, videoHeight: i } = this._video;
      e.width = t / 2, e.height = i;
    }
  }
  render() {
    this.renderDataCanvas(), this.renderStageCanvas();
  }
  renderDataCanvas() {
    this._dataCanvas.width === 0 && (this._dataCanvas.width = this._video.videoWidth, this._dataCanvas.height = this._video.videoHeight);
    const { videoWidth: e, videoHeight: t } = this._video, i = this._dataCanvas.width, s = this._dataCanvas.height;
    this._dataContext.drawImage(
      this._video,
      0,
      0,
      e,
      t,
      0,
      0,
      i,
      s
    );
    const d = this._dataContext.getImageData(0, 0, i, s), o = this._dataContext.getImageData(i / 2, 0, i, s), h = this._options.alphaPlacement === "left" ? o : d, l = this._options.alphaPlacement === "left" ? d : o;
    for (let v = 3; v < h.data.length; v += 4)
      h.data[v] = l.data[v - 1];
    this._dataContext.putImageData(
      h,
      0,
      0,
      0,
      0,
      i / 2,
      s
    );
  }
  renderStageCanvas() {
    const { width: e, height: t } = this._stageCanvas, { width: i, height: s } = this._dataCanvas;
    this.clearStage(), this._stageContext.drawImage(
      this._dataCanvas,
      0,
      0,
      i / 2,
      s,
      0,
      0,
      this._options.width ?? e,
      this._options.height ?? t
    );
  }
  clearStage() {
    this._stageContext.clearRect(0, 0, this._stageCanvas.width, this._stageCanvas.height);
  }
  destroy() {
    var e, t;
    this.isPlaying = !1, this._video = null, (t = (e = this._options) == null ? void 0 : e.container) == null || t.removeChild(this._stageCanvas), this._stageContext = null, this._stageCanvas = null, this._options.shareDataCanvas || (this._dataContext = null, this._dataCanvas = null), this._options = null, r.debug("Canvas Render is destroyed");
  }
}
class V {
  constructor(e) {
    a(this, "_options");
    a(this, "_video");
    a(this, "stage");
    a(this, "stageCtx");
    a(this, "glCanvas");
    a(this, "glCtx");
    a(this, "_vShader", null);
    a(this, "_fShader", null);
    a(this, "_program");
    a(this, "_texture", null);
    a(this, "_videoTexture", null);
    if (this._options = e, this.stage = this._options.canvas ? this._options.canvas : document.createElement("canvas"), this.stageCtx = this.stage.getContext("2d"), e.container && !this._options.canvas && e.container.appendChild(this.stage), e.shareDataCanvas) {
      const { getShareDataCanvas: t, setShareDataCanvas: i, hasShareDataCanvas: s } = S("webgl");
      s() || i();
      const { shareDataCanvas: d, shareDataContext: o } = t();
      this.glCanvas = d, this.glCtx = o;
    } else
      this.glCanvas = document.createElement("canvas"), this.glCtx = this.glCanvas.getContext("webgl", {
        alpha: !0,
        antialias: !1,
        depth: !0,
        failIfMajorPerformanceCaveat: !1,
        premultipliedAlpha: !0,
        stencil: !1,
        preserveDrawingBuffer: !1
      });
  }
  setup(e) {
    this._video = e, this.setCanvasSize(this.stage), this.setCanvasSize(this.glCanvas);
    const t = this.glCtx;
    if (!t) {
      console.error("Failed to create WebGL context.");
      return;
    }
    t.viewport(0, 0, t.drawingBufferWidth, t.drawingBufferHeight), t.disable(t.BLEND), t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, 1), this._program = this.createProgram(t), this._program && (this._texture = this.createTexture(t, this._program, this._video), this.createVideoTexture(t, this._program, this._video));
  }
  render() {
    if (!this.glCtx || !this._video || !this._program)
      return;
    const e = this.glCtx;
    e.texImage2D(
      e.TEXTURE_2D,
      0,
      e.RGB,
      e.RGB,
      e.UNSIGNED_BYTE,
      this._video
    ), e.drawArrays(e.TRIANGLE_STRIP, 0, 4);
    const { width: t, height: i } = this.stage;
    this.clearStage(), this.stageCtx.drawImage(
      e.canvas,
      0,
      0,
      t,
      i,
      0,
      0,
      t,
      i
    );
  }
  clearStage() {
    this.stageCtx.clearRect(0, 0, this.stage.width, this.stage.height);
  }
  // 创建顶点着色器
  createVertexShader(e) {
    const t = e.createShader(e.VERTEX_SHADER);
    if (this._vShader = t, !t)
      throw new Error();
    return e.shaderSource(
      t,
      "attribute vec2 a_position; attribute vec2 a_color_texCoord; attribute vec2 a_alpha_texCoord; varying vec2 v_color_texCoord; varying vec2 v_alpha_texCoord; void main(void){ gl_Position = vec4(a_position, 0.0, 1.0); v_color_texCoord = a_color_texCoord; v_alpha_texCoord = a_alpha_texCoord; }"
    ), e.compileShader(t), t;
  }
  // 创建片元着色器
  createFragmentShader(e) {
    const t = e.createShader(e.FRAGMENT_SHADER);
    if (this._fShader = t, !t)
      throw new Error();
    return e.shaderSource(
      t,
      "precision lowp float; varying vec2 v_color_texCoord; varying vec2 v_alpha_texCoord; uniform sampler2D u_video_frame; void main(void) { vec4 bgColor = vec4(texture2D(u_video_frame, v_color_texCoord).rgb, texture2D(u_video_frame, v_alpha_texCoord).b); gl_FragColor = bgColor; }"
    ), e.compileShader(t), t;
  }
  // 创建程序
  createProgram(e) {
    const t = this.createVertexShader(e);
    r.debug("顶点着色器日志：", e.getShaderInfoLog(t));
    const i = this.createFragmentShader(e);
    r.debug("片元着色器日志：", e.getShaderInfoLog(i));
    const s = e.createProgram();
    e.attachShader(s, t), e.attachShader(s, i), e.linkProgram(s);
    const d = e.getProgramParameter(s, e.LINK_STATUS);
    if (r.debug("WebGL 着色器链接状态", d), !d) {
      const o = e.getProgramInfoLog(s);
      throw r.error("Failed to link _program: " + o), new Error("Failed to link _program: " + o);
    }
    return e.useProgram(s), s;
  }
  // 创建纹理
  createTexture(e, t, i) {
    const s = e.createTexture();
    return e.bindTexture(e.TEXTURE_2D, s), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR), i && e.texImage2D(
      e.TEXTURE_2D,
      0,
      e.RGBA,
      e.RGBA,
      e.UNSIGNED_BYTE,
      i
    ), s;
  }
  // 创建视频纹理
  createVideoTexture(e, t, i) {
    if (!this._video)
      throw r.error("No _video"), new Error("No _video");
    const { cX: s, cY: d, cW: o, cH: h, vW: l, vH: v, aX: p, aY: f, aW: C, aH: E } = this.getVideoCoord(this._video), _ = this.computeCoord(s, d, o, h, l, v), c = this.computeCoord(p, f, C, E, l, v), R = [
      -1,
      1,
      _[0],
      _[3],
      c[0],
      c[3],
      1,
      1,
      _[1],
      _[3],
      c[1],
      c[3],
      -1,
      -1,
      _[0],
      _[2],
      c[0],
      c[2],
      1,
      -1,
      _[1],
      _[2],
      c[1],
      c[2]
    ], D = new Float32Array(R);
    e.bindBuffer(e.ARRAY_BUFFER, e.createBuffer()), e.bufferData(e.ARRAY_BUFFER, D, e.STATIC_DRAW);
    const u = D.BYTES_PER_ELEMENT, x = e.getAttribLocation(t, "a_position");
    e.enableVertexAttribArray(x), e.vertexAttribPointer(x, 2, e.FLOAT, !1, u * 6, 0);
    const w = e.getAttribLocation(t, "a_color_texCoord");
    e.enableVertexAttribArray(w), e.vertexAttribPointer(w, 2, e.FLOAT, !1, u * 6, u * 2);
    const y = e.getAttribLocation(t, "a_alpha_texCoord");
    e.enableVertexAttribArray(y), e.vertexAttribPointer(y, 2, e.FLOAT, !1, u * 6, u * 4);
  }
  getVideoCoord(e) {
    const { videoWidth: t, videoHeight: i } = e, s = t / 2, d = [s, 0, s, i], o = [0, 0, s, i], [h, l, v, p] = this._options.alphaPlacement === "left" ? d : o, [f, C, E, _] = this._options.alphaPlacement === "left" ? o : d;
    return { cX: h, cY: l, cW: v, cH: p, vW: t, vH: i, aX: f, aY: C, aW: E, aH: _ };
  }
  computeCoord(e, t, i, s, d, o) {
    return [e / d, (e + i) / d, (o - t - s) / o, (o - t) / o];
  }
  setCanvasSize(e) {
    if (!this._video)
      throw r.error("No video"), new Error("No video");
    if (this._options.width || this._options.height)
      this._options.width && (e.width = this._options.width), this._options.height && (e.height = this._options.height);
    else {
      const { videoWidth: t, videoHeight: i } = this._video;
      e.width = t / 2, e.height = i;
    }
  }
  destroy() {
    var e, t;
    if (this._video = null, (t = (e = this._options) == null ? void 0 : e.container) == null || t.removeChild(this.stage), !this._options.shareDataCanvas) {
      const i = this.glCtx;
      i.disable(i.DEPTH_TEST), i.disable(i.BLEND), i.bindBuffer(i.ARRAY_BUFFER, null), i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, null), i.bindTexture(i.TEXTURE_2D, null), i.deleteShader(this._vShader), i.deleteShader(this._fShader), this._program && i.deleteProgram(this._program), i.deleteTexture(this._texture), this.glCtx = null, this.glCanvas = null;
    }
    this.stage = null, this.stageCtx = null, this._program = null, this._vShader = null, this._fShader = null, this._options = null, r.debug("WebGL Render is destroyed");
  }
}
const T = (n) => n instanceof File ? {
  id: `mico_lion_video_${n.name}`,
  name: n.name,
  url: URL.createObjectURL(n)
} : {
  id: `mico_lion_video_${n}`,
  name: n,
  url: n
};
class U {
  constructor(e) {
    a(this, "videoDom");
    a(this, "_onStartCb");
    a(this, "_onEndedCb");
    if (!(e instanceof HTMLVideoElement))
      throw r.error("videoDom must be a HTMLVideoElement"), new Error("videoDom must be a HTMLVideoElement");
    this.videoDom = e;
  }
  onStart(e) {
    this._onStartCb = e, this.videoDom.removeEventListener("play", this.videoEventsHandle.bind(this)), this.videoDom.addEventListener("play", this.videoEventsHandle.bind(this));
  }
  onEnded(e) {
    this._onEndedCb = e, this.videoDom.removeEventListener("ended", this.videoEventsHandle.bind(this)), this.videoDom.addEventListener("ended", this.videoEventsHandle.bind(this));
  }
  destroy() {
    this.videoDom.removeEventListener("play", this.videoEventsHandle.bind(this)), this.videoDom.removeEventListener("ended", this.videoEventsHandle.bind(this));
  }
  videoEventsHandle(e) {
    var t, i;
    switch (e.type) {
      case "play":
        r.debug("Play Event"), this._onStartCb && ((t = this._onStartCb) == null || t.call(this));
        break;
      case "ended":
        r.debug("Ended Event"), this._onEndedCb && ((i = this._onEndedCb) == null || i.call(this));
        break;
      case "pause":
        r.debug("Pause Event");
        break;
    }
  }
}
class H {
  constructor(e, t) {
    a(this, "fps", 0);
    a(this, "frameTime", 0);
    a(this, "lastFrameTime", 0);
    a(this, "isAnimating");
    a(this, "animationId");
    a(this, "drawCallback");
    this.onDraw = e, t && (this.fps = t, this.frameTime = 1e3 / t, this.lastFrameTime = 0), this.isAnimating = !1, this.animationId = null, this.drawCallback = (i) => {
      this.fps ? i - this.lastFrameTime >= this.frameTime && (this.lastFrameTime = i, this.onDraw()) : this.onDraw(), this.isAnimating && (this.animationId = requestAnimationFrame(this.drawCallback));
    };
  }
  start() {
    this.isAnimating || (this.isAnimating = !0, this.animationId = requestAnimationFrame(this.drawCallback));
  }
  stop() {
    this.isAnimating && (cancelAnimationFrame(this.animationId), this.isAnimating = !1, this.animationId = null);
  }
  destroy() {
    this.stop(), this.onDraw = () => {
    };
  }
}
const b = /* @__PURE__ */ new Map(), A = async ({ urls: n }) => {
  const e = [];
  n.forEach((t, i) => {
    e.push(
      new Promise((s, d) => {
        const o = document.createElement("video");
        o.crossOrigin = "anonymous", o.src = t, r.debug("Start preloading videos", t), o.addEventListener("loadeddata", () => {
          r.debug(`Finish: ${i + 1}`, t), s();
        }), o.addEventListener("error", (l) => {
          r.error("Error: ", t), d(t);
        });
        const { id: h } = T(t);
        b.set(h, o), o.load();
      })
    );
  }), await Promise.all(e), r.info("All preloading completed");
}, W = (n, e = "info") => {
  r.setup(e), r.info("Preload List", n), document.readyState === "complete" ? A({ urls: n }) : window.addEventListener("load", () => {
    A({ urls: n });
  });
};
class B {
  constructor(e) {
    a(this, "isPlaying", !1);
    a(this, "isEnded", !1);
    a(this, "_isDestroyed", !1);
    a(this, "_animator", null);
    a(this, "_renderer");
    a(this, "_options");
    a(this, "_videoDom");
    a(this, "_videoID");
    a(this, "_videoName");
    a(this, "_videoUrl");
    a(this, "_videoFile");
    a(this, "_playerEvents");
    a(this, "_emitError", (e, ...t) => {
      r.error(e, ...t), this._options.onError && this._options.onError(e instanceof Error ? e : new Error(e));
    });
    this._options = e;
    const { id: t, name: i, url: s } = T(this._options.video);
    this._videoID = t, this._videoName = i, this._videoUrl = s, this._videoDom = this.createVideo(), this._options.mode === "canvas" ? (r.debug("Mode", "Canvas"), this._renderer = new F(this._options, this._videoDom)) : (r.debug("Mode", "WebGL"), this._renderer = new V(this._options)), this._isDestroyed = !1;
  }
  /**
   * Sets up the video player.
   */
  async setup() {
    r.debug("Video starts loading"), await this.loadVideo(), r.debug("Video loading complete"), await this._renderer.setup(this._videoDom), this.initEvents(), this._animator = new H(() => {
      this._renderer.render();
    });
  }
  /**
   * Creates a video element and returns it.
   * If the video element with the given ID already exists, it is returned.
   * If the video element does not exist, it is created and appended to the body.
   * 
   * @returns {HTMLVideoElement} The created or existing video element.
   */
  createVideo() {
    let e = document.getElementById(this._videoID) || void 0;
    return e instanceof HTMLVideoElement || (e = b.has(this._videoID) ? b.get(this._videoID) : document == null ? void 0 : document.createElement("video"), e.id = this._videoID, document.body.appendChild(e)), Object.assign(e.style, {
      visibility: "hidden",
      opacity: "0",
      position: "fixed",
      top: "-99999px",
      left: "-99999px"
    }), e.loop = this.checkRepeat(), e.poster = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", e.controls = !1, e.crossOrigin = "anonymous", e.autoplay = !1, e.preload = "auto", e.setAttribute("playsinline", ""), e.setAttribute("webkit-playsinline", ""), e.setAttribute("x-webkit-airplay", "deny"), r.debug("Video Dom Created", e), e;
  }
  /**
   * Checks if the repeat option is enabled.
   * @returns {boolean} true if the repeat option is enabled, false otherwise.
   */
  checkRepeat() {
    return this._options.repeat ?? !1;
  }
  /**
   * Loads the video asynchronously.
   * 
   * @returns {Promise<void>} A promise that resolves when the video is loaded successfully or rejects if there is an error.
   */
  async loadVideo() {
    return this._videoDom ? new Promise((e, t) => {
      if (!this._options.video || !this._videoDom)
        return;
      const i = this.getVideoUrl();
      r.debug("加载视频", i, this._videoDom.readyState), r.debug(`Video Ready State: ${this._videoDom.readyState}`), this._videoDom.readyState > 2 ? (r.debug("Video already loaded, no need to load again"), e()) : (r.debug("Video not loaded, starting loading now"), this._videoDom.src = i, this._videoDom.load(), this._videoDom.onloadeddata = () => {
        r.debug("Video loading completed"), e();
      }), this._videoDom.onerror = (s) => {
        var d, o;
        console.log("视频加载出错", (o = (d = this._videoDom) == null ? void 0 : d.error) == null ? void 0 : o.code), this._emitError("Error loading video", s), t();
      };
    }) : (this._emitError("No Video"), Promise.reject("No Video"));
  }
  /**
   * Returns the video URL.
   * If the _videoFile is an instance of File, it returns the object URL of the file.
   * Otherwise, it returns the _videoUrl.
   * 
   * @returns {string} The video URL.
   */
  getVideoUrl() {
    return this._videoFile instanceof File ? URL.createObjectURL(this._videoFile) : this._videoUrl;
  }
  /**
   * Destroy the player and clean up resources.
   */
  destroy() {
    var e, t, i, s, d, o, h, l;
    this._isDestroyed || (this._isDestroyed = !0, (t = (e = this._renderer) == null ? void 0 : e.destroy) == null || t.call(e), (s = (i = this._animator) == null ? void 0 : i.destroy) == null || s.call(i), this._playerEvents && ((o = (d = this._playerEvents) == null ? void 0 : d.destroy) == null || o.call(d)), this.isPlaying = !1, this.isEnded = !0, this._renderer = null, this._options = {}, (l = (h = window == null ? void 0 : window.document) == null ? void 0 : h.body) == null || l.removeChild(this._videoDom), this._videoID = "", this._videoName = "", this._videoUrl = "", this._videoFile = void 0, r.debug("Player is destroyed"));
  }
  /**
   * Plays the video.
   * 
   * @returns {Player} The Player instance.
   */
  play() {
    var e;
    return this._isDestroyed ? (this._emitError("Player is destroyed"), this) : (this._videoDom.currentTime = 0, (e = this._videoDom) == null || e.play().then(() => {
      r.debug("Play"), this.isPlaying = !0;
    }).catch((t) => {
      this._emitError("Play error", t);
    }), this);
  }
  /**
   * Stop the player.
   * 
   * @returns {Player} The updated player instance.
   */
  stop() {
    var e, t;
    return this._isDestroyed ? (this._emitError("Player is destroyed"), this) : (this._videoDom.currentTime = 0, (e = this._animator) == null || e.stop(), (t = this._videoDom) == null || t.pause(), this._renderer.clearStage(), this.isPlaying = !1, r.debug("Stop"), this);
  }
  /**
   * Initializes the events for the player.
   *
   * @private
   */
  initEvents() {
    var e, t;
    this._playerEvents = new U(this._videoDom), (e = this._playerEvents) == null || e.onStart(() => {
      var i, s, d;
      (i = this._animator) == null || i.start(), this.isPlaying = !0, this.isEnded = !1, this._options.onStart instanceof Function && ((d = (s = this._options).onStart) == null || d.call(s));
    }), (t = this._playerEvents) == null || t.onEnded(() => {
      var i, s, d, o;
      (i = this._animator) == null || i.stop(), (s = this._renderer) == null || s.clearStage(), this.isPlaying = !1, this.isEnded = !0, this._options.onEnded instanceof Function && ((o = (d = this._options).onEnded) == null || o.call(d));
    });
  }
}
async function k(n) {
  const e = {
    repeat: !1,
    alphaPlacement: "left",
    mute: !1,
    mode: "webgl",
    shareDataCanvas: !0,
    ...n
  };
  r.setup((n == null ? void 0 : n.logLevel) ?? "error");
  const t = new B(e);
  return await t.setup(), t;
}
export {
  k as Lion,
  B as Player,
  W as Preload,
  k as default
};
