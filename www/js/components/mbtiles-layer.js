import { PropTypes } from 'react';
import L from 'leaflet';
import {TileLayer} from 'react-leaflet';
import {omit} from 'underscore';
import blobUtil from 'blob-util';

L.MBTilesLayer = L.TileLayer.extend({
  initialize: function(url, options, db) {
    L.TileLayer.prototype.initialize.call(this, url, options);
    // this.db = db
    this.db = sqlitePlugin.openDatabase({
      // name: 'usbr20.mbtiles',
      name: 'usbr20.mbtiles',
      location: 2,
      createFromLocation: 1
    });
    window.db = this.db;
  },

  getTileUrl: function(tilePoint, tile) {
    // const z = this._getOffsetZoom(zoom);
    const {z, x, y} = tilePoint;
    const mby = Math.pow(2, z) - 1 - y // MBTiles expects adjusted y

    const base64 = 'blob:';

    this.db.executeSql('SELECT zoom_level, tile_column, tile_row, tile_data, hex(tile_data) AS hexData FROM tiles WHERE tiles.zoom_level=? AND tiles.tile_column=? AND tiles.tile_row=? LIMIT 10', [z, x, mby], result => {
      console.log([z, x, y], [z, x, mby]);
      if (result.rows.length > 0) {
        const hexData = result.rows.item(0).hexData;
        const base64String = new Buffer(hexData, 'hex').toString('base64');
        // console.log('>>> ' + base64String);

        // const binary = result.rows.item(0).tile_data;
        //
        // // console.log(blob);
        // // blobUtil.createObjectURL(blob);
        // const blob = blobUtil.createBlob([binary], {type: 'image/png'});
        //
        // const reader = new FileReader();
        // reader.onload = e => {
        //   console.log(e.target.result);
        //   console.log(reader.result);
        //   tile.src = reader.result;
        // };
        // reader.readAsDataURL(blob);
        //


        // const url = blobUtil.createObjectURL(blob);
        // console.log(url);
        // tile.src = url;

        const dataUri = 'data:image/png;base64,' + base64String;
        console.log(dataUri);
        tile.src = dataUri;
      } else {
        console.log("No Blob!");
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

console.log(TileLayer);

export default class MBTilesLayer extends TileLayer {
  componentWillMount() {
    super.componentWillMount();

    const { map, url } = this.props;
    const options = omit(this.props, 'map', 'url');

    this.leafletElement = new L.MBTilesLayer(url, options);
  }
}
