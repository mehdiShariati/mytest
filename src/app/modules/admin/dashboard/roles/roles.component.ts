import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../../../core/services/role.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  roles!: any;
  totalCount!: number;

  constructor(private roleService: RoleService) {}

  ngOnInit(): void {
    this.roleService.getRoles({ pageNumber: 0, pageSize: 10 }).subscribe((res: any) => {
      this.roles = res?.content;
      this.totalCount = res.totalElements;
    });
  }
}
