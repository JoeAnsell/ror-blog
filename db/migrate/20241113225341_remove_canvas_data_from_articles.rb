class RemoveCanvasDataFromArticles < ActiveRecord::Migration[7.1]
  def change
    remove_column :articles, :canvas_data, :string
  end
end
