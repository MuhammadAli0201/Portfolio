import { Component, Input } from '@angular/core';
import { AppUserService } from '../_services/app-user.service';
import { Social } from '../_models/social';

@Component({
  selector: 'app-socials',
  templateUrl: './socials.component.html',
  styleUrl: './socials.component.css'
})
export class SocialsComponent {
  @Input() class: string = 'white-color';
  constructor(private appUserService: AppUserService) { }

  get socials(): Social | undefined { return this.appUserService.user?.social; };
}
