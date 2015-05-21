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

  def oauth
    user = User.find_or_create_by_auth_hash(auth_hash)
    login_user!(user)
    redirect_to root_url
  end

  def guest
    user = User.log_in_as_guest
    login_user!(user)
    redirect_to root_url
  end

  private

    def user_params
      params.require(:user).permit(:username, :password)
    end

    def auth_hash
      request.env['omniauth.auth']
    end
end
