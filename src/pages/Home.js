import React, {useState, useEffect} from 'react'
import DataTable from '../components/webix/DataTableComponent'
import Wrapper from '../components/WrapperComponent'

export default function Home(){
    const [isLoading, setLoading]   = useState(true)
    const [students, setStudents]   = useState({
        data    : []
    })

    useEffect(() => {
        setLoading(true)
        window.axios.get('/api/master/student')
            .then(res => {
                setLoading(false)
                const {data}    = res.data

                setStudents(data)
                console.log(data)
            })
            .catch(err => {
                setLoading(false)
            })
    }, [])

    return (
        <Wrapper>
            {!isLoading && (
                <div className='max-w-full overflow-x-auto bg-gray-100'>
                    <DataTable data={students.data} onSelect={(id) => {
                        console.log(id)
                    }}/>
                </div>
            )}
        </Wrapper>
    )
}
