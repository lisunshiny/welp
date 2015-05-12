class RestaurantsController < ApplicationController
  def index
    @restaurants = Restaurant.all
    render :index
  end

  def create
    @restaurant = current_user.restaurants.new(restaurant_params)

    if @restaurant.save
      redirect_to restaurant_url(restaurant)
    else
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
    @restaurant = Restaurant.find(params[:id])


  end

  def destroy
    @restaurant = Restaurant.find(params[:id])

  end

  private

    def restaurant_params
      params
        .require(:restaurant)
        .permit(:name, :tag, :address, :city, :state, :zip, :phone)
    end


end
