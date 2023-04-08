import { Component } from '@angular/core';
import { OrganizationService } from '../../../../core/services/organization.service';

@Component({
  selector: 'app-structures',
  templateUrl: './structures.component.html',
  styleUrls: ['./structures.component.scss'],
})
export class StructuresComponent {
  items!: any;
  totalCount!: number;

  constructor(private organizationService: OrganizationService) {}

  ngOnInit(): void {
    this.organizationService.get({ pageNumber: 0, pageSize: 10 }).subscribe((res: any) => {
      this.items = res?.content;
      this.totalCount = res.totalElements;
    });
  }
}
