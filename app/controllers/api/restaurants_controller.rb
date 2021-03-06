class Api::RestaurantsController < Api::ApiController
  wrap_parameters(false)

  def create
    @restaurant = current_user.restaurants.new(restaurant_params)

    if @restaurant.save
      render :show
    else
      render json: @restaurant.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @restaurant = current_user.restaurants.find(params[:id])

    @restaurant.try(:destroy)
    render json: {}
  end

  def index
    # make this a thing later
    @page_num = page_num
    @restaurants = Restaurant.page(@page_num)


    #custom json for this
    render :index
  end

  def show
    #by including these in the results set i can avoid addtl queries.
    @restaurant = Restaurant.includes(:user, reviews: [:user]).find(params[:id])

    render :show
  end

  def search
    @page_num = page_num
    if params[:query].present?
      @restaurants = Restaurant
        .where("(LOWER(name) ~ LOWER(:query)) OR (tag IN (:tags))",
          { query: params[:query],
            tags: queried_tags(params[:query]) }).page(page_num)
    else
      @restaurants = Restaurant.none
    end

    render :index

  end

  def update
    @restaurant = current_user.restaurants.find(params[:id])
    render json: ["You can't edit this restaurant"] unless @restaurant


    if @restaurant.update(restaurant_params)
      render :show
    else
      render json: @restaurant.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

    def restaurant_params
      restaurant_params = params.require(:restaurant)
        .permit(:name, :tag, :address, :city, :state, :zip, :phone, :pic)

      if restaurant_params[:pic] && restaurant_params[:pic].include?("/assets/pics")
        restaurant_params.delete(:pic)
      end

      restaurant_params[:tag] = restaurant_params[:tag].to_i

      return restaurant_params
    end

    def queried_tags(query)
      tags = Restaurant.tags

      tags.select {|tag| query.downcase.in?(tag)}.values
    end

    def page_num
      params[:page_num] ||= 1
      params[:page_num] = params[:page_num].to_i
    end


end
