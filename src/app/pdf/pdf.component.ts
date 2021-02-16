import { Component, OnInit } from '@angular/core';
import { jsPDF } from "jspdf";  
import html2canvas from 'html2canvas';  
@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {
  decodedimg:any;
  constructor() { }

  ngOnInit(): void {
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

  public captureScreen()  
  {  
    var data = document.getElementById('contentToConvert');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jsPDF('l', 'mm', 'A4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('MYPdf.pdf'); // Generated PDF   
    });  
  } 
  
  toDataURL(src, callback, outputFormat) {
    let image = new Image();
    image.crossOrigin = 'Anonymous';
    image.onload = function () {
      let canvas = document.createElement('canvas');
      let ctx = canvas.getContext('2d');
      let dataURL;
      canvas.height = 200;
      canvas.width = 400;
      ctx.drawImage(image, -100, -100);
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
