import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DslamPortService } from '../../../services/dslam-port.service';
import { CommandService } from '../../../services/command.service';
import { WebsocketService } from '../../../services/websocket.service';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import * as Highcharts from 'highcharts';
declare var require: any;

@Component({
    selector: 'app-dslamPort',
    templateUrl: './dslamPort-operation.component.html',
    styleUrls: ['./dslamPort-operation.component.css']

})
export class DslamPortOperationComponent implements OnInit {

    constructor(private route: ActivatedRoute,
        private dsportSrv: DslamPortService,
        private cmdSrv: CommandService,
        private websockSrv: WebsocketService) {
        this.route.queryParams.subscribe(params => {
            this.port_id = params['portId'];
            this.dslam_id = params['dslam_id'];
            this.hist_data = {
                labels: [],
                datasets: [
                    {
                        data: [],
                        backgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56"
                        ],
                        hoverBackgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56"
                        ]
                    }]
            };
        });
    }
    ws: WebSocketSubject<any> = webSocket('ws://5.202.129.160:2083/ws/');
    port_traffic_highcharts = Highcharts;
    port_attainable_rate_change_highcharts = Highcharts;
    port_attenuation_change_highcharts = Highcharts;
    port_snr_change_highcharts = Highcharts;
    port_tx_rate_highcharts = Highcharts;
    port_id: Number;
    dslam_id: Number;
    report_his_info;
    end_dateObject: any;
    is_ldap_login: string;
    show_pichart:boolean=false;
    start_dateObject = "";
    agent_username: string;
    send_dateObject = "";
    ldap_email: string;
    dslamPort_info :any = {};
    dslamPortcammand_info = {};
    hist_labels_arr = [];
    hist_datasets_arr = [];
    hist_attainable_arr = [];
    dslamPort_info2: any;
    keyword = 'name';
    commandObj = [];
    com_hist = [];
    message = "";
    h_chart: any;
    hide_chart: boolean = true;
    webSock_res;
    hist_data: any;
    ws_res: any;
    comm_item = {};
    adsl_up_att = [];
    adsl_down_att = [];
    adsl_down_att_rate;
    adsl_up_att_rate;
    incoming_traffic_att_rate;
    outcoming_traffic_att_rate;
    incoming_traffic_att = [];
    outcoming_traffic_att = [];
    adsl_down_atten_rate;
    adsl_up_atten_rate;
    adsl_down_atten = [];
    adsl_up_atten = [];
    adsl_up_snr_rate;
    adsl_down_snr_rate;
    adsl_up_snr = [];
    adsl_down_snr = [];
    adsl_up_tx_rate;
    adsl_down_tx_rate;
    adsl_up_tx = [];
    adsl_down_tx = [];
    _time = new Array();
    show_result: boolean = false;
    his_attainable_rate;
    his_attainable_rate_chartOptions;
    his_attenuation_rate;
    his_attenuation_rate_chartOptions;
    his_snr_data_rate;
    his_snr_data_rate_chartOptions;
    his_tx_data_rate;
    his_tx_data_rate_chartOptions;

    /////////////////// port_traffic //////////////////////////////////////////////////////

    data = [{

        name: 'Send',

        data: []

    }, {

        name: 'Receive',

        data: []

    }];
    chartOptions = {

        chart: {
            zoomType: 'x',
            type: "area"

        },
        credits: {
            enabled: false
        },
        title: {

            text: "Port Traffic"

        },

        xAxis: {

            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

        },

        yAxis: {

            title: {

                text: "Port Traffic"

            }

        },

        series: this.data

    };
    /////////////////// port_attainable //////////////////////////////////////////////////////
    port_attainable_data = [{

        name: 'Downstream',

        data: []

    }, {

        name: 'Upstream',

        data: []

    }];
    port_attainable_rate_chartOptions = {

        chart: {
            zoomType: 'x',
            type: "area"

        },
        credits: {
            enabled: false
        },
        title: {

            text: "Port Attainable Rate Change"

        },

        xAxis: {

            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

        },

        yAxis: {

            title: {

                text: "Port Attainable Rate Change"

            }

        },

        series: this.port_attainable_data

    };

    /////////////////// port_attenuation_change //////////////////////////////////////////////////////
    port_attenuation_change_data = [{

        name: 'Downstream',

        data: []

    }, {

        name: 'Upstream',

        data: []

    }];
    port_attenuation_change_chartOptions = {

        chart: {
            zoomType: 'x',
            type: "area"

        },
        credits: {
            enabled: false
        },
        title: {

            text: "Port Attenuation Change"

        },

        xAxis: {

            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

        },

        yAxis: {

            title: {

                text: "Port Attenuation Change"

            }

        },

        series: this.port_attenuation_change_data

    };
    /////////////////// port_snr_change //////////////////////////////////////////////////////
    port_snr_change_data = [{

        name: 'Downstream',

        data: []

    }, {

        name: 'Upstream',

        data: []

    }];
    port_snr_change_chartOptions = {

        chart: {
            zoomType: 'x',
            type: "area"

        },
        credits: {
            enabled: false
        },
        title: {

            text: "Port SNR Change"

        },

        xAxis: {

            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

        },

        yAxis: {

            title: {

                text: "Port SNR Change"

            }

        },

        series: this.port_snr_change_data

    };

    ///////////////// port_tx_rate //////////////////////////////////////////////////
    port_tx_change_data = [{

        name: 'Downstream',

        data: []

    }, {

        name: 'Upstream',

        data: []

    }];
    port_tx_change_chartOptions = {

        chart: {
            zoomType: 'x',
            type: "area"

        },
        credits: {
            enabled: false
        },
        title: {

            text: "Port TX Change"

        },

        xAxis: {

            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

        },

        yAxis: {

            title: {

                text: "Port TX Change"

            }

        },

        series: this.port_tx_change_data

    };
    ///////////////////////////////////////////////////////////////////////////
    selectEvent(item) {
        console.log(item);
        this.comm_item = item;
        this.get_port_command_history(this.dslam_id, this.port_id, item.id, 1);
    }

    onChangeSearch(search: string) {
        console.log(search);

    }

    onFocused(e) {
        if(this.is_ldap_login == 'true'){
            this.load_commands_by_email(this.dslam_id,this.ldap_email,this.is_ldap_login, 'dslam');
          }
          else{
            this.agent_username = localStorage.getItem("username");
            this.load_commands_by_username(this.dslam_id, this.agent_username, this.is_ldap_login, 'dslam'); 
            }
    }

    get_dslamPort_info(port_id) {
        this.dsportSrv.get_dslamPort_info(port_id).then(res => {
            this.dslamPort_info = res;
            this.dslamPort_info2 = this.dslamPort_info;

        });
    }



    load_commands_by_email(dslam_id, ldap_email, is_ldap_login, type) {
        this.cmdSrv.load_port_commands_by_email(dslam_id, ldap_email, is_ldap_login, type).then(res => {
            this.commandObj = res;
        });

    }

    load_commands_by_username(dslam_id, username, is_ldap_login, type) {
        this.cmdSrv.load_port_commands_by_username(dslam_id, username, is_ldap_login, type).then(res => {
            this.commandObj = res;
        });

    }
    
    run_command(command_obj) {
        this.show_result = false;
        var command_str = '{"dslam_id":' + this.dslam_id + ',"params":{"type":"dslamport","is_queue":false,"dslam_id":"' + this.dslam_id + '","port_conditions":{"slot_number":' + this.dslamPort_info2.slot_number + ',"port_number":' + this.dslamPort_info2.port_number + '}},"command":"' + command_obj.name + '","new_lineprofile":""}';
        this.dsportSrv.run_command(command_str).then(res => {
            console.log(res);
            this.dslamPortcammand_info = res.response.result;
        });
    }

    get_last_command(dslam_id, port_id) {
        this.show_result = false;
        this.dsportSrv.get_last_command(dslam_id, port_id).then(res => {
            this.dslamPortcammand_info = res[0].value.result;
            this.dslamPort_info = {}
            this.show_result = true;
        });
    }

    get_port_command_history(dslam_id, port_id, command_type_id, limit_row) {
        this.dsportSrv.get_port_command_history(dslam_id, port_id, command_type_id, limit_row).then(res => {
            this.com_hist = res;
        });
    }

    get_live_data() {

        this.port_traffic_highcharts = Highcharts;
        setTimeout(() => {
            this.hide_chart = false;
            this.message = '{"action": "port_status", "params": {"port":{"port_index":' + this.dslamPort_info2.port_index + ',"port_number":' + this.dslamPort_info2.port_number + ',"slot_number":' + this.dslamPort_info2.slot_number + ' }}, "dslam_id":' + this.dslam_id + '}';
            this.ws = webSocket('ws://172.28.238.114:2083/ws/');
            this.ws.next({ message: this.message });
            this.ws.subscribe(
                data => {
                    this.webSock_res = data;
                    data = JSON.parse(data);
                    this.incoming_traffic_att_rate = parseInt(data['INCOMING_TRAFFIC_AVERAGE_RATE'])
                    this.outcoming_traffic_att_rate = parseInt(data['OUTGOING_TRAFFIC_AVERAGE_RATE'])
                    this.adsl_down_att_rate = parseInt(data['ADSL_DOWNSTREAM_ATTEN'])
                    this.adsl_up_att_rate = parseInt(data['ADSL_UPSTREAM_ATTEN'])
                    this.adsl_down_atten_rate = parseInt(data['ADSL_DOWNSTREAM_ATT_RATE'])
                    this.adsl_up_atten_rate = parseInt(data['ADSL_UPSTREAM_ATT_RATE'])
                    this.adsl_down_snr_rate = parseInt(data['ADSL_DOWNSTREAM_SNR'])
                    this.adsl_up_snr_rate = parseInt(data['ADSL_UPSTREAM_SNR'])
                    this.adsl_down_tx_rate = parseInt(data['ADSL_CURR_DOWNSTREAM_RATE'])
                    this.adsl_up_tx_rate = parseInt(data['ADSL_CURR_UPSTREAM_RATE'])
                    this._time.push(data['time']);
                    this.incoming_traffic_att.push(this.incoming_traffic_att_rate);
                    this.outcoming_traffic_att.push(this.outcoming_traffic_att_rate);
                    this.adsl_up_att.push(this.adsl_up_att_rate);
                    this.adsl_down_att.push(this.adsl_down_att_rate);
                    this.adsl_up_atten.push(this.adsl_up_atten_rate);
                    this.adsl_down_atten.push(this.adsl_down_atten_rate);
                    this.adsl_up_snr.push(this.adsl_up_snr_rate);
                    this.adsl_down_snr.push(this.adsl_down_snr_rate);
                    this.adsl_up_snr.push(this.adsl_up_snr_rate);
                    this.adsl_down_snr.push(this.adsl_down_snr_rate);
                    this.adsl_up_tx.push(this.adsl_up_tx_rate);
                    this.adsl_down_tx.push(this.adsl_down_tx_rate);
                    //////////////////////////////////////////////////////////
                    this.data = [{

                        name: 'Receive',

                        data: this.outcoming_traffic_att

                    }, {

                        name: 'Send',

                        data: this.incoming_traffic_att

                    }];
                    this.chartOptions = {

                        chart: {
                            zoomType: 'x',

                            type: "area"

                        },
                        credits: {
                            enabled: false
                        },

                        title: {

                            text: "Port Traffic"

                        },

                        xAxis: {

                            categories: this._time

                        },

                        yAxis: {

                            title: {
                                text: 'Port Traffic'
                            },

                        },
                        series: this.data

                    };
                    //////////////////////////////////////////////////////////
                    this.port_attainable_data = [{

                        name: 'Downstream',

                        data: this.adsl_up_att

                    }, {

                        name: 'Upstream',

                        data: this.adsl_down_att

                    }];
                    this.port_attainable_rate_chartOptions = {

                        chart: {
                            zoomType: 'x',

                            type: "area"

                        },
                        credits: {
                            enabled: false
                        },

                        title: {

                            text: "Port Attainable Rate Change"

                        },

                        xAxis: {

                            categories: this._time

                        },

                        yAxis: {

                            title: {
                                text: 'Port Attainable'
                            },

                        },
                        series: this.port_attainable_data

                    };
                    /////////////////////////////////////////////////////////
                    this.port_attenuation_change_data = [{

                        name: 'Downstream',

                        data: this.adsl_up_atten

                    }, {

                        name: 'Upstream',

                        data: this.adsl_down_atten

                    }];
                    this.port_attenuation_change_chartOptions = {

                        chart: {
                            zoomType: 'x',

                            type: "area"

                        },
                        credits: {
                            enabled: false
                        },

                        title: {

                            text: "Port Attenuation Change"

                        },

                        xAxis: {

                            categories: this._time

                        },

                        yAxis: {

                            title: {
                                text: 'Port Attenuation'
                            },

                        },
                        series: this.port_attenuation_change_data

                    };
                    /////////////////////////////////////////////////
                    this.port_snr_change_data = [{

                        name: 'Downstream',

                        data: this.adsl_down_snr

                    }, {

                        name: 'Upstream',

                        data: this.adsl_up_snr

                    }];
                    this.port_snr_change_chartOptions = {

                        chart: {
                            zoomType: 'x',

                            type: "area"

                        },
                        credits: {
                            enabled: false
                        },

                        title: {

                            text: "Port SNR Change"

                        },

                        xAxis: {

                            categories: this._time

                        },

                        yAxis: {

                            title: {
                                text: 'SNR (db)'
                            },

                        },
                        series: this.port_snr_change_data

                    };

                    /////////////////////////////////////////////////
                    this.port_tx_change_data = [{

                        name: 'Downstream',

                        data: this.adsl_down_tx

                    }, {

                        name: 'Upstream',

                        data: this.adsl_up_tx

                    }];
                    this.port_tx_change_chartOptions = {

                        chart: {
                            zoomType: 'x',

                            type: "area"

                        },
                        credits: {
                            enabled: false
                        },

                        title: {

                            text: "Port TX Change"

                        },

                        xAxis: {

                            categories: this._time

                        },

                        yAxis: {

                            title: {
                                text: 'Port TX'
                            },

                        },
                        series: this.port_tx_change_data

                    };
                    /////////////////////////////////////////////////
                    var d = new Date();
                    var year = d.getFullYear();
                    var month = d.getMonth();
                    var day = d.getDay();

                    var x2 = data.time;

                    var time = x2.split(':');

                    var date = new Date(year, month, day, time[0], time[1], time[2]);
                    var x = d.getTime(); //date.getTime();
                    var y = 10;
                    // this.atten_change.series[1].addPoint([x, y1], true, true);
                    var y1 = 20;
                    // this.atten_change.series[1].addPoint([x, y1], true, true);
                },
            );
        }, 1000);

    }

    end_live_data() {
        this.hide_chart = true;
        if (this.ws) {
            this.ws.complete();
        }
    }
    getend_date(val) {
    }

    get_history_report(port_id) {
        this.dsportSrv.get_history_report(port_id).then(res => {
            this.report_his_info = res;
            let oper_status_json_obj = JSON.parse(this.report_his_info.oper_status);
            let attainable_rate_data_obj = JSON.parse(this.report_his_info.attainable_rate_data);
            let attenuation_data_obj = JSON.parse(this.report_his_info.attenuation_data);
            let snr_data_obj = JSON.parse(this.report_his_info.snr_data);
            let tx_data_obj = JSON.parse(this.report_his_info.tx_data);
            let dates = JSON.parse(this.report_his_info.dates);

            for(var key in oper_status_json_obj.data){
                this.hist_labels_arr.push(oper_status_json_obj.data[key].name);
                this.hist_datasets_arr.push(oper_status_json_obj.data[key].y);
            }
            let attainable_rate_up = attainable_rate_data_obj[0].data;
            let attainable_rate_down = attainable_rate_data_obj[1].data;
            let attenuation_rate_up = attenuation_data_obj[0].data;
            let attenuation_rate_down = attenuation_data_obj[1].data;
            let snr_rate_up = snr_data_obj[0].data;
            let snr_rate_down = snr_data_obj[1].data;
            let tx_rate_up = tx_data_obj[1].data;
            let tx_rate_down = tx_data_obj[0].data;
        /////////////////////oper_status_pi_chart//////////////////////////////////////////
            this.hist_data = {
                labels: this.hist_labels_arr,
                datasets: [
                    {
                        data: this.hist_datasets_arr,
                        backgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56"
                        ],
                        hoverBackgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56"
                        ]
                    }]
            };
            /////////////////////attainable//////////////////////////////////////////
            this.his_attainable_rate = [{

                name: 'Downstream',
        
                data: attainable_rate_down
        
            }, {
        
                name: 'Upstream',
        
                data: attainable_rate_up
        
            }];
            this.his_attainable_rate_chartOptions = {
        
                chart: {
                    zoomType: 'x',
                    type: "area"
        
                },
                credits: {
                    enabled: false
                },
                title: {
        
                    text: "Port Attainable Rate Change"
        
                },
        
                xAxis: {
        
                    categories: dates
        
                },
        
                yAxis: {
        
                    title: {
        
                        text: "Port Attainable Rate Change"
        
                    }
        
                },
        
                series: this.his_attainable_rate
        
            };

            //////////////////////////attenuation//////////////////////////////////
            this.his_attenuation_rate = [{

                name: 'Downstream',
        
                data: attenuation_rate_down
        
            }, {
        
                name: 'Upstream',
        
                data: attenuation_rate_up
        
            }];
            this.his_attenuation_rate_chartOptions = {
        
                chart: {
                    zoomType: 'x',
                    type: "area"
        
                },
                credits: {
                    enabled: false
                },
                title: {
        
                    text: "Port Attenuation Rate Change"
        
                },
        
                xAxis: {
        
                    categories: dates
        
                },
        
                yAxis: {
        
                    title: {
        
                        text: "Port Attenuation Rate Change"
        
                    }
        
                },
        
                series: this.his_attenuation_rate
        
            };
            //////////////////////SNR//////////////////////////////////////
            this.his_snr_data_rate = [{

                name: 'Downstream',
        
                data: snr_rate_down
        
            }, {
        
                name: 'Upstream',
        
                data: snr_rate_up
        
            }];
            this.his_snr_data_rate_chartOptions = {
        
                chart: {
                    zoomType: 'x',
                    type: "area"
        
                },
                credits: {
                    enabled: false
                },
                title: {
        
                    text: "Port SNR Rate Change"
        
                },
        
                xAxis: {
        
                    categories: dates
        
                },
        
                yAxis: {
        
                    title: {
        
                        text: "Port SNR Rate Change"
        
                    }
        
                },
        
                series: this.his_snr_data_rate
        
            };
     //////////////////////SNR//////////////////////////////////////
            this.his_tx_data_rate = [{

                name: 'Downstream',
        
                data: tx_rate_down
        
            }, {
        
                name: 'Upstream',
        
                data: tx_rate_up
        
            }];
            this.his_tx_data_rate_chartOptions = {
        
                chart: {
                    zoomType: 'x',
                    type: "area"
        
                },
                credits: {
                    enabled: false
                },
                title: {
        
                    text: "Port TX Rate Change"
        
                },
        
                xAxis: {
        
                    categories: dates
        
                },
        
                yAxis: {
        
                    title: {
        
                        text: "Port TX Rate Change"
        
                    }
        
                },
        
                series: this.his_tx_data_rate
        
            };
            ////////////////////////////////////////////////////////////
            this.show_pichart = true;
        });
    }
    ngOnInit(): void {
        this.is_ldap_login = localStorage.getItem("ldap_login");
        this.agent_username = localStorage.getItem("username")?localStorage.getItem("username"):'';
        this.ldap_email = localStorage.getItem("ldap_email")?localStorage.getItem("ldap_email").toLowerCase():'';
        this.show_pichart = false;
        this.get_dslamPort_info(this.port_id);
        this.get_last_command(this.dslam_id, this.port_id);
        this.get_history_report(this.port_id);
    }
}