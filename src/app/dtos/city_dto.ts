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
    port_status_id: string
}