import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, RoutesRecognized } from '@angular/router';
import { Layouts } from './core/enums/layouts.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'samava';

  LayoutsEnum = Layouts;
  layout!: Layouts;
  constructor(private router: Router) {}

  // We can't use `ActivatedRoute` here since we are not within a `router-outlet` context yet.
  ngOnInit() {
    this.router.events.subscribe(data => {
      if (data instanceof RoutesRecognized) {
        this.layout = data.state.root.firstChild?.data['layout'] ?? this.layout;
      }
    });
  }
}
