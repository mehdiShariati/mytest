import { Component, OnInit } from '@angular/core';
import { FormationService } from '../../../../core/services/formation.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss'],
})
export class OrganizationComponent implements OnInit {
  items!: any;
  totalCount!: number;

  constructor(private formationService: FormationService) {}

  ngOnInit(): void {
    this.formationService.get({ pageNumber: 0, pageSize: 10 }).subscribe((res: any) => {
      this.items = res?.content;
      this.totalCount = res.totalElements;
    });
  }
}
