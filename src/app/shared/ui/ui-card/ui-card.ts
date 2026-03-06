import {ChangeDetectionStrategy, Component, input} from '@angular/core';

@Component({
  selector: 'ui-card',
  imports: [],
  templateUrl: './ui-card.html',
  styleUrl: './ui-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiCard {
  title = input<string>('Название статьи');
  image = input<string>('assets/image/not-image.png');
  username = input<string>('Имя пользователя');
  description = input<string>('Описание статьи');
  date = input<string>('20.08.2020');
}
