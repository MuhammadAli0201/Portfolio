import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Image } from '../_models/image';
import { MatterTs } from '../_matter/matter-ts';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  @ViewChild('matterContainer', { static: true }) matterContainer!: ElementRef;

  //LIFE CYCLES
  constructor(private cd: ChangeDetectorRef) { }
  ngOnInit(): void {
    let color = '#121212';
    MatterTs.gyro(this.matterContainer.nativeElement, color);
  }

  imagePaths: Image[] = [
    { path: 'images/dotnet.png', tooltip: '.NET Core', tooltipColor: 'purple' },
    { path: 'images/sql-server.png', tooltip: 'SQL Server', tooltipColor: 'red' },
    { path: 'images/angular.png', tooltip: 'Angular', tooltipColor: 'rgb(207, 10, 204)' },
    { path: 'images/ng zorro.png', tooltip: 'NG Zorro', tooltipColor: 'blue' },
    { path: 'images/html.png', tooltip: 'HTML', tooltipColor: 'orangered' },
    { path: 'images/css.png', tooltip: 'CSS', tooltipColor: 'blue' },
    { path: 'images/js.png', tooltip: 'JavaScript', tooltipColor: 'rgb(196, 196, 25)' },
    { path: 'images/flutter.png', tooltip: 'Flutter', tooltipColor: 'skyblue' },
    { path: 'images/firebase.png', tooltip: 'Firebase', tooltipColor: 'orange' },
  ];

  techs: { name: string, color: string }[] = [
    {
      name: "ASP.NET Core",
      color: "purple"
    },
    {
      name: "EF Core",
      color: "darkBlue"
    },
    {
      name: "MS SQL Server",
      color: "red"
    },
    {
      name: "Angular",
      color: "red"
    },
    {
      name: "NG-Zorro",
      color: "blue"
    },
    {
      name: "Html",
      color: "orange"
    },
    {
      name: "CSS",
      color: "blue"
    },
    {
      name: "JavaScript",
      color: "yellow"
    },
    {
      name: "TypeScript",
      color: "blue"
    },
    {
      name: "Flutter",
      color: "blue"
    },
    {
      name: "Firebase",
      color: "orange"
    }
  ];

  scrollTo100vh() {
    const viewportHeight = window.innerHeight;
    window.scrollTo({ top: viewportHeight, behavior: 'smooth' });
  }
}
