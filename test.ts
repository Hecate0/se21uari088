import { Component,OnInit, Type} from '@angular/core';
import { InventoryService } from '../inventory.service';
import { FormBuilder,FormControl,FormGroup,Validator } from '@angular/forms';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent {
  windowPrevState: number[] = [];
  windowCurrState: number[] = [];
  numbers: number[] = [];
  avg: number = 0;
  calculator:any=FormBuilder;
  windowSize: number = 10;

  constructor(
    private inser:InventoryService,
    private fb :FormBuilder
  ){ }
  ngOnInit(): void {
    this.getNumbers('primes'); // Replace 'primes' with the desired type, such as 'fibonacci', 'even', or 'random'
  }

  getNumbers(type: string): void {
    this.inser.getNumbers(type).subscribe(
      (res:any) => {
        // Ensure to handle the API response
        if (res && res.numbers) {
          this.updateState(res.numbers);
        }
      },
     (err:any)=> {
        console.error('Error fetching data', err);
      }
    );
  }

  updateState(newNumbers: number[]): void {
  
    this.windowPrevState = [...this.windowCurrState];

    const updatedNumbers = [...this.windowCurrState, ...newNumbers];

    this.windowCurrState = Array.from(new Set(updatedNumbers)).slice(-this.windowSize);

    this.numbers = this.windowCurrState;
    this.avg = this.calculateAverage(this.windowCurrState);
  }

  calculateAverage(numbers: number[]): number {
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
  }
}


