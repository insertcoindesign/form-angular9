import { Component, OnInit } from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
  // ...
} from '@angular/animations';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';
import { HttpClient} from "@angular/common/http";






@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.css'],
  animations: [
    trigger('list1', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({
          transform: 'translateX(100px)',
          opacity: 0
        }))
      ])
    ]),

  ]
})
export class CallComponent implements OnInit {


  iniciar = 'initial';
  forma   : FormGroup;


constructor( private fb: FormBuilder,
             private validadores: ValidadoresService,
             private http: HttpClient
             ) {

  this.crearFormulario();

  this.crearListeners();

}

ngOnInit(): void {


}




get nombreNoValido() {
  return this.forma.get('name').invalid && this.forma.get('name').touched
}

get telefonoNoValido() {
  return this.forma.get('phone').invalid && this.forma.get('phone').touched
}



crearFormulario() {

  this.forma = this.fb.group({
    name  : ['', [ Validators.required, Validators.minLength(5) ]  ],
    phone : ['', Validators.required ]

});
}

crearListeners() {

  this.forma.get('name').valueChanges.subscribe( console.log );
}







guardar() {

  console.log( this.forma );

  if ( this.forma.invalid ) {

    return Object.values( this.forma.controls ).forEach( control => {

      if ( control instanceof FormGroup ) {
        Object.values( control.controls ).forEach( control => control.markAsTouched() );
      } else {
        control.markAsTouched();
      }


    });

  }
  else
  {
    // console.log(this.forma.value);
    // this.subscription = this.sendemailservice.sendEmail(this.forma.value).
    // subscribe(data => {
    //   let msg = data['message']
    //   alert(msg);
    //   console.log(data);
    //   // console.log(data, "success");
    // }, error => {
    //   console.error(error, "error");
    // } );


  }



  }




}
