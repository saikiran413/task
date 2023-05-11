import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  videoItems: any=[];
  videoUrl : SafeResourceUrl;
  singleVideo: any;
  bookmarksList: any;
  @ViewChild('myVideo') myVideo!: ElementRef;
  @ViewChild('seekBar') seekBar!: ElementRef;
  saveTimestamp: any;
  getID: any;
  bookmarkData: any;
  postForm!: FormGroup<{ name: FormControl<any>; url: FormControl<any>; }>


  ngAfterViewInit() {
    console.log(this.myVideo.nativeElement);
    console.log(this.seekBar.nativeElement);
  }

  constructor(private common:CommonService, private sanitizer: DomSanitizer){
   this.videoUrl=''
   this.common.getVideos().subscribe(res=>{
    this.videoItems = res.videos;
    console.log(this.videoItems)

    

    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(res.videos[0].url) as string; 
  
      })
   
  }
  ngOnInit(): void {
   
     
   }
   

 selectedVideo(item:any){
this.videoUrl =  item.url as string;
let body ={
  video: {
    name: item.name,
    url: item.url
  }
}
this.common.postVideos(body).subscribe(res=>{
this.getID= res.videoId
this.getbookmark(this.getID)
})
}


onPlay() {
  const timestamp = this.myVideo.nativeElement.currentTime;
  console.log('Current timestamp:', timestamp);
  this.saveTimestamp =timestamp
}

onPause() {
  const timestamp = this.myVideo.nativeElement.currentTime;
  this.saveTimestamp =timestamp
  console.log('Current timestamp:', timestamp);
}

onSeeked() {
  const timestamp = this.myVideo.nativeElement.currentTime;
  console.log('Current timestamp:', timestamp);

  this.saveTimestamp =timestamp

}

seekToTime(time: number) {
  const video: HTMLVideoElement = this.myVideo.nativeElement;
  video.currentTime = time;
  video.play();
}

onSeekBarChange() {
  const value = this.seekBar.nativeElement.value;
  const timestamp = this.myVideo.nativeElement.duration * (value / 100);
  console.log('Current timestamp:', timestamp);
}



bookmarkVideo(){

  this.common.bookmarkVideosPost(this.getID, this.saveTimestamp).subscribe(res=>{

    this.bookmarksList = res
    console.log(this.bookmarksList.bookmarks)

  })
}





getbookmark(res:any){
  this.common.bookmarkVideos(res).subscribe(res=>{

    const data=res
    console.log(data);
    
  this.bookmarkData= this.bookmarksList.bookmarks

  })
}
}
