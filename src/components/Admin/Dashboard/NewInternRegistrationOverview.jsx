import React from 'react';
import ReactApexChart from 'react-apexcharts';

const NewInternRegistrationOverview = () => {
    const [state, setState] = React.useState({
        series: [
            {
                name: 'Fullstack',
                data: [7, 11, 12, 8, 14, 9],
            },
            {
                name: 'UI/UX',
                data: [5, 8, 12, 5, 12, 6],
            },
            {
                name: 'Cloud',
                data: [5, 5, 4, 5, 4, 8],
            },
            {
                name: 'QA',
                data: [5, 3, 5, 4, 5, 6],
            },
        ],
        options: {
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'smooth',
                width: 2
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'],
                    opacity: 0.5,
                },
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            },
            legend: {
                position: 'right', 
                markers: {
                    width: 10,
                    height: 10, 
                    radius: 12, 
                    shape: 'circle', 
                },
            },
            colors: ['#aaeba7', '#84bff5', '#fa7f7f', '#ffe78f'], 
        },
    });

    return (
        <div>
            <div id="chart">
                <ReactApexChart
                    options={state.options}
                    series={state.series}
                    type="line"
                    height={225}
                />
            </div>
            <div id="html-dist"></div>
        </div>
    );
};

export default NewInternRegistrationOverview;
