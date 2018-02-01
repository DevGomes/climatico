import { PrevisaoUtilsService } from './../services/previsao-utils.service';
import { HttpModule } from '@angular/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevisaoTempoComponent } from './previsao-tempo.component';

describe('PrevisaoTempoComponent', () => {
  let component: PrevisaoTempoComponent;
  let fixture: ComponentFixture<PrevisaoTempoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrevisaoTempoComponent ],
      imports: [
        BrowserModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        HttpModule
      ],
      providers: [ PrevisaoUtilsService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevisaoTempoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
