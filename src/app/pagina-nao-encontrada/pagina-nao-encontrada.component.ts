import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-pagina-nao-encontrada',
    templateUrl: './pagina-nao-encontrada.component.html',
    styleUrls: ['./pagina-nao-encontrada.component.css']
})
export class PaginaNaoEncontradaComponent implements OnInit {

    constructor(public route: Router) { }

    ngOnInit() {
        setTimeout(() => {
            this.route.navigate(['/home']);
        }, 5000);
    }

}
