import React, { useEffect,useState } from 'react'
import './detailBlog.scss'
import {Gap, Link} from '../../components'
import { useHistory,withRouter } from 'react-router-dom'
import Axios from 'axios'

const DetailBlog = (props) => {
    const [data,setData] = useState({});
    useEffect(()=>{
        const id = props.match.params.id
        Axios.get(`http://localhost:4000/v1/blog/posts/${id}`)
        .then(res => {
            setData(res.data.data);
        })
        .catch(err => console.log(err))
    },[props])
    const history = useHistory()
        if(data.author){
            return (<div className='detail-blog-wrapper'>
                <img className='img-cover' src={`http://localhost:4000/${data.image}`} alt="thumb"/>
                <p className='blog-title'>{data.title}</p>
                <p className='blog-author'>{data.author.name} - {data.createdAt}</p>
                <p className='blog-body'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                <Gap height={20}/>
                <Link title="Kembali ke Home" onClick={()=>history.push('/')}/>
            </div>);
        }
        return <p>Loading data ...</p>
}

export default withRouter(DetailBlog)
