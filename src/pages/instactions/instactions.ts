import { Component } from '@angular/core';
import { IonicPage,Loading, LoadingController, NavController, NavParams } from 'ionic-angular';
import { Http, Headers,RequestOptions } from '@angular/http';
import { DataProvider } from '../../providers/data/data';  
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';


export interface Video
{
  url: string,   
  title: string,
};   

@IonicPage()
@Component({
  selector: 'page-instactions',
  templateUrl: 'instactions.html',
})

 

export class InstactionsPage {
  private ids : string;
  public html: string; 
     
   private listVideos : Array<Video>;
   trustedVideoUrl: SafeResourceUrl;
   loading: Loading;

  constructor(public loadingCtrl: LoadingController,
                private domSanitizer: DomSanitizer,public navCtrl: NavController, public navParams: NavParams,private http: Http, private data: DataProvider) {
    this.listVideos = [];       
    this.data.getOptions("machines").then((machines) =>
    { 
        this.http.get('https://www.svycarskekavovary.cz?getvideo=1&machines='+machines).map(res => res.json()).subscribe(data => {
          this.listVideos = this.initVideos(data);
        });  
     }); 
  }  

  initVideos(data): Array<Video>
  {
    let showVideos : Array<Video> = [];      
    for (let i = 0; i < data.length; i+=1) { 
         let video = <Video>{
                 url: this.domSanitizer.bypassSecurityTrustResourceUrl(data[i].path),
                 title: data[i].title   
              }
         showVideos.push(video);   
    };   
    return showVideos; 
  }
      
  
   ionViewWillEnter(): void {   


             let vide2 = <Video>{
               url: this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/kG4Ucb2u-pU'),
            title: 'Awesome video' 
            }       
                 
           // this.listVideos =showVideos; 
           //  console.log( showVideos); 
          // this.listVideos.push(vide2); 
           //console.log(this.listVideos);      
      //  this.loading = this.loadingCtrl.create({
       //     content: 'Please wait...'
       // });   

      //  this.loading.present();
      //console.log(this.listVideos);    
    }

    handleIFrameLoadEvent(): void {
       // this.loading.dismiss();  
    }
    
  ionViewDidLoad() {
    console.log('ionViewDidLoad InstactionsPage');
  }

}
