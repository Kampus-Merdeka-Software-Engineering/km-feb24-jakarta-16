document.addEventListener('DOMContentLoaded', function() {
    // Daily Sales Chart
    var dailySalesCtx = document.getElementById('daily-sales-chart').getContext('2d');
    var dailySalesChart = new Chart(dailySalesCtx, {
        type: 'line',
        data: {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
            datasets: [{
                label: 'Daily Sales',
                data: [100, 200, 150, 300, 250],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    // Statistics Chart
    var statisticsCtx = document.getElementById('statistics-chart').getContext('2d');
    var statisticsChart = new Chart(statisticsCtx, {
        type: 'bar',
        data: {
            labels: ['Statistic 1', 'Statistic 2', 'Statistic 3', 'Statistic 4', 'Statistic 5'],
            datasets: [{
                label: 'Statistics',
                data: [50, 75, 60, 80, 70],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    // Total Revenue Chart
    var totalRevenueCtx = document.getElementById('total-revenue-chart').getContext('2d');
    var totalRevenueChart = new Chart(totalRevenueCtx, {
        type: 'pie',
        data: {
            labels: ['Category 1', 'Category 2', 'Category 3'],
            datasets: [{
                label: 'Total Revenue',
                data: [300, 200, 400],
                backgroundColor: ['rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                borderColor: ['rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
                borderWidth: 1
            }]
        }
    });

    // AVG Sales Chart
    var avgSalesCtx = document.getElementById('avg-sales-chart').getContext('2d');
    var avgSalesChart = new Chart(avgSalesCtx, {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'AVG SALES',
                backgroundColor: '#77B0AA',
                data: [100, 200, 150, 300, 250, 400, 350] 
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    // AVG Discount Chart
    var avgDiscountCtx = document.getElementById('avg-discount-chart').getContext('2d');
    var avgDiscountChart = new Chart(avgDiscountCtx, {
        type: 'line',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'AVG DISCOUNT',
                borderColor: '#003C43',
                data: [5, 6, 4, 7, 5, 8, 6] 
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    // Total Sales Chart
    var totalSalesCtx = document.getElementById('total-sales-chart').getContext('2d');
    var totalSalesChart = new Chart(totalSalesCtx, {
        type: 'pie',
        data: {
            labels: ['Product A', 'Product B', 'Product C'],
            datasets: [{
                label: 'Total Sales',
                backgroundColor: ['#e3fef7', '#77B0AA', '#003C43'],
                data: [300, 500, 400] 
            }]
        }
    });
});
