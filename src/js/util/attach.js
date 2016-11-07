import objectAssign from 'object-assign';

/**
 * Adds the appropriate `_attachments` structure to the provided document.
 */
export default function attach( doc, name, content_type, data ) {
  return objectAssign( {}, doc, {
    _attachments: { [name]: { content_type, data } }
  } );
}
