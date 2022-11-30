import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[digitOnly]'
})
export class DigitOnlyDirective {
  inputElement: HTMLInputElement;

  private navigationKeys = [
    'Backspace',
    'Delete',
    'Tab',
    'Escape',
    'Enter',
    'Home',
    'End',
    'ArrowLeft',
    'ArrowRigth',
    'Clear',
    'Copy',
    'Paste'
  ]

  constructor(public el: ElementRef) {
    this.inputElement = el.nativeElement;
   }

   @HostListener('keydown', ['$event'])
   onKeyDown(e: KeyboardEvent) {
    if(e.key === 'Unidentified') {
      return
    }
    if(
      this.navigationKeys.indexOf(e.key) > -1 ||
      (e.key === 'a' && e.ctrlKey === true) ||
      (e.key === 'c' && e.ctrlKey === true) ||
      (e.key === 'v' && e.ctrlKey === true) ||
      (e.key === 'x' && e.ctrlKey === true)
      ) {
        return
      }

      if (e.key === '' || isNaN(Number(e.key))) {
        e.preventDefault()
      }
   }

   @HostListener('input', ['$event'])
    onInput (e: InputEvent) {
      if (e.inputType === 'insertCompositionText' && e.data) {
        // debugger
        // console.log('EL: ', this.el.nativeElement['value'])
        // const oldValue = this.inputElement.value.toString();
        // const newValue = oldValue + e?.data?.replace(/\D/g, '');
        this.inputElement.value = this.inputElement.value.replace(/\D/g, '');
        return
      }
    }

}
