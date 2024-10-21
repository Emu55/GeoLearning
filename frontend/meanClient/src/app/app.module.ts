import { NgModule } from '@angular/core';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateUpdateComponent } from './components/create-update/create-update.component';
import { ListComponent } from './components/list/list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CountryService } from './shared/country.service';
import { FormsModule } from '@angular/forms';
import { StudyComponent } from './components/study/study.component';

// Define your routes
const appRoutes: Routes = [
  { path: '', component: ListComponent },
  { path: 'createUpdate', component: CreateUpdateComponent },
  { path: 'study', component: StudyComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    CreateUpdateComponent,
    ListComponent,
    NavbarComponent,
    StudyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    // Remove `withFetch` if it's causing issues
    provideHttpClient(),
    provideClientHydration(),
    CountryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
