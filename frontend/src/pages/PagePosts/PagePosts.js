import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ListPosts from './../../components/ListPosts/ListPosts';
import ButtonsLoad from './../../components/Buttons/ButtonsLoad/ButtonsLoad'
import { serviceFetchInitRequest, serviceFetchRequest } from './../../reduxFold/action/actionCreators';
import './PagePosts.css';
import Loading from '../../components/Loading/Loading';

function PagePosts(props) {
    const { error, lastId, items, fulllist, loading } = useSelector( state => state.serviceFetchPosts )
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(serviceFetchInitRequest());
        // eslint-disable-next-line
    }, []);

    useEffect(()=>{
        if (!error) {
            return;
        }

        setTimeout(() => {
            if (lastId) {
                dispatch(serviceFetchRequest(lastId))
            } else {
                dispatch(serviceFetchInitRequest());
            }
        }, 3 * 1000);
        // eslint-disable-next-line
    }, [error])

    const handleClick = () => {
        dispatch(serviceFetchRequest(lastId));
    }
    
    return (
        <div className='page-post'>
            { console.log(lastId)}
            <ListPosts list={items} />
            {loading && <Loading />}
            {!fulllist && !loading && <ButtonsLoad handleClick={handleClick}/>}
        </div>
    )
}

export default PagePosts;

