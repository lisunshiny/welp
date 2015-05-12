class Restaurant < ActiveRecord::Base
  enum tag: [:italian, :chinese, :mexican, :american, :indian]

  validates :enum, :name, :tag, :address, :city, :state, :zip, :phone, :user_id, null: false

  validates_inclusion_of :zip, { :in => 10000..99999 }

  belongs_to :user


end
