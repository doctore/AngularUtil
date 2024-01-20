import { DisableDblClickDirective } from '@app-shared/directive';
import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

/**
 * To invoke only this test:
 *
 *    ng test --include src/app/shared/directive/disable-dblclick/disable-dblclick.directive.spec.ts
 */
describe('DisableDblClickDirective default values', () => {

  let fixture: ComponentFixture<TestComponentDirectiveDefaultValues>;
  let inputElement: HTMLInputElement;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [
        DisableDblClickDirective,
        TestComponentDirectiveDefaultValues
      ],
    }).createComponent(TestComponentDirectiveDefaultValues);

    // Initial binding
    fixture.detectChanges();

    // Input element with an attached DisableDblClickDirective
    inputElement = fixture.debugElement.queryAll(By.directive(DisableDblClickDirective))[0].nativeElement as HTMLInputElement;
  });


  it('should create an instance', () => {
    const directive = new DisableDblClickDirective();
    expect(directive).toBeTruthy();
  });


  it('wait default disableTimeout value after double click', fakeAsync(() => {
    expect(inputElement.disabled).toBeFalse();

    // Simulate double click on input
    inputElement.click();
    inputElement.click();

    expect(inputElement.disabled).toBeTrue();
    tick(550);

    expect(inputElement.disabled).toBeFalse();
  }));

});



describe('DisableDblClickDirective custom values disabling double click', () => {

  let fixture: ComponentFixture<TestComponentDirectiveCustomValuesDisableDbClick>;
  let inputElement: HTMLInputElement;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [
        DisableDblClickDirective,
        TestComponentDirectiveCustomValuesDisableDbClick
      ],
    }).createComponent(TestComponentDirectiveCustomValuesDisableDbClick);

    // Initial binding
    fixture.detectChanges();

    // Input element with an attached DisableDblClickDirective
    inputElement = fixture.debugElement.queryAll(By.directive(DisableDblClickDirective))[0].nativeElement as HTMLInputElement;
  });


  it('should create an instance', () => {
    const directive = new DisableDblClickDirective();
    expect(directive).toBeTruthy();
  });


  it('wait custom disableTimeout value after double click', fakeAsync(() => {
    expect(inputElement.disabled).toBeFalse();

    // Simulate double click on input
    inputElement.click();
    inputElement.click();

    expect(inputElement.disabled).toBeTrue();
    tick(550);

    expect(inputElement.disabled).toBeTrue();
    tick(550);

    expect(inputElement.disabled).toBeFalse();
  }));

});



describe('DisableDblClickDirective custom values not disabling double click', () => {

  let fixture: ComponentFixture<TestComponentDirectiveCustomValuesDoNotDisableDbClick>;
  let inputElement: HTMLInputElement;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [
        DisableDblClickDirective,
        TestComponentDirectiveCustomValuesDoNotDisableDbClick
      ],
    }).createComponent(TestComponentDirectiveCustomValuesDoNotDisableDbClick);

    // Initial binding
    fixture.detectChanges();

    // Input element with an attached DisableDblClickDirective
    inputElement = fixture.debugElement.queryAll(By.directive(DisableDblClickDirective))[0].nativeElement as HTMLInputElement;
  });


  it('should create an instance', () => {
    const directive = new DisableDblClickDirective();
    expect(directive).toBeTruthy();
  });


  it('wait custom disableTimeout value after double click', fakeAsync(() => {
    expect(inputElement.disabled).toBeFalse();

    // Simulate double click on input
    inputElement.click();
    inputElement.click();

    expect(inputElement.disabled).toBeFalse();
    tick(550);

    expect(inputElement.disabled).toBeFalse();
    tick(550);

    expect(inputElement.disabled).toBeFalse();
  }));

});



@Component({
  standalone: true,
  template: '<input disableDblClick />',
  imports: [DisableDblClickDirective],
})
class TestComponentDirectiveDefaultValues {}



@Component({
  standalone: true,
  template: '<input disableDblClick [disableIf]="true" [disableTimeout]="1000" />',
  imports: [DisableDblClickDirective],
})
class TestComponentDirectiveCustomValuesDisableDbClick {}



@Component({
  standalone: true,
  template: '<input disableDblClick [disableIf]="false" [disableTimeout]="1000" />',
  imports: [DisableDblClickDirective],
})
class TestComponentDirectiveCustomValuesDoNotDisableDbClick {}
