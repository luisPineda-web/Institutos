/*import { Component } from '@angular/core';

@Component({
  selector: 'app-docentes',
  imports: [],
  templateUrl: './docentes.component.html',
  styleUrl: './docentes.component.css'
})
export class DocentesComponent {

}*/


import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-docente-form',
  standalone: true,
  imports: [ReactiveFormsModule], // Solo necesitamos esto para formularios reactivos
  templateUrl: './docentes.component.html',
  styleUrl: './docentes.component.css'
})
export class DocentesComponent {
  docenteForm: FormGroup;
  enviado = false;

  constructor(private fb: FormBuilder) {
    this.docenteForm = this.fb.group({
      // 1. Nuevo campo: Documento (obligatorio, mínimo 8 dígitos, máximo 15)
      documento: ['', [Validators.required, Validators.pattern('^[0-9]{8,15}$')]],
      
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      
      // 2. Teléfono: AHORA permite máximo 10 dígitos (del 1 al 10)
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{1,10}$')]],
      
      // Podríamos llamarlo "asignatura" o "especialidad" para docentes
      asignatura: ['', Validators.required]
    });
  }

  // Getter para acceder fácilmente a los campos en el HTML
  get f() {
    return this.docenteForm.controls;
  }

  onSubmit() {
    this.enviado = true;

    if (this.docenteForm.invalid) {
      // Si hay errores, Angular se encarga de mostrarlos abajo
      return;
    }

    // Aquí tienes los datos listos para enviar a tu API o servicio
    console.log('✅ Docente registrado:', this.docenteForm.value);
    
    // Ejemplo: this.docenteService.crear(this.docenteForm.value).subscribe(...);
    
    // Opcional: Resetea el formulario tras el éxito
    // this.docenteForm.reset();
    // this.enviado = false;
  }
}
