import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [MatListModule, RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  public navItems = [
    {
      title: 'Base',
      route: ''
    },
    {
      title: 'Features',
      route: 'features',
    },
    {
      title: 'Layers',
      route: 'layers',
    },
    {
      title: 'User position',
      route: 'user-position',
    },
    {
      title: 'Geojson',
      route: 'geojson',
    },
    {
      title: 'Drawing',
      route: 'drawing',
    }
  ];
}
