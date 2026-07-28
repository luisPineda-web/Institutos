/*import { Component } from '@angular/core';

@Component({
  selector: 'app-estudiante-login',
  imports: [],
  templateUrl: './estudiante-login.component.html',
  styleUrl: './estudiante-login.component.css'
})
export class EstudianteLoginComponent {

}*/

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-estudiante-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './estudiante-login.component.html',
  styleUrl: './estudiante-login.component.css'
})
export class EstudianteLoginComponent {
  loginForm: FormGroup;
  enviado = false;
  loginExitoso = false;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.enviado = true;
    if (this.loginForm.invalid) return;

    // Simulación de verificación (aquí iría una llamada a API)
    console.log('Intentando ingresar con:', this.loginForm.value);
    this.loginExitoso = true;
    
    // Opción: Podríamos ocultar el mensaje después de 5 segundos
    // setTimeout(() => this.loginExitoso = false, 5000);
  }
}
