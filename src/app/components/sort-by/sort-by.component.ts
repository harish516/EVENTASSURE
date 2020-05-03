import { Component, OnInit, Input } from '@angular/core';
import { SortByModel } from 'src/app/shared/model/sort-by.model';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-sort-by',
  templateUrl: './sort-by.component.html',
  styleUrls: ['./sort-by.component.scss'],
})
export class SortByComponent implements OnInit {

  @Input() sortByOptions: SortByModel[];

  constructor(
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() {}

  sortSelected(sort: SortByModel) {
    this.popoverCtrl.dismiss({
      sortOption: sort.key,
      sortDescription: sort.description
    });
  }

}
