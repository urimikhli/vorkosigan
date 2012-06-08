module ApplicationHelper
  #return a default title
  def title
 
    base_title = "HTML5/Javascript Games Development"
    if @title.nil?
      base_title
    else
      " | #{@title} | #{base_title} | "
    end
  end

  def logo
    image_tag("logo.png", :alt => "sample app", :class => "round")
  end

  def appTag 
    #this tag :htmlfp is set in application.rb javascript_expansions field 
    if @title.eql?("HTML5 for Publishers") 
       :html5fp
    elsif  @title.eql?("CSSGameEngine") 
      :cssgameengine
    elsif  @title.eql?("GMP") 
      :gmp
    elsif  @title.eql?("JawsJS") 
      :jaws
    elsif  @title.eql?("EntityJS") 
      :entityjs
    elsif  @title.eql?("ImpactJS") 
      :impactjs
    else #the :defaults are already being set
       "" 
    end
  end

  def bodyMods
    if  @title.eql?("CSSGameEngine")
      @bodyMods = %(onLoad="ENGINE.init('Psylocke')" onKeyPress="checkEnter(event)" )
    end
  end

end 
