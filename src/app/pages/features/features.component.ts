import { Component, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import Map from 'ol/Map';
import Feature from 'ol/Feature';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import {
  Circle,
  LineString,
  MultiLineString,
  MultiPoint,
  MultiPolygon,
  Point,
  Polygon,
} from 'ol/geom';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import { Image } from 'ol/source';
import Icon from 'ol/style/Icon';
import Fill from 'ol/style/Fill';

@Component({
  selector: 'app-features',
  imports: [],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss',
})
export class FeaturesComponent implements OnInit, OnDestroy {
  data = inject<Signal<Map>>(ROUTER_OUTLET_DATA);

  map!: Map;

  featuresLayer = new VectorLayer();

  constructor() {}

  ngOnInit(): void {
    this.map = this.data();

    this.map.addLayer(this.featuresLayer);

    const point = new Point([0, 0]);
    point.transform('EPSG:4326', 'EPSG:3857');
    const pointFeature = new Feature({
      geometry: point,
    });

    /* pointFeature.setStyle([
      new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
        image: new Icon({
          src: 'https://openlayers.org/en/latest/examples/data/icon.png',
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          // fraction = długość ikony, a pixels = piksele 
          anchorYUnits: 'pixels',
        }),
      }),
    ]); */

    const line = new LineString([
      [47, -20],
      [45, -60],
    ]);
    line.transform('EPSG:4326', 'EPSG:3857');
    const lineStringFeature = new Feature({
      geometry: line,
    });
    lineStringFeature.setStyle([
      new Style({
        stroke: new Stroke({
          color: 'red',
          width: 5,
        }),
      }),
    ]);

    const polygon = new Polygon([
      [
        [0, 0],
        [10, 10],
        [10, 0],
        [0, 0],
      ],
    ]);
    polygon.transform('EPSG:4326', 'EPSG:3857');
    const polygonFeature = new Feature({
      geometry: polygon,
    });

    const multiPoint = new MultiPoint([
      [0, 0],
      [10, 10],
      [10, 0],
    ]);
    multiPoint.transform('EPSG:4326', 'EPSG:3857');
    const multiPointFeature = new Feature({
      geometry: multiPoint,
    });

    const multiLineString = new MultiLineString([
      [
        [0, 0],
        [10, 10],
      ],
      [
        [20, 20],
        [30, 30],
      ],
    ]);
    multiLineString.transform('EPSG:4326', 'EPSG:3857');
    const multiLineStringFeature = new Feature({
      geometry: multiLineString,
    });

    const multiPolygon = new MultiPolygon([
      [
        [
          [0, 0],
          [10, 10],
          [10, 0],
          [0, 0],
        ],
      ],
      [
        [
          [20, 20],
          [30, 30],
          [30, 20],
          [20, 20],
        ],
      ],
    ]);
    multiPolygon.transform('EPSG:4326', 'EPSG:3857');
    const multiPolygonFeature = new Feature({
      geometry: multiPolygon,
    });

    const circle = new Circle([0, 0], 10);
    circle.transform('EPSG:4326', 'EPSG:3857');
    const circleFeature = new Feature({
      geometry: circle,
    });

    const source = new VectorSource({
      features: [
        pointFeature,
        lineStringFeature,
        polygonFeature,
        multiPointFeature,
        multiLineStringFeature,
        multiPolygonFeature,
        circleFeature,
      ],
    });

    this.featuresLayer.setSource(source);
  }

  ngOnDestroy(): void {
    this.map.removeLayer(this.featuresLayer);
  }
}
