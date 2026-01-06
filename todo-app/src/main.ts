import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { TodoComponent } from './app/todo/components/todo/todo.component';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
