import React, { useEffect, useState } from 'react'
import {Input,Button, Upload, TextArea,Gap,Link} from '../../components'
import './createBlog.scss'
import {useHistory} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { postToApi, setForm, setImgPreview, updateToApi } from '../../config/redux/action'
import { withRouter } from 'react-router-dom'
import Axios from 'axios'

const CreateBlog = (props) => {
    const {form,imgPreview} = useSelector(state => state.createBlogReducer);
    const {title,body} = form;
    const [isUpdate,setIsUpdate] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(()=>{
        const id = props.match.params.id;
        if(id){
            setIsUpdate(true);
            Axios.get(`http://localhost:4000/v1/blog/posts/${id}`)
            .then(res => {
                const data = res.data.data;
                console.log(data);
                dispatch(setForm('title',data.title));
                dispatch(setForm('body',data.body));
                dispatch(setImgPreview(`http://localhost:4000/${data.image}`));
            })
            .catch(err => {
                console.log(err);
            })
        }
    },[props,dispatch])

    const onSubmit = ()=>{
        if(isUpdate){
            const id = props.match.params.id;
            updateToApi(form,id);
        }else{
            postToApi(form);
        }
    }
    const onImageUpload = (e) => {
        const file = e.target.files[0];
        dispatch(setForm('image',file));
        dispatch(setImgPreview(URL.createObjectURL(file)));
    }
    return (
        <div className='blog-post'>
            <Link title="kembali" onClick={()=>history.push('/')}/>
            <p className='title'>{isUpdate ? 'Update' : 'Create'} New Blog Post</p>
            <Input label="Post Title" value={title} onChange={(e)=>dispatch(setForm("title",e.target.value))}/>
            <p>Upload Image</p>
            <Upload onChange={(e)=>onImageUpload(e)} img={imgPreview}/>
            <TextArea value={body} onChange={(e)=>dispatch(setForm("body",e.target.value))}/>
            <Gap height={15}/>
            <div className='button-action'>
                <Button title={isUpdate ? 'Update' : 'Simpan'} onClick={onSubmit}/>
            </div>
            <Gap height={15}/>
        </div>
    )
}

export default withRouter(CreateBlog)
