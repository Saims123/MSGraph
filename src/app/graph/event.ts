export class Event {
subject: string;
organizer: Recipient;
}

export class Recipient {
  emailAddress: EmailAddress;
}

export class EmailAddress {
  name: string;
  address: string;
}

export class DateTimeTimeZone {
  dateTime: string;
  timeZone: string;
}
