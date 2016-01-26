import { PropTypes } from 'react'
import { TileLayer as LTileLayer } from 'leaflet'
import { TileLayer } from 'react-leaflet'
import { omit } from 'underscore'
import { join } from 'path'

/*
 * A plugin for native leaflet, which gets tile URLs as data URIs. The data
 * URIs are generated from hex data fetched from an MBTiles database. See the
 * MBTiles spec by Mapbox on GitHub.
 *
 * TODO: Investigate the Leaflet.FunctionalTileLayer plugin, which supports
 * promises.
 */
const LMBTilesLayer = LTileLayer.extend({

  initialize: function(url, options, db) {
    LTileLayer.prototype.initialize.call(this, url, options);
    this.db = db;
  },

  /*
   * Generate a data URI for the tile, and set the tile image tag's src
   * attribute. Note, this implementation goes against the design of getTileUrl,
   * since the data URI generation is asynchronous.
   *
   * The current MBTiles spec, version 1.1, uses a different tile coordinate
   * scheme than is used by leaflet and the OpenStretMap ecosystem. We need
   * to adjust the actual y coordinate when querying MBTiles. Mapbox is planning
   * to update the spec to match the normal coordinate scheme! This will
   * necessitate a change in the future.
   *
   * The data URI is generated in three steps:
   *  1. Get the image blob from sqlite as a hex string with hex()
   *  2. Use a browserified node Buffer to convert hex to base64
   *  3. Append the base64 string to the standard data uri prefix.
   *
   * Also note: the Content-Security-Policy needs to allow `data:`
   */
  getTileUrl: function(tilePoint, tile) {
    const {z, x, y} = tilePoint;
    const mby = Math.pow(2, z) - 1 - y // MBTiles 1.1 adjustment. See spec.

    this.db.executeSql('SELECT hex(tile_data) AS hex FROM tiles WHERE tiles.zoom_level=? AND tiles.tile_column=? AND tiles.tile_row=?', [z, x, mby], result => {
      if (result.rows.length > 0) {
        const hex = result.rows.item(0).hex;
        const b64 = new Buffer(hex, 'hex').toString('base64');
        const url = `data:image/png;base64,${b64}`;
        tile.src = url;
      } else {
        // No tile data found
      }
    }, err => {
      console.error(err);
    });
  },

  /*
   * This normally private tile layer function is overridden so we can pass
   * the tile node into `getTileUrl`. This way, `getTileUrl` can set the new
   * src value on the tile after it is async generated.
   *
   * The code, aside from pasing tile as a second argument to `getTileUrl` is
   * copied verbatim from `_loadTile` in leaflet v0.7.7
   */
  _loadTile: function(tile, tilePoint) {
    tile._layer = this;
    tile.onload = this._tileOnLoad;
    tile.onerror = this._tileOnError;

    this._adjustTilePoint(tilePoint);
    this.src = this.getTileUrl(tilePoint, tile);

    this.fire('tileloadstart', {
      tile: tile,
      url: tile.src
    });
  }
});

/*
 * A react-leaflet component to display an MBTiles database as a tile layer
 */
export default class MBTilesLayer extends TileLayer {
  componentWillMount() {
    super.componentWillMount();

    const { pkg, map, url } = this.props;
    const options = omit(this.props, 'pkg', 'map', 'url');

    const db = sqlitePlugin.openDatabase({
      name: pkg
    });

    this.leafletElement = new LMBTilesLayer(url, options, db);
  }
}
