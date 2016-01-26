
/**
 * Adds the appropriate `_attachments` structure to the provided document.
 */
export default function attach(doc, name, content_type, data) {
  return Object.assign({}, doc, {
    _attachments: {
      [fileName]: {
        content_type,
        data
      }
    }
  });
}