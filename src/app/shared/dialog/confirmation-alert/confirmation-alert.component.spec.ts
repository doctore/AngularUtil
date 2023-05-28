import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ConfirmationAlertComponent } from './confirmation-alert.component';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

describe('ConfirmationAlertComponent', () => {

  let modalService: any;

  let component: ConfirmationAlertComponent;
  let fixture: ComponentFixture<ConfirmationAlertComponent>;


  beforeEach(
    waitForAsync(() => {
      modalService = jasmine.createSpyObj('BsModalService',
        [
          'hide'
        ]);
      TestBed.configureTestingModule({
        imports: [
          CommonModule,
          ModalModule.forRoot()
        ],
        providers: [
          { provide: BsModalService, useValue: modalService }
        ]
      })
      .compileComponents();
    })
  );


  it('should create', () => {
    prepareComponent(
      'Alert Dialog Id',
      'Alert Dialog Title',
      'Alert Dialog Body Message',
      'Cancel',
      'Ok'
    );

    expect(component).toBeTruthy();
  });


  it('click on Primary button', () => {
    prepareComponent(
      'Alert Dialog Id',
      'Alert Dialog Title',
      'Alert Dialog Body Message',
      'Cancel',
      'Ok'
    );
    spyOn(component, 'onOkClick');
    spyOn(component, 'onCloseClick');

    const button = fixture.debugElement.query(By.css('#primaryButton')).nativeElement;
    button.click();

    fixture.detectChanges();

    expect(component.onOkClick).toHaveBeenCalledTimes(1);
    expect(component.onCloseClick).not.toHaveBeenCalled();
  });


  it('click on Secondary button', () => {
    prepareComponent(
      'Alert Dialog Id',
      'Alert Dialog Title',
      'Alert Dialog Body Message',
      'Cancel',
      'Ok'
    );
    spyOn(component, 'onOkClick');
    spyOn(component, 'onCloseClick');

    const button = fixture.debugElement.query(By.css('#secondaryButton')).nativeElement;
    button.click();

    fixture.detectChanges();

    expect(component.onCloseClick).toHaveBeenCalledTimes(1);
    expect(component.onOkClick).not.toHaveBeenCalled();
  });


  function prepareComponent(id: string,
                            title: string,
                            bodyMessage: string,
                            textSecondaryButton: string,
                            textPrimaryButton: string) {
    fixture = TestBed.createComponent(ConfirmationAlertComponent);
    component = fixture.componentInstance;

    // Add Input values
    component.id = id;
    component.title = title;
    component.bodyMessage = bodyMessage;
    component.textSecondaryButton = textSecondaryButton;
    component.textPrimaryButton = textPrimaryButton;

    fixture.detectChanges();
  }

});
