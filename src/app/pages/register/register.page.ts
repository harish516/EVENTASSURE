import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BasePage } from 'src/app/shared/interface/basepage';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements BasePage {
  constructor(private router: Router, private route: ActivatedRoute) {}

  pageTitle: string = 'Register';
  hasBackBtn?: boolean;
  helpContent?: string;

  knobValues: any = {
    upper: 120,
    lower: 0,
  };

  ngOnInit() {}

  registerParticipant() {
    this.router.navigate(['/login', { fromRegister: 'true' }]);
  }
}
