import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Package } from '../../core/models/package.model';

@Component({
  selector: 'app-package-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './package-card.component.html',
})
export class PackageCardComponent {
  @Input({ required: true }) package!: Package;
}
