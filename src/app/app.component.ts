import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    private static GEO_ID_ESTADOS_BR = 3469034;
    protected estadosBrasilApi = [];
    protected cidadesBrasilApi = [];
    protected estadoSelecionado: string;

    protected cidadeComplete: FormControl;
    filteredOptions: any;
    myControl: FormControl = new FormControl();
    options = ['One', 'Two', 'Three'];
    private formulario: FormGroup;



    constructor(private http: Http, private formBuilder: FormBuilder) {
        this.obterEstadosBrasil();
    }

    ngOnInit() {
        // this.filteredOptions = this.myControl.valueChanges
        //     .startWith('')
        //     .map(val => this.filter(val));

        this.formulario = this.formBuilder.group({
            estado: [{}, [Validators.required]],
            cidade: [[], [Validators.required]]
        });

        this.formulario.get('cidade').disable();

        // this.cidadeComplete = new FormControl();
        // this.filteredOptions = this.formulario.get('cidade')
        //     .valueChanges
        //     .startWith('')
        //     .map(val => this.filter(val));

    }


    // filter(val: string): string[] {
    //     return this.cidadesBrasilApi.filter(option =>
    //         option.toLowerCase().indexOf(val.toLowerCase()) === 0);
    // }

    filter(val: string): string[] {
        return this.cidadesBrasilApi.filter(option =>
            option.toponymName.toLocaleLowerCase().indexOf(val.toLowerCase()) === 0
        );
     }

    private obterEstadosBrasil(): any {
        
        this.obterListaRegiaoGlobal(AppComponent.GEO_ID_ESTADOS_BR)
            .subscribe((resp) => {
                this.estadosBrasilApi = resp.json().geonames;
            });
    }

    protected buscarCidades(): void {
        this.estadoSelecionado = this.formulario.get('estado').value;
        
        this.formulario.get('cidade').enable();
        this.formulario.get('cidade').setValue('');

        if (this.estadoSelecionado) {
            this.obterListaRegiaoGlobal(Number(this.estadoSelecionado))
                .subscribe((res) => {
                    this.cidadesBrasilApi = res.json().geonames;
                    console.log(this.cidadesBrasilApi);
                    // debugger;
                    this.filteredOptions =  this.formulario.get('cidade').valueChanges
                        .startWith('')
                        .map((val) => {
                            return this.filter(val);
                        });
                });
        }
    }

    private obterListaRegiaoGlobal(geoNameId: number): Observable<any> {
        return this.http.get(`http://www.geonames.org/childrenJSON?geonameId=${geoNameId}`);
    }
}
