import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocalstorageService {
    public workspace_id:string = null;
    public api_token:string = null;
    public tags_list:string = null;
    public tags = [];

    constructor() {}

    GetConfig() {
        this.tags_list = localStorage.getItem("tags_list")
        this.workspace_id = localStorage.getItem("workspace_id");
        this.api_token = localStorage.getItem("api_token");
        this.tags = []
        if ( this.tags_list != null ) {
            let tt = this.tags_list.split(',')
            for ( var t in tt) {
                this.tags.push(tt[t].trim())
            }
        }

    }

    SaveConfig() {
        localStorage.setItem("tags_list", this.tags_list);
        localStorage.setItem("workspace_id", this.workspace_id);
        localStorage.setItem("api_token", this.api_token);
    }

}
