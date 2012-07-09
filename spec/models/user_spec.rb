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

require 'spec_helper'

describe User do

  before(:each) do
    @attr = {:name=>"example",:email=>"tst@example.com"}
  end
  
  it "should create a new user instance given a valid attribute" do
    User.create!(@attr)
  end
  it "should require a name" do
    noname= User.new(@attr.merge(:name=>""))

    noname.should_not be_valid

  end
  it "should require an email" do
    noemail= User.new(@attr.merge(:email=>""))
    noemail.should_not be_valid

  end
  
  it "should reject name that are too long" do
    longname="a" * 51 #maximum 50
    longuser=User.new(@attr.merge(:name=>longname))
    longuser.should_not be_valid
  end

   #this is to help future debugging of regexs
   it "should accept emails that are correct" do
      addresses=%w[user@foo.com FOO@BAR.net f.b@baz.woo.org f_b@baz.woo.org f_+b@baz.woo.org f-b@baz.woo.org foo@3com3.com foo@3-3.com foo3@foo3.com]
      
      addresses.each do |address|
        valid_email_user = User.new(@attr.merge(:email=> address)) 
        valid_email_user.should be_valid
      end
   end
   it "should reject emails that are incorrect" do
     #exampls of some common email mistakes
     addresses=%w[user@foo,com FOO.BAR.net f,b@baz.woo.org f.b@baz.woo.]
    
     addresses.each do |address|
        invalid_email_user = User.new(@attr.merge(:email=> address)) 
        invalid_email_user.should_not be_valid
      end
   end
   it "should reject emails that are NOT unique" do
     User.create!(@attr)
     dupUser= User.new(@attr)
     dupUser.should_not be_valid
   end

   it "should reject emails that are dupes except for case" do
      upcase_email = @attr[:email].upcase
      User.create!(@attr.merge(:email=>upcase_email))
      dupUser= User.new(@attr)
      dupUser.should_not be_valid
   end

end
