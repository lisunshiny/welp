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
    @restaurants = Restaurant.page(params[:page_num])

    #custom json for this
    render :index
  end

  def show
    #by including these in the results set i can avoid addtl queries.
    @restaurant = Restaurant.includes(:user, reviews: [:user]).find(params[:id])

    render :show
  end

  def search
    if params[:query].present?
      @restaurants = Restaurant
        .where("(name ~ :query) OR (tag IN (:tags))",
          { query: params[:query],
            tags: queried_tags(params[:query]) }).page(1)
    else
      @restaurants = Restaurant.none
    end

    render :index

  end

  private

    def restaurant_params
      restaurant_params = params.require(:restaurant)
        .permit(:name, :tag, :address, :city, :state, :zip, :phone, :pic)

      restaurant_params[:tag] = restaurant_params[:tag].to_i

      return restaurant_params
    end

    def queried_tags(query)
      tags = Restaurant.tags

      tags.select {|tag| query.in?(tag)}.values
    end


end
