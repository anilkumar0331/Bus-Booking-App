import { Component, OnInit } from '@angular/core';

interface ITab {
  title: string;
  content: string;
  removable?: boolean;
  disabled?: boolean;
  active?: boolean;
  customClass?: string;
}

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
})
export class ParentComponent implements OnInit {
  ngOnInit(): void {}

  busInfo: any | null = null;

  bookingInfo: any | null = null;

  ticketInfo: any | null = null;

  constructor() {}

  getBusDetails(value) {
    this.busInfo = value;
  }

  getBookingDetails(value) {
    this.bookingInfo = value;
  }

  getTicketDetails(value) {
    this.ticketInfo = value;
  }
}
