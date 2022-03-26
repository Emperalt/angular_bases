import { Component, OnInit } from '@angular/core';
import { Personaje, PersonajeNuevo } from '../interfaces/personaje.interface';
import { ServicePersonajeService } from '../service-personaje.service';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.css']
})
export class PersonajesComponent implements OnInit {

  constructor( private personajeService: ServicePersonajeService) { }

  ngOnInit(): void {

    console.log("se iniciara");
    this.personajeService.getPersonaje().subscribe((personajes:Personaje [])=>{
        this.personajes = personajes;
        console.log(this.personajes);
        
    });
    
  }

  botonActivado :boolean=false;

  isNuevoUpdate :Boolean = false;

  personajeBuscar :string="";

  accionModifica :boolean = false;
   

  personajes :Personaje[]=[];
  
  personajeNuevo :PersonajeNuevo={    
   title: '',
   body: '',
   image: '',
   category: 'main',
   idAuthor: '19',
   createdAt: '',
   updatedAt: ''
}

personajeActulizar :Personaje={
  _id:'',    
  title: '',
  body: '',
  image: '',
  category: 'main',
  idAuthor: '19',
  createdAt: '',
  updatedAt: ''
}

  eliminarPersonaje(personaje: Personaje){
    let id:(string | undefined) = personaje._id;
    this.personajeService.deletePersonaje(id).subscribe(statusObj => {  
      if(statusObj.message){
        let personajeToRemove = this.personajes.filter(c=> c._id === id)[0];
        let index = this.personajes.indexOf(personajeToRemove);
        this.personajes.splice(index,1); 
        alert("El Personaje "+personaje.title+" ha sido eliminado");
      }
    })


  }

  buscarPersonaje(title: string){
    console.log("...buscando");
    this.personajeService.selectPersonaje(this.personajeBuscar).subscribe((personajes:Personaje [])=>{
      this.personajes = personajes;
      console.log(this.personajes);
      
  });
    
  }

  nuevoModifica(accion :number){
    this.isNuevoUpdate= true;
    this.accionModifica=false;

    this.personajeNuevo.body=''
    this.personajeNuevo.category='main'
    this.personajeNuevo.createdAt=''
    this.personajeNuevo.body=''
    this.personajeNuevo.image=''
    this.personajeNuevo.title=''
  }

  cancela(){
    this.isNuevoUpdate= false;
    this.accionModifica=false;
    // this.recargarPersonaje();
    
  
  }

  modificaPersonaje(personaje: Personaje){
    this.isNuevoUpdate= true;
    this.personajeActulizar=personaje;
    this.accionModifica=true;

    this.personajeNuevo.body=personaje.body
    this.personajeNuevo.category=personaje.category
    this.personajeNuevo.createdAt=personaje.createdAt
    this.personajeNuevo.body=personaje.body
    this.personajeNuevo.image=personaje.image
    this.personajeNuevo.title=personaje.title

  }

  crearPersonaje(){
     
     console.log(this.personajeNuevo);      

     if (!this.accionModifica){
        console.log("enviado a inserta");
        this.personajeService.postPersonaje(this.personajeNuevo).subscribe((newPersonaje:Personaje) =>
        console.log("salio")
        );
      
        console.log(this.personajes)
        alert("Producto "+this.personajeNuevo.title+" ha sido agregado exitosamente");
        
     }
     else
     {
      console.log("enviado a modifica");
      this.personajeService.postUpdatePersonaje(this.personajeNuevo, this.personajeActulizar._id).subscribe((newPersonaje:Personaje) =>
      console.log("salio")
      
      );
      alert("Producto "+this.personajeNuevo.title+" ha sido actualizado exitosamente");
    
      }
      this.personajeNuevo = {
        body:'',
        category:'main',
        createdAt:'',
        image:'',
        title:'',
        idAuthor: '',
        updatedAt: ''};
      this.recargarPersonaje();
      this.isNuevoUpdate= false;
  }


  recargarPersonaje(){

    this.personajeService.getPersonaje().subscribe((personajes:Personaje [])=>{
      this.personajes = personajes;
      console.log(this.personajes);
      
  });
  }

}

