import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-rutas',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './rutas.component.html',
  styleUrl: './rutas.component.css'
})
export class RutasComponent {

  slideIndex: number = 0;

  cambiarSlide(direccion: number): void {
    const total = 2; // porque solo tenemos dos imágenes
    this.slideIndex = (this.slideIndex + direccion + total) % total;
  }

}
