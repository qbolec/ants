class TeX {
  public float(x,withPlus){
    return (withPlus &&  x>=0 ? '+' : '') + x;
  }
  public integer(x,withPlus){
    return this.float(Math.round(x),withPlus);
  }

  public isInteger(x){
    return Math.abs(Math.round(x)-x) < 1e-6;
  }

  public root(x,withPlus){
    if(this.isInteger(x)){
      return this.integer(x,withPlus);
    }
    var prefix = '{';
    if(x<0){
      prefix += '-';
      x=-x;
    }else if(withPlus){
      prefix += '+';
    }
    if(this.isInteger(x*x)){
      return prefix + '\\sqrt {' +  this.integer(x*x,false)+  ' } }';
    }

    for(var div=1;div<=1000;++div){
      if(this.isInteger(x*div)){
        return prefix  + '\\frac {' + this.integer(Math.abs(x*div),false) + '}{' + div + '}}';
      }
    }

    for(var div=1;div<=1000;++div){
      if(this.isInteger(x*x*div*div)){
        return prefix  + '\\frac {\\sqrt {' + this.integer(x*x*div*div,false) + '}}{' + div + '}}';
      }
    }

    for(var off=-1000;off<=1000;++off){
      if(this.isInteger(Math.pow(x-off,2))){
        return prefix  + '(' + this.integer(off,false)  + ' ' + (x-off<0?'-':'+') + ' \\sqrt {' + this.integer(Math.pow(x-off,2),false) + '})}';
      }
    }

    for(var div=1;div<=100;++div){
      for(var off=-100;off<=100;++off){
        if(this.isInteger(Math.pow(x*div-off,2))){
          return prefix  + '\\frac {' + this.integer(off,false)  + ' ' + (x*div-off<0?'-':'+') + ' \\sqrt {' + this.integer(Math.pow(x*div-off,2),false) + '}}{' + div + '}}';
        }
      }
    }


    return prefix + this.float(x,withPlus) + '}';

  }

  public fraction(x,withPlus){
    if(this.isInteger(x)){
      return this.integer(x,withPlus);
    }
    for(var div=1;div<=1000;++div){
      if(this.isInteger(x*div)){
        return '{' + (x<0 ? '-' : (withPlus ? '+' : ''))  + '\\frac {' + this.integer(Math.abs(x*div),false) + '}{' + div + '}}';
      }
    }
    return this.float(x,withPlus);
  }
  public floatP(x){
    return this.float(x,true);
  }
  public fractionP(x){
    return this.fraction(x,true);
  }
  public integerP(x){
    return this.integer(x,true);
  }
  public rootP(x){
    return this.root(x,true);
  }
}
