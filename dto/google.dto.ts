import { RestResponseDto } from './rest-response.dto';

export class GoogleInitDto {
  clientId!: string;
}

export class GoogleInitReponseDto extends RestResponseDto {
  declare payload: GoogleInitDto;
}

export class JWTInputDto {
  readonly credential!: string;
}

export class AuthTokenInputDto {
  readonly accessToken!: string;
}

export class GoogleDateDto {
  dateTime!: string;
  timeZone!: string;
}

export class GoogleAttendeesDto {
  email!: string;
}

export class GoogleCalendarEventDto {
  calendarId!: string;
  summary!: string;
  location!: string;
  description!: string;
  start!: GoogleDateDto;
  end!: GoogleDateDto;
  attendees!: GoogleAttendeesDto[];
}

export class GoogleCalendarEventResourceDto extends GoogleCalendarEventDto {
  htmlLink!: string
  created!: string
  updated!: string
}

export class GoogleCalendarDto {
  summary!: string;
  timeZone?: string;
}

export class GoogleCalendarAclScopeDto {
  type!: string;
  value!: string;
}

export class GoogleCalendarAclDto {
  role!: string;
  scope!: GoogleCalendarAclScopeDto;
}
