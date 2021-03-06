import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { AuthService } from "./auth.service";
import { User } from "./user.model";
import {Router} from "@angular/router";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
    myForm: FormGroup;

    identities = ['Learner', 'Administrator'];

    constructor(private authService: AuthService,private router: Router) {}

    onSubmit() {
        const user = new User(
            this.myForm.value.email,
            this.myForm.value.password,
            this.myForm.value.firstName,
            this.myForm.value.lastName,
            this.myForm.value.identity
        );
        this.authService.signup(user)
            .subscribe(
                data => {
                    console.log(data);
                    if (data.userIdentity === 'Learner') {
                        this.router.navigateByUrl('/learner');
                    }
                    else if (data.userIdentity === 'Administrator') {
                        this.router.navigateByUrl('/admin');
                    }
                },
                error => console.error(error)


            );
        this.myForm.reset();
    }

    ngOnInit() {
        this.myForm = new FormGroup({
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl(null, Validators.required),
            identity: new FormControl(null, Validators.required)
        });
    }
}