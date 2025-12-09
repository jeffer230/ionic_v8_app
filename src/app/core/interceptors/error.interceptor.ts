import { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ocurrió un error inesperado';

      if (error.status === 0) {
        errorMessage = 'No hay conexión con el servidor';
      } else if (error.status === 401) {
        errorMessage = 'No autorizado, por favor inicia sesión';
      } else if (error.status === 403) {
        errorMessage = 'Acceso denegado';
      } else if (error.status === 404) {
        errorMessage = 'Recurso no encontrado';
      } else if (error.status >= 500) {
        errorMessage = 'Error interno del servidor';
      }

      console.error(`HTTP Error ${error.status}: ${errorMessage}`);
      return throwError(() => new Error(errorMessage));
    })
  );
};

