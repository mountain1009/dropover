const koffi = require("koffi");

// Load macOS native APIs using koffi
const Cocoa = koffi.load("/System/Library/Frameworks/AppKit.framework/AppKit");

// Declare functions from the Cocoa framework
const NSPasteboardGeneralPasteboard = Cocoa.func(
  "void* NSPasteboard.generalPasteboard()"
);
const NSPasteboardPasteboardItems = Cocoa.func(
  "void* NSPasteboard.pasteboardItems(void*)"
);
const NSPasteboardItemStringForType = Cocoa.func(
  "void* NSPasteboardItem.stringForType(void*, const char*)"
);

// Text data type constant
const NSStringPboardType = koffi.cstr("NSStringPboardType");

// Function to get the dragged text
function getDraggedText() {
  // Get NSPasteboard instance
  const pasteboard = NSPasteboardGeneralPasteboard();

  if (!pasteboard) {
    console.log("Failed to retrieve the pasteboard.");
    return null;
  }

  // Get items from the pasteboard
  const items = NSPasteboardPasteboardItems(pasteboard);

  if (!items) {
    console.log("No items found in the pasteboard.");
    return null;
  }

  // Get text data from the items
  const draggedText = NSPasteboardItemStringForType(items, NSStringPboardType);

  if (draggedText) {
    const text = koffi.cstr(draggedText);
    console.log("Dragged Text:", text);
    return text;
  }

  return null;
}

// Export the function
module.exports = {
  getDraggedText,
};
