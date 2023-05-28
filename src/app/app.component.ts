import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmationAlertComponent } from '@app-shared/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularUtil';


  constructor(
    private modalService: BsModalService
  ) {}


  public modalRef?: BsModalRef;


  openDialog() {

    const configAlertModal = {
      id: 'ConfirmationAlert',
      initialState: {
        id: 'ConfirmationAlert',       // IMPORTANT: same value than previous id one. Not required if its value is ConfirmationAlert
        title: 'Please confirm',
        bodyMessage: 'This change will require send you an email',
        textSecondaryButton: 'Cancel',
        textPrimaryButton: 'OK'
      }
    };

    this.modalRef = this.modalService.show(
      ConfirmationAlertComponent,
      configAlertModal
    );

  }

}
