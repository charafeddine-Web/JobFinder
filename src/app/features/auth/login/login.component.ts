import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-6 relative overflow-hidden selection:bg-orange-500 selection:text-white">
      <!-- Background Decorative Elements -->
      <div class="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-orange-100/40 rounded-full blur-[120px] animate-float"></div>
      <div class="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-amber-100/40 rounded-full blur-[100px] animate-float" style="animation-delay: 2s"></div>
      
      <div class="max-w-md w-full animate-fade-in relative z-10">
        <!-- Logo / Branding -->
        <div class="text-center mb-10">
           <div class="inline-flex items-center justify-center w-16 h-16 bg-orange-600 rounded-2xl shadow-xl shadow-orange-100 mb-6 transform -rotate-6">
              <svg class="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
           </div>
           <h1 class="text-3xl font-black text-slate-900 tracking-tight">Welcome back</h1>
           <p class="text-slate-500 font-medium mt-2">Enter your credentials to access your account</p>
        </div>

        <div class="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-orange-100 border border-slate-100">
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <div class="space-y-4">
              <div>
                <label for="email" class="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                <div class="relative group">
                  <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-orange-600 transition-colors">
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input id="email" type="email" formControlName="email" 
                    class="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-orange-600 focus:ring-4 focus:ring-orange-50/50 transition-all font-medium" 
                    placeholder="name@company.com">
                </div>
              </div>

              <div>
                <div class="flex items-center justify-between mb-2 ml-1">
                   <label for="password" class="block text-xs font-black text-slate-400 uppercase tracking-widest">Password</label>
                   <a href="#" class="text-xs font-bold text-orange-600 hover:text-orange-700">Forgot?</a>
                </div>
                <div class="relative group">
                  <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-orange-600 transition-colors">
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input id="password" type="password" formControlName="password" 
                    class="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-orange-600 focus:ring-4 focus:ring-orange-50/50 transition-all font-medium" 
                    placeholder="••••••••">
                </div>
              </div>
            </div>

            <div *ngIf="errorMessage" class="p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl text-sm font-bold animate-fade-in flex items-center gap-3">
               <svg class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
               {{ errorMessage }}
            </div>

            <button type="submit" [disabled]="loginForm.invalid || isLoading" 
              class="w-full flex justify-center items-center py-4 px-6 border border-transparent text-base font-black rounded-2xl text-white bg-orange-600 hover:bg-orange-700 shadow-xl shadow-orange-100 transition-all active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100">
              <span *ngIf="!isLoading">Sign in to account</span>
              <div *ngIf="isLoading" class="flex items-center gap-2">
                 <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                 Authenticating...
              </div>
            </button>
            
            <div class="text-center pt-2">
              <p class="text-slate-500 font-medium">
                New to JobFinder? 
                <a routerLink="/auth/register" class="font-bold text-orange-600 hover:text-orange-700 hover:underline decoration-2 underline-offset-4 transition-all">Create an account</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = null;
      this.cdr.detectChanges();

      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: () => {
          this.isLoading = false;
          this.cdr.detectChanges();
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.message || 'Login failed. Please verify credentials.';
          this.cdr.detectChanges();
        }
      });
    }
  }
}
