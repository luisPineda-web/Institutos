/*import { Component } from '@angular/core';

@Component({
  selector: 'app-oferta-academica',
  imports: [],
  templateUrl: './oferta-academica.component.html',
  styleUrl: './oferta-academica.component.css'
})
export class OfertaAcademicaComponent {

}*/



import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Programa {
  id: number;
  titulo: string;
  descripcion: string;
  duracion: string;
  modalidad: string;
  homologacion?: string; // opcional, solo para sistemas
}

@Component({
  selector: 'app-oferta-academica',
  standalone: true,                // <--- Asegúrate que sea standalone
   imports: [CommonModule],                      // <-- AGREGA ESTA LÍNEA
  templateUrl: './oferta-academica.component.html',
  styleUrls: ['./oferta-academica.component.css']
})
export class OfertaAcademicaComponent {
  programas: Programa[] = [
    {
      id: 1,
      titulo: 'Técnico Laboral en Sistemas',
      descripcion: 'Formación en soporte técnico, redes, mantenimiento de equipos y fundamentos de programación.',
      duracion: '2 semestres (1 año)',
      modalidad: 'Presencial / Semipresencial',
      homologacion: 'Posibilidad de homologación hacia Tecnología en Desarrollo de Software en la UNAD.'
    },
    {
      id: 2,
      titulo: 'Técnico Laboral en Atención Integral a la Primera Infancia',
      descripcion: 'Preparación para el cuidado, educación y estimulación temprana de niños y niñas de 0 a 5 años.',
      duracion: '2 semestres (1 año)',
      modalidad: 'Presencial'
    },
    {
      id: 3,
      titulo: 'Técnico Laboral en Salud Ambiental',
      descripcion: 'Gestión de riesgos ambientales, control de vectores, saneamiento básico y calidad del agua.',
      duracion: '2 semestres (1 año)',
      modalidad: 'Presencial'
    },
    {
      id: 4,
      titulo: 'Técnico Laboral en Auxiliar de Veterinaria',
      descripcion: 'Asistencia en clínicas veterinarias, manejo de animales, primeros auxilios y laboratorio clínico.',
      duracion: '2 semestres (1 año)',
      modalidad: 'Presencial'
    },
    {
      id: 5,
      titulo: 'Técnico Laboral en Contabilidad y Finanzas',
      descripcion: 'Registro contable, manejo de software financiero, análisis de estados financieros y tributación.',
      duracion: '2 semestres (1 año)',
      modalidad: 'Presencial / Virtual'
    },
    {
      id: 6,
      titulo: 'Técnico Laboral en Secretariado Auxiliar Contable',
      descripcion: 'Asistencia administrativa, manejo de documentos contables, atención al cliente y archivo.',
      duracion: '2 semestres (1 año)',
      modalidad: 'Presencial'
    }
  ];
}
