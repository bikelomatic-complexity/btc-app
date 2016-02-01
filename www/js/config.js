
import path from 'path'

export const MBTILES_SERVER = 's3.amazonaws.com/track-tile-packages';
export const MBTILES_SERVER_ROOT = 'mbtiles';

// TODO: We should store mbtiles downloads in a subdirectory of the persistent
// filesystem, but we got errors doing that before. Maybe we have to create
// the subdirectories first?
//
// TODO: We need to store mbtiles packages in localhost/persistent, but we
// may encounter errors doing that
export const MBTILES_LOCAL_ROOT = 'cdvfile://localhost/temporary';

export const COUCHDB_REMOTE_SERVER = 'http://52.3.58.165:5984/points';

/*
 * Returns a promise that resolves with an absolute path that can be used
 * to store a sqlite database in just the right location for use with
 * cordova-plugin-sqlite.
 *
 * We are able to use cdvfile paths to store our sqlite databases in
 * a platform compatible way. However, the cordova-plugin-sqlite plugin is
 * not able to open dbs at arbitrary cdvfile paths. We could extend
 * cordova-plugin-sqlite to accept arbitrary cdvfile paths, but for now we
 * have this hack.
 *
 * This only works with android right now!
 */
export function hackDatabasePath() {
  return new Promise((resolve, reject) => {
    resolveLocalFileSystemURL('cdvfile://localhost/temporary/', entry => {
      const cachePath = entry.toURL();
      const parent = path.dirname(cachePath);

      resolve(path.join(parent, 'databases'));
    }, error => {
      const err = 'ERROR: `hackDatabasePath` ' + error;
      console.error(err);

      reject(err);
    });
  });
}
