import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  Signal,
} from '@angular/core';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import Map from 'ol/Map';
import CircleStyle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import Geolocation from 'ol/Geolocation';
import Feature from 'ol/Feature';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { Point } from 'ol/geom';

const baseUserFeatureStyle = new Style({
  image: new CircleStyle({
    radius: 6,
    fill: new Fill({
      color: '#3399CC',
    }),
    stroke: new Stroke({
      color: '#fff',
      width: 2,
    }),
  }),
});

/**
 * rzeczy do prezentacji:
 * - najpierw wszystko w ngOnInit, prezentacja nieporpawnego lokalizowania po routingu
 */
@Component({
  selector: 'app-user-position',
  imports: [],
  templateUrl: './user-position.component.html',
  styleUrl: './user-position.component.scss',
})
export class UserPositionComponent implements OnInit, OnDestroy {
  data = inject<Signal<Map>>(ROUTER_OUTLET_DATA);

  map!: Map;

  positionFeature = new Feature();
  accuracyFeature = new Feature();

  positionLayer = new VectorLayer({
    source: new VectorSource({
      features: [this.positionFeature, this.accuracyFeature],
    }),
  });
  
  geolocation = new Geolocation({
    trackingOptions: {
      enableHighAccuracy: true,
    },
    tracking: true,
  });

  constructor() {}

  ngOnInit(): void {
    this.map = this.data();

    this.geolocation.setProjection(this.map.getView().getProjection());

    this.positionFeature.setStyle(baseUserFeatureStyle);

    this.geolocation.on('change:accuracyGeometry', () => {
      // @ts-ignore
      this.accuracyFeature.setGeometry(this.geolocation.getAccuracyGeometry());
    });

    this.geolocation.on('change:position', () => {
      const coordinates = this.geolocation.getPosition();

      this.positionFeature.setGeometry(
        // @ts-ignore
        coordinates ? new Point(coordinates) : null
      );
    });

    this.map.addLayer(this.positionLayer);
  }

  ngOnDestroy(): void {
    this.map.removeLayer(this.positionLayer);
    this.geolocation.dispose();
  }
}
