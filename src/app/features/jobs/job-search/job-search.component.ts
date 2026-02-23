import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { JobSearchCriteria } from '../../../core/models/job.model';

@Component({
  selector: 'app-job-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.css']
})
export class JobSearchComponent {
  @Output() search = new EventEmitter<JobSearchCriteria>();
  searchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      query: [''],
      location: ['']
    });
  }

  onSearch() {
    this.search.emit(this.searchForm.value);
  }

  quickSearch(term: string) {
    if (['Remote', 'Berlin'].includes(term)) {
      this.searchForm.patchValue({ location: term, query: '' });
    } else {
      this.searchForm.patchValue({ query: term, location: '' });
    }
    this.onSearch();
  }
}
