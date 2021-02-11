import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { Holiday } from '../model/holiday';


@Injectable()
export class CalendarService {

public url: string;
public year: number;
public month: number;
public day: number;

  constructor(protected http: HttpService) {
    this.url = "https://holidays.abstractapi.com/v1/?";
  }

  public consultar(fechaEntrega: string) {
      let fecha = new Date(fechaEntrega);

      this.year = fecha.getUTCFullYear()
      this.month = fecha.getUTCMonth() + 1;
      this.day = fecha.getUTCDate();
      return this.http.doGet<Holiday[]>(this.url+`api_key=${environment.abstractKey}`+`&country=CO`+`&year=`+this.year+`&month=`+this.month+`&day=`+this.day);
    }

}
