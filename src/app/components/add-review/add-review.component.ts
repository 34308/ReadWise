import {Component, inject, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {Router} from "@angular/router";
import {MatSnackBar, MatSnackBarRef} from "@angular/material/snack-bar";
import {SnackBarComponent} from "../snack-bar/snack-bar.component";

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit{
  durationInSeconds = 5;

  public review={
    title:"",
    author:"",
    image:"",
    rating:"",
    review:"",
    subtitle:"",
  }

  constructor(private dataService:DataService,private router: Router,private _snackBar: MatSnackBar) {}
  ngOnInit() {}
  openSnackBar(title:string,message:string) {
    this._snackBar.openFromComponent(SnackBarComponent, {data:{Title:title,Text:message},
      duration: this.durationInSeconds * 1000,
    });
  }
  AddReview() {
    if(this.review.title&&this.review.author&&this.review.image&&this.review.rating&&this.review&&this.review.subtitle){
      this.dataService.addReview(this.review).subscribe((result)=>{
        this.router.navigate(["home"]);
      })
    }else{
      this.openSnackBar("Error when trying to sent","Warning at leat one of your inputs is empty");
    }

  }
}
