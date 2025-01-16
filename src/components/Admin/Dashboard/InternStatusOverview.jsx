import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const InternStatusOverview = () => {
    const totalInterns = 44 + 55 + 13 + 43;

    const [state] = useState({
        series: [58, 55, 5, 18],
        options: {
            chart: {
                width: 500,
                type: 'donut',
            },
            labels: ['Active', 'Completed', 'Terminated', 'Dropout'],
            colors: ['#4DB848', '#0056A4', '#E83434', '#fed000'], 
            plotOptions: {
                pie: {
                    donut: {
                        labels: {
                            show: true,
                            total: {
                                show: true,
                                formatter: () => totalInterns.toString(), 
                                label: 'Total Interns',
                            },
                        },
                    },
                },
            },
            dataLabels: {
                enabled: true,
                formatter: (val, opts) => {
                    const index = opts.seriesIndex;
                    return `${opts.w.config.series[index]}`; 
                },
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 250,
                        },
                        legend: {
                            position: 'bottom',
                        },
                    },
                },
            ],
        },
    });

    return (
        <div>
            <div id="chart">
                <ReactApexChart
                    options={state.options}
                    series={state.series}
                    type="donut"
                    width={350}
                />
            </div>
            
            <style>{`
                .apexcharts-datalabel-label {
                    font-size: 13px !important; /* Label font size */
                    font-weight: 600 !important; /* Label font weight */
                    fill: #a9a9a9 !important;    /* Label text color */
                }
                .apexcharts-datalabel-value {
                    font-size: 30px !important; /* Total value font size */
                    font-weight: bold !important; /* Total value font weight */
                    fill: #4b5563 !important;    /* Total value color */
                }
            `}</style>
        </div>
    );
};

export default InternStatusOverview;
