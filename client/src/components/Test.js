import React from 'react'
import { useHistory, useParams } from 'react-router';

const Test = () => {
    const history = useHistory();
    const params = useParams();
    console.log(params.id);
    return (
        <div>
            TEST
            <button onClick={()=>history.goBack()}>back</button>
        </div>
    )
}

export default Test;