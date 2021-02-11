export class Holiday {
    name: string;
    name_local: string;
    language: string;
    description: string;
    country: string;
    location:string;
    type: string;
    date: string;
    date_year: string;
    date_month: string;
    date_day: string;
    week_day:string;

    constructor(name: string, name_local: string, language: string, description: string, country: string, location:string,
     type: string, date: string, date_year: string, date_month: string, date_day: string, week_day:string) {
        this.name =  name;
        this.name_local =  name_local;
        this.language =  language;
        this.description =  description;
        this.country =  country;
        this.location =  location;
        this.type =  type;
        this.date =  date;
        this.date_year =  date_year;
        this.date_month =  date_month;
        this.date_day =  date_day;
        this.week_day =  week_day;
    }
}
