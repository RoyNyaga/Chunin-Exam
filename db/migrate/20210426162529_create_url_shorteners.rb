class CreateUrlShorteners < ActiveRecord::Migration[6.1]
  def change
    create_table :url_shorteners do |t|
      t.string :original
      t.string :short_version

      t.timestamps
    end
    add_index :url_shorteners, :original
  end
end
