import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  loading = false;
  successMessage: string | null = null;
  currentUser: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['']
    });
  }

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.currentUser = user;
      this.profileForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      });
    }
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.loading = true;
      this.successMessage = null;
      this.cdr.detectChanges();

      const formValue = this.profileForm.getRawValue();
      const updatedUser: User = {
        ...this.currentUser,
        ...formValue
      };

      if (!formValue.password) {
        delete updatedUser.password;
      }

      this.authService.updateUser(updatedUser).subscribe({
        next: (res) => {
          this.loading = false;
          this.successMessage = "Profile updated successfully!";
          this.currentUser = res;
          this.cdr.detectChanges();

          setTimeout(() => {
            this.successMessage = null;
            this.cdr.detectChanges();
          }, 3000);
        },
        error: (err) => {
          this.loading = false;
          this.cdr.detectChanges();
          console.error('Update failed', err);
          alert('Failed to update profile. Please try again.');
        }
      });
    }
  }

  deleteAccount() {
    if (confirm('Are you strictly sure you want to delete your account? This action is IRREVERSIBLE.')) {
      if (this.currentUser && this.currentUser.id) {
        this.authService.deleteUser(this.currentUser.id).subscribe({
          next: () => {
            this.authService.logout();
          },
          error: (err) => {
            console.error('Deletion failed', err);
            alert('Failed to delete account. Please try again.');
          }
        });
      }
    }
  }
}
