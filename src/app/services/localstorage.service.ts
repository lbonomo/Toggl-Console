import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocalstorageService {
    public workspace_id:string;
    public api_token:string;

    constructor() {}

    GetConfig() {
        this.workspace_id = localStorage.getItem("workspace_id");
        this.api_token = localStorage.getItem("api_token");
    }

    SaveConfig() {
        localStorage.setItem("workspace_id", this.workspace_id);
        localStorage.setItem("api_token", this.api_token);
    }

}
