import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-project-display',
  templateUrl: './project-display.component.html',
  styleUrl: './project-display.component.css'
})
export class ProjectDisplayComponent {
  @Input() imgUrl : string = '';
  @Input() imgHeight? : string; 
  @Input() imgWidth! : string; 
  @Input() title : string = ''; 
  @Input() description : string = ''; 
  @Input() technologies : string[] = [];
  @Input() invert : boolean = false;

  private techColors : string[] = [
    'green',
    'blue',
    'purple',
    'red',
    'orange'
  ];

  getRandomColor = () => {
    var i = Math.floor(Math.random() * 5);
    return this.techColors[i];
  }
}
