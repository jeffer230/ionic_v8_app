import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './app/core/interceptors/auth.interceptor';
import { ErrorInterceptor } from './app/core/interceptors/error.interceptor';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { Storage } from '@ionic/storage-angular';

// Importa tus reducers y effects
// import { authReducer } from './app/store/auth/auth.reducer';
// import { AuthEffects } from './app/store/auth/auth.effects';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(withInterceptors([AuthInterceptor,ErrorInterceptor])),
    // NgRx Store (agrega reducers)
    provideStore({
      // auth: authReducer
    }),

    // NgRx Effects (agrega tus effects)
    provideEffects([
      // AuthEffects
    ]),

    // Storage Provider
    {
      provide: Storage,
      useFactory: () => {
        const storage = new Storage();
        storage.create();
        return storage;
      },
    }
  ],
});
