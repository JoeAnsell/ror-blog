Rails.application.routes.draw do

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"

  root "main#index"


  resources :articles do
    resources :comments
    resource :likes, only: [:create, :destroy]
  end

  get 'tags/:tag', to: 'tags#index', as: :tag

  resources :my_articles, path: 'my-articles'
  resource :session
  resource :registration
  resource :password_reset
  resource :password

  resources :users

  get 'search', to: 'search#index'
  get 'search_articles', to: 'search#search_articles'

end
