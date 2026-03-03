import {
  ChangeDetectionStrategy,
  Component, DestroyRef,
  ElementRef,
  HostListener, inject,
  input,
  model,
  signal,
} from '@angular/core';

@Component({
  selector: 'ui-popup',
  imports: [],
  templateUrl: './ui-popup.html',
  styleUrl: './ui-popup.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiPopup {
  private readonly el = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  titlePopup = input<string>('Заголовок popup');
  openPopup = model<boolean>(false);

  position = signal<{ top: number; left: number }>({ top: 0, left: 0 });

  private readonly POPUP_MIN_WIDTH = 220;
  private readonly POPUP_OFFSET = 8;
  private readonly SCREEN_PADDING = 8;

  private justOpened = false;
  private destroyed = false;

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.destroyed = true;
    });
  }

  setPosition(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();

    this.position.set({ top: -9999, left: -9999 });
    this.openPopup.set(true);

    setTimeout(() => {
      if (this.destroyed) return;

      const popupEl = this.el.nativeElement.querySelector('.popup');
      const popupHeight = popupEl?.offsetHeight ?? 150;
      const popupWidth = popupEl?.offsetWidth ?? this.POPUP_MIN_WIDTH;

      const spaceBelow = window.innerHeight - rect.bottom;
      const showAbove = spaceBelow < popupHeight + this.POPUP_OFFSET;

      const top = showAbove
        ? rect.top + window.scrollY - popupHeight - this.POPUP_OFFSET
        : rect.bottom + window.scrollY + this.POPUP_OFFSET;

      let left = rect.left + window.scrollX;
      const maxLeft = window.innerWidth - popupWidth - this.SCREEN_PADDING;
      if (left > maxLeft) {
        left = Math.max(this.SCREEN_PADDING, rect.right + window.scrollX - popupWidth);
      }

      this.position.set({ top, left });
      this.justOpened = false;
    }, 0);

    this.justOpened = true;
  }

  close(): void {
    this.openPopup.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.openPopup()) return;
    if (this.justOpened) return;

    const target = event.target as HTMLElement;
    const popupEl = this.el.nativeElement.querySelector('.popup');

    if (popupEl && !popupEl.contains(target)) {
      this.close();
    }
  }
}
