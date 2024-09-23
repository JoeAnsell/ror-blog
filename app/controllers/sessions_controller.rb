class SessionsController < ApplicationController

  def new
  end

  def create
    user = User.find(email: params[:email])
    if user.present? && user.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to root_path, ntoice: "Successfully logged in"
    else
      flash[:alert] = 'Invalid email or password'
      render :new
    end
  end 
end 
