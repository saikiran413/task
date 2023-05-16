import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  videoItems: any = [];
  videoUrl: SafeResourceUrl;
  singleVideo: any;
  bookmarksList: any;
  @ViewChild('myVideo') myVideo!: ElementRef;
  @ViewChild('seekBar') seekBar!: ElementRef;
  saveTimestamp: any;
  getID: any;
  bookmarkData: any;
  postForm!: FormGroup<{ name: FormControl<any>; url: FormControl<any>; }>
  getId: any;
  videoName: any;


  constructor(private common: CommonService, private sanitizer: DomSanitizer) {
    this.videoUrl = ''
    this.common.getVideos().subscribe(res => {
      this.videoItems = res.videos;
      console.log(this.videoItems)



      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(res.videos[0].url) as string;

    })

  }
  ngOnInit(): void {


  }


  selectedVideo(item: any) {
    this.videoName = item.name
    this.getID = item.id
    this.videoUrl = item.url as string;

  }

  postVideo(){
    let body = {
      video: {
        name: this.videoName,
               url: this.videoUrl
      }
    }
    this.common.postVideos(body).subscribe(res => {
      this.getID = res.videoId
     
    })
  
  }




  onSeeked() {
    const timestamp = this.myVideo.nativeElement.currentTime;
    console.log('Current timestamp:', timestamp);

    this.saveTimestamp = timestamp

  }

  seekToTime(time: number) {
    const video: HTMLVideoElement = this.myVideo.nativeElement;
    video.currentTime = time;
    video.play();
  }


  bookmarkVideo() {
    if(this.getID == undefined){
      this.getID = this.videoItems[0].id
    } 
    const video: HTMLVideoElement = this.myVideo.nativeElement;
    const timestamp = video.currentTime
    const timestring = String(timestamp)
    this.common.bookmarkVideosPost( timestring,this.getID).subscribe(res => {
      this.bookmarksList = res


   })
  }

  getbookmark() {
    this.common.getbookmarkVideos(this.getID).subscribe(res => {
      const data = res
      this.bookmarkData = this.bookmarksList.bookmarks

    })
  }
}
