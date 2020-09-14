const compound = (amount, times, interest) => {
    if (times > 0) {    
        return compound((amount * ((interest/100)+1)), (times - 1), interest);
    }
    return amount;
}

// const compound = (amount, times, interest) => {
//     if (times > 0) {
//         amount = amount * interest;
//         times = times - 1;
//         return compound(amount, times, interest);
//     }
//     return amount;
// }

function persistence(num) {
    let count = 0;
    if (num.toString().length === 1) {
      return count;
    }
    const multiplyDigits = (x) => {
        x = x.toString().split('');
      let newNum = 1;
      for (let i = 0; i < x.length; i++) {
          newNum = newNum * x[i];
      }
      return newNum;
    }
    do {
        count ++;
        num = multiplyDigits(num);
    } while (multiplyDigits(num).toString().length > 1) 
    return count;
}

let input = 11610034353958398;
let result = persistence(input);
console.log('The results are', result);

document.getElementById("submit").addEventListener('click', (e) => {
    e.preventDefault();
    console.log("submit intercepted");
    let initial = document.getElementById("initial").value;
    let times = document.getElementById("times").value;
    let interest = document.getElementById("interest").value;
    document.getElementById('output').innerHTML = compound(initial, times, interest);
    
    if (document.getElementById('output').innerHTML) {
        console.log('this ran');
        document.getElementById('clear').style.display = "inline-block";
    }
});


const calc = (e) => {
    e.preventdefault();
    console.log("calculated");
    document.getElementById('output').innerHTML = "ta-da!";
}




// document.getElementById('display').innerHTML = result;