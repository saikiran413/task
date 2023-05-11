import { Component, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-video-player',
  template: '<video #videoPlayer controls></video>'
})
export class VideoPlayerComponent {
  @ViewChild('videoPlayer') video: any;
  @Input()
    videoUrl!: string;

  ngAfterViewInit() {
    this.video.nativeElement.src = this.videoUrl;
  }
}