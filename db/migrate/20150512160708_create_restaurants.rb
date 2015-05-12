class CreateRestaurants < ActiveRecord::Migration
  def change
    create_table :restaurants do |t|
      t.string :name, null: false
      t.integer :tag, null: false

      t.string :address, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.integer :zip, null: false

      t.integer :phone, null: false

      t.integer :user_id, null: false

      t.timestamps null: false
    end

    add_index :restaurants, :name
    add_index :restaurants, :user_id
    add_index :restaurants, :tag


  end
end
