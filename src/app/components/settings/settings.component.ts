import {Component, OnInit, ViewChild} from '@angular/core';
import {MatAccordion} from "@angular/material/expansion";
import {DataService} from "../../services/data.service";
import {AuthService} from "../../services/auth.service";
import {map} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackBarComponent} from "../snack-bar/snack-bar.component";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit{
  constructor(private dataService:DataService,private securityService:AuthService,private _snackBar: MatSnackBar) {
  }
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  public hide=true;
  public hide2=true;
  public hide3=true;
  public hide4=true;
  public hide5=true;
  public changePassword={
    oldPassword:"",
    newPassword:"",
    repeatPassword:"",
  }
  openSnackBar(title:string,message:string) {
    this._snackBar.openFromComponent(SnackBarComponent, {data:{Title:title,Text:message},
      duration: 5000,
    });
  }
  public changeLogin={
    newLogin:"",
    password:"",
  }
  changeEmail={
    newEmail:"",
    password:"",
  }
  public deletePassword=""
  public hide6 =true;
  ngOnInit() {

  }


  async UpdatePassword() {
    if(this.changePassword.newPassword&&this.changePassword.oldPassword&&this.changePassword.repeatPassword){
      this.dataService.PutNewPassword(this.changePassword.repeatPassword).subscribe((result) => {
        if (!result) {
          this.openSnackBar("Błąd","nie ustawiono nowego hasla");
          console.log(result)
        } else {
          this.openSnackBar("Hasło zostało zmienione","Poprawnie ustawiono nowe haslo");
        }
      })
    }else{
      this.openSnackBar("Błąd","uzupełnij wszystkie pola");
    }

  }

  updateUsername() {
    if(this.changeLogin.newLogin&&this.changeLogin.password){
    this.dataService.PutNewName(this.changeLogin.newLogin).subscribe((result)=>{
      if (!result) {
        console.log(result)
        this.openSnackBar("Błąd","nie ustawiono nowego loginu");

      }else{
        this.openSnackBar("login został zmieniony","Poprawnie ustawiono nowy login");

        window.location.reload();
      }
    });
    }else {
      this.openSnackBar("Błąd","uzupełnij wszystkie pola");

    }
  }
  async checkPassword(password: string) {
    const username = this.securityService.currentUser;
    try {
      const result = await this.securityService.authenticate({ username: username, password: password });
      return !!result;

    } catch (error) {
      console.error(error); // Optional: Handle or log the error
      return false;
    }
  }
  updateEmail() {
    if(this.changeEmail.newEmail,this.changeEmail.password){
      this.dataService.PutNewEmail(this.changeEmail.newEmail).subscribe((result)=>{

        if (!result) {
          this.openSnackBar("Błąd","nie ustawiono nowego emailu");
          console.log(result)
        }else{
          this.openSnackBar("email został zmieniony","Poprawnie ustawiono nowy email");
        }
      })
    }else{
      this.openSnackBar("Błąd","uzupełnij wszystkie pola");

    }
  }

  DeleteAccount() {
    if(this.deletePassword){
      this.dataService.DeleteAccount().subscribe((result)=>{
        if (!result) {
          console.log(result)
        }else{
          window.location.reload();
        }
      })
    }else{
      this.openSnackBar("Błąd","uzupełnij wszystkie pola");
    }
  }
}
