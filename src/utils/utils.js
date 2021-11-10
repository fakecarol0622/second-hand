   export function throttle(func,delay) {
    let timer = null;
    return function() {
        if(!timer){
            timer = setTimeout(() => {
                func.apply(this,arguments)
                timer = null
            },delay)
        }
    }
  }

  export function convertOrderStatus(value) {
    if(value==1){
        return 'Created'
    }
    else if(value==2) {
        return 'Shipped'
    }
    else if(value==3) {
        return 'Received'
    }
    else if(value==4) {
        return 'Canceled'
    }
  }

  export function convertAccountStatus(status) {
    if(status==0){
        return 'Unlocked'
    }
    else if(status==1){
        return 'Locked'
    }
  }

  export function convertProductStatus(value) {
    if(value==1){
        return 'On sale'
    }
    else if(value==2) {
        return 'Off sale'
    }
    else if(value==3) {
        return 'No stock'
    }
  }

  export function convertClassification(value) {
      if(value==1){
          return 'book'
      }
      else if(value==2){
          return 'clothes'
      }
      else{
          return 'device'
      }
  }

  export function convertTimeStamp(timestamp) {
    let date = new Date(parseInt(timestamp));
    return date.toLocaleDateString().split('/').join('-')
  }