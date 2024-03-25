// Set stock colors based on stock change movement
function getColorClass(value) {
  // Check if value is defined and is a string
  if (typeof value !== 'string') {
      return 'unknown-value';
  }
  
  const numericValue = parseFloat(value.replace('%', ''));

  if (!isNaN(numericValue)) {
      if (numericValue > 0) {
          return 'positive-value';
      } else if (numericValue < 0) {
          return 'negative-value';
      } else {
          return 'neutral-value';
      }
  } else {
      return 'unknown-value';
  }
}

export default getColorClass;



//set stock colors based on stock change movement 
// function getColorClass(value) {

//     const numericValue = parseFloat(value.replace('%', ''));
  
//     if (numericValue > 0) {
//       return 'positive-value'; 
//     } else if (numericValue < 0) {
//       return 'negative-value';
//     } else {
//       return 'neutral-value'; 
//     }
//   }
  
//   export default getColorClass;
  