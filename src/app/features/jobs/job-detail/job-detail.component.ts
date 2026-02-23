import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../../core/services/job.service';
import { Job } from '../../../core/models/job.model';
import { Store } from '@ngrx/store';
import { AuthService } from '../../../core/auth/auth.service';
import * as FavoriteActions from '../../../store/favorites/favorite.actions';
import * as ApplicationActions from '../../../store/applications/application.actions';
import { selectAllFavorites } from '../../../store/favorites/favorite.selectors';
import { Observable, take, map, of } from 'rxjs';
import { Favorite } from '../../../core/models/favorite.model';

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
  job: Job | null | undefined = null;
  isBookmarked$: Observable<boolean> = of(false);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService,
    private store: Store,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.jobService.getJobById(id).subscribe((job: Job | undefined) => {
        this.job = job;
        if (job) {
          this.isBookmarked$ = this.store.select(selectAllFavorites).pipe(
            map(favorites => favorites.some(f => f.offerId === job.id))
          );
        }
      });
    }

    const user = this.authService.getCurrentUser();
    if (user && user.id) {
      this.store.dispatch(FavoriteActions.loadFavorites({ userId: user.id }));
    }
  }

  onFavorite() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/auth/login']);
      return;
    }

    const user = this.authService.getCurrentUser();
    if (!user || !user.id || !this.job) return;

    this.store.select(selectAllFavorites).pipe(take(1)).subscribe(favorites => {
      const existing = favorites.find(f => f.offerId === this.job!.id);
      if (existing) {
        this.store.dispatch(FavoriteActions.removeFavorite({ favoriteId: existing.id }));
      } else {
        this.store.dispatch(FavoriteActions.addFavorite({ job: this.job!, userId: user.id! }));
      }
    });
  }

  onApply(event: Event) {
    if (!this.authService.isAuthenticated()) {
      event.preventDefault();
      this.router.navigate(['/auth/login']);
      return;
    }

    const user = this.authService.getCurrentUser();
    if (!user || !user.id || !this.job) return;

    this.store.dispatch(ApplicationActions.addApplication({ job: this.job, userId: user.id }));
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
