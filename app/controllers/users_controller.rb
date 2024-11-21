class UsersController < ApplicationController
  before_action :set_user, only: [:edit, :update, :show]

  def edit
  end

  def update
    puts "*****************"
    puts user_params

    avatar_image = user_params[:avatar]

    if avatar_image.present?
      uploaded_image = Cloudinary::Uploader.upload(avatar_image.path,transformation: {
        width: 300,
        height: 300,
        crop: "fit", # Other options: "fill", "scale", "thumb", etc.
        quality: "auto:eco", # Automatic quality adjustment
        format: "jpg"
      }) # This uploads the image file
      puts uploaded_image
      @user.avatar = uploaded_image['secure_url'] # Store the Cloudinary URL
    end

    if @user.update(user_params.except(:avatar)) # Exclude :avatar from direct update
      @user.save # Save the updated avatar URL
      redirect_to @user, notice: 'User information was successfully updated.'
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def show
    @user = User.find(params[:id])
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:user_name, :email, :avatar)
  end
  
end
