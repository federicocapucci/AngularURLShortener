import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShortUrlService {

  URL =  "https://api-ssl.bitly.com/v4/shorten";

  constructor(private http: HttpClient) { }

  getURLShort(urlName: string) :Observable<any> {

    const body ={
      "long_url" : urlName
    }

    return this.http.post(this.URL, body)
  }


}
