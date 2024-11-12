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
}
