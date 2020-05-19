import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';
import { PaisService } from '../../services/pais.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
  group
} from '@angular/animations';

@Component({
  selector: 'app-mesage',
  templateUrl: './mesage.component.html',
  styleUrls: ['./mesage.component.css'],
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
      trigger('list2', [
        state('in', style({
          opacity: 1,
          transform: 'translateX(0)'
        })),
        transition('void => *', [
          animate(1000, keyframes([
            style({
              transform: 'translateX(-100px)',
              opacity: 0,
              offset: 0
            }),
            style({
              transform: 'translateX(-50px)',
              opacity: 0.5,
              offset: 0.3
            }),
            style({
              transform: 'translateX(-20px)',
              opacity: 1,
              offset: 0.8
            }),
            style({
              transform: 'translateX(0px)',
              opacity: 1,
              offset: 1
            })
          ]))
        ]),
        transition('* => void', [
          group([
            animate(300, style({
              color: 'red'
            })),
            animate(800, style({
              transform: 'translateX(100px)',
              opacity: 0
            }))
          ])
        ])
      ]),
    ]
})
export class MesageComponent implements OnInit {
  forma: FormGroup;
  countries: any[] = [];

constructor( private fb: FormBuilder,
             private validadores: ValidadoresService,
             private paisService: PaisService ) {

  this.crearFormulario();

  this.crearListeners();

}

ngOnInit(): void {

      this.paisService.getCountry()
        .subscribe( countries => {
          this.countries = countries;

          this.countries.unshift({
            nombre: '[ Select country]',
            codigo: ''
          })

          // console.log( this.paises );
        });
}

get skills() {
  return this.forma.get('skills') as FormArray;
}

get nombreNoValido() {
  return this.forma.get('name').invalid && this.forma.get('name').touched
}

get apellidoNoValido() {
  return this.forma.get('surname').invalid && this.forma.get('surname').touched
}

get correoNoValido() {
  return this.forma.get('email').invalid && this.forma.get('email').touched
}



get distritoNoValido() {
  return this.forma.get('address.district').invalid && this.forma.get('address.district').touched
}

get ciudadNoValido() {
  return this.forma.get('address.city').invalid && this.forma.get('address.city').touched
}

get paisNoValido() {
  return this.forma.get('country').invalid && this.forma.get('country').touched

}

get pass1NoValido() {
  return this.forma.get('password').invalid && this.forma.get('password').touched;
}

get pass2NoValido() {
  const pass1 = this.forma.get('password').value;
  const pass2 = this.forma.get('password2').value;

  return ( pass1 === pass2 ) ? false : true;
}



crearFormulario() {

  this.forma = this.fb.group({
    name  : ['', [ Validators.required, Validators.minLength(5) ]  ],
    surname: ['', [Validators.required  ] ],
    email  : ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
    password   : ['', Validators.required ],
    password2   : ['', Validators.required ],

    address: this.fb.group({
      district: ['', Validators.required ],
      city  : ['', Validators.required ],
    }),
    country   : ['', Validators.required ],
    skills: this.fb.array([])
  },{
  validators: this.validadores.passwordsIguales('password','password2')
  });

}

crearListeners() {

  this.forma.get('name').valueChanges.subscribe( console.log );
}




addskill() {
  this.skills.push(  this.fb.control('')  );
}

deleteskill(i: number) {
  this.skills.removeAt(i);
}


guardar() {
  console.log( this.forma );

  if ( this.forma.invalid )
  {
    return Object.values( this.forma.controls ).forEach( control =>
    {
      if ( control instanceof FormGroup )
      {
        Object.values( control.controls ).forEach( control => control.markAsTouched() );
      }
      else
      {
        control.markAsTouched();
      }


   });
  }
  else
  {

  }


}

}
