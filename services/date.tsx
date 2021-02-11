export const formatDate = date =>{
    const onlyDate = date.substr(0,10)
    const dateArray = onlyDate.split('-')
    
    return dateArray.reverse().join("/")
}