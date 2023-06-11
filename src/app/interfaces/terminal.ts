import { States } from "../enums/states";

export interface Terminal {
    id: number;
    code: number;
    m_id: number;
    m_name: string;
    state: States;
    contract_id: number;
}