import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { UserFilterComponent } from './user-filter/user-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', component: UserListComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
