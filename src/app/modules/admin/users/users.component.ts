import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { TableContainerComponent } from '../../../shared/components/table-container/table-container.component';
import { AdminServiceService } from '../../../core/services/admin-service/admin-service.service';
import { Author } from '../../../shared/models/authorModel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatTableModule, MatPaginator, MatPaginatorModule, TableContainerComponent, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})

export class UsersComponent implements OnInit, AfterViewInit {

  constructor(private adminService: AdminServiceService){}

  displayedColumns: string[] = ['name', 'email', 'role'];
  dataSource = new MatTableDataSource<Author[]>();
  loading:boolean = false;
  page:number = 1;
  limit:number = 5;

  ngOnInit(): void {
    this.getUsers()
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit():void {
    this.dataSource.paginator = this.paginator;
  }

  getUsers(page=this.page, limit=this.limit) {
    this.loading = true;
    this.adminService.getAllAuthors( page, limit).subscribe({
      next:(data: any) => {
        this.dataSource = data.data
        // this.displayedColumns = ['name', 'email', 'role']
        this.paginator.length = data.count
      },
      error: (error) => {
        alert("Something went wrong!")
      },
      complete: () => {
        this.loading = false;
      },
    })
  }

  onPageChange(event: PageEvent) {
    this.getUsers(event.pageIndex+1, event.pageSize)
  }

}
