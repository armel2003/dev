document.addEventListener('DOMContentLoaded', function() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.exchangerate-api.com/v4/latest', true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);
      var currencies = Object.keys(data.rates);

      var fromSelect = document.getElementById('from');
      var toSelect = document.getElementById('to');

      currencies.forEach(function(currency) {
        var optionFrom = document.createElement('option');
        optionFrom.text = currency;
        optionFrom.value = currency;
        fromSelect.appendChild(optionFrom);

        var optionTo = document.createElement('option');
        optionTo.text = currency;
        optionTo.value = currency;
        toSelect.appendChild(optionTo);
      });
    } else {
      console.log('La demande a échoué: ' + xhr.status);
    }
  };
  xhr.send();

  document.getElementById('convertButton').addEventListener('click', function() {
    var amount = document.getElementById('amount').value;
    var from = document.getElementById('from').value;
    var to = document.getElementById('to').value;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.exchangerate-api.com/v4/latest/' + from, true);
    xhr.onload = function() {
      if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        var rate = data.rates[to];
        var convertedAmount = amount * rate;
        document.getElementById('result').innerHTML = amount + ' ' + from + ' = ' + convertedAmount.toFixed(2) + ' ' + to;
      } else {
        console.log('La demande a échoué: ' + xhr.status);
      }
    };
    xhr.send();
  });
});
