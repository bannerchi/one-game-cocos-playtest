System.register("chunks:///_virtual/main", ['./PrototypeApp.ts', './memory.ts', './onet.ts', './random.ts', './sokoban.ts', './stack.ts'], function () {
  return {
    setters: [null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/memory.ts", ['cc', './random.ts'], function (exports) {
  var cclegacy, shuffle;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      shuffle = module.shuffle;
    }],
    execute: function () {
      cclegacy._RF.push({}, "80855Db9lBCjItntjaUw5c5", "memory", undefined);
      var createMemory = exports('createMemory', function createMemory(seed, pairCount) {
        if (pairCount === void 0) {
          pairCount = 6;
        }
        if (!Number.isInteger(pairCount) || pairCount < 2 || pairCount > 12) {
          throw new Error('Memory needs 2–12 pairs');
        }
        return shuffle(Array.from({
          length: pairCount
        }, function (_, value) {
          return [value, value];
        }).flat(), seed);
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/onet.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './random.ts'], function (exports) {
  var _extends, _createForOfIteratorHelperLoose, cclegacy, seededRandom;
  return {
    setters: [function (module) {
      _extends = module.extends;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      seededRandom = module.seededRandom;
    }],
    execute: function () {
      exports({
        createOnet: createOnet,
        findConnection: findConnection,
        getOnetHint: getOnetHint,
        removeOnetPair: removeOnetPair,
        reshuffleOnet: reshuffleOnet
      });
      cclegacy._RF.push({}, "e5b33p/vUdCO7eNW/GgPH4a", "onet", undefined);
      function findConnection(board, a, b, rows, cols) {
        if (!Number.isInteger(rows) || !Number.isInteger(cols) || rows < 1 || cols < 1 || board.length !== rows * cols || !Number.isInteger(a) || !Number.isInteger(b) || a < 0 || b < 0 || a >= board.length || b >= board.length || a === b || board[a] === null || board[a] !== board[b]) return null;
        var start = {
          x: a % cols,
          y: Math.floor(a / cols)
        };
        var end = {
          x: b % cols,
          y: Math.floor(b / cols)
        };
        var passable = function passable(x, y) {
          if (x < -1 || x > cols || y < -1 || y > rows) return false;
          if (x === -1 || x === cols || y === -1 || y === rows) return true;
          var index = y * cols + x;
          return index === a || index === b || board[index] === null;
        };
        var clear = function clear(left, right) {
          if (left.x !== right.x && left.y !== right.y) return false;
          var dx = Math.sign(right.x - left.x),
            dy = Math.sign(right.y - left.y);
          var x = left.x,
            y = left.y;
          while (true) {
            if (!passable(x, y)) return false;
            if (x === right.x && y === right.y) return true;
            x += dx;
            y += dy;
          }
        };
        var compress = function compress(points) {
          var path = [];
          for (var _iterator = _createForOfIteratorHelperLoose(points), _step; !(_step = _iterator()).done;) {
            var point = _step.value;
            var last = path[path.length - 1];
            if (last && point.x === last.x && point.y === last.y) continue;
            if (path.length > 1) {
              var previous = path[path.length - 2];
              if (previous.x === last.x && last.x === point.x || previous.y === last.y && last.y === point.y) path.pop();
            }
            path.push(point);
          }
          return path;
        };
        var candidates = [[start, end], [start, {
          x: end.x,
          y: start.y
        }, end], [start, {
          x: start.x,
          y: end.y
        }, end]];
        for (var x = -1; x <= cols; x++) {
          candidates.push([start, {
            x: x,
            y: start.y
          }, {
            x: x,
            y: end.y
          }, end]);
        }
        for (var y = -1; y <= rows; y++) {
          candidates.push([start, {
            x: start.x,
            y: y
          }, {
            x: end.x,
            y: y
          }, end]);
        }
        var best = null,
          bestLength = Infinity;
        var _loop = function _loop() {
          var _best$length, _best;
          var points = _candidates[_i];
          if (!points.slice(1).every(function (point, index) {
            return clear(points[index], point);
          })) return 1; // continue
          var path = compress(points);
          var length = path.slice(1).reduce(function (total, point, index) {
            return total + Math.abs(point.x - path[index].x) + Math.abs(point.y - path[index].y);
          }, 0);
          if (length < bestLength || length === bestLength && path.length < ((_best$length = (_best = best) == null ? void 0 : _best.length) != null ? _best$length : Infinity)) {
            best = path;
            bestLength = length;
          }
        };
        for (var _i = 0, _candidates = candidates; _i < _candidates.length; _i++) {
          if (_loop()) continue;
        }
        return best;
      }
      function getOnetHint(state) {
        for (var a = 0; a < state.board.length; a++) {
          if (state.board[a] === null) continue;
          for (var b = a + 1; b < state.board.length; b++) {
            if (state.board[a] !== state.board[b]) continue;
            var path = findConnection(state.board, a, b, state.rows, state.cols);
            if (path) return {
              a: a,
              b: b,
              path: path
            };
          }
        }
        return null;
      }
      var hasOnetMove = exports('hasOnetMove', function hasOnetMove(state) {
        return getOnetHint(state) !== null;
      });
      function removeOnetPair(state, a, b) {
        var path = findConnection(state.board, a, b, state.rows, state.cols);
        if (!path) return null;
        var board = [].concat(state.board);
        board[a] = null;
        board[b] = null;
        return {
          state: _extends({}, state, {
            board: board,
            remaining: state.remaining - 2,
            moves: state.moves + 1
          }),
          path: path
        };
      }
      function playableBoard(state, faces, positions, seed) {
        var random = seededRandom(seed);
        var shuffle = function shuffle(values) {
          var shuffled = [].concat(values);
          for (var i = shuffled.length - 1; i > 0; i--) {
            var other = Math.floor(random() * (i + 1));
            var _ref = [shuffled[other], shuffled[i]];
            shuffled[i] = _ref[0];
            shuffled[other] = _ref[1];
          }
          return shuffled;
        };
        var _loop2 = function _loop2() {
            var shuffled = shuffle(faces),
              board = Array(state.board.length).fill(null);
            positions.forEach(function (position, index) {
              board[position] = shuffled[index];
            });
            var trial = _extends({}, state, {
              board: board,
              remaining: faces.length
            });
            while (trial.remaining) {
              var hint = getOnetHint(trial);
              if (!hint) break;
              trial = removeOnetPair(trial, hint.a, hint.b).state;
            }
            if (!trial.remaining) return {
              v: board
            };
          },
          _ret;
        for (var attempt = 0; attempt < 80; attempt++) {
          _ret = _loop2();
          if (_ret) return _ret.v;
        }
        // Consecutive occupied cells in row-major order always have a clear one-turn route.
        var counts = new Map();
        faces.forEach(function (face) {
          var _counts$get;
          return counts.set(face, ((_counts$get = counts.get(face)) != null ? _counts$get : 0) + 1);
        });
        var pairs = [];
        counts.forEach(function (count, face) {
          if (count % 2) throw new Error('Onet faces must form pairs');
          for (var i = 0; i < count / 2; i++) pairs.push(face);
        });
        var values = shuffle(pairs),
          board = Array(state.board.length).fill(null);
        positions.forEach(function (position, index) {
          board[position] = values[Math.floor(index / 2)];
        });
        return board;
      }
      function createOnet(seed, rows, cols) {
        if (rows === void 0) {
          rows = 6;
        }
        if (cols === void 0) {
          cols = 6;
        }
        if (!Number.isInteger(rows) || !Number.isInteger(cols) || rows < 1 || cols < 1 || rows * cols % 2) {
          throw new Error('Onet dimensions must contain an even number of cells');
        }
        var remaining = rows * cols;
        var state = {
          rows: rows,
          cols: cols,
          board: Array(remaining).fill(null),
          remaining: remaining,
          moves: 0,
          seed: String(seed)
        };
        var faces = Array.from({
          length: remaining
        }, function (_, index) {
          return Math.floor(index / 2) % 8;
        });
        return _extends({}, state, {
          board: playableBoard(state, faces, faces.map(function (_, index) {
            return index;
          }), state.seed)
        });
      }
      function reshuffleOnet(state) {
        if (!state.remaining) return state;
        var positions = [],
          faces = [];
        state.board.forEach(function (face, index) {
          if (face !== null) {
            positions.push(index);
            faces.push(face);
          }
        });
        var seed = state.seed + ":reshuffle";
        return _extends({}, state, {
          seed: seed,
          board: playableBoard(state, faces, positions, seed)
        });
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PrototypeApp.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './sokoban.ts', './onet.ts', './memory.ts', './stack.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, profiler, Node, UITransform, AudioSource, input, Input, game, Game, resources, ImageAsset, Texture2D, SpriteFrame, Graphics, Color, Label, Sprite, UIOpacity, Vec3, tween, KeyCode, AudioClip, Component, SOKOBAN_LEVELS, createSokoban, isSokobanWon, moveSokoban, createOnet, getOnetHint, reshuffleOnet, removeOnetPair, createMemory, advanceStack, createStack, dropStack;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      profiler = module.profiler;
      Node = module.Node;
      UITransform = module.UITransform;
      AudioSource = module.AudioSource;
      input = module.input;
      Input = module.Input;
      game = module.game;
      Game = module.Game;
      resources = module.resources;
      ImageAsset = module.ImageAsset;
      Texture2D = module.Texture2D;
      SpriteFrame = module.SpriteFrame;
      Graphics = module.Graphics;
      Color = module.Color;
      Label = module.Label;
      Sprite = module.Sprite;
      UIOpacity = module.UIOpacity;
      Vec3 = module.Vec3;
      tween = module.tween;
      KeyCode = module.KeyCode;
      AudioClip = module.AudioClip;
      Component = module.Component;
    }, function (module) {
      SOKOBAN_LEVELS = module.SOKOBAN_LEVELS;
      createSokoban = module.createSokoban;
      isSokobanWon = module.isSokobanWon;
      moveSokoban = module.moveSokoban;
    }, function (module) {
      createOnet = module.createOnet;
      getOnetHint = module.getOnetHint;
      reshuffleOnet = module.reshuffleOnet;
      removeOnetPair = module.removeOnetPair;
    }, function (module) {
      createMemory = module.createMemory;
    }, function (module) {
      advanceStack = module.advanceStack;
      createStack = module.createStack;
      dropStack = module.dropStack;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "68849uRmiBFOLkqqYg3jcE6", "PrototypeApp", undefined);
      var ccclass = _decorator.ccclass;
      var C = {
        bg: '#080F18',
        panel: '#10232C',
        edge: '#315763',
        ink: '#E7F6F2',
        muted: '#9EB7BF',
        mint: '#55F2D0',
        amber: '#C3F76B',
        rose: '#F45BB8',
        lilac: '#AB9BFF',
        floor: '#163540'
      };
      var TITLES = {
        lobby: '黑客训练场',
        sokoban: '机房推箱子',
        onet: '信号连连看',
        memory: '芯片记忆',
        stack: '中继叠塔'
      };
      var ICONS = ['能量电池', '安全密钥', '微型芯片', '信号天线', '加密磁带', '光学扫描', '晶体核心', '数据软盘', '中继卫星', '网络终端', '访问令牌', '便携终端', '监听耳机', '雷达核心'];
      var UI_ART = ['ui-panel', 'ui-button', 'ui-primary', 'ui-card-back', 'ui-card-front', 'ui-tile'];
      var UI_LAYER = 1 << 25;
      var color = function color(hex, alpha) {
        if (alpha === void 0) {
          alpha = 255;
        }
        return new Color(parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16), alpha);
      };
      var PrototypeApp = exports('PrototypeApp', (_dec = ccclass('PrototypeApp'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(PrototypeApp, _Component);
        function PrototypeApp() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.stage = void 0;
          _this.frames = new Map();
          _this.sounds = new Map();
          _this.audio = void 0;
          _this.mode = 'lobby';
          _this.muted = false;
          _this.reducedMotion = false;
          _this.level = 0;
          _this.round = 1;
          _this.sokoban = createSokoban(0);
          _this.history = [];
          _this.previousPlayer = null;
          _this.onet = void 0;
          _this.selected = -1;
          _this.hint = [];
          _this.connection = [];
          _this.faces = [];
          _this.flipped = [];
          _this.matched = [];
          _this.memoryTurns = 0;
          _this.memoryLocked = false;
          _this.preview = 3;
          _this.timerLabel = null;
          _this.stack = createStack();
          _this.stackInk = null;
          _this.stackPause = false;
          _this.stackCooldown = 0;
          _this.stackFeedback = '';
          _this.feedbackTime = 0;
          _this.offcut = null;
          _this.stackCounter = null;
          _this.stackFeedbackLabel = null;
          _this.status = '';
          _this.touchOrigin = null;
          return _this;
        }
        var _proto = PrototypeApp.prototype;
        _proto.onLoad = function onLoad() {
          var _this2 = this;
          profiler.hideStats();
          this.stage = new Node('PrototypeStage');
          this.stage.layer = UI_LAYER;
          this.stage.addComponent(UITransform).setContentSize(480, 900);
          this.node.addChild(this.stage);
          this.audio = this.node.addComponent(AudioSource);
          this.renderLoading();
          input.on(Input.EventType.KEY_DOWN, this.keyDown, this);
          game.on(Game.EVENT_HIDE, this.hideGame, this);
          var names = ['rooftop'].concat(UI_ART, Array.from({
            length: 16
          }, function (_, i) {
            return "prop-" + String(i).padStart(2, '0');
          }));
          Promise.all(names.map(function (name) {
            return new Promise(function (resolve, reject) {
              resources.load("art/hacker-v2/" + name, ImageAsset, function (error, asset) {
                if (error) reject(error);else {
                  var texture = new Texture2D();
                  texture.image = asset;
                  texture.setFilters(Texture2D.Filter.NEAREST, Texture2D.Filter.NEAREST);
                  var frame = new SpriteFrame();
                  frame.texture = texture;
                  if (name === 'ui-panel' || name === 'ui-button' || name === 'ui-primary') {
                    var inset = name === 'ui-panel' ? 24 : 16;
                    frame.insetLeft = frame.insetRight = frame.insetTop = frame.insetBottom = inset;
                  }
                  _this2.frames.set(name, frame);
                  resolve();
                }
              });
            });
          })).then(function () {
            if (_this2.isValid) _this2.render();
          })["catch"](function (error) {
            console.error('Prototype art could not load', error);
            _this2.clear();
            _this2.text('素材加载失败', 30, 340, 420, 60, 30, C.ink, true);
            _this2.text('请刷新页面后再试一次。', 30, 410, 420, 40, 18, C.muted, true);
          });
          var _loop = function _loop() {
            var name = _arr[_i];
            resources.load("sounds/" + name, AudioClip, function (error, clip) {
              if (!error) _this2.sounds.set(name, clip);
            });
          };
          for (var _i = 0, _arr = ['tap', 'match', 'win']; _i < _arr.length; _i++) {
            _loop();
          }
        };
        _proto.onDestroy = function onDestroy() {
          input.off(Input.EventType.KEY_DOWN, this.keyDown, this);
          game.off(Game.EVENT_HIDE, this.hideGame, this);
        };
        _proto.hideGame = function hideGame() {
          if (this.mode === 'stack' && this.stack.status === 'playing') {
            this.stackPause = true;
            this.render();
          }
        };
        _proto.update = function update(dt) {
          if (this.mode === 'memory' && this.preview > 0) {
            this.preview = Math.max(0, this.preview - dt);
            if (this.timerLabel) this.timerLabel.string = "\u8BB0\u4F4F\u56FE\u6848  " + Math.ceil(this.preview);
            if (this.preview === 0) this.render();
          }
          this.stackCooldown = Math.max(0, this.stackCooldown - dt);
          if (this.offcut) {
            this.offcut.age += dt;
            if (this.offcut.age > 0.6) this.offcut = null;
          }
          if (this.mode === 'stack' && !this.stackPause && this.stack.status === 'playing') {
            this.stack = advanceStack(this.stack, Math.min(dt, 0.05));
            this.drawTower();
          }
          if (this.feedbackTime > 0) {
            this.feedbackTime = Math.max(0, this.feedbackTime - dt);
            if (this.feedbackTime === 0 && this.stackFeedbackLabel) this.stackFeedbackLabel.string = '看准重合的瞬间';
          }
        };
        _proto.make = function make(name, x, y, w, h) {
          var node = new Node(name);
          node.layer = UI_LAYER;
          node.addComponent(UITransform).setContentSize(w, h);
          node.setPosition(x + w / 2 - 240, 450 - y - h / 2);
          this.stage.addChild(node);
          return node;
        };
        _proto.panel = function panel(x, y, w, h, fill, edge, radius) {
          if (fill === void 0) {
            fill = C.panel;
          }
          if (radius === void 0) {
            radius = 2;
          }
          var node = this.make('Panel', x, y, w, h);
          var g = node.addComponent(Graphics);
          g.fillColor = color(fill);
          g.roundRect(-w / 2, -h / 2, w, h, radius);
          g.fill();
          if (edge) {
            g.strokeColor = color(edge);
            g.lineWidth = 1.5;
            g.roundRect(-w / 2, -h / 2, w, h, radius);
            g.stroke();
          }
          return node;
        };
        _proto.text = function text(s, x, y, w, h, size, ink, center) {
          if (size === void 0) {
            size = 20;
          }
          if (ink === void 0) {
            ink = C.ink;
          }
          if (center === void 0) {
            center = false;
          }
          var node = this.make(s, x, y, w, h);
          var label = node.addComponent(Label);
          label.string = s;
          label.fontSize = size;
          label.lineHeight = size + 7;
          label.color = color(ink);
          label.horizontalAlign = center ? Label.HorizontalAlign.CENTER : Label.HorizontalAlign.LEFT;
          label.verticalAlign = Label.VerticalAlign.CENTER;
          label.overflow = Label.Overflow.SHRINK;
          label.enableWrapText = true;
          return label;
        };
        _proto.image = function image(name, x, y, w, h, alpha) {
          if (alpha === void 0) {
            alpha = 255;
          }
          var node = this.make(name, x, y, w, h);
          var frame = this.frames.get(name);
          if (frame) {
            var sprite = node.addComponent(Sprite);
            sprite.spriteFrame = frame;
            sprite.sizeMode = Sprite.SizeMode.CUSTOM;
            if (name === 'ui-panel' || name === 'ui-button' || name === 'ui-primary') sprite.type = Sprite.Type.SLICED;
            sprite.color = new Color(255, 255, 255, alpha);
            node.getComponent(UITransform).setContentSize(w, h);
          }
          return node;
        };
        _proto.prop = function prop(index, x, y, w, h) {
          if (h === void 0) {
            h = w;
          }
          return this.image("prop-" + String(index).padStart(2, '0'), x, y, w, h);
        };
        _proto.listen = function listen(node, fn) {
          node.on(Node.EventType.TOUCH_END, function (event) {
            event.propagationStopped = true;
            fn();
          });
        };
        _proto.button = function button(s, x, y, w, h, fn, accent) {
          var _this3 = this;
          // 70 design pixels remain at least 44 CSS pixels at the smallest 320×568 portrait viewport.
          var width = Math.max(w, 70),
            height = Math.max(h, 70);
          var node = this.image(accent ? 'ui-primary' : 'ui-button', x - (width - w) / 2, y - (height - h) / 2, width, height);
          this.text(s, x + 6, y, w - 12, h, 20, accent || C.ink, true);
          this.listen(node, function () {
            _this3.beep('tap');
            fn();
          });
          // Labels are visual children in draw order, with no touch listeners of their own.
          return node;
        };
        _proto.beep = function beep(name) {
          var clip = this.sounds.get(name);
          if (!this.muted && clip) this.audio.playOneShot(clip, name === 'win' ? 0.28 : 0.16);
        };
        _proto.clear = function clear() {
          this.timerLabel = null;
          this.stackInk = null;
          this.stackCounter = null;
          this.stackFeedbackLabel = null;
          for (var _i2 = 0, _arr2 = [].concat(this.stage.children); _i2 < _arr2.length; _i2++) {
            var child = _arr2[_i2];
            child.destroy();
          }
          this.stage.removeAllChildren();
          this.panel(0, 0, 480, 900, C.bg, undefined, 0);
          if (this.mode !== 'lobby' && this.mode !== 'stack') this.image('rooftop', 0, 180, 480, 720, 32);
        };
        _proto.renderLoading = function renderLoading() {
          this.clear();
          this.text('CYBER HEIST / LOCAL NODE', 40, 320, 400, 40, 18, C.mint, true);
          this.text('正在建立训练节点', 25, 375, 430, 65, 28, C.ink, true);
          this.text('载入任务界面与设备…', 40, 455, 400, 36, 18, C.muted, true);
        };
        _proto.render = function render() {
          this.clear();
          if (this.mode === 'lobby') {
            this.renderLobby();
            return;
          }
          this.header();
          if (this.mode === 'sokoban') this.renderSokoban();
          if (this.mode === 'onet') this.renderOnet();
          if (this.mode === 'memory') this.renderMemory();
          if (this.mode === 'stack') this.renderStack();
        };
        _proto.renderLobby = function renderLobby() {
          var _this4 = this;
          this.image('rooftop', 0, -250, 480, 720);
          this.panel(0, 0, 480, 152, C.bg, undefined, 0).addComponent(UIOpacity).opacity = 228;
          this.text('CYBER HEIST   /   SANDBOX 04', 26, 22, 428, 26, 13, C.mint);
          this.text('黑客训练场', 26, 57, 420, 58, 37);
          this.text('潜入节点之前，先热身。', 28, 115, 420, 30, 18, C.muted);
          this.panel(25, 345, 217, 33, C.bg).addComponent(UIOpacity).opacity = 235;
          this.text('● 节点就绪 / 04 任务', 35, 345, 199, 33, 17, C.mint);
          this.panel(0, 402, 480, 498, C.bg, undefined, 0);
          var cards = [{
            mode: 'sokoban',
            subtitle: '逻辑 / 能量搬运',
            icon: 1,
            tint: C.amber
          }, {
            mode: 'onet',
            subtitle: '观察 / 信号连线',
            icon: 9,
            tint: C.mint
          }, {
            mode: 'memory',
            subtitle: '记忆 / 芯片解密',
            icon: 4,
            tint: C.rose
          }, {
            mode: 'stack',
            subtitle: '反应 / 中继架设',
            icon: 10,
            tint: C.lilac
          }];
          cards.forEach(function (card, i) {
            var x = 24 + i % 2 * 222,
              y = 423 + Math.floor(i / 2) * 174;
            var node = _this4.image('ui-panel', x, y, 210, 159);
            _this4.prop(card.icon, x + 13, y + 10, 65);
            _this4.text("0" + (i + 1), x + 153, y + 17, 39, 32, 19, card.tint, true);
            _this4.text(TITLES[card.mode], x + 24, y + 80, 162, 32, 24);
            _this4.text(card.subtitle, x + 24, y + 115, 162, 28, 18, C.muted);
            _this4.listen(node, function () {
              return _this4.startGame(card.mode);
            });
          });
          this.button(this.muted ? '音效：关' : '音效：开', 24, 799, 132, 45, function () {
            _this4.muted = !_this4.muted;
            _this4.render();
          });
          this.button(this.reducedMotion ? '动态：减少' : '动态：标准', 166, 799, 142, 45, function () {
            _this4.reducedMotion = !_this4.reducedMotion;
            _this4.render();
          });
          this.text('离线试玩', 326, 802, 127, 40, 16, C.muted, true);
          this.text('离线试玩 · 无需登录', 30, 862, 420, 28, 18, C.muted, true);
        };
        _proto.startGame = function startGame(mode, next) {
          if (next === void 0) {
            next = false;
          }
          this.unscheduleAllCallbacks();
          this.mode = mode;
          this.status = '';
          this.touchOrigin = null;
          this.hint = [];
          this.connection = [];
          this.selected = -1;
          if (next) this.round++;
          if (mode === 'sokoban') {
            if (next) this.level = (this.level + 1) % SOKOBAN_LEVELS.length;
            this.sokoban = createSokoban(this.level);
            this.history = [];
            this.previousPlayer = null;
          }
          if (mode === 'onet') this.onet = createOnet("play-" + this.round + "-" + Date.now(), 6, 6);
          if (mode === 'memory') {
            this.faces = createMemory("memory-" + this.round + "-" + Date.now(), 6);
            this.flipped = [];
            this.matched = [];
            this.memoryTurns = 0;
            this.memoryLocked = false;
            this.preview = 3;
          }
          if (mode === 'stack') {
            this.stack = createStack();
            this.stackPause = false;
            this.stackCooldown = 0;
            this.stackFeedback = '';
            this.feedbackTime = 0;
            this.offcut = null;
          }
          this.beep('tap');
          this.render();
        };
        _proto.home = function home() {
          this.unscheduleAllCallbacks();
          this.mode = 'lobby';
          this.render();
        };
        _proto.header = function header() {
          var _this5 = this;
          this.button('‹ 返回', 20, 21, 91, 46, function () {
            return _this5.home();
          });
          this.text('CYBER HEIST / TRAINING', 118, 24, 245, 40, 13, C.mint, true);
          this.button(this.muted ? '静音' : '音效', 372, 21, 87, 46, function () {
            _this5.muted = !_this5.muted;
            _this5.render();
          });
          this.text(TITLES[this.mode], 27, 91, 426, 49, 31);
        };
        _proto.renderSokoban = function renderSokoban() {
          var _this6 = this;
          var s = this.sokoban;
          this.text('把能量箱推到发光底座。箱子只能推，不能拉。', 28, 145, 424, 54, 20, C.muted);
          this.image('ui-panel', 26, 207, 428, 62);
          this.text("\u5173\u5361 " + (this.level + 1) + " / " + SOKOBAN_LEVELS.length + "   " + SOKOBAN_LEVELS[this.level].name, 56, 220, 264, 35, 16, C.amber);
          this.text(s.moves + " \u6B65", 330, 220, 94, 35, 17, C.ink, true);
          var cell = Math.min(53, 410 / s.width, 399 / s.height);
          var x0 = (480 - s.width * cell) / 2,
            y0 = 290 + (400 - s.height * cell) / 2;
          this.image('ui-panel', x0 - 12, y0 - 13, s.width * cell + 24, s.height * cell + 30);
          for (var y = 0; y < s.height; y++) for (var x = 0; x < s.width; x++) {
            var index = y * s.width + x,
              _px = x0 + x * cell,
              _py = y0 + y * cell;
            var wall = s.walls.includes(index);
            this.panel(_px + 1, _py + 1, cell - 2, cell - 2, wall ? '#35515D' : (x + y) % 2 ? '#11252D' : '#152E36', undefined, 0);
            if (wall) {
              this.panel(_px + 3, _py + 3, cell - 6, 5, '#567784', undefined, 0);
              this.panel(_px + 5, _py + cell - 10, cell - 10, 3, '#172D37', undefined, 0);
              if ((x + y) % 3 === 0) this.panel(_px + cell / 2 - 4, _py + 13, 8, 3, C.mint, undefined, 0);
            } else if (s.goals.includes(index)) {
              this.panel(_px + 6, _py + 6, cell - 12, cell - 12, '#1C5B4F', C.mint, 0);
              this.text('＋', _px + 6, _py + 5, cell - 12, cell - 12, 25, C.mint, true);
            }
            if (s.boxes.includes(index)) {
              this.panel(_px + 6, _py + cell - 11, cell - 12, 6, '#142031', undefined, 2);
              this.prop(0, _px - 2, _py - 5, cell + 4);
              if (s.goals.includes(index)) this.text('✓', _px + cell - 19, _py, 19, 21, 18, C.mint, true);
            }
          }
          var px = x0 + s.player % s.width * cell,
            py = y0 + Math.floor(s.player / s.width) * cell;
          var robot = this.prop(1, px - 3, py - 7, cell + 6);
          if (this.previousPlayer !== null && !this.reducedMotion) {
            var origin = new Vec3(x0 + this.previousPlayer % s.width * cell - 3 + (cell + 6) / 2 - 240, 450 - (y0 + Math.floor(this.previousPlayer / s.width) * cell - 7) - (cell + 6) / 2);
            var destination = robot.position.clone();
            robot.setPosition(origin);
            tween(robot).to(0.10, {
              position: destination
            }).start();
          }
          this.previousPlayer = null;
          var surface = this.make('SwipeControl', x0, y0, s.width * cell, s.height * cell);
          surface.on(Node.EventType.TOUCH_START, function (e) {
            var p = e.getUILocation();
            _this6.touchOrigin = {
              x: p.x,
              y: p.y
            };
          });
          surface.on(Node.EventType.TOUCH_END, function (e) {
            if (!_this6.touchOrigin) return;
            var p = e.getUILocation(),
              dx = p.x - _this6.touchOrigin.x,
              dy = p.y - _this6.touchOrigin.y;
            _this6.touchOrigin = null;
            if (Math.max(Math.abs(dx), Math.abs(dy)) < 14) return;
            _this6.move(Math.abs(dx) > Math.abs(dy) ? Math.sign(dx) : 0, Math.abs(dy) >= Math.abs(dx) ? -Math.sign(dy) : 0);
          });
          surface.on(Node.EventType.TOUCH_CANCEL, function () {
            _this6.touchOrigin = null;
          });
          this.button('撤回', 28, 730, 99, 53, function () {
            return _this6.undo();
          });
          this.button('重来', 28, 812, 99, 51, function () {
            return _this6.startGame('sokoban');
          });
          this.button('↑', 306, 701, 65, 54, function () {
            return _this6.move(0, -1);
          }, C.amber);
          this.button('←', 224, 781, 65, 54, function () {
            return _this6.move(-1, 0);
          });
          this.button('↓', 306, 781, 65, 54, function () {
            return _this6.move(0, 1);
          });
          this.button('→', 388, 781, 65, 54, function () {
            return _this6.move(1, 0);
          });
          this.text('滑动棋盘，或点击方向键', 143, 854, 310, 27, 18, C.muted, true);
          if (isSokobanWon(s)) this.result('机房供能就绪', "\u7528 " + s.moves + " \u6B65\u5C06\u5168\u90E8\u80FD\u91CF\u7BB1\u63A5\u5165\u5E95\u5EA7\u3002", '下一关', function () {
            return _this6.startGame('sokoban', true);
          });
        };
        _proto.move = function move(dx, dy) {
          if (this.mode !== 'sokoban' || isSokobanWon(this.sokoban)) return;
          var next = moveSokoban(this.sokoban, dx, dy);
          if (next === this.sokoban) return;
          this.history.push(this.sokoban);
          this.previousPlayer = this.sokoban.player;
          this.sokoban = next;
          this.beep(isSokobanWon(next) ? 'win' : 'tap');
          this.render();
        };
        _proto.undo = function undo() {
          var previous = this.history.pop();
          if (previous) {
            this.sokoban = previous;
            this.render();
          }
        };
        _proto.renderOnet = function renderOnet() {
          var _this7 = this;
          this.text('连接相同设备。最多拐两次弯，可绕棋盘外侧。', 28, 145, 424, 54, 20, C.muted);
          this.text("\u5269\u4F59 " + this.onet.remaining / 2 + " \u5BF9", 32, 219, 230, 38, 22, C.mint);
          this.text('6 × 6 信号矩阵', 277, 222, 172, 30, 16, C.muted, true);
          var cell = 68,
            tile = 63,
            x0 = 37,
            y0 = 291;
          this.image('ui-panel', 17, 271, 446, 438);
          this.onet.board.forEach(function (value, index) {
            if (value === null) return;
            var x = x0 + index % _this7.onet.cols * cell,
              y = y0 + Math.floor(index / _this7.onet.cols) * cell;
            var selected = _this7.selected === index,
              hinted = _this7.hint.includes(index);
            _this7.image('ui-tile', x, y + 3, tile, tile);
            var node = _this7.make('DeviceHit', x - (cell - tile) / 2, y + 3 - (cell - tile) / 2, cell, cell);
            if (selected || hinted) _this7.panel(x + 4, y + 7, tile - 8, tile - 8, selected ? '#247367' : '#61552B', selected ? C.mint : C.amber, 0);
            _this7.prop(2 + value % 14, x + 1, y + 1, tile - 2);
            if (hinted) _this7.text('★', x + tile - 19, y + 1, 18, 22, 16, C.amber, true);
            _this7.listen(node, function () {
              return _this7.selectOnet(index);
            });
          });
          if (this.connection.length) {
            var node = this.make('Connection', 0, 0, 480, 900),
              g = node.addComponent(Graphics);
            g.strokeColor = color(C.mint);
            g.lineWidth = 5;
            this.connection.forEach(function (p, i) {
              var x = x0 + p.x * cell + tile / 2 - 240,
                y = 450 - (y0 + p.y * cell + tile / 2);
              if (i === 0) g.moveTo(x, y);else g.lineTo(x, y);
            });
            g.stroke();
          }
          this.text(this.status || '先连接边缘设备，腾出空间。', 32, 710, 416, 54, 19, C.muted, true);
          this.button('提示一对', 27, 792, 132, 56, function () {
            var pair = getOnetHint(_this7.onet);
            if (pair) {
              _this7.hint = [pair.a, pair.b];
              _this7.status = '这两个设备能连上，试试看。';
              _this7.render();
            }
          });
          this.button('重新整理', 174, 792, 132, 56, function () {
            _this7.onet = reshuffleOnet(_this7.onet);
            _this7.selected = -1;
            _this7.hint = [];
            _this7.connection = [];
            _this7.status = '矩阵已重排，继续连接设备。';
            _this7.render();
          });
          this.button('换个布局', 321, 792, 132, 56, function () {
            return _this7.startGame('onet', true);
          });
          if (this.onet.remaining === 0) this.result('信号链路已接通', '全部设备完成配对，矩阵清理完毕。', '再玩一局', function () {
            return _this7.startGame('onet', true);
          });
        };
        _proto.selectOnet = function selectOnet(index) {
          var _this8 = this;
          if (this.onet.remaining === 0) return;
          if (this.selected < 0) {
            this.selected = index;
            this.hint = [];
            this.connection = [];
            this.beep('tap');
            this.render();
            return;
          }
          if (index === this.selected) {
            this.selected = -1;
            this.render();
            return;
          }
          var result = removeOnetPair(this.onet, this.selected, index);
          if (!result) {
            this.selected = index;
            this.connection = [];
            this.status = '这两个暂时连不上，换个路线再试。';
            this.render();
            return;
          }
          this.onet = result.state;
          this.connection = result.path;
          this.selected = -1;
          this.hint = [];
          this.status = '连上了！';
          if (this.onet.remaining && !getOnetHint(this.onet)) {
            this.onet = reshuffleOnet(this.onet);
            this.status = '当前无可用链路，已免费重排矩阵。';
          }
          this.beep(this.onet.remaining === 0 ? 'win' : 'match');
          this.render();
          this.scheduleOnce(function () {
            if (_this8.mode === 'onet') {
              _this8.connection = [];
              _this8.render();
            }
          }, 0.38);
        };
        _proto.renderMemory = function renderMemory() {
          var _this9 = this;
          this.text('先记住位置，再翻开两张相同的设备卡。', 28, 145, 424, 54, 20, C.muted);
          this.text("\u5DF2\u89E3\u5BC6 " + this.matched.length / 2 + " / " + this.faces.length / 2 + " \u5BF9", 31, 219, 250, 38, 22, C.rose);
          this.text("\u5C1D\u8BD5 " + this.memoryTurns + " \u6B21", 285, 222, 165, 32, 17, C.muted, true);
          this.timerLabel = this.text(this.preview > 0 ? "\u8BB0\u4F4F\u56FE\u6848  " + Math.ceil(this.preview) : this.memoryLocked ? '再看一眼，记住它们。' : '轮到你了，选两张卡片。', 30, 267, 420, 40, 19, this.preview > 0 ? C.amber : C.muted, true);
          var w = 92,
            h = 112,
            gap = 12,
            x0 = 38,
            y0 = 329;
          this.faces.forEach(function (face, index) {
            var x = x0 + index % 4 * (w + gap),
              y = y0 + Math.floor(index / 4) * (h + gap);
            var matched = _this9.matched.includes(index),
              visible = _this9.preview > 0 || _this9.flipped.includes(index) || matched;
            var node = _this9.image(visible ? 'ui-card-front' : 'ui-card-back', x, y + 4, w, h);
            if (matched) _this9.panel(x + 9, y + 13, w - 18, h - 18, '#17493F', C.mint, 0);
            if (visible) {
              _this9.prop(2 + face, x + 14, y + 10, 64);
              _this9.text(matched ? '已解密 ✓' : ICONS[face], x + 6, y + 79, w - 12, 26, 19, matched ? C.mint : C.ink, true);
            }
            _this9.listen(node, function () {
              return _this9.selectMemory(index);
            });
          });
          this.text('错配后会盖回卡片，记住设备的位置。', 30, 729, 420, 38, 19, C.muted, true);
          this.button('重新记忆', 29, 804, 200, 55, function () {
            return _this9.startGame('memory');
          });
          this.button('换套卡片', 249, 804, 200, 55, function () {
            return _this9.startGame('memory', true);
          }, C.rose);
          if (this.matched.length === this.faces.length) this.result('芯片解密完成', "\u7528\u4E86 " + this.memoryTurns + " \u6B21\u914D\u5BF9\u5C1D\u8BD5\uFF0C\u89E3\u5F00\u5168\u90E8\u8BBE\u5907\u5361\u3002", '再解密一套', function () {
            return _this9.startGame('memory', true);
          });
        };
        _proto.selectMemory = function selectMemory(index) {
          var _this10 = this;
          if (this.preview > 0 || this.memoryLocked || this.matched.includes(index) || this.flipped.includes(index)) return;
          this.flipped.push(index);
          this.beep('tap');
          if (this.flipped.length === 2) {
            this.memoryTurns++;
            var _this$flipped = this.flipped,
              a = _this$flipped[0],
              b = _this$flipped[1];
            if (this.faces[a] === this.faces[b]) {
              this.matched.push(a, b);
              this.flipped = [];
              this.beep(this.matched.length === this.faces.length ? 'win' : 'match');
            } else {
              this.memoryLocked = true;
              this.scheduleOnce(function () {
                _this10.flipped = [];
                _this10.memoryLocked = false;
                if (_this10.mode === 'memory') _this10.render();
              }, 0.85);
            }
          }
          this.render();
        };
        _proto.renderStack = function renderStack() {
          var _this11 = this;
          this.image('rooftop', 0, 163, 480, 720);
          this.image('ui-panel', 17, 145, 446, 84);
          this.text('看准后落下，叠满 8 层接通信号。', 47, 158, 386, 57, 20, C.ink);
          this.image('ui-panel', 27, 248, 426, 63);
          this.stackCounter = this.text(this.stack.floors + " / 8 \u5C42", 57, 260, 157, 38, 25, C.ink);
          this.text("\u5B8C\u7F8E " + this.stack.perfects + " \u6B21", 268, 263, 163, 32, 18, C.amber, true);
          this.stackFeedbackLabel = this.text(this.stackFeedback || '看准重合的瞬间', 31, 328, 418, 38, 22, C.ink, true);
          var node = this.make('Tower', 0, 0, 480, 900);
          this.stackInk = node.addComponent(Graphics);
          this.drawTower();
          this.button(this.stackPause ? '继续叠塔' : '落下！', 39, 749, 402, 66, function () {
            if (_this11.stackPause) {
              _this11.stackPause = false;
              _this11.render();
            } else _this11.drop();
          }, C.amber);
          this.text('没有对齐的部分会掉落', 28, 840, 424, 29, 18, C.ink, true);
          this.button('重来', 30, 669, 91, 45, function () {
            return _this11.startGame('stack');
          });
          this.button(this.stackPause ? '继续' : '暂停', 361, 669, 91, 45, function () {
            _this11.stackPause = !_this11.stackPause;
            _this11.render();
          });
          if (this.stack.status === 'won') this.result('信号接通！', "8 \u5C42\u5C0F\u5854\u5B8C\u6210\uFF0C" + this.stack.perfects + " \u6B21\u5B8C\u7F8E\u843D\u4E0B\u3002", '再叠一次', function () {
            return _this11.startGame('stack');
          });
          if (this.stack.status === 'lost') this.result('差一点点！', "\u8FD9\u6B21\u53E0\u5230\u4E86 " + this.stack.floors + " \u5C42\uFF0C\u518D\u8BD5\u4E00\u6B21\u4F1A\u66F4\u7A33\u3002", '再来一次', function () {
            return _this11.startGame('stack');
          }, false);
          if (this.stackPause && this.stack.status === 'playing') {
            this.image('ui-panel', 87, 442, 306, 112);
            this.text('节点已暂停', 113, 462, 254, 40, 27, C.ink, true);
            this.text('准备好后，点「继续叠塔」。', 115, 503, 250, 31, 17, C.muted, true);
          }
        };
        _proto.drawTower = function drawTower() {
          var g = this.stackInk;
          if (!g || !g.isValid) return;
          g.clear();
          var bottom = -198,
            height = 29;
          var block = function block(x, y, width, fill) {
            g.fillColor = color('#050B12');
            g.rect(x - width / 2 + 3, y - 5, width, height);
            g.fill();
            g.fillColor = color('#17323D');
            g.rect(x - width / 2, y, width, height);
            g.fill();
            g.fillColor = color(fill);
            g.rect(x - width / 2, y + height - 5, width, 5);
            g.fill();
            g.fillColor = color(fill);
            for (var window = x - width / 2 + 8; window < x + width / 2 - 6; window += 19) {
              g.rect(window, y + 8, 7, 6);
              g.fill();
            }
          };
          var palette = [C.mint, C.lilac, C.rose, C.amber];
          this.stack.blocks.forEach(function (b, i) {
            return block(b.x * 0.72, bottom + i * height, b.width * 0.72, i === 0 ? '#567486' : palette[(i - 1) % palette.length]);
          });
          if (this.offcut && !this.reducedMotion) {
            var piece = this.offcut;
            block(piece.x * 0.72, piece.y - 380 * piece.age * piece.age, piece.width * 0.72, '#D998AE');
          }
          if (this.stack.status === 'playing') {
            g.strokeColor = new Color(255, 255, 255, 100);
            g.lineWidth = 1;
            g.moveTo((this.stack.baseX - this.stack.width / 2) * 0.72, bottom + (this.stack.floors + 1) * height - 6);
            g.lineTo((this.stack.baseX + this.stack.width / 2) * 0.72, bottom + (this.stack.floors + 1) * height - 6);
            g.stroke();
            block(this.stack.movingX * 0.72, bottom + (this.stack.floors + 1) * height, this.stack.width * 0.72, palette[this.stack.floors % palette.length]);
          }
        };
        _proto.drop = function drop() {
          if (this.mode !== 'stack' || this.stackPause || this.stack.status !== 'playing' || this.stackCooldown > 0) return;
          this.stackCooldown = 0.18;
          var previous = this.stack;
          this.stack = dropStack(previous);
          if (this.stack.lastDrop === 'good' && this.stack.cut > 0) {
            var side = previous.movingX >= previous.baseX ? 1 : -1;
            this.offcut = {
              x: previous.movingX + side * (previous.width - this.stack.cut) / 2,
              y: -198 + (previous.floors + 1) * 29,
              width: this.stack.cut,
              age: 0
            };
          }
          this.stackFeedback = this.stack.lastDrop === 'perfect' ? '完美落下！' : this.stack.lastDrop === 'miss' ? '差一点点！' : '稳稳接住！';
          this.feedbackTime = 1.1;
          this.beep(this.stack.status === 'won' ? 'win' : this.stack.lastDrop === 'perfect' ? 'match' : 'tap');
          this.render();
        };
        _proto.result = function result(title, description, action, fn, success) {
          var _this12 = this;
          if (success === void 0) {
            success = true;
          }
          var shade = this.panel(0, 0, 480, 900, '#08101D', undefined, 0);
          shade.addComponent(UIOpacity).opacity = 215;
          this.listen(shade, function () {});
          this.image('ui-panel', 39, 244, 402, 438);
          this.prop(success ? 10 : 1, 195, 278, 90);
          this.text(title, 60, 373, 360, 51, 31, success ? C.amber : C.ink, true);
          this.text(description, 65, 435, 350, 59, 20, C.muted, true);
          this.button(action, 72, 515, 336, 56, fn, success ? C.amber : C.mint);
          this.button('回训练场', 145, 594, 190, 50, function () {
            return _this12.home();
          });
        };
        _proto.keyDown = function keyDown(event) {
          var key = event.keyCode;
          if (key === KeyCode.ESCAPE) {
            this.home();
            return;
          }
          if (this.mode === 'sokoban') {
            if (key === KeyCode.ARROW_UP || key === KeyCode.KEY_W) this.move(0, -1);
            if (key === KeyCode.ARROW_DOWN || key === KeyCode.KEY_S) this.move(0, 1);
            if (key === KeyCode.ARROW_LEFT || key === KeyCode.KEY_A) this.move(-1, 0);
            if (key === KeyCode.ARROW_RIGHT || key === KeyCode.KEY_D) this.move(1, 0);
            if (key === KeyCode.KEY_Z) this.undo();
          }
          if (key === KeyCode.KEY_R && this.mode !== 'lobby') this.startGame(this.mode);
          if (key === KeyCode.SPACE && this.mode === 'stack') this.drop();
        };
        return PrototypeApp;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/random.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createForOfIteratorHelperLoose, cclegacy;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "39c5bl9PbdPvqp7EqyZ+vhJ", "random", undefined);
      var seededRandom = exports('seededRandom', function seededRandom(seed) {
        var value = 2166136261;
        for (var _iterator = _createForOfIteratorHelperLoose(String(seed)), _step; !(_step = _iterator()).done;) {
          var character = _step.value;
          value = Math.imul(value ^ character.charCodeAt(0), 16777619);
        }
        return function () {
          value += 0x6D2B79F5;
          var result = Math.imul(value ^ value >>> 15, value | 1);
          result ^= result + Math.imul(result ^ result >>> 7, result | 61);
          return ((result ^ result >>> 14) >>> 0) / 4294967296;
        };
      });
      var shuffle = exports('shuffle', function shuffle(values, seed) {
        var result = [].concat(values);
        var random = seededRandom(seed);
        for (var index = result.length - 1; index > 0; index -= 1) {
          var other = Math.floor(random() * (index + 1));
          var _ref = [result[other], result[index]];
          result[index] = _ref[0];
          result[other] = _ref[1];
        }
        return result;
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/sokoban.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _extends, cclegacy;
  return {
    setters: [function (module) {
      _extends = module.extends;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "be63btEpSVBy5y491n1Oriy", "sokoban", undefined);
      var SOKOBAN_LEVELS = exports('SOKOBAN_LEVELS', [{
        name: '初次搬运',
        map: ['#######', '#     #', '# .$  #', '#  @  #', '#     #', '#######'],
        solution: 'RUL'
      }, {
        name: '双芯入库',
        map: ['#######', '# . . #', '# $ $ #', '#     #', '#  @  #', '#     #', '#######'],
        solution: 'LUURDRU'
      }, {
        name: '分岔仓库',
        map: ['########', '#      #', '# .    #', '#   #  #', '# $ $  #', '#  @ . #', '#      #', '########'],
        solution: 'LUURDRLUURRDD'
      }, {
        name: '绕过隔墙',
        map: ['########', '#  .   #', '#  #   #', '# $ $  #', '#      #', '# .# @ #', '#      #', '########'],
        solution: 'LULLLUURDRDRUURULDDLLD'
      }, {
        name: '中央通道',
        map: ['#########', '# .   . #', '#   #   #', '# $ $ $ #', '#   #   #', '#   @   #', '#   .   #', '#########'],
        solution: 'LLUUURURRDDLRUULLDDRRDRUULDLLDDLDR'
      }, {
        name: '三芯调度',
        map: ['#########', '#       #', '# . # . #', '#   $   #', '## $ $ ##', '#       #', '#  . @  #', '#       #', '#########'],
        solution: 'RUUULLLRDDLLUURDRRDRUULLLDD'
      }]);
      var createSokoban = exports('createSokoban', function createSokoban(level) {
        if (level === void 0) {
          level = 0;
        }
        if (!Number.isInteger(level) || level < 0 || level >= SOKOBAN_LEVELS.length) throw new Error('Unknown warehouse');
        var map = SOKOBAN_LEVELS[level].map;
        var width = map[0].length;
        var walls = [],
          goals = [],
          boxes = [];
        var player = -1;
        map.forEach(function (row, y) {
          if (row.length !== width) throw new Error('Warehouse rows must have equal width');
          row.split('').forEach(function (cell, x) {
            var index = y * width + x;
            if (cell === '#') walls.push(index);
            if (cell === '.' || cell === '*' || cell === '+') goals.push(index);
            if (cell === '$' || cell === '*') boxes.push(index);
            if (cell === '@' || cell === '+') player = index;
          });
        });
        if (player < 0 || boxes.length === 0 || boxes.length !== goals.length) throw new Error('Invalid warehouse');
        return {
          level: level,
          width: width,
          height: map.length,
          walls: walls,
          goals: goals,
          boxes: boxes,
          player: player,
          moves: 0,
          pushes: 0
        };
      });
      var moveSokoban = exports('moveSokoban', function moveSokoban(state, dx, dy) {
        if (!Number.isInteger(dx) || !Number.isInteger(dy) || Math.abs(dx) + Math.abs(dy) !== 1) return state;
        var targetX = state.player % state.width + dx;
        var targetY = Math.floor(state.player / state.width) + dy;
        if (targetX < 0 || targetY < 0 || targetX >= state.width || targetY >= state.height) return state;
        var target = targetY * state.width + targetX;
        if (state.walls.includes(target)) return state;
        var box = state.boxes.indexOf(target);
        if (box < 0) return _extends({}, state, {
          player: target,
          moves: state.moves + 1
        });
        var beyondX = targetX + dx,
          beyondY = targetY + dy;
        if (beyondX < 0 || beyondY < 0 || beyondX >= state.width || beyondY >= state.height) return state;
        var beyond = beyondY * state.width + beyondX;
        if (state.walls.includes(beyond) || state.boxes.includes(beyond)) return state;
        var boxes = [].concat(state.boxes);
        boxes[box] = beyond;
        return _extends({}, state, {
          boxes: boxes,
          player: target,
          moves: state.moves + 1,
          pushes: state.pushes + 1
        });
      });
      var isSokobanWon = exports('isSokobanWon', function isSokobanWon(state) {
        return state.boxes.every(function (box) {
          return state.goals.includes(box);
        });
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/stack.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _extends, cclegacy;
  return {
    setters: [function (module) {
      _extends = module.extends;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "3e3782UuwhE4Y1w+O+xpN8+", "stack", undefined);
      var STACK_TARGET = exports('STACK_TARGET', 8);
      var STACK_LIMIT = exports('STACK_LIMIT', 185);
      var STEP = 1 / 120;
      var createStack = exports('createStack', function createStack() {
        return {
          baseX: 0,
          width: 220,
          movingX: -STACK_LIMIT,
          direction: 1,
          speed: 145,
          floors: 0,
          score: 0,
          perfects: 0,
          status: 'playing',
          blocks: [{
            x: 0,
            width: 220
          }],
          lastDrop: 'none',
          cut: 0,
          carry: 0
        };
      });
      var advanceStack = exports('advanceStack', function advanceStack(state, dt) {
        if (state.status !== 'playing' || !Number.isFinite(dt) || dt <= 0) return state;
        var movingX = state.movingX,
          direction = state.direction;
        // shortcut: discard long background frames in this offline prototype; use authoritative ticks for online play.
        var carry = state.carry + Math.min(dt, 0.25);
        while (carry + 1e-10 >= STEP) {
          movingX += direction * state.speed * STEP;
          if (movingX > STACK_LIMIT) {
            movingX = STACK_LIMIT * 2 - movingX;
            direction = -1;
          }
          if (movingX < -STACK_LIMIT) {
            movingX = -STACK_LIMIT * 2 - movingX;
            direction = 1;
          }
          carry -= STEP;
        }
        return _extends({}, state, {
          movingX: movingX,
          direction: direction,
          carry: carry
        });
      });
      var dropStack = exports('dropStack', function dropStack(state) {
        if (state.status !== 'playing') return state;
        var offset = state.movingX - state.baseX;
        var perfect = Math.abs(offset) <= 8;
        var width = perfect ? state.width : state.width - Math.abs(offset);
        if (width <= 0) return _extends({}, state, {
          status: 'lost',
          lastDrop: 'miss',
          cut: state.width
        });
        var baseX = perfect ? state.baseX : state.baseX + offset / 2;
        var floors = state.floors + 1;
        var direction = state.direction === 1 ? -1 : 1;
        return _extends({}, state, {
          baseX: baseX,
          width: width,
          movingX: direction === 1 ? -STACK_LIMIT : STACK_LIMIT,
          direction: direction,
          speed: 145 + floors * 14,
          floors: floors,
          score: state.score + (perfect ? 150 : 100),
          perfects: state.perfects + (perfect ? 1 : 0),
          status: floors >= STACK_TARGET ? 'won' : 'playing',
          blocks: [].concat(state.blocks, [{
            x: baseX,
            width: width
          }]),
          lastDrop: perfect ? 'perfect' : 'good',
          cut: state.width - width,
          carry: 0
        });
      });
      cclegacy._RF.pop();
    }
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});
//# sourceMappingURL=index.js.map