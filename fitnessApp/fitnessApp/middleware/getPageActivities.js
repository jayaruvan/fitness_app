 // middleware which will give 5 or less activities for rendering
module.exports = (req,res,next) => {
    let array = req.activities.slice();
    let finalArray = [];
    
    let index = ((req.page-1)*5);
    let counter = 0;

    if(typeof array[index] === 'undefined') {
        
    }
    else {
        while(counter < 5){
            if((typeof array[index+counter] === 'undefined')){
                break;
            }else {
                finalArray.push(array[index+counter]);
            }
            counter++;
        }
    }
    req.listOfActivities = finalArray;
    next();
};