import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-information',
  templateUrl: './card-information.component.html',
  styleUrls: ['./card-information.component.scss'],
})
export class CardInformationComponent {
  newGroup: boolean = false;
  newRole: boolean = false;
  @Input() userInfo!: any;
}
