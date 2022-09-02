import { Component, OnInit } from '@angular/core';

// Mat-dialog-data allows to inject data from the MovieCard component
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
