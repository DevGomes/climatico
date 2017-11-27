import { PrevisaoUtilsService } from './services/previsao-utils.service';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent  {

    constructor() {}
}
