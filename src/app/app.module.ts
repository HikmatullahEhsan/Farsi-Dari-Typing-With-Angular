import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TstdropComponent } from './tstdrop/tstdrop.component';
import { FormsModule } from '@angular/forms';
import { NgxTreeSelectModule, ExpandMode } from 'ngx-tree-select';
import { HomeComponent } from './home/home.component';
import { TestlastComponent } from './testlast/testlast.component';


@NgModule({
  declarations: [
    AppComponent,
    TstdropComponent,
    HomeComponent,
    TestlastComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    NgxTreeSelectModule.forRoot({
      idField: 'id',
      textField: 'name',
      expandMode: ExpandMode.Selection
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { 
}
