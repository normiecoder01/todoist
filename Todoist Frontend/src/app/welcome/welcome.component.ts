import { Component, OnInit } from '@angular/core';
import { DataGridComponent } from '../shared/components/data-grid/data-grid.component';

/**
 * The `WelcomeComponent` is a standalone Angular component that serves as the entry point for the welcome page of the application.
 * It imports the `DataGridComponent` from the shared components and configures its properties and interface.
 * The component is responsible for rendering the welcome page and its associated data grid.
 */
@Component({
  selector: 'user-task-count',
  standalone: true,
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  imports: [DataGridComponent]
})
export class WelcomeComponent implements OnInit {
  public dataGridConfigProperties2686e84f11a3: any;
  public dataGridInterfaceConfig2686e84f11a3: any;

  constructor() {}

  ngOnInit() {
    this.dataGridConfigProperties2686e84f11a3 = {
      helpText: '',
      styles: { stylesClassName: 'height-400', labelStylesClassName: '' },
      isHidden: false,
      propertyName: '1b2bd515-e438-4793-9177-2686e84f11a3',
      showLabel: false,
      type: 'data-grid',
      formControlName: 'datagrid2',
      navigateTo: '',
      customCssClasses: ['my-1'],
      childs: [],
      icon: 'faTable',
      rowData: [
        {
          id: 0,
          userid: 1,
          username: 'Name0',
          pendingtaskcount: 1,
          completedtaskcount: 1,
          overduetaskcount: 1,
          highprioritytaskcount: 1,
          mediumprioritytaskcount: 1,
          lowprioritytaskcount: 1,
        },
        {
          id: 1,
          userid: 2,
          username: 'Name1',
          pendingtaskcount: 2,
          completedtaskcount: 2,
          overduetaskcount: 2,
          highprioritytaskcount: 2,
          mediumprioritytaskcount: 2,
          lowprioritytaskcount: 2,
        },
        {
          id: 2,
          userid: 3,
          username: 'Name2',
          pendingtaskcount: 3,
          completedtaskcount: 3,
          overduetaskcount: 3,
          highprioritytaskcount: 3,
          mediumprioritytaskcount: 3,
          lowprioritytaskcount: 3,
        },
        {
          id: 3,
          userid: 4,
          username: 'Name3',
          pendingtaskcount: 4,
          completedtaskcount: 4,
          overduetaskcount: 4,
          highprioritytaskcount: 4,
          mediumprioritytaskcount: 4,
          lowprioritytaskcount: 4,
        },
      ],
      listChilds: [],
      styleType: '',
      variableName: 'dataGridConfigProperties2686e84f11a3',
    };
    this.dataGridInterfaceConfig2686e84f11a3 = {
      tableTheme: 'ag-theme-alpine',
      isSortable: false,
      isTableSearchable: false,
      isTableFilterable: false,
      isColumnFilterable: false,
      isPaginationEnabled: true,
      dataSize: '10',
      isColumnMovable: false,
      isColumnResizable: false,
      isRowSelected: false,
      isRowExpandable: false,
      isRowEditable: false,
      isExportToCSVEnabled: false,
      isBulkAddEnabled: false,
      isBulkEditEnabled: false,
      isTableRefreshable: false,
      isRowAddable: false,
      addBtnLabel: 'New Row',
      isRowDeletable: false,
      isEditDrawerEnabled: false,
      columns: [
        {
          label: 'User Id',
          type: 'number',
          hidden: false,
          dropdownOptions: [],
          dateFormat: 'MMM d, yyyy hh:mm:ss',
          alignment: 'left',
          tooltip: true,
          editable: false,
          onClick: {
            storeRowData: false,
            keyToStoredData: '',
            navigateTo: -1,
            apis: [],
          },
          customClass: '',
          field: 'userId',
        },
        {
          label: 'User Name',
          type: 'text',
          hidden: false,
          dropdownOptions: ['Canada', 'India', 'US'],
          dateFormat: 'MMM d, yyyy hh:mm:ss',
          alignment: 'left',
          tooltip: true,
          editable: false,
          onClick: {
            storeRowData: false,
            keyToStoredData: '',
            navigateTo: -1,
            apis: [],
          },
          customClass: '',
          field: 'userName',
        },
        {
          label: 'Pending Task Count',
          type: 'number',
          hidden: false,
          dropdownOptions: [],
          dateFormat: 'yyyy',
          alignment: 'center',
          tooltip: true,
          editable: false,
          onClick: {
            storeRowData: false,
            keyToStoredData: '',
            navigateTo: -1,
            apis: [],
          },
          customClass: '',
          field: 'pendingTaskCount',
        },
        {
          label: 'Completed Task Count',
          type: 'number',
          hidden: false,
          dropdownOptions: [],
          dateFormat: 'MMM d, yyyy hh:mm:ss',
          alignment: 'center',
          tooltip: true,
          editable: false,
          onClick: {
            storeRowData: false,
            keyToStoredData: '',
            navigateTo: -1,
            apis: [],
          },
          customClass: '',
          field: 'completedTaskCount',
        },
        {
          label: 'Overdue Task Count',
          type: 'number',
          dropdownOptions: [],
          hidden: false,
          dateFormat: 'MMM d, yyyy hh:mm:ss',
          alignment: 'center',
          tooltip: true,
          editable: false,
          onClick: {
            storeRowData: false,
            keyToStoredData: '',
            navigateTo: -1,
            apis: [],
          },
          customClass: '',
          field: 'overdueTaskCount',
        },
        {
          label: 'High Priority Task Count',
          type: 'number',
          dropdownOptions: [],
          hidden: false,
          dateFormat: 'MMM d, yyyy hh:mm:ss',
          alignment: 'center',
          tooltip: true,
          editable: false,
          onClick: {
            storeRowData: false,
            keyToStoredData: '',
            navigateTo: -1,
            apis: [],
          },
          customClass: '',
          field: 'highPriorityTaskCount',
        },
        {
          label: 'Medium Priority Task Count',
          type: 'number',
          dropdownOptions: [],
          hidden: false,
          dateFormat: 'MMM d, yyyy hh:mm:ss',
          alignment: 'center',
          tooltip: true,
          onClick: {
            storeRowData: false,
            keyToStoredData: '',
            navigateTo: -1,
            apis: [],
          },
          customClass: '',
          field: 'mediumPriorityTaskCount',
          editable: false,
        },
        {
          label: 'Low Priority Task Count',
          type: 'number',
          dropdownOptions: [],
          hidden: false,
          dateFormat: 'MMM d, yyyy hh:mm:ss',
          alignment: 'center',
          tooltip: true,
          onClick: {
            storeRowData: false,
            keyToStoredData: '',
            navigateTo: -1,
            apis: [],
          },
          customClass: '',
          field: 'lowPriorityTaskCount',
          editable: false,
        },
      ],
      apis: [],
      addRowApis: [],
      deleteRowApis: [],
    };
  }

  gridRowChanged2686e84f11a3(event: any) {
    this.dataGridConfigProperties2686e84f11a3.rowData = [...event.rowData];
  }
  onDeleteRow2686e84f11a3(rowData: any) {
    this.dataGridConfigProperties2686e84f11a3.rowData =
      this.dataGridConfigProperties2686e84f11a3.rowData.filter(
        (row: any) => row.id !== rowData.id,
      );
  }
  saveBulkData2686e84f11a3(event: any) {
    this.dataGridConfigProperties2686e84f11a3.rowData = [...event.rowData];
  }
}
