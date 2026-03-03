import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Application } from '../../../core/models/application.model';
import { selectAllApplications, selectApplicationsLoading } from '../../../store/applications/application.selectors';
import { loadApplications, removeApplication, updateApplication } from '../../../store/applications/application.actions';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {
  applications$: Observable<Application[]>;
  loading$: Observable<boolean>;
  showDeleteModal = false;
  deleteTargetId: number | null = null;

  constructor(private store: Store) {
    this.applications$ = this.store.select(selectAllApplications);
    this.loading$ = this.store.select(selectApplicationsLoading);
  }

  ngOnInit(): void {
    const user = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    if (user && user.id) {
      this.store.dispatch(loadApplications({ userId: user.id }));
    }
  }

  setStatus(app: Application, status: 'pending' | 'accepted' | 'rejected') {
    if (app.id && app.status !== status) {
      const updated = { ...app, status };
      this.store.dispatch(updateApplication({ application: updated }));
    }
  }

  openDeleteModal(id: number) {
    this.deleteTargetId = id;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.deleteTargetId = null;
  }

  confirmDelete() {
    if (this.deleteTargetId != null) {
      this.store.dispatch(removeApplication({ applicationId: this.deleteTargetId }));
    }
    this.closeDeleteModal();
  }
}

