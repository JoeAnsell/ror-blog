class ArticlesController < ApplicationController

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

    if @article.save
      redirect_to @article
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
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

  private
    def article_params
        params.require(:article).permit(:title, :body, :status, :tag_list)
    end

end
