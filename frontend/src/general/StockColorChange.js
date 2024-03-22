//set stock colors based on stock change movement 
function getColorClass(value) {

    const numericValue = parseFloat(value.replace('%', ''));
  
    if (numericValue > 0) {
      return 'positive-value'; 
    } else if (numericValue < 0) {
      return 'negative-value';
    } else {
      return 'neutral-value'; 
    }
  }
  
  export default getColorClass;
  