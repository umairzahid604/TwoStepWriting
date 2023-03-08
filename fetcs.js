const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
// // // /api/v1/companies/{company_id}/datasets/{dataset_id}/subjects/
// // const API_ENDPOINT = "https://saas.haut.ai/api/v1/companies/7affc037-ee40-46b9-b49e-bc430d59aaa7/datasets/0929251a-a440-4ec5-91ee-476285e66285/subjects/";
// // const API_KEY = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImY4NzZiNzIxNDAwYmZhZmEyOWQ0MTFmZTYwODE2YmRhZWMyM2IzODIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2FzdWtlLWNvcmUtcHJkIiwiYXVkIjoic2FzdWtlLWNvcmUtcHJkIiwiYXV0aF90aW1lIjoxNjc3NDc5NjEwLCJ1c2VyX2lkIjoicWt5UnRrZW96eGNvTVZyVFRBeHFFUFZwRHhIMiIsInN1YiI6InFreVJ0a2Vvenhjb01WclRUQXhxRVBWcER4SDIiLCJpYXQiOjE2Nzc0Nzk2MTAsImV4cCI6MTY3NzQ4MzIxMCwiZW1haWwiOiJkZW5ueUBhcmlhbWVkLmFpIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiZGVubnlAYXJpYW1lZC5haSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.N2nK5_b8eBG7s7ApmZi7sOA7n6fUfHuym6RORuU1p_F7i1kIMrZbhbgqlwoPCACnNkOCKdNpgpnQNmFJQvZttzC4UWEZXd5LapuOlYeW0e-XUtPWnnv1PiFxFcg-IHALeHqH0xnioy97zQL_W9vj_HHrSowsbyXCyFePG-2tqct43q589ocvtvIchi7tB7oKK5SqAvnpjdA_fD0Tzsp1y68925U8lDpQIzyiMABI5GDMn_JMssKQvt9fsu6HyrDA19bJdtWmw4uhc-xN6TCD0adHALTdL8AnJEVDftFIH_t35Gz-0fFFqzMxKKwfmDFn6F8eD2904ekHVXqpg0xi2A";

// // fetch(API_ENDPOINT, {
// //   headers: {
// //     Authorization: `Bearer ${API_KEY}`
// //   }
// // })
// //   .then(response => {
// //     // Check if the request was successful
// //     if (!response.ok) {
// //       throw new Error("Network response was not ok");
// //     }
// //     // Get the list of datasets from the response
// //     return response.json();
// //   })
// //   .then(datasets => {
// //    console.log(datasets)
// //     // Print the name and details of each dataset
// //     // datasets.forEach(dataset => {
// //     //   console.log(`Name: ${dataset.name}`);
// //     //   console.log(`Description: ${dataset.description}`);
// //     //   console.log(`Created at: ${dataset.created_at}`);
// //     //   console.log(`Last modified: ${dataset.updated_at}`);
// //     //   console.log("========================");
// //     // });
// //   })
// //   .catch(error => {
// //     console.error("Error:", error);
// //   });



// // const fetch = require('node-fetch');

// const url = 'https://saas.haut.ai/service/constructor/b2c/survey-answers/?batch_id=fa6d4c4b-b0e9-4fe8-b96a-b2ae1b5498c8';

// fetch(url, {
//   method: 'GET',
//   headers: {
//     'accept': 'application/json'
//   }
// })
// .then(response => response.text())
// .then(data => {
//   // console.log(data.split(",")[5]);
//   console.log(data);

// })
// .catch(error => {
//   console.error(error);
// });



// const fetch = require('node-fetch');

const url = 'https://childcareservicestraining.app.axcelerate.com/api/contact/';
const headers = {
  'apitoken': 'CA426D06-28F5-40A6-A1BFFB35DB25093D',
  'wstoken': 'C43B9B57-BA20-47E3-8432C93C89714E19',
  'Content-Type': 'application/x-www-form-urlencoded'
};
const data = {
  'givenName': 'umair',
};

const formBody = Object.keys(data)
  .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
  .join('&');

fetch(url, {
  method: 'POST',
  headers: headers,
  body: formBody
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));