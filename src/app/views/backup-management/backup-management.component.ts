import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-backup-management',
  templateUrl: './backup-management.component.html',
  styleUrls: ['./backup-management.component.css']
})
export class BackupManagementComponent implements OnInit {

  constructor() { }
  view_backup_Error: boolean;
  view_error_text: boolean;
  backup_errors: any; 
  backup_error_text: string;
  ngOnInit(): void {
  }

}
