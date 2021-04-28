import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "original", "originalUrl", "urlDiv" ]

  connect(){
    // console.log("blablab",this.originalUrlTarget.dataset)
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
      const { url } = result
      this.addElement(url)
    })
    .catch(function (error) {
      console.log('Request failed', error);
    });
  }

  addElement = (url) => {
    const urlListDiv = document.querySelector("#url-list-div")
    const urlDiv = document.createElement("div")
    urlDiv.setAttribute("class", "url-div")
    urlDiv.innerHTML = this.creatOriginalUrlParagraph(url) + this.createButtonDive()
    // urlDiv.appendChild(this.createButtonDive())
    urlListDiv.appendChild(urlDiv)
  }

  createButtonDive = () => {
    return`
      <div class="button-div">
        <button data-action="url#redirect">Redirect</button> 
        <button id="see-more-btn" data-action="url#showDetails">see more</button>
      </div>
    `
  }

  creatOriginalUrlParagraph = (url) =>{
    return `
      <p data-url-target="originalUrl"
        data-shortVersionUrl=${url.short_version}
        data-createdAt=${url.created_at}
        data-originalUrl=${url.original}
        key=${url.id} class="url-original-divs"
      >
        ${url.short_version}
      </p>
    `
  }

  redirect = () => {
    const loadingDiv = document.querySelector("#loading-div")
    loadingDiv.style.display = "flex"
    setTimeout(this.loading, 3000)
  }

  loading = () => {
    const loadingDiv = document.querySelector("#loading-div");
    const url = this.originalUrlTarget.dataset.originalurl;
    window.location.href = url;
    loadingDiv.style.display = "none";
  };

  showDetails = (e) => {
    const urlDiv = e.path[2]
    const buttonDiv = e.path[1]
    const seeMoreBtn = e.target
    const targetedElement = urlDiv.childNodes[1]
    const detailDiv = document.createElement("div");
    const originalP = document.createElement("p");
 
    const originalPText = targetedElement.dataset.originalurl;
    originalP.innerHTML = originalPText;

    const shortP = document.createElement("p");
    const shortPText = targetedElement.dataset.shortversionurl;
    shortP.innerHTML = shortPText;

    detailDiv.appendChild(originalP);
    detailDiv.appendChild(shortP)
    urlDiv.appendChild(detailDiv)

    const dateP = document.createElement("p")
    const datePText = targetedElement.dataset.createdat
    dateP.innerHTML = `created on: ${datePText}`
    detailDiv.appendChild(dateP)

    detailDiv.setAttribute("style", "margin-top: 10px;")


    const closeBtn = document.createElement("button")
    closeBtn.innerHTML = "close detail view"
    closeBtn.setAttribute("data-action", "url#closeDetails")
    buttonDiv.appendChild(closeBtn)
    buttonDiv.removeChild(seeMoreBtn)

  };

  closeDetails = (e) => {
    const urlDiv = e.path[2]
    const closeBtn = e.target

    const detailDiv = e.path[2].childNodes[5]
    urlDiv.removeChild(detailDiv)

    const buttonDiv = e.path[1]
    buttonDiv.removeChild(closeBtn)
    
    const seeMoreBtn = document.createElement("button")
    seeMoreBtn.innerHTML = "see more"
    seeMoreBtn.setAttribute("data-action", "url#showDetails")
    buttonDiv.appendChild(seeMoreBtn)
  }

};