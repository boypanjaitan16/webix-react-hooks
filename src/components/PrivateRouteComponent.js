import {Redirect, Route} from 'react-router-dom'
import {useSelector} from 'react-redux'

export default function PrivateRoute({path, component}){
    const session   = useSelector(state => state.session)

    if(session){
        return (<Route path={path} component={component}/>)
    }

    return (<Redirect to={'/auth'}/>)
}