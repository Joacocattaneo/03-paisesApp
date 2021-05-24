import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
    li {
      cursor: pointer;
    }
    `
  ]
})
export class PorPaisComponent {

  termino : string = ""
  hayError: boolean = false;
  paises : Country[] = [];

  paisesSugeridos : Country[] = [];
  mostrarSugerecias: boolean = false;

  constructor( private paisService: PaisService ) { } // Inyeccion

  buscar( termino: string ){
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerecias = false;

    this.paisService.buscarPais( termino )
        .subscribe( (paises) => {
          console.log(paises);

          this.paises = paises;

        }, (err) => {
          this.hayError = true;
          this.paises = [];
        });


    console.log(this.termino);
  }

  sugerencias( termino: string ){
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerecias = true;

    this.paisService.buscarPais( termino )
      .subscribe( 
        paises => this.paisesSugeridos = paises.splice(0,5),
        (err) => this.paisesSugeridos = []
      );

  }

  buscarSugerido( termino: string ){
    this.buscar( termino );
    
  }

}
