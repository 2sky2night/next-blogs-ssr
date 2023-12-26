export class Token {
  static get() {
    return window.localStorage.getItem("token");
  }
  static set(token: string) {
    return window.localStorage.setItem("token", token);
  }
}
