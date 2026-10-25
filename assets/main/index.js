System.register("chunks:///_virtual/archive.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './random.ts'], function (exports) {
  var _extends, cclegacy, shuffle;
  return {
    setters: [function (module) {
      _extends = module.extends;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      shuffle = module.shuffle;
    }],
    execute: function () {
      cclegacy._RF.push({}, "f94e3O/+5FFOalvs0H9yAP3", "archive", undefined);
      var createArchive = exports('createArchive', function createArchive(seed, difficulty) {
        if (difficulty === void 0) {
          difficulty = 1;
        }
        if (![1, 2, 3].includes(difficulty)) throw new Error('Archive difficulty must be 1–3');
        var count = 2 + difficulty * 2;
        var props = shuffle(Array.from({
          length: 16
        }, function (_, index) {
          return index;
        }), "archive-props-" + seed + "-" + difficulty);
        var original = props.slice(0, count);
        var changes = shuffle(Array.from({
          length: count
        }, function (_, index) {
          return index;
        }), "archive-slots-" + seed + "-" + difficulty).slice(0, difficulty === 1 ? 1 : 2).sort(function (a, b) {
          return a - b;
        });
        var updated = [].concat(original);
        changes.forEach(function (slot, index) {
          updated[slot] = props[count + index];
        });
        return {
          original: original,
          updated: updated,
          changes: changes,
          preview: difficulty === 3 ? 1.75 : 2,
          elapsed: 0,
          phase: 'showing',
          found: [],
          wrong: [],
          hint: null
        };
      });
      var advanceArchive = exports('advanceArchive', function advanceArchive(state, dt) {
        if (state.phase !== 'showing' || !Number.isFinite(dt) || dt <= 0) return state;
        var elapsed = Math.min(state.preview, state.elapsed + dt);
        return _extends({}, state, {
          elapsed: elapsed,
          phase: elapsed + 1e-9 >= state.preview ? 'input' : 'showing'
        });
      });
      var selectArchive = exports('selectArchive', function selectArchive(state, slot) {
        if (state.phase !== 'input' || !Number.isInteger(slot) || slot < 0 || slot >= state.updated.length || state.found.includes(slot) || state.wrong.includes(slot) || state.hint === slot) return state;
        if (state.changes.includes(slot)) {
          var found = [].concat(state.found, [slot]);
          return _extends({}, state, {
            found: found,
            phase: found.length === state.changes.length ? 'won' : 'input'
          });
        }
        var wrong = [].concat(state.wrong, [slot]);
        return _extends({}, state, {
          wrong: wrong,
          phase: wrong.length >= 2 ? 'lost' : 'input'
        });
      });
      var hintArchive = exports('hintArchive', function hintArchive(state) {
        if (state.phase !== 'input' || state.hint !== null) return state;
        var hint = state.original.findIndex(function (_, slot) {
          return !state.changes.includes(slot) && !state.wrong.includes(slot);
        });
        return hint < 0 ? state : _extends({}, state, {
          hint: hint
        });
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/archiveMission.ts", ['cc', './archive.ts', './host.ts'], function (exports) {
  var cclegacy, createArchive, hintArchive, advanceArchive, selectArchive, MISSION_COLORS;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      createArchive = module.createArchive;
      hintArchive = module.hintArchive;
      advanceArchive = module.advanceArchive;
      selectArchive = module.selectArchive;
    }, function (module) {
      MISSION_COLORS = module.MISSION_COLORS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "170890+sBlLg6ViqyiDklGM", "archiveMission", undefined);
      var createArchiveMission = exports('createArchiveMission', function createArchiveMission(h, seed, difficulty) {
        var state = createArchive(seed, difficulty),
          paused = false;
        var select = function select(slot) {
          if (paused) return;
          var next = selectArchive(state, slot);
          if (next === state) return;
          h.sound(next.phase === 'won' ? 'win' : next.found.length > state.found.length ? 'match' : 'tap');
          state = next;
          h.render();
        };
        return {
          render: function render() {
            h.text(h.t('archiveInstruction'), 28, 145, 424, 55, 20, MISSION_COLORS.muted);
            h.image('ui-panel', 24, 211, 432, 64);
            h.text(h.t(state.phase === 'showing' ? 'archiveWatch' : 'archiveFind', {
              seconds: Math.ceil(state.preview - state.elapsed),
              current: state.found.length,
              total: state.changes.length
            }), 40, 222, 240, 35, 18, MISSION_COLORS.rose);
            h.text(h.t('archiveMisses', {
              current: state.wrong.length
            }), 276, 222, 164, 35, 18, MISSION_COLORS.muted, true);
            h.image('ui-panel', 20, 296, 440, 416);
            var columns = state.original.length / 2,
              width = columns === 2 ? 166 : columns === 3 ? 124 : 94;
            var x0 = (480 - columns * width - (columns - 1) * 12) / 2;
            var props = state.phase === 'showing' ? state.original : state.updated;
            props.forEach(function (prop, slot) {
              var x = x0 + slot % columns * (width + 12),
                y = 325 + Math.floor(slot / columns) * 184;
              h.image('ui-card-front', x, y, width, 164);
              var found = state.found.includes(slot),
                stable = state.wrong.includes(slot) || state.hint === slot;
              if (found || stable) h.panel(x + 5, y + 5, width - 10, 154, found ? '#164D43' : '#39352A', found ? MISSION_COLORS.mint : MISSION_COLORS.amber, 0);
              var size = Math.min(92, width - 20);
              h.prop(prop, x + (width - size) / 2, y + 22, size);
              h.text(h.t(found ? 'archiveFound' : stable ? 'archiveStable' : 'archiveSlot', {
                slot: slot + 1
              }), x + 5, y + 123, width - 10, 30, 16, found ? MISSION_COLORS.mint : stable ? MISSION_COLORS.amber : MISSION_COLORS.ink, true);
              var hit = h.make('ArchiveBay', x, y, width, 164);
              h.listen(hit, function () {
                return select(slot);
              });
            });
            h.text(h.t(state.phase === 'showing' ? 'archiveOriginal' : state.hint !== null ? 'archiveHint' : 'archiveChanged'), 30, 729, 420, 56, 20, MISSION_COLORS.muted, true);
            h.button(h.t('restart'), 26, 800, 134, 70, function () {
              return h.restart();
            });
            h.button(h.t(state.hint !== null ? 'memoryHintUsed' : 'hint'), 174, 800, 132, 70, function () {
              if (paused) return;
              var next = hintArchive(state);
              if (next !== state) {
                state = next;
                h.render();
              }
            }, MISSION_COLORS.rose);
            h.button(h.t('newBoard'), 320, 800, 134, 70, function () {
              return h.next();
            });
            if (paused) {
              h.panel(25, 301, 430, 406, MISSION_COLORS.bg, MISSION_COLORS.edge, 0);
              h.text(h.t('memoryPaused'), 48, 385, 384, 48, 24, MISSION_COLORS.ink, true);
              h.text(h.t('memoryPauseBody'), 48, 437, 384, 58, 20, MISSION_COLORS.muted, true);
              h.button(h.t('resume'), 115, 525, 250, 70, function () {
                paused = false;
                h.render();
              }, MISSION_COLORS.rose);
            }
            if (state.phase === 'won') h.result(h.t('archiveWinTitle'), h.t('archiveComplete'));
            if (state.phase === 'lost') h.result(h.t('archiveLoseTitle'), h.t('archiveFailed'), false);
          },
          update: function update(dt) {
            if (paused) return;
            var previous = state;
            state = advanceArchive(state, dt);
            if (state.phase !== previous.phase || Math.ceil(state.preview - state.elapsed) !== Math.ceil(previous.preview - previous.elapsed)) h.render();
          },
          hide: function hide() {
            if (state.phase === 'showing' || state.phase === 'input') paused = true;
          }
        };
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/bolts.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './random.ts'], function (exports) {
  var _extends, cclegacy, shuffle;
  return {
    setters: [function (module) {
      _extends = module.extends;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      shuffle = module.shuffle;
    }],
    execute: function () {
      cclegacy._RF.push({}, "73f2dO1mjNObbiNlxHo+2V+", "bolts", undefined);
      var createBolts = exports('createBolts', function createBolts(seed, difficulty) {
        if (difficulty === void 0) {
          difficulty = 1;
        }
        var capacity = difficulty === 1 ? 2 : 3,
          types = difficulty === 1 ? 2 : difficulty === 2 ? 3 : 4;
        // These short authored banks have complete legal witnesses; permutations preserve them.
        var bank = difficulty === 1 ? [[0, 1], [1, 0], []] : difficulty === 2 ? [[0, 1, 2], [1, 2, 0], [2, 0, 1], []] : [[0, 1, 2], [1, 2, 3], [2, 3, 0], [3, 0, 1], [], []];
        var colors = shuffle(Array.from({
          length: types
        }, function (_, index) {
          return index;
        }), seed + ":colors");
        return {
          tubes: shuffle(bank.map(function (tube) {
            return tube.map(function (color) {
              return colors[color];
            });
          }), seed + ":tubes"),
          capacity: capacity,
          types: types,
          moves: 0
        };
      });
      var isBoltsWon = exports('isBoltsWon', function isBoltsWon(state) {
        return state.tubes.every(function (tube) {
          return !tube.length || tube.length === state.capacity && tube.every(function (color) {
            return color === tube[0];
          });
        });
      });
      var canMoveBolt = exports('canMoveBolt', function canMoveBolt(state, from, to) {
        if (!Number.isInteger(from) || !Number.isInteger(to) || from < 0 || to < 0 || from >= state.tubes.length || to >= state.tubes.length || from === to) return false;
        var source = state.tubes[from],
          target = state.tubes[to];
        return source.length > 0 && target.length < state.capacity && (!target.length || target[target.length - 1] === source[source.length - 1]);
      });
      var moveBolt = exports('moveBolt', function moveBolt(state, from, to) {
        if (isBoltsWon(state) || !canMoveBolt(state, from, to)) return state;
        var tubes = state.tubes.map(function (tube) {
          return [].concat(tube);
        });
        tubes[to].push(tubes[from].pop());
        return _extends({}, state, {
          tubes: tubes,
          moves: state.moves + 1
        });
      });
      var getBoltsSolution = exports('getBoltsSolution', function getBoltsSolution(state) {
        var key = function key(tubes) {
          return tubes.map(function (tube) {
            return tube.join(',');
          }).sort().join('|');
        };
        var queue = [{
          tubes: state.tubes,
          parent: -1,
          move: null
        }];
        var seen = new Set([key(state.tubes)]);
        // shortcut: bounded offline hint search, replace with authoritative solver for larger server boards.
        for (var cursor = 0; cursor < queue.length && cursor < 20000; cursor++) {
          var current = _extends({}, state, {
            tubes: queue[cursor].tubes
          });
          if (isBoltsWon(current)) {
            var solution = [];
            for (var index = cursor; queue[index].parent >= 0; index = queue[index].parent) solution.push(queue[index].move);
            return solution.reverse();
          }
          for (var from = 0; from < current.tubes.length; from++) {
            var _loop = function _loop() {
                if (!canMoveBolt(current, from, to)) return 0; // continue
                var source = current.tubes[from],
                  target = current.tubes[to];
                if (!target.length && source.every(function (color) {
                  return color === source[0];
                })) return 0; // continue
                var next = moveBolt(current, from, to),
                  signature = key(next.tubes);
                if (seen.has(signature)) return 0; // continue
                seen.add(signature);
                queue.push({
                  tubes: next.tubes,
                  parent: cursor,
                  move: {
                    from: from,
                    to: to
                  }
                });
              },
              _ret;
            for (var to = 0; to < current.tubes.length; to++) {
              _ret = _loop();
              if (_ret === 0) continue;
            }
          }
        }
        return null;
      });
      var getBoltsHint = exports('getBoltsHint', function getBoltsHint(state) {
        var _getBoltsSolution;
        return ((_getBoltsSolution = getBoltsSolution(state)) == null ? void 0 : _getBoltsSolution[0]) || null;
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/boltsMission.ts", ['cc', './bolts.ts', './host.ts'], function (exports) {
  var cclegacy, Graphics, Color, createBolts, getBoltsHint, isBoltsWon, moveBolt, MISSION_COLORS;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Graphics = module.Graphics;
      Color = module.Color;
    }, function (module) {
      createBolts = module.createBolts;
      getBoltsHint = module.getBoltsHint;
      isBoltsWon = module.isBoltsWon;
      moveBolt = module.moveBolt;
    }, function (module) {
      MISSION_COLORS = module.MISSION_COLORS;
    }],
    execute: function () {
      exports('createBoltsMission', createBoltsMission);
      cclegacy._RF.push({}, "30cccEECbtKsKzspS+K8ZdA", "boltsMission", undefined);
      var color = function color(hex) {
        return new Color(parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16));
      };
      var INKS = [MISSION_COLORS.mint, MISSION_COLORS.rose, MISSION_COLORS.amber, MISSION_COLORS.lilac];
      function createBoltsMission(h, seed, difficulty) {
        var state = createBolts(seed, difficulty),
          selected = null;
        var history = [];
        var hint = null,
          message = 'boltsChooseSource';
        var choose = function choose(index) {
          if (isBoltsWon(state)) return;
          h.sound('tap');
          hint = null;
          if (selected === index) {
            selected = null;
            message = 'boltsChooseSource';
          } else if (selected === null) {
            if (state.tubes[index].length) {
              selected = index;
              message = 'boltsChooseDestination';
            } else message = 'boltsEmpty';
          } else {
            var next = moveBolt(state, selected, index);
            if (next === state) message = 'boltsInvalid';else {
              history.push(state);
              state = next;
              selected = null;
              message = 'boltsChooseSource';
              h.sound(isBoltsWon(state) ? 'win' : 'match');
            }
          }
          h.render();
        };
        return {
          render: function render() {
            h.text(h.t('boltsInstruction'), 28, 145, 424, 54, 20, MISSION_COLORS.muted);
            h.image('ui-panel', 24, 213, 432, 61);
            h.text(h.t('boltsProgress', {
              moves: state.moves,
              depth: state.capacity
            }), 44, 224, 392, 36, 20, MISSION_COLORS.mint, true);
            h.image('ui-panel', 25, 294, 430, 420);
            var rows = state.tubes.length > 3 ? 2 : 1,
              cols = Math.ceil(state.tubes.length / rows);
            var width = 390 / cols,
              height = rows === 1 ? 330 : 190;
            var left = (480 - cols * width) / 2,
              top = rows === 1 ? 332 : 310;
            var _loop = function _loop(index) {
              var _hint, _hint2;
              var x = left + index % cols * width + 5,
                y = top + Math.floor(index / cols) * 198;
              var w = width - 10,
                bodyHeight = height - 30;
              var accent = selected === index || ((_hint = hint) == null ? void 0 : _hint.from) === index ? MISSION_COLORS.amber : ((_hint2 = hint) == null ? void 0 : _hint2.to) === index ? MISSION_COLORS.mint : MISSION_COLORS.edge;
              h.panel(x, y, w, bodyHeight, '#0D1D27', accent);
              h.image('ui-tile', x + 3, y + 3, w - 6, bodyHeight - 6, 90);
              var node = h.make('BoltTube', x, y, w, bodyHeight),
                g = node.addComponent(Graphics);
              var base = -bodyHeight / 2 + 16,
                slot = rows === 1 ? 72 : 38;
              var boltWidth = Math.min(w - 26, rows === 1 ? 68 : 60),
                boltHeight = rows === 1 ? 44 : 29;
              g.fillColor = color('#6A7A87');
              g.rect(-5, base, 10, state.capacity * slot + 8);
              g.fill();
              g.fillColor = color('#A3B4B9');
              g.rect(-2, base, 3, state.capacity * slot + 8);
              g.fill();
              g.fillColor = color('#314C5A');
              g.rect(-w / 2 + 12, base - 8, w - 24, 12);
              g.fill();
              for (var layer = 0; layer < state.capacity; layer++) {
                var cy = base + 14 + layer * slot;
                g.strokeColor = color('#24414C');
                g.lineWidth = 1;
                g.moveTo(-w / 2 + 8, cy);
                g.lineTo(w / 2 - 8, cy);
                g.stroke();
                var type = state.tubes[index][layer];
                if (type === undefined) continue;
                var bw = boltWidth / 2,
                  bh = boltHeight / 2;
                g.fillColor = color('#061015');
                g.roundRect(-bw + 2, cy - bh - 4, boltWidth, boltHeight, 3);
                g.fill();
                g.fillColor = color(INKS[type]);
                g.moveTo(-bw + 8, cy + bh);
                g.lineTo(bw - 8, cy + bh);
                g.lineTo(bw, cy);
                g.lineTo(bw - 8, cy - bh);
                g.lineTo(-bw + 8, cy - bh);
                g.lineTo(-bw, cy);
                g.close();
                g.fill();
                g.strokeColor = color('#10232C');
                g.lineWidth = 3;
                // Distinct grooves keep bolt types readable without color alone.
                if (type === 0) {
                  g.moveTo(-bw + 12, cy);
                  g.lineTo(bw - 12, cy);
                }
                if (type === 1) {
                  g.moveTo(-12, cy - 7);
                  g.lineTo(-4, cy + 7);
                  g.moveTo(5, cy - 7);
                  g.lineTo(13, cy + 7);
                }
                if (type === 2) {
                  g.moveTo(-12, cy - 6);
                  g.lineTo(0, cy + 7);
                  g.lineTo(12, cy - 6);
                }
                if (type === 3) {
                  g.rect(-10, cy - 7, 20, 14);
                }
                g.stroke();
                g.fillColor = color('#14212B');
                g.circle(0, cy, 5);
                g.fill();
                g.strokeColor = color('#E0E8D6');
                g.lineWidth = 1;
                g.moveTo(-bw + 10, cy + bh - 4);
                g.lineTo(bw - 10, cy + bh - 4);
                g.stroke();
              }
              h.listen(node, function () {
                return choose(index);
              });
              h.text(h.t('boltsTube', {
                tube: index + 1
              }), x, y + bodyHeight + 1, w, 27, 18, accent === MISSION_COLORS.edge ? MISSION_COLORS.muted : accent, true, false);
            };
            for (var index = 0; index < state.tubes.length; index++) {
              _loop(index);
            }
            h.text(hint ? h.t('boltsHintShown', {
              from: hint.from + 1,
              to: hint.to + 1
            }) : h.t(message), 28, 727, 424, 52, 18, hint ? MISSION_COLORS.amber : MISSION_COLORS.muted, true);
            h.button(h.t('undo'), 24, 800, 100, 70, function () {
              var previous = history.pop();
              if (previous) {
                state = previous;
                selected = null;
                hint = null;
                message = 'boltsChooseSource';
                h.render();
              }
            });
            h.button(h.t('hint'), 134, 800, 100, 70, function () {
              selected = null;
              hint = getBoltsHint(state);
              message = hint ? 'boltsChooseSource' : 'boltsNoHint';
              h.render();
            });
            h.button(h.t('restart'), 244, 800, 100, 70, function () {
              return h.restart();
            });
            h.button(h.t('newBoard'), 354, 800, 100, 70, function () {
              return h.next();
            });
            if (isBoltsWon(state)) h.result(h.t('boltsWinTitle'), h.t('boltsWinBody', {
              moves: state.moves
            }), true);
          }
        };
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/circuit.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './random.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, _extends, cclegacy, seededRandom, shuffle;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _extends = module.extends;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      seededRandom = module.seededRandom;
      shuffle = module.shuffle;
    }],
    execute: function () {
      cclegacy._RF.push({}, "cb33b44Nr9PLrQNFaD8pmky", "circuit", undefined);
      // Clockwise ports: north, east, south, west.
      var CIRCUIT_PORTS = exports('CIRCUIT_PORTS', [1, 2, 4, 8]);
      var DX = [0, 1, 0, -1],
        DY = [-1, 0, 1, 0];
      var rotatePorts = exports('rotatePorts', function rotatePorts(ports) {
        return ports << 1 & 15 | ports >> 3;
      });
      var createCircuit = exports('createCircuit', function createCircuit(seed, difficulty) {
        if (difficulty === void 0) {
          difficulty = 1;
        }
        var random = seededRandom(seed);
        var size = difficulty === 3 ? 4 : 3;
        var flipX = random() < 0.5,
          flipY = random() < 0.5;
        var transform = function transform(index) {
          return (flipY ? size - 1 - Math.floor(index / size) : Math.floor(index / size)) * size + (flipX ? size - 1 - index % size : index % size);
        };
        var target = Array(size * size).fill(0);
        var paths = difficulty === 1 ? [[0, 1, 2, 5, 4, 3, 6, 7, 8]] : difficulty === 2 ? [[0, 3, 4, 1, 2, 5, 8], [4, 7, 6]] : [[0, 4, 8, 9, 5, 1, 2, 6, 10, 14, 15], [6, 7, 3], [14, 13, 12]];
        for (var _i = 0, _paths = paths; _i < _paths.length; _i++) {
          var path = _paths[_i];
          var _loop = function _loop() {
            var a = transform(path[step - 1]),
              b = transform(path[step]);
            var direction = DX.findIndex(function (dx, i) {
              return a % size + dx === b % size && Math.floor(a / size) + DY[i] === Math.floor(b / size);
            });
            target[a] |= CIRCUIT_PORTS[direction];
            target[b] |= CIRCUIT_PORTS[(direction + 2) % 4];
          };
          for (var step = 1; step < path.length; step++) {
            _loop();
          }
        }
        var source = transform(0),
          sink = transform(size * size - 1);
        var sourcePort = flipX ? 2 : 8,
          sinkPort = flipX ? 8 : 2;
        target[source] |= sourcePort;
        target[sink] |= sinkPort;
        var tiles = [].concat(target);
        var count = difficulty === 1 ? 3 : difficulty === 2 ? 4 + Math.floor(random() * 3) : 6 + Math.floor(random() * 2);
        var candidates = shuffle(target.map(function (ports, index) {
          return ports ? index : -1;
        }).filter(function (index) {
          return index >= 0;
        }), seed + ":tiles");
        for (var _iterator = _createForOfIteratorHelperLoose(candidates.slice(0, count)), _step; !(_step = _iterator()).done;) {
          var index = _step.value;
          var turns = 1 + Math.floor(random() * 3);
          for (var turn = 0; turn < turns; turn++) tiles[index] = rotatePorts(tiles[index]);
          if (tiles[index] === target[index]) tiles[index] = rotatePorts(tiles[index]);
        }
        return {
          size: size,
          tiles: tiles,
          target: target,
          source: source,
          sourcePort: sourcePort,
          sink: sink,
          sinkPort: sinkPort,
          moves: 0
        };
      });
      var getCircuitPower = exports('getCircuitPower', function getCircuitPower(state) {
        if (!(state.tiles[state.source] & state.sourcePort)) return {
          powered: [],
          leaks: 0,
          connected: false
        };
        var powered = [state.source],
          seen = new Set(powered);
        var leaks = 0;
        for (var current = 0; current < powered.length; current++) {
          var index = powered[current];
          for (var d = 0; d < 4; d++) {
            if (!(state.tiles[index] & CIRCUIT_PORTS[d])) continue;
            if (index === state.source && CIRCUIT_PORTS[d] === state.sourcePort || index === state.sink && CIRCUIT_PORTS[d] === state.sinkPort) continue;
            var x = index % state.size + DX[d],
              y = Math.floor(index / state.size) + DY[d];
            var neighbor = y * state.size + x;
            if (x < 0 || x >= state.size || y < 0 || y >= state.size || !(state.tiles[neighbor] & CIRCUIT_PORTS[(d + 2) % 4])) {
              leaks++;
              continue;
            }
            if (!seen.has(neighbor)) {
              seen.add(neighbor);
              powered.push(neighbor);
            }
          }
        }
        return {
          powered: powered,
          leaks: leaks,
          connected: seen.has(state.sink) && !!(state.tiles[state.sink] & state.sinkPort)
        };
      });
      var isCircuitWon = exports('isCircuitWon', function isCircuitWon(state) {
        var power = getCircuitPower(state);
        return power.connected && power.leaks === 0 && power.powered.length === state.tiles.filter(Boolean).length;
      });
      var rotateCircuit = exports('rotateCircuit', function rotateCircuit(state, index) {
        if (!Number.isInteger(index) || index < 0 || index >= state.tiles.length || !state.tiles[index] || isCircuitWon(state)) return state;
        var tiles = [].concat(state.tiles);
        tiles[index] = rotatePorts(tiles[index]);
        return _extends({}, state, {
          tiles: tiles,
          moves: state.moves + 1
        });
      });
      var getCircuitHint = exports('getCircuitHint', function getCircuitHint(state) {
        var index = state.tiles.findIndex(function (ports, index) {
          return ports !== state.target[index];
        });
        return index < 0 ? null : {
          index: index,
          ports: state.target[index]
        };
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/circuitMission.ts", ['cc', './circuit.ts', './host.ts'], function (exports) {
  var cclegacy, Graphics, Color, createCircuit, getCircuitPower, getCircuitHint, isCircuitWon, CIRCUIT_PORTS, rotateCircuit, MISSION_COLORS;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Graphics = module.Graphics;
      Color = module.Color;
    }, function (module) {
      createCircuit = module.createCircuit;
      getCircuitPower = module.getCircuitPower;
      getCircuitHint = module.getCircuitHint;
      isCircuitWon = module.isCircuitWon;
      CIRCUIT_PORTS = module.CIRCUIT_PORTS;
      rotateCircuit = module.rotateCircuit;
    }, function (module) {
      MISSION_COLORS = module.MISSION_COLORS;
    }],
    execute: function () {
      exports('createCircuitMission', createCircuitMission);
      cclegacy._RF.push({}, "c7d1426muVGl6zaPYQYwsnO", "circuitMission", undefined);
      var color = function color(hex) {
        return new Color(parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16));
      };
      function createCircuitMission(h, seed, difficulty) {
        var state = createCircuit(seed, difficulty);
        var history = [];
        var hint = null;
        return {
          render: function render() {
            h.text(h.t('circuitInstruction'), 28, 145, 424, 54, 20, MISSION_COLORS.muted);
            h.image('ui-panel', 24, 213, 432, 61);
            var power = getCircuitPower(state),
              total = state.tiles.filter(Boolean).length;
            h.text(h.t('circuitPowered', {
              powered: power.powered.length,
              total: total,
              moves: state.moves
            }), 44, 224, 392, 36, 20, MISSION_COLORS.mint, true);
            h.image('ui-panel', 25, 294, 430, 420);
            var cell = state.size === 3 ? 126 : 96,
              side = cell - 8;
            var left = (480 - cell * state.size) / 2,
              top = 504 - cell * state.size / 2;
            var _loop = function _loop(index) {
              var _hint, _hint2;
              var x = left + index % state.size * cell + 4,
                y = top + Math.floor(index / state.size) * cell + 4;
              var ports = state.tiles[index],
                live = power.powered.includes(index);
              if (((_hint = hint) == null ? void 0 : _hint.index) === index) h.panel(x - 3, y - 3, side + 6, side + 6, MISSION_COLORS.panel, MISSION_COLORS.amber);
              h.image('ui-tile', x, y, side, side, ports ? 255 : 70);
              var node = h.make('CircuitTile', x, y, side, side),
                g = node.addComponent(Graphics);
              var radius = side / 2 - 4,
                ink = live ? MISSION_COLORS.mint : '#6C8792';
              for (var d = 0; d < 4; d++) if (ports & CIRCUIT_PORTS[d]) {
                var dx = [0, 1, 0, -1][d],
                  dy = [1, 0, -1, 0][d];
                g.strokeColor = color('#091B21');
                g.lineWidth = 15;
                g.moveTo(0, 0);
                g.lineTo(dx * radius, dy * radius);
                g.stroke();
                g.strokeColor = color(ink);
                g.lineWidth = 7;
                g.moveTo(0, 0);
                g.lineTo(dx * radius, dy * radius);
                g.stroke();
                g.fillColor = color('#D1C089');
                g.rect(dx * (radius - 2) - 4, dy * (radius - 2) - 4, 8, 8);
                g.fill();
              }
              if (ports) {
                g.fillColor = color('#11252D');
                g.circle(0, 0, 13);
                g.fill();
                g.strokeColor = color(ink);
                g.lineWidth = 3;
                g.circle(0, 0, 13);
                g.stroke();
                if (index === state.source) {
                  g.fillColor = color(MISSION_COLORS.mint);
                  g.rect(-7, -10, 14, 20);
                  g.fill();
                  g.fillColor = color('#10232C');
                  g.rect(-4, 3, 8, 3);
                  g.fill();
                } else if (index === state.sink) {
                  g.strokeColor = color(live ? MISSION_COLORS.mint : MISSION_COLORS.rose);
                  g.circle(0, 0, 7);
                  g.stroke();
                } else {
                  g.fillColor = color(ink);
                  g.rect(-4, -4, 8, 8);
                  g.fill();
                }
              }
              if (((_hint2 = hint) == null ? void 0 : _hint2.index) === index) for (var _d = 0; _d < 4; _d++) if (hint.ports & CIRCUIT_PORTS[_d]) {
                g.fillColor = color(MISSION_COLORS.amber);
                g.rect([0, 1, 0, -1][_d] * (radius - 13) - 4, [1, 0, -1, 0][_d] * (radius - 13) - 4, 8, 8);
                g.fill();
              }
              for (var _i = 0, _arr = [-1, 1]; _i < _arr.length; _i++) {
                var sx = _arr[_i];
                for (var _i2 = 0, _arr2 = [-1, 1]; _i2 < _arr2.length; _i2++) {
                  var sy = _arr2[_i2];
                  g.fillColor = color('#516671');
                  g.circle(sx * (side / 2 - 10), sy * (side / 2 - 10), 2);
                  g.fill();
                }
              }
              if (ports) h.listen(node, function () {
                var next = rotateCircuit(state, index);
                if (next === state) return;
                history.push(state);
                state = next;
                hint = null;
                h.sound(isCircuitWon(state) ? 'win' : 'tap');
                h.render();
              });
            };
            for (var index = 0; index < state.tiles.length; index++) {
              _loop(index);
            }
            h.text(h.t(hint ? 'circuitHintShown' : 'circuitLegend'), 28, 727, 424, 52, 18, hint ? MISSION_COLORS.amber : MISSION_COLORS.muted, true);
            h.button(h.t('undo'), 24, 800, 100, 70, function () {
              var previous = history.pop();
              if (previous) {
                state = previous;
                hint = null;
                h.render();
              }
            });
            h.button(h.t('hint'), 134, 800, 100, 70, function () {
              hint = getCircuitHint(state);
              h.render();
            });
            h.button(h.t('restart'), 244, 800, 100, 70, function () {
              return h.restart();
            });
            h.button(h.t('newBoard'), 354, 800, 100, 70, function () {
              return h.next();
            });
            if (isCircuitWon(state)) h.result(h.t('circuitWinTitle'), h.t('circuitWinBody', {
              moves: state.moves
            }), true);
          }
        };
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/drone.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './random.ts'], function (exports) {
  var _extends, cclegacy, seededRandom;
  return {
    setters: [function (module) {
      _extends = module.extends;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      seededRandom = module.seededRandom;
    }],
    execute: function () {
      cclegacy._RF.push({}, "983a5jyPQFEM4vQaobLLtGs", "drone", undefined);
      var HZ = 120;
      var DRONE_STEP = exports('DRONE_STEP', 1 / HZ);
      var DRONE_RADIUS = exports('DRONE_RADIUS', 16);
      var DRONE_SPEED = exports('DRONE_SPEED', 300);
      var DRONE_MIN_X = exports('DRONE_MIN_X', 60);
      var DRONE_MAX_X = exports('DRONE_MAX_X', 420);
      var createDrone = exports('createDrone', function createDrone(seed, difficulty) {
        if (difficulty === void 0) {
          difficulty = 1;
        }
        var random = seededRandom(seed);
        var total = [4, 5, 6][difficulty - 1];
        var width = [140, 120, 100][difficulty - 1];
        var warning = [120, 102, 84][difficulty - 1];
        var interval = [264, 288, 312][difficulty - 1];
        var center = 240;
        var gates = Array.from({
          length: total
        }, function (_, id) {
          // At most 156 units of travel; the shortest warning permits 210.
          center = Math.max(40 + width / 2, Math.min(440 - width / 2, center + (random() < 0.5 ? -1 : 1) * (72 + Math.floor(random() * 85))));
          return {
            id: id,
            center: center,
            width: width,
            warning: warning,
            arrival: 312 + id * interval
          };
        });
        return {
          gates: gates,
          tick: 0,
          carry: 0,
          x: 240,
          targetX: 240,
          passed: 0,
          collisions: 0,
          status: 'playing'
        };
      });
      var moveDrone = exports('moveDrone', function moveDrone(state, x) {
        if (state.status !== 'playing' || !Number.isFinite(x) || x < DRONE_MIN_X || x > DRONE_MAX_X) return state;
        return _extends({}, state, {
          targetX: x
        });
      });
      var nudgeDrone = exports('nudgeDrone', function nudgeDrone(state, direction) {
        if (direction !== -1 && direction !== 1) return state;
        return moveDrone(state, Math.max(DRONE_MIN_X, Math.min(DRONE_MAX_X, state.targetX + direction * 60)));
      });
      var advanceDrone = exports('advanceDrone', function advanceDrone(state, dt) {
        if (state.status !== 'playing' || !Number.isFinite(dt) || dt <= 0) return state;
        var elapsed = state.carry + dt;
        var steps = Math.min(Math.floor((elapsed + 1e-10) * HZ), state.gates[state.gates.length - 1].arrival - state.tick);
        var x = state.x,
          tick = state.tick,
          passed = state.passed,
          collisions = state.collisions;
        var status = state.status;
        for (var step = 0; step < steps && status === 'playing'; step += 1) {
          tick += 1;
          x += Math.sign(state.targetX - x) * Math.min(Math.abs(state.targetX - x), DRONE_SPEED / HZ);
          var gate = state.gates[passed];
          if (tick >= gate.arrival) {
            if (Math.abs(x - gate.center) + DRONE_RADIUS > gate.width / 2) collisions += 1;
            passed += 1;
            status = collisions >= 2 ? 'lost' : passed === state.gates.length ? 'won' : 'playing';
          }
        }
        return _extends({}, state, {
          x: x,
          tick: tick,
          passed: passed,
          collisions: collisions,
          status: status,
          carry: status === 'playing' ? Math.max(0, elapsed - steps / HZ) : 0
        });
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/droneMission.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './drone.ts', './host.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, cclegacy, Color, Graphics, Node, UITransform, Vec3, createDrone, advanceDrone, nudgeDrone, moveDrone, DRONE_MIN_X, DRONE_MAX_X, MISSION_COLORS;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      Color = module.Color;
      Graphics = module.Graphics;
      Node = module.Node;
      UITransform = module.UITransform;
      Vec3 = module.Vec3;
    }, function (module) {
      createDrone = module.createDrone;
      advanceDrone = module.advanceDrone;
      nudgeDrone = module.nudgeDrone;
      moveDrone = module.moveDrone;
      DRONE_MIN_X = module.DRONE_MIN_X;
      DRONE_MAX_X = module.DRONE_MAX_X;
    }, function (module) {
      MISSION_COLORS = module.MISSION_COLORS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "f8cae9pOWpLgKxaFUhDVC8B", "droneMission", undefined);
      var color = function color(hex) {
        return new Color(parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16));
      };
      var createDroneMission = exports('createDroneMission', function createDroneMission(h, seed, difficulty) {
        var state = createDrone(seed, difficulty),
          paused = false,
          hintUsed = false,
          hintUntil = 0;
        var counter = null,
          message = null,
          graphic = null,
          drone = null;
        var info = 'droneReady';
        var paint = function paint() {
          var _drone, _graphic;
          if (counter) counter.string = h.t('droneProgress', {
            passed: state.passed,
            total: state.gates.length,
            shield: Math.max(0, 1 - state.collisions)
          });
          if (message) message.string = h.t(paused ? 'actionPaused' : info);
          if ((_drone = drone) != null && _drone.isValid) drone.setPosition(state.x - 240, 450 - 650);
          if (!((_graphic = graphic) != null && _graphic.isValid)) return;
          var g = graphic;
          g.clear();
          var rect = function rect(x, y, w, height, fill) {
            g.fillColor = color(fill);
            g.rect(x - 240, 505 - y - height, w, height);
            g.fill();
          };
          for (var lane = 80; lane < 440; lane += 60) rect(lane, 312, 2, 384, MISSION_COLORS.edge);
          for (var _iterator = _createForOfIteratorHelperLoose(state.gates.slice(state.passed)), _step; !(_step = _iterator()).done;) {
            var gate = _step.value;
            var remaining = gate.arrival - state.tick;
            if (remaining > gate.warning || remaining < 0) continue;
            var y = 324 + (1 - remaining / gate.warning) * 326;
            var left = gate.center - gate.width / 2,
              right = gate.center + gate.width / 2;
            rect(40, y - 12, left - 40, 24, MISSION_COLORS.rose);
            rect(right, y - 12, 440 - right, 24, MISSION_COLORS.rose);
            rect(40, y - 3, left - 40, 6, MISSION_COLORS.ink);
            rect(right, y - 3, 440 - right, 6, MISSION_COLORS.ink);
            rect(left - 8, y - 22, 8, 44, MISSION_COLORS.mint);
            rect(right, y - 22, 8, 44, MISSION_COLORS.mint);
            if (hintUntil > state.tick && gate.id === state.passed) {
              g.strokeColor = color(MISSION_COLORS.amber);
              g.lineWidth = 4;
              g.rect(left - 240 + 4, 505 - y - 28, gate.width - 8, 56);
              g.stroke();
            }
          }
          rect(state.targetX - 2, 680, 4, 12, MISSION_COLORS.amber);
        };
        var finish = function finish() {
          if (state.status !== 'playing') {
            h.render();
            if (state.status === 'won') h.sound('win');
          }
        };
        var steer = function steer(direction) {
          if (!paused) {
            state = nudgeDrone(state, direction);
            paint();
          }
        };
        var render = function render() {
          h.text(h.t('droneInstruction'), 24, 145, 432, 58, 20, MISSION_COLORS.ink);
          counter = h.text('', 24, 219, 432, 28, 20, MISSION_COLORS.mint);
          message = h.text('', 24, 250, 432, 44, 18, MISSION_COLORS.muted);
          var board = h.panel(24, 300, 432, 410, MISSION_COLORS.bg, MISSION_COLORS.edge);
          graphic = h.make('Laser gates', 24, 300, 432, 410).addComponent(Graphics);
          drone = h.make('Drone', 0, 0, 70, 70);
          var rotors = drone.addComponent(Graphics);
          rotors.fillColor = color(MISSION_COLORS.mint);
          for (var _i = 0, _arr = [-16, 10]; _i < _arr.length; _i++) {
            var x = _arr[_i];
            rotors.rect(x, -7, 6, 14);
            rotors.fill();
          }
          var body = h.prop(10, 0, 0, 32);
          body.setParent(drone);
          body.setPosition(0, 0);
          var drag = function drag(event) {
            if (paused || state.status !== 'playing') return;
            var point = event.getUILocation();
            var local = board.parent.getComponent(UITransform).convertToNodeSpaceAR(new Vec3(point.x, point.y, 0));
            state = moveDrone(state, Math.max(DRONE_MIN_X, Math.min(DRONE_MAX_X, local.x + 240)));
            paint();
            event.propagationStopped = true;
          };
          board.on(Node.EventType.TOUCH_START, drag);
          board.on(Node.EventType.TOUCH_MOVE, drag);
          // The flight overlay and drone also accept drags so their visuals cannot block steering.
          graphic.node.on(Node.EventType.TOUCH_START, drag);
          graphic.node.on(Node.EventType.TOUCH_MOVE, drag);
          drone.on(Node.EventType.TOUCH_START, drag);
          drone.on(Node.EventType.TOUCH_MOVE, drag);
          h.button(h.t('droneLeft'), 24, 720, 210, 70, function () {
            return steer(-1);
          }, MISSION_COLORS.mint);
          h.button(h.t('droneRight'), 246, 720, 210, 70, function () {
            return steer(1);
          }, MISSION_COLORS.mint);
          h.button(h.t(paused ? 'resume' : 'pause'), 24, 800, 102, 70, function () {
            paused = !paused;
            h.render();
          });
          h.button(h.t('restart'), 134, 800, 102, 70, h.restart);
          h.button(h.t('newBoard'), 244, 800, 102, 70, h.next);
          h.button(h.t('hint'), 354, 800, 102, 70, function () {
            if (paused || state.status !== 'playing') return;
            if (hintUsed) {
              info = 'actionHintUsed';
              paint();
              return;
            }
            var gate = state.gates[state.passed];
            if (gate.arrival - state.tick > gate.warning) {
              info = 'droneNoHint';
              paint();
              return;
            }
            hintUsed = true;
            hintUntil = state.tick + 120;
            info = 'droneHint';
            paint();
          });
          paint();
          if (paused && state.status === 'playing') {
            h.panel(56, 429, 368, 132, MISSION_COLORS.bg, MISSION_COLORS.mint);
            h.text(h.t('actionPaused'), 72, 435, 336, 48, 20, MISSION_COLORS.ink, true);
            h.button(h.t('resume'), 136, 486, 208, 70, function () {
              paused = false;
              h.render();
            }, MISSION_COLORS.mint);
          }
          if (state.status !== 'playing') h.result(h.t(state.status === 'won' ? 'droneWinTitle' : 'droneLoseTitle'), h.t(state.status === 'won' ? 'droneWinBody' : 'droneLoseBody', {
            total: state.gates.length
          }), state.status === 'won');
        };
        return {
          render: render,
          update: function update(dt) {
            if (paused || state.status !== 'playing') return;
            var previous = state;
            state = advanceDrone(state, dt);
            if (state.collisions > previous.collisions) {
              info = 'droneCollision';
              h.sound('tap');
            } else if (state.passed > previous.passed) h.sound('match');
            paint();
            finish();
          },
          hide: function hide() {
            paused = true;
          }
        };
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/echo.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './random.ts'], function (exports) {
  var _extends, cclegacy, seededRandom;
  return {
    setters: [function (module) {
      _extends = module.extends;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      seededRandom = module.seededRandom;
    }],
    execute: function () {
      cclegacy._RF.push({}, "a6080i3bXNJ25OowjAYCn/V", "echo", undefined);
      var createEcho = exports('createEcho', function createEcho(seed, difficulty) {
        if (difficulty === void 0) {
          difficulty = 1;
        }
        if (![1, 2, 3].includes(difficulty)) throw new Error('Echo difficulty must be 1–3');
        var random = seededRandom("echo-" + seed + "-" + difficulty);
        var length = difficulty + 2,
          rounds = difficulty === 1 ? 1 : 2;
        return {
          sequences: Array.from({
            length: rounds
          }, function () {
            return Array.from({
              length: length
            }, function () {
              return Math.floor(random() * 4);
            });
          }),
          interval: difficulty === 3 ? 0.45 : 0.6,
          round: 0,
          entered: 0,
          phase: 'showing',
          elapsed: 0,
          mistakes: 0,
          hintUsed: false,
          hintRemaining: 0
        };
      });
      var advanceEcho = exports('advanceEcho', function advanceEcho(state, dt) {
        if (!Number.isFinite(dt) || dt <= 0 || state.phase === 'won') return state;
        var hintRemaining = Math.max(0, state.hintRemaining - dt);
        if (state.phase === 'input') return hintRemaining === state.hintRemaining ? state : _extends({}, state, {
          hintRemaining: hintRemaining
        });
        var duration = state.sequences[state.round].length * state.interval;
        var elapsed = Math.min(duration, state.elapsed + dt);
        return _extends({}, state, {
          elapsed: elapsed,
          hintRemaining: hintRemaining,
          phase: elapsed + 1e-9 >= duration ? 'input' : 'showing'
        });
      });
      var echoLitKey = exports('echoLitKey', function echoLitKey(state) {
        var _state$sequences$stat;
        if (state.phase === 'input' && state.hintRemaining > 0) return state.sequences[state.round][0];
        if (state.phase !== 'showing') return null;
        var step = Math.floor((state.elapsed + 1e-9) / state.interval);
        return state.elapsed - step * state.interval < state.interval * 0.7 ? (_state$sequences$stat = state.sequences[state.round][step]) != null ? _state$sequences$stat : null : null;
      });
      var inputEcho = exports('inputEcho', function inputEcho(state, key) {
        if (state.phase !== 'input' || !Number.isInteger(key) || key < 0 || key > 3) return state;
        var sequence = state.sequences[state.round];
        if (key !== sequence[state.entered]) {
          return _extends({}, state, {
            phase: 'showing',
            elapsed: 0,
            entered: 0,
            mistakes: state.mistakes + 1,
            hintRemaining: 0
          });
        }
        var entered = state.entered + 1;
        if (entered < sequence.length) return _extends({}, state, {
          entered: entered
        });
        if (state.round + 1 === state.sequences.length) return _extends({}, state, {
          entered: entered,
          phase: 'won',
          hintRemaining: 0
        });
        return _extends({}, state, {
          round: state.round + 1,
          entered: 0,
          phase: 'showing',
          elapsed: 0,
          hintRemaining: 0
        });
      });
      var hintEcho = exports('hintEcho', function hintEcho(state) {
        return state.phase === 'input' && !state.hintUsed ? _extends({}, state, {
          hintUsed: true,
          hintRemaining: 0.65
        }) : state;
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/echoMission.ts", ['cc', './echo.ts', './host.ts'], function (exports) {
  var cclegacy, createEcho, echoLitKey, hintEcho, advanceEcho, inputEcho, MISSION_COLORS;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      createEcho = module.createEcho;
      echoLitKey = module.echoLitKey;
      hintEcho = module.hintEcho;
      advanceEcho = module.advanceEcho;
      inputEcho = module.inputEcho;
    }, function (module) {
      MISSION_COLORS = module.MISSION_COLORS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "eb363wOYNZBuZj6zLd2pDxK", "echoMission", undefined);
      var createEchoMission = exports('createEchoMission', function createEchoMission(h, seed, difficulty) {
        var state = createEcho(seed, difficulty),
          paused = false;
        var press = function press(key) {
          if (paused) return;
          var next = inputEcho(state, key);
          if (next === state) return;
          h.sound(next.phase === 'won' ? 'win' : next.round > state.round ? 'match' : 'tap');
          state = next;
          h.render();
        };
        return {
          render: function render() {
            h.text(h.t('echoInstruction'), 28, 145, 424, 55, 20, MISSION_COLORS.muted);
            h.image('ui-panel', 24, 211, 432, 64);
            h.text(h.t('echoRound', {
              current: state.round + 1,
              total: state.sequences.length
            }), 42, 222, 180, 35, 18, MISSION_COLORS.rose);
            var length = state.sequences[state.round].length;
            h.text(h.t(state.phase === 'showing' ? 'echoWatch' : 'echoInput', {
              count: length,
              current: state.entered,
              total: length
            }), 220, 222, 220, 35, 18, MISSION_COLORS.ink, true);
            h.image('ui-panel', 20, 296, 440, 416);
            var lit = echoLitKey(state);
            var _loop = function _loop(key) {
              var x = 47 + key % 2 * 202,
                y = 325 + Math.floor(key / 2) * 184;
              h.image('ui-tile', x, y, 184, 164);
              h.panel(x + 8, y + 8, 168, 148, lit === key && !paused ? '#276657' : '#142D37', lit === key && !paused ? MISSION_COLORS.mint : MISSION_COLORS.edge, 0);
              h.prop([4, 8, 10, 13][key], x + 51, y + 16, 82);
              h.text(h.t('echoKey', {
                key: key + 1
              }), x + 12, y + 116, 160, 30, 20, lit === key && !paused ? MISSION_COLORS.mint : MISSION_COLORS.ink, true);
              var hit = h.make('EchoKey', x, y, 184, 164);
              h.listen(hit, function () {
                return press(key);
              });
            };
            for (var key = 0; key < 4; key += 1) {
              _loop(key);
            }
            h.text(h.t(state.hintRemaining > 0 ? 'echoFirstHint' : state.mistakes > 0 && state.phase === 'showing' ? 'echoRetry' : 'echoPhaseHelp'), 30, 729, 420, 56, 20, MISSION_COLORS.muted, true);
            h.button(h.t('restart'), 26, 800, 134, 70, function () {
              return h.restart();
            });
            h.button(h.t(state.hintUsed ? 'memoryHintUsed' : 'hint'), 174, 800, 132, 70, function () {
              if (paused) return;
              var next = hintEcho(state);
              if (next !== state) {
                state = next;
                h.render();
              }
            }, MISSION_COLORS.rose);
            h.button(h.t('newBoard'), 320, 800, 134, 70, function () {
              return h.next();
            });
            if (paused) {
              h.panel(25, 301, 430, 406, MISSION_COLORS.bg, MISSION_COLORS.edge, 0);
              h.text(h.t('memoryPaused'), 48, 385, 384, 48, 24, MISSION_COLORS.ink, true);
              h.text(h.t('memoryPauseBody'), 48, 437, 384, 58, 20, MISSION_COLORS.muted, true);
              h.button(h.t('resume'), 115, 525, 250, 70, function () {
                paused = false;
                h.render();
              }, MISSION_COLORS.rose);
            }
            if (state.phase === 'won') h.result(h.t('echoWinTitle'), h.t('echoComplete'));
          },
          update: function update(dt) {
            if (paused) return;
            var previous = state;
            state = advanceEcho(state, dt);
            if (state.phase !== previous.phase || echoLitKey(state) !== echoLitKey(previous)) h.render();
          },
          hide: function hide() {
            if (state.phase !== 'won') paused = true;
          }
        };
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/filter.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './random.ts'], function (exports) {
  var _extends, cclegacy, shuffle, seededRandom;
  return {
    setters: [function (module) {
      _extends = module.extends;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      shuffle = module.shuffle;
      seededRandom = module.seededRandom;
    }],
    execute: function () {
      cclegacy._RF.push({}, "54b2fDpkShDZa4nl3jGkmJQ", "filter", undefined);
      var HZ = 120;
      var FILTER_STEP = exports('FILTER_STEP', 1 / HZ);
      var createFilter = exports('createFilter', function createFilter(seed, difficulty) {
        if (difficulty === void 0) {
          difficulty = 1;
        }
        var target = [6, 8, 10][difficulty - 1];
        var interval = [84, 78, 72][difficulty - 1];
        var count = target + 2;
        var decoys = difficulty === 1 ? 1 : 3;
        var kinds = shuffle([].concat(Array(count).fill(true), Array(decoys).fill(false)), seed);
        var random = seededRandom(seed + ":lanes");
        var shift = Math.floor(random() * 3);
        var directions = [0, 1, 2].map(function () {
          return random() < 0.5 ? 1 : -1;
        });
        return {
          packets: kinds.map(function (isTarget, id) {
            return {
              id: id,
              target: isTarget,
              lane: (id + shift) % 3,
              direction: directions[(id + shift) % 3],
              start: 120 + id * interval,
              end: 360 + id * interval
            };
          }),
          target: target,
          tick: 0,
          carry: 0,
          resolved: [],
          hits: 0,
          errors: 0,
          missed: 0,
          status: 'playing'
        };
      });
      var isFilterPacketActive = exports('isFilterPacketActive', function isFilterPacketActive(state, packet) {
        return state.status === 'playing' && state.tick >= packet.start && state.tick < packet.end && !state.resolved.includes(packet.id);
      });
      var filterPacketPosition = exports('filterPacketPosition', function filterPacketPosition(state, packet) {
        var progress = Math.max(0, Math.min(1, (state.tick - packet.start) / (packet.end - packet.start)));
        return {
          x: packet.direction === 1 ? 68 + 344 * progress : 412 - 344 * progress,
          y: 354 + packet.lane * 124
        };
      });
      var advanceFilter = exports('advanceFilter', function advanceFilter(state, dt) {
        if (state.status !== 'playing' || !Number.isFinite(dt) || dt <= 0) return state;
        // The complete finite stream bounds work even after a long offline frame.
        var elapsed = state.carry + dt;
        var steps = Math.floor((elapsed + 1e-10) * HZ);
        var tick = Math.min(state.packets[state.packets.length - 1].end, state.tick + steps);
        var expired = state.packets.filter(function (packet) {
          return packet.end <= tick && !state.resolved.includes(packet.id);
        });
        return _extends({}, state, {
          tick: tick,
          carry: tick >= state.packets[state.packets.length - 1].end ? 0 : Math.max(0, elapsed - steps / HZ),
          resolved: [].concat(state.resolved, expired.map(function (packet) {
            return packet.id;
          })),
          missed: state.missed + expired.filter(function (packet) {
            return packet.target;
          }).length,
          status: tick >= state.packets[state.packets.length - 1].end ? 'lost' : 'playing'
        });
      });

      // Input has no timestamp: only a currently visible, unresolved packet can score.
      var tapFilter = exports('tapFilter', function tapFilter(state, id) {
        if (!Number.isInteger(id)) return state;
        var packet = state.packets.find(function (value) {
          return value.id === id;
        });
        if (!packet || !isFilterPacketActive(state, packet)) return state;
        var hits = state.hits + (packet.target ? 1 : 0);
        var errors = state.errors + (packet.target ? 0 : 1);
        return _extends({}, state, {
          resolved: [].concat(state.resolved, [id]),
          hits: hits,
          errors: errors,
          status: errors >= 2 ? 'lost' : hits >= state.target ? 'won' : 'playing'
        });
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/filterMission.ts", ['cc', './filter.ts', './host.ts'], function (exports) {
  var cclegacy, Color, Graphics, createFilter, advanceFilter, isFilterPacketActive, filterPacketPosition, tapFilter, MISSION_COLORS;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Color = module.Color;
      Graphics = module.Graphics;
    }, function (module) {
      createFilter = module.createFilter;
      advanceFilter = module.advanceFilter;
      isFilterPacketActive = module.isFilterPacketActive;
      filterPacketPosition = module.filterPacketPosition;
      tapFilter = module.tapFilter;
    }, function (module) {
      MISSION_COLORS = module.MISSION_COLORS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "16795UuShtPyKWNvDpzGOo8", "filterMission", undefined);
      var color = function color(hex) {
        return new Color(parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16));
      };
      var createFilterMission = exports('createFilterMission', function createFilterMission(h, seed, difficulty) {
        var state = createFilter(seed, difficulty),
          paused = false,
          hintUsed = false,
          hintId = -1;
        var info = 'filterReady',
          counter = null,
          message = null;
        var packets = [],
          ink = [],
          paintedHint = -2;
        var paint = function paint() {
          if (counter) counter.string = h.t('filterProgress', {
            hits: state.hits,
            target: state.target,
            errors: state.errors
          });
          if (message) message.string = h.t(paused ? 'actionPaused' : info);
          state.packets.forEach(function (packet, index) {
            var node = packets[index];
            if (!node || !node.isValid) return;
            node.active = isFilterPacketActive(state, packet);
            var position = filterPacketPosition(state, packet);
            node.setPosition(position.x - 240, 450 - position.y);
            if (paintedHint === hintId) return;
            var g = ink[index];
            g.clear();
            g.fillColor = color(MISSION_COLORS.panel);
            g.strokeColor = color(packet.id === hintId ? MISSION_COLORS.amber : packet.target ? MISSION_COLORS.mint : MISSION_COLORS.rose);
            g.lineWidth = packet.id === hintId ? 6 : 3;
            if (packet.target) g.rect(-34, -34, 68, 68);else {
              g.moveTo(0, 35);
              g.lineTo(36, -34);
              g.lineTo(-36, -34);
              g.close();
            }
            g.fill();
            g.stroke();
          });
          paintedHint = hintId;
        };
        var finish = function finish() {
          if (state.status === 'playing') return;
          h.render();
          if (state.status === 'won') h.sound('win');
        };
        var tap = function tap(id) {
          if (paused) return;
          var previous = state;
          state = tapFilter(state, id);
          if (state === previous) return;
          info = state.errors > previous.errors ? 'filterDecoy' : 'filterHit';
          h.sound(state.errors > previous.errors ? 'tap' : 'match');
          paint();
          finish();
        };
        var render = function render() {
          packets = [];
          ink = [];
          paintedHint = -2;
          h.text(h.t('filterInstruction'), 24, 145, 432, 58, 20, MISSION_COLORS.ink, false);
          counter = h.text('', 24, 219, 432, 28, 20, MISSION_COLORS.mint);
          message = h.text('', 24, 250, 432, 44, 18, MISSION_COLORS.muted);
          h.panel(24, 300, 432, 410, MISSION_COLORS.bg, MISSION_COLORS.edge);
          for (var lane = 0; lane < 3; lane += 1) {
            h.panel(30, 312 + lane * 124, 420, 84, MISSION_COLORS.panel);
          }
          h.prop(11, 190, 650, 100, 55);
          state.packets.forEach(function (packet) {
            var node = h.make("Packet " + packet.id, 0, 0, 76, 76);
            ink.push(node.addComponent(Graphics));
            var prop = h.prop(packet.target ? 4 : 15, 0, 0, 44);
            prop.setParent(node);
            prop.setPosition(0, packet.target ? 0 : -7);
            h.listen(node, function () {
              return tap(packet.id);
            });
            packets.push(node);
          });
          h.button(h.t(paused ? 'resume' : 'pause'), 24, 800, 102, 70, function () {
            paused = !paused;
            h.render();
          });
          h.button(h.t('restart'), 134, 800, 102, 70, h.restart);
          h.button(h.t('newBoard'), 244, 800, 102, 70, h.next);
          h.button(h.t('hint'), 354, 800, 102, 70, function () {
            if (paused || state.status !== 'playing') return;
            if (hintUsed) {
              info = 'actionHintUsed';
              paint();
              return;
            }
            var next = state.packets.find(function (packet) {
              return !packet.target && packet.end > state.tick && !state.resolved.includes(packet.id);
            });
            if (!next) {
              info = 'filterNoHint';
              paint();
              return;
            }
            hintUsed = true;
            hintId = next.id;
            info = 'filterHint';
            paint();
          });
          paint();
          if (paused && state.status === 'playing') {
            h.panel(56, 429, 368, 132, MISSION_COLORS.bg, MISSION_COLORS.mint);
            h.text(h.t('actionPaused'), 72, 435, 336, 48, 20, MISSION_COLORS.ink, true);
            h.button(h.t('resume'), 136, 486, 208, 70, function () {
              paused = false;
              h.render();
            }, MISSION_COLORS.mint);
          }
          if (state.status !== 'playing') h.result(h.t(state.status === 'won' ? 'filterWinTitle' : 'filterLoseTitle'), h.t(state.status === 'won' ? 'filterWinBody' : 'filterLoseBody', {
            hits: state.hits
          }), state.status === 'won');
        };
        return {
          render: render,
          update: function update(dt) {
            if (paused || state.status !== 'playing') return;
            state = advanceFilter(state, dt);
            paint();
            finish();
          },
          hide: function hide() {
            paused = true;
          }
        };
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/host.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "85f4eWuDdBPXp4jCPf1FgtC", "host", undefined);
      var MISSION_COLORS = exports('MISSION_COLORS', {
        bg: '#080F18',
        panel: '#10232C',
        edge: '#315763',
        ink: '#E7F6F2',
        muted: '#9EB7BF',
        mint: '#55F2D0',
        amber: '#C3F76B',
        rose: '#F45BB8',
        lilac: '#AB9BFF'
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/i18n.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports({
        formatNumber: formatNumber,
        resolveLocale: resolveLocale,
        translate: translate
      });
      cclegacy._RF.push({}, "1174bjIMAJC45NXRgNJ6nP4", "i18n", undefined);
      var LOCALES = exports('LOCALES', [{
        id: 'en',
        name: 'English',
        code: 'EN'
      }, {
        id: 'zh-CN',
        name: '简体中文',
        code: 'ZH'
      }, {
        id: 'ja',
        name: '日本語',
        code: 'JA'
      }, {
        id: 'ko',
        name: '한국어',
        code: 'KO'
      }, {
        id: 'fr',
        name: 'Français',
        code: 'FR'
      }, {
        id: 'de',
        name: 'Deutsch',
        code: 'DE'
      }, {
        id: 'es',
        name: 'Español',
        code: 'ES'
      }, {
        id: 'pt',
        name: 'Português',
        code: 'PT'
      }, {
        id: 'ru',
        name: 'Русский',
        code: 'RU'
      }]);
      var DEFAULT_LOCALE = exports('DEFAULT_LOCALE', 'en');
      var en = {
        appTitle: 'Cyber Heist · Training Grid',
        canvasLabel: 'Cyber Heist mini-game training',
        loadingTitle: 'Connecting to the grid',
        loadingHint: 'Loading your training modules…',
        loadFailed: 'Connection failed',
        reloadHint: 'Reload the page to try again.',
        lobbyTitle: 'Training Grid',
        lobbyTagline: 'Ten missions. Sharpen your edge.',
        readyTasks: '● Ready / 10 tasks',
        soundOn: 'Sound on',
        soundOff: 'Sound off',
        motionOn: 'Motion on',
        motionOff: 'Motion off',
        offlineBadge: 'Offline demo',
        footer: 'Pick a mission to begin.',
        back: '← Back',
        sound: 'Sound',
        mute: 'Mute',
        languageTitle: 'Language',
        languageHint: 'Choose your interface language.',
        languageClose: 'Done',
        sokobanTitle: 'Power Crates',
        onetTitle: 'Signal Link',
        memoryTitle: 'Chip Memory',
        stackTitle: 'Relay Stack',
        sokobanCategory: 'Logic / Routing',
        onetCategory: 'Focus / Links',
        memoryCategory: 'Recall / Chips',
        stackCategory: 'Timing / Towers',
        sokobanInstruction: 'Push every crate onto a lit pad.\nYou can push, but never pull.',
        levelLabel: '{current}/{total} · {name}',
        movesLabel: 'Moves {moves}',
        undo: 'Undo',
        restart: 'Retry',
        controlHint: 'Swipe, tap arrows, or use WASD.',
        sokobanWinTitle: 'Power restored',
        sokobanWinBody: 'All pads powered in {moves} moves.',
        nextLevel: 'Next',
        onetInstruction: 'Link matching signals with up to\ntwo bends. The path must be clear.',
        remainingPairs: 'Pairs left {count}',
        matrixLabel: '6 × 6 grid',
        onetInitial: 'Start at the edges to clear a path.',
        onetHint: 'A matching pair is highlighted.',
        onetShuffled: 'Signals shuffled. Find a new route.',
        hintPair: 'Hint',
        shuffle: 'Shuffle',
        newBoard: 'New grid',
        onetWinTitle: 'Signal cleared',
        onetWinBody: 'All 18 signal pairs connected.',
        playAgain: 'Play again',
        onetBlocked: 'Path blocked. Try another pair.',
        onetConnected: 'Link established.',
        onetAutoShuffle: 'No links left. Signals reshuffled.',
        memoryInstruction: 'Memorize the chips, then flip cards\nto find all six matching pairs.',
        memoryProgress: 'Pairs {found}/{total}',
        attempts: 'Tries {count}',
        memorize: 'Memorize · {seconds}s',
        rememberMismatch: 'Remember these chips, then try again.',
        yourTurn: 'Your turn · Find a matching pair',
        matched: 'Decoded',
        memoryHint: 'Unmatched cards turn face down again.',
        restartMemory: 'Restart',
        newCards: 'New cards',
        memoryWinTitle: 'Chips decoded',
        memoryWinBody: 'Six pairs decoded in {count} tries.',
        newSet: 'New set',
        stackInstruction: 'Tap to drop each moving relay.\nAlign {target} floors to reach the network.',
        floorsLabel: 'Floors {floors}/{target}',
        perfectCount: 'Perfect {count}',
        stackReady: 'Wait for the relays to line up.',
        continueStack: 'Resume',
        drop: 'Drop',
        stackHint: 'Tap the button or press Space.',
        pause: 'Pause',
        resume: 'Resume',
        stackWinTitle: 'Relay online',
        stackWinBody: 'Network reached.\nPerfect drops: {count}.',
        stackLoseTitle: 'Relay lost',
        stackLoseBody: 'Floors reached: {floors}.\nTry a new rhythm.',
        stackAgain: 'Build again',
        tryAgain: 'Try again',
        pausedTitle: 'Paused',
        pausedHint: 'Tap Resume to continue.',
        perfectDrop: 'Perfect alignment!',
        nearMiss: 'Close call. Stay focused.',
        goodDrop: 'Relay secured.',
        backToLobby: 'Back to grid',
        prop0: 'Battery',
        prop1: 'Key',
        prop2: 'Chip',
        prop3: 'Antenna',
        prop4: 'Tape',
        prop5: 'Scanner',
        prop6: 'Crystal',
        prop7: 'Disk',
        prop8: 'Relay',
        prop9: 'Terminal',
        prop10: 'Token',
        prop11: 'Deck',
        prop12: 'Headset',
        prop13: 'Radar',
        level0: 'First Run',
        level1: 'Twin Cores',
        level2: 'Split Depot',
        level3: 'Detour',
        level4: 'Center Lane',
        level5: 'Triple Relay',
        circuitTitle: 'Circuit Flow',
        boltsTitle: 'Bolt Sort',
        echoTitle: 'Pulse Echo',
        archiveTitle: 'Archive Scan',
        filterTitle: 'Signal Filter',
        droneTitle: 'Drone Dash',
        circuitCategory: 'Think',
        boltsCategory: 'Think',
        echoCategory: 'Memory',
        archiveCategory: 'Memory',
        filterCategory: 'Reaction',
        droneCategory: 'Reaction',
        hint: 'Hint',
        missionWon: 'Mission cleared',
        missionComplete: 'All objectives complete.',
        missionNext: 'Next',
        missionDifficulty: 'Difficulty {level}',
        missionAgain: 'Again',
        missionRetry: 'Retry',
        missionNewBoard: 'New board',
        missionProgress: 'Progress',
        missionsPage: '{current}/{total}',
        circuitInstruction: 'Tap to rotate. Power every branch and the outlet.',
        circuitPowered: 'Live {powered}/{total}   Turns {moves}',
        circuitLegend: 'Battery to outlet. Leave no loose connections.',
        circuitHintShown: 'Amber marks one tile\'s correct ports.',
        circuitWinTitle: 'Circuit restored',
        circuitWinBody: 'Every branch is powered. {moves} turns.',
        boltsInstruction: 'Top bolt only. Tap source, then empty or matching tube.',
        boltsProgress: 'Moves {moves}   Capacity {depth}',
        boltsTube: 'Tube {tube}',
        boltsChooseSource: 'Tap a tube to select its top bolt.',
        boltsChooseDestination: 'Choose an empty or matching tube.',
        boltsEmpty: 'This tube is empty. Select a bolt first.',
        boltsInvalid: 'Match the top type and leave room in the tube.',
        boltsHintShown: 'Move the top bolt: tube {from} to tube {to}.',
        boltsNoHint: 'No route found. Undo a move or restart.',
        boltsWinTitle: 'Bolts sorted',
        boltsWinBody: 'Every type has its own full tube. {moves} moves.',
        filterInstruction: 'Tap square chip packets.\nLet triangle decoys pass.',
        filterProgress: 'Chips {hits}/{target} · Errors {errors}/2',
        filterReady: 'One wrong packet is protected. Missed chips can be replaced.',
        filterHit: 'Chip accepted. Keep watching the stream.',
        filterDecoy: 'Decoy hit. The next wrong packet ends this run.',
        filterHint: 'The next decoy is outlined. Let it pass.',
        filterNoHint: 'No decoy remains to mark.',
        filterWinTitle: 'Signal secured',
        filterWinBody: '{hits} chip packets accepted.',
        filterLoseTitle: 'Signal lost',
        filterLoseBody: 'Retry this stream, or try a new board.',
        actionPaused: 'Paused · Tap Resume to continue.',
        actionHintUsed: 'Hint already used for this board.',
        droneInstruction: 'Tap left or right to steer.\nCross the openings in each laser gate.',
        droneProgress: 'Gates {passed}/{total} · Shield {shield}',
        droneReady: 'Watch for the next gate. One collision is protected.',
        droneCollision: 'Shield used. Avoid the remaining laser gates.',
        droneHint: 'The next safe opening is outlined for one second.',
        droneNoHint: 'The next gate is not visible yet.',
        droneLeft: '← Left',
        droneRight: 'Right →',
        droneWinTitle: 'Route cleared',
        droneWinBody: 'All {total} laser gates crossed.',
        droneLoseTitle: 'Drone disabled',
        droneLoseBody: 'Two collisions. Retry the route or try a new board.',
        echoInstruction: 'Watch the four terminal keys. Repeat their pulse order.',
        archiveInstruction: 'Memorize the cabinet. Then tap every replaced component.',
        echoRound: 'Round {current}/{total}',
        echoWatch: 'Watch · {count} pulses',
        echoInput: 'Repeat · {current}/{total}',
        echoRetry: 'Order lost. Replaying this round.',
        echoPhaseHelp: 'Wait for the pulses, then tap the keys in order.',
        echoComplete: 'Terminal unlocked. All rounds restored.',
        echoKey: 'Key {key}',
        echoFirstHint: 'First pulse shown once.',
        echoWinTitle: 'Pulse restored',
        archiveWatch: 'Scan · {seconds}s',
        archiveFind: 'Changes {current}/{total}',
        archiveMisses: 'Errors {current}/2',
        archiveOriginal: 'Memorize the cabinet',
        archiveChanged: 'Find replaced components',
        archiveSlot: 'Bay {slot}',
        archiveFound: 'Found',
        archiveStable: 'Stable',
        archiveHint: 'A stable bay is marked.',
        archiveComplete: 'All replaced components identified.',
        archiveFailed: 'Two incorrect bays selected. Retry this cabinet.',
        archiveWinTitle: 'Archive verified',
        archiveLoseTitle: 'Scan lost',
        memoryHintUsed: 'Hint used',
        memoryPaused: 'Training paused',
        memoryPauseBody: 'Continue from the same phase.'
      };
      var messages = exports('messages', {
        en: en,
        'zh-CN': {
          appTitle: '赛博大盗 · 黑客训练场',
          canvasLabel: '赛博大盗小游戏训练场',
          loadingTitle: '正在连接训练网络',
          loadingHint: '正在加载训练模块…',
          loadFailed: '连接失败',
          reloadHint: '请刷新页面后重试。',
          lobbyTitle: '黑客训练场',
          lobbyTagline: '十项任务，磨炼你的黑客技巧。',
          readyTasks: '● 节点就绪 / 10 任务',
          soundOn: '声音开启',
          soundOff: '声音关闭',
          motionOn: '动效开启',
          motionOff: '动效关闭',
          offlineBadge: '离线试玩',
          footer: '选择一项任务，开始训练。',
          back: '← 返回',
          sound: '声音',
          mute: '静音',
          languageTitle: '语言',
          languageHint: '选择界面使用的语言。',
          languageClose: '完成',
          sokobanTitle: '机房推箱子',
          onetTitle: '信号连连看',
          memoryTitle: '芯片记忆',
          stackTitle: '中继叠塔',
          sokobanCategory: '逻辑 / 能量搬运',
          onetCategory: '专注 / 信号连线',
          memoryCategory: '记忆 / 芯片配对',
          stackCategory: '时机 / 中继搭建',
          sokobanInstruction: '把能量箱推到发光底座。\n箱子只能推，不能拉。',
          levelLabel: '{current}/{total} · {name}',
          movesLabel: '步数 {moves}',
          undo: '撤销',
          restart: '重试',
          controlHint: '滑动、点击方向键，或使用 WASD。',
          sokobanWinTitle: '机房供能就绪',
          sokobanWinBody: '用了 {moves} 步，点亮全部底座。',
          nextLevel: '下一关',
          onetInstruction: '连接相同信号，连线最多拐两次。\n路径上不能有其他信号。',
          remainingPairs: '剩余 {count} 对',
          matrixLabel: '6 × 6 矩阵',
          onetInitial: '寻找相同信号，\n也可以从棋盘外侧连线。',
          onetHint: '已标出一对可以连接的信号。',
          onetShuffled: '信号已重排，寻找新的路线。',
          hintPair: '提示',
          shuffle: '重排',
          newBoard: '新棋盘',
          onetWinTitle: '信号清除完成',
          onetWinBody: '已连接全部 18 对信号。',
          playAgain: '再来一次',
          onetBlocked: '连线路径被挡住了，换一对试试。',
          onetConnected: '连线成功。',
          onetAutoShuffle: '没有可连信号，已自动重排。',
          memoryInstruction: '先记住芯片的位置，再翻开卡牌。\n找齐六对相同芯片。',
          memoryProgress: '配对 {found}/{total}',
          attempts: '尝试 {count}',
          memorize: '记忆时间 · {seconds}秒',
          rememberMismatch: '记住这两张，再试一次。',
          yourTurn: '轮到你了 · 寻找相同芯片',
          matched: '已解密',
          memoryHint: '配错的卡牌会翻回背面，\n记住它们的位置。',
          restartMemory: '重新开始',
          newCards: '换一组',
          memoryWinTitle: '芯片解密完成',
          memoryWinBody: '用了 {count} 次尝试，\n解密全部六对芯片。',
          newSet: '新一组',
          stackInstruction: '点击落下移动中的中继模块。\n对齐 {target} 层，接入网络。',
          floorsLabel: '层数 {floors}/{target}',
          perfectCount: '完美 {count}',
          stackReady: '等模块对齐，再点击落下。',
          continueStack: '继续搭建',
          drop: '落下',
          stackHint: '点击按钮，或按空格键落下。',
          pause: '暂停',
          resume: '继续',
          stackWinTitle: '中继接入成功',
          stackWinBody: '已接入网络。\n完美落点 {count} 次。',
          stackLoseTitle: '中继连接中断',
          stackLoseBody: '搭建了 {floors} 层。\n换个节奏再试试。',
          stackAgain: '再搭一次',
          tryAgain: '再试一次',
          pausedTitle: '已暂停',
          pausedHint: '准备好后，点击继续。',
          perfectDrop: '完美对齐！',
          nearMiss: '好险，稳住节奏。',
          goodDrop: '中继搭建成功。',
          backToLobby: '返回训练场',
          prop0: '能量电池',
          prop1: '安全密钥',
          prop2: '微型芯片',
          prop3: '信号天线',
          prop4: '加密磁带',
          prop5: '光学扫描',
          prop6: '晶体核心',
          prop7: '数据软盘',
          prop8: '中继卫星',
          prop9: '网络终端',
          prop10: '访问令牌',
          prop11: '便携终端',
          prop12: '监听耳机',
          prop13: '雷达核心',
          level0: '初次搬运',
          level1: '双芯入库',
          level2: '分岔仓库',
          level3: '绕过隔墙',
          level4: '中央通道',
          level5: '三芯调度',
          circuitTitle: '电路连通',
          boltsTitle: '螺栓分类',
          echoTitle: '脉冲回声',
          archiveTitle: '档案扫描',
          filterTitle: '信号筛选',
          droneTitle: '无人机穿梭',
          circuitCategory: '思考',
          boltsCategory: '思考',
          echoCategory: '记忆',
          archiveCategory: '记忆',
          filterCategory: '反应',
          droneCategory: '反应',
          hint: '提示',
          missionWon: '任务完成',
          missionComplete: '已达成全部目标。',
          missionNext: '下一关',
          missionDifficulty: '难度 {level}',
          missionAgain: '再来一次',
          missionRetry: '重试',
          missionNewBoard: '新棋盘',
          missionProgress: '进度',
          missionsPage: '{current}/{total}',
          circuitInstruction: '点击旋转电路。\n接通全部支路和出口。',
          circuitPowered: '供电 {powered}/{total} · 旋转 {moves}',
          circuitLegend: '连接电池与出口，不留断开的接口。',
          circuitHintShown: '橙色标出一格的正确接口。',
          circuitWinTitle: '电路接通',
          circuitWinBody: '全部支路已供电，旋转 {moves} 次。',
          boltsInstruction: '只移顶部螺栓。先选来源，\n再选空管或顶部同类的管。',
          boltsProgress: '步数 {moves} · 容量 {depth}',
          boltsTube: '管 {tube}',
          boltsChooseSource: '点击管子，选择顶部螺栓。',
          boltsChooseDestination: '选择空管或顶部同类的管。',
          boltsEmpty: '这是空管，请先选择螺栓。',
          boltsInvalid: '顶部类型须相同，管内也要有空位。',
          boltsHintShown: '移动顶部螺栓：管 {from} → 管 {to}。',
          boltsNoHint: '未找到解法。撤销一步或重试。',
          boltsWinTitle: '螺栓分类完成',
          boltsWinBody: '每类螺栓各占满一管。用了 {moves} 步。',
          filterInstruction: '点击方形芯片包。\n放过三角形诱饵。',
          filterProgress: '芯片 {hits}/{target} · 失误 {errors}/2',
          filterReady: '可误点一次诱饵。漏掉芯片还有补充。',
          filterHit: '芯片已接收，继续观察数据流。',
          filterDecoy: '误点诱饵，再点错就会失败。',
          filterHint: '下个诱饵已描边，放过它。',
          filterNoHint: '已没有可标记的诱饵。',
          filterWinTitle: '信号已保护',
          filterWinBody: '已接收 {hits} 个芯片包。',
          filterLoseTitle: '信号丢失',
          filterLoseBody: '重试本轮数据流，或换个棋盘。',
          actionPaused: '已暂停 · 点击继续。',
          actionHintUsed: '本局提示已用过。',
          droneInstruction: '点击左右键转向。\n穿过每道激光门的缺口。',
          droneProgress: '门 {passed}/{total} · 护盾 {shield}',
          droneReady: '留意下一道门。护盾可抵挡一次碰撞。',
          droneCollision: '护盾已用掉，请避开后续激光。',
          droneHint: '下个安全缺口描边一秒。',
          droneNoHint: '下一道门还未出现。',
          droneLeft: '← 左',
          droneRight: '右 →',
          droneWinTitle: '路线畅通',
          droneWinBody: '已穿过全部 {total} 道激光门。',
          droneLoseTitle: '无人机停机',
          droneLoseBody: '已碰撞两次。重试路线，或换个棋盘。',
          echoInstruction: '观察四个终端键。\n按脉冲顺序依次点击。',
          archiveInstruction: '记住机柜布局。\n再点击所有被替换的部件。',
          echoRound: '轮次 {current}/{total}',
          echoWatch: '观察 · {count} 次脉冲',
          echoInput: '复现 · {current}/{total}',
          echoRetry: '顺序有误，重新播放本轮。',
          echoPhaseHelp: '等待脉冲结束，再按顺序点击。',
          echoComplete: '终端已解锁，全部轮次完成。',
          echoKey: '键 {key}',
          echoFirstHint: '已显示一次首个脉冲。',
          echoWinTitle: '脉冲已复原',
          archiveWatch: '扫描 · {seconds}秒',
          archiveFind: '变动 {current}/{total}',
          archiveMisses: '失误 {current}/2',
          archiveOriginal: '记住机柜布局',
          archiveChanged: '找出替换的部件',
          archiveSlot: '格 {slot}',
          archiveFound: '已找到',
          archiveStable: '未变',
          archiveHint: '已标出一个未变的格子。',
          archiveComplete: '已找齐所有被替换的部件。',
          archiveFailed: '已选错两格，请重试本机柜。',
          archiveWinTitle: '档案已核验',
          archiveLoseTitle: '扫描失败',
          memoryHintUsed: '提示已用',
          memoryPaused: '训练已暂停',
          memoryPauseBody: '从当前阶段继续。'
        },
        ja: {
          appTitle: 'Cyber Heist · ハッカー訓練',
          canvasLabel: 'Cyber Heist ミニゲーム訓練',
          loadingTitle: 'ネットワークに接続中',
          loadingHint: '訓練モジュールを読み込み中…',
          loadFailed: '接続できません',
          reloadHint: 'ページを再読み込みしてください。',
          lobbyTitle: 'ハッカー訓練',
          lobbyTagline: '10の任務で腕を磨こう。',
          readyTasks: '● 接続完了 / 10 任務',
          soundOn: '音声オン',
          soundOff: '音声オフ',
          motionOn: '演出オン',
          motionOff: '演出オフ',
          offlineBadge: 'オフライン体験',
          footer: '任務を選んで訓練開始。',
          back: '← 戻る',
          sound: '音声',
          mute: '消音',
          languageTitle: '言語',
          languageHint: '表示する言語を選んでください。',
          languageClose: '完了',
          sokobanTitle: '電源ボックス',
          onetTitle: '信号リンク',
          memoryTitle: 'チップ記憶',
          stackTitle: '中継タワー',
          sokobanCategory: '論理 / 経路',
          onetCategory: '集中 / 接続',
          memoryCategory: '記憶 / チップ',
          stackCategory: 'タイミング / 建設',
          sokobanInstruction: 'すべての箱を光る台まで押そう。\n箱は押せるが、引けない。',
          levelLabel: '{current}/{total} · {name}',
          movesLabel: '手数 {moves}',
          undo: '戻す',
          restart: '再挑戦',
          controlHint: 'スワイプ、矢印、WASDで移動。',
          sokobanWinTitle: '電力復旧',
          sokobanWinBody: '{moves}手ですべての台に通電。',
          nextLevel: '次へ',
          onetInstruction: '同じ信号を2回以内の曲がりで接続。\nほかの信号は通過できない。',
          remainingPairs: '残り {count}組',
          matrixLabel: '6 × 6 マス',
          onetInitial: '同じ信号を探そう。\n盤面の外側も通れる。',
          onetHint: '接続できるペアを表示中。',
          onetShuffled: '信号を再配置。新しい経路を探そう。',
          hintPair: 'ヒント',
          shuffle: '再配置',
          newBoard: '新しい盤面',
          onetWinTitle: '信号クリア',
          onetWinBody: '18組すべての信号を接続。',
          playAgain: 'もう一度',
          onetBlocked: '経路がふさがっている。別のペアを探そう。',
          onetConnected: '接続成功。',
          onetAutoShuffle: '接続できるペアがないため再配置。',
          memoryInstruction: 'チップの位置を覚えてから裏返そう。\n同じチップを6組見つけよう。',
          memoryProgress: 'ペア {found}/{total}',
          attempts: '挑戦 {count}',
          memorize: '記憶タイム · {seconds}秒',
          rememberMismatch: 'この2枚を覚えて、もう一度。',
          yourTurn: '同じチップを探そう',
          matched: '解読済み',
          memoryHint: '違うチップは裏に戻る。\n位置を覚えよう。',
          restartMemory: '最初から',
          newCards: '入れ替え',
          memoryWinTitle: 'チップ解読完了',
          memoryWinBody: '{count}回の挑戦で6組を解読。',
          newSet: '新しいセット',
          stackInstruction: 'タップで動く中継機を落とそう。\n{target}段を重ねてネットに接続。',
          floorsLabel: '段数 {floors}/{target}',
          perfectCount: '完璧 {count}',
          stackReady: '中継機が重なる瞬間を狙おう。',
          continueStack: '再開',
          drop: '落とす',
          stackHint: 'ボタンかスペースキーで落とす。',
          pause: '一時停止',
          resume: '再開',
          stackWinTitle: '中継接続完了',
          stackWinBody: 'ネットに接続。\n完璧な着地は{count}回。',
          stackLoseTitle: '中継接続失敗',
          stackLoseBody: '{floors}段まで到達。\nリズムを変えて再挑戦。',
          stackAgain: 'もう一度建設',
          tryAgain: '再挑戦',
          pausedTitle: '一時停止中',
          pausedHint: '再開をタップ。',
          perfectDrop: '完璧な位置！',
          nearMiss: 'ぎりぎり！集中しよう。',
          goodDrop: '中継機を設置。',
          backToLobby: '訓練に戻る',
          prop0: '電池',
          prop1: '鍵',
          prop2: 'チップ',
          prop3: 'アンテナ',
          prop4: 'テープ',
          prop5: 'スキャナ',
          prop6: '水晶',
          prop7: 'ディスク',
          prop8: '衛星',
          prop9: '端末',
          prop10: 'トークン',
          prop11: '携帯端末',
          prop12: 'イヤホン',
          prop13: 'レーダー',
          level0: '初任務',
          level1: 'ツインコア',
          level2: '分岐倉庫',
          level3: '回り道',
          level4: '中央通路',
          level5: '3つの中継',
          circuitTitle: '回路接続',
          boltsTitle: 'ボルト仕分け',
          echoTitle: 'パルス記憶',
          archiveTitle: '記録スキャン',
          filterTitle: '信号フィルター',
          droneTitle: 'ドローン突破',
          circuitCategory: '思考',
          boltsCategory: '思考',
          echoCategory: '記憶',
          archiveCategory: '記憶',
          filterCategory: '反応',
          droneCategory: '反応',
          hint: 'ヒント',
          missionWon: '任務クリア',
          missionComplete: 'すべての目標を達成。',
          missionNext: '次へ',
          missionDifficulty: '難度 {level}',
          missionAgain: 'もう一度',
          missionRetry: '再挑戦',
          missionNewBoard: '新しい盤面',
          missionProgress: '進行',
          missionsPage: '{current}/{total}',
          circuitInstruction: 'タップで回転。\nすべての枝と出口に通電。',
          circuitPowered: '通電 {powered}/{total} · 回転 {moves}',
          circuitLegend: '電池と出口をつなぎ、端子をすべて接続。',
          circuitHintShown: 'オレンジ色が正しい端子を示す。',
          circuitWinTitle: '回路復旧',
          circuitWinBody: '全枝に通電。回転 {moves}回。',
          boltsInstruction: '上のボルトを選び、空の管か\n同じボルトの管に移そう。',
          boltsProgress: '手数 {moves} · 容量 {depth}',
          boltsTube: '管 {tube}',
          boltsChooseSource: '管をタップして上のボルトを選択。',
          boltsChooseDestination: '空の管か同じボルトの管を選択。',
          boltsEmpty: '空の管です。先にボルトを選択。',
          boltsInvalid: '上の種類が同じで、空きのある管へ。',
          boltsHintShown: '上のボルトを管 {from} から {to} へ。',
          boltsNoHint: '経路なし。戻すか最初から。',
          boltsWinTitle: '仕分け完了',
          boltsWinBody: '種類ごとに管を満杯に。{moves}手。',
          filterInstruction: '四角いチップをタップ。\n三角のおとりは見逃そう。',
          filterProgress: 'チップ {hits}/{target} · ミス {errors}/2',
          filterReady: 'おとりは1回まで。\n逃したチップは補充される。',
          filterHit: 'チップ受信。流れを見続けよう。',
          filterDecoy: 'おとりに命中。次のミスで終了。',
          filterHint: '次のおとりを表示中。見逃そう。',
          filterNoHint: '表示できるおとりは残っていない。',
          filterWinTitle: '信号確保',
          filterWinBody: 'チップを{hits}個受信。',
          filterLoseTitle: '信号喪失',
          filterLoseBody: '同じ流れか、新しい盤面で再挑戦。',
          actionPaused: '一時停止中 · 再開をタップ。',
          actionHintUsed: 'この盤面のヒントは使用済み。',
          droneInstruction: '左右で操作。\nレーザーゲートの隙間を抜けよう。',
          droneProgress: 'ゲート {passed}/{total} · 盾 {shield}',
          droneReady: '次のゲートを見よう。\n衝突は1回まで。',
          droneCollision: '盾を使用。残りのレーザーを避けよう。',
          droneHint: '次の安全な隙間を1秒間表示。',
          droneNoHint: '次のゲートはまだ見えていない。',
          droneLeft: '← 左',
          droneRight: '右 →',
          droneWinTitle: '経路クリア',
          droneWinBody: '全{total}ゲートを通過。',
          droneLoseTitle: 'ドローン停止',
          droneLoseBody: '2回衝突。同じ経路か\n新しい盤面で再挑戦。',
          echoInstruction: '4つのキーを見て、\n光った順番を繰り返そう。',
          archiveInstruction: '棚を覚えてから、\n交換された部品をすべて選ぼう。',
          echoRound: 'ラウンド {current}/{total}',
          echoWatch: '見る · パルス{count}回',
          echoInput: '再現 · {current}/{total}',
          echoRetry: '順番が違うため、もう一度再生。',
          echoPhaseHelp: '光り終わったら、順番にタップ。',
          echoComplete: '端末解除。全ラウンド復元。',
          echoKey: 'キー {key}',
          echoFirstHint: '最初のパルスを1回表示。',
          echoWinTitle: 'パルス復元',
          archiveWatch: 'スキャン · {seconds}秒',
          archiveFind: '変更 {current}/{total}',
          archiveMisses: 'ミス {current}/2',
          archiveOriginal: '棚を覚えよう',
          archiveChanged: '交換された部品を探そう',
          archiveSlot: '区画 {slot}',
          archiveFound: '発見',
          archiveStable: '変更なし',
          archiveHint: '変わっていない区画を表示。',
          archiveComplete: '交換された部品をすべて発見。',
          archiveFailed: '2か所間違えた。この棚で再挑戦。',
          archiveWinTitle: '記録確認完了',
          archiveLoseTitle: 'スキャン失敗',
          memoryHintUsed: '使用済み',
          memoryPaused: '訓練一時停止中',
          memoryPauseBody: '同じ段階から続行。'
        },
        ko: {
          appTitle: 'Cyber Heist · 해커 훈련',
          canvasLabel: 'Cyber Heist 미니게임 훈련',
          loadingTitle: '네트워크에 연결 중',
          loadingHint: '훈련 모듈을 불러오는 중…',
          loadFailed: '연결 실패',
          reloadHint: '페이지를 새로고침해 주세요.',
          lobbyTitle: '해커 훈련장',
          lobbyTagline: '열 가지 임무로 실력을 키우세요.',
          readyTasks: '● 접속 완료 / 임무 10',
          soundOn: '소리 켜짐',
          soundOff: '소리 꺼짐',
          motionOn: '효과 켜짐',
          motionOff: '효과 꺼짐',
          offlineBadge: '오프라인 체험',
          footer: '임무를 골라 훈련을 시작하세요.',
          back: '← 뒤로',
          sound: '소리',
          mute: '음소거',
          languageTitle: '언어',
          languageHint: '화면에 표시할 언어를 선택하세요.',
          languageClose: '완료',
          sokobanTitle: '전력 상자',
          onetTitle: '신호 연결',
          memoryTitle: '칩 기억하기',
          stackTitle: '중계탑 쌓기',
          sokobanCategory: '논리 / 경로',
          onetCategory: '집중 / 연결',
          memoryCategory: '기억 / 칩',
          stackCategory: '타이밍 / 쌓기',
          sokobanInstruction: '모든 상자를 빛나는 받침으로 미세요.\n상자는 밀 수만 있고 당길 수 없어요.',
          levelLabel: '{current}/{total} · {name}',
          movesLabel: '이동 {moves}',
          undo: '되돌리기',
          restart: '재도전',
          controlHint: '스와이프, 방향 버튼, WASD.',
          sokobanWinTitle: '전력 복구 완료',
          sokobanWinBody: '{moves}번 이동해 모든 받침에\n전력을 공급했어요.',
          nextLevel: '다음',
          onetInstruction: '같은 신호를 두 번 이하로 꺾어 이으세요.\n연결 경로에는 다른 신호가 없어야 해요.',
          remainingPairs: '남은 쌍 {count}',
          matrixLabel: '6 × 6 격자',
          onetInitial: '같은 신호를 찾으세요.\n바깥쪽으로도 연결돼요.',
          onetHint: '연결할 수 있는 한 쌍을 표시했어요.',
          onetShuffled: '신호를 섞었어요. 새 경로를 찾으세요.',
          hintPair: '힌트',
          shuffle: '섞기',
          newBoard: '새 격자',
          onetWinTitle: '신호 정리 완료',
          onetWinBody: '신호 18쌍을 모두 연결했어요.',
          playAgain: '다시 하기',
          onetBlocked: '경로가 막혔어요. 다른 쌍을 찾으세요.',
          onetConnected: '연결 성공.',
          onetAutoShuffle: '연결할 쌍이 없어 신호를 다시 섞었어요.',
          memoryInstruction: '칩 위치를 기억한 뒤 카드를 뒤집으세요.\n같은 칩 여섯 쌍을 찾으세요.',
          memoryProgress: '짝 {found}/{total}',
          attempts: '시도 {count}',
          memorize: '기억 시간 · {seconds}초',
          rememberMismatch: '이 두 장을 기억하고 다시 도전하세요.',
          yourTurn: '같은 칩을 찾을 차례예요',
          matched: '해독 완료',
          memoryHint: '짝이 아니면 다시 뒤집혀요.\n위치를 기억하세요.',
          restartMemory: '처음부터',
          newCards: '새 카드',
          memoryWinTitle: '칩 해독 완료',
          memoryWinBody: '{count}번 시도해 여섯 쌍을 해독했어요.',
          newSet: '새 묶음',
          stackInstruction: '눌러서 움직이는 중계기를 떨어뜨리세요.\n{target}층을 쌓아 네트워크에 연결하세요.',
          floorsLabel: '층수 {floors}/{target}',
          perfectCount: '완벽 {count}',
          stackReady: '중계기 위치가 맞을 때를 기다리세요.',
          continueStack: '계속하기',
          drop: '놓기',
          stackHint: '버튼이나 스페이스 키로 놓으세요.',
          pause: '일시정지',
          resume: '계속',
          stackWinTitle: '중계 연결 완료',
          stackWinBody: '네트워크에 연결했어요.\n완벽한 착지 {count}회.',
          stackLoseTitle: '중계 연결 끊김',
          stackLoseBody: '{floors}층을 쌓았어요.\n새 리듬으로 도전하세요.',
          stackAgain: '다시 쌓기',
          tryAgain: '재도전',
          pausedTitle: '일시정지',
          pausedHint: '준비되면 계속을 누르세요.',
          perfectDrop: '완벽하게 맞았어요!',
          nearMiss: '아슬아슬해요. 집중하세요.',
          goodDrop: '중계기 설치 완료.',
          backToLobby: '훈련장으로',
          prop0: '배터리',
          prop1: '열쇠',
          prop2: '칩',
          prop3: '안테나',
          prop4: '테이프',
          prop5: '스캐너',
          prop6: '크리스털',
          prop7: '디스크',
          prop8: '위성',
          prop9: '단말기',
          prop10: '토큰',
          prop11: '휴대 단말',
          prop12: '헤드셋',
          prop13: '레이더',
          level0: '첫 임무',
          level1: '쌍둥이 코어',
          level2: '갈림길 창고',
          level3: '우회로',
          level4: '중앙 통로',
          level5: '세 코어 배치',
          circuitTitle: '회로 연결',
          boltsTitle: '볼트 분류',
          echoTitle: '펄스 기억',
          archiveTitle: '기록 스캔',
          filterTitle: '신호 선별',
          droneTitle: '드론 돌파',
          circuitCategory: '사고',
          boltsCategory: '사고',
          echoCategory: '기억',
          archiveCategory: '기억',
          filterCategory: '반응',
          droneCategory: '반응',
          hint: '힌트',
          missionWon: '임무 성공',
          missionComplete: '모든 목표를 달성했어요.',
          missionNext: '다음',
          missionDifficulty: '난이도 {level}',
          missionAgain: '다시',
          missionRetry: '재도전',
          missionNewBoard: '새 보드',
          missionProgress: '진행',
          missionsPage: '{current}/{total}',
          circuitInstruction: '탭해서 회전하세요.\n모든 갈래와 출구를 연결하세요.',
          circuitPowered: '연결 {powered}/{total} · 회전 {moves}',
          circuitLegend: '전지와 출구를 잇고\n빈 연결부를 남기지 마세요.',
          circuitHintShown: '주황색은 올바른 연결부예요.',
          circuitWinTitle: '회로 복구',
          circuitWinBody: '모든 갈래 연결 완료. 회전 {moves}회.',
          boltsInstruction: '맨 위 볼트를 골라 빈 관이나\n같은 볼트가 있는 관으로 옮겨요.',
          boltsProgress: '이동 {moves} · 용량 {depth}',
          boltsTube: '관 {tube}',
          boltsChooseSource: '관을 탭해 맨 위 볼트를 고르세요.',
          boltsChooseDestination: '빈 관이나 같은 볼트의 관을 골라요.',
          boltsEmpty: '빈 관이에요. 먼저 볼트를 골라요.',
          boltsInvalid: '위쪽 종류가 같고 빈자리가 있어야 해요.',
          boltsHintShown: '맨 위 볼트: 관 {from} → {to}.',
          boltsNoHint: '경로를 못 찾았어요. 되돌리거나 재도전.',
          boltsWinTitle: '볼트 분류 완료',
          boltsWinBody: '종류별로 관을 채웠어요. 이동 {moves}회.',
          filterInstruction: '네모 칩 패킷을 탭하세요.\n세모 미끼는 보내 주세요.',
          filterProgress: '칩 {hits}/{target} · 실수 {errors}/2',
          filterReady: '오탭 1회는 보호돼요.\n놓친 칩은 다시 나와요.',
          filterHit: '칩 수신 완료. 계속 지켜보세요.',
          filterDecoy: '미끼를 눌렀어요. 다음 실수는 실패예요.',
          filterHint: '다음 미끼에 테두리 표시. 보내 주세요.',
          filterNoHint: '표시할 미끼가 남아 있지 않아요.',
          filterWinTitle: '신호 확보',
          filterWinBody: '칩 패킷 {hits}개 수신.',
          filterLoseTitle: '신호 손실',
          filterLoseBody: '같은 흐름에 재도전하거나 새 보드로.',
          actionPaused: '일시 정지 · 계속을 탭하세요.',
          actionHintUsed: '이 보드의 힌트는 이미 썼어요.',
          droneInstruction: '좌우를 탭해 조종하세요.\n레이저 문 틈으로 통과하세요.',
          droneProgress: '문 {passed}/{total} · 보호막 {shield}',
          droneReady: '다음 문을 보세요. 충돌 1회는 보호돼요.',
          droneCollision: '보호막 사용. 남은 레이저를 피하세요.',
          droneHint: '다음 안전한 틈을 1초 동안 표시해요.',
          droneNoHint: '다음 문이 아직 보이지 않아요.',
          droneLeft: '← 왼쪽',
          droneRight: '오른쪽 →',
          droneWinTitle: '경로 통과',
          droneWinBody: '레이저 문 {total}개 모두 통과.',
          droneLoseTitle: '드론 정지',
          droneLoseBody: '충돌 2회. 같은 경로에\n재도전하거나 새 보드로.',
          echoInstruction: '단말기 키 네 개를 보고\n빛난 순서대로 누르세요.',
          archiveInstruction: '보관함을 기억한 뒤\n바뀐 부품을 모두 탭하세요.',
          echoRound: '라운드 {current}/{total}',
          echoWatch: '관찰 · 펄스 {count}회',
          echoInput: '반복 · {current}/{total}',
          echoRetry: '순서가 달라요. 이번 라운드를 다시 봐요.',
          echoPhaseHelp: '펄스가 끝나면 순서대로 누르세요.',
          echoComplete: '단말기 해제. 모든 라운드 복구.',
          echoKey: '키 {key}',
          echoFirstHint: '첫 펄스를 한 번 표시했어요.',
          echoWinTitle: '펄스 복구',
          archiveWatch: '스캔 · {seconds}초',
          archiveFind: '변경 {current}/{total}',
          archiveMisses: '실수 {current}/2',
          archiveOriginal: '보관함을 기억하세요',
          archiveChanged: '바뀐 부품을 찾으세요',
          archiveSlot: '칸 {slot}',
          archiveFound: '찾음',
          archiveStable: '그대로',
          archiveHint: '바뀌지 않은 칸을 표시했어요.',
          archiveComplete: '바뀐 부품을 모두 찾았어요.',
          archiveFailed: '두 칸을 틀렸어요. 다시 도전하세요.',
          archiveWinTitle: '기록 확인 완료',
          archiveLoseTitle: '스캔 실패',
          memoryHintUsed: '힌트 사용',
          memoryPaused: '훈련 일시 정지',
          memoryPauseBody: '현재 단계에서 계속해요.'
        },
        fr: {
          appTitle: 'Cyber Heist · Entraînement',
          canvasLabel: 'Mini-jeux de Cyber Heist',
          loadingTitle: 'Connexion au réseau',
          loadingHint: 'Chargement des modules…',
          loadFailed: 'Échec de connexion',
          reloadHint: 'Rechargez la page pour réessayer.',
          lobbyTitle: 'Zone de test',
          lobbyTagline: 'Dix missions pour vous affûter.',
          readyTasks: '● 10 missions',
          soundOn: 'Son activé',
          soundOff: 'Son coupé',
          motionOn: 'Effets activés',
          motionOff: 'Effets coupés',
          offlineBadge: 'Démo hors ligne',
          footer: 'Choisissez une mission.',
          back: '← Retour',
          sound: 'Son',
          mute: 'Muet',
          languageTitle: 'Langue',
          languageHint: 'Choisissez la langue de l’interface.',
          languageClose: 'OK',
          sokobanTitle: 'Caisses néon',
          onetTitle: 'Lien signal',
          memoryTitle: 'Mémo puces',
          stackTitle: 'Tour relais',
          sokobanCategory: 'Logique / Trajets',
          onetCategory: 'Attention / Liens',
          memoryCategory: 'Mémoire / Puces',
          stackCategory: 'Timing / Tours',
          sokobanInstruction: 'Poussez les caisses sur les socles.\nVous ne pouvez pas les tirer.',
          levelLabel: '{current}/{total} · {name}',
          movesLabel: 'Coups {moves}',
          undo: 'Annuler',
          restart: 'Retenter',
          controlHint: 'Glissez, flèches ou WASD.',
          sokobanWinTitle: 'Courant rétabli',
          sokobanWinBody: 'Socles alimentés en {moves} coups.',
          nextLevel: 'Suite',
          onetInstruction: 'Reliez les mêmes signaux en deux\nvirages maximum, sans obstacle.',
          remainingPairs: 'Paires {count}',
          matrixLabel: 'Grille 6 × 6',
          onetInitial: 'Trouvez une paire. Le bord est libre.',
          onetHint: 'Une paire possible est surlignée.',
          onetShuffled: 'Signaux mélangés. Trouvez une paire.',
          hintPair: 'Indice',
          shuffle: 'Mélanger',
          newBoard: 'Nouveau',
          onetWinTitle: 'Signal dégagé',
          onetWinBody: 'Les 18 paires de signaux sont reliées.',
          playAgain: 'Rejouer',
          onetBlocked: 'Chemin bloqué. Essayez une autre paire.',
          onetConnected: 'Liaison établie.',
          onetAutoShuffle: 'Aucun lien possible. Signaux remélangés.',
          memoryInstruction: 'Retenez les puces, puis retournez\nles cartes pour trouver les six paires.',
          memoryProgress: 'Paires {found}/{total}',
          attempts: 'Essais {count}',
          memorize: 'Mémorisez · {seconds}s',
          rememberMismatch: 'Retenez ces puces, puis réessayez.',
          yourTurn: 'À vous · Trouvez une paire',
          matched: 'Décodée',
          memoryHint: 'Les cartes différentes se retournent.',
          restartMemory: 'Repartir',
          newCards: 'Autres cartes',
          memoryWinTitle: 'Puces décodées',
          memoryWinBody: 'Six paires décodées en {count} essais.',
          newSet: 'Autre série',
          stackInstruction: 'Touchez pour lâcher chaque relais.\nAlignez {target} étages pour vous connecter.',
          floorsLabel: 'Étages {floors}/{target}',
          perfectCount: 'Parfaits {count}',
          stackReady: 'Attendez le bon alignement.',
          continueStack: 'Reprendre',
          drop: 'Lâcher',
          stackHint: 'Touchez le bouton ou appuyez sur Espace.',
          pause: 'Pause',
          resume: 'Reprendre',
          stackWinTitle: 'Relais connecté',
          stackWinBody: 'Réseau atteint.\nLâchers parfaits : {count}.',
          stackLoseTitle: 'Relais perdu',
          stackLoseBody: 'Étages : {floors}.\nEssayez un autre rythme.',
          stackAgain: 'Reconstruire',
          tryAgain: 'Réessayer',
          pausedTitle: 'En pause',
          pausedHint: 'Touchez Reprendre.',
          perfectDrop: 'Alignement parfait !',
          nearMiss: 'De justesse. Restez concentré.',
          goodDrop: 'Relais posé.',
          backToLobby: 'Retour au réseau',
          prop0: 'Batterie',
          prop1: 'Clé',
          prop2: 'Puce',
          prop3: 'Antenne',
          prop4: 'Cassette',
          prop5: 'Scanner',
          prop6: 'Cristal',
          prop7: 'Disque',
          prop8: 'Satellite',
          prop9: 'Terminal',
          prop10: 'Jeton',
          prop11: 'Portable',
          prop12: 'Casque',
          prop13: 'Radar',
          level0: 'Premier pas',
          level1: 'Deux cœurs',
          level2: 'Dépôt séparé',
          level3: 'Détour',
          level4: 'Voie centrale',
          level5: 'Trois relais',
          circuitTitle: 'Circuit fluide',
          boltsTitle: 'Tri de boulons',
          echoTitle: 'Écho pulsé',
          archiveTitle: 'Scan d’archives',
          filterTitle: 'Filtre de signal',
          droneTitle: 'Drone express',
          circuitCategory: 'Logique',
          boltsCategory: 'Logique',
          echoCategory: 'Mémoire',
          archiveCategory: 'Mémoire',
          filterCategory: 'Réflexes',
          droneCategory: 'Réflexes',
          hint: 'Indice',
          missionWon: 'Mission réussie',
          missionComplete: 'Tous les objectifs sont atteints.',
          missionNext: 'Suite',
          missionDifficulty: 'Niveau {level}',
          missionAgain: 'Encore',
          missionRetry: 'Réessayer',
          missionNewBoard: 'Nouveau jeu',
          missionProgress: 'Progrès',
          missionsPage: '{current}/{total}',
          circuitInstruction: 'Touchez pour tourner.\nAlimentez les branches et la sortie.',
          circuitPowered: 'Actifs {powered}/{total} · Tours {moves}',
          circuitLegend: 'Reliez la pile à la sortie.\nAucun raccord libre.',
          circuitHintShown: 'Les bons raccords sont en orange.',
          circuitWinTitle: 'Circuit rétabli',
          circuitWinBody: 'Toutes les branches actives.\n{moves} rotations.',
          boltsInstruction: 'Déplacez le boulon du haut vers\nun tube vide ou du même type.',
          boltsProgress: 'Coups {moves} · Capacité {depth}',
          boltsTube: 'Tube {tube}',
          boltsChooseSource: 'Touchez un tube pour choisir\nle boulon du haut.',
          boltsChooseDestination: 'Choisissez un tube vide ou du même type.',
          boltsEmpty: 'Tube vide. Choisissez d’abord un boulon.',
          boltsInvalid: 'Même type en haut et place libre requise.',
          boltsHintShown: 'Boulon du haut : tube {from} → {to}.',
          boltsNoHint: 'Aucune solution. Annulez ou recommencez.',
          boltsWinTitle: 'Boulons triés',
          boltsWinBody: 'Un type par tube plein.\n{moves} coups.',
          filterInstruction: 'Touchez les paquets carrés.\nLaissez passer les triangles.',
          filterProgress: 'Chips {hits}/{target} · Erreurs {errors}/2',
          filterReady: 'Un leurre permis.\nLes chips manqués sont remplacés.',
          filterHit: 'Chip reçu. Surveillez le flux.',
          filterDecoy: 'Leurre touché. La prochaine erreur\ntermine la partie.',
          filterHint: 'Le prochain leurre est encadré.\nLaissez-le passer.',
          filterNoHint: 'Plus aucun leurre à marquer.',
          filterWinTitle: 'Signal sécurisé',
          filterWinBody: '{hits} paquets reçus.',
          filterLoseTitle: 'Signal perdu',
          filterLoseBody: 'Réessayez ce flux ou un nouveau jeu.',
          actionPaused: 'En pause · Touchez Reprendre.',
          actionHintUsed: 'Indice déjà utilisé pour ce jeu.',
          droneInstruction: 'Touchez gauche ou droite.\nPassez dans les ouvertures laser.',
          droneProgress: 'Portes {passed}/{total} · Bouclier {shield}',
          droneReady: 'Surveillez la prochaine porte.\nUn choc est protégé.',
          droneCollision: 'Bouclier utilisé.\nÉvitez les prochains lasers.',
          droneHint: 'La prochaine ouverture sûre\nest marquée une seconde.',
          droneNoHint: 'La prochaine porte n’est pas visible.',
          droneLeft: '← Gauche',
          droneRight: 'Droite →',
          droneWinTitle: 'Route dégagée',
          droneWinBody: 'Les {total} portes laser sont franchies.',
          droneLoseTitle: 'Drone hors service',
          droneLoseBody: 'Deux chocs. Réessayez la route\nou un nouveau jeu.',
          echoInstruction: 'Observez les quatre touches.\nRépétez l’ordre des impulsions.',
          archiveInstruction: 'Mémorisez l’armoire.\nTouchez chaque composant remplacé.',
          echoRound: 'Manche {current}/{total}',
          echoWatch: 'Observez · {count} impulsions',
          echoInput: 'Répétez · {current}/{total}',
          echoRetry: 'Ordre perdu. La manche est rejouée.',
          echoPhaseHelp: 'Attendez les impulsions,\npuis répétez avec les touches.',
          echoComplete: 'Terminal déverrouillé.\nToutes les manches restaurées.',
          echoKey: 'Touche {key}',
          echoFirstHint: 'Première impulsion montrée une fois.',
          echoWinTitle: 'Impulsions rétablies',
          archiveWatch: 'Scan · {seconds}s',
          archiveFind: 'Changements {current}/{total}',
          archiveMisses: 'Erreurs {current}/2',
          archiveOriginal: 'Mémorisez l’armoire',
          archiveChanged: 'Trouvez les pièces remplacées',
          archiveSlot: 'Case {slot}',
          archiveFound: 'Trouvé',
          archiveStable: 'Inchangé',
          archiveHint: 'Une case inchangée est marquée.',
          archiveComplete: 'Tous les composants remplacés trouvés.',
          archiveFailed: 'Deux erreurs. Réessayez cette armoire.',
          archiveWinTitle: 'Archives vérifiées',
          archiveLoseTitle: 'Scan perdu',
          memoryHintUsed: 'Indice utilisé',
          memoryPaused: 'Entraînement en pause',
          memoryPauseBody: 'Reprenez à la même phase.'
        },
        de: {
          appTitle: 'Cyber Heist · Trainingsnetz',
          canvasLabel: 'Cyber Heist Minispiel-Training',
          loadingTitle: 'Netzverbindung läuft',
          loadingHint: 'Trainingsmodule werden geladen…',
          loadFailed: 'Verbindung fehlgeschlagen',
          reloadHint: 'Lade die Seite neu und versuche es erneut.',
          lobbyTitle: 'Trainingsnetz',
          lobbyTagline: 'Zehn Missionen. Schärfe deine Sinne.',
          readyTasks: '● 10 Missionen',
          soundOn: 'Ton an',
          soundOff: 'Ton aus',
          motionOn: 'Effekte an',
          motionOff: 'Effekte aus',
          offlineBadge: 'Offline-Demo',
          footer: 'Wähle eine Mission zum Starten.',
          back: '← Zurück',
          sound: 'Ton',
          mute: 'Stumm',
          languageTitle: 'Sprache',
          languageHint: 'Wähle die Sprache der Oberfläche.',
          languageClose: 'Fertig',
          sokobanTitle: 'Energiekisten',
          onetTitle: 'Signal-Link',
          memoryTitle: 'Chip-Memory',
          stackTitle: 'Relais-Turm',
          sokobanCategory: 'Logik / Wege',
          onetCategory: 'Fokus / Links',
          memoryCategory: 'Merken / Chips',
          stackCategory: 'Timing / Türme',
          sokobanInstruction: 'Schiebe alle Kisten auf Leuchtfelder.\nSchieben geht, Ziehen nicht.',
          levelLabel: '{current}/{total} · {name}',
          movesLabel: 'Züge {moves}',
          undo: 'Zurück',
          restart: 'Neustart',
          controlHint: 'Wischen, Pfeile oder WASD.',
          sokobanWinTitle: 'Strom wieder da',
          sokobanWinBody: 'Alle Felder in {moves} Zügen versorgt.',
          nextLevel: 'Weiter',
          onetInstruction: 'Verbinde gleiche Signale mit bis zu\nzwei Knicken. Der Weg muss frei sein.',
          remainingPairs: 'Paare {count}',
          matrixLabel: '6 × 6 Raster',
          onetInitial: 'Finde ein Paar. Auch außen führt ein Weg.',
          onetHint: 'Ein passendes Paar ist markiert.',
          onetShuffled: 'Signale gemischt. Suche einen neuen Weg.',
          hintPair: 'Tipp',
          shuffle: 'Mischen',
          newBoard: 'Neu',
          onetWinTitle: 'Signale gelöscht',
          onetWinBody: 'Alle 18 Signalpaare verbunden.',
          playAgain: 'Noch mal',
          onetBlocked: 'Weg versperrt. Versuche ein anderes Paar.',
          onetConnected: 'Verbindung steht.',
          onetAutoShuffle: 'Kein Paar erreichbar. Signale neu gemischt.',
          memoryInstruction: 'Merke dir die Chips, dann decke auf.\nFinde alle sechs gleichen Paare.',
          memoryProgress: 'Paare {found}/{total}',
          attempts: 'Versuche {count}',
          memorize: 'Einprägen · {seconds}s',
          rememberMismatch: 'Merke dir die Chips. Versuche es erneut.',
          yourTurn: 'Du bist dran · Finde ein Paar',
          matched: 'Entschl.',
          memoryHint: 'Falsche Paare werden wieder verdeckt.',
          restartMemory: 'Neustart',
          newCards: 'Neue Karten',
          memoryWinTitle: 'Chips entschlüsselt',
          memoryWinBody: 'Sechs Paare in {count} Versuchen gelöst.',
          newSet: 'Neues Set',
          stackInstruction: 'Tippe, um das Relais fallen zu lassen.\nStaple {target} Etagen bis zum Netzwerk.',
          floorsLabel: 'Etagen {floors}/{target}',
          perfectCount: 'Perfekt {count}',
          stackReady: 'Warte auf den richtigen Moment.',
          continueStack: 'Weiter',
          drop: 'Ablegen',
          stackHint: 'Tippe auf den Knopf oder drücke Leertaste.',
          pause: 'Pause',
          resume: 'Weiter',
          stackWinTitle: 'Relais online',
          stackWinBody: 'Netzwerk erreicht.\nPerfekte Treffer: {count}.',
          stackLoseTitle: 'Relais verloren',
          stackLoseBody: 'Etagen: {floors}.\nVersuche einen neuen Takt.',
          stackAgain: 'Neu bauen',
          tryAgain: 'Noch mal',
          pausedTitle: 'Pausiert',
          pausedHint: 'Tippe auf Weiter.',
          perfectDrop: 'Perfekt ausgerichtet!',
          nearMiss: 'Das war knapp. Bleib konzentriert.',
          goodDrop: 'Relais gesichert.',
          backToLobby: 'Zurück zum Netz',
          prop0: 'Batterie',
          prop1: 'Schlüssel',
          prop2: 'Chip',
          prop3: 'Antenne',
          prop4: 'Kassette',
          prop5: 'Scanner',
          prop6: 'Kristall',
          prop7: 'Diskette',
          prop8: 'Satellit',
          prop9: 'Terminal',
          prop10: 'Token',
          prop11: 'Handgerät',
          prop12: 'Headset',
          prop13: 'Radar',
          level0: 'Erster Lauf',
          level1: 'Zwei Kerne',
          level2: 'Geteiltes Depot',
          level3: 'Umweg',
          level4: 'Mittelgang',
          level5: 'Drei Relais',
          circuitTitle: 'Strompfad',
          boltsTitle: 'Bolzen sortieren',
          echoTitle: 'Pulsfolge',
          archiveTitle: 'Archivscan',
          filterTitle: 'Signalfilter',
          droneTitle: 'Drohnenflug',
          circuitCategory: 'Denken',
          boltsCategory: 'Denken',
          echoCategory: 'Gedächtnis',
          archiveCategory: 'Gedächtnis',
          filterCategory: 'Reaktion',
          droneCategory: 'Reaktion',
          hint: 'Tipp',
          missionWon: 'Mission geschafft',
          missionComplete: 'Alle Ziele erreicht.',
          missionNext: 'Weiter',
          missionDifficulty: 'Stufe {level}',
          missionAgain: 'Noch mal',
          missionRetry: 'Neustart',
          missionNewBoard: 'Neues Feld',
          missionProgress: 'Fortschritt',
          missionsPage: '{current}/{total}',
          circuitInstruction: 'Tippen zum Drehen.\nAlle Zweige und den Ausgang versorgen.',
          circuitPowered: 'Strom {powered}/{total} · Drehungen {moves}',
          circuitLegend: 'Batterie mit Ausgang verbinden.\nKeine offenen Anschlüsse.',
          circuitHintShown: 'Orange zeigt die richtigen Anschlüsse.',
          circuitWinTitle: 'Stromkreis bereit',
          circuitWinBody: 'Alle Zweige versorgt.\n{moves} Drehungen.',
          boltsInstruction: 'Oberen Bolzen wählen, dann leeres\nRohr oder Rohr mit gleichem Typ.',
          boltsProgress: 'Züge {moves} · Platz {depth}',
          boltsTube: 'Rohr {tube}',
          boltsChooseSource: 'Rohr antippen, um den\noberen Bolzen zu wählen.',
          boltsChooseDestination: 'Leeres Rohr oder gleichen Typ wählen.',
          boltsEmpty: 'Rohr leer. Erst einen Bolzen wählen.',
          boltsInvalid: 'Gleicher Typ oben und freier Platz nötig.',
          boltsHintShown: 'Oberer Bolzen: Rohr {from} → {to}.',
          boltsNoHint: 'Kein Weg gefunden. Zurück oder Neustart.',
          boltsWinTitle: 'Bolzen sortiert',
          boltsWinBody: 'Jeder Typ in einem vollen Rohr.\n{moves} Züge.',
          filterInstruction: 'Quadratische Chips antippen.\nDreieckige Köder durchlassen.',
          filterProgress: 'Chips {hits}/{target} · Fehler {errors}/2',
          filterReady: 'Ein Fehlgriff ist erlaubt.\nVerpasste Chips kommen wieder.',
          filterHit: 'Chip erfasst. Datenstrom im Blick halten.',
          filterDecoy: 'Köder getroffen. Der nächste\nFehlgriff beendet den Lauf.',
          filterHint: 'Der nächste Köder ist markiert.\nLass ihn durch.',
          filterNoHint: 'Kein Köder mehr zum Markieren.',
          filterWinTitle: 'Signal gesichert',
          filterWinBody: '{hits} Chip-Pakete erfasst.',
          filterLoseTitle: 'Signal verloren',
          filterLoseBody: 'Diesen Strom oder ein neues Feld testen.',
          actionPaused: 'Pausiert · Tippe auf Weiter.',
          actionHintUsed: 'Tipp für dieses Feld schon genutzt.',
          droneInstruction: 'Links oder rechts zum Steuern.\nDurch die Lücken der Lasertore.',
          droneProgress: 'Tore {passed}/{total} · Schild {shield}',
          droneReady: 'Achte auf das nächste Tor.\nEin Zusammenstoß ist geschützt.',
          droneCollision: 'Schild verbraucht.\nDen restlichen Lasern ausweichen.',
          droneHint: 'Die nächste sichere Lücke\nist eine Sekunde markiert.',
          droneNoHint: 'Das nächste Tor ist noch nicht sichtbar.',
          droneLeft: '← Links',
          droneRight: 'Rechts →',
          droneWinTitle: 'Route geschafft',
          droneWinBody: 'Alle {total} Lasertore durchquert.',
          droneLoseTitle: 'Drohne ausgefallen',
          droneLoseBody: 'Zwei Zusammenstöße. Route erneut\noder ein neues Feld versuchen.',
          echoInstruction: 'Die vier Tasten beobachten.\nDie Pulsfolge wiederholen.',
          archiveInstruction: 'Den Schrank einprägen.\nAlle ersetzten Bauteile antippen.',
          echoRound: 'Runde {current}/{total}',
          echoWatch: 'Ansehen · {count} Pulse',
          echoInput: 'Wiederholen · {current}/{total}',
          echoRetry: 'Falsche Folge. Runde wird wiederholt.',
          echoPhaseHelp: 'Erst Pulse abwarten,\ndann Tasten der Reihe nach tippen.',
          echoComplete: 'Terminal entsperrt.\nAlle Runden wiederhergestellt.',
          echoKey: 'Taste {key}',
          echoFirstHint: 'Erster Puls einmal angezeigt.',
          echoWinTitle: 'Pulse wiederhergestellt',
          archiveWatch: 'Scan · {seconds}s',
          archiveFind: 'Änderungen {current}/{total}',
          archiveMisses: 'Fehler {current}/2',
          archiveOriginal: 'Schrank einprägen',
          archiveChanged: 'Ersetzte Bauteile finden',
          archiveSlot: 'Fach {slot}',
          archiveFound: 'Gefunden',
          archiveStable: 'Unverändert',
          archiveHint: 'Ein unverändertes Fach ist markiert.',
          archiveComplete: 'Alle ersetzten Bauteile gefunden.',
          archiveFailed: 'Zwei falsche Fächer. Schrank neu prüfen.',
          archiveWinTitle: 'Archiv geprüft',
          archiveLoseTitle: 'Scan fehlgeschlagen',
          memoryHintUsed: 'Tipp genutzt',
          memoryPaused: 'Training pausiert',
          memoryPauseBody: 'In derselben Phase fortsetzen.'
        },
        es: {
          appTitle: 'Cyber Heist · Zona de práctica',
          canvasLabel: 'Minijuegos de Cyber Heist',
          loadingTitle: 'Conectando a la red',
          loadingHint: 'Cargando módulos de práctica…',
          loadFailed: 'Error de conexión',
          reloadHint: 'Recarga la página para intentarlo.',
          lobbyTitle: 'Zona de práctica',
          lobbyTagline: 'Diez misiones. Afina tus reflejos.',
          readyTasks: '● 10 misiones',
          soundOn: 'Sonido sí',
          soundOff: 'Sonido no',
          motionOn: 'Efectos sí',
          motionOff: 'Efectos no',
          offlineBadge: 'Demo sin conexión',
          footer: 'Elige una misión para empezar.',
          back: '← Volver',
          sound: 'Sonido',
          mute: 'Silencio',
          languageTitle: 'Idioma',
          languageHint: 'Elige el idioma de la interfaz.',
          languageClose: 'Listo',
          sokobanTitle: 'Cajas neón',
          onetTitle: 'Enlace señal',
          memoryTitle: 'Memochips',
          stackTitle: 'Torre relé',
          sokobanCategory: 'Lógica / Rutas',
          onetCategory: 'Atención / Enlaces',
          memoryCategory: 'Memoria / Chips',
          stackCategory: 'Ritmo / Torres',
          sokobanInstruction: 'Empuja las cajas hasta las bases.\nPuedes empujar, pero no tirar.',
          levelLabel: '{current}/{total} · {name}',
          movesLabel: 'Pasos {moves}',
          undo: 'Deshacer',
          restart: 'Repetir',
          controlHint: 'Desliza, flechas o WASD.',
          sokobanWinTitle: 'Energía restaurada',
          sokobanWinBody: 'Bases activadas en {moves} pasos.',
          nextLevel: 'Siguiente',
          onetInstruction: 'Une señales iguales con un máximo\nde dos giros y sin obstáculos.',
          remainingPairs: 'Pares {count}',
          matrixLabel: 'Cuadrícula 6 × 6',
          onetInitial: 'Busca una pareja. Puedes usar el borde exterior.',
          onetHint: 'Hay una pareja resaltada.',
          onetShuffled: 'Señales mezcladas. Busca otra ruta.',
          hintPair: 'Pista',
          shuffle: 'Mezclar',
          newBoard: 'Nuevo',
          onetWinTitle: 'Señal despejada',
          onetWinBody: 'Las 18 parejas de señales están unidas.',
          playAgain: 'Otra vez',
          onetBlocked: 'Ruta bloqueada. Prueba con otra pareja.',
          onetConnected: 'Enlace establecido.',
          onetAutoShuffle: 'No quedan enlaces. Se mezclaron las señales.',
          memoryInstruction: 'Memoriza los chips y voltea cartas\npara encontrar las seis parejas.',
          memoryProgress: 'Pares {found}/{total}',
          attempts: 'Intentos {count}',
          memorize: 'Memoriza · {seconds}s',
          rememberMismatch: 'Recuerda estos chips y prueba otra vez.',
          yourTurn: 'Tu turno · Busca una pareja',
          matched: 'Resuelto',
          memoryHint: 'Las cartas distintas se ocultan.',
          restartMemory: 'Reiniciar',
          newCards: 'Otras cartas',
          memoryWinTitle: 'Chips descifrados',
          memoryWinBody: 'Seis parejas resueltas en {count} intentos.',
          newSet: 'Nueva serie',
          stackInstruction: 'Toca para soltar cada módulo.\nAlinea {target} pisos para llegar a la red.',
          floorsLabel: 'Pisos {floors}/{target}',
          perfectCount: 'Perfectos {count}',
          stackReady: 'Espera a que los módulos se alineen.',
          continueStack: 'Seguir',
          drop: 'Soltar',
          stackHint: 'Toca el botón o pulsa Espacio.',
          pause: 'Pausa',
          resume: 'Seguir',
          stackWinTitle: 'Enlace activo',
          stackWinBody: 'Red alcanzada.\nCaídas perfectas: {count}.',
          stackLoseTitle: 'Enlace perdido',
          stackLoseBody: 'Pisos: {floors}.\nPrueba otro ritmo.',
          stackAgain: 'Otra torre',
          tryAgain: 'Reintentar',
          pausedTitle: 'En pausa',
          pausedHint: 'Toca Seguir para continuar.',
          perfectDrop: '¡Alineación perfecta!',
          nearMiss: 'Por poco. Mantén la concentración.',
          goodDrop: 'Módulo asegurado.',
          backToLobby: 'Volver a la red',
          prop0: 'Batería',
          prop1: 'Llave',
          prop2: 'Chip',
          prop3: 'Antena',
          prop4: 'Cinta',
          prop5: 'Escáner',
          prop6: 'Cristal',
          prop7: 'Disco',
          prop8: 'Satélite',
          prop9: 'Terminal',
          prop10: 'Ficha',
          prop11: 'Portátil',
          prop12: 'Auricular',
          prop13: 'Radar',
          level0: 'Primer paso',
          level1: 'Dos núcleos',
          level2: 'Depósito partido',
          level3: 'Desvío',
          level4: 'Pasillo central',
          level5: 'Triple enlace',
          circuitTitle: 'Flujo eléctrico',
          boltsTitle: 'Ordena pernos',
          echoTitle: 'Eco de pulsos',
          archiveTitle: 'Escanea archivos',
          filterTitle: 'Filtra señales',
          droneTitle: 'Vuelo de dron',
          circuitCategory: 'Lógica',
          boltsCategory: 'Lógica',
          echoCategory: 'Memoria',
          archiveCategory: 'Memoria',
          filterCategory: 'Reflejos',
          droneCategory: 'Reflejos',
          hint: 'Pista',
          missionWon: 'Misión superada',
          missionComplete: 'Todos los objetivos completados.',
          missionNext: 'Siguiente',
          missionDifficulty: 'Dificultad {level}',
          missionAgain: 'Otra vez',
          missionRetry: 'Reintentar',
          missionNewBoard: 'Nuevo tablero',
          missionProgress: 'Progreso',
          missionsPage: '{current}/{total}',
          circuitInstruction: 'Toca para girar.\nActiva las ramas y la salida.',
          circuitPowered: 'Activos {powered}/{total} · Giros {moves}',
          circuitLegend: 'Conecta batería y salida.\nNo dejes conexiones sueltas.',
          circuitHintShown: 'El naranja marca los puertos correctos.',
          circuitWinTitle: 'Circuito restaurado',
          circuitWinBody: 'Todas las ramas activas.\n{moves} giros.',
          boltsInstruction: 'Mueve el perno de arriba a un tubo\nvacío o con el mismo tipo arriba.',
          boltsProgress: 'Pasos {moves} · Capacidad {depth}',
          boltsTube: 'Tubo {tube}',
          boltsChooseSource: 'Toca un tubo para elegir\nel perno de arriba.',
          boltsChooseDestination: 'Elige un tubo vacío o del mismo tipo.',
          boltsEmpty: 'Tubo vacío. Elige un perno primero.',
          boltsInvalid: 'Mismo tipo arriba y espacio libre.',
          boltsHintShown: 'Perno de arriba: tubo {from} → {to}.',
          boltsNoHint: 'Sin solución. Deshaz o reinicia.',
          boltsWinTitle: 'Pernos ordenados',
          boltsWinBody: 'Cada tipo en su tubo lleno.\n{moves} pasos.',
          filterInstruction: 'Toca los chips cuadrados.\nDeja pasar los triángulos.',
          filterProgress: 'Chips {hits}/{target} · Errores {errors}/2',
          filterReady: 'Se permite un error.\nLos chips perdidos se reponen.',
          filterHit: 'Chip aceptado. Vigila el flujo.',
          filterDecoy: 'Era un señuelo. El próximo error\ntermina la partida.',
          filterHint: 'El próximo señuelo está marcado.\nDéjalo pasar.',
          filterNoHint: 'No quedan señuelos para marcar.',
          filterWinTitle: 'Señal asegurada',
          filterWinBody: '{hits} paquetes aceptados.',
          filterLoseTitle: 'Señal perdida',
          filterLoseBody: 'Repite el flujo o prueba otro tablero.',
          actionPaused: 'En pausa · Toca Seguir.',
          actionHintUsed: 'Pista ya usada en este tablero.',
          droneInstruction: 'Toca izquierda o derecha.\nCruza los huecos de las puertas láser.',
          droneProgress: 'Puertas {passed}/{total} · Escudo {shield}',
          droneReady: 'Vigila la siguiente puerta.\nUn choque está protegido.',
          droneCollision: 'Escudo usado.\nEvita los láseres restantes.',
          droneHint: 'El próximo hueco seguro\nse marca un segundo.',
          droneNoHint: 'La siguiente puerta aún no se ve.',
          droneLeft: '← Izq.',
          droneRight: 'Der. →',
          droneWinTitle: 'Ruta despejada',
          droneWinBody: 'Las {total} puertas láser superadas.',
          droneLoseTitle: 'Dron desactivado',
          droneLoseBody: 'Dos choques. Repite la ruta\no prueba otro tablero.',
          echoInstruction: 'Mira las cuatro teclas.\nRepite el orden de los pulsos.',
          archiveInstruction: 'Memoriza el armario.\nToca cada componente cambiado.',
          echoRound: 'Ronda {current}/{total}',
          echoWatch: 'Mira · {count} pulsos',
          echoInput: 'Repite · {current}/{total}',
          echoRetry: 'Orden incorrecto. Se repite la ronda.',
          echoPhaseHelp: 'Espera los pulsos y luego\ntoca las teclas en orden.',
          echoComplete: 'Terminal desbloqueado.\nTodas las rondas restauradas.',
          echoKey: 'Tecla {key}',
          echoFirstHint: 'Primer pulso mostrado una vez.',
          echoWinTitle: 'Pulsos restaurados',
          archiveWatch: 'Escanea · {seconds}s',
          archiveFind: 'Cambios {current}/{total}',
          archiveMisses: 'Errores {current}/2',
          archiveOriginal: 'Memoriza el armario',
          archiveChanged: 'Busca las piezas cambiadas',
          archiveSlot: 'Hueco {slot}',
          archiveFound: 'Hallado',
          archiveStable: 'Sin cambios',
          archiveHint: 'Un hueco sin cambios está marcado.',
          archiveComplete: 'Todos los componentes cambiados hallados.',
          archiveFailed: 'Dos errores. Reintenta este armario.',
          archiveWinTitle: 'Archivo verificado',
          archiveLoseTitle: 'Escaneo fallido',
          memoryHintUsed: 'Pista usada',
          memoryPaused: 'Práctica en pausa',
          memoryPauseBody: 'Continúa desde la misma fase.'
        },
        pt: {
          appTitle: 'Cyber Heist · Área de treino',
          canvasLabel: 'Minijogos de Cyber Heist',
          loadingTitle: 'Conectando à rede',
          loadingHint: 'Carregando módulos de treino…',
          loadFailed: 'Falha na conexão',
          reloadHint: 'Recarregue a página para tentar.',
          lobbyTitle: 'Área de treino',
          lobbyTagline: 'Dez missões. Afie suas habilidades.',
          readyTasks: '● Online / 10 missões',
          soundOn: 'Som ligado',
          soundOff: 'Som mudo',
          motionOn: 'Efeitos sim',
          motionOff: 'Efeitos não',
          offlineBadge: 'Demo offline',
          footer: 'Escolha uma missão para começar.',
          back: '← Voltar',
          sound: 'Som',
          mute: 'Mudo',
          languageTitle: 'Idioma',
          languageHint: 'Escolha o idioma da interface.',
          languageClose: 'Pronto',
          sokobanTitle: 'Caixas neon',
          onetTitle: 'Elo de sinal',
          memoryTitle: 'Memória chip',
          stackTitle: 'Torre de relés',
          sokobanCategory: 'Lógica / Rotas',
          onetCategory: 'Foco / Conexões',
          memoryCategory: 'Memória / Chips',
          stackCategory: 'Ritmo / Torres',
          sokobanInstruction: 'Empurre as caixas até as bases.\nPode empurrar, mas não puxar.',
          levelLabel: '{current}/{total} · {name}',
          movesLabel: 'Passos {moves}',
          undo: 'Desfazer',
          restart: 'Repetir',
          controlHint: 'Deslize, setas ou WASD.',
          sokobanWinTitle: 'Energia restaurada',
          sokobanWinBody: 'Todas as bases ligadas em {moves} passos.',
          nextLevel: 'Próximo',
          onetInstruction: 'Ligue sinais iguais com no máximo\nduas curvas e sem obstáculos.',
          remainingPairs: 'Pares {count}',
          matrixLabel: 'Grade 6 × 6',
          onetInitial: 'Ache um par. Use também as bordas.',
          onetHint: 'Um par possível está destacado.',
          onetShuffled: 'Sinais misturados. Procure outra rota.',
          hintPair: 'Dica',
          shuffle: 'Misturar',
          newBoard: 'Nova grade',
          onetWinTitle: 'Sinal liberado',
          onetWinBody: 'Todos os 18 pares de sinais conectados.',
          playAgain: 'De novo',
          onetBlocked: 'Caminho bloqueado. Tente outro par.',
          onetConnected: 'Conexão estabelecida.',
          onetAutoShuffle: 'Sem pares disponíveis. Sinais remisturados.',
          memoryInstruction: 'Memorize os chips, vire as cartas\ne encontre os seis pares.',
          memoryProgress: 'Pares {found}/{total}',
          attempts: 'Tentativas {count}',
          memorize: 'Memorize · {seconds}s',
          rememberMismatch: 'Lembre destes chips e tente de novo.',
          yourTurn: 'Sua vez · Encontre um par',
          matched: 'Decifrado',
          memoryHint: 'Cartas diferentes viram de volta.',
          restartMemory: 'Reiniciar',
          newCards: 'Novas cartas',
          memoryWinTitle: 'Chips decifrados',
          memoryWinBody: 'Seis pares em {count} tentativas.',
          newSet: 'Novo grupo',
          stackInstruction: 'Toque para soltar cada relé.\nAlinhe {target} andares para chegar à rede.',
          floorsLabel: 'Andares {floors}/{target}',
          perfectCount: 'Perfeitos {count}',
          stackReady: 'Espere os relés se alinharem.',
          continueStack: 'Continuar',
          drop: 'Soltar',
          stackHint: 'Toque no botão ou pressione Espaço.',
          pause: 'Pausa',
          resume: 'Continuar',
          stackWinTitle: 'Relé conectado',
          stackWinBody: 'Rede alcançada.\nQuedas perfeitas: {count}.',
          stackLoseTitle: 'Relé perdido',
          stackLoseBody: 'Andares: {floors}.\nTente outro ritmo.',
          stackAgain: 'Nova torre',
          tryAgain: 'Tentar de novo',
          pausedTitle: 'Pausado',
          pausedHint: 'Toque em Continuar.',
          perfectDrop: 'Alinhamento perfeito!',
          nearMiss: 'Por pouco. Mantenha o foco.',
          goodDrop: 'Relé no lugar.',
          backToLobby: 'Voltar à rede',
          prop0: 'Bateria',
          prop1: 'Chave',
          prop2: 'Chip',
          prop3: 'Antena',
          prop4: 'Fita',
          prop5: 'Scanner',
          prop6: 'Cristal',
          prop7: 'Disco',
          prop8: 'Satélite',
          prop9: 'Terminal',
          prop10: 'Token',
          prop11: 'Portátil',
          prop12: 'Headset',
          prop13: 'Radar',
          level0: 'Primeiro passo',
          level1: 'Dois núcleos',
          level2: 'Depósito dividido',
          level3: 'Desvio',
          level4: 'Via central',
          level5: 'Relé triplo',
          circuitTitle: 'Fluxo elétrico',
          boltsTitle: 'Separe pinos',
          echoTitle: 'Eco de pulsos',
          archiveTitle: 'Escaneie arquivos',
          filterTitle: 'Filtro de sinais',
          droneTitle: 'Voo do drone',
          circuitCategory: 'Lógica',
          boltsCategory: 'Lógica',
          echoCategory: 'Memória',
          archiveCategory: 'Memória',
          filterCategory: 'Reflexos',
          droneCategory: 'Reflexos',
          hint: 'Dica',
          missionWon: 'Missão cumprida',
          missionComplete: 'Todos os objetivos concluídos.',
          missionNext: 'Próximo',
          missionDifficulty: 'Dificuldade {level}',
          missionAgain: 'De novo',
          missionRetry: 'Tentar de novo',
          missionNewBoard: 'Novo tabuleiro',
          missionProgress: 'Progresso',
          missionsPage: '{current}/{total}',
          circuitInstruction: 'Toque para girar.\nLigue os ramos e a saída.',
          circuitPowered: 'Ativos {powered}/{total} · Giros {moves}',
          circuitLegend: 'Ligue a bateria à saída.\nNão deixe conexões soltas.',
          circuitHintShown: 'O laranja marca as conexões certas.',
          circuitWinTitle: 'Circuito restaurado',
          circuitWinBody: 'Todos os ramos ligados.\n{moves} giros.',
          boltsInstruction: 'Mova o pino do topo para um tubo\nvazio ou com o mesmo tipo no topo.',
          boltsProgress: 'Passos {moves} · Capacidade {depth}',
          boltsTube: 'Tubo {tube}',
          boltsChooseSource: 'Toque no tubo para escolher\no pino do topo.',
          boltsChooseDestination: 'Escolha um tubo vazio ou do mesmo tipo.',
          boltsEmpty: 'Tubo vazio. Escolha um pino primeiro.',
          boltsInvalid: 'Mesmo tipo no topo e espaço livre.',
          boltsHintShown: 'Pino do topo: tubo {from} → {to}.',
          boltsNoHint: 'Sem solução. Desfaça ou reinicie.',
          boltsWinTitle: 'Pinos separados',
          boltsWinBody: 'Cada tipo no seu tubo cheio.\n{moves} passos.',
          filterInstruction: 'Toque nos chips quadrados.\nDeixe os triângulos passarem.',
          filterProgress: 'Chips {hits}/{target} · Erros {errors}/2',
          filterReady: 'Um erro é protegido.\nChips perdidos são repostos.',
          filterHit: 'Chip aceito. Observe o fluxo.',
          filterDecoy: 'Era uma isca. O próximo erro\nencerra a partida.',
          filterHint: 'A próxima isca está marcada.\nDeixe passar.',
          filterNoHint: 'Não restam iscas para marcar.',
          filterWinTitle: 'Sinal protegido',
          filterWinBody: '{hits} pacotes aceitos.',
          filterLoseTitle: 'Sinal perdido',
          filterLoseBody: 'Repita o fluxo ou tente outro tabuleiro.',
          actionPaused: 'Pausado · Toque em Continuar.',
          actionHintUsed: 'Dica já usada neste tabuleiro.',
          droneInstruction: 'Toque à esquerda ou direita.\nPasse pelas aberturas dos portões.',
          droneProgress: 'Portões {passed}/{total} · Escudo {shield}',
          droneReady: 'Observe o próximo portão.\nUma colisão é protegida.',
          droneCollision: 'Escudo usado.\nDesvie dos lasers restantes.',
          droneHint: 'A próxima abertura segura\nfica marcada por um segundo.',
          droneNoHint: 'O próximo portão ainda não está visível.',
          droneLeft: '← Esq.',
          droneRight: 'Dir. →',
          droneWinTitle: 'Rota liberada',
          droneWinBody: 'Todos os {total} portões atravessados.',
          droneLoseTitle: 'Drone desativado',
          droneLoseBody: 'Duas colisões. Repita a rota\nou tente outro tabuleiro.',
          echoInstruction: 'Observe as quatro teclas.\nRepita a ordem dos pulsos.',
          archiveInstruction: 'Memorize o armário.\nToque em cada componente trocado.',
          echoRound: 'Rodada {current}/{total}',
          echoWatch: 'Observe · {count} pulsos',
          echoInput: 'Repita · {current}/{total}',
          echoRetry: 'Ordem errada. Repetindo a rodada.',
          echoPhaseHelp: 'Espere os pulsos e depois\ntoque nas teclas em ordem.',
          echoComplete: 'Terminal desbloqueado.\nTodas as rodadas restauradas.',
          echoKey: 'Tecla {key}',
          echoFirstHint: 'Primeiro pulso mostrado uma vez.',
          echoWinTitle: 'Pulsos restaurados',
          archiveWatch: 'Escaneie · {seconds}s',
          archiveFind: 'Mudanças {current}/{total}',
          archiveMisses: 'Erros {current}/2',
          archiveOriginal: 'Memorize o armário',
          archiveChanged: 'Ache as peças trocadas',
          archiveSlot: 'Baia {slot}',
          archiveFound: 'Achou',
          archiveStable: 'Sem mudança',
          archiveHint: 'Uma baia sem mudança está marcada.',
          archiveComplete: 'Todos os componentes trocados achados.',
          archiveFailed: 'Dois erros. Tente o mesmo armário.',
          archiveWinTitle: 'Arquivo verificado',
          archiveLoseTitle: 'Falha no escaneamento',
          memoryHintUsed: 'Dica usada',
          memoryPaused: 'Treino pausado',
          memoryPauseBody: 'Continue da mesma fase.'
        },
        ru: {
          appTitle: 'Cyber Heist · Тренировка',
          canvasLabel: 'Мини-игры Cyber Heist',
          loadingTitle: 'Подключение к сети',
          loadingHint: 'Загрузка учебных модулей…',
          loadFailed: 'Ошибка подключения',
          reloadHint: 'Обновите страницу и попробуйте снова.',
          lobbyTitle: 'Тренировочная сеть',
          lobbyTagline: 'Десять заданий. Отточите навыки.',
          readyTasks: '● В сети / 10 заданий',
          soundOn: 'Звук вкл.',
          soundOff: 'Звук выкл.',
          motionOn: 'Эффекты вкл.',
          motionOff: 'Эффекты выкл.',
          offlineBadge: 'Офлайн-демо',
          footer: 'Выберите задание для тренировки.',
          back: '← Назад',
          sound: 'Звук',
          mute: 'Без звука',
          languageTitle: 'Язык',
          languageHint: 'Выберите язык интерфейса.',
          languageClose: 'Готово',
          sokobanTitle: 'Энергоблоки',
          onetTitle: 'Связь сигналов',
          memoryTitle: 'Память чипов',
          stackTitle: 'Башня реле',
          sokobanCategory: 'Логика / Маршрут',
          onetCategory: 'Внимание / Связь',
          memoryCategory: 'Память / Чипы',
          stackCategory: 'Ритм / Башни',
          sokobanInstruction: 'Сдвиньте ящики на светящиеся базы.\nЯщики можно толкать, но не тянуть.',
          levelLabel: '{current}/{total} · {name}',
          movesLabel: 'Ходы {moves}',
          undo: 'Отмена',
          restart: 'Заново',
          controlHint: 'Свайп, стрелки или клавиши WASD.',
          sokobanWinTitle: 'Питание включено',
          sokobanWinBody: 'Все базы запитаны.\nХоды: {moves}.',
          nextLevel: 'Далее',
          onetInstruction: 'Соединяйте пары за два поворота\nили меньше. Путь должен быть свободен.',
          remainingPairs: 'Пар {count}',
          matrixLabel: 'Сетка 6 × 6',
          onetInitial: 'Найдите пару. Путь по краю тоже доступен.',
          onetHint: 'Доступная пара подсвечена.',
          onetShuffled: 'Сигналы перемешаны. Ищите новый путь.',
          hintPair: 'Подсказка',
          shuffle: 'Смешать',
          newBoard: 'Новая сетка',
          onetWinTitle: 'Сигналы очищены',
          onetWinBody: 'Все 18 пар сигналов соединены.',
          playAgain: 'Ещё раз',
          onetBlocked: 'Путь закрыт. Попробуйте другую пару.',
          onetConnected: 'Связь установлена.',
          onetAutoShuffle: 'Нет доступных пар. Сигналы перемешаны.',
          memoryInstruction: 'Запомните чипы, затем откройте карты\nи найдите все шесть пар.',
          memoryProgress: 'Пары {found}/{total}',
          attempts: 'Попытки {count}',
          memorize: 'Запомните · {seconds}с',
          rememberMismatch: 'Запомните эти чипы и попробуйте снова.',
          yourTurn: 'Ваш ход · Найдите пару',
          matched: 'Раскрыт',
          memoryHint: 'Разные чипы снова закроются.',
          restartMemory: 'Заново',
          newCards: 'Новые карты',
          memoryWinTitle: 'Чипы расшифрованы',
          memoryWinBody: 'Все шесть пар раскрыты.\nПопытки: {count}.',
          newSet: 'Новый набор',
          stackInstruction: 'Нажмите, чтобы опустить реле.\nСовместите {target} этажей для связи.',
          floorsLabel: 'Этажи {floors}/{target}',
          perfectCount: 'Точно {count}',
          stackReady: 'Дождитесь совпадения позиций реле.',
          continueStack: 'Продолжить',
          drop: 'Опустить',
          stackHint: 'Нажмите кнопку или пробел.',
          pause: 'Пауза',
          resume: 'Дальше',
          stackWinTitle: 'Реле в сети',
          stackWinBody: 'Связь есть.\nТочных попаданий: {count}.',
          stackLoseTitle: 'Связь потеряна',
          stackLoseBody: 'Этажи: {floors}.\nПопробуйте новый ритм.',
          stackAgain: 'Строить снова',
          tryAgain: 'Ещё раз',
          pausedTitle: 'Пауза',
          pausedHint: 'Нажмите «Дальше».',
          perfectDrop: 'Точное попадание!',
          nearMiss: 'Едва успели. Сосредоточьтесь.',
          goodDrop: 'Реле установлено.',
          backToLobby: 'Назад к сети',
          prop0: 'Батарея',
          prop1: 'Ключ',
          prop2: 'Чип',
          prop3: 'Антенна',
          prop4: 'Кассета',
          prop5: 'Сканер',
          prop6: 'Кристалл',
          prop7: 'Диск',
          prop8: 'Спутник',
          prop9: 'Терминал',
          prop10: 'Токен',
          prop11: 'КПК',
          prop12: 'Гарнитура',
          prop13: 'Радар',
          level0: 'Первый шаг',
          level1: 'Два ядра',
          level2: 'Разделённый склад',
          level3: 'Обход',
          level4: 'Центральный путь',
          level5: 'Три реле',
          circuitTitle: 'Цепь питания',
          boltsTitle: 'Сортировка болтов',
          echoTitle: 'Эхо импульсов',
          archiveTitle: 'Скан архива',
          filterTitle: 'Фильтр сигналов',
          droneTitle: 'Рывок дрона',
          circuitCategory: 'Логика',
          boltsCategory: 'Логика',
          echoCategory: 'Память',
          archiveCategory: 'Память',
          filterCategory: 'Реакция',
          droneCategory: 'Реакция',
          hint: 'Подсказка',
          missionWon: 'Задание пройдено',
          missionComplete: 'Все цели достигнуты.',
          missionNext: 'Далее',
          missionDifficulty: 'Сложность {level}',
          missionAgain: 'Ещё раз',
          missionRetry: 'Заново',
          missionNewBoard: 'Новое поле',
          missionProgress: 'Прогресс',
          missionsPage: '{current}/{total}',
          circuitInstruction: 'Нажимайте для поворота.\nЗапитайте все ветви и выход.',
          circuitPowered: 'Питание {powered}/{total} · Ходы {moves}',
          circuitLegend: 'Соедините батарею с выходом.\nНе оставляйте разрывов.',
          circuitHintShown: 'Верные контакты отмечены оранжевым.',
          circuitWinTitle: 'Цепь восстановлена',
          circuitWinBody: 'Все ветви запитаны.\nПовороты: {moves}.',
          boltsInstruction: 'Верхний болт — в пустую трубку\nили на такой же болт.',
          boltsProgress: 'Ходы {moves} · Мест {depth}',
          boltsTube: 'Трубка {tube}',
          boltsChooseSource: 'Нажмите на трубку,\nчтобы выбрать верхний болт.',
          boltsChooseDestination: 'Выберите пустую трубку\nили такую же верхушку.',
          boltsEmpty: 'Трубка пуста. Сначала выберите болт.',
          boltsInvalid: 'Нужен тот же тип сверху\nи свободное место.',
          boltsHintShown: 'Верхний болт: трубка {from} → {to}.',
          boltsNoHint: 'Путь не найден. Отмените ход\nили начните заново.',
          boltsWinTitle: 'Болты отсортированы',
          boltsWinBody: 'Каждый тип в своей полной трубке.\nХоды: {moves}.',
          filterInstruction: 'Нажимайте на квадратные чипы.\nПропускайте треугольные приманки.',
          filterProgress: 'Чипы {hits}/{target} · Ошибки {errors}/2',
          filterReady: 'Одна ошибка защищена.\nПропущенные чипы заменяются.',
          filterHit: 'Чип принят. Следите за потоком.',
          filterDecoy: 'Это приманка. Следующая ошибка\nзавершит попытку.',
          filterHint: 'Следующая приманка отмечена.\nПропустите её.',
          filterNoHint: 'Больше нет приманок для отметки.',
          filterWinTitle: 'Сигнал защищён',
          filterWinBody: 'Принято пакетов: {hits}.',
          filterLoseTitle: 'Сигнал потерян',
          filterLoseBody: 'Повторите поток\nили выберите новое поле.',
          actionPaused: 'Пауза · Нажмите «Дальше».',
          actionHintUsed: 'Подсказка уже использована.',
          droneInstruction: 'Нажимайте влево или вправо.\nПроходите в просветы лазерных ворот.',
          droneProgress: 'Ворота {passed}/{total} · Щит {shield}',
          droneReady: 'Следите за следующими воротами.\nОдин удар защищён.',
          droneCollision: 'Щит использован.\nИзбегайте остальных лазеров.',
          droneHint: 'Следующий безопасный просвет\nотмечен на секунду.',
          droneNoHint: 'Следующие ворота ещё не видны.',
          droneLeft: '← Влево',
          droneRight: 'Вправо →',
          droneWinTitle: 'Маршрут пройден',
          droneWinBody: 'Пройдены все лазерные ворота: {total}.',
          droneLoseTitle: 'Дрон отключён',
          droneLoseBody: 'Два столкновения. Повторите путь\nили выберите новое поле.',
          echoInstruction: 'Следите за четырьмя клавишами.\nПовторите порядок импульсов.',
          archiveInstruction: 'Запомните шкаф. Затем нажмите\nна все заменённые детали.',
          echoRound: 'Раунд {current}/{total}',
          echoWatch: 'Смотрите · Импульсов {count}',
          echoInput: 'Повторите · {current}/{total}',
          echoRetry: 'Порядок нарушен. Повтор раунда.',
          echoPhaseHelp: 'Дождитесь импульсов,\nзатем нажимайте по порядку.',
          echoComplete: 'Терминал открыт.\nВсе раунды восстановлены.',
          echoKey: 'Клавиша {key}',
          echoFirstHint: 'Первый импульс показан один раз.',
          echoWinTitle: 'Импульсы восстановлены',
          archiveWatch: 'Скан · {seconds}с',
          archiveFind: 'Изменения {current}/{total}',
          archiveMisses: 'Ошибки {current}/2',
          archiveOriginal: 'Запомните шкаф',
          archiveChanged: 'Найдите заменённые детали',
          archiveSlot: 'Ячейка {slot}',
          archiveFound: 'Найдено',
          archiveStable: 'Без замен',
          archiveHint: 'Отмечена ячейка без изменений.',
          archiveComplete: 'Все заменённые детали найдены.',
          archiveFailed: 'Две ошибки. Проверьте шкаф заново.',
          archiveWinTitle: 'Архив проверен',
          archiveLoseTitle: 'Скан не удался',
          memoryHintUsed: 'Использована',
          memoryPaused: 'Тренировка на паузе',
          memoryPauseBody: 'Продолжите с того же этапа.'
        }
      });
      function resolveLocale(value) {
        var _LOCALES$find;
        if (typeof value !== 'string') return DEFAULT_LOCALE;
        var language = value.trim().replace(/_/g, '-').toLowerCase().split('-')[0];
        return ((_LOCALES$find = LOCALES.find(function (locale) {
          return locale.id.toLowerCase().split('-')[0] === language;
        })) == null ? void 0 : _LOCALES$find.id) || DEFAULT_LOCALE;
      }
      function translate(locale, key, values) {
        if (values === void 0) {
          values = {};
        }
        var text = (messages[locale] || messages.en)[key] || messages.en[key];
        return text.replace(/\{(\w+)\}/g, function (placeholder, name) {
          return Object.prototype.hasOwnProperty.call(values, name) ? String(values[name]) : placeholder;
        });
      }
      function formatNumber(locale, value) {
        try {
          if (typeof Intl !== 'undefined' && typeof Intl.NumberFormat === 'function') {
            return new Intl.NumberFormat(locale).format(value).replace(/\u202f/g, "\xA0");
          }
        } catch (_unused) {/* Some mini-game runtimes have no locale data. */}
        return String(value);
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./PrototypeApp.ts', './archive.ts', './bolts.ts', './circuit.ts', './drone.ts', './echo.ts', './filter.ts', './memory.ts', './onet.ts', './random.ts', './sokoban.ts', './stack.ts', './i18n.ts', './archiveMission.ts', './boltsMission.ts', './circuitMission.ts', './droneMission.ts', './echoMission.ts', './filterMission.ts', './host.ts'], function () {
  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
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

System.register("chunks:///_virtual/PrototypeApp.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './sokoban.ts', './onet.ts', './memory.ts', './stack.ts', './i18n.ts', './circuitMission.ts', './boltsMission.ts', './echoMission.ts', './archiveMission.ts', './filterMission.ts', './droneMission.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, profiler, Node, UITransform, AudioSource, sys, input, Input, game, Game, resources, Font, ImageAsset, Texture2D, SpriteFrame, Graphics, Color, Label, Sprite, UIOpacity, Vec3, tween, KeyCode, AudioClip, Component, SOKOBAN_LEVELS, createSokoban, isSokobanWon, moveSokoban, createOnet, getOnetHint, reshuffleOnet, removeOnetPair, createMemory, advanceStack, createStack, dropStack, resolveLocale, formatNumber, translate, LOCALES, DEFAULT_LOCALE, createCircuitMission, createBoltsMission, createEchoMission, createArchiveMission, createFilterMission, createDroneMission;
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
      sys = module.sys;
      input = module.input;
      Input = module.Input;
      game = module.game;
      Game = module.Game;
      resources = module.resources;
      Font = module.Font;
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
    }, function (module) {
      resolveLocale = module.resolveLocale;
      formatNumber = module.formatNumber;
      translate = module.translate;
      LOCALES = module.LOCALES;
      DEFAULT_LOCALE = module.DEFAULT_LOCALE;
    }, function (module) {
      createCircuitMission = module.createCircuitMission;
    }, function (module) {
      createBoltsMission = module.createBoltsMission;
    }, function (module) {
      createEchoMission = module.createEchoMission;
    }, function (module) {
      createArchiveMission = module.createArchiveMission;
    }, function (module) {
      createFilterMission = module.createFilterMission;
    }, function (module) {
      createDroneMission = module.createDroneMission;
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
        lobby: 'lobbyTitle',
        sokoban: 'sokobanTitle',
        onet: 'onetTitle',
        memory: 'memoryTitle',
        stack: 'stackTitle',
        circuit: 'circuitTitle',
        bolts: 'boltsTitle',
        echo: 'echoTitle',
        archive: 'archiveTitle',
        filter: 'filterTitle',
        drone: 'droneTitle'
      };
      var EXTRA_MISSIONS = {
        circuit: createCircuitMission,
        bolts: createBoltsMission,
        echo: createEchoMission,
        archive: createArchiveMission,
        filter: createFilterMission,
        drone: createDroneMission
      };
      var isExtraGame = function isExtraGame(mode) {
        return Object.prototype.hasOwnProperty.call(EXTRA_MISSIONS, mode);
      };
      var ICONS = ['prop0', 'prop1', 'prop2', 'prop3', 'prop4', 'prop5', 'prop6', 'prop7', 'prop8', 'prop9', 'prop10', 'prop11', 'prop12', 'prop13'];
      var LEVEL_NAMES = ['level0', 'level1', 'level2', 'level3', 'level4', 'level5'];
      var LOCALE_STORAGE_KEY = 'cyber-heist:cocos-locale';
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
          _this.uiFont = null;
          _this.frames = new Map();
          _this.sounds = new Map();
          _this.audio = void 0;
          _this.mode = 'lobby';
          _this.locale = DEFAULT_LOCALE;
          _this.languageOpen = false;
          _this.muted = false;
          _this.reducedMotion = false;
          _this.level = 0;
          _this.round = 1;
          _this.lobbyPage = 0;
          _this.difficulty = 1;
          _this.mission = null;
          _this.missionSeed = '';
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
          _this.stackFeedback = null;
          _this.feedbackTime = 0;
          _this.offcut = null;
          _this.stackCounter = null;
          _this.stackFeedbackLabel = null;
          _this.status = null;
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
          try {
            this.locale = resolveLocale(sys.localStorage.getItem(LOCALE_STORAGE_KEY));
          } catch (_unused) {/* Keep English when storage is unavailable. */}
          this.applyDocumentLocale();
          this.renderLoading();
          input.on(Input.EventType.KEY_DOWN, this.keyDown, this);
          game.on(Game.EVENT_HIDE, this.hideGame, this);
          var names = ['rooftop'].concat(UI_ART, Array.from({
            length: 16
          }, function (_, i) {
            return "prop-" + String(i).padStart(2, '0');
          }));
          var fontReady = new Promise(function (resolve, reject) {
            resources.load('fonts/hacker-pixel', Font, function (error, font) {
              if (error) reject(error);else {
                _this2.uiFont = font;
                // Creator may report a font timeout before the browser finishes its FontFace request.
                var family = font.nativeAsset;
                if (sys.isBrowser && typeof document !== 'undefined' && document.fonts && typeof family === 'string') {
                  document.fonts.load("20px \"" + family + "\"").then(function () {
                    return resolve();
                  }, reject);
                } else resolve();
              }
            });
          });
          Promise.all([fontReady].concat(names.map(function (name) {
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
          }))).then(function () {
            if (_this2.isValid) _this2.render();
          })["catch"](function (error) {
            console.error('Prototype art could not load', error);
            _this2.clear();
            _this2.text(_this2.tr('loadFailed'), 30, 340, 420, 60, 28, C.ink, true);
            _this2.text(_this2.tr('reloadHint'), 30, 410, 420, 40, 18, C.muted, true);
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
          if (this.mission) {
            var _this$mission$hide, _this$mission;
            (_this$mission$hide = (_this$mission = this.mission).hide) == null || _this$mission$hide.call(_this$mission);
            this.render();
            return;
          }
          if (this.mode === 'stack' && this.stack.status === 'playing') {
            this.stackPause = true;
            this.render();
          }
        };
        _proto.update = function update(dt) {
          if (this.mission) {
            var _this$mission$update, _this$mission2;
            (_this$mission$update = (_this$mission2 = this.mission).update) == null || _this$mission$update.call(_this$mission2, dt);
            return;
          }
          if (this.mode === 'memory' && this.preview > 0) {
            this.preview = Math.max(0, this.preview - dt);
            if (this.timerLabel) this.timerLabel.string = this.tr('memorize', {
              seconds: Math.ceil(this.preview)
            });
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
            if (this.feedbackTime === 0 && this.stackFeedbackLabel) this.stackFeedbackLabel.string = this.tr('stackReady');
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
        _proto.tr = function tr(key, values) {
          if (values === void 0) {
            values = {};
          }
          var formatted = {};
          for (var _i2 = 0, _Object$keys = Object.keys(values); _i2 < _Object$keys.length; _i2++) {
            var name = _Object$keys[_i2];
            formatted[name] = typeof values[name] === 'number' ? formatNumber(this.locale, values[name]) : values[name];
          }
          return translate(this.locale, key, formatted);
        };
        _proto.applyDocumentLocale = function applyDocumentLocale() {
          var _document$getElementB;
          if (!sys.isBrowser || typeof document === 'undefined') return;
          document.documentElement.lang = this.locale;
          document.documentElement.dir = 'ltr';
          document.title = this.tr('appTitle');
          (_document$getElementB = document.getElementById('GameCanvas')) == null || _document$getElementB.setAttribute('aria-label', this.tr('canvasLabel'));
        };
        _proto.chooseLocale = function chooseLocale(locale) {
          this.locale = locale;
          this.languageOpen = false;
          try {
            sys.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
          } catch (_unused2) {/* Selection still works for this session. */}
          this.applyDocumentLocale();
          this.render();
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
        _proto.text = function text(s, x, y, w, h, size, ink, center, wrap) {
          if (size === void 0) {
            size = 20;
          }
          if (ink === void 0) {
            ink = C.ink;
          }
          if (center === void 0) {
            center = false;
          }
          if (wrap === void 0) {
            wrap = true;
          }
          var node = this.make(s, x, y, w, h);
          var label = node.addComponent(Label);
          if (this.uiFont) label.font = this.uiFont;else label.fontFamily = 'monospace';
          label.string = s;
          label.fontSize = size;
          label.lineHeight = Math.round(size * 1.25);
          label.color = color(ink);
          label.horizontalAlign = center ? Label.HorizontalAlign.CENTER : Label.HorizontalAlign.LEFT;
          label.verticalAlign = Label.VerticalAlign.CENTER;
          label.overflow = Label.Overflow.SHRINK;
          label.enableWrapText = wrap;
          // Assigning a Font can resize the Label before its overflow mode is set.
          node.getComponent(UITransform).setContentSize(w, h);
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
          this.text(s, x + 6, y, w - 12, h, 20, accent || C.ink, true, false);
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
          for (var _i3 = 0, _arr2 = [].concat(this.stage.children); _i3 < _arr2.length; _i3++) {
            var child = _arr2[_i3];
            child.destroy();
          }
          this.stage.removeAllChildren();
          this.panel(0, 0, 480, 900, C.bg, undefined, 0);
          if (this.mode !== 'lobby' && this.mode !== 'stack') this.image('rooftop', 0, 180, 480, 720, 32);
        };
        _proto.renderLoading = function renderLoading() {
          this.clear();
          this.text('CYBER HEIST / LOCAL NODE', 40, 320, 400, 40, 18, C.mint, true);
          this.text(this.tr('loadingTitle'), 25, 375, 430, 65, 28, C.ink, true);
          this.text(this.tr('loadingHint'), 40, 455, 400, 36, 18, C.muted, true);
        };
        _proto.render = function render() {
          this.clear();
          if (this.mode === 'lobby') {
            this.renderLobby();
            if (this.languageOpen) this.renderLanguages();
            return;
          }
          this.header();
          if (this.mission) {
            this.mission.render();
            return;
          }
          if (this.mode === 'sokoban') this.renderSokoban();
          if (this.mode === 'onet') this.renderOnet();
          if (this.mode === 'memory') this.renderMemory();
          if (this.mode === 'stack') this.renderStack();
        };
        _proto.renderLobby = function renderLobby() {
          var _this4 = this;
          this.image('rooftop', 0, -250, 480, 720);
          this.panel(0, 0, 480, 152, C.bg, undefined, 0).addComponent(UIOpacity).opacity = 228;
          this.text('CYBER HEIST   /   SANDBOX 10', 26, 22, 428, 26, 16, C.mint);
          this.text(this.tr('lobbyTitle'), 26, 57, 420, 58, 32);
          this.text(this.tr('lobbyTagline'), 28, 115, 420, 30, 18, C.muted);
          this.panel(25, 345, 217, 33, C.bg).addComponent(UIOpacity).opacity = 235;
          this.text(this.tr('readyTasks'), 35, 345, 199, 33, 18, C.mint);
          this.panel(0, 402, 480, 498, C.bg, undefined, 0);
          var cards = [{
            mode: 'sokoban',
            subtitle: 'sokobanCategory',
            icon: 1,
            tint: C.amber
          }, {
            mode: 'onet',
            subtitle: 'onetCategory',
            icon: 9,
            tint: C.mint
          }, {
            mode: 'memory',
            subtitle: 'memoryCategory',
            icon: 4,
            tint: C.rose
          }, {
            mode: 'stack',
            subtitle: 'stackCategory',
            icon: 10,
            tint: C.lilac
          }, {
            mode: 'circuit',
            subtitle: 'circuitCategory',
            icon: 4,
            tint: C.mint
          }, {
            mode: 'bolts',
            subtitle: 'boltsCategory',
            icon: 6,
            tint: C.amber
          }, {
            mode: 'echo',
            subtitle: 'echoCategory',
            icon: 5,
            tint: C.rose
          }, {
            mode: 'archive',
            subtitle: 'archiveCategory',
            icon: 7,
            tint: C.rose
          }, {
            mode: 'filter',
            subtitle: 'filterCategory',
            icon: 9,
            tint: C.lilac
          }, {
            mode: 'drone',
            subtitle: 'droneCategory',
            icon: 10,
            tint: C.lilac
          }];
          var pageCount = Math.ceil(cards.length / 4);
          this.button('←', 269, 345, 57, 33, function () {
            _this4.lobbyPage = (_this4.lobbyPage + pageCount - 1) % pageCount;
            _this4.render();
          });
          this.text(this.tr('missionsPage', {
            current: this.lobbyPage + 1,
            total: pageCount
          }), 334, 345, 52, 33, 18, C.ink, true, false);
          this.button('→', 397, 345, 57, 33, function () {
            _this4.lobbyPage = (_this4.lobbyPage + 1) % pageCount;
            _this4.render();
          });
          cards.slice(this.lobbyPage * 4, this.lobbyPage * 4 + 4).forEach(function (card, i) {
            var x = 24 + i % 2 * 222,
              y = 423 + Math.floor(i / 2) * 174;
            var node = _this4.image('ui-panel', x, y, 210, 159);
            _this4.prop(card.icon, x + 13, y + 10, 65);
            _this4.text(String(_this4.lobbyPage * 4 + i + 1).padStart(2, '0'), x + 153, y + 17, 39, 32, 20, card.tint, true);
            _this4.text(_this4.tr(TITLES[card.mode]), x + 24, y + 80, 162, 32, 22);
            _this4.text(_this4.tr(card.subtitle), x + 24, y + 115, 162, 28, 18, C.muted);
            _this4.listen(node, function () {
              return _this4.startGame(card.mode);
            });
          });
          this.button(this.tr(this.muted ? 'soundOff' : 'soundOn'), 24, 799, 132, 45, function () {
            _this4.muted = !_this4.muted;
            _this4.render();
          });
          this.button(this.tr(this.reducedMotion ? 'motionOff' : 'motionOn'), 166, 799, 142, 45, function () {
            _this4.reducedMotion = !_this4.reducedMotion;
            _this4.render();
          });
          this.button("LANG / " + LOCALES.find(function (locale) {
            return locale.id === _this4.locale;
          }).code, 326, 799, 127, 45, function () {
            _this4.languageOpen = true;
            _this4.render();
          });
          this.text(this.tr('footer'), 30, 862, 420, 28, 18, C.muted, true);
        };
        _proto.renderLanguages = function renderLanguages() {
          var _this5 = this;
          var shade = this.panel(0, 0, 480, 900, C.bg, undefined, 0);
          shade.addComponent(UIOpacity).opacity = 238;
          this.listen(shade, function () {});
          this.image('ui-panel', 31, 170, 418, 640);
          this.text(this.tr('languageTitle'), 58, 198, 364, 43, 28, C.ink, true);
          this.text(this.tr('languageHint'), 58, 245, 364, 43, 18, C.muted, true);
          LOCALES.forEach(function (locale, index) {
            _this5.button(locale.name, 58 + index % 2 * 190, 305 + Math.floor(index / 2) * 79, 174, 52, function () {
              return _this5.chooseLocale(locale.id);
            }, locale.id === _this5.locale ? C.mint : undefined);
          });
          this.button(this.tr('languageClose'), 153, 720, 174, 45, function () {
            _this5.languageOpen = false;
            _this5.render();
          });
        };
        _proto.startGame = function startGame(mode, next) {
          if (next === void 0) {
            next = false;
          }
          this.unscheduleAllCallbacks();
          var previousMode = this.mode;
          this.mode = mode;
          this.mission = null;
          this.status = null;
          this.touchOrigin = null;
          this.hint = [];
          this.connection = [];
          this.selected = -1;
          if (next) this.round++;
          if (isExtraGame(mode)) {
            if (next || previousMode !== mode || !this.missionSeed) this.missionSeed = "mission-" + mode + "-" + this.round;
            this.mission = EXTRA_MISSIONS[mode](this.missionHost(mode), this.missionSeed, this.difficulty);
          }
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
            this.stackFeedback = null;
            this.feedbackTime = 0;
            this.offcut = null;
          }
          this.beep('tap');
          this.render();
        };
        _proto.home = function home() {
          this.unscheduleAllCallbacks();
          this.mission = null;
          this.mode = 'lobby';
          this.languageOpen = false;
          this.render();
        };
        _proto.header = function header() {
          var _this6 = this;
          this.button(this.tr('back'), 20, 21, 91, 46, function () {
            return _this6.home();
          });
          if (isExtraGame(this.mode)) {
            this.text('CYBER HEIST', 118, 24, 145, 40, 16, C.mint, true);
            this.button("D" + this.difficulty, 285, 21, 70, 46, function () {
              _this6.difficulty = _this6.difficulty % 3 + 1;
              _this6.startGame(_this6.mode);
            }, C.amber);
          } else this.text('CYBER HEIST / TRAINING', 118, 24, 245, 40, 16, C.mint, true);
          this.button(this.tr(this.muted ? 'mute' : 'sound'), 372, 21, 87, 46, function () {
            _this6.muted = !_this6.muted;
            _this6.render();
          });
          this.text(this.tr(TITLES[this.mode]), 27, 91, 426, 49, 28);
        };
        _proto.missionHost = function missionHost(mode) {
          var _this7 = this;
          return {
            t: function t(key, values) {
              return _this7.tr(key, values);
            },
            make: this.make.bind(this),
            panel: this.panel.bind(this),
            text: this.text.bind(this),
            image: this.image.bind(this),
            prop: this.prop.bind(this),
            button: this.button.bind(this),
            listen: this.listen.bind(this),
            render: function render() {
              return _this7.render();
            },
            restart: function restart() {
              return _this7.startGame(mode);
            },
            next: function next() {
              return _this7.startGame(mode, true);
            },
            sound: function sound(name) {
              return _this7.beep(name);
            },
            result: function result(title, body, success) {
              if (success === void 0) {
                success = true;
              }
              return _this7.result(title, body, _this7.tr(success ? 'newBoard' : 'restart'), function () {
                return _this7.startGame(mode, success);
              }, success);
            }
          };
        };
        _proto.renderSokoban = function renderSokoban() {
          var _this8 = this;
          var s = this.sokoban;
          this.text(this.tr('sokobanInstruction'), 28, 145, 424, 54, 20, C.muted);
          this.image('ui-panel', 26, 207, 428, 62);
          this.text(this.tr('levelLabel', {
            current: this.level + 1,
            total: SOKOBAN_LEVELS.length,
            name: this.tr(LEVEL_NAMES[this.level])
          }), 56, 220, 264, 35, 18, C.amber);
          this.text(this.tr('movesLabel', {
            moves: s.moves
          }), 330, 220, 100, 35, 20, C.ink, true);
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
              this.text('＋', _px + 6, _py + 5, cell - 12, cell - 12, 24, C.mint, true);
            }
            if (s.boxes.includes(index)) {
              this.panel(_px + 6, _py + cell - 11, cell - 12, 6, '#142031', undefined, 2);
              this.prop(0, _px - 2, _py - 5, cell + 4);
              if (s.goals.includes(index)) this.text('★', _px + cell - 19, _py, 19, 21, 18, C.mint, true);
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
            _this8.touchOrigin = {
              x: p.x,
              y: p.y
            };
          });
          surface.on(Node.EventType.TOUCH_END, function (e) {
            if (!_this8.touchOrigin) return;
            var p = e.getUILocation(),
              dx = p.x - _this8.touchOrigin.x,
              dy = p.y - _this8.touchOrigin.y;
            _this8.touchOrigin = null;
            if (Math.max(Math.abs(dx), Math.abs(dy)) < 14) return;
            _this8.move(Math.abs(dx) > Math.abs(dy) ? Math.sign(dx) : 0, Math.abs(dy) >= Math.abs(dx) ? -Math.sign(dy) : 0);
          });
          surface.on(Node.EventType.TOUCH_CANCEL, function () {
            _this8.touchOrigin = null;
          });
          this.button(this.tr('undo'), 28, 730, 99, 53, function () {
            return _this8.undo();
          });
          this.button(this.tr('restart'), 28, 812, 99, 51, function () {
            return _this8.startGame('sokoban');
          });
          this.button('↑', 306, 701, 65, 54, function () {
            return _this8.move(0, -1);
          }, C.amber);
          this.button('←', 224, 781, 65, 54, function () {
            return _this8.move(-1, 0);
          });
          this.button('↓', 306, 781, 65, 54, function () {
            return _this8.move(0, 1);
          });
          this.button('→', 388, 781, 65, 54, function () {
            return _this8.move(1, 0);
          });
          this.text(this.tr('controlHint'), 143, 854, 310, 27, 18, C.muted, true);
          if (isSokobanWon(s)) this.result(this.tr('sokobanWinTitle'), this.tr('sokobanWinBody', {
            moves: s.moves
          }), this.tr('nextLevel'), function () {
            return _this8.startGame('sokoban', true);
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
          var _this9 = this;
          this.text(this.tr('onetInstruction'), 28, 145, 424, 54, 20, C.muted);
          this.text(this.tr('remainingPairs', {
            count: this.onet.remaining / 2
          }), 32, 219, 230, 38, 22, C.mint);
          this.text(this.tr('matrixLabel'), 277, 222, 172, 30, 18, C.muted, true);
          var cell = 70,
            tile = 65,
            x0 = 30,
            y0 = 283;
          this.image('ui-panel', 17, 271, 446, 438);
          this.onet.board.forEach(function (value, index) {
            if (value === null) return;
            var x = x0 + index % _this9.onet.cols * cell,
              y = y0 + Math.floor(index / _this9.onet.cols) * cell;
            var selected = _this9.selected === index,
              hinted = _this9.hint.includes(index);
            _this9.image('ui-tile', x, y + 3, tile, tile);
            var node = _this9.make('DeviceHit', x - (cell - tile) / 2, y + 3 - (cell - tile) / 2, cell, cell);
            if (selected || hinted) _this9.panel(x + 4, y + 7, tile - 8, tile - 8, selected ? '#247367' : '#61552B', selected ? C.mint : C.amber, 0);
            _this9.prop(2 + value % 14, x + 1, y + 1, tile - 2);
            if (hinted) _this9.text('★', x + tile - 19, y + 1, 18, 22, 16, C.amber, true);
            _this9.listen(node, function () {
              return _this9.selectOnet(index);
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
          this.text(this.tr(this.status || 'onetInitial'), 32, 710, 416, 54, 20, C.muted, true);
          this.button(this.tr('hintPair'), 27, 792, 132, 56, function () {
            var pair = getOnetHint(_this9.onet);
            if (pair) {
              _this9.hint = [pair.a, pair.b];
              _this9.status = 'onetHint';
              _this9.render();
            }
          });
          this.button(this.tr('shuffle'), 174, 792, 132, 56, function () {
            _this9.onet = reshuffleOnet(_this9.onet);
            _this9.selected = -1;
            _this9.hint = [];
            _this9.connection = [];
            _this9.status = 'onetShuffled';
            _this9.render();
          });
          this.button(this.tr('newBoard'), 321, 792, 132, 56, function () {
            return _this9.startGame('onet', true);
          });
          if (this.onet.remaining === 0) this.result(this.tr('onetWinTitle'), this.tr('onetWinBody'), this.tr('playAgain'), function () {
            return _this9.startGame('onet', true);
          });
        };
        _proto.selectOnet = function selectOnet(index) {
          var _this10 = this;
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
            this.status = 'onetBlocked';
            this.render();
            return;
          }
          this.onet = result.state;
          this.connection = result.path;
          this.selected = -1;
          this.hint = [];
          this.status = 'onetConnected';
          if (this.onet.remaining && !getOnetHint(this.onet)) {
            this.onet = reshuffleOnet(this.onet);
            this.status = 'onetAutoShuffle';
          }
          this.beep(this.onet.remaining === 0 ? 'win' : 'match');
          this.render();
          this.scheduleOnce(function () {
            if (_this10.mode === 'onet') {
              _this10.connection = [];
              _this10.render();
            }
          }, 0.38);
        };
        _proto.renderMemory = function renderMemory() {
          var _this11 = this;
          this.text(this.tr('memoryInstruction'), 28, 145, 424, 54, 20, C.muted);
          this.text(this.tr('memoryProgress', {
            found: this.matched.length / 2,
            total: this.faces.length / 2
          }), 31, 219, 250, 38, 22, C.rose);
          this.text(this.tr('attempts', {
            count: this.memoryTurns
          }), 285, 222, 165, 32, 20, C.muted, true);
          this.timerLabel = this.text(this.preview > 0 ? this.tr('memorize', {
            seconds: Math.ceil(this.preview)
          }) : this.tr(this.memoryLocked ? 'rememberMismatch' : 'yourTurn'), 30, 267, 420, 40, 20, this.preview > 0 ? C.amber : C.muted, true);
          var w = 92,
            h = 112,
            gap = 12,
            x0 = 38,
            y0 = 329;
          this.faces.forEach(function (face, index) {
            var x = x0 + index % 4 * (w + gap),
              y = y0 + Math.floor(index / 4) * (h + gap);
            var matched = _this11.matched.includes(index),
              visible = _this11.preview > 0 || _this11.flipped.includes(index) || matched;
            var node = _this11.image(visible ? 'ui-card-front' : 'ui-card-back', x, y + 4, w, h);
            if (matched) _this11.panel(x + 9, y + 13, w - 18, h - 18, '#17493F', C.mint, 0);
            if (visible) {
              _this11.prop(2 + face, x + 14, y + 10, 64);
              _this11.text(_this11.tr(matched ? 'matched' : ICONS[face]), x + 10, y + 79, w - 20, 26, 16, matched ? C.mint : C.ink, true);
            }
            _this11.listen(node, function () {
              return _this11.selectMemory(index);
            });
          });
          this.text(this.tr('memoryHint'), 30, 720, 420, 55, 20, C.muted, true);
          this.button(this.tr('restartMemory'), 29, 804, 200, 55, function () {
            return _this11.startGame('memory');
          });
          this.button(this.tr('newCards'), 249, 804, 200, 55, function () {
            return _this11.startGame('memory', true);
          }, C.rose);
          if (this.matched.length === this.faces.length) this.result(this.tr('memoryWinTitle'), this.tr('memoryWinBody', {
            count: this.memoryTurns
          }), this.tr('newSet'), function () {
            return _this11.startGame('memory', true);
          });
        };
        _proto.selectMemory = function selectMemory(index) {
          var _this12 = this;
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
                _this12.flipped = [];
                _this12.memoryLocked = false;
                if (_this12.mode === 'memory') _this12.render();
              }, 0.85);
            }
          }
          this.render();
        };
        _proto.renderStack = function renderStack() {
          var _this13 = this;
          this.image('rooftop', 0, 163, 480, 720);
          this.image('ui-panel', 17, 145, 446, 84);
          this.text(this.tr('stackInstruction', {
            target: 8
          }), 47, 158, 386, 57, 20, C.ink);
          this.image('ui-panel', 27, 248, 426, 63);
          this.stackCounter = this.text(this.tr('floorsLabel', {
            floors: this.stack.floors,
            target: 8
          }), 57, 260, 157, 38, 24, C.ink);
          this.text(this.tr('perfectCount', {
            count: this.stack.perfects
          }), 248, 263, 183, 32, 18, C.amber, true);
          this.stackFeedbackLabel = this.text(this.tr(this.stackFeedback || 'stackReady'), 31, 328, 418, 38, 22, C.ink, true);
          var node = this.make('Tower', 0, 0, 480, 900);
          this.stackInk = node.addComponent(Graphics);
          this.drawTower();
          this.button(this.tr(this.stackPause ? 'continueStack' : 'drop'), 39, 749, 402, 66, function () {
            if (_this13.stackPause) {
              _this13.stackPause = false;
              _this13.render();
            } else _this13.drop();
          }, C.amber);
          this.text(this.tr('stackHint'), 28, 840, 424, 29, 18, C.ink, true);
          this.button(this.tr('restart'), 30, 669, 91, 45, function () {
            return _this13.startGame('stack');
          });
          this.button(this.tr(this.stackPause ? 'resume' : 'pause'), 361, 669, 91, 45, function () {
            _this13.stackPause = !_this13.stackPause;
            _this13.render();
          });
          if (this.stack.status === 'won') this.result(this.tr('stackWinTitle'), this.tr('stackWinBody', {
            count: this.stack.perfects
          }), this.tr('stackAgain'), function () {
            return _this13.startGame('stack');
          });
          if (this.stack.status === 'lost') this.result(this.tr('stackLoseTitle'), this.tr('stackLoseBody', {
            floors: this.stack.floors
          }), this.tr('tryAgain'), function () {
            return _this13.startGame('stack');
          }, false);
          if (this.stackPause && this.stack.status === 'playing') {
            this.image('ui-panel', 87, 442, 306, 112);
            this.text(this.tr('pausedTitle'), 113, 462, 254, 40, 24, C.ink, true);
            this.text(this.tr('pausedHint'), 115, 501, 250, 37, 18, C.muted, true);
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
          this.stackFeedback = this.stack.lastDrop === 'perfect' ? 'perfectDrop' : this.stack.lastDrop === 'miss' ? 'nearMiss' : 'goodDrop';
          this.feedbackTime = 1.1;
          this.beep(this.stack.status === 'won' ? 'win' : this.stack.lastDrop === 'perfect' ? 'match' : 'tap');
          this.render();
        };
        _proto.result = function result(title, description, action, fn, success) {
          var _this14 = this;
          if (success === void 0) {
            success = true;
          }
          var shade = this.panel(0, 0, 480, 900, '#08101D', undefined, 0);
          shade.addComponent(UIOpacity).opacity = 215;
          this.listen(shade, function () {});
          this.image('ui-panel', 39, 244, 402, 438);
          this.prop(success ? 10 : 1, 195, 278, 90);
          this.text(title, 60, 373, 360, 51, 28, success ? C.amber : C.ink, true);
          this.text(description, 65, 435, 350, 59, 20, C.muted, true);
          this.button(action, 72, 515, 336, 56, fn, success ? C.amber : C.mint);
          this.button(this.tr('backToLobby'), 145, 594, 190, 50, function () {
            return _this14.home();
          });
        };
        _proto.keyDown = function keyDown(event) {
          var key = event.keyCode;
          if (key === KeyCode.ESCAPE) {
            if (this.languageOpen) {
              this.languageOpen = false;
              this.render();
            } else this.home();
            return;
          }
          if (this.languageOpen) return;
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