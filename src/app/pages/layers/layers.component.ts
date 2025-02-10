import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  Signal
} from '@angular/core';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import Map from 'ol/Map';
import Feature from 'ol/Feature';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { Point } from 'ol/geom';
import { MatList, MatListItem } from '@angular/material/list';
import { MatInput, MatInputModule } from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgFor } from '@angular/common';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import CircleStyle from 'ol/style/Circle';
import LayerGroup from 'ol/layer/Group';
import Layer from 'ol/layer/Layer';
import { Source } from 'ol/source';
import LayerRenderer from 'ol/renderer/Layer';
import { transform } from 'ol/proj';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-layers',
  imports: [MatList, MatListItem, MatCheckboxModule, NgFor, MatInput,  MatFormFieldModule, MatInputModule],
  templateUrl: './layers.component.html',
  styleUrl: './layers.component.scss'
})
export class LayersComponent  implements OnInit, OnDestroy {
  data = inject<Signal<Map>>(ROUTER_OUTLET_DATA);

  map!: Map;

  layerA = new VectorLayer({
    properties: {
      name: 'Layer A',
    },
    source: new VectorSource({
      features: [
        new Feature({
          geometry: new Point(transform([-10, 0], 'EPSG:4326', 'EPSG:3857')),
        }),
      ]
    }),
    style: new Style({
      image: new CircleStyle({
        radius: 70,
        fill: new Fill({color: 'red'})
      })
    })
  });

  layerB = new VectorLayer({
    properties: {
      name: 'Layer B',
    },
    source: new VectorSource({
      features: [
        new Feature({
          geometry: new Point(transform([10, 0], 'EPSG:4326', 'EPSG:3857')),
        }),
      ],
    }),
    style: new Style({
      image: new CircleStyle({
        radius: 80,
        fill: new Fill({color: 'green'})
      })
    })
  });

  layers = new LayerGroup({
    layers: [this.layerA, this.layerB]
  })

  constructor() {}

  ngOnInit(): void {
    this.map = this.data();
    this.map.addLayer(this.layers);
  }

  toggleLayerVisibility(layer: Layer<Source, LayerRenderer<any>>): void {
    layer.setVisible(!layer.getVisible());
  }

  changeLayerZIndex(layer: Layer<Source, LayerRenderer<any>>, event: any): void {
    layer.setZIndex(Number(event?.target?.value));
  }

  ngOnDestroy(): void {
    this.map.removeLayer(this.layers);
  }
}
