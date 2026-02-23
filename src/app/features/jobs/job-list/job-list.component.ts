import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Job } from '../../../core/models/job.model';
import { Favorite } from '../../../core/models/favorite.model';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnChanges {
  @Input() jobs: Job[] = [];
  @Input() favorites: Favorite[] = [];
  @Output() favorite = new EventEmitter<Job>();
  @Output() apply = new EventEmitter<Job>();

  currentPage = 1;
  itemsPerPage = 10;
  paginatedJobs: Job[] = [];

  constructor(public authService: AuthService, private router: Router) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['jobs']) {
      this.currentPage = 1;
      this.updatePagination();
    }
  }

  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedJobs = this.jobs.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.jobs.length / this.itemsPerPage);
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
      const listContainer = document.querySelector('app-job-list');
      if (listContainer) {
        listContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  getVisiblePages(): number[] {
    const delta = 2;
    const range: number[] = [];
    for (let i = Math.max(2, this.currentPage - delta); i <= Math.min(this.totalPages - 1, this.currentPage + delta); i++) {
      range.push(i);
    }

    if (this.currentPage - delta > 2) {
      range.unshift(-1);
    }
    if (this.currentPage + delta < this.totalPages - 1) {
      range.push(-1);
    }

    range.unshift(1);
    if (this.totalPages > 1) {
      range.push(this.totalPages);
    }

    if (this.totalPages <= 7) {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    } else {
      let start = Math.max(1, this.currentPage - 2);
      let end = Math.min(this.totalPages, start + 4);

      if (end - start < 4) {
        start = Math.max(1, end - 4);
      }

      const pages = [];
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    }
  }

  onFavorite(event: Event, job: Job) {
    if (!this.authService.isAuthenticated()) {
      event.preventDefault();
      this.router.navigate(['/auth/login']);
      return;
    }
    this.favorite.emit(job);
  }

  onApply(event: Event, job: Job) {
    if (!this.authService.isAuthenticated()) {
      event.preventDefault();
      this.router.navigate(['/auth/login']);
      return;
    }
    this.apply.emit(job);
  }

  protectedAction(event: Event) {
    if (!this.authService.isAuthenticated()) {
      event.preventDefault();
      this.router.navigate(['/auth/login']);
    }
  }

  isFavorite(jobId: string): boolean {
    return this.favorites.some(f => f.offerId === jobId);
  }

  isNewJob(job: Job): boolean {
    const postedDate = new Date(job.datePosted);
    const now = new Date();
    const daysDiff = Math.floor((now.getTime() - postedDate.getTime()) / (1000 * 60 * 60 * 24));
    return daysDiff <= 7;
  }
}
