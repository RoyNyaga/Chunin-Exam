require 'rails_helper'

describe "When clicking on the redirect button", type: :feature do
  it "loading information should be displayed", js: true do
    create(:url)
    visit "/"
    click_button "Redirect"
    expect(page).to have_content "Redirecting to original url. . . ."
  end 
end