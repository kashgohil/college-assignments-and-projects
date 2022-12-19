import React from "react";
import axios from "axios";
class Analyze extends React.Component{

    state={
        results: []
    }


    componentDidMount(){
        axios({
            method: "POST",
            url: "http://127.0.0.1:5000/list",
            data: {
                job_id: this.props.job_id
            }
        }).then(response=>{
            this.setState({results: response.data});
        });
    }


    render() {

        const data= this.state.results.map(result=>{
            return(
                
                <li>
                   Emailid: {result.emailid}
                   <br/>
                   Result: {result.testmarks} 
                </li>
            );
        });
        return(
            <div>
                <h1>
                    Results
                </h1>
                <ul>
                    {data}
                </ul>
            </div>
        );
        
    }


}

export default Analyze;