import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { BookOperationService } from "../Services/book-operation.service";
import { AuthService } from "../Services/auth.service";
import { ModalFunctions } from "../common/modal-functions";

@Component({
  selector: "app-add-book",
  templateUrl: "./add-book.component.html",
  styleUrls: ["./add-book.component.css"],
})
export class AddBookComponent implements OnInit {
  public imagepreview1;
  public imagepreview2;
  public submitted: Boolean = false;
  constructor(
    public book_operation: BookOperationService,
    public auth: AuthService,
    public modal: ModalFunctions
  ) {}

  public form: FormGroup;
  ngOnInit() {
    this.form = new FormGroup({
      bookname: new FormControl(null, { validators: [Validators.required] }),
      username: new FormControl(null, { validators: [Validators.required] }),
      number: new FormControl(null, { validators: [Validators.required] }),
      department: new FormControl(null, { validators: [Validators.required] }),
      price: new FormControl(null, { validators: [Validators.required] }),
      desc: new FormControl(null, { validators: [Validators.required] }),
      image1: new FormControl(null, { validators: [Validators.required] }),
      image2: new FormControl(null, { validators: [Validators.required] }),
    });
  }

  imagePick1(image) {
    const image1 = (image.target as HTMLInputElement).files[0];
    this.form.patchValue({ image1: image1 });
    this.form.get("image1").updateValueAndValidity();
    let file = new FileReader();
    file.onload = () => {
      this.imagepreview1 = file.result;
    };
    file.readAsDataURL(image1);
  }

  imagePick2(image) {
    const image2 = (image.target as HTMLInputElement).files[0];
    this.form.patchValue({ image2: image2 });
    this.form.get("image2").updateValueAndValidity();
    const file = new FileReader();
    file.onload = () => {
      this.imagepreview2 = file.result;
    };
    file.readAsDataURL(image2);
  }

  addbook() {
    this.submitted = true;
    this.form.patchValue({
      username: this.auth.username,
    });
    console.log(this.form.value);
    if (this.form.invalid) {
      return;
    }
    this.book_operation.addBook(this.form.value).subscribe((result) => {
      console.log(result);
      this.modal.openModal("#modal1");
      this.submitted = true;
      this.form.reset();
    });
  }
}
