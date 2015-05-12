class RestaurantsController < ApplicationController
  def index
    @restaurants = Restaurant.all
    render :index
  end

  def create
    @restaurant = current_user.restaurants.new(restaurant_params)

    if @restaurant.save
      redirect_to root_url
    else
      fail
      flash.now[:errors] = @restaurant.errors.full_messages
      render :new
    end
  end

  def new
    @restaurant = Restaurant.new
    render :new
  end

  def edit
    @restaurant = Restaurant.find(params[:id])
    render :edit
  end

  def show
    @restaurant = Restaurant.find(params[:id])
    render :show
  end

  def update
    @restaurant = current_user.restaurants.find(params[:id])

    if @restaurant.update(restaurant_params)
      redirect_to restaurant_url(@restaurant)
    else
      flash.now[:errors] = @restaurant.errors.full_messages
      render :edit
    end
  end

  def destroy
    @restaurant = current_user.restaurants.find(params[:id])

    if @restaurant.destroy(restaurant_params)
      redirect_to restaurants_url
    end
  end

  private
    def restaurant_params
      restaurant_params = params
        .require(:restaurant)
        .permit(:name, :tag, :address, :city, :state, :zip, :phone)
      restaurant_params[:tag] = restaurant_params[:tag].to_i

      return restaurant_params
    end

end
