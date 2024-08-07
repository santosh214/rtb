import React from 'react'
import { UITable } from '../../../components/UIElements/Table'
import { dummyData } from '../../../utils/constant'

export default function Users() {
    return (
        <UITable data={dummyData} />
    )
}
