class SessionsController < ApplicationController

  def create
    user = User.find_by_credentials(user_params)

    if user
      login_user!(user)
      redirect_to users_url
    else
      flash.now[:errors] = ["Incorrect username and/or password"]
      @params = user_params
      render :new
    end
  end

  def new
    render :new
  end

  def destroy
    logout_user!
    redirect_to new_session_url
  end

  private

    def user_params
      params.require(:user).permit(:username, :password)
    end
end
