# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# create_table "restaurants", force: :cascade do |t|
#   t.string   "name",             null: false
#   t.integer  "tag",              null: false
#   t.string   "address",          null: false
#   t.string   "city",             null: false
#   t.string   "state",            null: false
#   t.integer  "zip",              null: false
#   t.integer  "phone",            null: false
#   t.integer  "user_id",          null: false
#   t.datetime "created_at",       null: false
#   t.datetime "updated_at",       null: false
#   t.string   "pic_file_name"
#


restaurants = Restaurant.create([
  {
    name: "Prince St. Pizza",
    tag: "italian",
    address: "27 Prince St",
    city: "New York",
    state: "NY",
    zip: 10003,
    phone: 2129664100,
    user_id: 1
  }





  ])
