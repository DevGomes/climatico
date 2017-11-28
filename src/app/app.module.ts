import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';

import { AppComponent } from './app.component';
import { PrevisaoUtilsService } from './services/previsao-utils.service';
import { PrevisaoTempoComponent } from './previsao-tempo/previsao-tempo.component';
import * as moment from 'moment';

moment.locale('pt-br');


@NgModule({
  declarations: [
    AppComponent,
    PrevisaoTempoComponent,
    PaginaNaoEncontradaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule
  ],
  providers: [PrevisaoUtilsService],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
    console.log(moment(1316116057189).fromNow());
    console.log(moment('Wed 29 Dec 2017').format('llll').split('às')[0]);
  }
}
