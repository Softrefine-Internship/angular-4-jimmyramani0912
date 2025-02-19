import { Component } from '@angular/core';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchKeyword: string = '';
  sortColumn: string = '';
  sortDirection: string = 'asc';

  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(private uService: UserService) {}

  ngOnInit(): void {
    this.uService.fetchUsers();
    this.uService.userEmitter.subscribe((data) => {
      this.users = data.users;
      this.filteredUsers = [...this.users];
    });
  }

  handleSearch() {
    const search = this.searchKeyword.toLowerCase();
    this.filteredUsers = this.users.filter((user) =>
      ['id', 'firstName', 'lastName', 'age', 'email', 'phone'].some((key) =>
        user[key]?.toString().toLowerCase().includes(search)
      )
    );
  }

  handleSort(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.filteredUsers.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  handleSortSelection(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.handleSort(value);
  }

  get paginatedUsers(): any[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredUsers.slice(start, end);
  }

  updatePage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  get totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
  }
}
