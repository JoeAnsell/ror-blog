class RegistrationsController < ApplicationController
  def new
    @user = User.new
  end

  def create 
    @user = User.new(registration_params)

    # Get the base64 string from the form
    # puts params[:user][:avatar]
    avatar_image = params[:user][:avatar]

    # If there is a base64 image, upload it to Cloudinary
    if avatar_image.present?
      uploaded_image = Cloudinary::Uploader.upload(avatar_image.path,transformation: {
        width: 300,
        height: 300,
        crop: "fit", # Other options: "fill", "scale", "thumb", etc.
        quality: "auto:eco", # Automatic quality adjustment
        format: "jpg"
      }) # This uploads the image file
      @user.avatar = uploaded_image['secure_url'] # Store the Cloudinary URL
    end

    if @user.save 
      login @user
      redirect_to root_path, notice: "Successfully created account!"
    else
      render :new, status: :unprocessable_entity
    end
  end

  private
  def registration_params
    params.require(:user).permit(:email, :user_name, :password, :password_confirmation, :avatar)
  end
end