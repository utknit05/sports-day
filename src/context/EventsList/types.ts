import { IListResponse } from "../../utils/api";
import { fetchEvents, fetchEventsCompleted, resetEvents } from "./store";

export const GET_EVENTS_ENDPOINT = 'https://run.mocky.io/v3/2744c231-8991-4ae8-bc45-1f645437585a';

export interface IEvent {
  id: number;
  event_name: string;
  event_category: string;
  start_time: string;
  end_time: string;
  disabled?: boolean;
}

export type TEventsState = IListResponse<IEvent>
export type TEventsActions = ReturnType<typeof fetchEvents | typeof fetchEventsCompleted | typeof resetEvents>
export interface IEventsContext {
  selectedEvents: IEvent[];
  unselectedEvents: IEvent[];
  selectEvent: (event: IEvent) => void
  removeEvent: (event: IEvent) => void
}
