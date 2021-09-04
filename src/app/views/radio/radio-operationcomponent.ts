import { Component, OnInit } from '@angular/core';
import { RadioService } from '../../../services/radio.service'
import { RadioCommandService } from '../../../services/radio-command.service'
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-radio',
  templateUrl: './radio-operationcomponent.html',
  styleUrls: ['./radio-operationcomponent.css']
})
export class RadioOperationComponent implements OnInit {

  constructor(private radioSrv: RadioService,
              private radioCommandSrv: RadioCommandService,
              private route: ActivatedRoute) {
                this.route.queryParams.subscribe(params => {
                  this.radio_id = params['radio_Id'];
                  });
  }
  radio_commands = [];
  radio_commands_list = [{ id: 12, radio_command_description: "get Backup", radio_command_text: "get Backup" }];
  keyword = 'radio_command_text';
  comm_item = {};
  show_backup_files = false;
  filenames = [];
  filenames_obj = [];
  obj_data = {} as dataObj;
  view_backup_file: boolean = false;
  bakup_text: string;
  radio_id: string;

  get_radio_commands(radio_type_id, limit_row) {
    this.radioCommandSrv.get_radio_commands(radio_type_id, limit_row).then(res => {
      this.radio_commands = this.radio_commands_list;
    });
  }

  onChangeSearch(search: string) {
    console.log(search);

  }

  onFocused(e) {
    console.log('onFocused');

  }

  selectEvent(item) {
    console.log(item)
    this.comm_item = item;
    if (item.radio_command_text == 'get Backup') {
      this.show_backup_files = true;
      this.get_backup_files_name(this.radio_id);
    }
    else {
      this.show_backup_files = false;
    }
  }

  view_backup(filename){
    this.view_backup_file = true;
    this.radioSrv.download_backup_file(filename).then(res=>{
       this.bakup_text = res.response;
    });
  }

  get_backup_files_name(radio_id){
    this.radioSrv.get_backup_files_name(radio_id).then(res=>{
      let obj = JSON.parse(res.response);
      console.log(obj[0])
      this.filenames = obj[0];
    });
  }

  ngOnInit(): void {
    this.radio_commands = this.radio_commands_list;
    console.log(this.radio_commands);
  }

}

export interface dataObj {
  name: string;
  date: Date;
}