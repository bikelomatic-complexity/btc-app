
export const MBTILES_SERVER = '52.21.125.160:8080';
export const MBTILES_SERVER_ROOT = 'mbtiles';

// TODO: We should store mbtiles downloads in a subdirectory of the persistent
// filesystem, but we got errors doing that before. Maybe we have to create
// the subdirectories first?
//
// TODO: We need to store mbtiles packages in localhost/persistent, but we
// may encounter errors doing that
export const MBTILES_LOCAL_ROOT = 'cdvfile://localhost/temporary';
