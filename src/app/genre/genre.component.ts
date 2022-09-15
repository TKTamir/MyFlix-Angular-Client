import { Component, OnInit, Inject } from '@angular/core';

// Mat-dialog-data allows to inject data from the MovieCard component
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {

  /**
   * Inject data from the MovieCard component using the MAT_DIALOG_DATA injection token.
   * The data can be accessed to populate the view.
   * @param data 
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string,
      Description: string,
    }
  ) { }

  ngOnInit(): void {
  }

}