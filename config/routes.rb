Rails.application.routes.draw do
  root "restaurants#index"
  resources :users, only: [:create, :new, :show]
  resource :session, only: [:create, :new, :destroy]

  resources :restaurants
  resources :reviews, only: [:create, :destroy, :edit]

end
