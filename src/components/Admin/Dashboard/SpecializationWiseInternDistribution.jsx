import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts';

const SpecializationWiseInternDistribution = () => {
    const [state, setState] = React.useState({
          
        series: [{
          name: 'Dropout',
          data: [3, 2, 0, 0, 5, 2]
        }, {
          name: 'Terminated',
          data: [3, 3, 0, 4, 3, 1]
        }, {
          name: 'Completed',
          data: [11, 17, 15, 15, 16, 17]
        }, {
          name: 'Active',
          data: [21, 7, 20, 13, 15, 12]
        }],
        options: {
          chart: {
            type: 'bar',
            height: 300,
            stacked: true,
            toolbar: {
              show: true
            },
            zoom: {
              enabled: true
            }
          },
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
              }
            }
          }],
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '60%',
              borderRadius: 3,
              borderRadiusApplication: 'end', 
              borderRadiusWhenStacked: 'last',
              dataLabels: {
                total: {
                  enabled: true,
                  style: {
                    fontSize: '13px',
                    fontWeight: 900
                  }
                }
              }
            },
          },
          colors: ['#fed000', '#E83434', '#0056A4', '#4DB848'],
          xaxis: {
            type: 'string',
            categories: ['Fullstack', 'Cloud', 'UI/UX', 'QA', 'PM', 'BA'
            ],
          },
          legend: {
            position: 'right',
            offsetY: 40,
            markers: {
                width: 10, 
                height: 10, 
                radius: 12, 
                shape: 'circle',
            },
          },
          fill: {
            opacity: 1
          }
        },
    });

    
        return (
            <div>
            <div id="chart">
                <ReactApexChart options={state.options} series={state.series} type="bar" height={229} width={700} />
              </div>
            <div id="html-dist"></div>
          </div>
        );
}

export default SpecializationWiseInternDistribution