import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  public credentials = {
    name: '',
    email: '',
    password: '',
  };
  public rePassword="";
  public hide=true;
  public Re_hide=true;
  constructor(private authService: AuthService, public router: Router) {
  }

  ngOnInit() {
  }

  CrateAccount() {
    this.authService.createOrUpdate(this.credentials).subscribe((result) => {
      return result;
    });
    this.router.navigate(['/']);
  }
}
