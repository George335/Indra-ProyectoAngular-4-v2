import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http: HttpClient) {
    console.log('Spotify service listo')
  }

  getQuery( query: string ) {
    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQCeDmEgJo9PJt6Dy8fYKtXaox_Eh4YpAbBCRfn1mGb1eqJzbOMHS59ZqqjYM1IdJM55ysvralXE6vs_l54'
    });
   
    return this.http.get(url, {headers});
    
  }

  getNewReleases(){
    
    return this.getQuery('browse/new-releases?limit=20')
                .pipe( map( data => data['albums'].items) );
    
  }

  getArtistas( termino: string ){

    return this.getQuery(`search?q=${ termino }&type=artist&offset=0&limit=15`)
                .pipe( map( data => data['artists'].items) );
    
  }

  getArtista( id: string ){

    return this.getQuery(`artists/${ id }`);
                // .pipe( map( data => data['artists'].items) );
    
  }

  getTopTracks( id: string ) {

    return this.getQuery(`artists/${ id }/top-tracks?country=us`)
                .pipe( map( data => data['tracks']));

  }
}
