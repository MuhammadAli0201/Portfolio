import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatterTs } from '../_matter/matter-ts';
import { TechnologyService } from '../_services/technology.service';
import { Technology } from '../_models/technology';
import { Utility } from '../_utility/utility';
import { AppUserService } from '../_services/app-user.service';
import { AppUser } from '../_models/app-user';

interface UserTechnologyViewModel {
  tech: Technology,
  color: string
};

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  @ViewChild('matterContainer', { static: true }) matterContainer!: ElementRef;
  colors: string[] = ["purple", "darkBlue", "red", "red", "blue", "orange", "blue", "blue", "yellow", "blue", "blue", "orange"];
  techs: UserTechnologyViewModel[] = [];
  appUser: AppUser;
  firstName:string = '';
  lastName:string = '';

  //LIFE CYCLES
  constructor(private userService: AppUserService) {
    this.appUser = userService.user!;
    let fullName = this.appUser.name;
    this.firstName = fullName.substring(0, this.appUser.name.indexOf(" "));
    this.lastName = fullName.substring(this.appUser.name.indexOf(" "), fullName.length);
  }

  ngOnInit(): void {
    this.techs = this.appUser.technologies?.map((val) => <UserTechnologyViewModel>{ tech: val, color: Utility.listRandom(this.colors) })!;
    let color = '#121212';
    MatterTs.gyro(this.matterContainer.nativeElement, color);
  }

  //UI LOGIC
  scrollTo100vh() {
    const viewportHeight = window.innerHeight;
    window.scrollTo({ top: viewportHeight, behavior: 'smooth' });
  }
}
