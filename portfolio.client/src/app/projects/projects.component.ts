import { Component } from '@angular/core';

interface Project {
  title: string,
  description: string,
  technologies: string[],
  imageUrl: string,
  imgHeight?: string,
  imgWidth?: string,
  invert:boolean
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})

export class ProjectsComponent {
  projects: Project[] = [
    {
      title: 'Service Near You',
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quae facilis velit, deleniti cum molestiae ipsam! Error, veniam quaerat expedita doloribus odio ea excepturi voluptatum, eveniet ipsam, eum cumque doloremque.",
      technologies: ['Flutter', 'Firebase'],
      imageUrl: 'images/html.png',
      invert:false
    },
    {
      title: 'Service Near You',
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quae facilis velit, deleniti cum molestiae ipsam! Error, veniam quaerat expedita doloribus odio ea excepturi voluptatum, eveniet ipsam, eum cumque doloremque.",
      technologies: ['Flutter', 'Firebase'],
      imageUrl: 'images/html.png',
      invert:true
    },
    {
      title: 'Service Near You',
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quae facilis velit, deleniti cum molestiae ipsam! Error, veniam quaerat expedita doloribus odio ea excepturi voluptatum, eveniet ipsam, eum cumque doloremque.",
      technologies: ['Flutter', 'Firebase'],
      imageUrl: 'images/html.png',
      invert:false
    }
  ];
}