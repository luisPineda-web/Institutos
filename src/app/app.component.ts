/*import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RutasComponent } from './rutas/rutas.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RutasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Institutos';
}
*/


/*import { RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RutasComponent } from './rutas/rutas.component';

@Component({
   imports: [RouterOutlet,RutasComponent],
  selector: 'app-root',
  template: `
    <div style="padding:20px;font-family:Arial">
      <h2>📋 Prueba de conexión MySQL</h2>
      
      <!-- Estado de conexión -->
      <div *ngIf="usuarios.length > 0" style="color:green">
        ✅ Conexión exitosa! {{ usuarios.length }} registros encontrados
      </div>

      <!-- Formulario para agregar -->
      <div style="margin:20px 0">
        <input [(ngModel)]="nuevo.nombre" placeholder="Nombre">
        <input [(ngModel)]="nuevo.email" placeholder="Email">
        <button (click)="agregar()">Agregar</button>
      </div>

      <!-- Lista de usuarios -->
      <ul>
        <li *ngFor="let user of usuarios">
          {{ user.id }} - {{ user.nombre }} ({{ user.email }})
        </li>
      </ul>

      <!-- Botón para recargar -->
      <button (click)="cargarUsuarios()">🔄 Recargar</button>
    </div>
  `
})
export class AppComponent implements OnInit {
  usuarios: any[] = [];
  nuevo = { nombre: '', email: '' };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.http.get('http://localhost:3000/api/usuarios')
      .subscribe({
        next: (data: any) => {
          this.usuarios = data;
          console.log('✅ Datos cargados:', data);
        },
        error: (err) => {
          console.error('❌ Error:', err);
          alert('Error de conexión. ¿El servidor está corriendo?');
        }
      });
  }

  agregar() {
    if (!this.nuevo.nombre || !this.nuevo.email) {
      alert('Completa todos los campos');
      return;
    }

    this.http.post('http://localhost:3000/api/usuarios', this.nuevo)
      .subscribe({
        next: () => {
          this.cargarUsuarios(); // Recargar lista
          this.nuevo = { nombre: '', email: '' }; // Limpiar
        },
        error: (err) => console.error('❌ Error al agregar:', err)
      });
  }
}


*/


import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RutasComponent } from './rutas/rutas.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RutasComponent, HttpClientModule, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Institutos';

  // ===== NUEVO CÓDIGO PARA PRUEBA DE CONEXIÓN =====
  usuarios: any[] = [];
  nuevo = { nombre: '', email: '' };
  conexionExitosa = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.http.get('http://localhost:3000/api/usuarios')
      .subscribe({
        next: (data: any) => {
          this.usuarios = data;
          this.conexionExitosa = true;
          console.log('✅ Conexión exitosa - Datos cargados:', data);
        },
        error: (err) => {
          this.conexionExitosa = false;
          console.error('❌ Error de conexión:', err);
        }
      });
  }

  agregarUsuario() {
    if (!this.nuevo.nombre || !this.nuevo.email) {
      alert('Completa todos los campos');
      return;
    }

    this.http.post('http://localhost:3000/api/usuarios', this.nuevo)
      .subscribe({
        next: () => {
          this.cargarUsuarios(); // Recargar lista
          this.nuevo = { nombre: '', email: '' }; // Limpiar formulario
        },
        error: (err) => console.error('❌ Error al agregar:', err)
      });
  }
  // ===== FIN NUEVO CÓDIGO =====
}