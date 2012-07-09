# == Schema Information
#
# Table name: users
#
#  id         :integer         not null, primary key
#  name       :string(255)
#  email      :string(255)
#  created_at :datetime
#  updated_at :datetime
#

class User < ActiveRecord::Base
  attr_accessible :name, :email 
  regex_for_valid_emails = /\A[\w+\-.]+@[\w.\-]+\.\w{3}\Z/i
  
  validates :name,  :presence   => true,
                    :length     => {:maximum => 50 }
  validates :email, :presence   => true,
                    :format     => { :with => regex_for_valid_emails },
                    :uniqueness => {:case_sensitive => false}
end
