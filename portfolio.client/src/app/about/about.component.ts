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
  @ViewChild('techStack', { static: true }) techStack!: ElementRef;
  displayImagesCount!: number;
  startIndex: number = 0;
  techImgGap: number = 40;

  //LIFE CYCLES
  constructor(private cd: ChangeDetectorRef) { }
  ngOnInit(): void {
    MatterTs.gyro(this.matterContainer.nativeElement);
    Promise.resolve().then(() => this.calculateDisplayImagesCount());
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

  getVisibleImages = (): Image[] => this.imagePaths.slice(this.startIndex, this.displayImagesCount);
  isLeftButtonVisible = (): boolean => this.startIndex > 0;
  isRightButtonVisible = (): boolean => this.displayImagesCount < this.imagePaths.length;

  calculateDisplayImagesCount = () => {
    let techStackDiv = this.techStack.nativeElement;
    let techStackDivWidth = techStackDiv.clientWidth;
    let techImageHeight = techStackDiv.clientHeight;
    this.displayImagesCount = Math.ceil(techStackDivWidth / (techImageHeight + this.techImgGap));
  }

  slideImagesToLeft() {
    if (this.startIndex > 0) {
      this.startIndex--;
      this.displayImagesCount--;
    }
  }
  slideImagesToRight() {
    if (this.displayImagesCount < this.imagePaths.length) {
      this.startIndex++;
      this.displayImagesCount++;
    }
  }

  scrollTo100vh() {
    const viewportHeight = window.innerHeight;
    window.scrollTo({ top: viewportHeight, behavior: 'smooth' });
  }
}
