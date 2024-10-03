class MyArticlesController < ApplicationController
  before_action :authenticate_user!

  def index
    @live_articles = current_user.articles.where(status: 'published')
    @draft_articles = current_user.articles.where(status: 'draft').or(current_user.articles.where(status: nil))
  end



end