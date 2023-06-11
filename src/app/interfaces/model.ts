import { ConnectionType } from "../enums/conn-type";

export interface Model {
    id: number;
    code: number;
    name: string;
    connection_type: ConnectionType;
    communication_id: number;
    comm_name: string
}