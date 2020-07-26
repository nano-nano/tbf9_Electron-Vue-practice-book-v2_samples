'use strict'

import { app, protocol, BrowserWindow, ipcMain, dialog } from 'electron'
import {
  createProtocol,
  installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'
import SettingsFileUtils from './utils/SettingsFileUitls'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })
  createProjectionWindow()
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installVueDevtools()
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

ipcMain.handle('showFileSelectDialog', (event, data) => {
  return dialog.showOpenDialogSync({
    title: "問題ファイルを選択",
    filters: [{ name: "問題ファイル(Excel)", extensions: [".xlsx", ".xls"] }]
  })
})

// 問題投影ウィンドウ制御
let projectionWin = null

async function createProjectionWindow() {
  const settingsFile = await getSettingsFile()
  // ウィンドウインスタンスを生成
  projectionWin = new BrowserWindow({
    x: settingsFile.pjWinX,
    y: settingsFile.pjWinY,
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  // 投影用画面を直接開くようURLを設定
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    projectionWin.loadURL(process.env.WEBPACK_DEV_SERVER_URL + '#/pj')
  } else {
    projectionWin.loadURL('app://./index.html#/pj')
  }
  projectionWin.on('closed', () => {
    projectionWin = null
    // 投影用ウィンドウに連動してアプリ自体も終了する
    app.quit()
  })
}

ipcMain.handle('operationProjection', (event, data) => {
  if (projectionWin != null) {
    projectionWin.webContents.send('operationProjection', data)
  }
})

function getSettingsFile() {
  // Windowsの場合は C:\Users\【ユーザー名】\AppData\Roaming\【パッケージ名】
  // Macの場合は /Users/【ユーザー名】/Library/Application Support/【パッケージ名】 を返す
  const basePath = app.getPath('userData')
  return SettingsFileUtils.loadSettingsFile(basePath)
    .then(data => {
      return data
    })
    .catch(() => {
      return {pjWinX: 0, pjWinY: 0}
    })
}

ipcMain.handle('getSettingsFile', (event, data) => {
  return getSettingsFile()
})

ipcMain.handle('saveSettingsFile', (event, data) => {
  console.log(data)
  const basePath = app.getPath('userData')
  return SettingsFileUtils.saveSettingsFile(basePath, data).then(() => {
    if (projectionWin != null) {
      // 表示中の投影用ウィンドウにも適用する
      projectionWin.setBounds({x: data.pjWinX, y: data.pjWinY})
      return true
    }
  })
})