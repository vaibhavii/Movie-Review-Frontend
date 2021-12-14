import React, { useState, useEffect } from 'react';
import {getTotalByGenre, getBOByGenre, getRatingByGenre, getAnalytics, getUsersAnalysis} from '../services/AnalyticsService';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis, VictoryLine, VictoryLabel } from 'victory';

function AllAnalysis(){


    const [reviewData, setReviewData] = useState([]);
    const [userAnalytics, setUserAnalytics] = useState([]);
    const [analytics, setAnalytics] = useState({});

    useEffect(()=>{

        getAnalytics().then(response=>{
            //console.log(response);
            setAnalytics(response);
            //console.log(JSON.stringify(response));
        })
        getUsersAnalysis().then(response=>{
            setUserAnalytics(response);
        })

    },[])

    //padding={{ left: 80, right: 100 }}

    return(
            <div className="container">
                <div className="row pt-4">
                    <h2>Analytics</h2>
                </div>
                <div className="row pt-4">
                    <button className="btn btn-danger btn-analytics" onClick={()=>{
                            window.location.href='http://127.0.0.1:5767/';
                            //navigate('/stats');
                        }}>View More</button>
                </div>
                <div className="row pt-4">
                    Total users registered in past 7 days: {analytics["Users"]}
                </div>
                <div className="row pt-2">
                    Total reviews registered in past 7 days: {analytics["Reviews"]}
                </div>
                <div className="row pt-2">
                    Total movies in the database: {analytics["Movies"]}
                </div>
                <div className="pt-4 pl-4" >
                    <h4 className="title-chart-an">Total Users per Country</h4>
                </div>
                <div className="size">
                <VictoryChart
                        domainPadding={20}
                        width={650}
                        height={500}
                    >
                        <VictoryAxis
                        fixLabelOverlap 
                        label="Country"
                        />
                        <VictoryAxis
                        label="Total Users"
                        dependentAxis
                        tickFormat={(x) => (x)}
                        />
                        <VictoryBar
                        data={userAnalytics}
                        x="Location"
                        y="Users_Count"
                        />
                    </VictoryChart>
                </div>
            </div>
    )

}

export default AllAnalysis;