import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FilterByModel } from 'src/app/shared/model/filter-by.model';

@Component({
  selector: 'app-filter-by',
  templateUrl: './filter-by.component.html',
  styleUrls: ['./filter-by.component.scss'],
})
export class FilterByComponent implements OnInit {

  @Input() filterByList: FilterByModel[];

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  applyFilter() {
    this.modalCtrl.dismiss(null, 'applied');
  }

}
