import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const storage = inject(Storage);

  return from(storage.get('token')).pipe(
    mergeMap((token: string | null) => {
      let clonedReq = req;

      if (token) {
        clonedReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
      }

      return next(clonedReq);
    })
  );
};