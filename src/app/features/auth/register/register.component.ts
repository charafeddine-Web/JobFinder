import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div class="max-w-md w-full animate-fade-in">
        <!-- Header -->
        <div class="text-center mb-10">
           <div class="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-100 mb-6 transform rotate-6">
              <svg class="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
           </div>
           <h1 class="text-3xl font-black text-slate-900 tracking-tight">Create your account</h1>
           <p class="text-slate-500 font-medium mt-2">Join thousands of professionals finding their dream jobs</p>
        </div>

        <div class="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-indigo-100 border border-slate-100">
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-5">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="firstName" class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">First Name</label>
                <input id="firstName" type="text" formControlName="firstName" 
                  class="block w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50/50 transition-all font-medium" 
                  placeholder="Jane">
              </div>
              <div>
                <label for="lastName" class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Last Name</label>
                <input id="lastName" type="text" formControlName="lastName" 
                  class="block w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50/50 transition-all font-medium" 
                  placeholder="Doe">
              </div>
            </div>

            <div>
              <label for="email" class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Email Address</label>
              <div class="relative group">
                <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input id="email" type="email" formControlName="email" 
                  class="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50/50 transition-all font-medium" 
                  placeholder="jane.doe@example.com">
              </div>
            </div>

            <div>
              <label for="password" class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Password</label>
              <div class="relative group">
                <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input id="password" type="password" formControlName="password" 
                  class="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50/50 transition-all font-medium" 
                  placeholder="At least 6 characters">
              </div>
            </div>

            <div *ngIf="errorMessage" class="p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl text-sm font-bold animate-fade-in flex items-center gap-3">
               <svg class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
               {{ errorMessage }}
            </div>

            <button type="submit" [disabled]="registerForm.invalid || isLoading" 
              class="w-full flex justify-center items-center py-4 px-6 border border-transparent text-base font-black rounded-2xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100">
              <span *ngIf="!isLoading">Create free account</span>
              <div *ngIf="isLoading" class="flex items-center gap-2">
                 <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                 Processing...
              </div>
            </button>
            
            <div class="text-center pt-2">
              <p class="text-slate-500 font-medium text-sm">
                Already have an account? 
                <a routerLink="/auth/login" class="font-bold text-indigo-600 hover:text-indigo-700 hover:underline decoration-2 underline-offset-4 transition-all">Sign in here</a>
              </p>
            </div>
          </form>
        </div>
        
        <p class="text-center mt-8 text-xs text-slate-400 font-medium px-6">
           By creating an account, you agree to our <a href="#" class="underline">Terms of Service</a> and <a href="#" class="underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  `
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = null;
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.message || 'Registration failed';
        }
      });
    }
  }
}
