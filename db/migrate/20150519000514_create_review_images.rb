class CreateReviewImages < ActiveRecord::Migration
  def change
    create_table :review_images do |t|
      t.attachment :image
      t.integer :review_id
      t.timestamps null: false
    end
    add_index :review_images, :review_id

  end

end
