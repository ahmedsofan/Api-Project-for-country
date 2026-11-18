// get the input value and fetch country data
let searchInput = document.getElementById("searchInput");
let countryInfo = document.getElementById("countryInfo");
let searchButton = document.getElementById("searchButton");

// add event listener to search button
searchButton.addEventListener("click", searchCountry);

// search function

function searchCountry() {
  let countryName = searchInput.value.trim();
  if (!countryName) {
    showError("الرجاء ادخال اسم الدولة");
    return;
  }
  countryInfo.innerHTML = '<div class= "loading">جاري البحث...</div>';

  // fetch country data from API
  fetch(
    `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}`,
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("الدولة غير موجودة");
      }
      return response.json();
    })
    .then((data) => {
      displayCountryInfo(data[0]);
    })
    .catch((error) => {
      showError(error.message);
    });
}

// display country data
function displayCountryInfo(country) {
  countryInfo.innerHTML = `
    <div class="country-card">
        <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" class="country-flag">
        <div class="country-details">
            <p><strong>الاسم:</strong> ${country.name.common}</p>
            <p><strong>العاصمة:</strong> ${country.capital}</p>
            <p><strong>السكان:</strong> ${country.population.toLocaleString()}</p>
        </div>
    </div>

    `;
}

//error function to display error message
function showError(message) {
  countryInfo.innerHTML = `<div class="error-message">${message}</div>`;
}

//---------------------------------------------------------------//

// // get the input value and fetch country data
// let searchInput = document.getElementById("searchInput");
// let countryInfo = document.getElementById("countryInfo");
// let searchButton = document.getElementById("searchButton");

// // add event listener to search button
// searchButton.addEventListener("click", searchCountry);

// searchInput.addEventListener("keypress", function (event) {
//   if (event.key === "Enter") {
//     searchCountry();
//   }
// });

// // search function using async/await
// async function searchCountry() {
//   let countryName = searchInput.value.trim();

//   if (!countryName) {
//     showError("الرجاء ادخال اسم الدولة");
//     return;
//   }

//   countryInfo.innerHTML = '<div class="loading">جاري البحث...</div>';

//   try {
//     let response = await fetch(
//       `https://restcountries.com/v3.1/name/${countryName}`,
//     );

//     if (!response.ok) {
//       throw new Error("الدولة غير موجودة");
//     }

//     let data = await response.json();

//     if (data && data.length > 0) {
//       displayCountryInfo(data[0]);
//     } else {
//       showError("الدولة غير موجودة");
//     }
//   } catch (error) {
//     showError(error.message);
//   }
// }

// // display country data
// function displayCountryInfo(country) {
//   // معالجة العاصمة في حال كانت مصفوفة لضمان عرضها بشكل صحيح
//   let capitalText = Array.isArray(country.capital)
//     ? country.capital.join(", ")
//     : country.capital || "غير متوفرة";

//   countryInfo.innerHTML = `
//     <div class="country-card">
//         <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" class="country-flag">
//         <div class="country-details">
//             <p><strong>الاسم:</strong> ${country.name.common}</p>
//             <p><strong>العاصمة:</strong> ${capitalText}</p>
//             <p><strong>السكان:</strong> ${country.population.toLocaleString()}</p>
//         </div>
//     </div>
//   `;
// }

// // error function to display error message
// function showError(message) {
//   countryInfo.innerHTML = `<div class="error-message">${message}</div>`;
// }
