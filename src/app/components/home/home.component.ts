// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styles: []
// })
// export class HomeComponent implements OnInit {

//   paises: any[] = [];


//   //Inyectar
//   constructor( private http: HttpClient ) {

//     //Se obtiene todas las propiedades y métodos: peticiones get y más
//     console.log('Constructor del Home hecho');
//     //es una petición que en algún momento alguien se va a suscribir, "paises" es el retorno de la información de la petición
//     this.http.get('https://restcountries.eu/rest/v2/lang/es')
//     .subscribe( (resp: any) => {
//       this.paises = resp;
//       console.log(resp);
//     });
//   }

//   ngOnInit() {
//   }

// }



import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  nuevasCanciones: any[] = [];
  loading: boolean;

  error: boolean;
  mensajeError: string;

  constructor( private spotify: SpotifyService ) {

    this.loading = true;
    this.error = false;

    this.spotify.getNewReleases()
        .subscribe( (data: any) => {
          this.nuevasCanciones = data;
          this.loading = false;
        }, ( errorServicio ) => {
          this.loading = false;
          this.error = true;
          console.log(errorServicio);
          // console.log(errorServicio.error.error.message);

          //error.error.message => Se encuentra en la URL
          this.mensajeError = errorServicio.error.error.message;
        });
  }

  ngOnInit() {
  }

}


