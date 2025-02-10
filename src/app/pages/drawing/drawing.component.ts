import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  Signal
} from '@angular/core';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import Map from 'ol/Map';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Draw from 'ol/interaction/Draw';
import Snap from 'ol/interaction/Snap';
import Modify from 'ol/interaction/Modify';
import Style from 'ol/style/Style';
import CircleStyle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import { Type } from 'ol/geom/Geometry';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drawing',
  imports: [CommonModule],
  templateUrl: './drawing.component.html',
  styleUrl: './drawing.component.scss'
})
export class DrawingComponent implements OnInit, OnDestroy {
  data = inject<Signal<Map>>(ROUTER_OUTLET_DATA);

  map!: Map;

  drawLayer = new VectorLayer({
    source: new VectorSource({
      wrapX: false,
    }),
  });

  draw!: Draw;

  snap!: Snap;

  modify!: Modify;

  drawOptions: Array<{
    value: Type;
    label: string;
  }> = [
    { value: 'Point', label: 'Point' },
    { value: 'LineString', label: 'LineString' },
    { value: 'Polygon', label: 'Polygon' },
    { value: 'Circle', label: 'Circle' },
    { value: 'MultiPolygon', label: 'MultiPolygon' },
    { value: 'MultiPoint', label: 'MultiPoint' },
    { value: 'MultiLineString', label: 'MultiLineString' },
    { value: 'GeometryCollection', label: 'GeometryCollection' },
    { value: 'LinearRing', label: 'LinearRing' }
  ];

  currentDrawType: Type = 'Point';

  constructor() {}

  ngOnInit(): void {
    this.map = this.data();

    this.draw = new Draw({
      source: this.drawLayer.getSource() as VectorSource,
      type: this.currentDrawType
    });
    
    this.snap = new Snap({
      source: this.drawLayer.getSource() as VectorSource,
    });
    
    this.modify = new Modify({
      source: this.drawLayer.getSource() as VectorSource,
      style: new Style({
        image: new CircleStyle({
          radius: 10,
          fill: new Fill({color: 'red'}),
        }),
      }),
    });
    
    this.map.addLayer(this.drawLayer);
    this.map.addInteraction(this.draw);
    this.map.addInteraction(this.snap);
    this.map.addInteraction(this.modify);
  }

  changeDrawType(event: Event): void {
    this.currentDrawType = (event.target as HTMLInputElement)?.value as Type;
    this.map.removeInteraction(this.draw);
    this.draw = new Draw({
      source: this.drawLayer.getSource() as VectorSource,
      type: this.currentDrawType,
    });
    this.map.addInteraction(this.draw);
  }

  ngOnDestroy(): void {
    this.map.removeLayer(this.drawLayer);
    this.map.removeInteraction(this.draw);
    this.map.removeInteraction(this.snap);
  }
}