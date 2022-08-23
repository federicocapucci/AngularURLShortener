import { Component, OnInit } from '@angular/core';
import { ShortUrlService } from 'src/app/services/short-url.service';
import { Clipboard } from '@angular/cdk/clipboard';




@Component({
  selector: 'app-short-url',
  templateUrl: './short-url.component.html',
  styleUrls: ['./short-url.component.css']
})
export class ShortUrlComponent implements OnInit {
  urlName: string;
  urlShort: string;
  urlIsProcessed: boolean = false;
  loading: boolean = false;
  isCopied : boolean = false;

  errorIsShown: boolean = false;
  errorText: string = '';


  constructor(private _shortUrlService: ShortUrlService, private clipboard: Clipboard) {
    this.urlName = '';
    this.urlShort = '';
    this.errorText = '';
  }

  ngOnInit(): void {
  }

  //check if the URL is valid

  isValidHttpUrl(string : string) {
    let url;
    
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
  
    return url.protocol === "http:" || url.protocol === "https:";
  }

  processURL() {
    
    if(!this.isValidHttpUrl(this.urlName)){
      this.errorIsShown = true;
      this.errorText = "Invalid URL";        
      setTimeout(() => {
        this.errorIsShown = false;     
        ;},2500)
        
      return;
    }

    this.errorIsShown = false;
    this.urlIsProcessed = false;
    this.loading = true;

    this._shortUrlService.getURLShort(this.urlName).subscribe(data => {

      this.urlIsProcessed = true;
      this.loading = false;

      this.urlShort = data.link
    })
  }
  copyToClipboard(){

    this.isCopied = true;
    
    setTimeout(() => {
      this.isCopied = false;},2500)    
    this.clipboard.copy(this.urlShort);
  }

}
