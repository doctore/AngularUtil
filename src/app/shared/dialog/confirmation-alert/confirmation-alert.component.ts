import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import * as _ from 'lodash';

/**
 *    Simple dialog to display tittle and message in a modal, sending events when the user clicks on secondary button `onCloseClick`
 * or primary one `onOkClick`.
 *
 * `textSecondaryButton` and `textPrimaryButton` manages if 2, 1 or 0 buttons will be displayed at modal's footer.
 *
 * Use cases:
 *
 * 1. Angular selector:
 *
 *     <app-confirmation-alert
 *        [id]="ConfirmationAlert"          <!-- Using this option, such value must be 'AlertConfirmationDialog' or not provided -->
 *        [title]="Please confirm"
 *        [bodyMessage]="This change will require you to update the gross payment due"
 *        [textPrimaryButton]="OK">         <!-- Due to textSecondaryButton is missing, only OK button will be displayed -->
 *     </app-confirmation-alert>
 *
 *
 * 2. Using {@link BsModalService} and {@link BsModalRef}:
 *
 *     @Component({ ... })
 *     export class TestPurposeComponent implements OnInit {
 *
 *        public modalRef?: BsModalRef;
 *
 *        constructor(
 *           private modalService: BsModalService
 *        ) {}
 *
 *
 *        ngOnInit() {
 *           const configAlertModal = {
 *              id: 'ConfirmationAlert',
 *              initialState: {
 *                 id: 'ConfirmationAlert',       // IMPORTANT: same value than previous id one. Not required if its value is ConfirmationAlert
 *                 title: 'Please confirm',
 *                 bodyMessage: 'This change will require you to update the gross payment due',
 *                 textSecondaryButton: 'Cancel',
 *                 textPrimaryButton: 'OK'
 *              }
 *           };
 *
 *           this.modalRef = this.modalService.show(
 *              ConfirmationAlertComponent,
 *              configAlertModal
 *           );
 *           this.modalRef.content.onClose.subscribe(() => {
 *              ...
 *           });
 *           this.modalRef.content.onOk.subscribe(() => {
 *              ...
 *           });
 *        }
 *      }
 */
@Component({
  selector: 'app-confirmation-alert',
  templateUrl: './confirmation-alert.component.html',
  styleUrls: ['./confirmation-alert.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ModalModule
  ]
})
export class ConfirmationAlertComponent implements OnInit {

  @Input()
  id: string = 'ConfirmationAlert';

  @Input()
  title: string;

  @Input()
  bodyMessage: string;

  @Input()
  textSecondaryButton: string;

  @Input()
  textPrimaryButton: string;

  @Output()
  onClose: EventEmitter<any>;

  @Output()
  onOk: EventEmitter<any>;

  parentModal: HTMLElement;
  currentAlertModal: HTMLElement;


  constructor(private modalService: BsModalService) {
    this.onClose = new EventEmitter<any>();
    this.onOk = new EventEmitter<any>();
  }


  ngOnInit(): void {
    this.parentModal = (document.body.querySelector('.modal:nth-of-type(1)') as HTMLElement);
    this.currentAlertModal = (document.body.querySelector('.modal:nth-of-type(2)') as HTMLElement);
    this.updateZIndexIfRequired(
      this.parentModal,
      this.currentAlertModal,
      true
    );
  }


  /**
   * If `textPrimaryButton` was defined, manages the click event of the primary button.
   */
  public onOkClick() {
    this.onOk.emit();
    this.updateZIndexIfRequired(
      this.parentModal,
      this.currentAlertModal,
      false
    );
    this.modalService.hide(this.id);
  }


  /**
   * If `textSecondaryButton` was defined, manages the click event of the secondary button.
   */
  public onCloseClick() {
    this.onClose.emit();
    this.updateZIndexIfRequired(
      this.parentModal,
      this.currentAlertModal,
      false
    );
    this.modalService.hide(this.id);
  }


  /**
   * Used to manage background color when there are more than one dialog open.
   */
  private updateZIndexIfRequired(parentModal: HTMLElement,
                                 currentModal: HTMLElement,
                                 onOpen: boolean) {
    // There are 2 modals open
    if (!_.isNil(currentModal)) {
      if (onOpen) {
        parentModal.style.zIndex = '1000';
      } else {
        parentModal.style.zIndex = '1050';
      }
    }
  }

}
