import React, { useState, useEffect } from 'react';
import {getTotalByGenre, getBOByGenre, getRatingByGenre} from '../services/AnalyticsService';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis } from 'victory';

function AllAnalysis(){


    const [reviewData, setReviewData] = useState([]);
    const [boData, setBoData] = useState([]);
    const [ratingData, setRatingData] = useState([]);

    useEffect(()=>{

        getTotalByGenre().then(response=>{
            setReviewData(response);
            console.log(JSON.stringify(response));
        })
        
        getBOByGenre().then(response=>{
            setBoData(response);
        })
        getRatingByGenre().then(response=>{
            setRatingData(response);
        })

    },[])

    //padding={{ left: 80, right: 100 }}

    return(
            <div className="container">
                hello
            </div>
    )

}

export default AllAnalysis;