import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "original" ]

  submitForm(e){
    const token = document.querySelector('[name=csrf-token]').content
    e.preventDefault();
    console.log(token)
    console.log( this.originalTarget.value )

    fetch("/urls", {
      method: 'post',
      headers: {
        "X-CSRF-TOKEN": token,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ "original": this.originalTarget.value })
    })
    // .then(json)
    .then(function (data) {
      console.log('Request succeeded with JSON response', data);
    })
    .catch(function (error) {
      console.log('Request failed', error);
    });
  }
}