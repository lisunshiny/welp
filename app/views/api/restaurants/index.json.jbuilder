json.array! @restaurants do |restaurant|
  json.name restaurant.name
  json.tag restaurant.tag

  json.address1 restaurant.address
  json.address2 "#{restaurant.city}, #{restaurant.state} #{restaurant.zip}"
  json.phone restaurant.phone

  json.avg_rating restaurant.avg_rating
  json.num_reviews restaurant.num_reviews


end
