require 'rails_helper'

describe "toggling between see more and seeing less information about urls", type: :feature do
  before :each do
    @url = create(:url)
  end

  describe "clicking on the see more button", js: true do 
    it "should display detail information about url" do 
      visit "/"
      click_button "see more"
      expect(page).to have_content @url.original
    end 
  end 

  describe "clicking on the close detail view button", js: true do 
    it "should hide detailed information about url" do 
      visit "/"
      click_button "see more"
      click_button "close detail view"
      expect(page).not_to have_content @url.original
    end 
  end 
end