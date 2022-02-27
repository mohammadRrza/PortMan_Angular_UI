import { Component, OnInit } from '@angular/core';
import { SwitchService } from '../../../services/switch.service';
import { BackupService } from '../../../services/backup.serveice';

@Component({
  selector: 'app-telecom-costs',
  templateUrl: './telecom-costs.component.html',
  styleUrls: ['./telecom-costs.component.css']
})
export class TelecomCostsComponent implements OnInit {

  constructor(private switchSrv:SwitchService,
              private BackupSrv:BackupService) { }

  backup_errors = [];
  view_backup_Error: boolean = false;
  view_error_text: boolean = false;
  backup_error_text: string;

  get_SSH_Error(backup_error){
    this.switchSrv.get_backup_error_text(backup_error).then(res=>{
      this.backup_error_text = res.response;
      this.view_backup_Error = true;
    });
  }

  see_errors_text_file(){
    this.view_error_text = true;
  }
  send_errors_text_file(){
    this.BackupSrv.send_router_errors_text_file().then(res=>{
      this.BackupSrv.send_switch_errors_text_file().then(res=>{
      });
    });
  }
  ngOnInit(): void {
    this.switchSrv.get_backup_error_file().then(res=>{
      this.backup_errors = res.response;
    });

  }

}
