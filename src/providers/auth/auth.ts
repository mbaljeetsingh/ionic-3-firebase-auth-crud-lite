import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {AngularFireAuth} from 'angularfire2/auth';
import {User} from '../../models/user';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
    private user: Observable<firebase.User>;
    private userDetails: firebase.User = null;
    constructor(private afAuth: AngularFireAuth) {
        console.log("AuthProvider");
        this.user = afAuth.authState;
        this.user.subscribe(
            (user) => {
                if (user) {
                    this.userDetails = user;
                    console.log("From service constructor subscribe:", this.userDetails);
                }
                else {
                    this.userDetails = null;
                }
            }
        );
    }

    login(user: User) {
      // console.log("Login:", user);
      return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    }

    register(user: User) {
        return this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.password);
    }

    getAuthState(){
        return this.afAuth.authState;
    }

    logout() {
        this.afAuth.auth.signOut();
    }

}
