/*import { Component } from '@angular/core';

@Component({
  selector: 'app-estudiantes',
  imports: [],
  templateUrl: './estudiantes.component.html',
  styleUrl: './estudiantes.component.css'
})
export class EstudiantesComponent {

}*/


import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
//import { CommonModule } from '@angular/common'; // Solo lo importamos por si usamos directivas antiguas, pero usaremos la nueva sintaxis

@Component({
  selector: 'app-estudiante-form',
  standalone: true,
  imports: [ReactiveFormsModule], // Necesario para formularios reactivos
  templateUrl: './estudiantes.component.html',
  styleUrl: './estudiantes.component.css'
})
export class EstudiantesComponent {
  // 1. Definimos el formulario
  estudianteForm: FormGroup;
  enviado = false; // Para mostrar mensaje de éxito

  constructor(private fb: FormBuilder) {
    // 2. Configuramos los campos con sus validaciones
    this.estudianteForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.pattern('^[0-9]{9}$')]], // Opcional: 9 dígitos
      curso: ['', Validators.required]
    });
  }

  // 3. Getter fácil para acceder a los campos en el HTML
  get f() {
    return this.estudianteForm.controls;
  }

  // 4. Método que se ejecuta al enviar el formulario
  onSubmit() {
    this.enviado = true;

    // Si el formulario es inválido, detenemos la ejecución
    if (this.estudianteForm.invalid) {
      return;
    }

    // --- ¡Aquí haces lo que quieras con los datos! ---
    console.log('✅ Estudiante registrado:', this.estudianteForm.value);
    
    // Ejemplo: Podrías llamar a un servicio para guardarlo en una API
    // this.estudianteService.crear(this.estudianteForm.value).subscribe(...);

    // Resetear el formulario (opcional)
    // this.estudianteForm.reset();
    // this.enviado = false;
  }
}
