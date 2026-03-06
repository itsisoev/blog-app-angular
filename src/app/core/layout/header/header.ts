import {ChangeDetectionStrategy, Component, signal, viewChild} from '@angular/core';
import {HEADER_NAVIGATION} from '@shared/constants/headers.constants';
import {HeaderLink} from '@shared/models/header.model';
import {RouterLink} from '@angular/router';
import {LucideAngularModule} from 'lucide-angular';
import {UiPopup} from '@shared/ui/ui-popup/ui-popup';

@Component({
  selector: 'layout-header',
  imports: [
    RouterLink,
    LucideAngularModule,
    UiPopup
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  popupRef = viewChild<UiPopup>('popup');

  titlePopup = signal<string>("Меню профиля");
  openPopup = signal<boolean>(false);

  protected HEADER_NAVIGATION = signal<HeaderLink[]>(HEADER_NAVIGATION);

  togglePopup(event: MouseEvent): void {
    const isOpen = !this.openPopup();
    this.openPopup.set(isOpen);

    if (isOpen) {
      this.popupRef()?.setPosition(event);
      console.log(event)
    }
  }
}
