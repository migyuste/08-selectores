import { Name, Pais } from './../../interfaces/paises';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { switchMap, pluck, map, tap } from 'rxjs';

import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [],
})
export class SelectorPageComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group({
    region  : ['', Validators.required],
    pais    : ['', Validators.required],
    frontera: ['', Validators.required],
  });

  // Llenar selectores
  regiones: string[] = [];
  paises: Pais[] = [];
  fronteras: string[] = [];

  constructor(private fb: FormBuilder, private paisesService: PaisesService) {}
  ngOnInit(): void {
    this.regiones = this.paisesService.regiones;

    // Cuando cambie la region
    // this.miFormulario.get('region')?.valueChanges.subscribe((region) => {
    //   console.log(region);
    //   this.paisesService.getPaisesPorRegion(region).subscribe((paises) => {
    //     console.log(this.paises);
    //     this.paises = paises.map((pais) => ({
    //       name: pais.name.common,
    //       cca3: pais.cca3,
    //     }));
    //   });
    // });
    
    // Cuando cambie la región
    this.miFormulario.get('region')?.valueChanges
      .pipe(
        tap( (_)=>this.miFormulario.get('pais')?.reset('') ),
        switchMap(region => this.paisesService.getPaisesPorRegion(region)),
      )
      .subscribe(paises => {
        this.paises = paises.map(pais => ({ name: pais.name.common, cca3: pais.cca3 }));
        this.paises = this.paises.sort((a, b) => {
          if (a.name > b.name)
            return 1;
          if (a.name < b.name)
            return -1;
          return 0;
        });
      })
    
    // Cuando cambie el país
    this.miFormulario.get('pais')?.valueChanges
      .pipe(
        tap(() => {
          this.fronteras = [];
          this.miFormulario.get('frontera')?.reset('');
        }),
        switchMap(codigo => this.paisesService.getPaisPorCodigo(codigo))
      )
      .subscribe(pais => {
        this.fronteras = pais![0]?.borders || [] ;
        
    })
  }

  guardar() {
    console.log(this.miFormulario.value);
  }
}
