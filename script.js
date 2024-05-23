document.addEventListener('DOMContentLoaded', function() {
    const charts = {};
    let chartData = {};

    function createChart(ctx, type, data, options) {
        return new Chart(ctx, { type, data, options });
    }

    function getChartDataForYear(chartType, year) {
        return chartData[year][chartType];
    }

    function updateChartData(chartId, year) {
        const chartMap = {
            'daily-sales-year': 'dailySales',
            'statistics-year': 'statistics',
            'total-revenue-year': 'totalRevenue',
            'avg-sales-year': 'avgSales',
            'avg-discount-year': 'avgDiscount',
            'total-sales-year': 'totalSales'
        };

        const chartType = chartMap[chartId];
        const data = getChartDataForYear(chartType, year);

        const chart = charts[chartType];
        chart.data.datasets[0].data = data;
        chart.update();
    }

    function initCharts() {
        const dailySalesCtx = document.getElementById('daily-sales-chart').getContext('2d');
        const statisticsCtx = document.getElementById('statistics-chart').getContext('2d');
        const totalRevenueCtx = document.getElementById('total-revenue-chart').getContext('2d');
        const avgSalesCtx = document.getElementById('avg-sales-chart').getContext('2d');
        const avgDiscountCtx = document.getElementById('avg-discount-chart').getContext('2d');
        const totalSalesCtx = document.getElementById('total-sales-chart').getContext('2d');

        charts.dailySales = createChart(dailySalesCtx, 'line', {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
            datasets: [{ label: 'Daily Sales', data: getChartDataForYear('dailySales', '2023'), backgroundColor: 'rgba(54, 162, 235, 0.2)', borderColor: 'rgba(54, 162, 235, 1)', borderWidth: 1 }]
        }, {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Daily Sales',
                    color: 'black', 
                    font: {
                        size: 16
                    }
                }
            },
            interaction: {
                intersect: false,
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        });

        charts.statistics = createChart(statisticsCtx, 'bar', {
            labels: ['Statistic 1', 'Statistic 2', 'Statistic 3', 'Statistic 4', 'Statistic 5'],
            datasets: [{ label: 'Statistics', data: getChartDataForYear('statistics', '2023'), backgroundColor: 'rgba(255, 99, 132, 0.2)', borderColor: 'rgba(255, 99, 132, 1)', borderWidth: 1 }]
        }, {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Statistics',
                    color: 'black', 
                    font: {
                        size: 16
                    }
                }
            },
            interaction: {
                intersect: false,
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        });

        charts.totalRevenue = createChart(totalRevenueCtx, 'pie', {
            labels: ['Q1', 'Q2', 'Q3'],
            datasets: [{ label: 'Total Revenue', data: getChartDataForYear('totalRevenue', '2023'), backgroundColor: ['rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'], borderColor: ['rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'], borderWidth: 1 }]
        }, {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Total Revenue',
                    color: 'black', 
                    font: {
                        size: 16
                    }
                }
            }
        });

        charts.avgSales = createChart(avgSalesCtx, 'bar', {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{ label: 'Avg Sales', backgroundColor: '#77B0AA', data: getChartDataForYear('avgSales', '2023') }]
        }, {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'AVG SALES',
                    color: 'black', 
                    font: {
                        size: 16
                    }
                }
            },
            interaction: {
                intersect: false,
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        });

        charts.avgDiscount = createChart(avgDiscountCtx, 'pie', {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{ label: 'Avg Discount', data: getChartDataForYear('avgDiscount', '2023') }]
        }, {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Avg Discount',
                    color: 'black', 
                    font: {
                        size: 16
                    }
                }
            },
            interaction: {
                intersect: false,
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        });

        charts.totalSales = createChart(totalSalesCtx, 'bar', {
            labels: ['Q1', 'Q2', 'Q3'],
            datasets: [{ label: 'Total Sales', data: getChartDataForYear('totalSales', '2023') }]
        }, {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Total Sales',
                    color: 'black', 
                    font: {
                        size: 16
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        });
    }

    function fetchDataAndInitCharts() {
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                chartData = data;
                initCharts();
            })
            .catch(error => console.error('Error fetching the data:', error));
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

    fetchDataAndInitCharts();

    document.querySelectorAll('.year-filter').forEach(filter => {
        filter.addEventListener('change', function() {
            updateChartData(this.id, this.value);
        });
    });
});
