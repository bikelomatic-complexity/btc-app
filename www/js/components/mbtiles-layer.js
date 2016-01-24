import { PropTypes } from 'react';
import L from 'leaflet';
import {TileLayer} from 'react-leaflet';
import {omit} from 'underscore';
import blobUtil from 'blob-util';

import {
  MBTILES_SERVER,
  MBTILES_SERVER_ROOT,
  MBTILES_LOCAL_ROOT
} from '../config'


L.MBTilesLayer = L.TileLayer.extend({
  initialize: function(url, options, db) {
    L.TileLayer.prototype.initialize.call(this, url, options);
    this.db = sqlitePlugin.openDatabase({
      name: 'usbr20.mbtiles',
      location: 2,
      createFromLocation: 1
    });
    window.db = this.db;
  },

  getTileUrl: function(tilePoint, tile) {
    const {z, x, y} = tilePoint;
    const mby = Math.pow(2, z) - 1 - y // MBTiles expects adjusted an y

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

export default class MBTilesLayer extends TileLayer {
  componentWillMount() {
    super.componentWillMount();

    const { pkg, map, url } = this.props;
    const options = omit(this.props, 'pkg', 'map', 'url');

    const target = `${MBTILES_LOCAL_ROOT}/${pkg}`;
    const db = sqlitePlugin.openDatabase({
      name: target,
      location: 2,
      createFromLocation: 1
    })

    this.leafletElement = new L.MBTilesLayer(url, options, db);
  }
}
