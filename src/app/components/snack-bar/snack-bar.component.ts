import {Component, Inject, inject, Input} from '@angular/core';
import {MatSnackBarRef} from "@angular/material/snack-bar";
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css']
})
export class SnackBarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.Text=data.Text;
    this.Title=data.Title;
  }
  snackBarRef = inject(MatSnackBarRef);
  @Input() Title: string = 'ss';
  @Input() Text: string = 'ss';
}
