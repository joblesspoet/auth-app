import React from 'react'
import MyRequestItem from './MyRequestItem';

function MyRequests({requests}) {
    return (
        <div>
            {
                requests.map(request => {
                    return (
                        <MyRequestItem key={request.id} item={request} />
                    )
                })
            }
        </div>
    )
}

export default MyRequests
