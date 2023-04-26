import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [],
})
export class SelectorPageComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group({
    region: ['', Validators.required],
  });

  // Llenar selectores
  regiones: string[] = [];

  constructor(private fb: FormBuilder, private paisesService: PaisesService) {}
  ngOnInit(): void {
    this.regiones = this.paisesService.regiones;
  }

  guardar() {
    console.log(this.miFormulario.value);
  }
}
