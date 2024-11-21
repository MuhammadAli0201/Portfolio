import { Injectable } from '@angular/core';
import { Project } from '../_models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projects: Project[] = [
    {
      id:'1',
      title: 'Frameworx',
      description: "Worked on a web application(Frameworx) for a company's business project, streamlining asset management users updated about theirCreated a mobile app using Flutter and Firebase, providing daily essential services like cleaning, painting, and repairing at your doorstep to simplify people's lives. Added Google Maps to help users to get worker available near them. Set up Cloud Messaging notifications to keep users updated about their maintenance tasks for faulty assets, and facilitates seamless handovers between engineers and inspectors for thorough quality control.",
      technologies: [{ id: '1', title: 'DOTNET Core', projectId: '1' }, { id: '1', title: 'DOTNET Core', projectId: '1' }, { id: '1', title: 'DOTNET Core', projectId: '1' }, { id: '1', title: 'DOTNET Core', projectId: '1' }],
      images: [{ id: '1', path: 'images/frameworx.png' }],
      link: 'www.google.com',
      userId: '1'
    },
    {
      id:'2',
      title: 'Service Near You',
      description: "Created a mobile Created a mobile app using Flutter and Firebase, providing. Set up Cloud Messaging notifications to keep users updated about their app using Flutter and Firebase, providing daily essential services like cleaning, painting, and repairing at your doorstep to simplify people's lives. Added Google Maps to help users to get worker available near them. Set up Cloud Messaging notifications to keep users updated about their service requests.",
      technologies: [{ id: '1', title: 'DOTNET Core', projectId: '1' }, { id: '1', title: 'DOTNET Core', projectId: '1' }, { id: '1', title: 'DOTNET Core', projectId: '1' }, { id: '1', title: 'DOTNET Core', projectId: '1' }],
      images: [{ id:"1", path: 'images/Service-Near-You.png' }],
      link: 'www.google.com',
      userId:"2"
    },
    {
      id:'3',
      title: 'HRMS',
      description: " Designed and developed a Leave Management Module for Stallions’ HR portal, empowering HR to effortlessly manage employee and public holidays, built with Angular, NG-ZORRO, .NET Core, and SQL Server, streamlining leave management for a seamless HR experience. Designed and developed a Leave Management Module for Stallions’ HR portal, empowering HR to effortlessly manage employee and public holidays, built with Angular, NG-ZORRO, .NET Core, and SQL Server, streamlining leave management for a seamless HR experience.",
      technologies: [{ id: '1', title: 'DOTNET Core', projectId: '1' }, { id: '1', title: 'DOTNET Core', projectId: '1' }, { id: '1', title: 'DOTNET Core', projectId: '1' }, { id: '1', title: 'DOTNET Core', projectId: '1' }],
      images: [{ id: '1', path: 'images/hrms.png' }],
      link: 'www.google.com',
      userId: '1'
    },
    {
      id: '4',
      title: 'LMS',
      description: "ZORRO, .NET Core, and SQL Server, streamlining leave management for a seamless HR experience. Designed and developed a Leave Management Module for Stallions’ HR portal, empowering HR to effortlessly manage employee and public holidays, built with Angular, NG-ZORRO, .NET Core, and SQL Server, streamlining leave management for a seamless HR experience. Designed and developed a Leave Management Module for Stallions’ HR portal, empowering HR to effortlessly manage employee and public holidays, built with Angular, NG-ZORRO, .NET Core, and SQL Server, streamlining leave management for a seamless HR experience.",
      technologies: [{ id:'1', title: 'Flutter', projectId:'1' }, { id:'2', title: 'Firebase', 'projectId':'1' }],
      images: [{ id:'1', path: 'images/LMS-Portal.png' }],
      link: 'www.google.com',
      userId:"1"
    }
  ];
  constructor() { }

  getUserProjects = () => this.projects;
}
