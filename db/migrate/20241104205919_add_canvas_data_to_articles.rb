class AddCanvasDataToArticles < ActiveRecord::Migration[7.1]
  def change
    add_column :articles, :canvas_data, :text
  end
end
