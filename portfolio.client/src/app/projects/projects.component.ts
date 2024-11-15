import { Component } from '@angular/core';
import { Project } from '../_models/project';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})

export class ProjectsComponent {
  projects: Project[] = [
    {
      title: 'Frameworx',
      description: "Worked on a web application(Frameworx) for a company's business project, streamlining asset management using .NET Core, JavaScript, and SQL Server. It enables efficient issue tracking and resolution, assigning maintenance tasks for faulty assets, and facilitates seamless handovers between engineers and inspectors for thorough quality control.",
      technologies: ['DOTNET Core', 'SQL SERVER', 'JS', 'EF Core'],
      images: [{
        path: 'images/html.png'
      }],
    },
    {
      title: 'Service Near You',
      description: "Created a mobile app using Flutter and Firebase, providing daily essential services like cleaning, painting, and repairing at your doorstep to simplify people's lives. Added Google Maps to help users to get worker available near them. Set up Cloud Messaging notifications to keep users updated about their service requests.",
      technologies: ['Flutter', 'Firebase'],
      images: [{
        path: 'images/html.png'
      }],
    },
    {
      title: 'HRMS',
      description: "Designed and developed a Leave Management Module for Stallions’ HR portal, empowering HR to effortlessly manage employee and public holidays, built with Angular, NG-ZORRO, .NET Core, and SQL Server, streamlining leave management for a seamless HR experience.",
      technologies: ['Flutter', 'Firebase'],
      images: [{
        path: 'images/html.png'
      }],
    }
  ];
}