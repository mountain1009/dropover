const ffi = require("ffi-napi");
const ref = require("ref-napi");

// Cocoa文字列型を定義
const NSString = "pointer";

// macOSのネイティブAPIを定義
const Cocoa = ffi.Library(
  "/System/Library/Frameworks/AppKit.framework/AppKit",
  {
    "NSPasteboard.generalPasteboard": ["pointer", []], // NSPasteboardのインスタンスを取得
    "NSPasteboard.pasteboardItems": ["pointer", ["pointer"]], // ペーストボードの内容を取得
    "NSPasteboardItem.stringForType": ["pointer", ["pointer", "pointer"]], // ドラッグされたデータのタイプを取得
  }
);

// 定数: テキストデータのタイプ
const NSStringPboardType = Cocoa.NSPasteboardTypeString;

// テキストデータを取得する関数
function getDraggedText() {
  // NSPasteboardインスタンスを取得
  const pasteboard = Cocoa["NSPasteboard.generalPasteboard"]();

  // ペーストボード内のアイテムを取得
  const items = Cocoa["NSPasteboard.pasteboardItems"](pasteboard);

  if (items.isNull()) {
    console.log("No items found in the pasteboard.");
    return null;
  }

  // アイテムの中からテキストデータを取得
  const draggedText = Cocoa["NSPasteboardItem.stringForType"](
    items,
    NSStringPboardType
  );

  if (!draggedText.isNull()) {
    console.log("Dragged Text:", ref.readCString(draggedText, 0));
    return ref.readCString(draggedText, 0);
  }

  return null;
}

// 関数をエクスポート
module.exports = {
  getDraggedText,
};

/*

// 実装例
  // 一定間隔でドラッグ中のテキストをチェック
  setInterval(() => {
    const draggedText = getDraggedText();
    if (draggedText) {
      // テキストをレンダラープロセスに送信
      win.webContents.send('dragged-text', draggedText);
    }
  }, 1000); //

*/
