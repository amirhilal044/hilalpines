import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor() {}
  validateUser(username: string, password: string) {
    if (username === "dc532899790cd8e8c7f1884fda191a0c7a4b6d8f305cbd1774a99329e892b424" && password === "3ccf543de416e678b60a03a1ced436011aec26b04543852098c94f713cb471df") {
      sessionStorage.setItem('currentUser', JSON.stringify({ username: username }));

    }
  }

  // password
  // :
  // "3ccf543de416e678b60a03a1ced436011aec26b04543852098c94f713cb471df"
  // username
  // :
  // "dc532899790cd8e8c7f1884fda191a0c7a4b6d8f305cbd1774a99329e892b424"
}
