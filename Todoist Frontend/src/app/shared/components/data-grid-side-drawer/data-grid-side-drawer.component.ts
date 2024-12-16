import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef } from 'ngx-bootstrap/modal';


import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import {
  ColDef,
  GridApi,
  GridReadyEvent,
  RowClickedEvent,
} from 'ag-grid-community';
import {
  faSearch,
  faFileCsv,
  faPlus,
  faFloppyDisk,
  faFontAwesome,
} from '@fortawesome/free-solid-svg-icons';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgSelectModule } from '@ng-select/ng-select';


@Component({
  selector: 'data-grid-side-drawer',
  templateUrl: './data-grid-side-drawer.component.html',
  styleUrls: ['./data-grid-side-drawer.component.scss'],
  standalone: true,
  imports: [DatePipe, CommonModule,ReactiveFormsModule, FormsModule, AgGridModule, FontAwesomeModule, NgSelectModule  ],
})
export class DataGridSideDrawerComponent implements OnInit {
  @Input() columnDefs: any;
  @Input() rowData: any;

  @Output() onUpdate: EventEmitter<any> = new EventEmitter();

  faChevronsRight = faChevronRight as IconProp;

  constructor(private bsModalRef: BsModalRef) {}

  ngOnInit(): void {}

  updateData() {
    this.closeModal();
    this.onUpdate.emit({ action: true, data: this.rowData });
  }

  closeModal() {
    this.onUpdate.emit({ action: false, data: [] });
    this.bsModalRef.hide();
  }

  deleteRecord() {
    this.onUpdate.emit({ action: 'delete', data: this.rowData });
    this.bsModalRef.hide();
  }
}
