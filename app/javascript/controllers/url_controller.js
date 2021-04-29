import { Controller } from "stimulus";
import Axios from "axios"

export default class extends Controller {
  static targets = [ "original", "originalUrl", "urlDiv", "messageDiv" ];

  redirectRequest = (id) => {
    const token = document.querySelector('[name=csrf-token]').content;
    Axios.get(`redirect/url/${id}`)
    .then(response => {
      const { status, url } = response.data
      if (status == "tracked"){
        window.location.href = `${url.original}`
      }else{ alert("error some where")}
    })
    
  }

  submitForm(e){
    const token = document.querySelector('[name=csrf-token]').content;
    const data = { "original": this.originalTarget.value };
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
      const { url, status } = result
      if (status == "success"){
        this.addElement(url);
        this.cleanUpInput();
        this.successMessage();
      }else{
        const { errors } = result;
        this.displayErrors(errors);
      }
    })
    .catch(function (error) {
      console.log('Request failed', error);
    });
  };

  cleanUpInput = () => {
    this.originalTarget.value = "";
  };

  displayErrors = (errors) => {
    let errorP = `fsgd`;
    errors.forEach(error => {
      errorP = `<p class="error-messages">${error}</p>`;
    })
    console.log(errorP);
    this.messageDivTarget.innerHTML = errorP;
  }

  successMessage = () => {
    const messageP = `
      <p class="success-message">Url was added successfully</p>
    `
    this.messageDivTarget.innerHTML = messageP;
    setTimeout(() => {this.messageDivTarget.innerHTML = ""}, 3000);
  }

  addElement = (url) => {
    const urlListDiv = document.querySelector("#url-list-div");
    const urlDiv = document.createElement("div");
    urlDiv.setAttribute("class", "url-div");
    urlDiv.innerHTML = this.creatOriginalUrlParagraph(url) + this.createButtonDive();
    urlListDiv.appendChild(urlDiv);
  }

  createButtonDive = () => {
    return`
      <div class="button-div">
        <button data-action="url#redirect">Redirect</button> 
        <button id="see-more-btn" data-action="url#showDetails">see more</button>
      </div>
    `
  };

  creatOriginalUrlParagraph = (url) =>{
    const { short_version, created_at, original, id } = url ;
    return `
      <p data-url-target="originalUrl"
        data-shortVersionUrl=${short_version}
        data-createdAt=${created_at}
        data-originalUrl=${original}
        key=${id} class="url-original-divs"
      >
        ${short_version}
      </p>
    `
  };

  redirect = (e) => {
    const loadingDiv = document.querySelector("#loading-div");
    this.startLoading(loadingDiv);
    // e.path is not supported in safari and firefox, use e.compoasedPath() where e.path is not supported
    let path = e.path || (e.composedPath && e.composedPath());
    if (path) {
      const urlDiv = path[2];
      const targetedElement = urlDiv.childNodes[1];
      const id = targetedElement.attributes.key.value
      setTimeout(this.endLoading, 4000, loadingDiv);
      setTimeout(this.redirectRequest, 2000, id)
    }else{ alert("Please use a supported browser for this feature, chrome, safari or firefox") }



    // e.path is not supported in safari and firefox, use e.compoasedPath() where e.path is not supported
    // let path = e.path || (e.composedPath && e.composedPath());
    // if (path) {
    //   const urlDiv = path[2];
    //   const targetedElement = urlDiv.childNodes[1];
    //   const url = targetedElement.dataset.originalurl;
    //   this.startLoading(loadingDiv);
    //   setTimeout(this.changeLocation, 2000, url);
    //   setTimeout(this.endLoading, 3000, loadingDiv);
    // }else{ alert("Please use a supported browser for this feature, chrome, safari or firefox")}

  };

  changeLocation = (url) => {
    window.location.href = url;
  };

  startLoading = (loadingDiv) => {
    loadingDiv.style.display = "flex";
  };

  endLoading = (loadingDiv) => {
    loadingDiv.style.display = "none";
  };

  showDetails = (e) => {
    let path = e.path || (e.composedPath && e.composedPath());
    if (path) {
      const urlDiv = path[2];
      const buttonDiv = path[1];
      const seeMoreBtn = e.target;
      const targetedElement = urlDiv.childNodes[1];
      const detailDiv = this.createDetailDiv(targetedElement);
      urlDiv.appendChild(detailDiv);
      this.removeShowDetailBtn(buttonDiv, seeMoreBtn);
    }else{ alert("Please use a supported browser for this feature, chrome, safari or firefox")}
  };

  removeShowDetailBtn = (buttonDiv, seeMoreBtn) => {
    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = "close detail view";
    closeBtn.setAttribute("data-action", "url#closeDetails");
    buttonDiv.appendChild(closeBtn);
    buttonDiv.removeChild(seeMoreBtn);
    buttonDiv = buttonDiv;
  }

  closeDetails = (e) => {
    let path = e.path || (e.composedPath && e.composedPath());
    if (path) {
      const urlDiv = path[2];
      const closeBtn = e.target;
      const buttonDiv = path[1];
      const detailDiv = path[2].childNodes[5];
      urlDiv.removeChild(detailDiv);
      this.removeCloseDetailBtn(buttonDiv, closeBtn);
    }else{alert("Please use a supported browser for this feature, chrome, safari or firefox")}
  }

  removeCloseDetailBtn = (buttonDiv, closeBtn) => {
    const seeMoreBtn = document.createElement("button");
    seeMoreBtn.innerHTML = "see more";
    seeMoreBtn.setAttribute("data-action", "url#showDetails");
    buttonDiv.appendChild(seeMoreBtn);
    buttonDiv.removeChild(closeBtn);
  }

  createDetailDiv = (targetedElement) => {
    const { shortversionurl, originalurl, createdat } = targetedElement.dataset;

    const detailDiv = document.createElement("div");
    detailDiv.setAttribute("style", "margin-top: 10px;");
    const paragraphTags = ` 
      <p>${originalurl}</p>
      <p>${shortversionurl}</p>
      <p>Created on: ${createdat}</p>
      `
    detailDiv.innerHTML = paragraphTags;
    return detailDiv
  };

};