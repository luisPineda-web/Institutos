import { Component } from '@angular/core';

@Component({
  selector: 'app-cotel',
  imports: [],
  templateUrl: './cotel.component.html',
  styleUrl: './cotel.component.css'
})
export class CotelComponent {
  slideIndex: number = 0;

  cambiarSlide(direccion: number): void {
    const total = 2; // porque solo tenemos dos imágenes
    this.slideIndex = (this.slideIndex + direccion + total) % total;
  }

}
