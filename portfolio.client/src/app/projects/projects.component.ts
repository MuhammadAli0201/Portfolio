import { Component } from '@angular/core';
import { Project } from '../_models/project';
import { ProjectService } from '../_services/project.service';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})

export class ProjectsComponent {
  screenWidth: number = window.innerWidth;
  projects:Project[] = [];

  //LIFE CYCLE
  constructor(private projectService: ProjectService) {
    this.projects = projectService.getUserProjects();
  }

  shouldInvert(index: number): boolean {
    return this.screenWidth > 786 ? index % 2 !== 0 : false;
  }
}