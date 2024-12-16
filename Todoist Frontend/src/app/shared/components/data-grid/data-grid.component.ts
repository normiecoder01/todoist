import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import {
  Component,
  EventEmitter,
  Injectable,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
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
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { DataGridSideDrawerComponent } from '../data-grid-side-drawer/data-grid-side-drawer.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@Component({
  selector: 'data-grid',
  imports: [DatePipe, CommonModule,ReactiveFormsModule, FormsModule, AgGridModule, FontAwesomeModule],
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
  standalone: true,
  providers: [BsModalService, DatePipe],
 
})
export class DataGridComponent implements OnInit {
  @Input() configData: any;
  @Input() storageData: any;
  @Input() rowData: any;
  @Input() gridIterfaceConfig: any;
  @Output() rowChanged = new EventEmitter<any>();
  @Output() deleteRow = new EventEmitter<any>();
  @Output() saveBulkData = new EventEmitter<any>();

  public gridLoad: boolean = true;
  public themeClass: string = '';
  public gridRowData: any[] = [];
  public colDefs: any[] = [];
  public defaultColDef: any;
  isPaginationEnabled: boolean = false;
  paginationPageSize: number = 10;
  bulkEdit: boolean = false;
  searchTerm: any;
  private gridApi!: GridApi;
  faSearch = faSearch as IconProp;
  faFileCsv = faFileCsv as IconProp;
  faPlus = faPlus as IconProp;
  faFloppyDisk = faFloppyDisk as IconProp;
  allowOpeningDrawer: boolean = false;
  actionColumnDefs: ColDef[] = [];
  public editType: any;
  dynamicDropDownOptions: boolean = false;
  editedRowsIndexes: number[] = [];
  bsModalRef: BsModalRef | undefined;
  constructor(
   
    private datepipe: DatePipe,
    private modalService: BsModalService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    console.log(this.configData);
    this.setGridOptions();
    // Call the API to fetch data when the component initializes
    this.getTaskReport();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['rowData']) {
      if (this.rowData) {
        this.gridRowData = JSON.parse(JSON.stringify(this.rowData));
         this.gridApi.setRowData(this.gridRowData);
        // changes by rishabh
        //this.gridApi.setGridOption('rowData', this.gridRowData);
      }
    }
  }

  getTaskReport() {
    this.http.get<any[]>('https://localhost:7293/api/Task/user-task-report')
      .subscribe(
        (data) => {
          this.gridRowData = data;
          console.log(this.gridRowData);
          this.gridLoad = false; // Loading completed
        },
        (error) => {
          console.error('Error fetching task report data:', error);
          this.gridLoad = false; // Loading completed even if error
        }
      );
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();
  }

  setGridOptions() {
    if (this.gridIterfaceConfig) {
      this.allowOpeningDrawer = this.gridIterfaceConfig.isEditDrawerEnabled
        ? this.gridIterfaceConfig.isEditDrawerEnabled
        : false;
      if (this.gridIterfaceConfig.isRowEditable) {
        this.editType = 'fullRow';
      } else {
        this.editType = '';
      }
      this.defaultColDef = {
        headerClass: 'ag-center-aligned-header',
        resizable: this.gridIterfaceConfig.isColumnResizable || false,
        sortable: this.gridIterfaceConfig.isSortable || false,
        checkboxSelection: this.gridIterfaceConfig.isRowSelected || false,
        filter: this.gridIterfaceConfig.isTableFilterable || false,
        flex: 1,
        minWidth: 100,
      };
      this.themeClass = this.gridIterfaceConfig.tableTheme ?? 'ag-theme-alpine';
      this.isPaginationEnabled = this.gridIterfaceConfig.isPaginationEnabled;
      this.paginationPageSize = this.gridIterfaceConfig.dataSize || 10;
      this.setColumnDefs(this.gridIterfaceConfig);
      this.setActionColumn();
    }
  }

  setColumnDefs(gridIterfaceConfig: any) {
    // Condition to set bulk edit true
    if (gridIterfaceConfig.isBulkEditEnabled) {
      this.bulkEdit = true;
    }
    this.colDefs = gridIterfaceConfig.columns.map((c: any) => ({
      field: c.field,
      columnType: c.type,
      headerName: c.label,
      cellStyle: {
        textAlign:
          c.alignment === 'left'
            ? 'left'
            : c.alignment === 'right'
              ? 'right'
              : 'center',
        padding: 10,
      },
      dynamicDropdownOptions: c?.dynamicDropdownOptions ?? undefined,
      dynamicDropDownKey: c?.dynamicDropDownKey ?? undefined,
      optionsKey: c?.optionsKey ?? undefined,
      dropdownOptions: c?.dropdownOptions ?? undefined,
      isColumnEditable: c?.editable ?? false,
      tooltipField: c.tooltip ? c.field : null,
      cellRenderer: (data: any) => {
        if (c.type === 'dateTime') {
          return data?.value !== null && data?.value !== undefined
            ? !isNaN(new Date(data.value)?.getTime())
              ? this.datepipe.transform(new Date(data.value), c.dateFormat)
              : ''
            : '';
        } else if (c.type === 'link') {
          return data?.value
            ? `<span class="clickable-txt w-100">${data.value}</span>`
            : '';
        } else {
          return data.value;
        }
      },
      onCellClicked: (value: any) => {
        this.handleCellClick(value);
      },
      cellEditor:
        c.type === 'dropdown'
          ? 'agSelectCellEditor'
          : c.type === 'number'
            ? 'agNumberCellEditor'
            : c.type === 'dateTime'
              ? 'agDateStringCellEditor'
              : c.type === 'boolean'
                ? 'agCheckboxCellEditor'
                : '',
      editable: this.isCellEditable.bind(this),
      cellEditorPopup: c.type === 'dropdown' ? true : false,
      cellEditorParams: this.getDropDownOptions,
      clickAction: c.onClick ?? {},
      hide: c.hidden ?? false,
      editType: this.gridIterfaceConfig.isRowEditable ? 'fullRow' : '',
      width: c.type === 'dropdown' ? 200 : 0,
      rowHeight: 50,
    }));
  }

  getDropDownOptions(params: any) {
    const colDef = params.colDef;
    if (colDef?.dynamicDropdownOptions) {
      const key = colDef.dynamicDropDownKey;
      const listItemsString = sessionStorage.getItem(key);
      if (listItemsString) {
        const listItems = JSON.parse(listItemsString);
        if (listItems) {
          const dropdownOptions = listItems.map(
            (list: any) => list[colDef.optionsKey],
          );
          return { values: dropdownOptions };
        }
      }
      return { values: [] };
    }
    return {
      values: colDef?.dropdownOptions ? [...colDef.dropdownOptions] : [],
    };
  }

  isCellEditable(cell: any) {
    if (cell.data.isNewRow && cell.colDef.isColumnEditable) {
      return true;
    } else if (
      cell.colDef.isColumnEditable &&
      (this.gridIterfaceConfig.isRowEditable ||
        this.gridIterfaceConfig.isBulkEditEnabled)
    ) {
      return true;
    } else {
      return false;
    }
  }

  onFilterTextBoxChanged() {
    (this.gridApi as any).setQuickFilter(this.searchTerm);
  }

  onBtnExport() {
    this.gridApi.exportDataAsCsv();
  }

  handleCellClick(cellObj: any) {
    const clickedCol = this.colDefs.find(
      (item) => item.field === cellObj?.colDef?.field,
    );
    if (clickedCol) {
      if (clickedCol?.clickAction?.storeRowData) {
        //save row data to session storage
        sessionStorage.setItem(
          clickedCol?.clickAction?.keyToStoredData,
          JSON.stringify(cellObj?.node?.data),
        );
      }
      if (clickedCol?.columnType === 'link') {
        let url = cellObj?.value;
        url = url.match(/^https?:/) ? url : '//' + url; //urls should prefix // if we need it open it in a new tab
        window.open(`${url}`, '_blank');
      }
    }
  }

  onClickAddRow() {
    // Disbaling Side Drawer until record is been added
    this.allowOpeningDrawer = false;
    let newData: any = {};
    // Condition to check bulk rows is enabled
    if (this.gridIterfaceConfig?.isBulkAddEnabled) {
      this.addDefaultEmptyRows();
    } else {
      this.colDefs?.forEach((col) => {
        newData[col.field] = null;
        newData['isNewRow'] = true;
      });
      const allData = [newData, ...this.gridRowData];
      this.gridRowData = allData;
      (this.gridApi as any).setRowData(allData);
      if (
        this.gridIterfaceConfig.isRowAddable &&
        !this.gridIterfaceConfig.isRowEditable
      ) {
        this.editType = 'fullRow';
        setTimeout(() => {
          this.gridApi.setFocusedCell(0, this.colDefs[0]?.field);
          this.gridApi.startEditingCell({
            rowIndex: 0,
            colKey: this.colDefs[0]?.field,
          });
        }, 500);
      }
    }
  }

  setActionColumn() {
    if (
      this.gridIterfaceConfig.isRowEditable &&
      !this.gridIterfaceConfig.isEditDrawerEnabled
    )
      this.actionColumnDefs.push({
        headerName: '',
        cellStyle: {
          textAlign: 'center',
        },
        tooltipField: 'Edit',
        hide: false,
        editable: false,
        resizable: false,
        width: 50,
        minWidth: 50,
        maxWidth: 50,
        suppressSizeToFit: false,
        pinned: 'right',
        onCellClicked: (value: any) => {
          this.onClickEditBtn(value);
        },
        cellRenderer: (data: any) => {
          return this.gridIterfaceConfig.isRowEditable
            ? `<button class="btn btn-sm edit-btn">
                <svg role="img" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash" class="svg-inline--fa fa-trash fa-w-14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path fill="currentColor" d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/>
                </svg>
              </button>`
            : '';
        },
      });
    if (
      this.gridIterfaceConfig.isRowDeletable &&
      !this.gridIterfaceConfig.isEditDrawerEnabled
    )
      this.actionColumnDefs.push({
        headerName: '',
        cellStyle: {
          textAlign: 'center',
        },
        tooltipField: 'Delete',
        hide: false,
        editable: false,
        resizable: false,
        width: 50,
        minWidth: 50,
        maxWidth: 50,
        suppressSizeToFit: false,
        pinned: 'right',
        onCellClicked: (value: any) => {
          this.onClickDeleteBtn(value);
        },
        cellRenderer: (data: any) => {
          return this.gridIterfaceConfig.isRowDeletable
            ? `<button class="btn btn-sm delete-btn">
                  <svg role="img" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash" class="svg-inline--fa fa-trash fa-w-14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path fill="currentColor" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z">
                  </path>
                  </svg>
                </button>`
            : '';
        },
      });
    if (this.actionColumnDefs.length > 0) {
      this.colDefs = [...this.colDefs, ...this.actionColumnDefs];
    }
  }

  onRowValueChanged($event: any) {
    // Enabling Side Drawer after record is been added
    this.allowOpeningDrawer = true;
    if (
      (this.gridIterfaceConfig?.isRowEditable &&
        !this.gridIterfaceConfig?.isBulkEditEnabled) ||
      (this.gridIterfaceConfig?.isRowAddable &&
        !this.gridIterfaceConfig?.isRowEditable)
    ) {
      if (
        this.gridIterfaceConfig?.isRowAddable &&
        !this.gridIterfaceConfig?.isRowEditable
      ) {
        this.editType = '';
      }

      const dataToEmit = {
        updatedRow: $event,
        rowData: this.gridRowData,
      };
      this.rowChanged.emit(dataToEmit);
    } else if (this.gridIterfaceConfig?.isBulkEditEnabled) {
      this.editedRowsIndexes.push($event.rowIndex);
    }
  }

  onCellValueChanged($event: any) {
    // Enabling Side Drawer after record is been added
    if (this.gridIterfaceConfig?.isEditDrawerEnabled) {
      this.allowOpeningDrawer = true;
    }
    if (
      this.gridIterfaceConfig.isBulkEditEnabled ||
      this.gridIterfaceConfig.isBulkAddEnabled
    ) {
      this.editedRowsIndexes.push($event.rowIndex);
    }
  }

  onClickEditBtn($event: any) {
    this.gridApi.setFocusedCell($event.rowIndex, this.colDefs[0]?.field);
    this.gridApi.startEditingCell({
      rowIndex: $event.rowIndex,
      colKey: $event.column,
    });
  }

  onClickDeleteBtn($event: any) {
    if (
      Object.entries($event.data)
        .filter(([key]) => key !== 'isNewRow')
        .every(([, value]) => value === null)
    ) {
      this.gridRowData.splice($event.rowIndex, 1);
      (this.gridApi as any).setRowData(this.gridRowData);
    } else {
      this.deleteRow.emit($event.data);
    }
  }

  addDefaultEmptyRows() {
    var bulkAddRowData: any[] = [];
    for (let i = 0; i < 10; i++) {
      let rowData: any = {};
      this.colDefs?.forEach((col) => {
        if (col.field) {
          rowData[col.field] = null;
          rowData['isNewRow'] = true;
        } else {
          col['field'] = col.headerName;
        }
      });
      bulkAddRowData.push(rowData);
    }
    this.gridRowData = [...this.gridRowData, ...bulkAddRowData];
    (this.gridApi as any).setRowData(this.gridRowData);
    const totalPages = this.gridApi.paginationGetTotalPages();
    const targetPage = totalPages === 2 ? totalPages - 1 : totalPages - 2;
    this.gridApi.paginationGoToPage(targetPage);
  }

  saveRowData($event: any) {
    let filteredData: any[] = [];
    this.editedRowsIndexes = [...new Set(this.editedRowsIndexes)];
    filteredData = this.gridRowData
      .filter((row: any, index: number) =>
        this.editedRowsIndexes.includes(index),
      )
      .sort((a: any, b: any) => {
        const isNewRowA = a.hasOwnProperty('isNewRow') ? a.isNewRow : false;
        const isNewRowB = b.hasOwnProperty('isNewRow') ? b.isNewRow : false;
        if (isNewRowA && !isNewRowB) {
          return 1;
        } else if (!isNewRowA && isNewRowB) {
          return -1;
        } else {
          return 0;
        }
      });
    this.editedRowsIndexes = [];
    this.gridRowData = this.gridRowData.filter(
      (obj: any) =>
        !Object.entries(obj).every(
          ([key, value]) => key === 'isNewRow' || value === null,
        ),
    );
    const dataToEmit = {
      updatedRow: filteredData,
      rowData: this.gridRowData,
    };
    this.saveBulkData.emit(dataToEmit);
  }

  onRowClicked(rowValue: any) {
    //Condition to check whether opening drawer is enabled
    if (
      this.gridIterfaceConfig?.isEditDrawerEnabled &&
      this.allowOpeningDrawer
    ) {
      const initialState = {
        columnDefs: rowValue.columnApi['columnModel'].columnDefs,
        rowData: rowValue,
      };
      initialState.columnDefs.forEach((colDef: any) => {
        if (colDef.columnType === 'dropdown') {
          colDef.dropdownValues = this.getDropDownOptions({ colDef });
        }
      });
      this.bsModalRef = this.modalService.show(DataGridSideDrawerComponent, {
        initialState,
        ignoreBackdropClick: true,
        class: 'side-drawer',
      });

      this.bsModalRef.content.onUpdate.subscribe((res: any) => {
        // Condition to update a record
        if (res.action === true) {
          this.gridRowData[res.data.rowIndex] = res.data.data;
          const dataToEmit = {
            updatedRow: res.data,
            rowData: this.gridRowData,
          };
          this.rowChanged.emit(dataToEmit);
        }
        // Condition to delete a record
        if (res.action === 'delete') {
          this.onClickDeleteBtn(res.data);
        }
      });
    }
  }

  getCustomCssClasses() {
    let classes = '';
    if (
      this.configData.customCssClasses &&
      this.configData.customCssClasses.length > 0
    ) {
      classes = this.configData.customCssClasses.join(' ');
    }
    return classes;
  }
}
