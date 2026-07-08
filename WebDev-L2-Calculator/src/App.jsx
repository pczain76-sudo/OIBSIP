import { useState } from 'react'

import './App.css'

function App() {
  const buttons = [
    "C", "⌫", "%", "/",
    "7", "8", "9", "*",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "0", ".", "=", 'OIBSIP'
  ]
  const [display, setDisplay] = useState("0");

  const [firstNumber, setFirstNumber] = useState(null);

  const [operator, setOperator] = useState(null);

  const [waitingForSecond, setWaitingForSecond] = useState(false);
  const [expression, setExpression] = useState("");

  const handleNumber = (btn) => {
    if (waitingForSecond) {
      setDisplay(btn);
      setWaitingForSecond(false);
    } else {
      setDisplay(prev => (prev === "0" ? btn : prev + btn));
    }
  };
  const handleOperator = (btn) => {

    if (firstNumber === null) {
      setFirstNumber(parseFloat(display));
      setOperator(btn);
      setExpression(`${display} ${btn}`);
      setWaitingForSecond(true);
      return;
    }

    const secondNumber = parseFloat(display);
    let result;
    switch (operator) {
      case "+":
        result = firstNumber + secondNumber;
        break;

      case "-":
        result = firstNumber - secondNumber;
        break;

      case "*":
        result = firstNumber * secondNumber;
        break;

      case "/":
        if (secondNumber === 0) {
          setDisplay("Cannot divide by zero");
          return;
        }
        result = firstNumber / secondNumber;
        break;

      default:
        return;
    }

    setDisplay(result.toString());
    setFirstNumber(result);
    setOperator(btn);
    setWaitingForSecond(true);
    setExpression(`${result} ${btn}`);
  };



  return (
    <>
      <div className='bg-gray-800 h-auto w-70 rounded-2xl my-10 mx-auto p-2 hover:translate-x-1 shadow-2xl'>

        <div className='bg-white rounded-2xl h-25 p-3 flex flex-col justify-center items-end'>

          <p className='text-gray-500 text-lg'>
            {expression}
          </p>

          <p className='text-3xl text-black'>
            {display}
          </p>

        </div>
        <div className='grid grid-cols-4 mt-10  gap-2   ' >

          {buttons.map((btn) =>

            <button className='bg-white rounded-2xl h-12 flex justify-center items-center text-center hover:bg-blue-500
hover:text-white
transition cursor-pointer active:translate-y-1' key={btn} onClick={() => {
                if (!isNaN(btn) || btn === ".") {
                  handleNumber(btn);
                  return;
                } else if (["+", "-", "*", "/"].includes(btn)) {
                  handleOperator(btn);
                  return;
                } else
                  if (btn === "C") {
                    setDisplay("0");
                    setFirstNumber(null);
                    setOperator(null);
                    setWaitingForSecond(false);
                    setExpression("");
                  } else
                    if (btn === '⌫') {
                      setDisplay(prev => {
                        const value = prev.slice(0, -1);
                        return value === "" ? "0" : value;
                      });
                    }
                    else
                      if (btn === "=") {

                        if (firstNumber === null || operator === null) return;

                        const secondNumber = parseFloat(display);

                        let result;

                        switch (operator) {
                          case "+":
                            result = firstNumber + secondNumber;
                            break;

                          case "-":
                            result = firstNumber - secondNumber;
                            break;

                          case "*":
                            result = firstNumber * secondNumber;
                            break;

                          case "/":
                            if (secondNumber === 0) {
                              setDisplay("Cannot divide by zero");
                              return;
                            }
                            result = firstNumber / secondNumber;
                            break;

                          default:
                            return;
                        }

                        setDisplay(result.toString());
                        setExpression("");
                        setFirstNumber(null);
                        setOperator(null);
                        setWaitingForSecond(true);
                      }


                      else if (btn === '%') {
                        setDisplay(
                          prev => prev / 100
                        )
                      }
                      else if (btn === 'OIBSIP') {
                        setDisplay(
                          <div className='text-white bg-green-400 p-2 m-2 rounded-2xl text-2xl hover:text-amber-300 cursor-pointer'>its only for the task completion</div>
                        )
                      }

                      else {
                        setDisplay(
                          prev => prev + btn)
                      }

              }
              }>{btn}  </button>

          )}


        </div>
      </div>
    </>
  )
}

export default App
