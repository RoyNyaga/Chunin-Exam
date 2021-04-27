import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "original" ]

  connect(){
    // console.log(test)
  }

  submitForm(e){
    const token = document.querySelector('[name=csrf-token]').content
    const data = { "original": this.originalTarget.value }
    e.preventDefault();

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
      const { original } = result.url
      this.addElement(original)
    })
    .catch(function (error) {
      console.log('Request failed', error);
    });
  }

  addElement = (original) => {
    const urlDiv = document.querySelector('#url-list-div')
    const paragraph = document.createElement("p");
    const urlText = document.createTextNode(original)
    paragraph.appendChild(urlText)
    urlDiv.appendChild(paragraph)

  }


}