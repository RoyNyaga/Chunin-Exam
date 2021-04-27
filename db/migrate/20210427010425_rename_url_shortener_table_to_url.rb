class RenameUrlShortenerTableToUrl < ActiveRecord::Migration[6.1]
  def change
    rename_table :url_shorteners, :urls
  end
end
