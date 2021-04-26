Rails.application.routes.draw do
  root "url_shorteners#index"

  resources :url_shorteners

end
