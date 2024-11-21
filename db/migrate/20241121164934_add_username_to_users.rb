class AddUsernameToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :user_name, :string, null: true
    add_index :users, :user_name, unique: true
  end
end
