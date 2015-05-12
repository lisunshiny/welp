class Restaurant < ActiveRecord::Base
  enum tag: [:italian, :chinese, :mexican, :american, :indian]

  validates :enum, :name, :tag, :address, :city, :state, :zip, :phone, :user_id, null: false

  belongs_to :user


end
