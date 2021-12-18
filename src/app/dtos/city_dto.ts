export interface porv_city {
    abb
    english_name
    id
    name
    parent
    text
}

export interface ci_city {
    abb
    english_name
    id
    name
    parent
    text
}

export interface telecoms {
    abb
    english_name
    id
    name
    parent
    text
}

export interface PortStatus {
    id: string,
    description: string
}

export class PortOrder {
    username: string;
    port_status_id: string;
    old_port_status_id: string;
    new_port_status_id:number;
    new_telco_row:number;
    new_telco_column:number;
    new_telco_connection:number;
    old_telco_row:string;
    old_telco_column:string;
    old_telco_connection:string;
    telecom_id:string;
}

export class Bukht {
    telco_row: string;
    telco_column: string;
    telco_connection: string;
    port_status_desc:string;
    port_status_id:string;
    telecom_id:string;

}