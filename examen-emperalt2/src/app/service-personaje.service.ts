import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personaje, PersonajeNuevo } from './interfaces/personaje.interface';

@Injectable({
  providedIn: 'root'
})
export class ServicePersonajeService {

  constructor(private http:HttpClient) { }

   getPersonaje():Observable<Personaje []>{ 
    return this.http.get<Personaje []>('http://bp-marvel-api.herokuapp.com/marvel-characters?idAuthor=19');
}

   deletePersonaje(id:(string | undefined) ):Observable<any>{
      return this.http.delete(`https://bp-marvel-api.herokuapp.com/marvel-characters/${id}?idAuthor=19`);
}

  selectPersonaje(title:(string | undefined)):Observable<Personaje []>{ 
    return this.http.get<Personaje []>( `http://bp-marvel-api.herokuapp.com/marvel-characters?idAuthor=19&title=${title}`);
}

  postPersonaje(personaje:PersonajeNuevo):Observable<any> {
    console.log("recibido" );
    console.log(personaje);
  return this.http.post('http://bp-marvel-api.herokuapp.com/marvel-characters?idAuthor=19',personaje);
  }

  postUpdatePersonaje(personaje:PersonajeNuevo, id_personaje:string):Observable<any> {
    console.log("recibido a modificar" );
    console.log(personaje);
    return this.http.put(`http://bp-marvel-api.herokuapp.com/marvel-characters/${id_personaje}?idAuthor=19`,personaje);
  }


 

}
