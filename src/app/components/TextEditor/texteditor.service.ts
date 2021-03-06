import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";
import { HttpResponse } from '../../../models/HttpResponse';
import { File } from '../../../models/File';

@Injectable()

export class TextEditorService {
    private address = "http://a87dda11.ngrok.io/";
    private headers;
    private options;

    constructor(private http: Http) {
        this.headers = new Headers();//{ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
        // this.headers.append('UserName', localStorage.getItem('CurrentUser'));
        this.options = new RequestOptions({ headers: this.headers });
    }

    public addFile(body: File): Observable<HttpResponse> {
        return this.http.post(this.address, body, this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    public getFolder(): Observable<HttpResponse> {
        return this.http.get(this.address+"executeCode?foldername=1234", this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    extractData(res: Response) {
        return res.json();
    }
    
    handleError(error: Response | any) {
        return Observable.throw(error);
    }
}


