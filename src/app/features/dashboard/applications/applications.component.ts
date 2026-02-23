import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Application } from '../../../core/models/application.model';
import { selectAllApplications, selectApplicationsLoading } from '../../../store/applications/application.selectors';
import { loadApplications, removeApplication, updateApplication } from '../../../store/applications/application.actions';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {
  applications$: Observable<Application[]>;
  loading$: Observable<boolean>;

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

  updateStatus(app: Application) {
    if (app.id) {
      this.store.dispatch(updateApplication({ application: app }));
    }
  }

  updateNotes(app: Application) {
    if (app.id) {
      this.store.dispatch(updateApplication({ application: app }));
    }
  }

  deleteApp(id: number) {
    if (confirm('Are you sure?')) {
      this.store.dispatch(removeApplication({ applicationId: id }));
    }
  }
}

