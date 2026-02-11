import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';
import { User } from '../../../core/models/user.model'; // Need to update user model if needed, currently reusing auth model

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
    <div class="max-w-2xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div class="md:flex md:items-center md:justify-between">
        <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          My Profile
        </h2>
      </div>

      <form [formGroup]="profileForm" (ngSubmit)="onSubmit()" class="mt-6 space-y-6 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div class="grid grid-cols-6 gap-6">
          <div class="col-span-6 sm:col-span-3">
            <label for="firstName" class="block text-sm font-medium text-gray-700">First name</label>
            <input type="text" formControlName="firstName" id="firstName" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
          </div>

          <div class="col-span-6 sm:col-span-3">
            <label for="lastName" class="block text-sm font-medium text-gray-700">Last name</label>
            <input type="text" formControlName="lastName" id="lastName" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
          </div>

          <div class="col-span-6 sm:col-span-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
            <input type="email" formControlName="email" id="email" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
          </div>
          
           <div class="col-span-6 sm:col-span-4">
            <label for="password" class="block text-sm font-medium text-gray-700">New Password (leave blank to keep current)</label>
            <input type="password" formControlName="password" id="password" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
          </div>
        </div>
        
        <div *ngIf="successMessage" class="rounded-md bg-green-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <!-- Check icon -->
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-green-800">{{ successMessage }}</p>
            </div>
          </div>
        </div>

        <div class="flex justify-end">
          <button type="submit" [disabled]="profileForm.invalid || loading" class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            {{ loading ? 'Saving...' : 'Save' }}
          </button>
        </div>
      </form>
      
       <div class="mt-10 border-t border-gray-200 pt-10">
        <h3 class="text-lg leading-6 font-medium text-gray-900">Delete Account</h3>
        <div class="mt-2 max-w-xl text-sm text-gray-500">
          <p>Once you delete your account, you will list all of your data. This action cannot be undone.</p>
        </div>
        <div class="mt-5">
          <button type="button" (click)="deleteAccount()" class="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  `
})
export class ProfileComponent implements OnInit {
    profileForm: FormGroup;
    loading = false;
    successMessage: string | null = null;
    currentUser: any; // Ideally typed

    constructor(
        private fb: FormBuilder,
        private authService: AuthService // Need updateProfile method?
    ) {
        this.profileForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['']
        });
    }

    ngOnInit(): void {
        const user = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
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
            const updatedUser = { ...this.currentUser, ...this.profileForm.value };
            if (!updatedUser.password) delete updatedUser.password; // Don't send empty password

            // We need an update method in AuthService
            // this.authService.updateUser(updatedUser).subscribe(...)
            // For now mocking success
            setTimeout(() => {
                this.loading = false;
                this.successMessage = "Profile updated successfully (Mock)";
                sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));
            }, 1000);
        }
    }

    deleteAccount() {
        if (confirm('Are you strictly sure you want to delete your account?')) {
            // this.authService.deleteUser(this.currentUser.id)...
            this.authService.logout();
        }
    }
}
