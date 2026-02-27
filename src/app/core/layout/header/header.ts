import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {HEADER_NAVIGATION} from '@shared/constants/headers.constants';
import {HeaderLink} from '@shared/models/header.model';
import {RouterLink} from '@angular/router';
import {LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'layout-header',
  imports: [
    RouterLink,
    LucideAngularModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  protected HEADER_NAVIGATION = signal<HeaderLink[]>(HEADER_NAVIGATION);
}
