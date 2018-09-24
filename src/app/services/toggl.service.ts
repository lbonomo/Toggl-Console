import { Injectable } from '@angular/core';
import { LocalstorageService } from './localstorage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})

export class TogglService {

    data:any = [];

    constructor( public http: HttpClient, private config: LocalstorageService ) {
        config.GetConfig();
    }
    
    milliseconds_to_hours(time) {
        let seconds:number = Math.round((time/1000) % 60)
        let minutes:number = Math.round((time/(1000*60)) % 60)
        let hours:number = Math.round(time/(1000*60*60))
        return [
            ("0" + hours).slice(-2), 
            ("0" + minutes).slice(-2), 
            ("0" + seconds).slice(-2)
        ].join(':');
    }
        
    milliseconds_to_float_hours(time) {
        let hours:number = Math.round(time/(1000*60*60))
        return hours
    }
        

    last_month() {
        let now = new Date();
        let year:number;
        let month:number;
        let last_day_of_month:number;

        /* 
        El valor devuelto por getMonth() es un entero entre 0 y 11, 
        donde 0 corresponde a Enero, 1 a Febrero y así sucesivamente.
        https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Date/getMonth
        */

        if ( now.getMonth() === 0 ) {
            year = now.getFullYear() - 1;
            month = 11;
        } else {
            year = now.getFullYear();
            month = now.getMonth();
        }       

        // Ultimo días del mes pasado
        let l = new Date(year, month, 0)
        last_day_of_month = l.getDate()
        
        let start = [year, ("0" + month).slice(-2), '01'].join('-');
        let end = [year, ("0" + month).slice(-2), last_day_of_month].join('-');
        return {
            'start': start,
            'end': end
        }
    }

    last_month_common_dataquery() {
        let data = {}
        data['page'] = 1
        data['user_agent'] = "Vanguard Toggl Report"
        data['workspace_id'] = this.config.workspace_id
        data['since'] = this.last_month()['start']
        data['until'] = this.last_month()['end']
        data['order_field'] = 'amount'

        return data
    }
        

    make_header() {
        return new HttpHeaders().set("Authorization", "Basic " + btoa(this.config.api_token + ':api_token'));
    }

    getTags() {       
        let url = 'https://www.toggl.com/api/v8/workspaces/'+this.config.workspace_id+'/tags';
        return this.http.get(url, {headers: this.make_header()})
    }

    getTotalTimeOfTag(tag_id,time_start,time_end) {
        let url = 'https://toggl.com/reports/api/v2/summary';
        let data = {};
        data = this.last_month_common_dataquery()
        data['tag_ids'] = tag_id;
        // console.log(data);

        let url_values = "";
            for (var key in data) {
                if (url_values != "") {
                    url_values += "&";
                }
                url_values += key + "=" + encodeURIComponent(data[key]);
            }

        let full_url = url + '?' + url_values
        // console.log(full_url);
        return this.http.get(full_url, {headers: this.make_header()})
        // # print(full_url)
        // x = self.get_data(full_url)
    }

}
