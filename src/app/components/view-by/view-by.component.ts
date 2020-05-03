import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ViewByModel } from 'src/app/shared/model/view-by.model';

@Component({
  selector: 'app-view-by',
  templateUrl: './view-by.component.html',
  styleUrls: ['./view-by.component.scss'],
})
export class ViewByComponent implements OnInit {

  @Input() viewByOptions: ViewByModel[];

  constructor(
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() {}

  viewSelected(view: ViewByModel) {
    this.popoverCtrl.dismiss({
      viewOption: view.key,
      viewDescription: view.description
    });
  }

}
