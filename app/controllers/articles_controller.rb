class ArticlesController < ApplicationController
  before_action :authenticate_user, only: [:edit]
  before_action :authorize_user, only: [:edit]


  def index
    @articles = Article.all

    if params[:tag]
      @articles = Article.joins(:tags).where(tags: { name: params[:tag] })
    else
      @articles = Article.all
    end
  end

  def show 
    @article = Article.find(params[:id])
    @user_id = @article.user_id
    @user = User.find_by(id: @user_id)

    if @user
      @user_name = @user.email
    else
      @user_name = "No Name"  # or handle the case when the user is nil
    end
  end

  def new
    @article = Article.new
  end

  def create
    # @article = Article.new(article_params)
    @article = current_user.articles.build(article_params)

    # Get the base64 string from the form
    base64_image = params[:article][:image]

    # If there is a base64 image, upload it to Cloudinary
    if base64_image.present?
      uploaded_image = upload_to_cloudinary(base64_image)
      @article.image = uploaded_image['secure_url'] # Store the Cloudinary URL
    end

    if @article.save
      redirect_to @article
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    puts "**************"
    puts params[:id]


    @article = Article.find(params[:id]) 
  end

  def update
    @article = Article.find(params[:id])

    if @article.update(article_params)
      redirect_to @article, notice: "Article was successfully updated."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @article = Article.find(params[:id])
    @article.destroy

    redirect_to root_path, status: :see_other
  end

  def upload_to_cloudinary(base64_image)
    # Remove the data URL prefix (if present)
    base64_data = base64_image.gsub(/^data:image\/\w+;base64,/, '')

    # Decode the base64 data
    decoded_image = Base64.decode64(base64_data)

    # Create a temporary file for uploading
    tempfile = Tempfile.new(['upload', '.jpg'])
    tempfile.binmode
    tempfile.write(decoded_image)
    tempfile.rewind

    # Upload the image to Cloudinary
    cloudinary_response = Cloudinary::Uploader.upload(tempfile.path, folder: 'articles/images')

    # Return the response, which contains the URL
    cloudinary_response
  end

   # Checks if a user is logged in
   def authenticate_user
    unless current_user
      redirect_to new_session_path, alert: "Please log in to edit this article."
    end
  end

  # Checks if the logged-in user is the author of the article
  def authorize_user
    @article = Article.find(params[:id])
    unless @article.user == current_user
      redirect_to article_path(@article), alert: "You are not authorized to edit this article."
    end
  end

  private
    def article_params
        params.require(:article).permit(:title, :body, :image, :status, :tag_list)
    end

end
