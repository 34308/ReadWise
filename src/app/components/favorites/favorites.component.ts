import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {DataService} from "../../services/data.service";
import {NavbarComunicationService} from "../../services/navbar-comunication.service";
import {SnackBarComponent} from "../snack-bar/snack-bar.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit,OnDestroy{
  constructor(private security:AuthService,
              private service:DataService,
              private navbarCommunication:NavbarComunicationService,
              private _snackBar: MatSnackBar) {
  }
  public items$: any;

  ngOnInit(): void {
    this.getAllFavorites();
    this.navbarCommunication.ShowBar();
  }
  openSnackBar(title:string,message:string) {
    this._snackBar.openFromComponent(SnackBarComponent, {data:{Title:title,Text:message},
      duration: 5 * 1000,
    });
  }
  getAllFavorites(){
    this.service.GetFavoritesById().subscribe((response) => {
      this.items$ = response;
      if(Object.keys(response).length==0){
        this.openSnackBar("Brak danych","nie masz żadnych recenzji dodanych do ulubionych");

      }
    },error => {

    });
  }
  ngOnDestroy() {
    this.navbarCommunication.HideBar();
  }
}
