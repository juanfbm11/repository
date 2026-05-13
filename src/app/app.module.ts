import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./template/header/header.component";
import { FooterComponent } from "./template/footer/footer.component";
import { FormsModule } from "@angular/forms";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from "@angular/common/http";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { AdminComponent } from "./admin/admin.component";
import { MockInterceptor } from "./interceptors/mock.interceptor";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,   
    LoginComponent,
    HomeComponent,
    AdminComponent
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SweetAlert2Module.forRoot(),
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()), 
    { provide: HTTP_INTERCEPTORS, useClass: MockInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
