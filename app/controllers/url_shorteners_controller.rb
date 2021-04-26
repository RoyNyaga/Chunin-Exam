class UrlShortenersController < ApplicationController
  def index
    @url = UrlShortener.new
  end
  
  def create 
    @url = UrlShortener.new(url_shortener_params)
    if @url.valid?
      @url.add_shortform
      byebug
      @url.save
      flash.now[:success] = "successfully created url short form"
      render "index"
    else
      flash.now[:warning] = "could not create shortenner for the following reasons"
      render "index"
    end 
  end
  
  private 

  def url_shortener_params 
    params.require(:url_shortener).permit(:original, :short_version)
  end 
end
