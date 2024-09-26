class CommentsController < ApplicationController
    before_action :authenticate_user! 

    def comment
        @article.egg = 'egg'
    end


    def create 
        @article = Article.find(params[:article_id])
        @comment = @article.comments.new(comment_params)
        @comment.user = current_user

        if @comment.save
            redirect_to article_path(@article), notice: 'Comment was successfully created.'
        else
            redirect_to article_path(@article), alert: 'Unable to add comment.'
        end
    end

    def destroy
        @article = Article.find(params[:article_id])
        @comment = @article.comments.find(params[:id])
        @comment.destroy
        redirect_to article_path(@article), status: :see_other
    end

    private 
        def comment_params
            params.require(:comment).permit(:body, :status)
        end
end
