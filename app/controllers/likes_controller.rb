class LikesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_article

  def create 
    @article.likes.create(user: current_user)
    # Update button without refreshing page
    respond_to do |format|
      format.html { redirect_to @article }
      format.js   # Render a JavaScript file (create.js.erb)
    end
  end


  def destroy 
    @article.likes.find_by(user: current_user)&.destroy
    # Update button without refreshing page
    respond_to do |format|
      format.html { redirect_to @article }
      format.js   # Render a JavaScript file (destroy.js.erb) 
    end
  end

  private
    def set_article
      @article = Article.find(params[:article_id])
    end
end
