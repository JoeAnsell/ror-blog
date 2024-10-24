class SearchController < ApplicationController
  def index
    @articles = Article.all
    @query = []
  end

  def search_articles
    @query = params[:query]
    if @query.present?
      # Search for articles where the title contains the search query (case-insensitive)
      @articles = Article.where("title ILIKE ?", "%#{@query}%")
    else
      @articles = Article.all # If no query, load all articles
    end

    respond_to do |format|
      format.js # Render the JavaScript response for AJAX
    end
  end
end
