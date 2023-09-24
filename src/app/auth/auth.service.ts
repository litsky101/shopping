import { HttpClient, HttpClientModule } from "@angular/common/http";
import { ThisReceiver } from "@angular/compiler";
import { Injectable } from "@angular/core";

interface AuthResponseData{
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}

@Injectable({
    providedIn: 'root'
})

export class AuthService{

    constructor(private http: HttpClient){

    }

    signUp(_email: string, _password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCZyObhCpAMMps5CXWz9qtuBvpQMtFDPCQ',
        {
            email: _email,
            password: _password,
            returnSecureToken: true
        });
    }
}