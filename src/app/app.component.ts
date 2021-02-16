import { Component } from '@angular/core';
import { jsPDF } from "jspdf";
import { DomSanitizer } from '@angular/platform-browser';  

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {  
  title = 'Angular7-AddImageInPDF';  
  fileName: string;  
  filePreview: string ;
  fi:any; 
  
  constructor(private sanitizer: DomSanitizer) {
    
   }  
  
  
   ngOnInit() {
    this.toDataURL('http://mmktnelections.com/bckend/assets/users/8608989137.jpeg',
        function (dataUrl) {
          let fi;
          console.log('RESULT:', dataUrl)
          fi = dataUrl;
          var myCanvas = <HTMLImageElement> document.getElementById('myImg');
          myCanvas.src = dataUrl;
        },''
      )
  }

  returnURL(){
    
  }

  onFileChanged(event: { target: { files: any[]; }; }) {  
  
    let reader = new FileReader();  
    if (event.target.files && event.target.files.length > 0) {  
      let file = event.target.files[0];  
      reader.readAsDataURL(file);  
      reader.onload = () => {  
        // this.fileName = file.name + " " + file.type;  
        const doc = new jsPDF();  
        const base64ImgString = (reader.result as string).split(',')[1];  
        doc.addImage(base64ImgString, 15, 40, 50, 50);  
        this.filePreview = 'data:image/png' + ';base64,' + base64ImgString;  
        doc.save('TestPDF')  
      };  
    }  
  }  
  
  sanitize(url: string) {  
    return this.sanitizer.bypassSecurityTrustUrl(url);  
  }  
  
  canva()
  {
    var myCanvas = <HTMLCanvasElement> document.getElementById('myCanvas');
      var ctx = myCanvas.getContext('2d');
      var img = new Image;
      img.onload = function(){
        ctx.drawImage(img,15,10); // Or at whatever offset you like
      };
      img.src = 'http://mmktnelections.com/bckend/assets/users/8608989137.jpeg';
  }
   toDataURL(src, callback, outputFormat) {
    let image = new Image();
    image.crossOrigin = 'Anonymous';
    image.onload = function () {
      let canvas = document.createElement('canvas');
      let ctx = canvas.getContext('2d');
      let dataURL;
      canvas.height = 700;
      canvas.width = 1000;
      ctx.drawImage(image, 15, 10);
      dataURL = canvas.toDataURL(outputFormat);
      callback(dataURL);
    };
    image.src = src;
    if (image.complete || image.complete === undefined) {
      image.src = "http://mmktnelections.com/bckend/assets/users/8608989137.jpeg";
      image.src = src;
    }
  }

  
  
}  