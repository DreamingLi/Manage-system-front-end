

const getRedirectTo = (type, avatar) =>{
    let path = ''
    if(type === 'manager'){
      path ='/manager'
    }
    else{
      path = '/employee'
    }
  
    if(!avatar){
      path +='info'
    }
  
    return path
  }

  export { getRedirectTo }