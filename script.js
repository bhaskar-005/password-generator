const rangeInput = document.querySelector('.range');
const numberDisplay = document.querySelector('.len-pass');
const passInput = document.querySelector('.input');
const copyButton = document.querySelector('.copy-button');
const genBtn = document.querySelector('.btn-sub');
const chackboxAll = document.querySelectorAll('.checkbox__trigger');
const copyedBtn = document.querySelector('.copyed');
const passwordShow =document.querySelector('.pas-show');
const passStrength=document.querySelector('.stn-colour');

let numberOfPass = rangeInput.value;
numberDisplay.textContent = numberOfPass;
 //we stored the value in the numberof pass variable

//--------now adding event listner to the range slider
    // ++++++++++++<event listner>++++++++++++++
rangeInput.addEventListener('input', function() {
  numberOfPass = this.value;
  numberDisplay.textContent = numberOfPass;
});

//--------------<now lets make a randome number generator---------
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
//we are generating a number using math.ran and *by max-min+1 and math.flooe help us to 
     //convert the float value to interget and at last we are adding min so that the value 
     // we are geting should be
     //beger then the min number
}

//---------------< generat the lowercase >---------------------    
    //we are useing the getranNum function to find lowercase number aslos because we
    //can get the lowercase number using ascii value of a =97 and z = 122
    //so we need to take min =97 and z =122 and then we will change into alpahabet
function generateLowercase() {
  //so to converst the ascii we use this mathord
  return String.fromCharCode(getRandomNumber(97, 122));
}

// Function to generate a random uppercase letter
function generateUppercase() {
  //so to converst the ascii we use this mathord
  return String.fromCharCode(getRandomNumber(65, 90));
}

// Function to generate a random number
function generateNumber() {
  return String.fromCharCode(getRandomNumber(48, 57));
}

//-----------<random symbol generator   
    //so to get symbol we need to store all symbol in a string or in a array
    // thes we will genrate a number and we will get the symbol from this index 
function generateSymbol() {
  const symbols = ['!', '@', '#', '$', '%', '^', '&', '*', ':', '<', '/', '>', '.', '{', '}', '[', ']'];
  const randomIndex = getRandomNumber(0, symbols.length - 1);
  return symbols[randomIndex];
}


// -----------<now lets make the function for copy 

//so we need to add event on the copy btn first
function copyBtn(){
   //make this function for copy and we put this copy code in try and catch so that we can 
  //handle the error 
  try {
    if(!passInput.value) return
    else{
    navigator.clipboard.writeText(passInput.value)
    console.log("done"); 
   // ----should add the copyed text-----
   copyedBtn.classList.add('Show'.replace(/\s+/g, ''));
   passwordShow.textContent="Password copyed ✓"
   setTimeout(() => {
    copyedBtn.classList.remove('Show');
   }, 1000);}
 
 }
   catch (error) {
     console.log("faild");
     //also here we need to add the fild to the copyed teg innertext
   }
 }

// Function to generate a random password
function generatePassword() {
  const includeLowercase = chackboxAll[0].checked;
  const includeUppercase = chackboxAll[1].checked;
  const includeNumbers = chackboxAll[2].checked;
  const includeSymbols = chackboxAll[3].checked;

  let password = '';

  const availableFunctions = [];
  if (includeLowercase) {
    availableFunctions.push(generateLowercase);
  }
  if (includeUppercase) {
    availableFunctions.push(generateUppercase);
  }
  if (includeNumbers) {
    availableFunctions.push(generateNumber);
  }
  if (includeSymbols) {
    availableFunctions.push(generateSymbol);
  }

  if (availableFunctions.length === 0) {
    copyedBtn.classList.add('Show'.replace(/\s+/g, ''));
    passwordShow.textContent="please select at least one option"
    setTimeout(() => {
     copyedBtn.classList.remove('Show');
    }, 3000);
    return;
  }

  for (let i = 0; i < numberOfPass; i++) {
    const randomIndex = getRandomNumber(0, availableFunctions.length - 1);
    const selectedFunction = availableFunctions[randomIndex];
    password += selectedFunction();
  }
  
  if(numberOfPass<=5){
    passStrength.textContent="Week  🔴"
  }
  if(numberOfPass==7 || numberOfPass==8 ||numberOfPass==6 ){
    passStrength.textContent="Good  🟡"
  
  }
 if (numberOfPass>=9){
  passStrength.textContent="Strong  🟢"
  }
  passInput.value = password;
}

// Event listener for the "GENERATE" button
genBtn.addEventListener('click', generatePassword);






