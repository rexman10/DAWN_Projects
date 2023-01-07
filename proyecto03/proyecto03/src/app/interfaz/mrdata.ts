import { DriverTable } from "./driver-table";

export interface MRData {
    xmlns: string;
    series: string;
    url: string;
    limit: string;
    offset: string;
    total: string;
    DriverTable: DriverTable;
}