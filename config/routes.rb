Rails.application.routes.draw do
  root "static_pages#root"
  resources :users, only: [:create, :new, :show]
  resource :session, only: [:create, :new, :destroy]

  resources :restaurants
  resources :reviews, only: [:create, :destroy, :edit]

  namespace :api, defaults: { format: :json } do
    resources :restaurants
    resources :reviews, only: [:create, :edit, :destroy]
    get "/users/current", to: "users#current", as: "current_user"
    resources :users, only: [:show, :upate]
  end

end
