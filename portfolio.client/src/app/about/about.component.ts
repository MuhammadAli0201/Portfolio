import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatterJs } from './Matter';

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

  imagePaths: string[] = [
    'images/html.png',
    'images/css.png',
    'images/js.png',
    'images/dotnet.png',
    'images/firebase.png',
    'images/flutter.png',
    'images/ng zorro.png',
    'images/sql-server.png',
    'images/angular.png'
  ];
}
