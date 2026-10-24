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
        lobbyTagline: 'Four missions. Sharpen your edge.',
        readyTasks: '● Ready / 04 tasks',
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
        level5: 'Triple Relay'
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
          lobbyTagline: '四项任务，磨炼你的黑客技巧。',
          readyTasks: '● 节点就绪 / 04 任务',
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
          level5: '三芯调度'
        },
        ja: {
          appTitle: 'Cyber Heist · ハッカー訓練',
          canvasLabel: 'Cyber Heist ミニゲーム訓練',
          loadingTitle: 'ネットワークに接続中',
          loadingHint: '訓練モジュールを読み込み中…',
          loadFailed: '接続できません',
          reloadHint: 'ページを再読み込みしてください。',
          lobbyTitle: 'ハッカー訓練',
          lobbyTagline: '4つの任務で腕を磨こう。',
          readyTasks: '● 接続完了 / 04 任務',
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
          level5: '3つの中継'
        },
        ko: {
          appTitle: 'Cyber Heist · 해커 훈련',
          canvasLabel: 'Cyber Heist 미니게임 훈련',
          loadingTitle: '네트워크에 연결 중',
          loadingHint: '훈련 모듈을 불러오는 중…',
          loadFailed: '연결 실패',
          reloadHint: '페이지를 새로고침해 주세요.',
          lobbyTitle: '해커 훈련장',
          lobbyTagline: '네 가지 임무로 실력을 키우세요.',
          readyTasks: '● 접속 완료 / 임무 04',
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
          level5: '세 코어 배치'
        },
        fr: {
          appTitle: 'Cyber Heist · Entraînement',
          canvasLabel: 'Mini-jeux de Cyber Heist',
          loadingTitle: 'Connexion au réseau',
          loadingHint: 'Chargement des modules…',
          loadFailed: 'Échec de connexion',
          reloadHint: 'Rechargez la page pour réessayer.',
          lobbyTitle: 'Zone de test',
          lobbyTagline: 'Quatre missions pour vous affûter.',
          readyTasks: '● 04 missions',
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
          newBoard: 'Grille neuve',
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
          level5: 'Trois relais'
        },
        de: {
          appTitle: 'Cyber Heist · Trainingsnetz',
          canvasLabel: 'Cyber Heist Minispiel-Training',
          loadingTitle: 'Netzverbindung läuft',
          loadingHint: 'Trainingsmodule werden geladen…',
          loadFailed: 'Verbindung fehlgeschlagen',
          reloadHint: 'Lade die Seite neu und versuche es erneut.',
          lobbyTitle: 'Trainingsnetz',
          lobbyTagline: 'Vier Missionen. Schärfe deine Sinne.',
          readyTasks: '● 04 Missionen',
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
          level5: 'Drei Relais'
        },
        es: {
          appTitle: 'Cyber Heist · Zona de práctica',
          canvasLabel: 'Minijuegos de Cyber Heist',
          loadingTitle: 'Conectando a la red',
          loadingHint: 'Cargando módulos de práctica…',
          loadFailed: 'Error de conexión',
          reloadHint: 'Recarga la página para intentarlo.',
          lobbyTitle: 'Zona de práctica',
          lobbyTagline: 'Cuatro misiones. Afina tus reflejos.',
          readyTasks: '● 04 misiones',
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
          level5: 'Triple enlace'
        },
        pt: {
          appTitle: 'Cyber Heist · Área de treino',
          canvasLabel: 'Minijogos de Cyber Heist',
          loadingTitle: 'Conectando à rede',
          loadingHint: 'Carregando módulos de treino…',
          loadFailed: 'Falha na conexão',
          reloadHint: 'Recarregue a página para tentar.',
          lobbyTitle: 'Área de treino',
          lobbyTagline: 'Quatro missões. Afie suas habilidades.',
          readyTasks: '● Online / 04 missões',
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
          level5: 'Relé triplo'
        },
        ru: {
          appTitle: 'Cyber Heist · Тренировка',
          canvasLabel: 'Мини-игры Cyber Heist',
          loadingTitle: 'Подключение к сети',
          loadingHint: 'Загрузка учебных модулей…',
          loadFailed: 'Ошибка подключения',
          reloadHint: 'Обновите страницу и попробуйте снова.',
          lobbyTitle: 'Тренировочная сеть',
          lobbyTagline: 'Четыре задания. Отточите навыки.',
          readyTasks: '● В сети / 04 задания',
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
          level5: 'Три реле'
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

System.register("chunks:///_virtual/main", ['./PrototypeApp.ts', './memory.ts', './onet.ts', './random.ts', './sokoban.ts', './stack.ts', './i18n.ts'], function () {
  return {
    setters: [null, null, null, null, null, null, null],
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

System.register("chunks:///_virtual/PrototypeApp.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './sokoban.ts', './onet.ts', './memory.ts', './stack.ts', './i18n.ts'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, profiler, Node, UITransform, AudioSource, sys, input, Input, game, Game, resources, Font, ImageAsset, Texture2D, SpriteFrame, Graphics, Color, Label, Sprite, UIOpacity, Vec3, tween, KeyCode, AudioClip, Component, SOKOBAN_LEVELS, createSokoban, isSokobanWon, moveSokoban, createOnet, getOnetHint, reshuffleOnet, removeOnetPair, createMemory, advanceStack, createStack, dropStack, resolveLocale, formatNumber, translate, LOCALES, DEFAULT_LOCALE;
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
        stack: 'stackTitle'
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
                resolve();
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
          if (this.mode === 'stack' && this.stack.status === 'playing') {
            this.stackPause = true;
            this.render();
          }
        };
        _proto.update = function update(dt) {
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
          if (this.mode === 'sokoban') this.renderSokoban();
          if (this.mode === 'onet') this.renderOnet();
          if (this.mode === 'memory') this.renderMemory();
          if (this.mode === 'stack') this.renderStack();
        };
        _proto.renderLobby = function renderLobby() {
          var _this4 = this;
          this.image('rooftop', 0, -250, 480, 720);
          this.panel(0, 0, 480, 152, C.bg, undefined, 0).addComponent(UIOpacity).opacity = 228;
          this.text('CYBER HEIST   /   SANDBOX 04', 26, 22, 428, 26, 16, C.mint);
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
          }];
          cards.forEach(function (card, i) {
            var x = 24 + i % 2 * 222,
              y = 423 + Math.floor(i / 2) * 174;
            var node = _this4.image('ui-panel', x, y, 210, 159);
            _this4.prop(card.icon, x + 13, y + 10, 65);
            _this4.text("0" + (i + 1), x + 153, y + 17, 39, 32, 20, card.tint, true);
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
          this.mode = mode;
          this.status = null;
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
            this.stackFeedback = null;
            this.feedbackTime = 0;
            this.offcut = null;
          }
          this.beep('tap');
          this.render();
        };
        _proto.home = function home() {
          this.unscheduleAllCallbacks();
          this.mode = 'lobby';
          this.languageOpen = false;
          this.render();
        };
        _proto.header = function header() {
          var _this6 = this;
          this.button(this.tr('back'), 20, 21, 91, 46, function () {
            return _this6.home();
          });
          this.text('CYBER HEIST / TRAINING', 118, 24, 245, 40, 16, C.mint, true);
          this.button(this.tr(this.muted ? 'mute' : 'sound'), 372, 21, 87, 46, function () {
            _this6.muted = !_this6.muted;
            _this6.render();
          });
          this.text(this.tr(TITLES[this.mode]), 27, 91, 426, 49, 28);
        };
        _proto.renderSokoban = function renderSokoban() {
          var _this7 = this;
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
            _this7.touchOrigin = {
              x: p.x,
              y: p.y
            };
          });
          surface.on(Node.EventType.TOUCH_END, function (e) {
            if (!_this7.touchOrigin) return;
            var p = e.getUILocation(),
              dx = p.x - _this7.touchOrigin.x,
              dy = p.y - _this7.touchOrigin.y;
            _this7.touchOrigin = null;
            if (Math.max(Math.abs(dx), Math.abs(dy)) < 14) return;
            _this7.move(Math.abs(dx) > Math.abs(dy) ? Math.sign(dx) : 0, Math.abs(dy) >= Math.abs(dx) ? -Math.sign(dy) : 0);
          });
          surface.on(Node.EventType.TOUCH_CANCEL, function () {
            _this7.touchOrigin = null;
          });
          this.button(this.tr('undo'), 28, 730, 99, 53, function () {
            return _this7.undo();
          });
          this.button(this.tr('restart'), 28, 812, 99, 51, function () {
            return _this7.startGame('sokoban');
          });
          this.button('↑', 306, 701, 65, 54, function () {
            return _this7.move(0, -1);
          }, C.amber);
          this.button('←', 224, 781, 65, 54, function () {
            return _this7.move(-1, 0);
          });
          this.button('↓', 306, 781, 65, 54, function () {
            return _this7.move(0, 1);
          });
          this.button('→', 388, 781, 65, 54, function () {
            return _this7.move(1, 0);
          });
          this.text(this.tr('controlHint'), 143, 854, 310, 27, 18, C.muted, true);
          if (isSokobanWon(s)) this.result(this.tr('sokobanWinTitle'), this.tr('sokobanWinBody', {
            moves: s.moves
          }), this.tr('nextLevel'), function () {
            return _this7.startGame('sokoban', true);
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
          var _this8 = this;
          this.text(this.tr('onetInstruction'), 28, 145, 424, 54, 20, C.muted);
          this.text(this.tr('remainingPairs', {
            count: this.onet.remaining / 2
          }), 32, 219, 230, 38, 22, C.mint);
          this.text(this.tr('matrixLabel'), 277, 222, 172, 30, 18, C.muted, true);
          var cell = 68,
            tile = 63,
            x0 = 37,
            y0 = 291;
          this.image('ui-panel', 17, 271, 446, 438);
          this.onet.board.forEach(function (value, index) {
            if (value === null) return;
            var x = x0 + index % _this8.onet.cols * cell,
              y = y0 + Math.floor(index / _this8.onet.cols) * cell;
            var selected = _this8.selected === index,
              hinted = _this8.hint.includes(index);
            _this8.image('ui-tile', x, y + 3, tile, tile);
            var node = _this8.make('DeviceHit', x - (cell - tile) / 2, y + 3 - (cell - tile) / 2, cell, cell);
            if (selected || hinted) _this8.panel(x + 4, y + 7, tile - 8, tile - 8, selected ? '#247367' : '#61552B', selected ? C.mint : C.amber, 0);
            _this8.prop(2 + value % 14, x + 1, y + 1, tile - 2);
            if (hinted) _this8.text('★', x + tile - 19, y + 1, 18, 22, 16, C.amber, true);
            _this8.listen(node, function () {
              return _this8.selectOnet(index);
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
            var pair = getOnetHint(_this8.onet);
            if (pair) {
              _this8.hint = [pair.a, pair.b];
              _this8.status = 'onetHint';
              _this8.render();
            }
          });
          this.button(this.tr('shuffle'), 174, 792, 132, 56, function () {
            _this8.onet = reshuffleOnet(_this8.onet);
            _this8.selected = -1;
            _this8.hint = [];
            _this8.connection = [];
            _this8.status = 'onetShuffled';
            _this8.render();
          });
          this.button(this.tr('newBoard'), 321, 792, 132, 56, function () {
            return _this8.startGame('onet', true);
          });
          if (this.onet.remaining === 0) this.result(this.tr('onetWinTitle'), this.tr('onetWinBody'), this.tr('playAgain'), function () {
            return _this8.startGame('onet', true);
          });
        };
        _proto.selectOnet = function selectOnet(index) {
          var _this9 = this;
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
            if (_this9.mode === 'onet') {
              _this9.connection = [];
              _this9.render();
            }
          }, 0.38);
        };
        _proto.renderMemory = function renderMemory() {
          var _this10 = this;
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
            var matched = _this10.matched.includes(index),
              visible = _this10.preview > 0 || _this10.flipped.includes(index) || matched;
            var node = _this10.image(visible ? 'ui-card-front' : 'ui-card-back', x, y + 4, w, h);
            if (matched) _this10.panel(x + 9, y + 13, w - 18, h - 18, '#17493F', C.mint, 0);
            if (visible) {
              _this10.prop(2 + face, x + 14, y + 10, 64);
              _this10.text(_this10.tr(matched ? 'matched' : ICONS[face]), x + 10, y + 79, w - 20, 26, 16, matched ? C.mint : C.ink, true);
            }
            _this10.listen(node, function () {
              return _this10.selectMemory(index);
            });
          });
          this.text(this.tr('memoryHint'), 30, 720, 420, 55, 20, C.muted, true);
          this.button(this.tr('restartMemory'), 29, 804, 200, 55, function () {
            return _this10.startGame('memory');
          });
          this.button(this.tr('newCards'), 249, 804, 200, 55, function () {
            return _this10.startGame('memory', true);
          }, C.rose);
          if (this.matched.length === this.faces.length) this.result(this.tr('memoryWinTitle'), this.tr('memoryWinBody', {
            count: this.memoryTurns
          }), this.tr('newSet'), function () {
            return _this10.startGame('memory', true);
          });
        };
        _proto.selectMemory = function selectMemory(index) {
          var _this11 = this;
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
                _this11.flipped = [];
                _this11.memoryLocked = false;
                if (_this11.mode === 'memory') _this11.render();
              }, 0.85);
            }
          }
          this.render();
        };
        _proto.renderStack = function renderStack() {
          var _this12 = this;
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
            if (_this12.stackPause) {
              _this12.stackPause = false;
              _this12.render();
            } else _this12.drop();
          }, C.amber);
          this.text(this.tr('stackHint'), 28, 840, 424, 29, 18, C.ink, true);
          this.button(this.tr('restart'), 30, 669, 91, 45, function () {
            return _this12.startGame('stack');
          });
          this.button(this.tr(this.stackPause ? 'resume' : 'pause'), 361, 669, 91, 45, function () {
            _this12.stackPause = !_this12.stackPause;
            _this12.render();
          });
          if (this.stack.status === 'won') this.result(this.tr('stackWinTitle'), this.tr('stackWinBody', {
            count: this.stack.perfects
          }), this.tr('stackAgain'), function () {
            return _this12.startGame('stack');
          });
          if (this.stack.status === 'lost') this.result(this.tr('stackLoseTitle'), this.tr('stackLoseBody', {
            floors: this.stack.floors
          }), this.tr('tryAgain'), function () {
            return _this12.startGame('stack');
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
          var _this13 = this;
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
            return _this13.home();
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