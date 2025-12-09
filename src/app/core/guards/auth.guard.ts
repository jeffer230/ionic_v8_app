import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

export const AuthGuard: CanActivateFn = async (route, state) => {
  const storage = inject(Storage);
  const router = inject(Router);

  const token = await storage.get('token');

  if (!token) {
    router.navigate(['/login']); // Redirige al login si no hay token
    return false;
  }

  return true;
};
