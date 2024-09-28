const koffi = require("koffi");

// Define NSString as a 'void*' type
const NSString = koffi.typedef("void*", "NSString");

// Load the Cocoa framework
const Cocoa = koffi.load("/System/Library/Frameworks/AppKit.framework/AppKit");

// Declare functions from the Cocoa framework
const NSPasteboardGeneralPasteboard = Cocoa.func(
  "void* NSPasteboard.generalPasteboard()"
);
const NSPasteboardPasteboardItems = Cocoa.func(
  "void* NSPasteboard.pasteboardItems(void*)"
);
const NSPasteboardItemStringForType = Cocoa.func(
  "void* NSPasteboardItem.stringForType(void*, void*)"
);

// Text data type constant
const NSStringPboardType = NSString; // Assuming NSStringPboardType is NSString; adjust this as necessary

// Function to get the dragged text
function getDraggedText() {
  // Get NSPasteboard instance
  const pasteboard = NSPasteboardGeneralPasteboard();

  // Get items from the pasteboard
  const items = NSPasteboardPasteboardItems(pasteboard);

  if (!items) {
    console.log("No items found in the pasteboard.");
    return null;
  }

  // Get text data from the items
  const draggedText = NSPasteboardItemStringForType(items, NSStringPboardType);

  if (draggedText) {
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
