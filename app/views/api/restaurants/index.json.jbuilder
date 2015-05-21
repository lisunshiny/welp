per_page = @restaurants.results_per_page
current_page = @page_num
order = per_page * (current_page - 1) + 1




json.total_pages @restaurants.total_pages

json.restaurants @restaurants do |restaurant|

  json.ord order
  order += 1
  json.id restaurant.id
  json.name restaurant.name
  json.tag restaurant.tag
  json.pic asset_path(restaurant.image_url)

  json.address1 restaurant.address
  json.address2 "#{restaurant.city}, #{restaurant.state} #{restaurant.zip}"
  json.position do
    json.lat restaurant.latitude
    json.lng restaurant.longitude
  end

  json.phone restaurant.phone


  json.avg_rating restaurant.avg_rating
  json.num_reviews restaurant.num_reviews


end
