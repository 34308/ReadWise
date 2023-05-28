import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {DataService} from "../../services/data.service";

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
  constructor(private router: Router,private dataService:DataService) { }
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
  ngOnInit(): void {
  }

  GoToDetail() {

    this.router.navigate(['detail/'+ this.id]);

  }
  AddToFavorites():void {
    if(this.id!=undefined){
      this.dataService.addFavoritesById(this.id).subscribe(
        response => {
          // Handle the response
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
