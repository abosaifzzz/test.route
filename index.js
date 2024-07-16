let nameSearch = document.getElementById("name-search");
let transactionSearch = document.getElementById("transaction");

document
  .getElementById("filter-transaction")
  .addEventListener("click", function () {
    document.getElementById("name-search").classList.add("d-none");

    document.getElementById("transaction").classList.remove("d-none");
  });
document.getElementById("search-name").addEventListener("click", function () {
  document.getElementById("name-search").classList.remove("d-none");

  document.getElementById("transaction").classList.add("d-none");
});

document.getElementById("name-search").addEventListener("input", function () {
  console.log(nameSearch.value);

  if (nameSearch.value == "") {
    displayUsers(data.customers);
    document.querySelector(".content-name").style.backgroundColor = "red";

    displayChart(customerHistory);
    displayChart2(customerHistory);
  }
  if (nameSearch.value !== "") {
    let nameSearchId;
    nameSearchId = data.customers.filter((e) => {
      return e.name.toLowerCase().startsWith(nameSearch.value.toLowerCase());
    });
    let customerHistory = data.transactions.filter(
      (e) => e.customer_id == nameSearchId[0]?.id
    );
    // document.querySelector(".content-name").style.backgroundColor = "red";
    displayUsers(data.customers, customerHistory);
    displayChart(customerHistory);
    displayChart2(customerHistory);
  }
  if (nameSearch.value == "") {
    // document.querySelector(".content-name").style.backgroundColor = "red";

    displayUsers(data.customers);
    displayChart(customerHistory);
    displayChart2(customerHistory);
  }
});

document.getElementById("transaction").addEventListener("input", function () {
  if (transactionSearch.value !== "") {
    let amountId;
    amountId = data.transactions.filter((e) => {
      return e.amount == transactionSearch.value;
    });
    displayUsers(data.customers, amountId);
    displayChart(amountId);
    displayChart2(amountId);

    console.log(amountId);
  }
});
let apiResponse = {};
async function getData() {
  const response = await fetch("data.json");
  data = await response.json();
  apiResponse = data;
  displayUsers(data.customers, data.transactions);
  displayChart(data.transactions);
  displayChart2(data.transactions);
}
getData();
//getData();

function displayUsers(customers, transactions) {
  let userData = "";
  let head = `<ul id="result" class="list-unstyled pb-0 mb-0 d-flex justify-content-around">
                  <li class="head-name w-100 ">Customer</li>
                  <li class="head-date w-100 ">Transaction Date</li>
                  <li class="head-amount w-100 ">Transaction Amount</li>
              </ul>`;

  for (let i = 0; i < customers.length; i++) {
    let customerTransactions = transactions.filter(
      (transaction) => transaction.customer_id === customers[i].id
    );

    for (let j = 0; j < customerTransactions.length; j++) {
      userData += `<ul class="list-unstyled pb-0 mb-0 d-flex justify-content-around">
                        <li class="content-name w-100 ">${customers[i].name}</li>
                        <li class="content-date w-100 ">${customerTransactions[j].date}</li>
                        <li class="content-amount w-100 ">${customerTransactions[j].amount}</li>
                    </ul>
                
                    `;
    }
  }

  document.getElementById("head").innerHTML = head + userData;
}

/////////////////////////////////////////////
let currentChart;

function displayChart(transactions = []) {
  const ctx = document.getElementById("myChart");
  const dateAmountMap = {};

  transactions.forEach((transaction) => {
    const date = transaction.date;
    const amount = transaction.amount;
    if (dateAmountMap[date]) {
      dateAmountMap[date] += amount;
    } else {
      dateAmountMap[date] = amount;
    }
  });

  const dates = Object.keys(dateAmountMap);
  const amounts = Object.values(dateAmountMap);

  if (currentChart) {
    currentChart.destroy();
  }

  currentChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: dates || [],
      datasets: [
        {
          label: "Transactions",
          backgroundColor: "rgb(255, 255, 255)",
          data: amounts || [],
          color: "rgb(255, 255, 255)",
          borderWidth: 5,
          borderColor: "rgba(254, 0, 0, 0.500)",
        },
      ],
    },
    options: {
      responsive: true,
      tooltips: {
        mode: "index",
      },
    },
  });
}
/////////////////////////////////////////
let currentChart2;

function displayChart2(transactions = []) {
  const ctx = document.getElementById("myChart2");
  const dateAmountMap = {};

  transactions.forEach((transaction) => {
    const date = transaction.date;
    const amount = transaction.amount;
    if (dateAmountMap[date]) {
      dateAmountMap[date] += amount;
    } else {
      dateAmountMap[date] = amount;
    }
  });

  const dates = Object.keys(dateAmountMap);
  const amounts = Object.values(dateAmountMap);

  if (currentChart2) {
    currentChart2.destroy();
  }

  currentChart2 = new Chart(ctx, {
    type: "radar",
    data: {
      labels: dates || [],
      datasets: [
        {
          label: "Transactions",
          backgroundColor: "rgb(255, 255, 500)",
          data: amounts || [],
          color: "rgb(255, 255, 255)",
          borderWidth: 5,
          borderColor: "rgba(254, 0, 0, 0.500)",
        },
      ],
    },
    options: {
      responsive: true,
      tooltips: {
        mode: "index",
      },
    },
  });
}
