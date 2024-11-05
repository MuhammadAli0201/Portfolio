import { Component, Input } from '@angular/core';

@Component({
  selector: 'tag',
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.css'
})
export class TagComponent {
  @Input() value:string = '';
}
