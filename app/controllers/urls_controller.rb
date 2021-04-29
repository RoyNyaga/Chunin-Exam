class UrlsController < ApplicationController

  before_action :set_url

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

  def set_url 
    @url = params[:id]
  end 


  def url_params 
    params.require(:url).permit(:original, :short_version)
  end 

  def track_url_clicks(option)
    ahoy.track "#{option}", request.path_parameters
  end
end
