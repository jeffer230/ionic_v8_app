import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { NgIf } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports:[NgIf, IonicModule, ReactiveFormsModule]
})
export class LoginPage {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastController = inject(ToastController);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  async presentToast(message: string, color: string = 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
    });
    await toast.present();
  }

  async login() {
    if (this.loginForm.invalid) {
      this.presentToast('Por favor, completa todos los campos.');
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: async (response) => {
        await this.authService.saveToken(response.token);
        this.router.navigate(['/home']); // Redirige a Home tras login exitoso
      },
      error: () => {
        this.presentToast('Credenciales incorrectas.');
      },
    });
  }
}
