import { Routes } from '@angular/router';
import { UserPositionComponent } from './pages/user-position/user-position.component';
import { FeaturesComponent } from './pages/features/features.component';
import { LayersComponent } from './pages/layers/layers.component';
import { GeojsonComponent } from './pages/geojson/geojson.component';
import { DrawingComponent } from './pages/drawing/drawing.component';

export const routes: Routes = [
  {
    path: 'user-position',
    component: UserPositionComponent,
    title: 'User Position',
  },
  {
    path: 'features',
    component: FeaturesComponent,
    title: 'Features',
  },
  {
    path: 'layers',
    component: LayersComponent,
    title: 'Layers',
  },
  {
    path: 'drawing',
    component: DrawingComponent,
    title: 'Drawing',
  },
  {
    path: 'geojson',
    component: GeojsonComponent,
    title: 'Geojson',
  },
];
