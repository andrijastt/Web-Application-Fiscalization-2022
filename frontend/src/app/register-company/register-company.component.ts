import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RegisterCompanyService } from '../register-company.service';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.css']
})
export class RegisterCompanyComponent implements OnInit {
  
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  confirmPassword: string;
  number: string;
  email: string;
  name: string;
  country: string;
  city: string;
  postNumber: Number;
  streetName: string;
  streetNumber: Number;
  PIB: Number;
  JMBP: string;

  imageData: string;
  selectedFile:File = null;

  send: boolean;
  message: string;

  constructor(private http: HttpClient, private registerCompanyService: RegisterCompanyService) { }

  ngOnInit(): void {}

  onFileSelected(event: any){
    
    if(event.target.files && event.target.files[0]){
      const maxHW = 300;
      const minHW = 100;
      
      this.selectedFile = <File>event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          console.log(img_height, img_width);

          if(img_height >= maxHW || img_height <= minHW || img_width >= maxHW || img_width <= minHW){
            console.log("Bad photo");
            this.send = false;
            // return false;
          } else {
            this.imageData = e.target.result;
            console.log(this.imageData);
            this.send = true;
            // return true;
          }
        }
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  register(){

    if(this.password != this.confirmPassword) this.send = false;

    if(this.send){

    }
    else {
      this.message = "Choose picture that is .png or .jpeg and with height and width between 100 and 300 pixels"
    }

  }

  upload(){
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);

    this.http.post('http://localhost:4000/company/images', fd).subscribe()
  }

}
