import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { PrevisaoUtilsService } from '../services/previsao-utils.service';
import * as moment from 'moment';

@Component({
  selector: 'app-previsao-tempo',
  templateUrl: './previsao-tempo.component.html',
  styleUrls: ['./previsao-tempo.component.css']
})
export class PrevisaoTempoComponent implements OnInit {

  private static GEO_ID_ESTADOS_BR = 3469034;
  @ViewChild('inputAutoCompleteCidade') inputAutoCompleteCidade: ElementRef;

  protected estadosBrasilApi = [];
  protected cidadesBrasilApi = [];
  protected estadoSelecionado: string;

  protected filteredOptionsCidades: any;
  protected formulario: FormGroup;
  protected tituloRegiaoPais = '';
  protected temperaturaAtual = '';
  protected tempMinima = '';
  protected tempMaxima = '';
  private validCampos: boolean;
  protected previsaoSemana = [];
  protected iconeFavorito = 'star_border';

  constructor(
    private http: Http,
    private formBuilder: FormBuilder,
    private previsaoTempoService: PrevisaoUtilsService) {
    this.obterEstadosBrasil();
  }

  ngOnInit() {
    this.inicializarFormularioReativo();

    const cidadeFavorito = localStorage.getItem('cidade_favorito');

    if (cidadeFavorito === null) {
      this.iconeFavorito = 'star_border';
      this.obterDadosPrevisaoTempoBr('SC', 'Blumenau');
    } else {
      this.iconeFavorito = 'star_rate';
      this.obterDadosPrevisaoTempoBr(cidadeFavorito.split(',')[1], cidadeFavorito.split(',')[0]);
    }

    console.log(cidadeFavorito);
  }

  private inicializarFormularioReativo(): void {
    this.formulario = this.formBuilder.group({
      estado: [{}, [Validators.required]],
      cidade: [[], [Validators.required]]
    });

    this.formulario.get('cidade').disable();
  }

  private filterCidades(val: string): string[] {
    return this.cidadesBrasilApi.filter(option =>
      option.toponymName.toLocaleLowerCase().indexOf(val.toLowerCase()) === 0
    );
  }

  private obterEstadosBrasil(): any {

    this.previsaoTempoService.obterListaRegiaoGlobal(PrevisaoTempoComponent.GEO_ID_ESTADOS_BR)
      .subscribe((resp) => {
        this.estadosBrasilApi = resp.json().geonames;
      });
  }

  private onBuscarPrevisaoTempo(event): void {
    const cidade = this.formulario.get('cidade').value;
    console.log('Buscar previsão do tempo...');

    this.previsaoTempoService.obterUFEstado(this.formulario.get('estado').value.toponymName)
      .subscribe((uf) => {
        this.obterDadosPrevisaoTempoBr(uf, cidade);
      });
  }

  protected onBuscarCidades(): void {
    this.estadoSelecionado = this.formulario.get('estado').value.geonameId;

    this.formulario.get('cidade').enable();
    this.formulario.get('cidade').setValue('');

    if (this.estadoSelecionado) {
      this.previsaoTempoService.obterListaRegiaoGlobal(Number(this.estadoSelecionado))
        .subscribe((res) => {
          this.cidadesBrasilApi = res.json().geonames;

          this.carregarAutoComplete();
          this.inputAutoCompleteCidade.nativeElement.focus();
        });
    }
  }

  private carregarAutoComplete(): void {
    this.filteredOptionsCidades = this.formulario.get('cidade').valueChanges
      .startWith('')
      .map((val) => {
        return this.filterCidades(val);
      });
  }

  private obterDadosPrevisaoTempoBr(uf: string, cidade: string): any {

    this.previsaoTempoService
      .carregarPrevisaoTempoBr(uf, cidade)
      .subscribe((res) => {
        console.log(res.json().query.results);
        this.showPrevisaoTempo(res.json().query.results.channel);
        return res.json().query.results;
      });
  }

  private showPrevisaoTempo(dadosPrevisaoTempo: any): void {

    this.tituloRegiaoPais = dadosPrevisaoTempo.title.split('-')[1];
    this.temperaturaAtual = dadosPrevisaoTempo.item.condition.temp;
    this.tempMinima = dadosPrevisaoTempo.item.forecast[0].low;
    this.tempMaxima = dadosPrevisaoTempo.item.forecast[0].high;

    this.previsaoSemana = dadosPrevisaoTempo.item.forecast.slice(1, 7);

    console.log(this.previsaoSemana);
  }

  protected formatarDataPt_BR(data: string): string {
    return moment(data).format('llll').split('às')[0];
  }

  verificarCampos(event): void {
    this.validCampos = (this.verificaValidTouched('estado') && this.verificaValidTouched('cidade'));
  }

  verificaValidTouched(campo: string): boolean {
    return this.formulario.get(campo).valid && (this.formulario.get(campo).touched || this.formulario.get(campo).dirty);
  }

  favoritar(): void {

    this.iconeFavorito = (this.iconeFavorito === 'star_border' ? 'star_rate' : 'star_border');

    if (Storage !== undefined) {
      if (this.iconeFavorito === 'star_rate') {
        localStorage.setItem('cidade_favorito', this.tituloRegiaoPais);
      } else {
        localStorage.removeItem('cidade_favorito');
      }
    }

  }
}
