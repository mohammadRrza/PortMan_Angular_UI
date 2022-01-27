import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../../services/contact.service';
import * as fileSaver from 'file-saver';
import * as xlsx from "xlsx"; 
@Component({
  selector: 'app-ddr-page-info',
  templateUrl: './ddr-page-info.component.html',
  styleUrls: ['./ddr-page-info.component.css']
})
export class DdrPageInfoComponent implements OnInit {

  constructor(private contSrv:ContactService) {
    this.pagination_config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 0
    };
   }
   pagination_config;
   farzanegan_data = [];
   farzanegan_data_total;

   get_ddr_info(username, currentPage, itemsPerPage){
    this.contSrv.get_ddr_info(username, currentPage, itemsPerPage).then(res=>{
      this.farzanegan_data = res.results;
      this.pagination_config.totalItems = res.count;
    });
    
   }

   get_ddr_info_total(username){
    this.contSrv.get_ddr_info_total(username).then(res=>{
      this.farzanegan_data_total = res.result;
    });
    
   }

   paginate(event) {
    this.pagination_config.currentPage = event.page + 1;
    this.pagination_config.itemsPerPage = event.rows;
    this.get_ddr_info('',this.pagination_config.currentPage, this.pagination_config.itemsPerPage);    
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.farzanegan_data);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "Data");
    });
}


saveAsExcelFile(buffer: any, fileName: string): void {
  import("file-saver").then(FileSaver => {
    let EXCEL_TYPE =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    let EXCEL_EXTENSION = ".xlsx";
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(
      data,
      fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
    );
  });
}

  ngOnInit(): void {
    this.get_ddr_info_total('Iran-sepanta');
    this.get_ddr_info('', this.pagination_config.currentPage, this.pagination_config.itemsPerPage);
  }

}
