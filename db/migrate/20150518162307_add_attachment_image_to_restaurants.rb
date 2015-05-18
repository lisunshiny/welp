class AddAttachmentImageToRestaurants < ActiveRecord::Migration
  def self.up
    change_table :restaurants do |t|
      t.attachment :pic
    end
  end

  def self.down
    remove_attachment :restaurants, :pic
  end
end
