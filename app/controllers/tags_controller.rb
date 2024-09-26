class TagsController < ApplicationController

  def index
    @articles = Article.all

    if params[:tag]
      @articles = Article.joins(:tags).where(tags: { name: params[:tag] })
      @tag_name = params[:tag]
    else
      @articles = Article.all
    end
  end

end
