class UsersController < ApplicationController
  before_action :set_user, only: [:edit, :update]

  def edit
    # @user is set by the before_action
  end

  def update
    if @user.update(user_params)
      redirect_to @user, notice: 'User information was successfully updated.'
    else
      render :edit, status: :unprocessable_entity
    end
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:name, :email)
  end
  
end
