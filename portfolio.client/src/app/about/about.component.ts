import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatterJs } from './Matter';

interface Image{
  path:string,
  tooltip:string,
  tooltipColor:string,
  height?:number,
  width?:number
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  @ViewChild('matterContainer', { static: true }) matterContainer!: ElementRef;

  ngOnInit(): void {
    MatterJs.gyro(this.matterContainer.nativeElement, "images/html.png");
  }

  imagePaths: Image[] = [
    {path:'images/dotnet.png',  tooltip:'.NET Core', tooltipColor:'purple'},
    {path:'images/sql-server.png', tooltip:'SQL Server', tooltipColor:'red'},
    {path:'images/angular.png', tooltip:'Angular', tooltipColor:'rgb(207, 10, 204)'},
    {path:'images/ng zorro.png', tooltip:'NG Zorro', tooltipColor:'blue'},
    {path:'images/html.png', tooltip:'HTML', tooltipColor:'orangered'},
    {path: 'images/css.png', tooltip:'CSS', tooltipColor: 'blue'},
    {path: 'images/js.png', tooltip: 'JavaScript', tooltipColor: 'rgb(196, 196, 25)'},
    {path: 'images/flutter.png', tooltip:'Flutter', tooltipColor: 'skyblue'},
    {path: 'images/firebase.png', tooltip: 'Firebase', tooltipColor: 'orange'},
  ];
}
