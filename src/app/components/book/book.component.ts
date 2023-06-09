import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {DataService} from "../../services/data.service";
import {AuthService} from "../../services/auth.service";
import {SnackBarComponent} from "../snack-bar/snack-bar.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  @Input() subtitle?: string;
  @Input() image?: string;
  @Input() review?: string;
  @Input() title?: string;
  @Input() id?: string;
  @Input() rating!: number;
  constructor(private router: Router,private dataService:DataService, private userService:AuthService,private _snackBar: MatSnackBar) { }
  getPartReview():string{
    if(this.review!=undefined){
      let returnString = this.review?.valueOf();
      return returnString.slice(0,75)+"...";
    }
    return "";
  }
  generateArray(n: number): number[] {
    return Array(n).fill(0).map((_, index) => index + 1);
  }
  ngOnInit(): void {}

  GoToDetail() {
    this.router.navigate(['detail/'+ this.id]);
  }
  openSnackBar(title:string,message:string) {
    this._snackBar.openFromComponent(SnackBarComponent, {data:{Title:title,Text:message},
      duration: 5 * 1000,
    });
  }
  AddToFavorites():void {
    if(!this.userService.isLoggedIn()){
      this.openSnackBar("Nie zalogowany","Nie możesz dodać do ulubionych jezeli nie jesteś zalogowany.");
    }
    if(this.id!=undefined){
      this.dataService.addFavoritesById(this.id).subscribe(
        response => {
          this.openSnackBar("Dodano","Dodano do ulubionych.");
          console.log('Favorite added successfully');
        },
        error => {
          // Handle the error
          console.error('Failed to add favorite:', error);
        }
      );
    }
  }
}
