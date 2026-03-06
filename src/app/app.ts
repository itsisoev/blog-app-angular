import {Component} from '@angular/core';
import {Header} from '@core/layout/header/header';
import {RouterOutlet} from '@angular/router';
import {UiCard} from '@shared/ui/ui-card/ui-card';

@Component({
  selector: 'app-root',
  imports: [
    Header,
    RouterOutlet,
    UiCard
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
