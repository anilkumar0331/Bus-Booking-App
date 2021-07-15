import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Bus } from 'src/app/models/bus.model';
import { BusService } from 'src/app/services/bus.service';
import { Data } from 'src/app/shared/Data';

@Component({
  selector: 'plan-trip',
  templateUrl: './plan-trip.component.html',
  styleUrls: ['./plan-trip.component.css'],
})
export class PlanTripComponent implements OnInit {
  @Output('busDetails') details = new EventEmitter();

  constructor(private busService: BusService) {}

  places = ['Hyderabad', 'Chennai', 'Bangalore', 'Delhi'];

  detailsOfBus: any | null = null;

  date: any;

  pipe = new DatePipe('en-US');

  public busDetails: Bus[];

  public response: boolean; //to display bus details table

  public check: boolean = true; // to display edit and reset

  public error: boolean; //to display error message

  currentDate: Date = new Date();

  // Form
  planTripForm: FormGroup;

  ngOnInit() {
    this.planTripForm = new FormGroup({
      from: new FormControl(null, [Validators.required]),
      to: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
    });
  }

  //Custom Functions

  planTrip() {
    if (this.planTripForm.value.from === this.planTripForm.value.to) {
      this.error = true;
      this.response = false;
      this.check = false;
    } else {
      this.busService
        .getBusDetails({
          from: this.planTripForm.value.from,
          to: this.planTripForm.value.to,
        })
        .subscribe((res: Data) => {
          this.busDetails = res.buses;
        });
      this.response = true;
      this.date = this.pipe.transform(
        this.planTripForm.value.date,
        'MM/dd/yyyy'
      );
      this.error = false;
      this.check = false;
      this.planTripForm.controls['from'].disable();
      this.planTripForm.controls['to'].disable();
      this.planTripForm.controls['date'].disable();
    }
  }

  edit() {
    this.check = true;
    this.planTripForm.controls['from'].enable();
    this.planTripForm.controls['to'].enable();
    this.planTripForm.controls['date'].enable();
  }

  reset() {
    this.response = false;
    this.check = true;
    this.planTripForm.reset();
    this.planTripForm.controls['from'].enable();
    this.planTripForm.controls['to'].enable();
    this.planTripForm.controls['date'].enable();
  }

  //Sending detailsOfBus to SelectSeats Component

  viewSeats(bus: any) {
    this.detailsOfBus = {
      id: bus._id,
      from: this.planTripForm.value.from,
      to: this.planTripForm.value.to,
      date: this.date,
      busType: bus.busType,
      fare: bus.fare,
      available: bus.available,
      reservedSeats: bus.reservedSeats,
    };
    this.details.emit(this.detailsOfBus);
  }
}
