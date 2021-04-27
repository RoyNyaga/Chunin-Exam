class UrlsController < ApplicationController
  def index
    @url = Url.new
  end
  
  def create 
    byebug
    # @url = Url.new(url_shortener_params)
    # if @url.valid?
    #   @url.add_shortform
    #   @url.save
    #   flash.now[:success] = "successfully created url short form"
    #   render "index"
    # else
    #   flash.now[:warning] = "could not create shortenner for the following reasons"
    #   render "index"
    # end 
  end
  
  private 

  def url_shortener_params 
    params.require(:url).permit(:original, :short_version)
  end 
end
