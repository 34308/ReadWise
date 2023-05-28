import {Component, Input, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit{
  @Input() subtitle?: string;
  @Input() image?: string;
  @Input() review?: string;
  @Input() title?: string;
  @Input() id?: string;
  constructor(private service: DataService,private route: ActivatedRoute) {}
  ngOnInit(): void {
    let id: string = '';
    this.route.paramMap
      .subscribe((params: any) => {
        id = params.get('id');
      });
    this.service.getById(id).subscribe((res: any) => {
      this.image = res['image'];
      this.review = res['review'];
      this.title = res['title'];
      this.subtitle= res['subtitle'];
      this.id=id;
    });
  }
  AddToFavorites():void {
    if(this.id!=undefined){
      this.service.addFavoritesById(this.id).subscribe(
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
