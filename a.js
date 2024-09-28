const koffi = require("koffi");

// Define NSString as a pointer type
const NSString = koffi.pointer("void");

// Define macOS native APIs using koffi
const Cocoa = koffi.load("/System/Library/Frameworks/AppKit.framework/AppKit");

// Declare functions from the Cocoa framework
const NSPasteboardGeneralPasteboard = Cocoa.func(
  "pointer NSPasteboard.generalPasteboard()"
);
const NSPasteboardPasteboardItems = Cocoa.func(
  "pointer NSPasteboard.pasteboardItems(pointer)"
);
const NSPasteboardItemStringForType = Cocoa.func(
  "pointer NSPasteboardItem.stringForType(pointer, pointer)"
);

// Text data type constant
const NSStringPboardType = Cocoa.constant("NSPasteboardTypeString", NSString);

// Function to get the dragged text
function getDraggedText() {
  // Get NSPasteboard instance
  const pasteboard = NSPasteboardGeneralPasteboard();

  // Get items from the pasteboard
  const items = NSPasteboardPasteboardItems(pasteboard);

  if (items.isNull()) {
    console.log("No items found in the pasteboard.");
    return null;
  }

  // Get text data from the items
  const draggedText = NSPasteboardItemStringForType(items, NSStringPboardType);

  if (!draggedText.isNull()) {
    const text = koffi.readCString(draggedText, 0);
    console.log("Dragged Text:", text);
    return text;
  }

  return null;
}

// Export the function
module.exports = {
  getDraggedText,
};
