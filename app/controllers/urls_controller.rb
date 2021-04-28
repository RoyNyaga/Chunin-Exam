class UrlsController < ApplicationController
  def index
    @url = Url.new
  end
  
  def create 
    @url = Url.new(url_params)
    if @url.valid?
      @url.save
      flash.now[:success] = "successfully created url short form"
      render json: { url: @url }
    else
      render json: { errors: @url.errors.full_messages }
    end
  end
  
  private 

  def url_params 
    params.require(:url).permit(:original, :short_version)
  end 
end
