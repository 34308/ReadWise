import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'favorite-item',
  templateUrl: './favorite-item.component.html',
  styleUrls: ['./favorite-item.component.css']
})
export class FavoriteItemComponent implements  OnInit {
  @Input() subtitle?: string;
  @Input() image?: string;
  @Input() review?: string;
  @Input() rating!: number;
  @Input() title?: string;
  @Input() id?: string;
  @Output() childEvent = new EventEmitter();
  constructor(private router: Router,private dataService:DataService) { }
  getPartReview():string{
    if(this.review!=undefined){
      let returnString = this.review?.valueOf();
      return returnString.slice(0,75)+"...";
    }
    return "";
  }

  ngOnInit(): void {
  }

  GoToDetail() {

    this.router.navigate(['detail/'+ this.id]);

  }
  DeleteFromFavorites():void {
    if(this.id!=undefined){
      this.dataService.DeleteFavoritesById(this.id).subscribe(
        response => {
          this.childEvent.emit(this.id);
          console.log('Favorite deleted successfully');
        },
        error => {
          console.error('Failed to add favorite:', error);
        }
      );
    }
  }

  generateArray(n: number): number[] {
    return Array(n).fill(0).map((_, index) => index + 1);
  }
}
