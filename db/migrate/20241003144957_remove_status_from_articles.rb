class RemoveStatusFromArticles < ActiveRecord::Migration[7.1]
  def change
    remove_column :articles, :status, :string
  end
end
