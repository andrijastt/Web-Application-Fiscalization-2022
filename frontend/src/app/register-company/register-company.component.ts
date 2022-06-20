import { Component, OnInit } from '@angular/core';
import { RegisterCompanyService } from '../register-company.service';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.css']
})
export class RegisterCompanyComponent implements OnInit {
  
  constructor(private registerCompanyService: RegisterCompanyService) { }

  ngOnInit(): void {}

  firstname: string
  lastname: string
  username: string

  password: string
  confirmPassword: string
  passwordCheck: string
  confirmPasswordCheck: string

  telephoneNumber: string
  telephoneNumberCheck: string

  email: string
  emailCheck: string

  name: string
  country: string
  city: string

  postNumber: Number
  checkMailNumber: string

  streetName: string
  streetNumber: Number
  streetNumberCheck: string

  PIB: Number
  JMBP: string
  PIBCheck: string
  JMBPCheck: string

  imageData: string
  selectedFile: File = null

  send: boolean
  message: string

  image: string

  onFileSelected(event: any){
    
    if(event.target.files && event.target.files[0]){
      const maxHW = 300;
      const minHW = 100;
      
      this.selectedFile = <File>event.target.files[0];

      if(this.selectedFile.type == "image/png" || this.selectedFile.type == "image/jpg" || this.selectedFile.type == "image/jpeg"){
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const image = new Image();
          image.src = e.target.result;
          image.onload = rs => {
            const img_height = rs.currentTarget['height'];
            const img_width = rs.currentTarget['width'];

            console.log(img_height, img_width);

            if(img_height >= maxHW || img_height <= minHW || img_width >= maxHW || img_width <= minHW){
              alert("Bad photo, size is big");
              this.send = false;
              // return false;
            } else {
              this.imageData = e.target.result;
              this.image = this.imageData
              this.send = true;
              // return true;
            }
          }
        }
        reader.readAsDataURL(event.target.files[0]);
      } else {
        alert("Bad image format")
      }
    }
  }

  checkPassword(){
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,12}$/
    if(!passwordRegex.test(this.password)){
      this.passwordCheck = "Password must contain at least 1 number, 1 small letter, 1 capital letter, 1 special charater and 8 to 12 characters"
    } else { this.passwordCheck = "Password is good!" }
    if(this.password != this.confirmPassword){
      this.confirmPasswordCheck = "Passwords don't match"
    } else { this.confirmPasswordCheck = "Passwords match!" }
  }

  checkConfirmPassword(){
    if(this.password != this.confirmPassword){
      this.confirmPasswordCheck = "Passwords don't match"
    } else { this.confirmPasswordCheck = "Passwords match!" }
  }

  checkTelephoneNumber(){
    let telephoneNumberRegex = /^\d{9,10}$/
    if(!telephoneNumberRegex.test(this.telephoneNumber)){
      this.telephoneNumberCheck = "Bad telephone number, must contain only numbers and has 9 to 10 characters"
    } else this.telephoneNumberCheck = "Good telephone number"
  }

  checkEmail(){
    let emailRegex = /^.*@.*\..*[a-z]$/
    if(!emailRegex.test(this.email)){
      this.emailCheck = "Bad email format"
    } else { this.emailCheck = "Good email format" }
  }

  checkPostNumber(){
    if(this.postNumber < 10000 || this.postNumber > 99999){
      this.checkMailNumber = "Bad post number"
    } else {
      this.checkMailNumber = "Good post number"
    }
  }

  checkStreetNumber(){
    if(this.streetNumber < 0){
      this.streetNumberCheck = "Street number can't be less than 0 (0 is no number)"
    } else {
      this.streetNumberCheck = "Good street number"
    }
  }

  checkPIB(){
    if(this.PIB < 100000001 || this.PIB  > 999999999){
      this.PIBCheck = "Wrong PIB format"
    } else this.PIBCheck = "Good PIB format"
  }

  checkJMBP(){
    let JMBPRegex = /^\d{8}$/
    if(!JMBPRegex.test(this.JMBP)){
      this.JMBPCheck = "Wrong JMBP format"
    } else this.JMBPCheck = "Good JMBP format"
  }

  register(){

    if(this.password != this.confirmPassword || !this.firstname || !this.lastname || !this.username ||
      !this.password || !this.confirmPassword || !this.telephoneNumber || !this.email || !this.name || !this.country ||
      !this.city || !this.postNumber || !this.streetName || !this.streetNumber || !this.PIB || !this.JMBP || !this.image) {
        this.send = false;
      }
    else this.send = true

    if(this.send){
      this.registerCompanyService.register(this.firstname, this.lastname, this.username, this.password, 
        this.telephoneNumber, this.email, this.name, this.country, this.city, this.postNumber, this.streetName, 
        this.streetNumber, this.PIB, this.JMBP, this.image).subscribe((resp =>{
          alert(resp['message'])
        }))
    }
    else {
      this.message = "Check data"
    }

  }

}
