const {app, BrowserWindow, Menu} = require('electron');
let mainWindow, aboutWindow;

function createAbout() {
  if (aboutWindow) {
    aboutWindow.show();
    return;
  }
  aboutWindow = new BrowserWindow({
    width: 260,
    height: 340,
    titleBarStyle: 'hidden',
    minimizable: false,
    maximizable: false,
    resizable: false
  });

  aboutWindow.loadURL(`file://${__dirname}/about.html`);
  //aboutWindow.webContents.openDevTools();
  aboutWindow.on('closed', function () {
    aboutWindow = null;
  });
  var handleRedirect = (e, url) => {
    if(url != aboutWindow.webContents.getURL()) {
      e.preventDefault()
      require('electron').shell.openExternal(url);
    }
  }

  aboutWindow.webContents.on('will-navigate', handleRedirect);
  aboutWindow.webContents.on('new-window', handleRedirect);
}

function createWindow() {
  const template = [
    {
      label: '파일',
      submenu: [
        {
          label: '새 트윗'
        },
        {
          label: '새 쪽지'
        },
        {
          type: 'separator'
        },
        {
          label: '사용자 보기'
        },
        {
          type: 'separator'
        },
        {
          label: '새로 고침'
        },
        {
          label: '모두 새로 고침'
        },
        {
          label: '실시간 스트리밍'
        },
        {
          type: 'separator'
        },
        {
          label: '닫기'
        }
      ]
    },
    {
      label: '수정',
      submenu: [
        {
          label: '실행 취소',
          role: 'undo'
        },
        {
          label: '다시 실행',
          role: 'redo'
        },
        {
          type: 'separator'
        },
        {
          label: '자르기',
          role: 'cut'
        },
        {
          label: '복사하기',
          role: 'copy'
        },
        {
          label: '붙이기',
          role: 'paste'
        },
        {
          label: '붙여넣고 스타일 맞추기',
          role: 'pasteandmatchstyle'
        },
        {
          label: '삭제',
          role: 'delete'
        },
        {
          label: '전체 선택',
          role: 'selectall'
        }
      ]
    },
    {
      label: '트윗',
      submenu: [
        {
          label: '보내기'
        },
        {
          type: 'separator'
        },
        {
          label: '답글'
        },
        {
          label: '마음에 들어요'
        },
        {
          label: '리트윗하기...'
        },
        {
          label: '트윗 인용하기...'
        },
        {
          label: '사용자 정보'
        },
        {
          label: '쪽지'
        },
        {
          type: 'separator'
        },
        {
          label: '트윗 삭제...'
        },
        {
          label: '차단하기...'
        },
        {
          label: '뮤트하기...'
        },
        {
          label: '신고하기...'
        },
        {
          type: 'separator'
        },
        {
          label: '트윗 복사하기'
        },
        {
          label: '트윗 링크 복사하기'
        },
        {
          type: 'separator'
        },
        {
          label: '모두 읽음으로 표시'
        },
        {
          type: 'separator'
        },
        {
          label: '트윗 세부정보 보기'
        },
        {
          label: '트윗 항목 메뉴...'
        },
      ]
    },
    {
      label: '창',
      //role: 'window',
      submenu: [
        {
          label: '최소화',
          role: 'minimize'
        },
        {
          label: '닫기',
          role: 'close'
        }
      ]
    },
    {
      label: '도움말',
      role: 'help',
      submenu: [
        {
          label: '카스텔라 홈페이지',
          click () { require('electron').shell.openExternal('https://github.com/sokcuri/castella') }
        }
      ]
    }
  ]

  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        {
          label: '카스텔라 정보',
          click() { createAbout() }
        },
        {
          type: 'separator'
        },
        {
          label: '환경설정...'
        },
        {
          type: 'separator'
        },
        {
          label: '캐시 비우기'
        },
        {
          type: 'separator'
        },
        {
          label: '서비스',
          role: 'services',
          submenu: []
        },
        {
          type: 'separator'
        },
        {
          label: '카스텔라 숨기기',
          role: 'hide'
        },
        {
          label: '기타 항목 숨기기',
          role: 'hideothers'
        },
        {
          label: '모두 보기',
          role: 'unhide'
        },
        {
          type: 'separator'
        },
        {
          label: '카스텔라 종료',
          role: 'quit'
        }
      ]
    })
    // 수정 메뉴
    template[2].submenu.push(
      {
        type: 'separator'
      },
      {
        label: '말하기',
        submenu: [
          {
            label: '말하기 시작',
            role: 'startspeaking'
          },
          {
            label: '말하기 중단',
            role: 'stopspeaking'
          }
        ]
      }
    )
    // 창 메뉴
    template[4].submenu = [
      {
        label: '최소화',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize'
      },
      {
        label: '확대/축소',
        role: 'zoom'
      },
      {
        type: 'separator'
      },
      {
        label: '모두 앞으로 가져오기',
        role: 'front'
      },
      {
        label: '전체 화면 시작'
      }
    ]
  }

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)



  mainWindow = new BrowserWindow({
    minWidth: 365,
    minHeight: 365,
    width: 800,
    height: 600,
    titleBarStyle: 'hidden-inset',
    zoomToPageWidth: true,
    fullscreenable: false
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);
app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null)
    createWindow();
});

app.on('browser-window-focus', function (e, win) {
  win.webContents.executeJavaScript(`document.body.classList.remove('deactivated');document.body.classList.add('activated');`);
});

app.on('browser-window-blur', function (e, win) {
  win.webContents.executeJavaScript(`document.body.classList.remove('activated');document.body.classList.add('deactivated');`);
});