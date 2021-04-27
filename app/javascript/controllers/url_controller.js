import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "original" ]

  submitForm(e){
    const token = document.querySelector('[name=csrf-token]').content
    const data = { "original": this.originalTarget.value }
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
      body: JSON.stringify({ url: { "original": this.originalTarget.value }})
    })
    .then(response => response.json(data))
    .then(result => {
      console.log("this is result", result)
    })
    .catch(function (error) {
      console.log('Request failed', error);
    });
  }
}