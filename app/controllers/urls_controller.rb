class UrlsController < ApplicationController
  def index
    @url = Url.new
  end
  
  def create 
    @url = Url.new(url_params)
    if @url.save
      render status: 201, json: { 
        status: "success",
        url: @url 
      }
    else
      render json: {
        status: "failed",
         errors: @url.errors.full_messages 
        }
    end
  end
  
  private 

  def url_params 
    params.require(:url).permit(:original, :short_version)
  end 
end
