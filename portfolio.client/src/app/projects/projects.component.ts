import { Component } from '@angular/core';
import { Project } from '../_models/project';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})

export class ProjectsComponent {
  screenWidth: number = window.innerWidth;
  projects: Project[] = [
    {
      title: 'Frameworx',
      description: "Worked on a web application(Frameworx) for a company's business project, streamlining asset management users updated about theirCreated a mobile app using Flutter and Firebase, providing daily essential services like cleaning, painting, and repairing at your doorstep to simplify people's lives. Added Google Maps to help users to get worker available near them. Set up Cloud Messaging notifications to keep users updated about their maintenance tasks for faulty assets, and facilitates seamless handovers between engineers and inspectors for thorough quality control.",
      technologies: ['DOTNET Core', 'SQL SERVER', 'JS', 'EF Core'],
      images: [{
        path: 'images/frameworx.png'
      }],
      link: 'www.google.com'
    },
    {
      title: 'Service Near You',
      description: "Created a mobile Created a mobile app using Flutter and Firebase, providing. Set up Cloud Messaging notifications to keep users updated about their app using Flutter and Firebase, providing daily essential services like cleaning, painting, and repairing at your doorstep to simplify people's lives. Added Google Maps to help users to get worker available near them. Set up Cloud Messaging notifications to keep users updated about their service requests.",
      technologies: ['Flutter', 'Firebase', 'Google Maps', 'Notifications'],
      images: [{
        path: 'images/Service-Near-You.png'
      }],
      link: 'www.google.com'
    },
    {
      title: 'HRMS',
      description: " Designed and developed a Leave Management Module for Stallions’ HR portal, empowering HR to effortlessly manage employee and public holidays, built with Angular, NG-ZORRO, .NET Core, and SQL Server, streamlining leave management for a seamless HR experience. Designed and developed a Leave Management Module for Stallions’ HR portal, empowering HR to effortlessly manage employee and public holidays, built with Angular, NG-ZORRO, .NET Core, and SQL Server, streamlining leave management for a seamless HR experience.",
      technologies: ['Dotnet Core', 'Linq2db', 'SQL Server', 'Angular'],
      images: [{
        path: 'images/hrms.png'
      }],
      link: 'www.google.com'
    },
    {
      title: 'LMS',
      description: "ZORRO, .NET Core, and SQL Server, streamlining leave management for a seamless HR experience. Designed and developed a Leave Management Module for Stallions’ HR portal, empowering HR to effortlessly manage employee and public holidays, built with Angular, NG-ZORRO, .NET Core, and SQL Server, streamlining leave management for a seamless HR experience. Designed and developed a Leave Management Module for Stallions’ HR portal, empowering HR to effortlessly manage employee and public holidays, built with Angular, NG-ZORRO, .NET Core, and SQL Server, streamlining leave management for a seamless HR experience.",
      technologies: ['Flutter', 'Firebase'],
      images: [{
        path: 'images/LMS-Portal.png'
      }],
      link: 'www.google.com'
    }
  ];

  shouldInvert(index: number): boolean {
    return this.screenWidth > 786 ? index % 2 !== 0 : false;
  }
}