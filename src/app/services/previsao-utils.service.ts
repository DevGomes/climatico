import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PrevisaoUtilsService {

    constructor(private http: Http) { }

    public obterListaRegiaoGlobal(geoNameId: number): Observable<any> {
        return this.http.get(`http://www.geonames.org/childrenJSON?geonameId=${geoNameId}`);
    }

    public obterUFEstado(nomeEstado): Observable<any> {
        return this.http.get('assets/dados/estadosbr.json')
            .map((res) => {
                const listEstados = res.json();

                for (const item of listEstados) {
                    if (item.viewValue === nomeEstado) {
                        return item.value;
                    }
                }
            });
    }

    public carregarPrevisaoTempoBr(uf: string, cidade: string): Observable<any> {

        return this.http.get(`
            https://query.yahooapis.com/v1/public/yql?q=select * from
            weather.forecast where woeid in
            (select woeid from geo.places(1) where text='${cidade}, ${uf}') and u='c'&format=json`);

    }

}
