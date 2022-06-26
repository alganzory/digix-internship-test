(function(){
  
  let screen = document.querySelector('.screen');
  let buttons = document.querySelectorAll('.btn');
  let clear = document.querySelector('.btn-clear');
  let equal = document.querySelector('.btn-equal');

  //  will be used to store the accumulator
  let accumulativeAnswer='';

  let isOperator = (operator) => {
    return operator === '+' || operator === '-' || operator === '*' || operator === '/';
  }

  // used to store the last pressed button in case it's needed
  let previousPress = '';

  buttons.forEach(function(button){
    button.addEventListener('click', function(e){
      let value = e.target.dataset.num;

      // if it's a number, allow concatenation,
      // if it's an operator, clear the screen 
      if (isOperator(value) || isOperator(accumulativeAnswer[accumulativeAnswer.length-1])) {
        screen.value = value;
      }
      // if they enter a number after a calculation, clear the previous answer
      else if (previousPress === 'equal') {
        screen.value = value;
        accumulativeAnswer = value;
        return;
      }
      else { 
        screen.value += value;
      }

    
      accumulativeAnswer+=value;
    })
  });
  
  equal.addEventListener('click', function(e){
    previousPress = 'equal';
    if(screen.value === ''){
      screen.value = 'Please Enter a Value';
    } else {
      let answer = eval(accumulativeAnswer);
      screen.value = answer;
      accumulativeAnswer = answer;
    }
  })
  
  clear.addEventListener('click', function(e){
    screen.value = '';
    accumulativeAnswer = '';
  })
 
})();
