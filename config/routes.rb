Rails.application.routes.draw do
  
  root "urls#index"

  resources :urls
  get "redirect/url/:id", to: "urls#redirect_url"

end
