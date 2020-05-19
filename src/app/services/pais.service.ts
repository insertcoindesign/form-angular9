import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor( private http: HttpClient) { }


  getCountry() {

    return this.http.get('https://restcountries.eu/rest/v2/lang/es')
      .pipe(
        map( (resp:any[]) =>
            resp.map( country => ({ nombre: country.name, codigo: country.alpha3Code })
          )
        )
       );

  }

}
