class AddUserToArticles < ActiveRecord::Migration[7.1]
  def change
    add_reference :articles, :user, foreign_key: true # Temporarily allow nulls
  end
end
