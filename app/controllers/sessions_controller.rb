class SessionsController < ApplicationController

  def create
    user = User.find_by_credentials(user_params)

    if user
      login_user!(user)
      redirect_to root_url
    else
      flash.now[:errors] = ["Incorrect username and/or password"]
      @user = User.new(user_params)
      render :new
    end
  end

  def new
    @user = User.new
    render :new
  end

  def destroy
    logout_user!
    redirect_to root_url
  end

  private

    def user_params
      params.require(:user).permit(:username, :password)
    end
end
