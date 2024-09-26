const { app, BrowserWindow } = require("electron");
const path = require("path");

// ネイティブモジュール（ffi-napiで実装したもの）をインポート
const { getDraggedFiles } = require("./getDraggedFiles"); // 上記のコードをgetDraggedFiles.jsとして保存

let win;

app.on("ready", () => {
  win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile("index.html");

  // ドラッグ中のファイルを定期的に取得
  setInterval(() => {
    const files = getDraggedFiles();
    console.log("Dragged files:", files);
    // 必要に応じてレンダラープロセスにデータを送信
    win.webContents.send("dragged-files", files);
  }, 1000); // 1秒ごとにチェック
});
