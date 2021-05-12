const PizzaRec = (input1, input2, dataBase) => {
   let recommendation;
   
    for (pizzaPlace in dataBase){
        
        if (recommendation === undefined){
            recommendation = `${pizzaPlace}`;
        }
        let test1 = dataBase[recommendation][`${input1}`] + dataBase[recommendation][`${input2}`];
        let test2 = dataBase[pizzaPlace][`${input1}`] + dataBase[pizzaPlace][`${input2}`];
        if (test1 < test2) {
            recommendation = `${pizzaPlace}`;
        }
    }
   

    return recommendation
}

export default PizzaRec
/*
Test Database to make sure the function works
const dataBase = {
    'pizza1':{
        'cheese': 2,
        'sauce': 1,
        'crust': 5,
        'rating': 4
    },
    'toms_pizza':{
        'cheese':5,
        'sauce': 1,
        'crust': 2,
        'rating': 5
    },
    'joans_pizza': {
        'cheese': 1,
        'sauce': 5,
        'crust': 1,
        'rating': 5
    }
}

console.log(PizzaRec('rating', 'crust', dataBase))
you can use the above command to test the function



*/
