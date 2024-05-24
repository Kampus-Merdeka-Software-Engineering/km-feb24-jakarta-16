document.addEventListener('DOMContentLoaded', function () {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const customerSegmentData = data.customerSegmentData;
            const discountSalesData = data.discountSalesData;
            const discountProfitData = data.discountProfitData;
            const avgDiscountPerYearData = data.avgDiscountPerYearData;
            const profitMarginData = data.profitMarginData;

            const ctxCustomerSegment = document.getElementById('customerSegmentChart').getContext('2d');
            const ctxDiscount = document.getElementById('discountChart').getContext('2d');
            const ctxSales = document.getElementById('salesChart').getContext('2d');
            const ctxDiscountProfit = document.getElementById('discountProfitChart').getContext('2d');
            const ctxProfitQuantity = document.getElementById('profitQuantityChart').getContext('2d');
            const ctxAvgDiscountPerYear = document.getElementById('avgDiscountPerYearChart').getContext('2d');
            const ctxProfitMargin = document.getElementById('profitMarginChart').getContext('2d');

            let customerSegmentChart;
            let discountChart;
            let salesChart;
            let discountProfitChart;
            let profitQuantityChart;
            let avgDiscountPerYearChart;
            let profitMarginChart;

            function createCustomerSegmentChart(data) {
                if (customerSegmentChart) {
                    customerSegmentChart.destroy();
                }
                customerSegmentChart = new Chart(ctxCustomerSegment, {
                    type: 'bar',
                    data: {
                        labels: data.map(item => item.Segment),
                        datasets: [{
                            label: 'Discount',
                            data: data.map(item => item.Discount),
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        }]
                    }
                });
            }

            function createDiscountChart(data) {
                if (discountChart) {
                    discountChart.destroy();
                }
                discountChart = new Chart(ctxDiscount, {
                    type: 'bar',
                    data: {
                        labels: data.map(item => item.City),
                        datasets: [{
                            label: 'Discount',
                            data: data.map(item => item.Discount),
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1
                        }]
                    }
                });
            }

            function createSalesChart(data) {
                if (salesChart) {
                    salesChart.destroy();
                }
                salesChart = new Chart(ctxSales, {
                    type: 'bar',
                    data: {
                        labels: data.map(item => item.City),
                        datasets: [{
                            label: 'Sales',
                            data: data.map(item => item.Sales),
                            backgroundColor: 'rgba(153, 102, 255, 0.2)',
                            borderColor: 'rgba(153, 102, 255, 1)',
                            borderWidth: 1
                        }]
                    }
                });
            }

            function createDiscountProfitChart(data) {
                if (discountProfitChart) {
                    discountProfitChart.destroy();
                }
                discountProfitChart = new Chart(ctxDiscountProfit, {
                    type: 'bar',
                    data: {
                        labels: data.map(item => item.City),
                        datasets: [{
                            label: 'Discount',
                            data: data.map(item => item.Discount),
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        }]
                    }
                });
            }

            function createProfitQuantityChart(data) {
                if (profitQuantityChart) {
                    profitQuantityChart.destroy();
                }
                profitQuantityChart = new Chart(ctxProfitQuantity, {
                    type: 'bar',
                    data: {
                        labels: data.map(item => item.City),
                        datasets: [{
                            label: 'Profit/Quantity',
                            data: data.map(item => item['Profit/Quantity']),
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        }]
                    }
                });
            }

            function createAvgDiscountPerYearChart(data) {
                if (avgDiscountPerYearChart) {
                    avgDiscountPerYearChart.destroy();
                }
                avgDiscountPerYearChart = new Chart(ctxAvgDiscountPerYear, {
                    type: 'pie',
                    data: {
                        labels: data.map(item => item['Order Date (Tahun)']),
                        datasets: [{
                            label: 'Average Discount',
                            data: data.map(item => item.Discount),
                            // backgroundColor: 'rgba(255, 206, 86, 0.2)',
                            // borderColor: 'rgba(255, 206, 86, 1)',
                            borderWidth: 1
                        }]
                    }
                });
            }

            function createProfitMarginChart(data) {
                if (profitMarginChart) {
                    profitMarginChart.destroy();
                }
                profitMarginChart = new Chart(ctxProfitMargin, {
                    type: 'bar',
                    data: {
                        labels: data.map(item => item['Order Date (Tahun)']),
                        datasets: [{
                            label: 'Profit Margin',
                            data: data.map(item => item.Profit),
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        }]
                    }
                });
            }

            function populateFilters() {
                const yearFilter = document.getElementById('yearFilter');
                const cityFilter = document.getElementById('cityFilter');
                const profitCityFilter = document.getElementById('profitCityFilter');

                const years = [...new Set(customerSegmentData.map(item => item['Order Date (Tahun)']))];
                years.forEach(year => {
                    const option = document.createElement('option');
                    option.value = year;
                    option.textContent = year;
                    yearFilter.appendChild(option);
                });

                const cities = [...new Set(discountSalesData.map(item => item.City))];
                cities.forEach(city => {
                    const option = document.createElement('option');
                    option.value = city;
                    option.textContent = city;
                    cityFilter.appendChild(option);
                });

                const profitCities = [...new Set(discountProfitData.map(item => item.City))];
                profitCities.forEach(city => {
                    const option = document.createElement('option');
                    option.value = city;
                    option.textContent = city;
                    profitCityFilter.appendChild(option);
                });
            }

            function validateSearchInput() {
                const searchBar = document.getElementById('search-bar');
                const errorMessage = document.createElement('span');
                errorMessage.classList.add('error-message');
                searchBar.parentNode.insertBefore(errorMessage, searchBar.nextSibling);
        
                searchBar.addEventListener('input', function() {
                    const searchTerm = searchBar.value;
                    const regex = /^[a-zA-Z0-9\s]*$/; 
                    if (!regex.test(searchTerm)) {
                        errorMessage.textContent = 'Invalid input. Only letters, numbers, and spaces are allowed.';
                        searchBar.classList.add('invalid');
                    } else {
                        errorMessage.textContent = '';
                        searchBar.classList.remove('invalid');
                    }
                });
            }
        
            validateSearchInput();

            populateFilters();
            createCustomerSegmentChart(customerSegmentData);
            createDiscountChart(discountSalesData);
            createSalesChart(discountSalesData);
            createDiscountProfitChart(discountProfitData);
            createProfitQuantityChart(discountProfitData);
            createAvgDiscountPerYearChart(avgDiscountPerYearData);
            createProfitMarginChart(profitMarginData);

            document.getElementById('yearFilter').addEventListener('change', function () {
                const selectedYear = this.value;
                const filteredData = selectedYear === 'all' ? customerSegmentData : customerSegmentData.filter(item => item['Order Date (Tahun)'] === selectedYear);
                createCustomerSegmentChart(filteredData);
                const filteredAvgDiscountData = selectedYear === 'all' ? avgDiscountPerYearData : avgDiscountPerYearData.filter(item => item['Order Date (Tahun)'] === selectedYear);
                createAvgDiscountPerYearChart(filteredAvgDiscountData);
                const filteredProfitMarginData = selectedYear === 'all' ? profitMarginData : profitMarginData.filter(item => item['Order Date (Tahun)'] === selectedYear);
                createProfitMarginChart(filteredProfitMarginData);
            });

            document.getElementById('cityFilter').addEventListener('change', function () {
                const selectedCity = this.value;
                const filteredData = selectedCity === 'all' ? discountSalesData : discountSalesData.filter(item => item.City === selectedCity);
                createDiscountChart(filteredData);
                createSalesChart(filteredData);
            });

            document.getElementById('profitCityFilter').addEventListener('change', function () {
                const selectedCity = this.value;
                const filteredData = selectedCity === 'all' ? discountProfitData : discountProfitData.filter(item => item.City === selectedCity);
                createDiscountProfitChart(filteredData);
                createProfitQuantityChart(filteredData);
            });
        });
});
