import { DateTimeAdapter } from 'ng-pick-datetime';
import { OwlDateTime } from 'ng-pick-datetime/date-time/date-time.class';
import { MomentDateTimeAdapter } from 'ng-pick-datetime-moment';

export class DateReminder {
    remainder: MomentDateTimeAdapter;
    nid: number;
}