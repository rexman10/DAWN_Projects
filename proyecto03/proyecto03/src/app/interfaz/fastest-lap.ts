import { AverageSpeed } from "./average-speed";
import { Time2 } from "./time2";

export interface FastestLap {
    rank: string;
    lap: string;
    Time: Time2;
    AverageSpeed: AverageSpeed;
}